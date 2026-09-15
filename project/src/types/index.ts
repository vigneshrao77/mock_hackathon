export type UserRole = 'student' | 'teacher' | 'admin'

export type StudentStatus = 'PENDING_VERIFICATION' | 'ACTIVE' | 'REJECTED' | 'INACTIVE'
export type ContentStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
export type AssignmentStatus = 'NEW' | 'IN_PROGRESS' | 'SUBMITTED' | 'LATE' | 'GRADED' | 'OVERDUE'
export type TeacherAssignmentStatus = 'DRAFT' | 'PUBLISHED' | 'SUBMITTED' | 'LATE' | 'GRADED'
export type HealthCheckStatus = 'UPCOMING' | 'DUE' | 'OVERDUE' | 'COMPLETED'

export type ContentType = 'video' | 'document' | 'audio' | 'link' | 'text'
export type QuestionType = 'mcq' | 'multiple_select' | 'true_false' | 'short_answer' | 'audio_response' | 'video_response'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  phone?: string
  status: StudentStatus
  createdAt: string
  lastLogin?: string
}

export interface Student extends User {
  role: 'student'
  dob: string
  age: number
  programId?: string
  cohortId?: string
  teacherId?: string
  overallProgress: number
  assessmentAverage: number
  assignmentAverage: number
  disciplineScore: number
  leaderboardRank: number
  consent: boolean
  profile: {
    address?: string
    guardianName?: string
    guardianPhone?: string
    bio?: string
  }
}

export interface Teacher extends User {
  role: 'teacher'
  employeeId: string
  programId?: string
  cohortId?: string
  subjectIds: string[]
  studentIds: string[]
}

export interface Admin extends User {
  role: 'admin'
  employeeId: string
}

export interface Program {
  id: string
  name: string
  description: string
  cohortIds: string[]
  subjectIds: string[]
  status: 'active' | 'inactive'
  createdAt: string
}

export interface Cohort {
  id: string
  name: string
  programId: string
  studentCount: number
  createdAt: string
}

export interface Subject {
  id: string
  name: string
  description: string
  programId: string
  status: ContentStatus
  moduleIds: string[]
  createdAt: string
}

export interface Module {
  id: string
  subjectId: string
  title: string
  description: string
  order: number
  status: ContentStatus
  contentIds: string[]
  assessmentIds: string[]
}

export interface ContentItem {
  id: string
  moduleId: string
  title: string
  type: ContentType
  description: string
  url?: string
  duration?: number
  status: ContentStatus
  createdAt: string
}

export interface Question {
  id: string
  type: QuestionType
  question: string
  options?: string[]
  correctAnswer?: string | string[]
  marks: number
}

export interface Assessment {
  id: string
  moduleId: string
  subjectId: string
  title: string
  description: string
  questions: Question[]
  totalMarks: number
  passScore: number
  attempts: number
  status: ContentStatus
  createdAt: string
}

export interface AssessmentSubmission {
  id: string
  assessmentId: string
  studentId: string
  answers: Record<string, string | string[]>
  score: number
  percentage: number
  passed: boolean
  feedback?: string
  submittedAt: string
  status: 'submitted' | 'graded'
}

export interface Assignment {
  id: string
  studentId: string
  subjectId?: string
  moduleId?: string
  title: string
  instructions: string
  attachments: Attachment[]
  maxMarks: number
  dueDate: string
  status: AssignmentStatus
  teacherId: string
  createdAt: string
}

export interface AssignmentSubmission {
  id: string
  assignmentId: string
  studentId: string
  textResponse: string
  attachments: Attachment[]
  submittedAt: string
  marks?: number
  feedback?: string
  gradedAt?: string
  isLate: boolean
}

export interface Attachment {
  id: string
  name: string
  size: number
  type: string
  url?: string
}

export interface Progress {
  studentId: string
  subjectId: string
  moduleId: string
  completionPercentage: number
  completedContentIds: string[]
  lastAccessedAt: string
}

export interface ProgressEvent {
  id: string
  studentId: string
  type: 'content_completed' | 'assessment_submitted' | 'assignment_submitted' | 'login' | 'module_completed'
  description: string
  entityId?: string
  timestamp: string
}

export interface HealthRecord {
  id: string
  studentId: string
  date: string
  bmi: number
  vitaminD: number
  vitaminB12: number
  iron: number
  hemoglobin: number
  notes: string
  teacherId: string
  nextCheckDate: string
}

export interface HealthCheck {
  id: string
  studentId: string
  title: string
  lastCheckDate: string
  nextCheckDate: string
  status: HealthCheckStatus
  teacherId: string
}

export interface Conversation {
  id: string
  studentId: string
  teacherId: string
  lastMessageAt: string
  unreadCount: number
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  senderRole: UserRole
  text: string
  attachments: Attachment[]
  read: boolean
  sentAt: string
}

export interface AppNotification {
  id: string
  userId: string
  role: UserRole
  type: string
  title: string
  body: string
  read: boolean
  createdAt: string
  link?: string
}

export interface LeaderboardScore {
  studentId: string
  studentName: string
  rank: number
  overallScore: number
  assessmentScore: number
  assignmentScore: number
  disciplineScore: number
  programId: string
  cohortId: string
}

export interface Report {
  id: string
  type: 'student' | 'teacher' | 'program' | 'cohort' | 'assessment' | 'assignment' | 'progress'
  title: string
  filters: Record<string, string>
  status: 'generating' | 'ready' | 'failed'
  createdAt: string
  downloadUrl?: string
}

export interface AuditLog {
  id: string
  date: string
  userId: string
  userName: string
  role: UserRole
  action: string
  entity: string
  status: 'success' | 'failed'
  details?: string
}
