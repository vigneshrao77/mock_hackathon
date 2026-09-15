/**
 * evaluationHandler.ts
 * Member 3 — Evaluation & Progress API
 *
 * Routes (all prefixed with /api/evaluation/):
 *
 *  Assessments:
 *    POST   /assessments                              (teacher/admin) create
 *    GET    /assessments                              (any)           list (query: moduleId, subjectId, status)
 *    GET    /assessments/:id                          (any)           get single
 *    PATCH  /assessments/:id                          (teacher/admin) update
 *    DELETE /assessments/:id                          (teacher/admin) delete
 *
 *  Assessment Submissions:
 *    POST   /assessments/:id/submit                   (student)       submit + auto-grade
 *    GET    /assessments/:id/submissions              (teacher/admin) all submissions
 *    GET    /assessments/:id/submissions/mine         (student)       own submission(s)
 *    PATCH  /submissions/assessment/:subId/grade      (teacher/admin) manual grade
 *
 *  Assignments:
 *    POST   /assignments                              (teacher/admin) create
 *    GET    /assignments                              (any)           list (role-scoped)
 *    GET    /assignments/:id                          (any)           get single
 *    PATCH  /assignments/:id                          (teacher/admin) update
 *    DELETE /assignments/:id                          (teacher/admin) delete
 *
 *  Assignment Submissions:
 *    POST   /assignments/:id/submit                   (student)       submit
 *    GET    /assignments/:id/submission               (teacher/admin) get submission
 *    PATCH  /submissions/assignment/:subId/grade      (teacher/admin) grade + leaderboard upsert
 *
 *  Progress:
 *    GET    /progress                                 (student)       own progress records
 *    GET    /progress/:studentId                      (teacher/admin) a student's progress
 *    POST   /progress/event                           (student)       log progress event
 *    GET    /progress/events                          (student)       own event feed
 *
 *  Leaderboard:
 *    GET    /leaderboard                              (any)           list (query: cohortId, programId)
 *    GET    /leaderboard/me                           (student)       own entry
 */

import type { IncomingMessage, ServerResponse } from 'node:http';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from './db.js';
import AssessmentModel from './models/Assessment.js';
import AssessmentSubmissionModel from './models/AssessmentSubmission.js';
import AssignmentModel from './models/Assignment.js';
import AssignmentSubmissionModel from './models/AssignmentSubmission.js';
import ProgressModel from './models/Progress.js';
import ProgressEventModel from './models/ProgressEvent.js';
import LeaderboardScoreModel from './models/LeaderboardScore.js';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const JWT_SECRET = process.env.JWT_SECRET || 'diksha-foundation-secret-key-2026';

interface TokenPayload {
  userId: string;
  role: 'admin' | 'teacher' | 'student';
}

function parseJsonBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      if (!body) { resolve({}); return; }
      try { resolve(JSON.parse(body)); }
      catch (err) { reject(err); }
    });
    req.on('error', (err) => reject(err));
  });
}

function sendJson(res: ServerResponse, statusCode: number, data: any) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

function verifyToken(req: IncomingMessage): TokenPayload | null {
  const authHeader = req.headers['authorization'];
  if (!authHeader?.startsWith('Bearer ')) return null;
  const token = authHeader.slice(7);
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

/** Extract /:segment from a known prefix, e.g. prefix="/api/evaluation/assessments/" */
function extractSegment(url: string, prefix: string): string {
  return url.slice(prefix.length).split('/')[0];
}

// ---------------------------------------------------------------------------
// Auto-grading helper
// ---------------------------------------------------------------------------

interface AutoGradeResult {
  score: number;
  needsManualGrade: boolean;
}

function autoGrade(
  questions: { type: string; correctAnswer?: string | string[]; marks: number }[],
  answers: Record<string, string | string[]>
): AutoGradeResult {
  let score = 0;
  let needsManualGrade = false;

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const key = String(i);
    const studentAnswer = answers[key];

    if (q.type === 'mcq' || q.type === 'true_false') {
      if (
        studentAnswer !== undefined &&
        q.correctAnswer !== undefined &&
        String(studentAnswer).trim().toLowerCase() ===
          String(q.correctAnswer).trim().toLowerCase()
      ) {
        score += q.marks;
      }
    } else if (q.type === 'multiple_select') {
      const correct = Array.isArray(q.correctAnswer)
        ? [...q.correctAnswer].sort().join(',')
        : String(q.correctAnswer ?? '');
      const given = Array.isArray(studentAnswer)
        ? [...studentAnswer].sort().join(',')
        : String(studentAnswer ?? '');
      if (given === correct) {
        score += q.marks;
      }
    } else {
      // short_answer / audio_response / video_response → manual
      needsManualGrade = true;
    }
  }

  return { score, needsManualGrade };
}

// ---------------------------------------------------------------------------
// Leaderboard upsert helper
// ---------------------------------------------------------------------------

async function upsertLeaderboardAssignmentScore(studentId: string) {
  try {
    // Get all graded assignment submissions for this student
    const subs = await AssignmentSubmissionModel.find({
      studentId,
      marks: { $exists: true, $ne: null },
    }).lean();

    if (subs.length === 0) return;

    // Get corresponding assignments to compute percentages
    const assignmentIds = subs.map((s) => s.assignmentId);
    const assignments = await AssignmentModel.find({ _id: { $in: assignmentIds } }).lean();
    const assignmentMap = new Map(assignments.map((a) => [String(a._id), a]));

    let totalPct = 0;
    let count = 0;
    let programId: string | undefined;
    let cohortId: string | undefined;

    for (const sub of subs) {
      const assignment = assignmentMap.get(String(sub.assignmentId));
      if (!assignment || !assignment.maxMarks || assignment.maxMarks === 0) continue;
      totalPct += ((sub.marks ?? 0) / assignment.maxMarks) * 100;
      count++;
      // Use subjectId's cohort/program context — we don't have cohortId here directly,
      // so we'll skip leaderboard update if we can't find the record yet
    }

    if (count === 0) return;
    const avgPct = Math.min(100, Math.round(totalPct / count));

    // Update existing leaderboard record(s) for this student
    await LeaderboardScoreModel.updateMany(
      { studentId },
      {
        $set: { assignmentScore: avgPct },
        $setOnInsert: {
          rank: 9999,
          overallScore: avgPct,
          assessmentScore: 0,
          disciplineScore: 0,
        },
      }
    );

    // Also update StudentProfile model
    const StudentProfileModel = (await import('./models/StudentProfile.js')).default;
    await StudentProfileModel.updateOne(
      { userId: studentId },
      { $set: { assignmentAverage: avgPct } }
    );
  } catch (err) {
    console.error('LeaderboardScore upsert error:', (err as Error).message);
  }
}

// ---------------------------------------------------------------------------
// Main exported handler
// ---------------------------------------------------------------------------

export async function handleEvaluationRequest(
  req: IncomingMessage,
  res: ServerResponse
): Promise<boolean> {
  const rawUrl = req.url ?? '';
  const url = rawUrl.split('?')[0];
  const method = req.method ?? '';

  // Only handle /api/evaluation/ routes
  if (!url.startsWith('/api/evaluation/')) return false;

  // -------------------------------------------------------------------------
  // Establish DB connection (all routes need it)
  // -------------------------------------------------------------------------
  const mongoReady = await connectToDatabase();

  // =========================================================================
  // ASSESSMENTS
  // =========================================================================

  // POST /api/evaluation/assessments — create
  if (url === '/api/evaluation/assessments' && method === 'POST') {
    const user = verifyToken(req);
    if (!user) { sendJson(res, 401, { message: 'Unauthorized' }); return true; }
    if (user.role === 'student') { sendJson(res, 403, { message: 'Forbidden: teachers/admins only' }); return true; }
    if (!mongoReady) { sendJson(res, 503, { message: 'Database unavailable' }); return true; }

    try {
      const body = await parseJsonBody(req);
      const { moduleId, subjectId, title, description, questions, totalMarks, passScore, maxAttempts, status } = body;

      if (!title || totalMarks === undefined || passScore === undefined) {
        sendJson(res, 400, { message: 'title, totalMarks, and passScore are required' });
        return true;
      }

      const assessment = await AssessmentModel.create({
        moduleId: moduleId || undefined,
        subjectId: subjectId || undefined,
        title: title.trim(),
        description: description ?? '',
        questions: questions ?? [],
        totalMarks,
        passScore,
        maxAttempts: maxAttempts ?? 3,
        status: status ?? 'DRAFT',
        createdBy: user.userId,
      });

      sendJson(res, 201, { message: 'Assessment created', assessment });
    } catch (err) {
      sendJson(res, 500, { message: (err as Error).message });
    }
    return true;
  }

  // GET /api/evaluation/assessments — list
  if (url.startsWith('/api/evaluation/assessments') && method === 'GET') {
    const after = url.slice('/api/evaluation/assessments'.length);

    // -----------------------------------------------------------------------
    // GET /api/evaluation/assessments (exact) — list with optional filters
    // -----------------------------------------------------------------------
    if (after === '' || after === '/') {
      const user = verifyToken(req);
      if (!user) { sendJson(res, 401, { message: 'Unauthorized' }); return true; }
      if (!mongoReady) { sendJson(res, 200, { assessments: [] }); return true; }

      try {
        const qs = new URLSearchParams(rawUrl.split('?')[1] ?? '');
        const filter: Record<string, any> = {};
        if (qs.get('moduleId')) filter.moduleId = qs.get('moduleId');
        if (qs.get('subjectId')) filter.subjectId = qs.get('subjectId');
        if (qs.get('status')) filter.status = qs.get('status');
        // Students only see published
        if (user.role === 'student') filter.status = 'PUBLISHED';

        const assessments = await AssessmentModel.find(filter).sort({ createdAt: -1 }).lean();
        sendJson(res, 200, { assessments });
      } catch (err) {
        sendJson(res, 500, { message: (err as Error).message });
      }
      return true;
    }

    const parts = after.split('/').filter(Boolean); // e.g. ['<id>'] or ['<id>', 'submissions'] or ['<id>', 'submissions', 'mine']
    const assessmentId = parts[0];

    // -----------------------------------------------------------------------
    // GET /api/evaluation/assessments/:id/submissions/mine
    // -----------------------------------------------------------------------
    if (parts[1] === 'submissions' && parts[2] === 'mine' && method === 'GET') {
      const user = verifyToken(req);
      if (!user) { sendJson(res, 401, { message: 'Unauthorized' }); return true; }
      if (user.role !== 'student') { sendJson(res, 403, { message: 'Forbidden: students only' }); return true; }
      if (!mongoReady) { sendJson(res, 200, { submissions: [] }); return true; }

      try {
        const submissions = await AssessmentSubmissionModel.find({
          assessmentId,
          studentId: user.userId,
        }).sort({ attemptNumber: -1 }).lean();
        sendJson(res, 200, { submissions });
      } catch (err) {
        sendJson(res, 500, { message: (err as Error).message });
      }
      return true;
    }

    // -----------------------------------------------------------------------
    // GET /api/evaluation/assessments/:id/submissions — all (teacher/admin)
    // -----------------------------------------------------------------------
    if (parts[1] === 'submissions' && method === 'GET') {
      const user = verifyToken(req);
      if (!user) { sendJson(res, 401, { message: 'Unauthorized' }); return true; }
      if (user.role === 'student') { sendJson(res, 403, { message: 'Forbidden: teachers/admins only' }); return true; }
      if (!mongoReady) { sendJson(res, 200, { submissions: [] }); return true; }

      try {
        const submissions = await AssessmentSubmissionModel.find({ assessmentId })
          .populate('studentId', 'name email')
          .sort({ createdAt: -1 })
          .lean();
        sendJson(res, 200, { submissions });
      } catch (err) {
        sendJson(res, 500, { message: (err as Error).message });
      }
      return true;
    }

    // -----------------------------------------------------------------------
    // POST /api/evaluation/assessments/:id/submit — student submits
    // -----------------------------------------------------------------------
    if (parts[1] === 'submit' && method === 'POST') {
      const user = verifyToken(req);
      if (!user) { sendJson(res, 401, { message: 'Unauthorized' }); return true; }
      if (user.role !== 'student') { sendJson(res, 403, { message: 'Forbidden: students only' }); return true; }
      if (!mongoReady) { sendJson(res, 503, { message: 'Database unavailable' }); return true; }

      try {
        const assessment = await AssessmentModel.findById(assessmentId).lean();
        if (!assessment) { sendJson(res, 404, { message: 'Assessment not found' }); return true; }
        if (assessment.status !== 'PUBLISHED') { sendJson(res, 400, { message: 'Assessment is not published' }); return true; }

        // Check attempt count
        const existingAttempts = await AssessmentSubmissionModel.countDocuments({
          assessmentId,
          studentId: user.userId,
        });
        if (existingAttempts >= assessment.maxAttempts) {
          sendJson(res, 400, { message: `Maximum attempts (${assessment.maxAttempts}) reached` });
          return true;
        }

        const body = await parseJsonBody(req);
        const { answers } = body; // expected: { "0": "A", "1": ["X","Y"], ... }

        if (!answers || typeof answers !== 'object') {
          sendJson(res, 400, { message: 'answers object is required' });
          return true;
        }

        const { score, needsManualGrade } = autoGrade(assessment.questions as any[], answers);
        const percentage = assessment.totalMarks > 0
          ? Math.round((score / assessment.totalMarks) * 100)
          : 0;
        const passed = !needsManualGrade && score >= assessment.passScore;

        const submission = await AssessmentSubmissionModel.create({
          assessmentId,
          studentId: user.userId,
          answers,
          score,
          percentage,
          passed,
          status: needsManualGrade ? 'submitted' : 'graded',
          attemptNumber: existingAttempts + 1,
        });

        // Log progress event
        await ProgressEventModel.create({
          studentId: user.userId,
          type: 'assessment_submitted',
          description: `Submitted assessment: ${assessment.title}`,
          entityId: assessment._id,
        });

        sendJson(res, 201, {
          message: needsManualGrade
            ? 'Submitted. Awaiting manual grading for open-ended questions.'
            : `Graded. Score: ${score}/${assessment.totalMarks} (${percentage}%). ${passed ? 'Passed ✓' : 'Not passed ✗'}`,
          submission,
        });
      } catch (err) {
        sendJson(res, 500, { message: (err as Error).message });
      }
      return true;
    }

    // -----------------------------------------------------------------------
    // GET /api/evaluation/assessments/:id — get single
    // -----------------------------------------------------------------------
    if (parts.length === 1 && method === 'GET') {
      const user = verifyToken(req);
      if (!user) { sendJson(res, 401, { message: 'Unauthorized' }); return true; }
      if (!mongoReady) { sendJson(res, 503, { message: 'Database unavailable' }); return true; }

      try {
        const assessment = await AssessmentModel.findById(assessmentId).lean();
        if (!assessment) { sendJson(res, 404, { message: 'Assessment not found' }); return true; }
        // Students don't see correct answers
        if (user.role === 'student') {
          const sanitized = {
            ...assessment,
            questions: (assessment.questions as any[]).map((q) => ({
              ...q,
              correctAnswer: undefined,
            })),
          };
          sendJson(res, 200, { assessment: sanitized });
        } else {
          sendJson(res, 200, { assessment });
        }
      } catch (err) {
        sendJson(res, 500, { message: (err as Error).message });
      }
      return true;
    }

    // -----------------------------------------------------------------------
    // PATCH /api/evaluation/assessments/:id — update
    // -----------------------------------------------------------------------
    if (parts.length === 1 && method === 'PATCH') {
      const user = verifyToken(req);
      if (!user) { sendJson(res, 401, { message: 'Unauthorized' }); return true; }
      if (user.role === 'student') { sendJson(res, 403, { message: 'Forbidden: teachers/admins only' }); return true; }
      if (!mongoReady) { sendJson(res, 503, { message: 'Database unavailable' }); return true; }

      try {
        const body = await parseJsonBody(req);
        const allowed = ['title', 'description', 'questions', 'totalMarks', 'passScore', 'maxAttempts', 'status'];
        const updates: Record<string, any> = {};
        for (const key of allowed) {
          if (body[key] !== undefined) updates[key] = body[key];
        }

        const assessment = await AssessmentModel.findByIdAndUpdate(
          assessmentId,
          { $set: updates },
          { new: true, runValidators: true }
        ).lean();

        if (!assessment) { sendJson(res, 404, { message: 'Assessment not found' }); return true; }
        sendJson(res, 200, { message: 'Assessment updated', assessment });
      } catch (err) {
        sendJson(res, 500, { message: (err as Error).message });
      }
      return true;
    }

    // -----------------------------------------------------------------------
    // DELETE /api/evaluation/assessments/:id — delete
    // -----------------------------------------------------------------------
    if (parts.length === 1 && method === 'DELETE') {
      const user = verifyToken(req);
      if (!user) { sendJson(res, 401, { message: 'Unauthorized' }); return true; }
      if (user.role === 'student') { sendJson(res, 403, { message: 'Forbidden: teachers/admins only' }); return true; }
      if (!mongoReady) { sendJson(res, 503, { message: 'Database unavailable' }); return true; }

      try {
        const assessment = await AssessmentModel.findByIdAndDelete(assessmentId).lean();
        if (!assessment) { sendJson(res, 404, { message: 'Assessment not found' }); return true; }
        sendJson(res, 200, { message: 'Assessment deleted' });
      } catch (err) {
        sendJson(res, 500, { message: (err as Error).message });
      }
      return true;
    }
  }

  // =========================================================================
  // ASSESSMENT SUBMISSIONS — manual grade
  // PATCH /api/evaluation/submissions/assessment/:subId/grade
  // =========================================================================
  if (url.startsWith('/api/evaluation/submissions/assessment/') && url.endsWith('/grade') && method === 'PATCH') {
    const user = verifyToken(req);
    if (!user) { sendJson(res, 401, { message: 'Unauthorized' }); return true; }
    if (user.role === 'student') { sendJson(res, 403, { message: 'Forbidden: teachers/admins only' }); return true; }
    if (!mongoReady) { sendJson(res, 503, { message: 'Database unavailable' }); return true; }

    try {
      const subId = extractSegment(url, '/api/evaluation/submissions/assessment/');
      const body = await parseJsonBody(req);
      const { score, feedback } = body;

      if (score === undefined || typeof score !== 'number') {
        sendJson(res, 400, { message: 'score (number) is required' });
        return true;
      }

      const sub = await AssessmentSubmissionModel.findById(subId);
      if (!sub) { sendJson(res, 404, { message: 'Submission not found' }); return true; }

      const assessment = await AssessmentModel.findById(sub.assessmentId).lean();
      const totalMarks = assessment?.totalMarks ?? 0;
      const passScore = assessment?.passScore ?? 0;
      const percentage = totalMarks > 0 ? Math.round((score / totalMarks) * 100) : 0;

      sub.score = score;
      sub.percentage = percentage;
      sub.passed = score >= passScore;
      sub.status = 'graded';
      if (feedback !== undefined) sub.feedback = feedback;
      await sub.save();

      sendJson(res, 200, { message: 'Assessment submission graded', submission: sub });
    } catch (err) {
      sendJson(res, 500, { message: (err as Error).message });
    }
    return true;
  }

  // =========================================================================
  // ASSIGNMENTS
  // =========================================================================

  // POST /api/evaluation/assignments — create
  if (url === '/api/evaluation/assignments' && method === 'POST') {
    const user = verifyToken(req);
    if (!user) { sendJson(res, 401, { message: 'Unauthorized' }); return true; }
    if (user.role === 'student') { sendJson(res, 403, { message: 'Forbidden: teachers/admins only' }); return true; }
    if (!mongoReady) { sendJson(res, 503, { message: 'Database unavailable' }); return true; }

    try {
      const body = await parseJsonBody(req);
      const { studentId, subjectId, moduleId, title, instructions, attachments, maxMarks, dueDate } = body;

      if (!studentId || !title || maxMarks === undefined || !dueDate) {
        sendJson(res, 400, { message: 'studentId, title, maxMarks, and dueDate are required' });
        return true;
      }

      if (studentId === 'ALL') {
        const assignment = await AssignmentModel.create({
          studentId: undefined, // Shared assignment
          teacherId: user.userId,
          subjectId: subjectId || undefined,
          moduleId: moduleId || undefined,
          title: title.trim(),
          instructions: instructions ?? '',
          attachments: attachments ?? [],
          maxMarks,
          dueDate: new Date(dueDate),
          status: 'PUBLISHED', // Shared assignments are marked PUBLISHED
        });
        sendJson(res, 201, { message: 'Shared assignment created for all students', assignments: [assignment] });
        return true;
      }

      const assignment = await AssignmentModel.create({
        studentId,
        teacherId: user.userId,
        subjectId: subjectId || undefined,
        moduleId: moduleId || undefined,
        title: title.trim(),
        instructions: instructions ?? '',
        attachments: attachments ?? [],
        maxMarks,
        dueDate: new Date(dueDate),
        status: 'NEW',
      });

      sendJson(res, 201, { message: 'Assignment created', assignment });
    } catch (err) {
      sendJson(res, 500, { message: (err as Error).message });
    }
    return true;
  }

  // GET /api/evaluation/assignments — list (role-scoped)
  if (url === '/api/evaluation/assignments' && method === 'GET') {
    const user = verifyToken(req);
    if (!user) { sendJson(res, 401, { message: 'Unauthorized' }); return true; }
    if (!mongoReady) { sendJson(res, 200, { assignments: [] }); return true; }

    try {
      const qs = new URLSearchParams(rawUrl.split('?')[1] ?? '');
      const filter: Record<string, any> = {};

      const mongoose = (await import('mongoose')).default;
      let targetStudentId = qs.get('studentId');

      if (user.role === 'student') {
        const sid = mongoose.Types.ObjectId.isValid(user.userId) ? user.userId : null;
        targetStudentId = sid as string;
        filter.$or = [
          { studentId: sid },
          { studentId: { $exists: false } },
          { studentId: null }
        ];
      } else if (user.role === 'teacher') {
        filter.teacherId = mongoose.Types.ObjectId.isValid(user.userId) ? user.userId : null;
        if (targetStudentId) filter.studentId = targetStudentId;
      } else {
        // admin sees all
        if (targetStudentId) filter.studentId = targetStudentId;
      }

      if (qs.get('subjectId')) filter.subjectId = qs.get('subjectId');
      if (qs.get('moduleId')) filter.moduleId = qs.get('moduleId');
      
      // Note: we don't apply qs.get('status') to the DB filter if we are mapping it dynamically for students.
      if (!targetStudentId && qs.get('status')) {
        filter.status = qs.get('status');
      }

      let assignments = await AssignmentModel.find(filter).sort({ dueDate: 1 }).lean();

      // Dynamic mapping for students
      if (targetStudentId && mongoose.Types.ObjectId.isValid(targetStudentId)) {
        const submissions = await AssignmentSubmissionModel.find({ studentId: targetStudentId }).lean();
        const subMap = new Map(submissions.map(s => [String(s.assignmentId), s]));
        
        assignments = assignments.map((a: any) => {
          const sub = subMap.get(String(a._id));
          if (sub) {
            a.status = sub.marks !== undefined ? 'GRADED' : (sub.isLate ? 'LATE' : 'SUBMITTED');
          } else {
            a.status = new Date() > new Date(a.dueDate) ? 'OVERDUE' : 'NEW';
          }
          return a;
        });

        // Apply status filter after mapping if necessary
        if (qs.get('status')) {
          assignments = assignments.filter(a => a.status === qs.get('status'));
        }
      }

      sendJson(res, 200, { assignments });
    } catch (err) {
      sendJson(res, 500, { message: (err as Error).message });
    }
    return true;
  }

  if (url.startsWith('/api/evaluation/assignments/') && url !== '/api/evaluation/assignments/') {
    const after = url.slice('/api/evaluation/assignments/'.length);
    const parts = after.split('/').filter(Boolean);
    const assignmentId = parts[0];

    // -----------------------------------------------------------------------
    // POST /api/evaluation/assignments/:id/submit — student submits
    // -----------------------------------------------------------------------
    if (parts[1] === 'submit' && method === 'POST') {
      const user = verifyToken(req);
      if (!user) { sendJson(res, 401, { message: 'Unauthorized' }); return true; }
      if (user.role !== 'student') { sendJson(res, 403, { message: 'Forbidden: students only' }); return true; }
      if (!mongoReady) { sendJson(res, 503, { message: 'Database unavailable' }); return true; }

      try {
        const assignment = await AssignmentModel.findById(assignmentId);
        if (!assignment) { sendJson(res, 404, { message: 'Assignment not found' }); return true; }
        if (String(assignment.studentId) !== user.userId) {
          sendJson(res, 403, { message: 'This assignment is not assigned to you' });
          return true;
        }

        const body = await parseJsonBody(req);
        const { textResponse, attachments } = body;
        const isLate = new Date() > new Date(assignment.dueDate);

        // Upsert: one submission per student per assignment
        const existing = await AssignmentSubmissionModel.findOne({
          assignmentId,
          studentId: user.userId,
        });

        let submission;
        if (existing) {
          existing.textResponse = textResponse ?? existing.textResponse;
          existing.attachments = attachments ?? existing.attachments;
          existing.isLate = isLate;
          submission = await existing.save();
        } else {
          submission = await AssignmentSubmissionModel.create({
            assignmentId,
            studentId: user.userId,
            textResponse: textResponse ?? '',
            attachments: attachments ?? [],
            isLate,
          });
        }

        // Log progress event
        await ProgressEventModel.create({
          studentId: user.userId,
          type: 'assignment_submitted',
          description: `Submitted assignment: ${assignment.title}${isLate ? ' (late)' : ''}`,
          entityId: assignment._id,
        });

        sendJson(res, 201, {
          message: isLate ? 'Assignment submitted (marked as late)' : 'Assignment submitted successfully',
          submission,
        });
      } catch (err) {
        sendJson(res, 500, { message: (err as Error).message });
      }
      return true;
    }

    // -----------------------------------------------------------------------
    // GET /api/evaluation/assignments/:id/submission — teacher/admin gets submission
    // -----------------------------------------------------------------------
    if (parts[1] === 'submission' && method === 'GET') {
      const user = verifyToken(req);
      if (!user) { sendJson(res, 401, { message: 'Unauthorized' }); return true; }
      if (user.role === 'student') { sendJson(res, 403, { message: 'Forbidden: teachers/admins only' }); return true; }
      if (!mongoReady) { sendJson(res, 503, { message: 'Database unavailable' }); return true; }

      try {
        const submission = await AssignmentSubmissionModel.findOne({ assignmentId })
          .populate('studentId', 'name email')
          .lean();
        if (!submission) { sendJson(res, 404, { message: 'No submission found for this assignment' }); return true; }
        sendJson(res, 200, { submission });
      } catch (err) {
        sendJson(res, 500, { message: (err as Error).message });
      }
      return true;
    }

    // -----------------------------------------------------------------------
    // GET /api/evaluation/assignments/:id — get single
    // -----------------------------------------------------------------------
    if (parts.length === 1 && method === 'GET') {
      const user = verifyToken(req);
      if (!user) { sendJson(res, 401, { message: 'Unauthorized' }); return true; }
      if (!mongoReady) { sendJson(res, 503, { message: 'Database unavailable' }); return true; }

      try {
        const assignment = await AssignmentModel.findById(assignmentId).lean();
        if (!assignment) { sendJson(res, 404, { message: 'Assignment not found' }); return true; }
        // Students can only see their own assignments
        if (user.role === 'student' && String(assignment.studentId) !== user.userId) {
          sendJson(res, 403, { message: 'Forbidden' });
          return true;
        }
        sendJson(res, 200, { assignment });
      } catch (err) {
        sendJson(res, 500, { message: (err as Error).message });
      }
      return true;
    }

    // -----------------------------------------------------------------------
    // PATCH /api/evaluation/assignments/:id — update
    // -----------------------------------------------------------------------
    if (parts.length === 1 && method === 'PATCH') {
      const user = verifyToken(req);
      if (!user) { sendJson(res, 401, { message: 'Unauthorized' }); return true; }
      if (user.role === 'student') { sendJson(res, 403, { message: 'Forbidden: teachers/admins only' }); return true; }
      if (!mongoReady) { sendJson(res, 503, { message: 'Database unavailable' }); return true; }

      try {
        const body = await parseJsonBody(req);
        const allowed = ['title', 'instructions', 'attachments', 'maxMarks', 'dueDate', 'status', 'studentId', 'subjectId', 'moduleId'];
        const updates: Record<string, any> = {};
        for (const key of allowed) {
          if (body[key] !== undefined) {
            updates[key] = key === 'dueDate' ? new Date(body[key]) : body[key];
          }
        }

        const assignment = await AssignmentModel.findByIdAndUpdate(
          assignmentId,
          { $set: updates },
          { new: true, runValidators: true }
        ).lean();

        if (!assignment) { sendJson(res, 404, { message: 'Assignment not found' }); return true; }
        sendJson(res, 200, { message: 'Assignment updated', assignment });
      } catch (err) {
        sendJson(res, 500, { message: (err as Error).message });
      }
      return true;
    }

    // -----------------------------------------------------------------------
    // DELETE /api/evaluation/assignments/:id — delete
    // -----------------------------------------------------------------------
    if (parts.length === 1 && method === 'DELETE') {
      const user = verifyToken(req);
      if (!user) { sendJson(res, 401, { message: 'Unauthorized' }); return true; }
      if (user.role === 'student') { sendJson(res, 403, { message: 'Forbidden: teachers/admins only' }); return true; }
      if (!mongoReady) { sendJson(res, 503, { message: 'Database unavailable' }); return true; }

      try {
        const assignment = await AssignmentModel.findByIdAndDelete(assignmentId).lean();
        if (!assignment) { sendJson(res, 404, { message: 'Assignment not found' }); return true; }
        sendJson(res, 200, { message: 'Assignment deleted' });
      } catch (err) {
        sendJson(res, 500, { message: (err as Error).message });
      }
      return true;
    }
  }

  // =========================================================================
  // ASSIGNMENT SUBMISSIONS — manual grade
  // PATCH /api/evaluation/submissions/assignment/:subId/grade
  // =========================================================================
  if (url.startsWith('/api/evaluation/submissions/assignment/') && url.endsWith('/grade') && method === 'PATCH') {
    const user = verifyToken(req);
    if (!user) { sendJson(res, 401, { message: 'Unauthorized' }); return true; }
    if (user.role === 'student') { sendJson(res, 403, { message: 'Forbidden: teachers/admins only' }); return true; }
    if (!mongoReady) { sendJson(res, 503, { message: 'Database unavailable' }); return true; }

    try {
      const subId = extractSegment(url, '/api/evaluation/submissions/assignment/');
      const body = await parseJsonBody(req);
      const { marks, feedback } = body;

      if (marks === undefined || typeof marks !== 'number') {
        sendJson(res, 400, { message: 'marks (number) is required' });
        return true;
      }

      const sub = await AssignmentSubmissionModel.findById(subId);
      if (!sub) { sendJson(res, 404, { message: 'Submission not found' }); return true; }

      sub.marks = marks;
      if (feedback !== undefined) sub.feedback = feedback;
      sub.gradedAt = new Date();
      sub.gradedBy = user.userId as any;
      await sub.save();

      // Async leaderboard upsert (non-blocking)
      upsertLeaderboardAssignmentScore(String(sub.studentId)).catch(() => {});

      sendJson(res, 200, { message: 'Assignment graded successfully', submission: sub });
    } catch (err) {
      sendJson(res, 500, { message: (err as Error).message });
    }
    return true;
  }

  // =========================================================================
  // PROGRESS
  // =========================================================================

  // GET /api/evaluation/progress/events — own event feed (must come before /progress/:studentId)
  if (url === '/api/evaluation/progress/events' && method === 'GET') {
    const user = verifyToken(req);
    if (!user) { sendJson(res, 401, { message: 'Unauthorized' }); return true; }
    if (!mongoReady) { sendJson(res, 200, { events: [] }); return true; }

    try {
      const qs = new URLSearchParams(rawUrl.split('?')[1] ?? '');
      const limit = Math.min(parseInt(qs.get('limit') ?? '50', 10), 200);
      const studentId = user.role === 'student' ? user.userId : (qs.get('studentId') ?? user.userId);

      const events = await ProgressEventModel.find({ studentId })
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean();

      sendJson(res, 200, { events });
    } catch (err) {
      sendJson(res, 500, { message: (err as Error).message });
    }
    return true;
  }

  // POST /api/evaluation/progress/event — log progress event
  if (url === '/api/evaluation/progress/event' && method === 'POST') {
    const user = verifyToken(req);
    if (!user) { sendJson(res, 401, { message: 'Unauthorized' }); return true; }
    if (!mongoReady) { sendJson(res, 503, { message: 'Database unavailable' }); return true; }

    try {
      const body = await parseJsonBody(req);
      const { type, description, entityId } = body;

      const VALID_TYPES = ['content_completed', 'assessment_submitted', 'assignment_submitted', 'login', 'module_completed'];
      if (!type || !VALID_TYPES.includes(type)) {
        sendJson(res, 400, { message: `type must be one of: ${VALID_TYPES.join(', ')}` });
        return true;
      }
      if (!description) {
        sendJson(res, 400, { message: 'description is required' });
        return true;
      }

      const event = await ProgressEventModel.create({
        studentId: user.userId,
        type,
        description: description.trim(),
        entityId: entityId ?? undefined,
      });

      // If content_completed, try to update the Progress record
      if (type === 'content_completed' && entityId && body.moduleId && body.subjectId) {
        try {
          const progress = await ProgressModel.findOne({
            studentId: user.userId,
            moduleId: body.moduleId,
          });

          if (progress) {
            const alreadyCompleted = progress.completedContentIds
              .map(String)
              .includes(String(entityId));

            if (!alreadyCompleted) {
              progress.completedContentIds.push(entityId);
              progress.lastAccessedAt = new Date();
              // Recompute completionPercentage if totalItems provided
              if (body.totalItems && body.totalItems > 0) {
                progress.completionPercentage = Math.round(
                  (progress.completedContentIds.length / body.totalItems) * 100
                );
              }
              await progress.save();
            }
          } else {
            // First access — create progress record
            await ProgressModel.create({
              studentId: user.userId,
              subjectId: body.subjectId,
              moduleId: body.moduleId,
              completedContentIds: [entityId],
              completionPercentage: body.totalItems ? Math.round((1 / body.totalItems) * 100) : 0,
              lastAccessedAt: new Date(),
            });
          }
        } catch {
          // Non-fatal — progress update failure doesn't fail the event
        }
      }

      sendJson(res, 201, { message: 'Progress event logged', event });
    } catch (err) {
      sendJson(res, 500, { message: (err as Error).message });
    }
    return true;
  }

  // GET /api/evaluation/progress — own progress records (student)
  if (url === '/api/evaluation/progress' && method === 'GET') {
    const user = verifyToken(req);
    if (!user) { sendJson(res, 401, { message: 'Unauthorized' }); return true; }
    if (!mongoReady) { sendJson(res, 200, { progress: [] }); return true; }

    try {
      const studentId = user.role === 'student'
        ? user.userId
        : (new URLSearchParams(rawUrl.split('?')[1] ?? '')).get('studentId') ?? user.userId;

      const progress = await ProgressModel.find({ studentId })
        .populate('subjectId', 'name')
        .populate('moduleId', 'title')
        .sort({ lastAccessedAt: -1 })
        .lean();

      sendJson(res, 200, { progress });
    } catch (err) {
      sendJson(res, 500, { message: (err as Error).message });
    }
    return true;
  }

  // GET /api/evaluation/progress/:studentId — teacher/admin views a student's progress
  if (url.startsWith('/api/evaluation/progress/') && method === 'GET') {
    const user = verifyToken(req);
    if (!user) { sendJson(res, 401, { message: 'Unauthorized' }); return true; }
    if (user.role === 'student') { sendJson(res, 403, { message: 'Forbidden: teachers/admins only' }); return true; }
    if (!mongoReady) { sendJson(res, 200, { progress: [] }); return true; }

    try {
      const studentId = url.slice('/api/evaluation/progress/'.length).split('/')[0];
      const progress = await ProgressModel.find({ studentId })
        .populate('subjectId', 'name')
        .populate('moduleId', 'title')
        .sort({ lastAccessedAt: -1 })
        .lean();

      sendJson(res, 200, { progress });
    } catch (err) {
      sendJson(res, 500, { message: (err as Error).message });
    }
    return true;
  }

  // =========================================================================
  // LEADERBOARD
  // =========================================================================

  // GET /api/evaluation/leaderboard/me — own entry
  if (url === '/api/evaluation/leaderboard/me' && method === 'GET') {
    const user = verifyToken(req);
    if (!user) { sendJson(res, 401, { message: 'Unauthorized' }); return true; }
    if (!mongoReady) { sendJson(res, 200, { score: null }); return true; }

    try {
      const score = await LeaderboardScoreModel.findOne({ studentId: user.userId })
        .populate('programId', 'name')
        .populate('cohortId', 'name')
        .lean();

      sendJson(res, 200, { score });
    } catch (err) {
      sendJson(res, 500, { message: (err as Error).message });
    }
    return true;
  }

  // GET /api/evaluation/leaderboard — list (filter by cohortId / programId)
  if (url === '/api/evaluation/leaderboard' && method === 'GET') {
    const user = verifyToken(req);
    if (!user) { sendJson(res, 401, { message: 'Unauthorized' }); return true; }
    if (!mongoReady) { sendJson(res, 200, { leaderboard: [] }); return true; }

    try {
      const qs = new URLSearchParams(rawUrl.split('?')[1] ?? '');
      const filter: Record<string, any> = {};
      if (qs.get('cohortId')) filter.cohortId = qs.get('cohortId');
      if (qs.get('programId')) filter.programId = qs.get('programId');

      const leaderboard = await LeaderboardScoreModel.find(filter)
        .populate('studentId', 'name email')
        .populate('programId', 'name')
        .populate('cohortId', 'name')
        .sort({ rank: 1, overallScore: -1 })
        .lean();

      sendJson(res, 200, { leaderboard });
    } catch (err) {
      sendJson(res, 500, { message: (err as Error).message });
    }
    return true;
  }

  // Route not handled by this handler
  return false;
}
