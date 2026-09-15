import {
  students as seedStudents, teachers as seedTeachers, admins as seedAdmins,
  programs as seedPrograms, cohorts as seedCohorts, subjects as seedSubjects,
  modules as seedModules, contentItems as seedContent, assessments as seedAssessments,
  assessmentSubmissions as seedAssSubs, assignments as seedAssignments,
  assignmentSubmissions as seedAsgSubs, progressData as seedProgress,
  progressEvents as seedProgressEvents, healthRecords as seedHealthRecords,
  healthChecks as seedHealthChecks, conversations as seedConversations,
  messages as seedMessages, notifications as seedNotifications,
  leaderboardScores as seedLeaderboard, reports as seedReports,
  auditLogs as seedAuditLogs,
} from '../data/seed'
import type {
  Student, Teacher, Admin, Program, Cohort, Subject, Module, ContentItem,
  Assessment, AssessmentSubmission, Assignment, AssignmentSubmission,
  Progress, ProgressEvent, HealthRecord, HealthCheck, Conversation, Message,
  AppNotification, LeaderboardScore, Report, AuditLog, UserRole,
} from '../types'

let students = [...seedStudents]
let teachers = [...seedTeachers]
let admins = [...seedAdmins]
let programs = [...seedPrograms]
let cohorts = [...seedCohorts]
let subjects = [...seedSubjects]
let modules = [...seedModules]
let contentItems = [...seedContent]
let assessments = [...seedAssessments]
let assessmentSubs = [...seedAssSubs]
let assignments = [...seedAssignments]
let assignmentSubs = [...seedAsgSubs]
let progressRecords = [...seedProgress]
let progressEvents = [...seedProgressEvents]
let healthRecords = [...seedHealthRecords]
let healthChecks = [...seedHealthChecks]
let conversations = [...seedConversations]
let messages = [...seedMessages]
let notifications = [...seedNotifications]
let leaderboard = [...seedLeaderboard]
let reports = [...seedReports]
let auditLogs = [...seedAuditLogs]

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms))
const uid = (prefix: string) => `${prefix}${Date.now()}${Math.random().toString(36).slice(2, 6)}`

function log(action: string, entity: string, user: { id: string; name: string; role: UserRole }, details?: string) {
  auditLogs.unshift({
    id: uid('al'),
    date: new Date().toISOString(),
    userId: user.id,
    userName: user.name,
    role: user.role,
    action,
    entity,
    status: 'success',
    details,
  })
}

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

const fetchApi = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, {
    ...options,
    headers: { ...getHeaders(), ...options?.headers }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'API request failed');
  return data;
};

const mapId = (item: any) => {
  if (!item) return item;
  if (item._id && !item.id) { item.id = item._id.toString(); }
  return item;
};
const mapIds = (arr: any[]) => (arr || []).map(mapId);

export const mockApi = {
  // Auth & Profile
  async login(email: string, _password: string) {
    await delay()
    const allUsers = [...students, ...teachers, ...admins]
    const user = allUsers.find((u) => u.email === email)
    if (!user) throw new Error('Invalid email or password')
    return user
  },
  async getCurrentUser(userId: string, role: UserRole) {
    try {
      const data = await fetchApi('/api/profile');
      if (data.profile) return mapId(data.profile);
    } catch { }
    await delay(100)
    const pool = role === 'student' ? students : role === 'teacher' ? teachers : admins
    return pool.find((u) => u.id === userId) || null
  },

  // Users (Now hooked to backend)
  async getStudents() {
    try { const data = await fetchApi('/api/users?role=student'); return mapIds(data.data); } catch { await delay(); return [...students]; }
  },
  async getStudent(id: string) { await delay(100); return students.find((s) => s.id === id) || null },
  async getPendingStudents() { await delay(); return students.filter((s) => s.status === 'PENDING_VERIFICATION') },
  async approveStudent(id: string, approver: { id: string; name: string; role: UserRole }) {
    await delay()
    students = students.map((s) => s.id === id ? { ...s, status: 'ACTIVE' as const } : s)
    log('Student Verified', id, approver, `Approved ${students.find((s) => s.id === id)?.name}`)
    return students.find((s) => s.id === id)
  },
  async rejectStudent(id: string, rejecter: { id: string; name: string; role: UserRole }) {
    await delay()
    students = students.map((s) => s.id === id ? { ...s, status: 'REJECTED' as const } : s)
    log('Student Rejected', id, rejecter, `Rejected ${students.find((s) => s.id === id)?.name}`)
    return students.find((s) => s.id === id)
  },
  async updateStudent(id: string, data: Partial<Student>) {
    await delay()
    students = students.map((s) => s.id === id ? { ...s, ...data } : s)
    return students.find((s) => s.id === id)
  },
  async getTeachers() {
    try { const data = await fetchApi('/api/users?role=teacher'); return mapIds(data.data); } catch { await delay(); return [...teachers]; }
  },
  async getTeacher(id: string) { await delay(100); return teachers.find((t) => t.id === id) || null },
  async createTeacher(data: Partial<Teacher>, creator: { id: string; name: string; role: UserRole }) {
    await delay()
    const teacher: Teacher = { id: uid('t'), name: data.name || '', email: data.email || '', role: 'teacher', employeeId: data.employeeId || `TCH${Date.now().toString().slice(-3)}`, phone: data.phone || '', status: 'ACTIVE', createdAt: new Date().toISOString().slice(0, 10), programId: data.programId, cohortId: data.cohortId, subjectIds: data.subjectIds || [], studentIds: [], avatar: (data.name || '').split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() }
    teachers.push(teacher)
    log('Teacher Created', teacher.id, creator, `Created ${teacher.name}`)
    return teacher
  },
  async updateTeacher(id: string, data: Partial<Teacher>) {
    await delay()
    teachers = teachers.map((t) => t.id === id ? { ...t, ...data } : t)
    return teachers.find((t) => t.id === id)
  },
  async getAdmins() { await delay(); return [...admins] },
  async createAdmin(data: Partial<Admin>, creator: { id: string; name: string; role: UserRole }) {
    await delay()
    const admin: Admin = { id: uid('a'), name: data.name || '', email: data.email || '', role: 'admin', employeeId: data.employeeId || `ADM${Date.now().toString().slice(-3)}`, status: 'ACTIVE', createdAt: new Date().toISOString().slice(0, 10), avatar: (data.name || '').split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() }
    admins.push(admin)
    log('Admin Created', admin.id, creator, `Created ${admin.name}`)
    return admin
  },
  async updateAdmin(id: string, data: Partial<Admin>) {
    await delay()
    admins = admins.map((a) => a.id === id ? { ...a, ...data } : a)
    return admins.find((a) => a.id === id)
  },

  // Programs
  async getPrograms() {
    try { const data = await fetchApi('/api/curriculum/programs'); return mapIds(data.data); } catch { return [...programs]; }
  },
  async getProgram(id: string) {
    try { const data = await fetchApi(`/api/curriculum/programs/${id}`); return mapId(data.data); } catch { return programs.find((p) => p.id === id) || null; }
  },
  async createProgram(data: Partial<Program>) {
    try { const res = await fetchApi('/api/curriculum/programs', { method: 'POST', body: JSON.stringify(data) }); return mapId(res.data); } catch {
      const program: Program = { id: uid('p'), name: data.name || '', description: data.description || '', cohortIds: [], subjectIds: [], status: 'active', createdAt: new Date().toISOString().slice(0, 10) }
      programs.push(program); return program;
    }
  },
  async updateProgram(id: string, data: Partial<Program>) {
    try { const res = await fetchApi(`/api/curriculum/programs/${id}`, { method: 'PUT', body: JSON.stringify(data) }); return mapId(res.data); } catch {
      programs = programs.map((p) => p.id === id ? { ...p, ...data } : p); return programs.find((p) => p.id === id);
    }
  },

  // Cohorts
  async getCohorts() {
    try { const data = await fetchApi('/api/curriculum/cohorts'); return mapIds(data.data); } catch { return [...cohorts]; }
  },

  // Subjects
  async getSubjects() {
    try { const data = await fetchApi('/api/curriculum/subjects'); return mapIds(data.data); } catch { return [...subjects]; }
  },
  async getSubject(id: string) {
    try { const data = await fetchApi(`/api/curriculum/subjects/${id}`); return mapId(data.data); } catch { return subjects.find((s) => s.id === id) || null; }
  },
  async getSubjectsByProgram(programId: string) {
    try { const data = await fetchApi(`/api/curriculum/subjects?programId=${programId}`); return mapIds(data.data); } catch { return subjects.filter((s) => s.programId === programId); }
  },
  async createSubject(data: Partial<Subject>) {
    try { const res = await fetchApi('/api/curriculum/subjects', { method: 'POST', body: JSON.stringify(data) }); return mapId(res.data); } catch {
      const subject: Subject = { id: uid('s'), name: data.name || '', description: data.description || '', programId: data.programId || '', status: data.status || 'DRAFT', moduleIds: [], createdAt: new Date().toISOString().slice(0, 10) }
      subjects.push(subject); return subject;
    }
  },
  async updateSubject(id: string, data: Partial<Subject>) {
    try { const res = await fetchApi(`/api/curriculum/subjects/${id}`, { method: 'PUT', body: JSON.stringify(data) }); return mapId(res.data); } catch {
      subjects = subjects.map((s) => s.id === id ? { ...s, ...data } : s); return subjects.find((s) => s.id === id);
    }
  },

  // Modules
  async getModules() {
    try { const data = await fetchApi('/api/curriculum/modules'); return mapIds(data.data); } catch { return [...modules]; }
  },
  async getModule(id: string) {
    try { const data = await fetchApi(`/api/curriculum/modules/${id}`); return mapId(data.data); } catch { return modules.find((m) => m.id === id) || null; }
  },
  async getModulesBySubject(subjectId: string) {
    try { const data = await fetchApi(`/api/curriculum/modules?subjectId=${subjectId}`); return mapIds(data.data); } catch { return modules.filter((m) => m.subjectId === subjectId).sort((a, b) => a.order - b.order); }
  },
  async createModule(data: Partial<Module>) {
    try { const res = await fetchApi('/api/curriculum/modules', { method: 'POST', body: JSON.stringify(data) }); return mapId(res.data); } catch {
      const module: Module = { id: uid('m'), subjectId: data.subjectId || '', title: data.title || '', description: data.description || '', order: data.order || modules.filter((m) => m.subjectId === data.subjectId).length + 1, status: data.status || 'DRAFT', contentIds: [], assessmentIds: [] }
      modules.push(module); return module;
    }
  },
  async updateModule(id: string, data: Partial<Module>) {
    try { const res = await fetchApi(`/api/curriculum/modules/${id}`, { method: 'PUT', body: JSON.stringify(data) }); return mapId(res.data); } catch {
      modules = modules.map((m) => m.id === id ? { ...m, ...data } : m); return modules.find((m) => m.id === id);
    }
  },

  // Content
  async getContent() {
    try { const data = await fetchApi('/api/curriculum/content'); return mapIds(data.data); } catch { return [...contentItems]; }
  },
  async getContentItem(id: string) {
    try { const data = await fetchApi(`/api/curriculum/content/${id}`); return mapId(data.data); } catch { return contentItems.find((c) => c.id === id) || null; }
  },
  async getContentByModule(moduleId: string) {
    try { const data = await fetchApi(`/api/curriculum/content?moduleId=${moduleId}`); return mapIds(data.data); } catch { return contentItems.filter((c) => c.moduleId === moduleId); }
  },
  async createContent(data: Partial<ContentItem>) {
    try { const res = await fetchApi('/api/curriculum/content', { method: 'POST', body: JSON.stringify(data) }); return mapId(res.data); } catch {
      const item: ContentItem = { id: uid('ct'), moduleId: data.moduleId || '', title: data.title || '', type: data.type || 'text', description: data.description || '', url: data.url, duration: data.duration, status: data.status || 'DRAFT', createdAt: new Date().toISOString().slice(0, 10) }
      contentItems.push(item); return item;
    }
  },
  async updateContent(id: string, data: Partial<ContentItem>) {
    try { const res = await fetchApi(`/api/curriculum/content/${id}`, { method: 'PUT', body: JSON.stringify(data) }); return mapId(res.data); } catch {
      contentItems = contentItems.map((c) => c.id === id ? { ...c, ...data } : c); return contentItems.find((c) => c.id === id);
    }
  },

  // Assessments
  async getAssessments() {
    try { const data = await fetchApi('/api/evaluation/assessments'); return mapIds(data.assessments); } catch { return [...assessments]; }
  },
  async getAssessment(id: string) {
    try { const data = await fetchApi(`/api/evaluation/assessments/${id}`); return mapId(data.assessment); } catch { return assessments.find((a) => a.id === id) || null; }
  },
  async getAssessmentsByModule(moduleId: string) {
    try { const data = await fetchApi(`/api/evaluation/assessments?moduleId=${moduleId}`); return mapIds(data.assessments); } catch { return assessments.filter((a) => a.moduleId === moduleId); }
  },
  async getAssessmentsBySubject(subjectId: string) {
    try { const data = await fetchApi(`/api/evaluation/assessments?subjectId=${subjectId}`); return mapIds(data.assessments); } catch { return assessments.filter((a) => a.subjectId === subjectId); }
  },
  async createAssessment(data: Partial<Assessment>) {
    try { const res = await fetchApi('/api/evaluation/assessments', { method: 'POST', body: JSON.stringify(data) }); return mapId(res.assessment); } catch {
      const assessment: Assessment = { id: uid('as'), moduleId: data.moduleId || '', subjectId: data.subjectId || '', title: data.title || '', description: data.description || '', questions: data.questions || [], totalMarks: data.totalMarks || 0, passScore: data.passScore || 0, attempts: data.attempts || 1, status: data.status || 'DRAFT', createdAt: new Date().toISOString().slice(0, 10) }
      assessments.push(assessment); return assessment;
    }
  },
  async updateAssessment(id: string, data: Partial<Assessment>) {
    try { const res = await fetchApi(`/api/evaluation/assessments/${id}`, { method: 'PATCH', body: JSON.stringify(data) }); return mapId(res.assessment); } catch {
      assessments = assessments.map((a) => a.id === id ? { ...a, ...data } : a); return assessments.find((a) => a.id === id);
    }
  },
  async submitAssessment(submission: Omit<AssessmentSubmission, 'id'>) {
    try { const res = await fetchApi('/api/evaluation/submissions/assessment', { method: 'POST', body: JSON.stringify(submission) }); return mapId(res.submission); } catch {
      const sub: AssessmentSubmission = { ...submission, id: uid('sub') }
      assessmentSubs.push(sub); return sub;
    }
  },
  async getAssessmentSubmissions(studentId: string) {
    try { const data = await fetchApi(`/api/evaluation/submissions/assessment?studentId=${studentId}`); return mapIds(data.submissions); } catch { return assessmentSubs.filter((s) => s.studentId === studentId); }
  },
  async getAssessmentSubmissionsByAssessment(assessmentId: string) {
    try { const data = await fetchApi(`/api/evaluation/submissions/assessment?assessmentId=${assessmentId}`); return mapIds(data.submissions); } catch { return assessmentSubs.filter((s) => s.assessmentId === assessmentId); }
  },

  // Assignments
  async getAssignments() {
    try { const data = await fetchApi('/api/evaluation/assignments'); return mapIds(data.assignments); } catch { return [...assignments]; }
  },
  async getAssignment(id: string) {
    try { const data = await fetchApi(`/api/evaluation/assignments/${id}`); return mapId(data.assignment); } catch { return assignments.find((a) => a.id === id) || null; }
  },
  async getAssignmentsByStudent(studentId: string) {
    try { const data = await fetchApi(`/api/evaluation/assignments?studentId=${studentId}`); return mapIds(data.assignments); } catch { return assignments.filter((a) => a.studentId === studentId); }
  },
  async getAssignmentsByTeacher(teacherId: string) {
    try { const data = await fetchApi(`/api/evaluation/assignments?teacherId=${teacherId}`); return mapIds(data.assignments); } catch { return assignments.filter((a) => a.teacherId === teacherId); }
  },
  async createAssignment(data: Partial<Assignment>) {
    try { const res = await fetchApi('/api/evaluation/assignments', { method: 'POST', body: JSON.stringify(data) }); return mapId(res.assignment); } catch {
      const assignment: Assignment = { id: uid('asg'), studentId: data.studentId || '', subjectId: data.subjectId, moduleId: data.moduleId, title: data.title || '', instructions: data.instructions || '', attachments: data.attachments || [], maxMarks: data.maxMarks || 100, dueDate: data.dueDate || new Date().toISOString().slice(0, 10), status: data.status || 'DRAFT', teacherId: data.teacherId || '', createdAt: new Date().toISOString().slice(0, 10) }
      assignments.push(assignment); return assignment;
    }
  },
  async updateAssignment(id: string, data: Partial<Assignment>) {
    try { const res = await fetchApi(`/api/evaluation/assignments/${id}`, { method: 'PATCH', body: JSON.stringify(data) }); return mapId(res.assignment); } catch {
      assignments = assignments.map((a) => a.id === id ? { ...a, ...data } : a); return assignments.find((a) => a.id === id);
    }
  },
  async submitAssignment(assignmentId: string, textResponse: string, attachments: { id: string; name: string; size: number; type: string }[]) {
    try {
      const res = await fetchApi(`/api/evaluation/assignments/${assignmentId}/submit`, { method: 'POST', body: JSON.stringify({ textResponse, attachments }) });
      return mapId(res.submission);
    } catch {
      const assignment = assignments.find((a) => a.id === assignmentId)
      if (!assignment) throw new Error('Assignment not found')
      const isLate = new Date(assignment.dueDate) < new Date()
      const sub: AssignmentSubmission = { id: uid('asub'), assignmentId, studentId: assignment.studentId, textResponse, attachments, submittedAt: new Date().toISOString(), isLate }
      assignmentSubs.push(sub)
      assignments = assignments.map((a) => a.id === assignmentId ? { ...a, status: isLate ? 'LATE' : 'SUBMITTED' } : a)
      return sub
    }
  },
  async gradeAssignment(assignmentId: string, marks: number, feedback: string, grader: { id: string; name: string; role: UserRole }) {
    try {
      const subId = assignmentId;
      const res = await fetchApi(`/api/evaluation/submissions/assignment/${subId}/grade`, { method: 'PATCH', body: JSON.stringify({ marks, feedback }) });
      return mapId(res.submission);
    } catch {
      const sub = assignmentSubs.find((s) => s.assignmentId === assignmentId)
      if (sub) { sub.marks = marks; sub.feedback = feedback; sub.gradedAt = new Date().toISOString() }
      assignments = assignments.map((a) => a.id === assignmentId ? { ...a, status: 'GRADED' } : a)
      log('Assignment Graded', assignmentId, grader, `Graded with ${marks} marks`)
      return assignments.find((a) => a.id === assignmentId)
    }
  },
  async getAssignmentSubmission(assignmentId: string) {
    try {
      const data = await fetchApi(`/api/evaluation/assignments/${assignmentId}/submission`);
      return mapId(data.submission);
    } catch {
      await delay(100)
      return assignmentSubs.find((s) => s.assignmentId === assignmentId) || null
    }
  },

  // Progress
  async getProgress(studentId: string) {
    try { const data = await fetchApi(`/api/evaluation/progress?studentId=${studentId}`); return mapIds(data.progress); } catch { await delay(); return progressRecords.filter((p) => p.studentId === studentId); }
  },
  async getProgressEvents(studentId: string) {
    try { const data = await fetchApi(`/api/evaluation/progress/events?studentId=${studentId}`); return mapIds(data.events); } catch { await delay(); return progressEvents.filter((e) => e.studentId === studentId).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()); }
  },
  async markContentComplete(studentId: string, contentId: string, moduleId: string, subjectId: string) {
    try {
      const data = await fetchApi(`/api/evaluation/progress/event`, { method: 'POST', body: JSON.stringify({ type: 'content_completed', entityId: contentId }) });
      return mapId(data.progress);
    } catch {
      await delay(200)
      let prog = progressRecords.find((p) => p.studentId === studentId && p.moduleId === moduleId)
      if (!prog) { prog = { studentId, subjectId, moduleId, completionPercentage: 0, completedContentIds: [], lastAccessedAt: new Date().toISOString() }; progressRecords.push(prog) }
      if (!prog.completedContentIds.includes(contentId)) { prog.completedContentIds.push(contentId) }
      const moduleContent = contentItems.filter((c) => c.moduleId === moduleId)
      prog.completionPercentage = Math.round((prog.completedContentIds.length / moduleContent.length) * 100)
      prog.lastAccessedAt = new Date().toISOString()
      progressEvents.unshift({ id: uid('pe'), studentId, type: 'content_completed', description: `Completed: ${contentItems.find((c) => c.id === contentId)?.title || 'content'}`, entityId: contentId, timestamp: new Date().toISOString() })
      return prog
    }
  },

  // Health
  async getHealthRecords(studentId: string) { await delay(); return healthRecords.filter((r) => r.studentId === studentId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) },
  async getHealthChecks(studentId?: string) { await delay(); return studentId ? healthChecks.filter((c) => c.studentId === studentId) : [...healthChecks] },
  async createHealthRecord(data: Omit<HealthRecord, 'id'>) { await delay(); const record: HealthRecord = { ...data, id: uid('hr') }; healthRecords.push(record); return record },

  // Chat
  async getConversations(userId: string, role: UserRole) {
    try { const data = await fetchApi('/api/chat/conversations'); return mapIds(data.data); } catch { await delay(); return conversations.filter((c) => role === 'student' ? c.studentId === userId : c.teacherId === userId) }
  },
  async createConversation(targetUserId: string) {
    const data = await fetchApi('/api/chat/conversations', { method: 'POST', body: JSON.stringify({ targetUserId }) }); return mapId(data.data);
  },
  async getMessages(conversationId: string) {
    try { const data = await fetchApi(`/api/chat/conversations/${conversationId}/messages`); return mapIds(data.data); } catch { await delay(); return messages.filter((m) => m.conversationId === conversationId).sort((a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()) }
  },
  async sendMessage(conversationId: string, senderId: string, senderRole: UserRole, text: string) {
    try { const data = await fetchApi(`/api/chat/conversations/${conversationId}/messages`, { method: 'POST', body: JSON.stringify({ text, attachments: [] }) }); return mapId(data.data); } catch { await delay(200); const msg: Message = { id: uid('msg'), conversationId, senderId, senderRole, text, attachments: [], read: true, sentAt: new Date().toISOString() }; messages.push(msg); const conv = conversations.find((c) => c.id === conversationId); if (conv) conv.lastMessageAt = msg.sentAt; return msg }
  },
  async markConversationRead(conversationId: string) {
    try { await fetchApi(`/api/chat/conversations/${conversationId}/read`, { method: 'PATCH' }); } catch { await delay(100); messages = messages.map((m) => m.conversationId === conversationId ? { ...m, read: true } : m); const conv = conversations.find((c) => c.id === conversationId); if (conv) conv.unreadCount = 0 }
  },

  // Notifications
  async getNotifications(userId: string) { await delay(); return notifications.filter((n) => n.userId === userId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) },
  async markNotificationRead(id: string) { await delay(100); notifications = notifications.map((n) => n.id === id ? { ...n, read: true } : n) },
  async markAllNotificationsRead(userId: string) { await delay(200); notifications = notifications.map((n) => n.userId === userId ? { ...n, read: true } : n) },

  // Leaderboard
  async getLeaderboard(filters?: { programId?: string; cohortId?: string; subjectId?: string }) {
    try { const data = await fetchApi('/api/evaluation/leaderboard'); return mapIds(data.leaderboard); } catch {
      await delay()
      let result = [...leaderboard]
      if (filters?.programId) result = result.filter((s) => s.programId === filters.programId)
      if (filters?.cohortId) result = result.filter((s) => s.cohortId === filters.cohortId)
      return result.sort((a, b) => a.rank - b.rank)
    }
  },

  // Reports
  async getReports() { await delay(); return [...reports] },
  async generateReport(type: Report['type'], title: string, filters: Record<string, string>) { await delay(); const report: Report = { id: uid('r'), type, title, filters, status: 'generating', createdAt: new Date().toISOString() }; reports.unshift(report); setTimeout(() => { const r = reports.find((rp) => rp.id === report.id); if (r) { r.status = 'ready'; r.downloadUrl = '#' } }, 2000); return report },

  // Audit
  async getAuditLogs() { await delay(); return [...auditLogs] },

  // Analytics
  async getAnalytics() {
    await delay()
    return {
      totalStudents: students.length,
      activeStudents: students.filter((s) => s.status === 'ACTIVE').length,
      pendingStudents: students.filter((s) => s.status === 'PENDING_VERIFICATION').length,
      totalTeachers: teachers.length,
      activeTeachers: teachers.filter((t) => t.status === 'ACTIVE').length,
      totalPrograms: programs.length,
      totalAdmins: admins.length,
      averageProgress: Math.round(students.reduce((sum, s) => sum + s.overallProgress, 0) / (students.length || 1)),
      averageAssessment: Math.round(students.reduce((sum, s) => sum + s.assessmentAverage, 0) / (students.length || 1)),
      averageAssignment: Math.round(students.reduce((sum, s) => sum + s.assignmentAverage, 0) / (students.length || 1)),
      enrollmentTrend: [
        { month: 'Apr', students: 4 }, { month: 'May', students: 5 }, { month: 'Jun', students: 6 },
        { month: 'Jul', students: 7 }, { month: 'Aug', students: 8 }, { month: 'Sep', students: 10 },
      ],
      completionTrend: [
        { month: 'Apr', rate: 45 }, { month: 'May', rate: 52 }, { month: 'Jun', rate: 58 },
        { month: 'Jul', rate: 63 }, { month: 'Aug', rate: 68 }, { month: 'Sep', rate: 72 },
      ],
      assessmentPerformance: [
        { subject: 'Math', score: 74 }, { subject: 'Science', score: 68 },
        { subject: 'Social Studies', score: 72 }, { subject: 'English', score: 80 },
      ],
      assignmentCompletion: [
        { week: 'W1', completed: 12, total: 15 }, { week: 'W2', completed: 14, total: 16 },
        { week: 'W3', completed: 10, total: 14 }, { week: 'W4', completed: 16, total: 18 },
      ],
      engagementData: [
        { day: 'Mon', hours: 4.5 }, { day: 'Tue', hours: 5.2 }, { day: 'Wed', hours: 3.8 },
        { day: 'Thu', hours: 5.5 }, { day: 'Fri', hours: 6.1 }, { day: 'Sat', hours: 4.0 }, { day: 'Sun', hours: 3.2 },
      ],
      teacherActivity: [
        { teacher: 'Anita Verma', students: 4, assessments: 5, assignments: 6 },
        { teacher: 'Suresh Reddy', students: 2, assessments: 1, assignments: 1 },
        { teacher: 'Meera Nair', students: 2, assessments: 1, assignments: 0 },
      ],
      atRiskStudents: students.filter((s) => s.overallProgress < 55).map((s) => ({
        id: s.id, name: s.name, progress: s.overallProgress, program: programs.find((p) => p.id === s.programId)?.name || '',
      })),
    }
  },
}
