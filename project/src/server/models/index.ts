/**
 * Barrel export for all Mongoose models.
 * Import individual models from here for clean imports across the server layer.
 *
 * MongoDB Collections created:
 *  users, studentprofiles, teacherprofiles, adminprofiles,
 *  programs, cohorts, subjects, modules, contentitems,
 *  assessments, assessmentsubmissions,
 *  assignments, assignmentsubmissions,
 *  progresses, progressevents,
 *  healthrecords, healthchecks,
 *  conversations, messages,
 *  notifications, leaderboardscores, reports
 */

export { default as UserModel, type IUser, type IUserDocument, type UserRole, type UserStatus } from './User';

// Role profiles
export { default as StudentProfileModel, type IStudentProfile, type IStudentProfileDocument } from './StudentProfile';
export { default as TeacherProfileModel, type ITeacherProfile, type ITeacherProfileDocument } from './TeacherProfile';
export { default as AdminProfileModel, type IAdminProfile, type IAdminProfileDocument } from './AdminProfile';

// Program structure
export { default as ProgramModel, type IProgram, type IProgramDocument } from './Program';
export { default as CohortModel, type ICohort, type ICohortDocument } from './Cohort';
export { default as SubjectModel, type ISubject, type ISubjectDocument, type ContentStatus } from './Subject';
export { default as ModuleModel, type IModule, type IModuleDocument } from './Module';
export { default as ContentItemModel, type IContentItem, type IContentItemDocument, type ContentType } from './ContentItem';

// Assessments
export { default as AssessmentModel, type IAssessment, type IAssessmentDocument, type IQuestion, type QuestionType } from './Assessment';
export { default as AssessmentSubmissionModel, type IAssessmentSubmission, type IAssessmentSubmissionDocument } from './AssessmentSubmission';

// Assignments
export { default as AssignmentModel, type IAssignment, type IAssignmentDocument, type IAttachment, type AssignmentStatus } from './Assignment';
export { default as AssignmentSubmissionModel, type IAssignmentSubmission, type IAssignmentSubmissionDocument } from './AssignmentSubmission';

// Progress tracking
export { default as ProgressModel, type IProgress, type IProgressDocument } from './Progress';
export { default as ProgressEventModel, type IProgressEvent, type IProgressEventDocument, type ProgressEventType } from './ProgressEvent';

// Health
export { default as HealthRecordModel, type IHealthRecord, type IHealthRecordDocument } from './HealthRecord';
export { default as HealthCheckModel, type IHealthCheck, type IHealthCheckDocument, type HealthCheckStatus } from './HealthCheck';

// Communication
export { default as ConversationModel, type IConversation, type IConversationDocument } from './Conversation';
export { default as MessageModel, type IMessage, type IMessageDocument } from './Message';

// Notifications (replaces AuditLog — use isAudit: true for audit events)
export { default as NotificationModel, type INotification, type INotificationDocument, type NotificationType } from './Notification';

// Leaderboard & Reports
export { default as LeaderboardScoreModel, type ILeaderboardScore, type ILeaderboardScoreDocument } from './LeaderboardScore';
export { default as ReportModel, type IReport, type IReportDocument, type ReportType, type ReportStatus } from './Report';
