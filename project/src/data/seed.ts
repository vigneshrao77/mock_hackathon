import type {
  Student, Teacher, Admin, Program, Cohort, Subject, Module, ContentItem,
  Assessment, AssessmentSubmission, Assignment, AssignmentSubmission,
  Progress, ProgressEvent, HealthRecord, HealthCheck, Conversation, Message,
  AppNotification, LeaderboardScore, Report, AuditLog,
} from '../types'

export const admins: Admin[] = [
  { id: 'a1', name: 'Dr. Priya Sharma', email: 'admin@diksha.org', role: 'admin', employeeId: 'ADM001', status: 'ACTIVE', createdAt: '2025-01-10', lastLogin: '2026-09-14', avatar: 'PS' },
  { id: 'a2', name: 'Rajesh Kumar', email: 'rajesh@diksha.org', role: 'admin', employeeId: 'ADM002', status: 'ACTIVE', createdAt: '2025-03-15', lastLogin: '2026-09-13', avatar: 'RK' },
]

export const teachers: Teacher[] = [
  { id: 't1', name: 'Anita Verma', email: 'anita@diksha.org', role: 'teacher', employeeId: 'TCH001', phone: '+91 98765 43210', status: 'ACTIVE', createdAt: '2025-02-01', programId: 'p1', cohortId: 'c1', subjectIds: ['s1', 's2'], studentIds: ['st1', 'st2', 'st3', 'st4'], avatar: 'AV', lastLogin: '2026-09-14' },
  { id: 't2', name: 'Suresh Reddy', email: 'suresh@diksha.org', role: 'teacher', employeeId: 'TCH002', phone: '+91 98765 43211', status: 'ACTIVE', createdAt: '2025-02-15', programId: 'p1', cohortId: 'c2', subjectIds: ['s3'], studentIds: ['st5', 'st6'], avatar: 'SR', lastLogin: '2026-09-12' },
  { id: 't3', name: 'Meera Nair', email: 'meera@diksha.org', role: 'teacher', employeeId: 'TCH003', phone: '+91 98765 43212', status: 'ACTIVE', createdAt: '2025-04-10', programId: 'p2', cohortId: 'c3', subjectIds: ['s4'], studentIds: ['st7', 'st8'], avatar: 'MN', lastLogin: '2026-09-14' },
]

export const students: Student[] = [
  { id: 'st1', name: 'Aarav Patel', email: 'aarav@student.diksha.org', role: 'student', phone: '+91 90000 11111', status: 'ACTIVE', createdAt: '2025-06-01', dob: '2008-03-15', age: 18, programId: 'p1', cohortId: 'c1', teacherId: 't1', overallProgress: 72, assessmentAverage: 78, assignmentAverage: 82, disciplineScore: 85, leaderboardRank: 1, consent: true, avatar: 'AP', lastLogin: '2026-09-14', profile: { address: 'Pune, MH', guardianName: 'Rohan Patel', guardianPhone: '+91 90000 11112', bio: 'Aspiring engineer passionate about science.' } },
  { id: 'st2', name: 'Diya Singh', email: 'diya@student.diksha.org', role: 'student', phone: '+91 90000 22222', status: 'ACTIVE', createdAt: '2025-06-05', dob: '2009-07-22', age: 17, programId: 'p1', cohortId: 'c1', teacherId: 't1', overallProgress: 65, assessmentAverage: 74, assignmentAverage: 70, disciplineScore: 80, leaderboardRank: 2, consent: true, avatar: 'DS', lastLogin: '2026-09-13', profile: { address: 'Mumbai, MH', guardianName: 'Karan Singh', guardianPhone: '+91 90000 22223', bio: 'Loves mathematics and coding.' } },
  { id: 'st3', name: 'Kabir Gupta', email: 'kabir@student.diksha.org', role: 'student', phone: '+91 90000 33333', status: 'ACTIVE', createdAt: '2025-06-10', dob: '2008-11-30', age: 17, programId: 'p1', cohortId: 'c1', teacherId: 't1', overallProgress: 58, assessmentAverage: 65, assignmentAverage: 60, disciplineScore: 72, leaderboardRank: 3, consent: true, avatar: 'KG', lastLogin: '2026-09-12', profile: { address: 'Nashik, MH', guardianName: 'Amit Gupta', guardianPhone: '+91 90000 33334', bio: 'Interested in literature and arts.' } },
  { id: 'st4', name: 'Ananya Iyer', email: 'ananya@student.diksha.org', role: 'student', phone: '+91 90000 44444', status: 'ACTIVE', createdAt: '2025-06-15', dob: '2009-01-18', age: 17, programId: 'p1', cohortId: 'c1', teacherId: 't1', overallProgress: 80, assessmentAverage: 88, assignmentAverage: 85, disciplineScore: 90, leaderboardRank: 4, consent: true, avatar: 'AI', lastLogin: '2026-09-14', profile: { address: 'Pune, MH', guardianName: 'Sneha Iyer', guardianPhone: '+91 90000 44445', bio: 'Top performer in science assessments.' } },
  { id: 'st5', name: 'Vivaan Joshi', email: 'vivaan@student.diksha.org', role: 'student', phone: '+91 90000 55555', status: 'ACTIVE', createdAt: '2025-07-01', dob: '2008-05-20', age: 18, programId: 'p1', cohortId: 'c2', teacherId: 't2', overallProgress: 45, assessmentAverage: 55, assignmentAverage: 50, disciplineScore: 65, leaderboardRank: 5, consent: true, avatar: 'VJ', lastLogin: '2026-09-10', profile: { address: 'Nagpur, MH', guardianName: 'Deepak Joshi', guardianPhone: '+91 90000 55556', bio: 'Working hard to improve.' } },
  { id: 'st6', name: 'Saanvi Rao', email: 'saanvi@student.diksha.org', role: 'student', phone: '+91 90000 66666', status: 'ACTIVE', createdAt: '2025-07-10', dob: '2009-09-14', age: 17, programId: 'p1', cohortId: 'c2', teacherId: 't2', overallProgress: 68, assessmentAverage: 72, assignmentAverage: 75, disciplineScore: 78, leaderboardRank: 6, consent: true, avatar: 'SR', lastLogin: '2026-09-11', profile: { address: 'Aurangabad, MH', guardianName: 'Lakshmi Rao', guardianPhone: '+91 90000 66667', bio: 'Enjoys social studies.' } },
  { id: 'st7', name: 'Arjun Mehta', email: 'arjun@student.diksha.org', role: 'student', phone: '+91 90000 77777', status: 'ACTIVE', createdAt: '2025-08-01', dob: '2008-12-03', age: 17, programId: 'p2', cohortId: 'c3', teacherId: 't3', overallProgress: 52, assessmentAverage: 60, assignmentAverage: 58, disciplineScore: 70, leaderboardRank: 7, consent: true, avatar: 'AM', lastLogin: '2026-09-09', profile: { address: 'Delhi, DL', guardianName: 'Sanjay Mehta', guardianPhone: '+91 90000 77778', bio: 'Keen learner of technology.' } },
  { id: 'st8', name: 'Ishita Desai', email: 'ishita@student.diksha.org', role: 'student', phone: '+91 90000 88888', status: 'ACTIVE', createdAt: '2025-08-15', dob: '2009-04-25', age: 17, programId: 'p2', cohortId: 'c3', teacherId: 't3', overallProgress: 75, assessmentAverage: 80, assignmentAverage: 78, disciplineScore: 88, leaderboardRank: 8, consent: true, avatar: 'ID', lastLogin: '2026-09-14', profile: { address: 'Delhi, DL', guardianName: 'Ritu Desai', guardianPhone: '+91 90000 88889', bio: 'Excellent at English and communication.' } },
  { id: 'st9', name: 'Reyansh Kumar', email: 'reyansh@student.diksha.org', role: 'student', phone: '+91 90000 99999', status: 'PENDING_VERIFICATION', createdAt: '2026-09-10', dob: '2009-06-12', age: 17, programId: 'p1', cohortId: 'c1', teacherId: 't1', overallProgress: 0, assessmentAverage: 0, assignmentAverage: 0, disciplineScore: 0, leaderboardRank: 0, consent: true, avatar: 'RK', profile: { address: 'Pune, MH', guardianName: 'Manoj Kumar', guardianPhone: '+91 90000 99990', bio: 'New applicant awaiting verification.' } },
  { id: 'st10', name: 'Myra Agarwal', email: 'myra@student.diksha.org', role: 'student', phone: '+91 90000 10101', status: 'PENDING_VERIFICATION', createdAt: '2026-09-12', dob: '2008-08-08', age: 18, programId: 'p1', cohortId: 'c2', teacherId: 't2', overallProgress: 0, assessmentAverage: 0, assignmentAverage: 0, disciplineScore: 0, leaderboardRank: 0, consent: true, avatar: 'MA', profile: { address: 'Mumbai, MH', guardianName: 'Pooja Agarwal', guardianPhone: '+91 90000 10102', bio: 'Eager to join the program.' } },
]

export const programs: Program[] = [
  { id: 'p1', name: 'Foundation Program', description: 'Core academic foundation covering science, mathematics, and social studies.', cohortIds: ['c1', 'c2'], subjectIds: ['s1', 's2', 's3'], status: 'active', createdAt: '2025-01-15' },
  { id: 'p2', name: 'Advanced Learning Track', description: 'Advanced coursework for high-performing students.', cohortIds: ['c3'], subjectIds: ['s4'], status: 'active', createdAt: '2025-03-01' },
]

export const cohorts: Cohort[] = [
  { id: 'c1', name: 'Cohort A 2025', programId: 'p1', studentCount: 4, createdAt: '2025-06-01' },
  { id: 'c2', name: 'Cohort B 2025', programId: 'p1', studentCount: 2, createdAt: '2025-06-15' },
  { id: 'c3', name: 'Cohort C 2025', programId: 'p2', studentCount: 2, createdAt: '2025-08-01' },
]

export const subjects: Subject[] = [
  { id: 's1', name: 'Mathematics', description: 'Algebra, geometry, calculus fundamentals.', programId: 'p1', status: 'PUBLISHED', moduleIds: ['m1', 'm2'], createdAt: '2025-02-01' },
  { id: 's2', name: 'Science', description: 'Physics, chemistry, and biology basics.', programId: 'p1', status: 'PUBLISHED', moduleIds: ['m3', 'm4'], createdAt: '2025-02-10' },
  { id: 's3', name: 'Social Studies', description: 'History, geography, and civics.', programId: 'p1', status: 'PUBLISHED', moduleIds: ['m5'], createdAt: '2025-02-20' },
  { id: 's4', name: 'English & Communication', description: 'Reading, writing, and spoken English.', programId: 'p2', status: 'PUBLISHED', moduleIds: ['m6'], createdAt: '2025-04-01' },
]

export const modules: Module[] = [
  { id: 'm1', subjectId: 's1', title: 'Linear Algebra', description: 'Vectors, matrices, and linear equations.', order: 1, status: 'PUBLISHED', contentIds: ['ct1', 'ct2'], assessmentIds: ['as1'] },
  { id: 'm2', subjectId: 's1', title: 'Geometry', description: 'Shapes, angles, and theorems.', order: 2, status: 'PUBLISHED', contentIds: ['ct3'], assessmentIds: ['as2'] },
  { id: 'm3', subjectId: 's2', title: 'Mechanics', description: 'Newton\'s laws, motion, and energy.', order: 1, status: 'PUBLISHED', contentIds: ['ct4', 'ct5'], assessmentIds: ['as3'] },
  { id: 'm4', subjectId: 's2', title: 'Chemical Reactions', description: 'Types of reactions and equations.', order: 2, status: 'DRAFT', contentIds: ['ct6'], assessmentIds: [] },
  { id: 'm5', subjectId: 's3', title: 'Modern Indian History', description: 'Independence movement and post-independence India.', order: 1, status: 'PUBLISHED', contentIds: ['ct7'], assessmentIds: ['as4'] },
  { id: 'm6', subjectId: 's4', title: 'Essay Writing', description: 'Structure, argument, and style.', order: 1, status: 'PUBLISHED', contentIds: ['ct8', 'ct9'], assessmentIds: ['as5'] },
]

export const contentItems: ContentItem[] = [
  { id: 'ct1', moduleId: 'm1', title: 'Introduction to Vectors', type: 'video', description: 'Learn the fundamentals of vectors.', url: 'https://example.com/video1', duration: 1200, status: 'PUBLISHED', createdAt: '2025-02-05' },
  { id: 'ct2', moduleId: 'm1', title: 'Matrix Operations Worksheet', type: 'document', description: 'Practice problems for matrix operations.', url: 'https://example.com/doc1.pdf', status: 'PUBLISHED', createdAt: '2025-02-08' },
  { id: 'ct3', moduleId: 'm2', title: 'Geometry Theorems Audio Lecture', type: 'audio', description: 'Audio lecture on key geometry theorems.', url: 'https://example.com/audio1.mp3', duration: 900, status: 'PUBLISHED', createdAt: '2025-02-15' },
  { id: 'ct4', moduleId: 'm3', title: 'Newton\'s Laws of Motion', type: 'video', description: 'Video explaining the three laws of motion.', url: 'https://example.com/video2', duration: 1500, status: 'PUBLISHED', createdAt: '2025-02-20' },
  { id: 'ct5', moduleId: 'm3', title: 'Energy and Work - Reading', type: 'text', description: 'Text resource on work-energy theorem.', status: 'PUBLISHED', createdAt: '2025-02-22' },
  { id: 'ct6', moduleId: 'm4', title: 'Balancing Equations (External)', type: 'link', description: 'External interactive tool for balancing chemical equations.', url: 'https://example.com/chemtool', status: 'DRAFT', createdAt: '2025-03-01' },
  { id: 'ct7', moduleId: 'm5', title: 'The Freedom Struggle', type: 'document', description: 'PDF document on India\'s freedom movement.', url: 'https://example.com/history.pdf', status: 'PUBLISHED', createdAt: '2025-03-05' },
  { id: 'ct8', moduleId: 'm6', title: 'Essay Structure Video', type: 'video', description: 'How to structure a five-paragraph essay.', url: 'https://example.com/video3', duration: 1800, status: 'PUBLISHED', createdAt: '2025-04-05' },
  { id: 'ct9', moduleId: 'm6', title: 'Writing Prompts Audio', type: 'audio', description: 'Audio prompts for practice writing.', url: 'https://example.com/audio2.mp3', duration: 600, status: 'PUBLISHED', createdAt: '2025-04-08' },
]

export const assessments: Assessment[] = [
  { id: 'as1', moduleId: 'm1', subjectId: 's1', title: 'Linear Algebra Quiz', description: 'Test your understanding of vectors and matrices.', questions: [
    { id: 'q1', type: 'mcq', question: 'What is the dot product of [1,2] and [3,4]?', options: ['7', '11', '14', '10'], correctAnswer: '11', marks: 5 },
    { id: 'q2', type: 'true_false', question: 'A matrix is always square.', options: ['True', 'False'], correctAnswer: 'False', marks: 5 },
    { id: 'q3', type: 'multiple_select', question: 'Which are vector operations?', options: ['Addition', 'Multiplication', 'Inversion', 'Dot product'], correctAnswer: ['Addition', 'Dot product'], marks: 10 },
  ], totalMarks: 20, passScore: 12, attempts: 3, status: 'PUBLISHED', createdAt: '2025-02-10' },
  { id: 'as2', moduleId: 'm2', subjectId: 's1', title: 'Geometry Test', description: 'Test on angles, triangles, and theorems.', questions: [
    { id: 'q4', type: 'mcq', question: 'Sum of angles in a triangle?', options: ['90°', '180°', '270°', '360°'], correctAnswer: '180°', marks: 5 },
    { id: 'q5', type: 'short_answer', question: 'Define a right angle.', marks: 10 },
  ], totalMarks: 15, passScore: 9, attempts: 2, status: 'PUBLISHED', createdAt: '2025-02-20' },
  { id: 'as3', moduleId: 'm3', subjectId: 's2', title: 'Mechanics Assessment', description: 'Newton\'s laws and energy concepts.', questions: [
    { id: 'q6', type: 'mcq', question: 'What is the SI unit of force?', options: ['Joule', 'Watt', 'Newton', 'Pascal'], correctAnswer: 'Newton', marks: 5 },
    { id: 'q7', type: 'true_false', question: 'Energy can be created or destroyed.', options: ['True', 'False'], correctAnswer: 'False', marks: 5 },
    { id: 'q8', type: 'audio_response', question: 'Explain Newton\'s third law in your own words (audio).', marks: 10 },
  ], totalMarks: 20, passScore: 12, attempts: 2, status: 'PUBLISHED', createdAt: '2025-02-25' },
  { id: 'as4', moduleId: 'm5', subjectId: 's3', title: 'History Quiz', description: 'Modern Indian history quiz.', questions: [
    { id: 'q9', type: 'mcq', question: 'In which year did India gain independence?', options: ['1945', '1946', '1947', '1948'], correctAnswer: '1947', marks: 5 },
    { id: 'q10', type: 'short_answer', question: 'Name one leader of the independence movement.', marks: 10 },
  ], totalMarks: 15, passScore: 9, attempts: 3, status: 'PUBLISHED', createdAt: '2025-03-10' },
  { id: 'as5', moduleId: 'm6', subjectId: 's4', title: 'Essay Writing Assessment', description: 'Test your essay structure knowledge.', questions: [
    { id: 'q11', type: 'mcq', question: 'How many paragraphs in a standard essay?', options: ['3', '4', '5', '6'], correctAnswer: '5', marks: 5 },
    { id: 'q12', type: 'video_response', question: 'Record a 1-minute video presenting your essay outline.', marks: 15 },
  ], totalMarks: 20, passScore: 12, attempts: 1, status: 'PUBLISHED', createdAt: '2025-04-10' },
]

export const assessmentSubmissions: AssessmentSubmission[] = [
  { id: 'sub1', assessmentId: 'as1', studentId: 'st1', answers: { q1: '11', q2: 'False', q3: ['Addition', 'Dot product'] }, score: 20, percentage: 100, passed: true, feedback: 'Excellent work!', submittedAt: '2025-08-15', status: 'graded' },
  { id: 'sub2', assessmentId: 'as2', studentId: 'st1', answers: { q4: '180°', q5: 'A 90 degree angle' }, score: 12, percentage: 80, passed: true, submittedAt: '2025-08-20', status: 'graded' },
  { id: 'sub3', assessmentId: 'as1', studentId: 'st2', answers: { q1: '14', q2: 'True', q3: ['Addition'] }, score: 5, percentage: 25, passed: false, feedback: 'Review vector operations.', submittedAt: '2025-08-18', status: 'graded' },
  { id: 'sub4', assessmentId: 'as3', studentId: 'st4', answers: { q6: 'Newton', q7: 'False' }, score: 10, percentage: 50, passed: false, submittedAt: '2025-09-01', status: 'graded' },
]

export const assignments: Assignment[] = [
  { id: 'asg1', studentId: 'st1', subjectId: 's1', moduleId: 'm1', title: 'Matrix Operations Project', instructions: 'Solve 10 matrix operation problems and submit your worked solutions.', attachments: [{ id: 'att1', name: 'problems.pdf', size: 245760, type: 'application/pdf' }], maxMarks: 50, dueDate: '2026-09-20', status: 'IN_PROGRESS', teacherId: 't1', createdAt: '2026-09-01' },
  { id: 'asg2', studentId: 'st1', subjectId: 's2', moduleId: 'm3', title: 'Energy Conservation Report', instructions: 'Write a 500-word report on energy conservation methods.', attachments: [], maxMarks: 30, dueDate: '2026-09-18', status: 'NEW', teacherId: 't1', createdAt: '2026-09-05' },
  { id: 'asg3', studentId: 'st2', subjectId: 's1', moduleId: 'm2', title: 'Geometry Proofs', instructions: 'Prove 5 geometry theorems with detailed steps.', attachments: [{ id: 'att2', name: 'theorems.pdf', size: 102400, type: 'application/pdf' }], maxMarks: 40, dueDate: '2026-09-15', status: 'SUBMITTED', teacherId: 't1', createdAt: '2026-08-20' },
  { id: 'asg4', studentId: 'st4', subjectId: 's2', moduleId: 'm3', title: 'Physics Lab Report', instructions: 'Write up the pendulum experiment results.', attachments: [{ id: 'att3', name: 'lab_data.xlsx', size: 51200, type: 'application/vnd.ms-excel' }], maxMarks: 50, dueDate: '2026-09-10', status: 'GRADED', teacherId: 't1', createdAt: '2026-08-15' },
  { id: 'asg5', studentId: 'st3', subjectId: 's3', title: 'History Essay', instructions: 'Write an essay on the Indian independence movement.', attachments: [], maxMarks: 40, dueDate: '2026-09-01', status: 'OVERDUE', teacherId: 't1', createdAt: '2026-08-10' },
  { id: 'asg6', studentId: 'st5', subjectId: 's3', title: 'Map Assignment', instructions: 'Label all Indian states on the provided map.', attachments: [{ id: 'att4', name: 'india_map.pdf', size: 860160, type: 'application/pdf' }], maxMarks: 25, dueDate: '2026-09-25', status: 'NEW', teacherId: 't2', createdAt: '2026-09-08' },
]

export const assignmentSubmissions: AssignmentSubmission[] = [
  { id: 'asub1', assignmentId: 'asg3', studentId: 'st2', textResponse: 'Completed all 5 proofs with detailed steps.', attachments: [{ id: 'att5', name: 'proofs.pdf', size: 327680, type: 'application/pdf' }], submittedAt: '2026-09-14', isLate: false },
  { id: 'asub2', assignmentId: 'asg4', studentId: 'st4', textResponse: 'Pendulum experiment results attached.', attachments: [{ id: 'att6', name: 'lab_report.pdf', size: 204800, type: 'application/pdf' }], submittedAt: '2026-09-08', marks: 45, feedback: 'Great analysis, improve the conclusion section.', gradedAt: '2026-09-12', isLate: false },
]

export const progressData: Progress[] = [
  { studentId: 'st1', subjectId: 's1', moduleId: 'm1', completionPercentage: 100, completedContentIds: ['ct1', 'ct2'], lastAccessedAt: '2026-09-10' },
  { studentId: 'st1', subjectId: 's1', moduleId: 'm2', completionPercentage: 50, completedContentIds: ['ct3'], lastAccessedAt: '2026-09-12' },
  { studentId: 'st1', subjectId: 's2', moduleId: 'm3', completionPercentage: 100, completedContentIds: ['ct4', 'ct5'], lastAccessedAt: '2026-09-08' },
  { studentId: 'st2', subjectId: 's1', moduleId: 'm1', completionPercentage: 100, completedContentIds: ['ct1', 'ct2'], lastAccessedAt: '2026-09-05' },
  { studentId: 'st2', subjectId: 's2', moduleId: 'm3', completionPercentage: 50, completedContentIds: ['ct4'], lastAccessedAt: '2026-09-06' },
  { studentId: 'st4', subjectId: 's1', moduleId: 'm1', completionPercentage: 100, completedContentIds: ['ct1', 'ct2'], lastAccessedAt: '2026-09-14' },
  { studentId: 'st4', subjectId: 's2', moduleId: 'm3', completionPercentage: 100, completedContentIds: ['ct4', 'ct5'], lastAccessedAt: '2026-09-13' },
  { studentId: 'st4', subjectId: 's4', moduleId: 'm6', completionPercentage: 50, completedContentIds: ['ct8'], lastAccessedAt: '2026-09-14' },
]

export const progressEvents: ProgressEvent[] = [
  { id: 'pe1', studentId: 'st1', type: 'content_completed', description: 'Completed: Introduction to Vectors', entityId: 'ct1', timestamp: '2026-09-10T10:30:00' },
  { id: 'pe2', studentId: 'st1', type: 'assessment_submitted', description: 'Submitted: Linear Algebra Quiz', entityId: 'as1', timestamp: '2026-09-08T14:00:00' },
  { id: 'pe3', studentId: 'st1', type: 'assignment_submitted', description: 'Started: Matrix Operations Project', entityId: 'asg1', timestamp: '2026-09-05T09:15:00' },
  { id: 'pe4', studentId: 'st1', type: 'login', description: 'Logged in', timestamp: '2026-09-14T08:00:00' },
  { id: 'pe5', studentId: 'st4', type: 'content_completed', description: 'Completed: Newton\'s Laws of Motion', entityId: 'ct4', timestamp: '2026-09-13T11:00:00' },
  { id: 'pe6', studentId: 'st4', type: 'module_completed', description: 'Completed module: Mechanics', entityId: 'm3', timestamp: '2026-09-13T11:30:00' },
]

export const healthRecords: HealthRecord[] = [
  { id: 'hr1', studentId: 'st1', date: '2026-06-15', bmi: 21.5, vitaminD: 32, vitaminB12: 450, iron: 85, hemoglobin: 13.5, notes: 'Healthy levels. Continue current diet.', teacherId: 't1', nextCheckDate: '2026-12-15' },
  { id: 'hr2', studentId: 'st1', date: '2026-03-15', bmi: 21.0, vitaminD: 28, vitaminB12: 420, iron: 80, hemoglobin: 13.0, notes: 'Slightly low vitamin D. Recommended supplements.', teacherId: 't1', nextCheckDate: '2026-06-15' },
  { id: 'hr3', studentId: 'st2', date: '2026-07-01', bmi: 20.8, vitaminD: 35, vitaminB12: 500, iron: 90, hemoglobin: 14.0, notes: 'All parameters normal.', teacherId: 't1', nextCheckDate: '2027-01-01' },
  { id: 'hr4', studentId: 'st4', date: '2026-08-01', bmi: 22.0, vitaminD: 40, vitaminB12: 480, iron: 88, hemoglobin: 13.8, notes: 'Excellent health metrics.', teacherId: 't1', nextCheckDate: '2027-02-01' },
  { id: 'hr5', studentId: 'st5', date: '2026-05-10', bmi: 19.5, vitaminD: 22, vitaminB12: 380, iron: 70, hemoglobin: 12.0, notes: 'Low iron and vitamin D. Dietary changes recommended.', teacherId: 't2', nextCheckDate: '2026-09-10' },
]

export const healthChecks: HealthCheck[] = [
  { id: 'hc1', studentId: 'st1', title: 'Quarterly Health Check', lastCheckDate: '2026-06-15', nextCheckDate: '2026-12-15', status: 'UPCOMING', teacherId: 't1' },
  { id: 'hc2', studentId: 'st5', title: 'Follow-up Iron Check', lastCheckDate: '2026-05-10', nextCheckDate: '2026-09-10', status: 'OVERDUE', teacherId: 't2' },
  { id: 'hc3', studentId: 'st2', title: 'Annual Check', lastCheckDate: '2026-07-01', nextCheckDate: '2027-01-01', status: 'UPCOMING', teacherId: 't1' },
  { id: 'hc4', studentId: 'st4', title: 'Annual Check', lastCheckDate: '2026-08-01', nextCheckDate: '2027-02-01', status: 'UPCOMING', teacherId: 't1' },
  { id: 'hc5', studentId: 'st3', title: 'Routine Check', lastCheckDate: '2026-04-01', nextCheckDate: '2026-09-01', status: 'OVERDUE', teacherId: 't1' },
]

export const conversations: Conversation[] = [
  { id: 'conv1', studentId: 'st1', teacherId: 't1', lastMessageAt: '2026-09-14T15:30:00', unreadCount: 2 },
  { id: 'conv2', studentId: 'st2', teacherId: 't1', lastMessageAt: '2026-09-13T10:00:00', unreadCount: 0 },
  { id: 'conv3', studentId: 'st4', teacherId: 't1', lastMessageAt: '2026-09-14T16:00:00', unreadCount: 1 },
  { id: 'conv4', studentId: 'st5', teacherId: 't2', lastMessageAt: '2026-09-10T14:00:00', unreadCount: 0 },
]

export const messages: Message[] = [
  { id: 'msg1', conversationId: 'conv1', senderId: 't1', senderRole: 'teacher', text: 'Hi Aarav, how is the Matrix Operations Project going?', attachments: [], read: true, sentAt: '2026-09-14T10:00:00' },
  { id: 'msg2', conversationId: 'conv1', senderId: 'st1', senderRole: 'student', text: 'It\'s going well! I\'ve completed 6 out of 10 problems.', attachments: [], read: true, sentAt: '2026-09-14T14:00:00' },
  { id: 'msg3', conversationId: 'conv1', senderId: 't1', senderRole: 'teacher', text: 'Great progress! Make sure to show all your working steps.', attachments: [], read: false, sentAt: '2026-09-14T15:30:00' },
  { id: 'msg4', conversationId: 'conv1', senderId: 't1', senderRole: 'teacher', text: 'Also, don\'t forget the Energy Conservation Report is due on the 18th.', attachments: [], read: false, sentAt: '2026-09-14T15:31:00' },
  { id: 'msg5', conversationId: 'conv2', senderId: 'st2', senderRole: 'student', text: 'Ma\'am, I had a question about the geometry proofs assignment.', attachments: [], read: true, sentAt: '2026-09-13T09:00:00' },
  { id: 'msg6', conversationId: 'conv2', senderId: 't1', senderRole: 'teacher', text: 'Sure, what\'s your question?', attachments: [], read: true, sentAt: '2026-09-13T10:00:00' },
  { id: 'msg7', conversationId: 'conv3', senderId: 'st4', senderRole: 'student', text: 'Thank you for the feedback on my lab report!', attachments: [], read: false, sentAt: '2026-09-14T16:00:00' },
]

export const notifications: AppNotification[] = [
  { id: 'n1', userId: 'st1', role: 'student', type: 'assignment', title: 'New Assignment', body: 'Energy Conservation Report assigned. Due Sep 18.', read: false, createdAt: '2026-09-05T09:00:00', link: '/student/assignments/asg2' },
  { id: 'n2', userId: 'st1', role: 'student', type: 'assessment', title: 'Assessment Result', body: 'Linear Algebra Quiz: 100% - Excellent work!', read: false, createdAt: '2026-09-08T14:30:00', link: '/student/assessments/as1' },
  { id: 'n3', userId: 'st1', role: 'student', type: 'message', title: 'New Message', body: 'Anita Verma sent you a message.', read: false, createdAt: '2026-09-14T15:30:00', link: '/student/chat' },
  { id: 'n4', userId: 'st1', role: 'student', type: 'health', title: 'Health Check Reminder', body: 'Your quarterly health check is due on Dec 15.', read: true, createdAt: '2026-09-01T08:00:00', link: '/student/health' },
  { id: 'n5', userId: 't1', role: 'teacher', type: 'registration', title: 'New Registration', body: 'Reyansh Kumar has registered and is pending verification.', read: false, createdAt: '2026-09-10T12:00:00', link: '/teacher/registrations' },
  { id: 'n6', userId: 't1', role: 'teacher', type: 'submission', title: 'Assignment Submitted', body: 'Diya Singh submitted Geometry Proofs.', read: false, createdAt: '2026-09-14T16:00:00', link: '/teacher/assignments/asg3' },
  { id: 'n7', userId: 't1', role: 'teacher', type: 'health', title: 'Health Check Overdue', body: 'Kabir Gupta\'s routine check is overdue.', read: true, createdAt: '2026-09-02T08:00:00', link: '/teacher/health-checks' },
  { id: 'n8', userId: 'a1', role: 'admin', type: 'system', title: 'System Update', body: 'Platform maintenance scheduled for Sep 20.', read: false, createdAt: '2026-09-14T07:00:00' },
  { id: 'n9', userId: 'a1', role: 'admin', type: 'report', title: 'Report Ready', body: 'Monthly enrollment report is ready for download.', read: true, createdAt: '2026-09-13T17:00:00', link: '/admin/reports' },
]

export const leaderboardScores: LeaderboardScore[] = [
  { studentId: 'st1', studentName: 'Aarav Patel', rank: 1, overallScore: 81.4, assessmentScore: 78, assignmentScore: 82, disciplineScore: 85, programId: 'p1', cohortId: 'c1' },
  { studentId: 'st4', studentName: 'Ananya Iyer', rank: 2, overallScore: 87.7, assessmentScore: 88, assignmentScore: 85, disciplineScore: 90, programId: 'p1', cohortId: 'c1' },
  { studentId: 'st2', studentName: 'Diya Singh', rank: 3, overallScore: 74.6, assessmentScore: 74, assignmentScore: 70, disciplineScore: 80, programId: 'p1', cohortId: 'c1' },
  { studentId: 'st3', studentName: 'Kabir Gupta', rank: 4, overallScore: 65.0, assessmentScore: 65, assignmentScore: 60, disciplineScore: 72, programId: 'p1', cohortId: 'c1' },
  { studentId: 'st6', studentName: 'Saanvi Rao', rank: 5, overallScore: 74.4, assessmentScore: 72, assignmentScore: 75, disciplineScore: 78, programId: 'p1', cohortId: 'c2' },
  { studentId: 'st8', studentName: 'Ishita Desai', rank: 6, overallScore: 81.4, assessmentScore: 80, assignmentScore: 78, disciplineScore: 88, programId: 'p2', cohortId: 'c3' },
  { studentId: 'st7', studentName: 'Arjun Mehta', rank: 7, overallScore: 61.8, assessmentScore: 60, assignmentScore: 58, disciplineScore: 70, programId: 'p2', cohortId: 'c3' },
  { studentId: 'st5', studentName: 'Vivaan Joshi', rank: 8, overallScore: 55.0, assessmentScore: 55, assignmentScore: 50, disciplineScore: 65, programId: 'p1', cohortId: 'c2' },
]

export const reports: Report[] = [
  { id: 'r1', type: 'student', title: 'Student Performance Report - September 2026', filters: { program: 'Foundation Program', cohort: 'Cohort A 2025' }, status: 'ready', createdAt: '2026-09-10', downloadUrl: '#' },
  { id: 'r2', type: 'teacher', title: 'Teacher Activity Report - September 2026', filters: { program: 'All' }, status: 'ready', createdAt: '2026-09-08', downloadUrl: '#' },
  { id: 'r3', type: 'program', title: 'Program Completion Report - Q3 2026', filters: { period: 'Q3 2026' }, status: 'generating', createdAt: '2026-09-14' },
]

export const auditLogs: AuditLog[] = [
  { id: 'al1', date: '2026-09-14T08:00:00', userId: 'a1', userName: 'Dr. Priya Sharma', role: 'admin', action: 'Login', entity: 'System', status: 'success' },
  { id: 'al2', date: '2026-09-14T10:30:00', userId: 't1', userName: 'Anita Verma', role: 'teacher', action: 'Student Verified', entity: 'st1', status: 'success', details: 'Approved Aarav Patel' },
  { id: 'al3', date: '2026-09-12T14:00:00', userId: 'a1', userName: 'Dr. Priya Sharma', role: 'admin', action: 'Teacher Created', entity: 't3', status: 'success', details: 'Created Meera Nair' },
  { id: 'al4', date: '2026-09-12T16:00:00', userId: 't1', userName: 'Anita Verma', role: 'teacher', action: 'Assignment Graded', entity: 'asg4', status: 'success', details: 'Graded Physics Lab Report - 45/50' },
  { id: 'al5', date: '2026-09-10T12:00:00', userId: 'st9', userName: 'Reyansh Kumar', role: 'student', action: 'Registration', entity: 'st9', status: 'success', details: 'Student self-registered' },
  { id: 'al6', date: '2026-09-13T17:00:00', userId: 'a1', userName: 'Dr. Priya Sharma', role: 'admin', action: 'Report Generated', entity: 'r1', status: 'success', details: 'Student Performance Report' },
  { id: 'al7', date: '2026-09-08T09:00:00', userId: 't1', userName: 'Anita Verma', role: 'teacher', action: 'Assessment Published', entity: 'as5', status: 'success', details: 'Essay Writing Assessment' },
  { id: 'al8', date: '2026-09-05T11:00:00', userId: 't1', userName: 'Anita Verma', role: 'teacher', action: 'Health Record Updated', entity: 'hr1', status: 'success', details: 'Updated health record for Aarav Patel' },
]
