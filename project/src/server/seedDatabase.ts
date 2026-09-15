import mongoose from 'mongoose';
import UserModel from './models/User.js';
import ProgramModel from './models/Program.js';
import CohortModel from './models/Cohort.js';
import SubjectModel from './models/Subject.js';
import ModuleModel from './models/Module.js';
import ContentItemModel from './models/ContentItem.js';
import AssessmentModel from './models/Assessment.js';
import AssignmentModel from './models/Assignment.js';
import StudentProfileModel from './models/StudentProfile.js';
import TeacherProfileModel from './models/TeacherProfile.js';
import AdminProfileModel from './models/AdminProfile.js';

let databaseSeeded = false;

import bcrypt from 'bcryptjs';

export async function seedAllCollections(): Promise<void> {
  if (databaseSeeded) return;

  try {
    console.log('🌱 Checking MongoDB Atlas collections for seeding...');

    // 0. Seed Users
    const userCount = await UserModel.countDocuments();
    if (userCount === 0) {
      const passwordHash = await bcrypt.hash('password123', 10);
      
      const admin = await UserModel.create({ name: 'Diksha Admin', email: 'admin@diksha.org', passwordHash, role: 'admin' });
      const teacher = await UserModel.create({ name: 'Prof. Sharma', email: 'teacher@diksha.org', passwordHash, role: 'teacher' });
      const student = await UserModel.create({ name: 'Aarav Patel', email: 'student@diksha.org', passwordHash, role: 'student' });
      
      await AdminProfileModel.create({ userId: admin._id, permissions: ['all'] });
      await TeacherProfileModel.create({ userId: teacher._id, subjects: [], bio: 'Senior Professor' });
      await StudentProfileModel.create({ userId: student._id, grade: '10th', programId: new mongoose.Types.ObjectId() });
    }

    // 1. Seed Programs
    const programCount = await ProgramModel.countDocuments();
    if (programCount === 0) {
      const p1 = await ProgramModel.create({
        name: 'Foundation Program',
        description: 'Core academic foundation covering science, mathematics, and social studies.',
        status: 'active',
        cohortIds: [],
        subjectIds: [],
      });

      const p2 = await ProgramModel.create({
        name: 'Advanced Learning Track',
        description: 'Advanced coursework for high-performing students.',
        status: 'active',
        cohortIds: [],
        subjectIds: [],
      });

      // 2. Seed Cohorts
      const c1 = await CohortModel.create({ name: 'Cohort A 2025', programId: p1._id, studentCount: 4 });
      const c2 = await CohortModel.create({ name: 'Cohort B 2025', programId: p1._id, studentCount: 2 });
      const c3 = await CohortModel.create({ name: 'Cohort C 2025', programId: p2._id, studentCount: 2 });

      p1.cohortIds = [c1._id, c2._id];
      await p1.save();
      p2.cohortIds = [c3._id];
      await p2.save();

      // 3. Seed Subjects
      const s1 = await SubjectModel.create({ name: 'Mathematics', description: 'Algebra, geometry, calculus fundamentals.', programId: p1._id, status: 'PUBLISHED', moduleIds: [] });
      const s2 = await SubjectModel.create({ name: 'Science', description: 'Physics, chemistry, and biology basics.', programId: p1._id, status: 'PUBLISHED', moduleIds: [] });
      const s3 = await SubjectModel.create({ name: 'Social Studies', description: 'History, geography, and civics.', programId: p1._id, status: 'PUBLISHED', moduleIds: [] });
      const s4 = await SubjectModel.create({ name: 'English & Communication', description: 'Reading, writing, and spoken English.', programId: p2._id, status: 'PUBLISHED', moduleIds: [] });

      p1.subjectIds = [s1._id, s2._id, s3._id];
      await p1.save();
      p2.subjectIds = [s4._id];
      await p2.save();

      // 4. Seed Modules
      const m1 = await ModuleModel.create({ subjectId: s1._id, title: 'Linear Algebra', description: 'Vectors, matrices, and linear equations.', order: 1, status: 'PUBLISHED', contentIds: [], assessmentIds: [] });
      const m2 = await ModuleModel.create({ subjectId: s1._id, title: 'Geometry', description: 'Shapes, angles, and theorems.', order: 2, status: 'PUBLISHED', contentIds: [], assessmentIds: [] });
      const m3 = await ModuleModel.create({ subjectId: s2._id, title: 'Mechanics', description: 'Newton laws, motion, and energy.', order: 1, status: 'PUBLISHED', contentIds: [], assessmentIds: [] });
      const m4 = await ModuleModel.create({ subjectId: s2._id, title: 'Chemical Reactions', description: 'Types of reactions and equations.', order: 2, status: 'DRAFT', contentIds: [], assessmentIds: [] });
      const m5 = await ModuleModel.create({ subjectId: s3._id, title: 'Modern Indian History', description: 'Independence movement and post-independence India.', order: 1, status: 'PUBLISHED', contentIds: [], assessmentIds: [] });
      const m6 = await ModuleModel.create({ subjectId: s4._id, title: 'Essay Writing', description: 'Structure, argument, and style.', order: 1, status: 'PUBLISHED', contentIds: [], assessmentIds: [] });

      s1.moduleIds = [m1._id, m2._id];
      await s1.save();
      s2.moduleIds = [m3._id, m4._id];
      await s2.save();
      s3.moduleIds = [m5._id];
      await s3.save();
      s4.moduleIds = [m6._id];
      await s4.save();

      // 5. Seed Content Items
      const ct1 = await ContentItemModel.create({ moduleId: m1._id, title: 'Introduction to Vectors', type: 'video', description: 'Learn the fundamentals of vectors.', url: 'https://example.com/video1', duration: 1200, status: 'PUBLISHED' });
      const ct2 = await ContentItemModel.create({ moduleId: m1._id, title: 'Matrix Operations Worksheet', type: 'document', description: 'Practice problems for matrix operations.', url: 'https://example.com/doc1.pdf', status: 'PUBLISHED' });
      const ct3 = await ContentItemModel.create({ moduleId: m2._id, title: 'Geometry Theorems Audio Lecture', type: 'audio', description: 'Audio lecture on key geometry theorems.', url: 'https://example.com/audio1.mp3', duration: 900, status: 'PUBLISHED' });
      const ct4 = await ContentItemModel.create({ moduleId: m3._id, title: 'Newton Laws of Motion', type: 'video', description: 'Video explaining the three laws of motion.', url: 'https://example.com/video2', duration: 1500, status: 'PUBLISHED' });
      const ct5 = await ContentItemModel.create({ moduleId: m3._id, title: 'Energy and Work - Reading', type: 'text', description: 'Text resource on work-energy theorem.', status: 'PUBLISHED' });
      const ct6 = await ContentItemModel.create({ moduleId: m4._id, title: 'Balancing Equations (External)', type: 'link', description: 'External interactive tool for balancing chemical equations.', url: 'https://example.com/chemtool', status: 'DRAFT' });
      const ct7 = await ContentItemModel.create({ moduleId: m5._id, title: 'The Freedom Struggle', type: 'document', description: 'PDF document on Indias freedom movement.', url: 'https://example.com/history.pdf', status: 'PUBLISHED' });
      const ct8 = await ContentItemModel.create({ moduleId: m6._id, title: 'Essay Structure Video', type: 'video', description: 'How to structure a five-paragraph essay.', url: 'https://example.com/video3', duration: 1800, status: 'PUBLISHED' });
      const ct9 = await ContentItemModel.create({ moduleId: m6._id, title: 'Writing Prompts Audio', type: 'audio', description: 'Audio prompts for practice writing.', url: 'https://example.com/audio2.mp3', duration: 600, status: 'PUBLISHED' });

      m1.contentIds = [ct1._id, ct2._id];
      await m1.save();
      m2.contentIds = [ct3._id];
      await m2.save();
      m3.contentIds = [ct4._id, ct5._id];
      await m3.save();
      m4.contentIds = [ct6._id];
      await m4.save();
      m5.contentIds = [ct7._id];
      await m5.save();
      m6.contentIds = [ct8._id, ct9._id];
      await m6.save();

      // 6. Seed Assessments Collection
      const as1 = await AssessmentModel.create({
        moduleId: m1._id,
        subjectId: s1._id,
        title: 'Linear Algebra Quiz',
        description: 'Test your understanding of vectors and matrices.',
        questions: [
          { type: 'mcq', question: 'What is the dot product of [1,2] and [3,4]?', options: ['7', '11', '14', '10'], correctAnswer: '11', marks: 5 },
          { type: 'true_false', question: 'A matrix is always square.', options: ['True', 'False'], correctAnswer: 'False', marks: 5 },
          { type: 'multiple_select', question: 'Which are vector operations?', options: ['Addition', 'Multiplication', 'Inversion', 'Dot product'], correctAnswer: ['Addition', 'Dot product'], marks: 10 },
        ],
        totalMarks: 20,
        passScore: 12,
        attempts: 3,
        status: 'PUBLISHED',
      });

      const as2 = await AssessmentModel.create({
        moduleId: m2._id,
        subjectId: s1._id,
        title: 'Geometry Test',
        description: 'Test on angles, triangles, and theorems.',
        questions: [
          { type: 'mcq', question: 'Sum of angles in a triangle?', options: ['90°', '180°', '270°', '360°'], correctAnswer: '180°', marks: 5 },
          { type: 'short_answer', question: 'Define a right angle.', marks: 10 },
        ],
        totalMarks: 15,
        passScore: 9,
        attempts: 2,
        status: 'PUBLISHED',
      });

      const as3 = await AssessmentModel.create({
        moduleId: m3._id,
        subjectId: s2._id,
        title: 'Mechanics Assessment',
        description: 'Newton laws and energy concepts.',
        questions: [
          { type: 'mcq', question: 'What is the SI unit of force?', options: ['Joule', 'Watt', 'Newton', 'Pascal'], correctAnswer: 'Newton', marks: 5 },
          { type: 'true_false', question: 'Energy can be created or destroyed.', options: ['True', 'False'], correctAnswer: 'False', marks: 5 },
        ],
        totalMarks: 10,
        passScore: 6,
        attempts: 2,
        status: 'PUBLISHED',
      });

      const as4 = await AssessmentModel.create({
        moduleId: m5._id,
        subjectId: s3._id,
        title: 'History Quiz',
        description: 'Modern Indian history quiz.',
        questions: [
          { type: 'mcq', question: 'In which year did India gain independence?', options: ['1945', '1946', '1947', '1948'], correctAnswer: '1947', marks: 5 },
        ],
        totalMarks: 5,
        passScore: 3,
        attempts: 3,
        status: 'PUBLISHED',
      });

      m1.assessmentIds = [as1._id];
      await m1.save();
      m2.assessmentIds = [as2._id];
      await m2.save();
      m3.assessmentIds = [as3._id];
      await m3.save();
      m5.assessmentIds = [as4._id];
      await m5.save();

      console.log('✅ Successfully seeded all MongoDB curriculum, assessment & content collections!');
    }

    databaseSeeded = true;
  } catch (err) {
    console.error('Error seeding MongoDB collections:', (err as Error).message);
  }
}
