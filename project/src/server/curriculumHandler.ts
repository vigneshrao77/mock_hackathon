import type { IncomingMessage, ServerResponse } from 'node:http';
import { connectToDatabase } from './db.js';
import ProgramModel from './models/Program.js';
import CohortModel from './models/Cohort.js';
import SubjectModel from './models/Subject.js';
import ModuleModel from './models/Module.js';
import ContentItemModel from './models/ContentItem.js';
import StudentProfileModel from './models/StudentProfile.ts';

function parseJsonBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', (err) => reject(err));
  });
}

function sendJson(res: ServerResponse, statusCode: number, data: any) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

function extractParams(url: string, prefix: string): { path: string; id?: string; action?: string } {
  const cleanUrl = url.split('?')[0];
  const relative = cleanUrl.replace(prefix, '');
  const parts = relative.split('/').filter(Boolean);
  return {
    path: parts[0] || '',
    id: parts[0] && parts[0] !== 'assign-students' ? parts[0] : undefined,
    action: parts[1],
  };
}

/**
 * Curriculum Handler for Member 2: Curriculum & Architecture
 * Handles API requests under /api/curriculum/ for:
 *  - Programs (create, read, update, delete)
 *  - Cohorts (create, read, update, delete, student assignment)
 *  - Subjects (create, read, update, delete)
 *  - Modules (create, read, update, delete)
 *  - Content Items (create, read, update, delete)
 */
export async function handleCurriculumRequest(req: IncomingMessage, res: ServerResponse): Promise<boolean> {
  const rawUrl = req.url || '';
  if (!rawUrl.startsWith('/api/curriculum')) {
    return false;
  }

  const connected = await connectToDatabase();
  if (!connected) {
    sendJson(res, 503, { message: 'Database connection unavailable' });
    return true;
  }

  const urlObj = new URL(rawUrl, 'http://localhost');
  const pathname = urlObj.pathname;
  const searchParams = urlObj.searchParams;

  try {
    // -------------------------------------------------------------
    // 1. PROGRAMS API (/api/curriculum/programs)
    // -------------------------------------------------------------
    if (pathname.startsWith('/api/curriculum/programs')) {
      const parts = pathname.replace('/api/curriculum/programs', '').split('/').filter(Boolean);
      const programId = parts[0];

      // GET /api/curriculum/programs
      if (req.method === 'GET' && !programId) {
        const statusFilter = searchParams.get('status');
        const query = statusFilter ? { status: statusFilter } : {};
        const programs = await ProgramModel.find(query)
          .populate('cohortIds')
          .populate('subjectIds')
          .sort({ createdAt: -1 });
        sendJson(res, 200, { data: programs });
        return true;
      }

      // GET /api/curriculum/programs/:id
      if (req.method === 'GET' && programId) {
        const program = await ProgramModel.findById(programId)
          .populate('cohortIds')
          .populate('subjectIds');
        if (!program) {
          sendJson(res, 404, { message: 'Program not found' });
          return true;
        }
        sendJson(res, 200, { data: program });
        return true;
      }

      // POST /api/curriculum/programs
      if (req.method === 'POST' && !programId) {
        const body = await parseJsonBody(req);
        const { name, description, status } = body;

        if (!name || typeof name !== 'string' || !name.trim()) {
          sendJson(res, 400, { message: 'Program name is required' });
          return true;
        }

        const newProgram = await ProgramModel.create({
          name: name.trim(),
          description: description?.trim() || '',
          status: status || 'active',
          cohortIds: [],
          subjectIds: [],
        });

        sendJson(res, 201, { message: 'Program created successfully', data: newProgram });
        return true;
      }

      // PUT /api/curriculum/programs/:id
      if (req.method === 'PUT' && programId) {
        const body = await parseJsonBody(req);
        const updated = await ProgramModel.findByIdAndUpdate(programId, body, {
          new: true,
          runValidators: true,
        });
        if (!updated) {
          sendJson(res, 404, { message: 'Program not found' });
          return true;
        }
        sendJson(res, 200, { message: 'Program updated successfully', data: updated });
        return true;
      }

      // DELETE /api/curriculum/programs/:id
      if (req.method === 'DELETE' && programId) {
        const deleted = await ProgramModel.findByIdAndDelete(programId);
        if (!deleted) {
          sendJson(res, 404, { message: 'Program not found' });
          return true;
        }
        sendJson(res, 200, { message: 'Program deleted successfully' });
        return true;
      }
    }

    // -------------------------------------------------------------
    // 2. COHORTS API (/api/curriculum/cohorts)
    // -------------------------------------------------------------
    if (pathname.startsWith('/api/curriculum/cohorts')) {
      const parts = pathname.replace('/api/curriculum/cohorts', '').split('/').filter(Boolean);
      const cohortId = parts[0];
      const action = parts[1];

      // POST /api/curriculum/cohorts/:id/assign-students
      if (req.method === 'POST' && cohortId && action === 'assign-students') {
        const body = await parseJsonBody(req);
        const { studentIds } = body;

        if (!Array.isArray(studentIds)) {
          sendJson(res, 400, { message: 'studentIds must be an array of Student IDs' });
          return true;
        }

        const cohort = await CohortModel.findById(cohortId);
        if (!cohort) {
          sendJson(res, 404, { message: 'Cohort not found' });
          return true;
        }

        // Update student profiles with new cohortId
        await StudentProfileModel.updateMany(
          { _id: { $in: studentIds } },
          { $set: { cohortId: cohort._id } }
        );

        // Update count of students in cohort
        const totalEnrolled = await StudentProfileModel.countDocuments({ cohortId: cohort._id });
        cohort.studentCount = totalEnrolled;
        await cohort.save();

        sendJson(res, 200, {
          message: `Assigned ${studentIds.length} students to cohort ${cohort.name}`,
          data: cohort,
        });
        return true;
      }

      // GET /api/curriculum/cohorts
      if (req.method === 'GET' && !cohortId) {
        const programIdFilter = searchParams.get('programId');
        const query = programIdFilter ? { programId: programIdFilter } : {};
        const cohorts = await CohortModel.find(query).populate('programId').sort({ createdAt: -1 });
        sendJson(res, 200, { data: cohorts });
        return true;
      }

      // GET /api/curriculum/cohorts/:id
      if (req.method === 'GET' && cohortId) {
        const cohort = await CohortModel.findById(cohortId).populate('programId');
        if (!cohort) {
          sendJson(res, 404, { message: 'Cohort not found' });
          return true;
        }
        sendJson(res, 200, { data: cohort });
        return true;
      }

      // POST /api/curriculum/cohorts
      if (req.method === 'POST' && !cohortId) {
        const body = await parseJsonBody(req);
        const { name, programId } = body;

        if (!name || typeof name !== 'string' || !name.trim()) {
          sendJson(res, 400, { message: 'Cohort name is required' });
          return true;
        }

        if (!programId) {
          sendJson(res, 400, { message: 'programId is required' });
          return true;
        }

        const program = await ProgramModel.findById(programId);
        if (!program) {
          sendJson(res, 404, { message: 'Referenced program not found' });
          return true;
        }

        const newCohort = await CohortModel.create({
          name: name.trim(),
          programId,
          studentCount: 0,
        });

        // Register cohort under program
        program.cohortIds.push(newCohort._id);
        await program.save();

        sendJson(res, 201, { message: 'Cohort created successfully', data: newCohort });
        return true;
      }

      // PUT /api/curriculum/cohorts/:id
      if (req.method === 'PUT' && cohortId) {
        const body = await parseJsonBody(req);
        const updated = await CohortModel.findByIdAndUpdate(cohortId, body, {
          new: true,
          runValidators: true,
        });
        if (!updated) {
          sendJson(res, 404, { message: 'Cohort not found' });
          return true;
        }
        sendJson(res, 200, { message: 'Cohort updated successfully', data: updated });
        return true;
      }

      // DELETE /api/curriculum/cohorts/:id
      if (req.method === 'DELETE' && cohortId) {
        const deleted = await CohortModel.findByIdAndDelete(cohortId);
        if (!deleted) {
          sendJson(res, 404, { message: 'Cohort not found' });
          return true;
        }
        // Remove from program cohort list
        await ProgramModel.findByIdAndUpdate(deleted.programId, {
          $pull: { cohortIds: deleted._id },
        });

        sendJson(res, 200, { message: 'Cohort deleted successfully' });
        return true;
      }
    }

    // -------------------------------------------------------------
    // 3. SUBJECTS API (/api/curriculum/subjects)
    // -------------------------------------------------------------
    if (pathname.startsWith('/api/curriculum/subjects')) {
      const parts = pathname.replace('/api/curriculum/subjects', '').split('/').filter(Boolean);
      const subjectId = parts[0];

      // GET /api/curriculum/subjects
      if (req.method === 'GET' && !subjectId) {
        const programIdFilter = searchParams.get('programId');
        const query = programIdFilter ? { programId: programIdFilter } : {};
        const subjects = await SubjectModel.find(query)
          .populate('programId')
          .populate('moduleIds')
          .sort({ createdAt: -1 });
        sendJson(res, 200, { data: subjects });
        return true;
      }

      // GET /api/curriculum/subjects/:id
      if (req.method === 'GET' && subjectId) {
        const subject = await SubjectModel.findById(subjectId)
          .populate('programId')
          .populate('moduleIds');
        if (!subject) {
          sendJson(res, 404, { message: 'Subject not found' });
          return true;
        }
        sendJson(res, 200, { data: subject });
        return true;
      }

      // POST /api/curriculum/subjects
      if (req.method === 'POST' && !subjectId) {
        const body = await parseJsonBody(req);
        const { name, description, programId, status } = body;

        if (!name || typeof name !== 'string' || !name.trim()) {
          sendJson(res, 400, { message: 'Subject name is required' });
          return true;
        }

        if (!programId) {
          sendJson(res, 400, { message: 'programId is required' });
          return true;
        }

        const program = await ProgramModel.findById(programId);
        if (!program) {
          sendJson(res, 404, { message: 'Referenced program not found' });
          return true;
        }

        const newSubject = await SubjectModel.create({
          name: name.trim(),
          description: description?.trim() || '',
          programId,
          status: status || 'DRAFT',
          moduleIds: [],
        });

        // Add to program's subjectIds array
        program.subjectIds.push(newSubject._id);
        await program.save();

        sendJson(res, 201, { message: 'Subject created successfully', data: newSubject });
        return true;
      }

      // PUT /api/curriculum/subjects/:id
      if (req.method === 'PUT' && subjectId) {
        const body = await parseJsonBody(req);
        const updated = await SubjectModel.findByIdAndUpdate(subjectId, body, {
          new: true,
          runValidators: true,
        });
        if (!updated) {
          sendJson(res, 404, { message: 'Subject not found' });
          return true;
        }
        sendJson(res, 200, { message: 'Subject updated successfully', data: updated });
        return true;
      }

      // DELETE /api/curriculum/subjects/:id
      if (req.method === 'DELETE' && subjectId) {
        const deleted = await SubjectModel.findByIdAndDelete(subjectId);
        if (!deleted) {
          sendJson(res, 404, { message: 'Subject not found' });
          return true;
        }
        // Remove reference from program
        await ProgramModel.findByIdAndUpdate(deleted.programId, {
          $pull: { subjectIds: deleted._id },
        });

        sendJson(res, 200, { message: 'Subject deleted successfully' });
        return true;
      }
    }

    // -------------------------------------------------------------
    // 4. MODULES API (/api/curriculum/modules)
    // -------------------------------------------------------------
    if (pathname.startsWith('/api/curriculum/modules')) {
      const parts = pathname.replace('/api/curriculum/modules', '').split('/').filter(Boolean);
      const moduleId = parts[0];

      // GET /api/curriculum/modules
      if (req.method === 'GET' && !moduleId) {
        const subjectIdFilter = searchParams.get('subjectId');
        const query = subjectIdFilter ? { subjectId: subjectIdFilter } : {};
        const modules = await ModuleModel.find(query)
          .populate('contentIds')
          .populate('assessmentIds')
          .sort({ order: 1 });
        sendJson(res, 200, { data: modules });
        return true;
      }

      // GET /api/curriculum/modules/:id
      if (req.method === 'GET' && moduleId) {
        const moduleItem = await ModuleModel.findById(moduleId)
          .populate('contentIds')
          .populate('assessmentIds');
        if (!moduleItem) {
          sendJson(res, 404, { message: 'Module not found' });
          return true;
        }
        sendJson(res, 200, { data: moduleItem });
        return true;
      }

      // POST /api/curriculum/modules
      if (req.method === 'POST' && !moduleId) {
        const body = await parseJsonBody(req);
        const { title, description, subjectId, order, status } = body;

        if (!title || typeof title !== 'string' || !title.trim()) {
          sendJson(res, 400, { message: 'Module title is required' });
          return true;
        }

        if (!subjectId) {
          sendJson(res, 400, { message: 'subjectId is required' });
          return true;
        }

        const subject = await SubjectModel.findById(subjectId);
        if (!subject) {
          sendJson(res, 404, { message: 'Referenced subject not found' });
          return true;
        }

        const moduleOrder = order ?? (subject.moduleIds.length + 1);

        const newModule = await ModuleModel.create({
          title: title.trim(),
          description: description?.trim() || '',
          subjectId,
          order: moduleOrder,
          status: status || 'DRAFT',
          contentIds: [],
          assessmentIds: [],
        });

        // Add to subject's moduleIds
        subject.moduleIds.push(newModule._id);
        await subject.save();

        sendJson(res, 201, { message: 'Module created successfully', data: newModule });
        return true;
      }

      // PUT /api/curriculum/modules/:id
      if (req.method === 'PUT' && moduleId) {
        const body = await parseJsonBody(req);
        const updated = await ModuleModel.findByIdAndUpdate(moduleId, body, {
          new: true,
          runValidators: true,
        });
        if (!updated) {
          sendJson(res, 404, { message: 'Module not found' });
          return true;
        }
        sendJson(res, 200, { message: 'Module updated successfully', data: updated });
        return true;
      }

      // DELETE /api/curriculum/modules/:id
      if (req.method === 'DELETE' && moduleId) {
        const deleted = await ModuleModel.findByIdAndDelete(moduleId);
        if (!deleted) {
          sendJson(res, 404, { message: 'Module not found' });
          return true;
        }
        // Remove reference from subject
        await SubjectModel.findByIdAndUpdate(deleted.subjectId, {
          $pull: { moduleIds: deleted._id },
        });

        sendJson(res, 200, { message: 'Module deleted successfully' });
        return true;
      }
    }

    // -------------------------------------------------------------
    // 5. CONTENT ITEMS API (/api/curriculum/content-items)
    // -------------------------------------------------------------
    if (pathname.startsWith('/api/curriculum/content-items')) {
      const parts = pathname.replace('/api/curriculum/content-items', '').split('/').filter(Boolean);
      const contentId = parts[0];

      // GET /api/curriculum/content-items
      if (req.method === 'GET' && !contentId) {
        const moduleIdFilter = searchParams.get('moduleId');
        const query = moduleIdFilter ? { moduleId: moduleIdFilter } : {};
        const items = await ContentItemModel.find(query).sort({ createdAt: 1 });
        sendJson(res, 200, { data: items });
        return true;
      }

      // GET /api/curriculum/content-items/:id
      if (req.method === 'GET' && contentId) {
        const item = await ContentItemModel.findById(contentId);
        if (!item) {
          sendJson(res, 404, { message: 'Content item not found' });
          return true;
        }
        sendJson(res, 200, { data: item });
        return true;
      }

      // POST /api/curriculum/content-items
      if (req.method === 'POST' && !contentId) {
        const body = await parseJsonBody(req);
        const { title, type, description, url, duration, status, moduleId } = body;

        if (!title || typeof title !== 'string' || !title.trim()) {
          sendJson(res, 400, { message: 'Content title is required' });
          return true;
        }

        if (!type || !['video', 'document', 'audio', 'link', 'text'].includes(type)) {
          sendJson(res, 400, { message: 'Valid content type (video, document, audio, link, text) is required' });
          return true;
        }

        if (!moduleId) {
          sendJson(res, 400, { message: 'moduleId is required' });
          return true;
        }

        const targetModule = await ModuleModel.findById(moduleId);
        if (!targetModule) {
          sendJson(res, 404, { message: 'Referenced module not found' });
          return true;
        }

        const newContent = await ContentItemModel.create({
          title: title.trim(),
          type,
          description: description?.trim() || '',
          url: url?.trim(),
          duration: typeof duration === 'number' ? duration : undefined,
          status: status || 'DRAFT',
          moduleId,
        });

        // Add to module's contentIds
        targetModule.contentIds.push(newContent._id);
        await targetModule.save();

        sendJson(res, 201, { message: 'Content item added successfully', data: newContent });
        return true;
      }

      // PUT /api/curriculum/content-items/:id
      if (req.method === 'PUT' && contentId) {
        const body = await parseJsonBody(req);
        const updated = await ContentItemModel.findByIdAndUpdate(contentId, body, {
          new: true,
          runValidators: true,
        });
        if (!updated) {
          sendJson(res, 404, { message: 'Content item not found' });
          return true;
        }
        sendJson(res, 200, { message: 'Content item updated successfully', data: updated });
        return true;
      }

      // DELETE /api/curriculum/content-items/:id
      if (req.method === 'DELETE' && contentId) {
        const deleted = await ContentItemModel.findByIdAndDelete(contentId);
        if (!deleted) {
          sendJson(res, 404, { message: 'Content item not found' });
          return true;
        }
        // Remove from module contentIds
        await ModuleModel.findByIdAndUpdate(deleted.moduleId, {
          $pull: { contentIds: deleted._id },
        });

        sendJson(res, 200, { message: 'Content item deleted successfully' });
        return true;
      }
    }

    sendJson(res, 404, { message: 'Curriculum API endpoint not found' });
    return true;
  } catch (error) {
    console.error('Curriculum handler error:', error);
    sendJson(res, 500, { message: 'Internal server error', error: (error as Error).message });
    return true;
  }
}
