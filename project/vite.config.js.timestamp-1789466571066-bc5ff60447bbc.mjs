var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/server/models/User.ts
var User_exports = {};
__export(User_exports, {
  UserModel: () => UserModel,
  default: () => User_default
});
import mongoose, { Schema } from "file:///C:/Users/pegga/OneDrive/Desktop/mock/project/node_modules/mongoose/index.js";
var UserSchema, UserModel, User_default;
var init_User = __esm({
  "src/server/models/User.ts"() {
    UserSchema = new Schema(
      {
        name: {
          type: String,
          required: [true, "Name is required"],
          trim: true
        },
        email: {
          type: String,
          required: [true, "Email is required"],
          unique: true,
          lowercase: true,
          trim: true
        },
        passwordHash: {
          type: String,
          required: [true, "Password hash is required"]
        },
        role: {
          type: String,
          enum: {
            values: ["admin", "teacher", "student"],
            message: "{VALUE} is not a valid role"
          },
          required: [true, "Role is required"]
        },
        status: {
          type: String,
          enum: ["PENDING_VERIFICATION", "ACTIVE", "REJECTED", "INACTIVE"],
          default: "PENDING_VERIFICATION"
        },
        phone: { type: String, trim: true },
        avatar: { type: String, trim: true },
        lastLogin: { type: Date }
      },
      {
        timestamps: true
      }
    );
    UserModel = mongoose.models.User || mongoose.model("User", UserSchema);
    User_default = UserModel;
  }
});

// src/server/models/Program.ts
import mongoose2, { Schema as Schema2 } from "file:///C:/Users/pegga/OneDrive/Desktop/mock/project/node_modules/mongoose/index.js";
var ProgramSchema, ProgramModel, Program_default;
var init_Program = __esm({
  "src/server/models/Program.ts"() {
    ProgramSchema = new Schema2(
      {
        name: {
          type: String,
          required: [true, "Program name is required"],
          trim: true
        },
        description: { type: String, trim: true, default: "" },
        cohortIds: [{ type: Schema2.Types.ObjectId, ref: "Cohort" }],
        subjectIds: [{ type: Schema2.Types.ObjectId, ref: "Subject" }],
        status: {
          type: String,
          enum: ["active", "inactive"],
          default: "active"
        }
      },
      { timestamps: true }
    );
    ProgramModel = mongoose2.models.Program || mongoose2.model("Program", ProgramSchema);
    Program_default = ProgramModel;
  }
});

// src/server/models/Cohort.ts
import mongoose3, { Schema as Schema3 } from "file:///C:/Users/pegga/OneDrive/Desktop/mock/project/node_modules/mongoose/index.js";
var CohortSchema, CohortModel, Cohort_default;
var init_Cohort = __esm({
  "src/server/models/Cohort.ts"() {
    CohortSchema = new Schema3(
      {
        name: {
          type: String,
          required: [true, "Cohort name is required"],
          trim: true
        },
        programId: {
          type: Schema3.Types.ObjectId,
          ref: "Program",
          required: [true, "Program is required"]
        },
        studentCount: { type: Number, default: 0, min: 0 }
      },
      { timestamps: true }
    );
    CohortSchema.index({ programId: 1 });
    CohortModel = mongoose3.models.Cohort || mongoose3.model("Cohort", CohortSchema);
    Cohort_default = CohortModel;
  }
});

// src/server/models/Subject.ts
import mongoose4, { Schema as Schema4 } from "file:///C:/Users/pegga/OneDrive/Desktop/mock/project/node_modules/mongoose/index.js";
var SubjectSchema, SubjectModel, Subject_default;
var init_Subject = __esm({
  "src/server/models/Subject.ts"() {
    SubjectSchema = new Schema4(
      {
        name: {
          type: String,
          required: [true, "Subject name is required"],
          trim: true
        },
        description: { type: String, trim: true, default: "" },
        programId: {
          type: Schema4.Types.ObjectId,
          ref: "Program",
          required: [true, "Program is required"]
        },
        status: {
          type: String,
          enum: ["DRAFT", "PUBLISHED", "ARCHIVED"],
          default: "DRAFT"
        },
        moduleIds: [{ type: Schema4.Types.ObjectId, ref: "Module" }]
      },
      { timestamps: true }
    );
    SubjectSchema.index({ programId: 1 });
    SubjectSchema.index({ status: 1 });
    SubjectModel = mongoose4.models.Subject || mongoose4.model("Subject", SubjectSchema);
    Subject_default = SubjectModel;
  }
});

// src/server/models/Module.ts
import mongoose5, { Schema as Schema5 } from "file:///C:/Users/pegga/OneDrive/Desktop/mock/project/node_modules/mongoose/index.js";
var ModuleSchema, ModuleModel, Module_default;
var init_Module = __esm({
  "src/server/models/Module.ts"() {
    ModuleSchema = new Schema5(
      {
        subjectId: {
          type: Schema5.Types.ObjectId,
          ref: "Subject",
          required: [true, "Subject is required"]
        },
        title: {
          type: String,
          required: [true, "Module title is required"],
          trim: true
        },
        description: { type: String, trim: true, default: "" },
        order: { type: Number, required: true, min: 1 },
        status: {
          type: String,
          enum: ["DRAFT", "PUBLISHED", "ARCHIVED"],
          default: "DRAFT"
        },
        contentIds: [{ type: Schema5.Types.ObjectId, ref: "ContentItem" }],
        assessmentIds: [{ type: Schema5.Types.ObjectId, ref: "Assessment" }]
      },
      { timestamps: true }
    );
    ModuleSchema.index({ subjectId: 1, order: 1 });
    ModuleSchema.index({ status: 1 });
    ModuleModel = mongoose5.models.Module || mongoose5.model("Module", ModuleSchema);
    Module_default = ModuleModel;
  }
});

// src/server/models/ContentItem.ts
import mongoose6, { Schema as Schema6 } from "file:///C:/Users/pegga/OneDrive/Desktop/mock/project/node_modules/mongoose/index.js";
var ContentItemSchema, ContentItemModel, ContentItem_default;
var init_ContentItem = __esm({
  "src/server/models/ContentItem.ts"() {
    ContentItemSchema = new Schema6(
      {
        moduleId: {
          type: Schema6.Types.ObjectId,
          ref: "Module",
          required: [true, "Module is required"]
        },
        title: {
          type: String,
          required: [true, "Title is required"],
          trim: true
        },
        type: {
          type: String,
          enum: ["video", "document", "audio", "link", "text"],
          required: [true, "Content type is required"]
        },
        description: { type: String, trim: true, default: "" },
        url: { type: String, trim: true },
        duration: { type: Number, min: 0 },
        // seconds
        status: {
          type: String,
          enum: ["DRAFT", "PUBLISHED", "ARCHIVED"],
          default: "DRAFT"
        }
      },
      { timestamps: true }
    );
    ContentItemSchema.index({ moduleId: 1 });
    ContentItemSchema.index({ status: 1 });
    ContentItemModel = mongoose6.models.ContentItem || mongoose6.model("ContentItem", ContentItemSchema);
    ContentItem_default = ContentItemModel;
  }
});

// src/server/models/Assessment.ts
import mongoose7, { Schema as Schema7 } from "file:///C:/Users/pegga/OneDrive/Desktop/mock/project/node_modules/mongoose/index.js";
var QuestionSchema, AssessmentSchema, AssessmentModel, Assessment_default;
var init_Assessment = __esm({
  "src/server/models/Assessment.ts"() {
    QuestionSchema = new Schema7(
      {
        type: {
          type: String,
          enum: ["mcq", "multiple_select", "true_false", "short_answer", "audio_response", "video_response"],
          required: true
        },
        question: { type: String, required: true, trim: true },
        options: [{ type: String }],
        correctAnswer: { type: Schema7.Types.Mixed },
        // string or string[]
        marks: { type: Number, required: true, min: 0 }
      },
      { _id: true }
    );
    AssessmentSchema = new Schema7(
      {
        moduleId: {
          type: Schema7.Types.ObjectId,
          ref: "Module"
        },
        subjectId: {
          type: Schema7.Types.ObjectId,
          ref: "Subject"
        },
        title: {
          type: String,
          required: [true, "Assessment title is required"],
          trim: true
        },
        description: { type: String, trim: true, default: "" },
        questions: { type: [QuestionSchema], default: [] },
        totalMarks: { type: Number, required: true, min: 0 },
        passScore: { type: Number, required: true, min: 0 },
        maxAttempts: { type: Number, default: 3, min: 1 },
        status: {
          type: String,
          enum: ["DRAFT", "PUBLISHED", "ARCHIVED"],
          default: "DRAFT"
        },
        createdBy: { type: Schema7.Types.ObjectId, ref: "User" }
      },
      { timestamps: true }
    );
    AssessmentSchema.index({ moduleId: 1 });
    AssessmentSchema.index({ subjectId: 1 });
    AssessmentSchema.index({ status: 1 });
    AssessmentModel = mongoose7.models.Assessment || mongoose7.model("Assessment", AssessmentSchema);
    Assessment_default = AssessmentModel;
  }
});

// src/server/models/StudentProfile.ts
var StudentProfile_exports = {};
__export(StudentProfile_exports, {
  StudentProfileModel: () => StudentProfileModel,
  default: () => StudentProfile_default
});
import mongoose8, { Schema as Schema8 } from "file:///C:/Users/pegga/OneDrive/Desktop/mock/project/node_modules/mongoose/index.js";
var StudentProfileSchema, StudentProfileModel, StudentProfile_default;
var init_StudentProfile = __esm({
  "src/server/models/StudentProfile.ts"() {
    StudentProfileSchema = new Schema8(
      {
        userId: {
          type: Schema8.Types.ObjectId,
          ref: "User",
          required: true,
          unique: true
        },
        dob: { type: Date },
        programId: { type: Schema8.Types.ObjectId, ref: "Program" },
        cohortId: { type: Schema8.Types.ObjectId, ref: "Cohort" },
        teacherId: { type: Schema8.Types.ObjectId, ref: "User" },
        overallProgress: { type: Number, default: 0, min: 0, max: 100 },
        assessmentAverage: { type: Number, default: 0, min: 0, max: 100 },
        assignmentAverage: { type: Number, default: 0, min: 0, max: 100 },
        disciplineScore: { type: Number, default: 0, min: 0, max: 100 },
        leaderboardRank: { type: Number, default: 0 },
        consent: { type: Boolean, default: false },
        profile: {
          address: { type: String, trim: true },
          guardianName: { type: String, trim: true },
          guardianPhone: { type: String, trim: true },
          bio: { type: String, trim: true }
        }
      },
      { timestamps: true }
    );
    StudentProfileSchema.index({ programId: 1 });
    StudentProfileSchema.index({ cohortId: 1 });
    StudentProfileSchema.index({ teacherId: 1 });
    StudentProfileModel = mongoose8.models.StudentProfile || mongoose8.model("StudentProfile", StudentProfileSchema);
    StudentProfile_default = StudentProfileModel;
  }
});

// src/server/models/TeacherProfile.ts
import mongoose9, { Schema as Schema9 } from "file:///C:/Users/pegga/OneDrive/Desktop/mock/project/node_modules/mongoose/index.js";
var TeacherProfileSchema, TeacherProfileModel, TeacherProfile_default;
var init_TeacherProfile = __esm({
  "src/server/models/TeacherProfile.ts"() {
    TeacherProfileSchema = new Schema9(
      {
        userId: {
          type: Schema9.Types.ObjectId,
          ref: "User",
          required: true,
          unique: true
        },
        employeeId: {
          type: String,
          required: [true, "Employee ID is required"],
          unique: true,
          trim: true
        },
        programId: { type: Schema9.Types.ObjectId, ref: "Program" },
        cohortId: { type: Schema9.Types.ObjectId, ref: "Cohort" },
        subjectIds: [{ type: Schema9.Types.ObjectId, ref: "Subject" }],
        studentIds: [{ type: Schema9.Types.ObjectId, ref: "User" }]
      },
      { timestamps: true }
    );
    TeacherProfileSchema.index({ programId: 1 });
    TeacherProfileSchema.index({ cohortId: 1 });
    TeacherProfileModel = mongoose9.models.TeacherProfile || mongoose9.model("TeacherProfile", TeacherProfileSchema);
    TeacherProfile_default = TeacherProfileModel;
  }
});

// src/server/models/AdminProfile.ts
import mongoose10, { Schema as Schema10 } from "file:///C:/Users/pegga/OneDrive/Desktop/mock/project/node_modules/mongoose/index.js";
var AdminProfileSchema, AdminProfileModel, AdminProfile_default;
var init_AdminProfile = __esm({
  "src/server/models/AdminProfile.ts"() {
    AdminProfileSchema = new Schema10(
      {
        userId: {
          type: Schema10.Types.ObjectId,
          ref: "User",
          required: true,
          unique: true
        },
        employeeId: {
          type: String,
          required: [true, "Employee ID is required"],
          unique: true,
          trim: true
        }
      },
      { timestamps: true }
    );
    AdminProfileModel = mongoose10.models.AdminProfile || mongoose10.model("AdminProfile", AdminProfileSchema);
    AdminProfile_default = AdminProfileModel;
  }
});

// src/server/seedDatabase.ts
var seedDatabase_exports = {};
__export(seedDatabase_exports, {
  seedAllCollections: () => seedAllCollections
});
import mongoose11 from "file:///C:/Users/pegga/OneDrive/Desktop/mock/project/node_modules/mongoose/index.js";
import bcrypt from "file:///C:/Users/pegga/OneDrive/Desktop/mock/project/node_modules/bcryptjs/index.js";
async function seedAllCollections() {
  if (databaseSeeded) return;
  try {
    console.log("\u{1F331} Checking MongoDB Atlas collections for seeding...");
    const userCount = await User_default.countDocuments();
    if (userCount === 0) {
      const passwordHash = await bcrypt.hash("password123", 10);
      const admin = await User_default.create({ name: "Diksha Admin", email: "admin@diksha.org", passwordHash, role: "admin" });
      const teacher = await User_default.create({ name: "Prof. Sharma", email: "teacher@diksha.org", passwordHash, role: "teacher" });
      const student = await User_default.create({ name: "Aarav Patel", email: "student@diksha.org", passwordHash, role: "student" });
      await AdminProfile_default.create({ userId: admin._id, permissions: ["all"] });
      await TeacherProfile_default.create({ userId: teacher._id, subjects: [], bio: "Senior Professor" });
      await StudentProfile_default.create({ userId: student._id, grade: "10th", programId: new mongoose11.Types.ObjectId() });
    }
    const programCount = await Program_default.countDocuments();
    if (programCount === 0) {
      const p1 = await Program_default.create({
        name: "Foundation Program",
        description: "Core academic foundation covering science, mathematics, and social studies.",
        status: "active",
        cohortIds: [],
        subjectIds: []
      });
      const p2 = await Program_default.create({
        name: "Advanced Learning Track",
        description: "Advanced coursework for high-performing students.",
        status: "active",
        cohortIds: [],
        subjectIds: []
      });
      const c1 = await Cohort_default.create({ name: "Cohort A 2025", programId: p1._id, studentCount: 4 });
      const c2 = await Cohort_default.create({ name: "Cohort B 2025", programId: p1._id, studentCount: 2 });
      const c3 = await Cohort_default.create({ name: "Cohort C 2025", programId: p2._id, studentCount: 2 });
      p1.cohortIds = [c1._id, c2._id];
      await p1.save();
      p2.cohortIds = [c3._id];
      await p2.save();
      const s1 = await Subject_default.create({ name: "Mathematics", description: "Algebra, geometry, calculus fundamentals.", programId: p1._id, status: "PUBLISHED", moduleIds: [] });
      const s2 = await Subject_default.create({ name: "Science", description: "Physics, chemistry, and biology basics.", programId: p1._id, status: "PUBLISHED", moduleIds: [] });
      const s3 = await Subject_default.create({ name: "Social Studies", description: "History, geography, and civics.", programId: p1._id, status: "PUBLISHED", moduleIds: [] });
      const s4 = await Subject_default.create({ name: "English & Communication", description: "Reading, writing, and spoken English.", programId: p2._id, status: "PUBLISHED", moduleIds: [] });
      p1.subjectIds = [s1._id, s2._id, s3._id];
      await p1.save();
      p2.subjectIds = [s4._id];
      await p2.save();
      const m1 = await Module_default.create({ subjectId: s1._id, title: "Linear Algebra", description: "Vectors, matrices, and linear equations.", order: 1, status: "PUBLISHED", contentIds: [], assessmentIds: [] });
      const m2 = await Module_default.create({ subjectId: s1._id, title: "Geometry", description: "Shapes, angles, and theorems.", order: 2, status: "PUBLISHED", contentIds: [], assessmentIds: [] });
      const m3 = await Module_default.create({ subjectId: s2._id, title: "Mechanics", description: "Newton laws, motion, and energy.", order: 1, status: "PUBLISHED", contentIds: [], assessmentIds: [] });
      const m4 = await Module_default.create({ subjectId: s2._id, title: "Chemical Reactions", description: "Types of reactions and equations.", order: 2, status: "DRAFT", contentIds: [], assessmentIds: [] });
      const m5 = await Module_default.create({ subjectId: s3._id, title: "Modern Indian History", description: "Independence movement and post-independence India.", order: 1, status: "PUBLISHED", contentIds: [], assessmentIds: [] });
      const m6 = await Module_default.create({ subjectId: s4._id, title: "Essay Writing", description: "Structure, argument, and style.", order: 1, status: "PUBLISHED", contentIds: [], assessmentIds: [] });
      s1.moduleIds = [m1._id, m2._id];
      await s1.save();
      s2.moduleIds = [m3._id, m4._id];
      await s2.save();
      s3.moduleIds = [m5._id];
      await s3.save();
      s4.moduleIds = [m6._id];
      await s4.save();
      const ct1 = await ContentItem_default.create({ moduleId: m1._id, title: "Introduction to Vectors", type: "video", description: "Learn the fundamentals of vectors.", url: "https://example.com/video1", duration: 1200, status: "PUBLISHED" });
      const ct2 = await ContentItem_default.create({ moduleId: m1._id, title: "Matrix Operations Worksheet", type: "document", description: "Practice problems for matrix operations.", url: "https://example.com/doc1.pdf", status: "PUBLISHED" });
      const ct3 = await ContentItem_default.create({ moduleId: m2._id, title: "Geometry Theorems Audio Lecture", type: "audio", description: "Audio lecture on key geometry theorems.", url: "https://example.com/audio1.mp3", duration: 900, status: "PUBLISHED" });
      const ct4 = await ContentItem_default.create({ moduleId: m3._id, title: "Newton Laws of Motion", type: "video", description: "Video explaining the three laws of motion.", url: "https://example.com/video2", duration: 1500, status: "PUBLISHED" });
      const ct5 = await ContentItem_default.create({ moduleId: m3._id, title: "Energy and Work - Reading", type: "text", description: "Text resource on work-energy theorem.", status: "PUBLISHED" });
      const ct6 = await ContentItem_default.create({ moduleId: m4._id, title: "Balancing Equations (External)", type: "link", description: "External interactive tool for balancing chemical equations.", url: "https://example.com/chemtool", status: "DRAFT" });
      const ct7 = await ContentItem_default.create({ moduleId: m5._id, title: "The Freedom Struggle", type: "document", description: "PDF document on Indias freedom movement.", url: "https://example.com/history.pdf", status: "PUBLISHED" });
      const ct8 = await ContentItem_default.create({ moduleId: m6._id, title: "Essay Structure Video", type: "video", description: "How to structure a five-paragraph essay.", url: "https://example.com/video3", duration: 1800, status: "PUBLISHED" });
      const ct9 = await ContentItem_default.create({ moduleId: m6._id, title: "Writing Prompts Audio", type: "audio", description: "Audio prompts for practice writing.", url: "https://example.com/audio2.mp3", duration: 600, status: "PUBLISHED" });
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
      const as1 = await Assessment_default.create({
        moduleId: m1._id,
        subjectId: s1._id,
        title: "Linear Algebra Quiz",
        description: "Test your understanding of vectors and matrices.",
        questions: [
          { type: "mcq", question: "What is the dot product of [1,2] and [3,4]?", options: ["7", "11", "14", "10"], correctAnswer: "11", marks: 5 },
          { type: "true_false", question: "A matrix is always square.", options: ["True", "False"], correctAnswer: "False", marks: 5 },
          { type: "multiple_select", question: "Which are vector operations?", options: ["Addition", "Multiplication", "Inversion", "Dot product"], correctAnswer: ["Addition", "Dot product"], marks: 10 }
        ],
        totalMarks: 20,
        passScore: 12,
        attempts: 3,
        status: "PUBLISHED"
      });
      const as2 = await Assessment_default.create({
        moduleId: m2._id,
        subjectId: s1._id,
        title: "Geometry Test",
        description: "Test on angles, triangles, and theorems.",
        questions: [
          { type: "mcq", question: "Sum of angles in a triangle?", options: ["90\xB0", "180\xB0", "270\xB0", "360\xB0"], correctAnswer: "180\xB0", marks: 5 },
          { type: "short_answer", question: "Define a right angle.", marks: 10 }
        ],
        totalMarks: 15,
        passScore: 9,
        attempts: 2,
        status: "PUBLISHED"
      });
      const as3 = await Assessment_default.create({
        moduleId: m3._id,
        subjectId: s2._id,
        title: "Mechanics Assessment",
        description: "Newton laws and energy concepts.",
        questions: [
          { type: "mcq", question: "What is the SI unit of force?", options: ["Joule", "Watt", "Newton", "Pascal"], correctAnswer: "Newton", marks: 5 },
          { type: "true_false", question: "Energy can be created or destroyed.", options: ["True", "False"], correctAnswer: "False", marks: 5 }
        ],
        totalMarks: 10,
        passScore: 6,
        attempts: 2,
        status: "PUBLISHED"
      });
      const as4 = await Assessment_default.create({
        moduleId: m5._id,
        subjectId: s3._id,
        title: "History Quiz",
        description: "Modern Indian history quiz.",
        questions: [
          { type: "mcq", question: "In which year did India gain independence?", options: ["1945", "1946", "1947", "1948"], correctAnswer: "1947", marks: 5 }
        ],
        totalMarks: 5,
        passScore: 3,
        attempts: 3,
        status: "PUBLISHED"
      });
      m1.assessmentIds = [as1._id];
      await m1.save();
      m2.assessmentIds = [as2._id];
      await m2.save();
      m3.assessmentIds = [as3._id];
      await m3.save();
      m5.assessmentIds = [as4._id];
      await m5.save();
      console.log("\u2705 Successfully seeded all MongoDB curriculum, assessment & content collections!");
    }
    databaseSeeded = true;
  } catch (err) {
    console.error("Error seeding MongoDB collections:", err.message);
  }
}
var databaseSeeded;
var init_seedDatabase = __esm({
  "src/server/seedDatabase.ts"() {
    init_User();
    init_Program();
    init_Cohort();
    init_Subject();
    init_Module();
    init_ContentItem();
    init_Assessment();
    init_StudentProfile();
    init_TeacherProfile();
    init_AdminProfile();
    databaseSeeded = false;
  }
});

// vite.config.js
import { defineConfig } from "file:///C:/Users/pegga/OneDrive/Desktop/mock/project/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/pegga/OneDrive/Desktop/mock/project/node_modules/@vitejs/plugin-react/dist/index.js";

// src/server/authHandler.ts
import bcrypt2 from "file:///C:/Users/pegga/OneDrive/Desktop/mock/project/node_modules/bcryptjs/index.js";
import jwt from "file:///C:/Users/pegga/OneDrive/Desktop/mock/project/node_modules/jsonwebtoken/index.js";

// src/server/db.ts
import dns from "node:dns";
import mongoose12 from "file:///C:/Users/pegga/OneDrive/Desktop/mock/project/node_modules/mongoose/index.js";
import dotenv from "file:///C:/Users/pegga/OneDrive/Desktop/mock/project/node_modules/dotenv/lib/main.js";
dotenv.config();
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch {
}
var isConnected = false;
async function connectToDatabase() {
  dotenv.config({ override: true });
  if (isConnected && mongoose12.connection.readyState === 1) {
    return true;
  }
  const mongoUri = process.env.MONGODB_URI?.trim();
  if (!mongoUri) {
    return false;
  }
  try {
    const db = await mongoose12.connect(mongoUri, {
      dbName: "diksha",
      serverSelectionTimeoutMS: 8e3
    });
    isConnected = db.connection.readyState === 1;
    console.log("\u2705 Successfully connected to MongoDB Atlas. Database:", db.connection.name);
    const { seedAllCollections: seedAllCollections2 } = await Promise.resolve().then(() => (init_seedDatabase(), seedDatabase_exports));
    await seedAllCollections2();
    return isConnected;
  } catch (error) {
    console.error("\u274C MongoDB connection error:", error.message);
    isConnected = false;
    return false;
  }
}
function isMongoConnected() {
  return isConnected && mongoose12.connection.readyState === 1;
}

// src/server/authHandler.ts
init_User();
init_StudentProfile();
init_TeacherProfile();
init_AdminProfile();
import mongoose13 from "file:///C:/Users/pegga/OneDrive/Desktop/mock/project/node_modules/mongoose/index.js";
var ALLOWED_ROLES = ["admin", "teacher", "student"];
var JWT_SECRET = process.env.JWT_SECRET || "diksha-foundation-secret-key-2026";
var inMemoryUsers = /* @__PURE__ */ new Map();
function seedInMem(id, name, email, rawPassword, role) {
  const passwordHash = bcrypt2.hashSync(rawPassword, 10);
  inMemoryUsers.set(email.toLowerCase(), {
    id,
    name,
    email: email.toLowerCase(),
    passwordHash,
    role,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  });
}
seedInMem(new mongoose13.Types.ObjectId().toString(), "Diksha Admin", "admin@diksha.org", "password123", "admin");
seedInMem(new mongoose13.Types.ObjectId().toString(), "Prof. Sharma", "teacher@diksha.org", "password123", "teacher");
seedInMem(new mongoose13.Types.ObjectId().toString(), "Aarav Patel", "student@diksha.org", "password123", "student");
var mongoSeeded = false;
async function ensureMongoSeeded() {
  if (mongoSeeded || !isMongoConnected()) return;
  mongoSeeded = true;
}
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
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
    req.on("error", (err) => reject(err));
  });
}
function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}
async function authenticate(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  const token = authHeader.split(" ")[1];
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch {
    return null;
  }
}
async function handleAuthRequest(req, res) {
  const url = req.url?.split("?")[0];
  if (url === "/api/auth/signup" && req.method === "POST") {
    try {
      const body = await parseJsonBody(req);
      const { name, email, password, role } = body;
      if (!name || typeof name !== "string" || !name.trim()) {
        sendJson(res, 400, { message: "Name is required" });
        return true;
      }
      if (!email || typeof email !== "string" || !email.trim()) {
        sendJson(res, 400, { message: "Email is required" });
        return true;
      }
      if (!password || typeof password !== "string" || password.length < 6) {
        sendJson(res, 400, { message: "Password must be at least 6 characters" });
        return true;
      }
      if (!role || !ALLOWED_ROLES.includes(role)) {
        sendJson(res, 400, {
          message: "Invalid role. Role must be one of: admin, teacher, student."
        });
        return true;
      }
      const normalizedEmail = email.toLowerCase().trim();
      const passwordHash = await bcrypt2.hash(password, 10);
      const mongoReady = await connectToDatabase();
      if (mongoReady) {
        await ensureMongoSeeded();
        const existingUser = await User_default.findOne({ email: normalizedEmail });
        if (existingUser) {
          sendJson(res, 400, { message: "Email already registered" });
          return true;
        }
        await User_default.create({
          name: name.trim(),
          email: normalizedEmail,
          passwordHash,
          role
        });
        sendJson(res, 201, {
          message: "Account created successfully"
        });
        return true;
      }
      if (inMemoryUsers.has(normalizedEmail)) {
        sendJson(res, 400, { message: "Email already registered" });
        return true;
      }
      const newUser = {
        id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        role,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      inMemoryUsers.set(normalizedEmail, newUser);
      sendJson(res, 201, {
        message: "Account created successfully"
      });
      return true;
    } catch {
      sendJson(res, 500, { message: "Internal server error" });
      return true;
    }
  }
  if (url === "/api/auth/login" && req.method === "POST") {
    try {
      const body = await parseJsonBody(req);
      const { email, password, role } = body;
      if (!role || !ALLOWED_ROLES.includes(role)) {
        sendJson(res, 401, { message: "Invalid email, password, or role." });
        return true;
      }
      if (!email || !password || typeof email !== "string" || typeof password !== "string") {
        sendJson(res, 401, { message: "Invalid email, password, or role." });
        return true;
      }
      const normalizedEmail = email.toLowerCase().trim();
      const mongoReady = await connectToDatabase();
      if (mongoReady) {
        await ensureMongoSeeded();
        const user2 = await User_default.findOne({ email: normalizedEmail });
        if (!user2) {
          sendJson(res, 401, { message: "Invalid email, password, or role." });
          return true;
        }
        const isPasswordMatch2 = await bcrypt2.compare(password, user2.passwordHash);
        if (!isPasswordMatch2) {
          sendJson(res, 401, { message: "Invalid email, password, or role." });
          return true;
        }
        if (user2.role !== role) {
          sendJson(res, 401, { message: "Invalid email, password, or role." });
          return true;
        }
        const token2 = jwt.sign(
          {
            userId: user2._id.toString(),
            role: user2.role
          },
          JWT_SECRET,
          {
            expiresIn: "24h"
          }
        );
        sendJson(res, 200, {
          token: token2,
          user: {
            id: user2._id.toString(),
            name: user2.name,
            email: user2.email,
            role: user2.role
          }
        });
        return true;
      }
      const user = inMemoryUsers.get(normalizedEmail);
      if (!user) {
        sendJson(res, 401, { message: "Invalid email, password, or role." });
        return true;
      }
      const isPasswordMatch = await bcrypt2.compare(password, user.passwordHash);
      if (!isPasswordMatch) {
        sendJson(res, 401, { message: "Invalid email, password, or role." });
        return true;
      }
      if (user.role !== role) {
        sendJson(res, 401, { message: "Invalid email, password, or role." });
        return true;
      }
      const token = jwt.sign(
        {
          userId: user.id,
          role: user.role
        },
        JWT_SECRET,
        {
          expiresIn: "24h"
        }
      );
      sendJson(res, 200, {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
      return true;
    } catch {
      sendJson(res, 500, { message: "Internal server error" });
      return true;
    }
  }
  if (url === "/api/profile" && req.method === "GET") {
    try {
      const auth = await authenticate(req);
      if (!auth) {
        sendJson(res, 401, { message: "Unauthorized" });
        return true;
      }
      const mongoReady = await connectToDatabase();
      if (!mongoReady) {
        sendJson(res, 503, { message: "Database unavailable" });
        return true;
      }
      let profile = null;
      if (auth.role === "student") profile = await StudentProfile_default.findOne({ userId: auth.userId });
      else if (auth.role === "teacher") profile = await TeacherProfile_default.findOne({ userId: auth.userId });
      else if (auth.role === "admin") profile = await AdminProfile_default.findOne({ userId: auth.userId });
      if (!profile) {
        sendJson(res, 404, { message: "Profile not found" });
        return true;
      }
      sendJson(res, 200, { profile });
      return true;
    } catch (err) {
      sendJson(res, 500, { message: "Internal server error" });
      return true;
    }
  }
  if (url === "/api/profile" && req.method === "POST") {
    try {
      const auth = await authenticate(req);
      if (!auth) {
        sendJson(res, 401, { message: "Unauthorized" });
        return true;
      }
      const mongoReady = await connectToDatabase();
      if (!mongoReady) {
        sendJson(res, 503, { message: "Database unavailable" });
        return true;
      }
      const body = await parseJsonBody(req);
      let profile = null;
      if (auth.role === "student") {
        const existing = await StudentProfile_default.findOne({ userId: auth.userId });
        if (existing) {
          sendJson(res, 400, { message: "Profile already exists" });
          return true;
        }
        profile = await StudentProfile_default.create({
          userId: auth.userId,
          dob: body.dob ? new Date(body.dob) : void 0,
          consent: body.consent || false,
          profile: body.profile || {}
        });
      } else if (auth.role === "teacher") {
        const existing = await TeacherProfile_default.findOne({ userId: auth.userId });
        if (existing) {
          sendJson(res, 400, { message: "Profile already exists" });
          return true;
        }
        if (!body.employeeId) {
          sendJson(res, 400, { message: "employeeId is required for teachers" });
          return true;
        }
        profile = await TeacherProfile_default.create({
          userId: auth.userId,
          employeeId: body.employeeId
        });
      } else if (auth.role === "admin") {
        const existing = await AdminProfile_default.findOne({ userId: auth.userId });
        if (existing) {
          sendJson(res, 400, { message: "Profile already exists" });
          return true;
        }
        if (!body.employeeId) {
          sendJson(res, 400, { message: "employeeId is required for admins" });
          return true;
        }
        profile = await AdminProfile_default.create({
          userId: auth.userId,
          employeeId: body.employeeId
        });
      }
      sendJson(res, 201, { message: "Profile created", profile });
      return true;
    } catch (err) {
      if (err.code === 11e3) {
        sendJson(res, 400, { message: "Profile or unique field already exists" });
      } else {
        sendJson(res, 500, { message: "Internal server error", error: err.message });
      }
      return true;
    }
  }
  if (url === "/api/profile" && req.method === "PUT") {
    try {
      const auth = await authenticate(req);
      if (!auth) {
        sendJson(res, 401, { message: "Unauthorized" });
        return true;
      }
      const mongoReady = await connectToDatabase();
      if (!mongoReady) {
        sendJson(res, 503, { message: "Database unavailable" });
        return true;
      }
      const body = await parseJsonBody(req);
      let profile = null;
      if (auth.role === "student") {
        profile = await StudentProfile_default.findOneAndUpdate(
          { userId: auth.userId },
          { $set: body },
          { new: true, runValidators: true }
        );
      } else if (auth.role === "teacher") {
        profile = await TeacherProfile_default.findOneAndUpdate(
          { userId: auth.userId },
          { $set: body },
          { new: true, runValidators: true }
        );
      } else if (auth.role === "admin") {
        profile = await AdminProfile_default.findOneAndUpdate(
          { userId: auth.userId },
          { $set: body },
          { new: true, runValidators: true }
        );
      }
      if (!profile) {
        sendJson(res, 404, { message: "Profile not found to update" });
        return true;
      }
      sendJson(res, 200, { message: "Profile updated", profile });
      return true;
    } catch (err) {
      sendJson(res, 500, { message: "Internal server error", error: err.message });
      return true;
    }
  }
  return false;
}

// src/server/curriculumHandler.ts
init_Program();
init_Cohort();
init_Subject();
init_Module();
init_ContentItem();
init_StudentProfile();
function parseJsonBody2(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
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
    req.on("error", (err) => reject(err));
  });
}
function sendJson2(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}
async function handleCurriculumRequest(req, res) {
  const rawUrl = req.url || "";
  if (!rawUrl.startsWith("/api/curriculum")) {
    return false;
  }
  const connected = await connectToDatabase();
  if (!connected) {
    sendJson2(res, 503, { message: "Database connection unavailable" });
    return true;
  }
  const urlObj = new URL(rawUrl, "http://localhost");
  const pathname = urlObj.pathname;
  const searchParams = urlObj.searchParams;
  try {
    if (pathname.startsWith("/api/curriculum/programs")) {
      const parts = pathname.replace("/api/curriculum/programs", "").split("/").filter(Boolean);
      const programId = parts[0];
      if (req.method === "GET" && !programId) {
        const statusFilter = searchParams.get("status");
        const query = statusFilter ? { status: statusFilter } : {};
        const programs = await Program_default.find(query).populate("cohortIds").populate("subjectIds").sort({ createdAt: -1 });
        sendJson2(res, 200, { data: programs });
        return true;
      }
      if (req.method === "GET" && programId) {
        const program = await Program_default.findById(programId).populate("cohortIds").populate("subjectIds");
        if (!program) {
          sendJson2(res, 404, { message: "Program not found" });
          return true;
        }
        sendJson2(res, 200, { data: program });
        return true;
      }
      if (req.method === "POST" && !programId) {
        const body = await parseJsonBody2(req);
        const { name, description, status } = body;
        if (!name || typeof name !== "string" || !name.trim()) {
          sendJson2(res, 400, { message: "Program name is required" });
          return true;
        }
        const newProgram = await Program_default.create({
          name: name.trim(),
          description: description?.trim() || "",
          status: status || "active",
          cohortIds: [],
          subjectIds: []
        });
        sendJson2(res, 201, { message: "Program created successfully", data: newProgram });
        return true;
      }
      if (req.method === "PUT" && programId) {
        const body = await parseJsonBody2(req);
        const updated = await Program_default.findByIdAndUpdate(programId, body, {
          new: true,
          runValidators: true
        });
        if (!updated) {
          sendJson2(res, 404, { message: "Program not found" });
          return true;
        }
        sendJson2(res, 200, { message: "Program updated successfully", data: updated });
        return true;
      }
      if (req.method === "DELETE" && programId) {
        const deleted = await Program_default.findByIdAndDelete(programId);
        if (!deleted) {
          sendJson2(res, 404, { message: "Program not found" });
          return true;
        }
        sendJson2(res, 200, { message: "Program deleted successfully" });
        return true;
      }
    }
    if (pathname.startsWith("/api/curriculum/cohorts")) {
      const parts = pathname.replace("/api/curriculum/cohorts", "").split("/").filter(Boolean);
      const cohortId = parts[0];
      const action = parts[1];
      if (req.method === "POST" && cohortId && action === "assign-students") {
        const body = await parseJsonBody2(req);
        const { studentIds } = body;
        if (!Array.isArray(studentIds)) {
          sendJson2(res, 400, { message: "studentIds must be an array of Student IDs" });
          return true;
        }
        const cohort = await Cohort_default.findById(cohortId);
        if (!cohort) {
          sendJson2(res, 404, { message: "Cohort not found" });
          return true;
        }
        await StudentProfile_default.updateMany(
          { _id: { $in: studentIds } },
          { $set: { cohortId: cohort._id } }
        );
        const totalEnrolled = await StudentProfile_default.countDocuments({ cohortId: cohort._id });
        cohort.studentCount = totalEnrolled;
        await cohort.save();
        sendJson2(res, 200, {
          message: `Assigned ${studentIds.length} students to cohort ${cohort.name}`,
          data: cohort
        });
        return true;
      }
      if (req.method === "GET" && !cohortId) {
        const programIdFilter = searchParams.get("programId");
        const query = programIdFilter ? { programId: programIdFilter } : {};
        const cohorts = await Cohort_default.find(query).populate("programId").sort({ createdAt: -1 });
        sendJson2(res, 200, { data: cohorts });
        return true;
      }
      if (req.method === "GET" && cohortId) {
        const cohort = await Cohort_default.findById(cohortId).populate("programId");
        if (!cohort) {
          sendJson2(res, 404, { message: "Cohort not found" });
          return true;
        }
        sendJson2(res, 200, { data: cohort });
        return true;
      }
      if (req.method === "POST" && !cohortId) {
        const body = await parseJsonBody2(req);
        const { name, programId } = body;
        if (!name || typeof name !== "string" || !name.trim()) {
          sendJson2(res, 400, { message: "Cohort name is required" });
          return true;
        }
        if (!programId) {
          sendJson2(res, 400, { message: "programId is required" });
          return true;
        }
        const program = await Program_default.findById(programId);
        if (!program) {
          sendJson2(res, 404, { message: "Referenced program not found" });
          return true;
        }
        const newCohort = await Cohort_default.create({
          name: name.trim(),
          programId,
          studentCount: 0
        });
        program.cohortIds.push(newCohort._id);
        await program.save();
        sendJson2(res, 201, { message: "Cohort created successfully", data: newCohort });
        return true;
      }
      if (req.method === "PUT" && cohortId) {
        const body = await parseJsonBody2(req);
        const updated = await Cohort_default.findByIdAndUpdate(cohortId, body, {
          new: true,
          runValidators: true
        });
        if (!updated) {
          sendJson2(res, 404, { message: "Cohort not found" });
          return true;
        }
        sendJson2(res, 200, { message: "Cohort updated successfully", data: updated });
        return true;
      }
      if (req.method === "DELETE" && cohortId) {
        const deleted = await Cohort_default.findByIdAndDelete(cohortId);
        if (!deleted) {
          sendJson2(res, 404, { message: "Cohort not found" });
          return true;
        }
        await Program_default.findByIdAndUpdate(deleted.programId, {
          $pull: { cohortIds: deleted._id }
        });
        sendJson2(res, 200, { message: "Cohort deleted successfully" });
        return true;
      }
    }
    if (pathname.startsWith("/api/curriculum/subjects")) {
      const parts = pathname.replace("/api/curriculum/subjects", "").split("/").filter(Boolean);
      const subjectId = parts[0];
      if (req.method === "GET" && !subjectId) {
        const programIdFilter = searchParams.get("programId");
        const query = programIdFilter ? { programId: programIdFilter } : {};
        const subjects = await Subject_default.find(query).populate("programId").populate("moduleIds").sort({ createdAt: -1 });
        sendJson2(res, 200, { data: subjects });
        return true;
      }
      if (req.method === "GET" && subjectId) {
        const subject = await Subject_default.findById(subjectId).populate("programId").populate("moduleIds");
        if (!subject) {
          sendJson2(res, 404, { message: "Subject not found" });
          return true;
        }
        sendJson2(res, 200, { data: subject });
        return true;
      }
      if (req.method === "POST" && !subjectId) {
        const body = await parseJsonBody2(req);
        const { name, description, programId, status } = body;
        if (!name || typeof name !== "string" || !name.trim()) {
          sendJson2(res, 400, { message: "Subject name is required" });
          return true;
        }
        if (!programId) {
          sendJson2(res, 400, { message: "programId is required" });
          return true;
        }
        const program = await Program_default.findById(programId);
        if (!program) {
          sendJson2(res, 404, { message: "Referenced program not found" });
          return true;
        }
        const newSubject = await Subject_default.create({
          name: name.trim(),
          description: description?.trim() || "",
          programId,
          status: status || "DRAFT",
          moduleIds: []
        });
        program.subjectIds.push(newSubject._id);
        await program.save();
        sendJson2(res, 201, { message: "Subject created successfully", data: newSubject });
        return true;
      }
      if (req.method === "PUT" && subjectId) {
        const body = await parseJsonBody2(req);
        const updated = await Subject_default.findByIdAndUpdate(subjectId, body, {
          new: true,
          runValidators: true
        });
        if (!updated) {
          sendJson2(res, 404, { message: "Subject not found" });
          return true;
        }
        sendJson2(res, 200, { message: "Subject updated successfully", data: updated });
        return true;
      }
      if (req.method === "DELETE" && subjectId) {
        const deleted = await Subject_default.findByIdAndDelete(subjectId);
        if (!deleted) {
          sendJson2(res, 404, { message: "Subject not found" });
          return true;
        }
        await Program_default.findByIdAndUpdate(deleted.programId, {
          $pull: { subjectIds: deleted._id }
        });
        sendJson2(res, 200, { message: "Subject deleted successfully" });
        return true;
      }
    }
    if (pathname.startsWith("/api/curriculum/modules")) {
      const parts = pathname.replace("/api/curriculum/modules", "").split("/").filter(Boolean);
      const moduleId = parts[0];
      if (req.method === "GET" && !moduleId) {
        const subjectIdFilter = searchParams.get("subjectId");
        const query = subjectIdFilter ? { subjectId: subjectIdFilter } : {};
        const modules = await Module_default.find(query).populate("contentIds").populate("assessmentIds").sort({ order: 1 });
        sendJson2(res, 200, { data: modules });
        return true;
      }
      if (req.method === "GET" && moduleId) {
        const moduleItem = await Module_default.findById(moduleId).populate("contentIds").populate("assessmentIds");
        if (!moduleItem) {
          sendJson2(res, 404, { message: "Module not found" });
          return true;
        }
        sendJson2(res, 200, { data: moduleItem });
        return true;
      }
      if (req.method === "POST" && !moduleId) {
        const body = await parseJsonBody2(req);
        const { title, description, subjectId, order, status } = body;
        if (!title || typeof title !== "string" || !title.trim()) {
          sendJson2(res, 400, { message: "Module title is required" });
          return true;
        }
        if (!subjectId) {
          sendJson2(res, 400, { message: "subjectId is required" });
          return true;
        }
        const subject = await Subject_default.findById(subjectId);
        if (!subject) {
          sendJson2(res, 404, { message: "Referenced subject not found" });
          return true;
        }
        const moduleOrder = order ?? subject.moduleIds.length + 1;
        const newModule = await Module_default.create({
          title: title.trim(),
          description: description?.trim() || "",
          subjectId,
          order: moduleOrder,
          status: status || "DRAFT",
          contentIds: [],
          assessmentIds: []
        });
        subject.moduleIds.push(newModule._id);
        await subject.save();
        sendJson2(res, 201, { message: "Module created successfully", data: newModule });
        return true;
      }
      if (req.method === "PUT" && moduleId) {
        const body = await parseJsonBody2(req);
        const updated = await Module_default.findByIdAndUpdate(moduleId, body, {
          new: true,
          runValidators: true
        });
        if (!updated) {
          sendJson2(res, 404, { message: "Module not found" });
          return true;
        }
        sendJson2(res, 200, { message: "Module updated successfully", data: updated });
        return true;
      }
      if (req.method === "DELETE" && moduleId) {
        const deleted = await Module_default.findByIdAndDelete(moduleId);
        if (!deleted) {
          sendJson2(res, 404, { message: "Module not found" });
          return true;
        }
        await Subject_default.findByIdAndUpdate(deleted.subjectId, {
          $pull: { moduleIds: deleted._id }
        });
        sendJson2(res, 200, { message: "Module deleted successfully" });
        return true;
      }
    }
    if (pathname.startsWith("/api/curriculum/content-items")) {
      const parts = pathname.replace("/api/curriculum/content-items", "").split("/").filter(Boolean);
      const contentId = parts[0];
      if (req.method === "GET" && !contentId) {
        const moduleIdFilter = searchParams.get("moduleId");
        const query = moduleIdFilter ? { moduleId: moduleIdFilter } : {};
        const items = await ContentItem_default.find(query).sort({ createdAt: 1 });
        sendJson2(res, 200, { data: items });
        return true;
      }
      if (req.method === "GET" && contentId) {
        const item = await ContentItem_default.findById(contentId);
        if (!item) {
          sendJson2(res, 404, { message: "Content item not found" });
          return true;
        }
        sendJson2(res, 200, { data: item });
        return true;
      }
      if (req.method === "POST" && !contentId) {
        const body = await parseJsonBody2(req);
        const { title, type, description, url, duration, status, moduleId } = body;
        if (!title || typeof title !== "string" || !title.trim()) {
          sendJson2(res, 400, { message: "Content title is required" });
          return true;
        }
        if (!type || !["video", "document", "audio", "link", "text"].includes(type)) {
          sendJson2(res, 400, { message: "Valid content type (video, document, audio, link, text) is required" });
          return true;
        }
        if (!moduleId) {
          sendJson2(res, 400, { message: "moduleId is required" });
          return true;
        }
        const targetModule = await Module_default.findById(moduleId);
        if (!targetModule) {
          sendJson2(res, 404, { message: "Referenced module not found" });
          return true;
        }
        const newContent = await ContentItem_default.create({
          title: title.trim(),
          type,
          description: description?.trim() || "",
          url: url?.trim(),
          duration: typeof duration === "number" ? duration : void 0,
          status: status || "DRAFT",
          moduleId
        });
        targetModule.contentIds.push(newContent._id);
        await targetModule.save();
        sendJson2(res, 201, { message: "Content item added successfully", data: newContent });
        return true;
      }
      if (req.method === "PUT" && contentId) {
        const body = await parseJsonBody2(req);
        const updated = await ContentItem_default.findByIdAndUpdate(contentId, body, {
          new: true,
          runValidators: true
        });
        if (!updated) {
          sendJson2(res, 404, { message: "Content item not found" });
          return true;
        }
        sendJson2(res, 200, { message: "Content item updated successfully", data: updated });
        return true;
      }
      if (req.method === "DELETE" && contentId) {
        const deleted = await ContentItem_default.findByIdAndDelete(contentId);
        if (!deleted) {
          sendJson2(res, 404, { message: "Content item not found" });
          return true;
        }
        await Module_default.findByIdAndUpdate(deleted.moduleId, {
          $pull: { contentIds: deleted._id }
        });
        sendJson2(res, 200, { message: "Content item deleted successfully" });
        return true;
      }
    }
    sendJson2(res, 404, { message: "Curriculum API endpoint not found" });
    return true;
  } catch (error) {
    console.error("Curriculum handler error:", error);
    sendJson2(res, 500, { message: "Internal server error", error: error.message });
    return true;
  }
}

// src/server/evaluationHandler.ts
import jwt2 from "file:///C:/Users/pegga/OneDrive/Desktop/mock/project/node_modules/jsonwebtoken/index.js";
init_Assessment();

// src/server/models/AssessmentSubmission.ts
import mongoose14, { Schema as Schema11 } from "file:///C:/Users/pegga/OneDrive/Desktop/mock/project/node_modules/mongoose/index.js";
var AssessmentSubmissionSchema = new Schema11(
  {
    assessmentId: {
      type: Schema11.Types.ObjectId,
      ref: "Assessment",
      required: [true, "Assessment is required"]
    },
    studentId: {
      type: Schema11.Types.ObjectId,
      ref: "User",
      required: [true, "Student is required"]
    },
    answers: {
      type: Map,
      of: Schema11.Types.Mixed,
      // string or string[]
      default: /* @__PURE__ */ new Map()
    },
    score: { type: Number, required: true, min: 0 },
    percentage: { type: Number, required: true, min: 0, max: 100 },
    passed: { type: Boolean, required: true },
    feedback: { type: String, trim: true },
    status: {
      type: String,
      enum: ["submitted", "graded"],
      default: "submitted"
    },
    attemptNumber: { type: Number, default: 1, min: 1 }
  },
  { timestamps: true }
);
AssessmentSubmissionSchema.index({ assessmentId: 1, studentId: 1 });
AssessmentSubmissionSchema.index({ studentId: 1 });
var AssessmentSubmissionModel = mongoose14.models.AssessmentSubmission || mongoose14.model("AssessmentSubmission", AssessmentSubmissionSchema);
var AssessmentSubmission_default = AssessmentSubmissionModel;

// src/server/models/Assignment.ts
import mongoose15, { Schema as Schema12 } from "file:///C:/Users/pegga/OneDrive/Desktop/mock/project/node_modules/mongoose/index.js";
var AttachmentSchema = new Schema12(
  {
    name: { type: String, required: true, trim: true },
    size: { type: Number, required: true, min: 0 },
    type: { type: String, required: true, trim: true },
    url: { type: String, trim: true }
  },
  { _id: true }
);
var AssignmentSchema = new Schema12(
  {
    studentId: {
      type: Schema12.Types.ObjectId,
      ref: "User",
      required: [true, "Student is required"]
    },
    teacherId: {
      type: Schema12.Types.ObjectId,
      ref: "User",
      required: [true, "Teacher is required"]
    },
    subjectId: { type: Schema12.Types.ObjectId, ref: "Subject" },
    moduleId: { type: Schema12.Types.ObjectId, ref: "Module" },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true
    },
    instructions: { type: String, trim: true, default: "" },
    attachments: { type: [AttachmentSchema], default: [] },
    maxMarks: { type: Number, required: true, min: 0 },
    dueDate: { type: Date, required: [true, "Due date is required"] },
    status: {
      type: String,
      enum: ["NEW", "IN_PROGRESS", "SUBMITTED", "LATE", "GRADED", "OVERDUE"],
      default: "NEW"
    }
  },
  { timestamps: true }
);
AssignmentSchema.index({ studentId: 1 });
AssignmentSchema.index({ teacherId: 1 });
AssignmentSchema.index({ moduleId: 1 });
AssignmentSchema.index({ subjectId: 1 });
AssignmentSchema.index({ status: 1 });
AssignmentSchema.index({ dueDate: 1 });
var AssignmentModel = mongoose15.models.Assignment || mongoose15.model("Assignment", AssignmentSchema);
var Assignment_default = AssignmentModel;

// src/server/models/AssignmentSubmission.ts
import mongoose16, { Schema as Schema13 } from "file:///C:/Users/pegga/OneDrive/Desktop/mock/project/node_modules/mongoose/index.js";
var AssignmentSubmissionSchema = new Schema13(
  {
    assignmentId: {
      type: Schema13.Types.ObjectId,
      ref: "Assignment",
      required: [true, "Assignment is required"]
    },
    studentId: {
      type: Schema13.Types.ObjectId,
      ref: "User",
      required: [true, "Student is required"]
    },
    textResponse: { type: String, trim: true, default: "" },
    attachments: { type: [AttachmentSchema], default: [] },
    isLate: { type: Boolean, default: false },
    marks: { type: Number, min: 0 },
    feedback: { type: String, trim: true },
    gradedAt: { type: Date },
    gradedBy: { type: Schema13.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);
AssignmentSubmissionSchema.index({ assignmentId: 1, studentId: 1 }, { unique: true });
AssignmentSubmissionSchema.index({ studentId: 1 });
var AssignmentSubmissionModel = mongoose16.models.AssignmentSubmission || mongoose16.model("AssignmentSubmission", AssignmentSubmissionSchema);
var AssignmentSubmission_default = AssignmentSubmissionModel;

// src/server/models/Progress.ts
import mongoose17, { Schema as Schema14 } from "file:///C:/Users/pegga/OneDrive/Desktop/mock/project/node_modules/mongoose/index.js";
var ProgressSchema = new Schema14(
  {
    studentId: {
      type: Schema14.Types.ObjectId,
      ref: "User",
      required: [true, "Student is required"]
    },
    subjectId: {
      type: Schema14.Types.ObjectId,
      ref: "Subject",
      required: [true, "Subject is required"]
    },
    moduleId: {
      type: Schema14.Types.ObjectId,
      ref: "Module",
      required: [true, "Module is required"]
    },
    completionPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    completedContentIds: [{ type: Schema14.Types.ObjectId, ref: "ContentItem" }],
    lastAccessedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);
ProgressSchema.index({ studentId: 1, moduleId: 1 }, { unique: true });
ProgressSchema.index({ studentId: 1, subjectId: 1 });
var ProgressModel = mongoose17.models.Progress || mongoose17.model("Progress", ProgressSchema);
var Progress_default = ProgressModel;

// src/server/models/ProgressEvent.ts
import mongoose18, { Schema as Schema15 } from "file:///C:/Users/pegga/OneDrive/Desktop/mock/project/node_modules/mongoose/index.js";
var ProgressEventSchema = new Schema15(
  {
    studentId: {
      type: Schema15.Types.ObjectId,
      ref: "User",
      required: [true, "Student is required"]
    },
    type: {
      type: String,
      enum: [
        "content_completed",
        "assessment_submitted",
        "assignment_submitted",
        "login",
        "module_completed"
      ],
      required: true
    },
    description: { type: String, required: true, trim: true },
    entityId: { type: Schema15.Types.ObjectId }
  },
  { timestamps: true }
);
ProgressEventSchema.index({ studentId: 1, createdAt: -1 });
var ProgressEventModel = mongoose18.models.ProgressEvent || mongoose18.model("ProgressEvent", ProgressEventSchema);
var ProgressEvent_default = ProgressEventModel;

// src/server/models/LeaderboardScore.ts
import mongoose19, { Schema as Schema16 } from "file:///C:/Users/pegga/OneDrive/Desktop/mock/project/node_modules/mongoose/index.js";
var LeaderboardScoreSchema = new Schema16(
  {
    studentId: {
      type: Schema16.Types.ObjectId,
      ref: "User",
      required: true
    },
    programId: {
      type: Schema16.Types.ObjectId,
      ref: "Program",
      required: true
    },
    cohortId: {
      type: Schema16.Types.ObjectId,
      ref: "Cohort",
      required: true
    },
    rank: { type: Number, required: true, min: 1 },
    overallScore: { type: Number, required: true, min: 0, max: 100 },
    assessmentScore: { type: Number, required: true, min: 0, max: 100 },
    assignmentScore: { type: Number, required: true, min: 0, max: 100 },
    disciplineScore: { type: Number, required: true, min: 0, max: 100 }
  },
  { timestamps: true }
);
LeaderboardScoreSchema.index({ studentId: 1, cohortId: 1 }, { unique: true });
LeaderboardScoreSchema.index({ programId: 1, cohortId: 1, rank: 1 });
var LeaderboardScoreModel = mongoose19.models.LeaderboardScore || mongoose19.model("LeaderboardScore", LeaderboardScoreSchema);
var LeaderboardScore_default = LeaderboardScoreModel;

// src/server/evaluationHandler.ts
var JWT_SECRET2 = process.env.JWT_SECRET || "diksha-foundation-secret-key-2026";
function parseJsonBody3(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
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
    req.on("error", (err) => reject(err));
  });
}
function sendJson3(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}
function verifyToken(req) {
  const authHeader = req.headers["authorization"];
  if (!authHeader?.startsWith("Bearer ")) return null;
  const token = authHeader.slice(7);
  try {
    return jwt2.verify(token, JWT_SECRET2);
  } catch {
    return null;
  }
}
function extractSegment(url, prefix) {
  return url.slice(prefix.length).split("/")[0];
}
function autoGrade(questions, answers) {
  let score = 0;
  let needsManualGrade = false;
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const key = String(i);
    const studentAnswer = answers[key];
    if (q.type === "mcq" || q.type === "true_false") {
      if (studentAnswer !== void 0 && q.correctAnswer !== void 0 && String(studentAnswer).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase()) {
        score += q.marks;
      }
    } else if (q.type === "multiple_select") {
      const correct = Array.isArray(q.correctAnswer) ? [...q.correctAnswer].sort().join(",") : String(q.correctAnswer ?? "");
      const given = Array.isArray(studentAnswer) ? [...studentAnswer].sort().join(",") : String(studentAnswer ?? "");
      if (given === correct) {
        score += q.marks;
      }
    } else {
      needsManualGrade = true;
    }
  }
  return { score, needsManualGrade };
}
async function upsertLeaderboardAssignmentScore(studentId) {
  try {
    const subs = await AssignmentSubmission_default.find({
      studentId,
      marks: { $exists: true, $ne: null }
    }).lean();
    if (subs.length === 0) return;
    const assignmentIds = subs.map((s) => s.assignmentId);
    const assignments = await Assignment_default.find({ _id: { $in: assignmentIds } }).lean();
    const assignmentMap = new Map(assignments.map((a) => [String(a._id), a]));
    let totalPct = 0;
    let count = 0;
    let programId;
    let cohortId;
    for (const sub of subs) {
      const assignment = assignmentMap.get(String(sub.assignmentId));
      if (!assignment || !assignment.maxMarks || assignment.maxMarks === 0) continue;
      totalPct += (sub.marks ?? 0) / assignment.maxMarks * 100;
      count++;
    }
    if (count === 0) return;
    const avgPct = Math.min(100, Math.round(totalPct / count));
    await LeaderboardScore_default.updateMany(
      { studentId },
      {
        $set: { assignmentScore: avgPct },
        $setOnInsert: {
          rank: 9999,
          overallScore: avgPct,
          assessmentScore: 0,
          disciplineScore: 0
        }
      }
    );
    const StudentProfileModel2 = (await Promise.resolve().then(() => (init_StudentProfile(), StudentProfile_exports))).default;
    await StudentProfileModel2.updateOne(
      { userId: studentId },
      { $set: { assignmentAverage: avgPct } }
    );
  } catch (err) {
    console.error("LeaderboardScore upsert error:", err.message);
  }
}
async function handleEvaluationRequest(req, res) {
  const rawUrl = req.url ?? "";
  const url = rawUrl.split("?")[0];
  const method = req.method ?? "";
  if (!url.startsWith("/api/evaluation/")) return false;
  const mongoReady = await connectToDatabase();
  if (url === "/api/evaluation/assessments" && method === "POST") {
    const user = verifyToken(req);
    if (!user) {
      sendJson3(res, 401, { message: "Unauthorized" });
      return true;
    }
    if (user.role === "student") {
      sendJson3(res, 403, { message: "Forbidden: teachers/admins only" });
      return true;
    }
    if (!mongoReady) {
      sendJson3(res, 503, { message: "Database unavailable" });
      return true;
    }
    try {
      const body = await parseJsonBody3(req);
      const { moduleId, subjectId, title, description, questions, totalMarks, passScore, maxAttempts, status } = body;
      if (!title || totalMarks === void 0 || passScore === void 0) {
        sendJson3(res, 400, { message: "title, totalMarks, and passScore are required" });
        return true;
      }
      const assessment = await Assessment_default.create({
        moduleId: moduleId || void 0,
        subjectId: subjectId || void 0,
        title: title.trim(),
        description: description ?? "",
        questions: questions ?? [],
        totalMarks,
        passScore,
        maxAttempts: maxAttempts ?? 3,
        status: status ?? "DRAFT",
        createdBy: user.userId
      });
      sendJson3(res, 201, { message: "Assessment created", assessment });
    } catch (err) {
      sendJson3(res, 500, { message: err.message });
    }
    return true;
  }
  if (url.startsWith("/api/evaluation/assessments") && method === "GET") {
    const after = url.slice("/api/evaluation/assessments".length);
    if (after === "" || after === "/") {
      const user = verifyToken(req);
      if (!user) {
        sendJson3(res, 401, { message: "Unauthorized" });
        return true;
      }
      if (!mongoReady) {
        sendJson3(res, 200, { assessments: [] });
        return true;
      }
      try {
        const qs = new URLSearchParams(rawUrl.split("?")[1] ?? "");
        const filter = {};
        if (qs.get("moduleId")) filter.moduleId = qs.get("moduleId");
        if (qs.get("subjectId")) filter.subjectId = qs.get("subjectId");
        if (qs.get("status")) filter.status = qs.get("status");
        if (user.role === "student") filter.status = "PUBLISHED";
        const assessments = await Assessment_default.find(filter).sort({ createdAt: -1 }).lean();
        sendJson3(res, 200, { assessments });
      } catch (err) {
        sendJson3(res, 500, { message: err.message });
      }
      return true;
    }
    const parts = after.split("/").filter(Boolean);
    const assessmentId = parts[0];
    if (parts[1] === "submissions" && parts[2] === "mine" && method === "GET") {
      const user = verifyToken(req);
      if (!user) {
        sendJson3(res, 401, { message: "Unauthorized" });
        return true;
      }
      if (user.role !== "student") {
        sendJson3(res, 403, { message: "Forbidden: students only" });
        return true;
      }
      if (!mongoReady) {
        sendJson3(res, 200, { submissions: [] });
        return true;
      }
      try {
        const submissions = await AssessmentSubmission_default.find({
          assessmentId,
          studentId: user.userId
        }).sort({ attemptNumber: -1 }).lean();
        sendJson3(res, 200, { submissions });
      } catch (err) {
        sendJson3(res, 500, { message: err.message });
      }
      return true;
    }
    if (parts[1] === "submissions" && method === "GET") {
      const user = verifyToken(req);
      if (!user) {
        sendJson3(res, 401, { message: "Unauthorized" });
        return true;
      }
      if (user.role === "student") {
        sendJson3(res, 403, { message: "Forbidden: teachers/admins only" });
        return true;
      }
      if (!mongoReady) {
        sendJson3(res, 200, { submissions: [] });
        return true;
      }
      try {
        const submissions = await AssessmentSubmission_default.find({ assessmentId }).populate("studentId", "name email").sort({ createdAt: -1 }).lean();
        sendJson3(res, 200, { submissions });
      } catch (err) {
        sendJson3(res, 500, { message: err.message });
      }
      return true;
    }
    if (parts[1] === "submit" && method === "POST") {
      const user = verifyToken(req);
      if (!user) {
        sendJson3(res, 401, { message: "Unauthorized" });
        return true;
      }
      if (user.role !== "student") {
        sendJson3(res, 403, { message: "Forbidden: students only" });
        return true;
      }
      if (!mongoReady) {
        sendJson3(res, 503, { message: "Database unavailable" });
        return true;
      }
      try {
        const assessment = await Assessment_default.findById(assessmentId).lean();
        if (!assessment) {
          sendJson3(res, 404, { message: "Assessment not found" });
          return true;
        }
        if (assessment.status !== "PUBLISHED") {
          sendJson3(res, 400, { message: "Assessment is not published" });
          return true;
        }
        const existingAttempts = await AssessmentSubmission_default.countDocuments({
          assessmentId,
          studentId: user.userId
        });
        if (existingAttempts >= assessment.maxAttempts) {
          sendJson3(res, 400, { message: `Maximum attempts (${assessment.maxAttempts}) reached` });
          return true;
        }
        const body = await parseJsonBody3(req);
        const { answers } = body;
        if (!answers || typeof answers !== "object") {
          sendJson3(res, 400, { message: "answers object is required" });
          return true;
        }
        const { score, needsManualGrade } = autoGrade(assessment.questions, answers);
        const percentage = assessment.totalMarks > 0 ? Math.round(score / assessment.totalMarks * 100) : 0;
        const passed = !needsManualGrade && score >= assessment.passScore;
        const submission = await AssessmentSubmission_default.create({
          assessmentId,
          studentId: user.userId,
          answers,
          score,
          percentage,
          passed,
          status: needsManualGrade ? "submitted" : "graded",
          attemptNumber: existingAttempts + 1
        });
        await ProgressEvent_default.create({
          studentId: user.userId,
          type: "assessment_submitted",
          description: `Submitted assessment: ${assessment.title}`,
          entityId: assessment._id
        });
        sendJson3(res, 201, {
          message: needsManualGrade ? "Submitted. Awaiting manual grading for open-ended questions." : `Graded. Score: ${score}/${assessment.totalMarks} (${percentage}%). ${passed ? "Passed \u2713" : "Not passed \u2717"}`,
          submission
        });
      } catch (err) {
        sendJson3(res, 500, { message: err.message });
      }
      return true;
    }
    if (parts.length === 1 && method === "GET") {
      const user = verifyToken(req);
      if (!user) {
        sendJson3(res, 401, { message: "Unauthorized" });
        return true;
      }
      if (!mongoReady) {
        sendJson3(res, 503, { message: "Database unavailable" });
        return true;
      }
      try {
        const assessment = await Assessment_default.findById(assessmentId).lean();
        if (!assessment) {
          sendJson3(res, 404, { message: "Assessment not found" });
          return true;
        }
        if (user.role === "student") {
          const sanitized = {
            ...assessment,
            questions: assessment.questions.map((q) => ({
              ...q,
              correctAnswer: void 0
            }))
          };
          sendJson3(res, 200, { assessment: sanitized });
        } else {
          sendJson3(res, 200, { assessment });
        }
      } catch (err) {
        sendJson3(res, 500, { message: err.message });
      }
      return true;
    }
    if (parts.length === 1 && method === "PATCH") {
      const user = verifyToken(req);
      if (!user) {
        sendJson3(res, 401, { message: "Unauthorized" });
        return true;
      }
      if (user.role === "student") {
        sendJson3(res, 403, { message: "Forbidden: teachers/admins only" });
        return true;
      }
      if (!mongoReady) {
        sendJson3(res, 503, { message: "Database unavailable" });
        return true;
      }
      try {
        const body = await parseJsonBody3(req);
        const allowed = ["title", "description", "questions", "totalMarks", "passScore", "maxAttempts", "status"];
        const updates = {};
        for (const key of allowed) {
          if (body[key] !== void 0) updates[key] = body[key];
        }
        const assessment = await Assessment_default.findByIdAndUpdate(
          assessmentId,
          { $set: updates },
          { new: true, runValidators: true }
        ).lean();
        if (!assessment) {
          sendJson3(res, 404, { message: "Assessment not found" });
          return true;
        }
        sendJson3(res, 200, { message: "Assessment updated", assessment });
      } catch (err) {
        sendJson3(res, 500, { message: err.message });
      }
      return true;
    }
    if (parts.length === 1 && method === "DELETE") {
      const user = verifyToken(req);
      if (!user) {
        sendJson3(res, 401, { message: "Unauthorized" });
        return true;
      }
      if (user.role === "student") {
        sendJson3(res, 403, { message: "Forbidden: teachers/admins only" });
        return true;
      }
      if (!mongoReady) {
        sendJson3(res, 503, { message: "Database unavailable" });
        return true;
      }
      try {
        const assessment = await Assessment_default.findByIdAndDelete(assessmentId).lean();
        if (!assessment) {
          sendJson3(res, 404, { message: "Assessment not found" });
          return true;
        }
        sendJson3(res, 200, { message: "Assessment deleted" });
      } catch (err) {
        sendJson3(res, 500, { message: err.message });
      }
      return true;
    }
  }
  if (url.startsWith("/api/evaluation/submissions/assessment/") && url.endsWith("/grade") && method === "PATCH") {
    const user = verifyToken(req);
    if (!user) {
      sendJson3(res, 401, { message: "Unauthorized" });
      return true;
    }
    if (user.role === "student") {
      sendJson3(res, 403, { message: "Forbidden: teachers/admins only" });
      return true;
    }
    if (!mongoReady) {
      sendJson3(res, 503, { message: "Database unavailable" });
      return true;
    }
    try {
      const subId = extractSegment(url, "/api/evaluation/submissions/assessment/");
      const body = await parseJsonBody3(req);
      const { score, feedback } = body;
      if (score === void 0 || typeof score !== "number") {
        sendJson3(res, 400, { message: "score (number) is required" });
        return true;
      }
      const sub = await AssessmentSubmission_default.findById(subId);
      if (!sub) {
        sendJson3(res, 404, { message: "Submission not found" });
        return true;
      }
      const assessment = await Assessment_default.findById(sub.assessmentId).lean();
      const totalMarks = assessment?.totalMarks ?? 0;
      const passScore = assessment?.passScore ?? 0;
      const percentage = totalMarks > 0 ? Math.round(score / totalMarks * 100) : 0;
      sub.score = score;
      sub.percentage = percentage;
      sub.passed = score >= passScore;
      sub.status = "graded";
      if (feedback !== void 0) sub.feedback = feedback;
      await sub.save();
      sendJson3(res, 200, { message: "Assessment submission graded", submission: sub });
    } catch (err) {
      sendJson3(res, 500, { message: err.message });
    }
    return true;
  }
  if (url === "/api/evaluation/assignments" && method === "POST") {
    const user = verifyToken(req);
    if (!user) {
      sendJson3(res, 401, { message: "Unauthorized" });
      return true;
    }
    if (user.role === "student") {
      sendJson3(res, 403, { message: "Forbidden: teachers/admins only" });
      return true;
    }
    if (!mongoReady) {
      sendJson3(res, 503, { message: "Database unavailable" });
      return true;
    }
    try {
      const body = await parseJsonBody3(req);
      const { studentId, subjectId, moduleId, title, instructions, attachments, maxMarks, dueDate } = body;
      if (!studentId || !title || maxMarks === void 0 || !dueDate) {
        sendJson3(res, 400, { message: "studentId, title, maxMarks, and dueDate are required" });
        return true;
      }
      if (studentId === "ALL") {
        const StudentModel = (await Promise.resolve().then(() => (init_User(), User_exports))).default;
        const allStudents = await StudentModel.find({ role: "student" }).lean();
        const assignments = await Assignment_default.insertMany(
          allStudents.map((student) => ({
            studentId: student._id,
            teacherId: user.userId,
            subjectId: subjectId || void 0,
            moduleId: moduleId || void 0,
            title: title.trim(),
            instructions: instructions ?? "",
            attachments: attachments ?? [],
            maxMarks,
            dueDate: new Date(dueDate),
            status: "NEW"
          }))
        );
        sendJson3(res, 201, { message: "Assignments created for all students", assignments });
        return true;
      }
      const assignment = await Assignment_default.create({
        studentId,
        teacherId: user.userId,
        subjectId: subjectId || void 0,
        moduleId: moduleId || void 0,
        title: title.trim(),
        instructions: instructions ?? "",
        attachments: attachments ?? [],
        maxMarks,
        dueDate: new Date(dueDate),
        status: "NEW"
      });
      sendJson3(res, 201, { message: "Assignment created", assignment });
    } catch (err) {
      sendJson3(res, 500, { message: err.message });
    }
    return true;
  }
  if (url === "/api/evaluation/assignments" && method === "GET") {
    const user = verifyToken(req);
    if (!user) {
      sendJson3(res, 401, { message: "Unauthorized" });
      return true;
    }
    if (!mongoReady) {
      sendJson3(res, 200, { assignments: [] });
      return true;
    }
    try {
      const qs = new URLSearchParams(rawUrl.split("?")[1] ?? "");
      const filter = {};
      const mongoose22 = (await import("file:///C:/Users/pegga/OneDrive/Desktop/mock/project/node_modules/mongoose/index.js")).default;
      if (user.role === "student") {
        filter.studentId = mongoose22.Types.ObjectId.isValid(user.userId) ? user.userId : null;
      } else if (user.role === "teacher") {
        filter.teacherId = mongoose22.Types.ObjectId.isValid(user.userId) ? user.userId : null;
      }
      if (qs.get("studentId") && user.role !== "student") filter.studentId = qs.get("studentId");
      if (qs.get("subjectId")) filter.subjectId = qs.get("subjectId");
      if (qs.get("moduleId")) filter.moduleId = qs.get("moduleId");
      if (qs.get("status")) filter.status = qs.get("status");
      const assignments = await Assignment_default.find(filter).sort({ dueDate: 1 }).lean();
      sendJson3(res, 200, { assignments });
    } catch (err) {
      sendJson3(res, 500, { message: err.message });
    }
    return true;
  }
  if (url.startsWith("/api/evaluation/assignments/") && url !== "/api/evaluation/assignments/") {
    const after = url.slice("/api/evaluation/assignments/".length);
    const parts = after.split("/").filter(Boolean);
    const assignmentId = parts[0];
    if (parts[1] === "submit" && method === "POST") {
      const user = verifyToken(req);
      if (!user) {
        sendJson3(res, 401, { message: "Unauthorized" });
        return true;
      }
      if (user.role !== "student") {
        sendJson3(res, 403, { message: "Forbidden: students only" });
        return true;
      }
      if (!mongoReady) {
        sendJson3(res, 503, { message: "Database unavailable" });
        return true;
      }
      try {
        const assignment = await Assignment_default.findById(assignmentId);
        if (!assignment) {
          sendJson3(res, 404, { message: "Assignment not found" });
          return true;
        }
        if (String(assignment.studentId) !== user.userId) {
          sendJson3(res, 403, { message: "This assignment is not assigned to you" });
          return true;
        }
        const body = await parseJsonBody3(req);
        const { textResponse, attachments } = body;
        const isLate = /* @__PURE__ */ new Date() > new Date(assignment.dueDate);
        const existing = await AssignmentSubmission_default.findOne({
          assignmentId,
          studentId: user.userId
        });
        let submission;
        if (existing) {
          existing.textResponse = textResponse ?? existing.textResponse;
          existing.attachments = attachments ?? existing.attachments;
          existing.isLate = isLate;
          submission = await existing.save();
        } else {
          submission = await AssignmentSubmission_default.create({
            assignmentId,
            studentId: user.userId,
            textResponse: textResponse ?? "",
            attachments: attachments ?? [],
            isLate
          });
        }
        assignment.status = isLate ? "LATE" : "SUBMITTED";
        await assignment.save();
        await ProgressEvent_default.create({
          studentId: user.userId,
          type: "assignment_submitted",
          description: `Submitted assignment: ${assignment.title}${isLate ? " (late)" : ""}`,
          entityId: assignment._id
        });
        sendJson3(res, 201, {
          message: isLate ? "Assignment submitted (marked as late)" : "Assignment submitted successfully",
          submission
        });
      } catch (err) {
        sendJson3(res, 500, { message: err.message });
      }
      return true;
    }
    if (parts[1] === "submission" && method === "GET") {
      const user = verifyToken(req);
      if (!user) {
        sendJson3(res, 401, { message: "Unauthorized" });
        return true;
      }
      if (user.role === "student") {
        sendJson3(res, 403, { message: "Forbidden: teachers/admins only" });
        return true;
      }
      if (!mongoReady) {
        sendJson3(res, 503, { message: "Database unavailable" });
        return true;
      }
      try {
        const submission = await AssignmentSubmission_default.findOne({ assignmentId }).populate("studentId", "name email").lean();
        if (!submission) {
          sendJson3(res, 404, { message: "No submission found for this assignment" });
          return true;
        }
        sendJson3(res, 200, { submission });
      } catch (err) {
        sendJson3(res, 500, { message: err.message });
      }
      return true;
    }
    if (parts.length === 1 && method === "GET") {
      const user = verifyToken(req);
      if (!user) {
        sendJson3(res, 401, { message: "Unauthorized" });
        return true;
      }
      if (!mongoReady) {
        sendJson3(res, 503, { message: "Database unavailable" });
        return true;
      }
      try {
        const assignment = await Assignment_default.findById(assignmentId).lean();
        if (!assignment) {
          sendJson3(res, 404, { message: "Assignment not found" });
          return true;
        }
        if (user.role === "student" && String(assignment.studentId) !== user.userId) {
          sendJson3(res, 403, { message: "Forbidden" });
          return true;
        }
        sendJson3(res, 200, { assignment });
      } catch (err) {
        sendJson3(res, 500, { message: err.message });
      }
      return true;
    }
    if (parts.length === 1 && method === "PATCH") {
      const user = verifyToken(req);
      if (!user) {
        sendJson3(res, 401, { message: "Unauthorized" });
        return true;
      }
      if (user.role === "student") {
        sendJson3(res, 403, { message: "Forbidden: teachers/admins only" });
        return true;
      }
      if (!mongoReady) {
        sendJson3(res, 503, { message: "Database unavailable" });
        return true;
      }
      try {
        const body = await parseJsonBody3(req);
        const allowed = ["title", "instructions", "attachments", "maxMarks", "dueDate", "status", "studentId", "subjectId", "moduleId"];
        const updates = {};
        for (const key of allowed) {
          if (body[key] !== void 0) {
            updates[key] = key === "dueDate" ? new Date(body[key]) : body[key];
          }
        }
        const assignment = await Assignment_default.findByIdAndUpdate(
          assignmentId,
          { $set: updates },
          { new: true, runValidators: true }
        ).lean();
        if (!assignment) {
          sendJson3(res, 404, { message: "Assignment not found" });
          return true;
        }
        sendJson3(res, 200, { message: "Assignment updated", assignment });
      } catch (err) {
        sendJson3(res, 500, { message: err.message });
      }
      return true;
    }
    if (parts.length === 1 && method === "DELETE") {
      const user = verifyToken(req);
      if (!user) {
        sendJson3(res, 401, { message: "Unauthorized" });
        return true;
      }
      if (user.role === "student") {
        sendJson3(res, 403, { message: "Forbidden: teachers/admins only" });
        return true;
      }
      if (!mongoReady) {
        sendJson3(res, 503, { message: "Database unavailable" });
        return true;
      }
      try {
        const assignment = await Assignment_default.findByIdAndDelete(assignmentId).lean();
        if (!assignment) {
          sendJson3(res, 404, { message: "Assignment not found" });
          return true;
        }
        sendJson3(res, 200, { message: "Assignment deleted" });
      } catch (err) {
        sendJson3(res, 500, { message: err.message });
      }
      return true;
    }
  }
  if (url.startsWith("/api/evaluation/submissions/assignment/") && url.endsWith("/grade") && method === "PATCH") {
    const user = verifyToken(req);
    if (!user) {
      sendJson3(res, 401, { message: "Unauthorized" });
      return true;
    }
    if (user.role === "student") {
      sendJson3(res, 403, { message: "Forbidden: teachers/admins only" });
      return true;
    }
    if (!mongoReady) {
      sendJson3(res, 503, { message: "Database unavailable" });
      return true;
    }
    try {
      const subId = extractSegment(url, "/api/evaluation/submissions/assignment/");
      const body = await parseJsonBody3(req);
      const { marks, feedback } = body;
      if (marks === void 0 || typeof marks !== "number") {
        sendJson3(res, 400, { message: "marks (number) is required" });
        return true;
      }
      const sub = await AssignmentSubmission_default.findById(subId);
      if (!sub) {
        sendJson3(res, 404, { message: "Submission not found" });
        return true;
      }
      sub.marks = marks;
      if (feedback !== void 0) sub.feedback = feedback;
      sub.gradedAt = /* @__PURE__ */ new Date();
      sub.gradedBy = user.userId;
      await sub.save();
      await Assignment_default.findByIdAndUpdate(sub.assignmentId, { status: "GRADED" });
      upsertLeaderboardAssignmentScore(String(sub.studentId)).catch(() => {
      });
      sendJson3(res, 200, { message: "Assignment graded successfully", submission: sub });
    } catch (err) {
      sendJson3(res, 500, { message: err.message });
    }
    return true;
  }
  if (url === "/api/evaluation/progress/events" && method === "GET") {
    const user = verifyToken(req);
    if (!user) {
      sendJson3(res, 401, { message: "Unauthorized" });
      return true;
    }
    if (!mongoReady) {
      sendJson3(res, 200, { events: [] });
      return true;
    }
    try {
      const qs = new URLSearchParams(rawUrl.split("?")[1] ?? "");
      const limit = Math.min(parseInt(qs.get("limit") ?? "50", 10), 200);
      const studentId = user.role === "student" ? user.userId : qs.get("studentId") ?? user.userId;
      const events = await ProgressEvent_default.find({ studentId }).sort({ createdAt: -1 }).limit(limit).lean();
      sendJson3(res, 200, { events });
    } catch (err) {
      sendJson3(res, 500, { message: err.message });
    }
    return true;
  }
  if (url === "/api/evaluation/progress/event" && method === "POST") {
    const user = verifyToken(req);
    if (!user) {
      sendJson3(res, 401, { message: "Unauthorized" });
      return true;
    }
    if (!mongoReady) {
      sendJson3(res, 503, { message: "Database unavailable" });
      return true;
    }
    try {
      const body = await parseJsonBody3(req);
      const { type, description, entityId } = body;
      const VALID_TYPES = ["content_completed", "assessment_submitted", "assignment_submitted", "login", "module_completed"];
      if (!type || !VALID_TYPES.includes(type)) {
        sendJson3(res, 400, { message: `type must be one of: ${VALID_TYPES.join(", ")}` });
        return true;
      }
      if (!description) {
        sendJson3(res, 400, { message: "description is required" });
        return true;
      }
      const event = await ProgressEvent_default.create({
        studentId: user.userId,
        type,
        description: description.trim(),
        entityId: entityId ?? void 0
      });
      if (type === "content_completed" && entityId && body.moduleId && body.subjectId) {
        try {
          const progress = await Progress_default.findOne({
            studentId: user.userId,
            moduleId: body.moduleId
          });
          if (progress) {
            const alreadyCompleted = progress.completedContentIds.map(String).includes(String(entityId));
            if (!alreadyCompleted) {
              progress.completedContentIds.push(entityId);
              progress.lastAccessedAt = /* @__PURE__ */ new Date();
              if (body.totalItems && body.totalItems > 0) {
                progress.completionPercentage = Math.round(
                  progress.completedContentIds.length / body.totalItems * 100
                );
              }
              await progress.save();
            }
          } else {
            await Progress_default.create({
              studentId: user.userId,
              subjectId: body.subjectId,
              moduleId: body.moduleId,
              completedContentIds: [entityId],
              completionPercentage: body.totalItems ? Math.round(1 / body.totalItems * 100) : 0,
              lastAccessedAt: /* @__PURE__ */ new Date()
            });
          }
        } catch {
        }
      }
      sendJson3(res, 201, { message: "Progress event logged", event });
    } catch (err) {
      sendJson3(res, 500, { message: err.message });
    }
    return true;
  }
  if (url === "/api/evaluation/progress" && method === "GET") {
    const user = verifyToken(req);
    if (!user) {
      sendJson3(res, 401, { message: "Unauthorized" });
      return true;
    }
    if (!mongoReady) {
      sendJson3(res, 200, { progress: [] });
      return true;
    }
    try {
      const studentId = user.role === "student" ? user.userId : new URLSearchParams(rawUrl.split("?")[1] ?? "").get("studentId") ?? user.userId;
      const progress = await Progress_default.find({ studentId }).populate("subjectId", "name").populate("moduleId", "title").sort({ lastAccessedAt: -1 }).lean();
      sendJson3(res, 200, { progress });
    } catch (err) {
      sendJson3(res, 500, { message: err.message });
    }
    return true;
  }
  if (url.startsWith("/api/evaluation/progress/") && method === "GET") {
    const user = verifyToken(req);
    if (!user) {
      sendJson3(res, 401, { message: "Unauthorized" });
      return true;
    }
    if (user.role === "student") {
      sendJson3(res, 403, { message: "Forbidden: teachers/admins only" });
      return true;
    }
    if (!mongoReady) {
      sendJson3(res, 200, { progress: [] });
      return true;
    }
    try {
      const studentId = url.slice("/api/evaluation/progress/".length).split("/")[0];
      const progress = await Progress_default.find({ studentId }).populate("subjectId", "name").populate("moduleId", "title").sort({ lastAccessedAt: -1 }).lean();
      sendJson3(res, 200, { progress });
    } catch (err) {
      sendJson3(res, 500, { message: err.message });
    }
    return true;
  }
  if (url === "/api/evaluation/leaderboard/me" && method === "GET") {
    const user = verifyToken(req);
    if (!user) {
      sendJson3(res, 401, { message: "Unauthorized" });
      return true;
    }
    if (!mongoReady) {
      sendJson3(res, 200, { score: null });
      return true;
    }
    try {
      const score = await LeaderboardScore_default.findOne({ studentId: user.userId }).populate("programId", "name").populate("cohortId", "name").lean();
      sendJson3(res, 200, { score });
    } catch (err) {
      sendJson3(res, 500, { message: err.message });
    }
    return true;
  }
  if (url === "/api/evaluation/leaderboard" && method === "GET") {
    const user = verifyToken(req);
    if (!user) {
      sendJson3(res, 401, { message: "Unauthorized" });
      return true;
    }
    if (!mongoReady) {
      sendJson3(res, 200, { leaderboard: [] });
      return true;
    }
    try {
      const qs = new URLSearchParams(rawUrl.split("?")[1] ?? "");
      const filter = {};
      if (qs.get("cohortId")) filter.cohortId = qs.get("cohortId");
      if (qs.get("programId")) filter.programId = qs.get("programId");
      const leaderboard = await LeaderboardScore_default.find(filter).populate("studentId", "name email").populate("programId", "name").populate("cohortId", "name").sort({ rank: 1, overallScore: -1 }).lean();
      sendJson3(res, 200, { leaderboard });
    } catch (err) {
      sendJson3(res, 500, { message: err.message });
    }
    return true;
  }
  return false;
}

// src/server/chatHandler.ts
import jwt3 from "file:///C:/Users/pegga/OneDrive/Desktop/mock/project/node_modules/jsonwebtoken/index.js";

// src/server/models/Conversation.ts
import mongoose20, { Schema as Schema17 } from "file:///C:/Users/pegga/OneDrive/Desktop/mock/project/node_modules/mongoose/index.js";
var ConversationSchema = new Schema17(
  {
    studentId: {
      type: Schema17.Types.ObjectId,
      ref: "User",
      required: [true, "Student is required"]
    },
    teacherId: {
      type: Schema17.Types.ObjectId,
      ref: "User",
      required: [true, "Teacher is required"]
    },
    lastMessageAt: { type: Date, default: Date.now },
    unreadCount: { type: Number, default: 0, min: 0 }
  },
  { timestamps: true }
);
ConversationSchema.index({ studentId: 1, teacherId: 1 }, { unique: true });
var ConversationModel = mongoose20.models.Conversation || mongoose20.model("Conversation", ConversationSchema);
var Conversation_default = ConversationModel;

// src/server/models/Message.ts
import mongoose21, { Schema as Schema18 } from "file:///C:/Users/pegga/OneDrive/Desktop/mock/project/node_modules/mongoose/index.js";
var MessageSchema = new Schema18(
  {
    conversationId: {
      type: Schema18.Types.ObjectId,
      ref: "Conversation",
      required: [true, "Conversation is required"]
    },
    senderId: {
      type: Schema18.Types.ObjectId,
      ref: "User",
      required: [true, "Sender is required"]
    },
    senderRole: {
      type: String,
      enum: ["admin", "teacher", "student"],
      required: [true, "Sender role is required"]
    },
    text: { type: String, trim: true, default: "" },
    attachments: { type: [AttachmentSchema], default: [] },
    read: { type: Boolean, default: false },
    sentAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);
MessageSchema.index({ conversationId: 1, sentAt: 1 });
MessageSchema.index({ senderId: 1 });
var MessageModel = mongoose21.models.Message || mongoose21.model("Message", MessageSchema);
var Message_default = MessageModel;

// src/server/chatHandler.ts
init_User();
var JWT_SECRET3 = process.env.JWT_SECRET || "diksha-foundation-secret-key-2026";
function parseJsonBody4(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
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
    req.on("error", (err) => reject(err));
  });
}
function sendJson4(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}
function verifyToken2(req) {
  const authHeader = req.headers["authorization"];
  if (!authHeader?.startsWith("Bearer ")) return null;
  const token = authHeader.slice(7);
  try {
    return jwt3.verify(token, JWT_SECRET3);
  } catch {
    return null;
  }
}
async function handleChatRequest(req, res) {
  const rawUrl = req.url || "";
  if (!rawUrl.startsWith("/api/chat") && !rawUrl.startsWith("/api/users")) {
    return false;
  }
  const connected = await connectToDatabase();
  if (!connected) {
    sendJson4(res, 503, { message: "Database connection unavailable" });
    return true;
  }
  const method = req.method;
  const urlObj = new URL(rawUrl, "http://localhost");
  const pathname = urlObj.pathname;
  const searchParams = urlObj.searchParams;
  if (pathname === "/api/users" && method === "GET") {
    const user = verifyToken2(req);
    if (!user) {
      sendJson4(res, 401, { message: "Unauthorized" });
      return true;
    }
    const role = searchParams.get("role");
    const query = role ? { role } : {};
    try {
      const users = await User_default.find(query).select("-passwordHash").lean();
      sendJson4(res, 200, { data: users });
    } catch (err) {
      sendJson4(res, 500, { message: err.message });
    }
    return true;
  }
  if (pathname === "/api/chat/conversations" && method === "GET") {
    const user = verifyToken2(req);
    if (!user) {
      sendJson4(res, 401, { message: "Unauthorized" });
      return true;
    }
    try {
      const filter = user.role === "student" ? { studentId: user.userId } : { teacherId: user.userId };
      const convs = await Conversation_default.find(filter).populate("studentId", "name email avatar").populate("teacherId", "name email avatar").sort({ lastMessageAt: -1 }).lean();
      sendJson4(res, 200, { data: convs });
    } catch (err) {
      sendJson4(res, 500, { message: err.message });
    }
    return true;
  }
  if (pathname === "/api/chat/conversations" && method === "POST") {
    const user = verifyToken2(req);
    if (!user) {
      sendJson4(res, 401, { message: "Unauthorized" });
      return true;
    }
    try {
      const body = await parseJsonBody4(req);
      const { targetUserId } = body;
      if (!targetUserId) {
        sendJson4(res, 400, { message: "targetUserId is required" });
        return true;
      }
      const targetUser = await User_default.findById(targetUserId);
      if (!targetUser) {
        sendJson4(res, 404, { message: "Target user not found" });
        return true;
      }
      let studentId, teacherId;
      if (user.role === "student" && targetUser.role === "teacher") {
        studentId = user.userId;
        teacherId = targetUserId;
      } else if (user.role === "teacher" && targetUser.role === "student") {
        studentId = targetUserId;
        teacherId = user.userId;
      } else {
        sendJson4(res, 400, { message: "Conversations must be between a student and a teacher" });
        return true;
      }
      let conv = await Conversation_default.findOne({ studentId, teacherId });
      if (!conv) {
        conv = await Conversation_default.create({ studentId, teacherId });
      }
      const populatedConv = await Conversation_default.findById(conv._id).populate("studentId", "name email avatar").populate("teacherId", "name email avatar").lean();
      sendJson4(res, 200, { data: populatedConv });
    } catch (err) {
      sendJson4(res, 500, { message: err.message });
    }
    return true;
  }
  if (pathname.startsWith("/api/chat/conversations/") && pathname.split("/").length >= 5) {
    const parts = pathname.split("/");
    const convId = parts[4];
    const action = parts[5];
    if (action === "messages" && method === "GET") {
      const user = verifyToken2(req);
      if (!user) {
        sendJson4(res, 401, { message: "Unauthorized" });
        return true;
      }
      try {
        const messages = await Message_default.find({ conversationId: convId }).sort({ sentAt: 1 }).lean();
        sendJson4(res, 200, { data: messages });
      } catch (err) {
        sendJson4(res, 500, { message: err.message });
      }
      return true;
    }
    if (action === "messages" && method === "POST") {
      const user = verifyToken2(req);
      if (!user) {
        sendJson4(res, 401, { message: "Unauthorized" });
        return true;
      }
      try {
        const body = await parseJsonBody4(req);
        const { text, attachments } = body;
        const conv = await Conversation_default.findById(convId);
        if (!conv) {
          sendJson4(res, 404, { message: "Conversation not found" });
          return true;
        }
        const msg = await Message_default.create({
          conversationId: convId,
          senderId: user.userId,
          senderRole: user.role,
          text: text || "",
          attachments: attachments || [],
          sentAt: /* @__PURE__ */ new Date()
        });
        conv.lastMessageAt = msg.sentAt;
        if (user.role === "student") {
          conv.unreadCount += 1;
        } else {
          conv.unreadCount += 1;
        }
        await conv.save();
        sendJson4(res, 201, { data: msg });
      } catch (err) {
        sendJson4(res, 500, { message: err.message });
      }
      return true;
    }
    if (action === "read" && method === "PATCH") {
      const user = verifyToken2(req);
      if (!user) {
        sendJson4(res, 401, { message: "Unauthorized" });
        return true;
      }
      try {
        const conv = await Conversation_default.findById(convId);
        if (!conv) {
          sendJson4(res, 404, { message: "Conversation not found" });
          return true;
        }
        conv.unreadCount = 0;
        await conv.save();
        await Message_default.updateMany(
          { conversationId: convId, senderId: { $ne: user.userId } },
          { $set: { read: true } }
        );
        sendJson4(res, 200, { message: "Conversation marked as read" });
      } catch (err) {
        sendJson4(res, 500, { message: err.message });
      }
      return true;
    }
  }
  return false;
}

// vite.config.js
function serverApiPlugin() {
  return {
    name: "server-api-plugin",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.startsWith("/api/auth/") || req.url?.startsWith("/api/profile")) {
          try {
            const handled = await handleAuthRequest(req, res);
            if (handled) return;
          } catch (err) {
            console.error("Auth middleware error:", err);
          }
        }
        if (req.url?.startsWith("/api/curriculum")) {
          try {
            const handled = await handleCurriculumRequest(req, res);
            if (handled) return;
          } catch (err) {
            console.error("Curriculum middleware error:", err);
          }
        }
        if (req.url?.startsWith("/api/chat") || req.url?.startsWith("/api/users")) {
          try {
            const handled = await handleChatRequest(req, res);
            if (handled) return;
          } catch (err) {
            console.error("Chat middleware error:", err);
          }
        }
        next();
      });
    }
  };
}
function evaluationApiPlugin() {
  return {
    name: "evaluation-api-plugin",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.startsWith("/api/evaluation/")) {
          try {
            const handled = await handleEvaluationRequest(req, res);
            if (handled) return;
          } catch (err) {
            console.error("Evaluation middleware error:", err);
          }
        }
        next();
      });
    }
  };
}
var vite_config_default = defineConfig({
  plugins: [react(), serverApiPlugin(), evaluationApiPlugin()],
  server: {
    port: 5173,
    host: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL3NlcnZlci9tb2RlbHMvVXNlci50cyIsICJzcmMvc2VydmVyL21vZGVscy9Qcm9ncmFtLnRzIiwgInNyYy9zZXJ2ZXIvbW9kZWxzL0NvaG9ydC50cyIsICJzcmMvc2VydmVyL21vZGVscy9TdWJqZWN0LnRzIiwgInNyYy9zZXJ2ZXIvbW9kZWxzL01vZHVsZS50cyIsICJzcmMvc2VydmVyL21vZGVscy9Db250ZW50SXRlbS50cyIsICJzcmMvc2VydmVyL21vZGVscy9Bc3Nlc3NtZW50LnRzIiwgInNyYy9zZXJ2ZXIvbW9kZWxzL1N0dWRlbnRQcm9maWxlLnRzIiwgInNyYy9zZXJ2ZXIvbW9kZWxzL1RlYWNoZXJQcm9maWxlLnRzIiwgInNyYy9zZXJ2ZXIvbW9kZWxzL0FkbWluUHJvZmlsZS50cyIsICJzcmMvc2VydmVyL3NlZWREYXRhYmFzZS50cyIsICJ2aXRlLmNvbmZpZy5qcyIsICJzcmMvc2VydmVyL2F1dGhIYW5kbGVyLnRzIiwgInNyYy9zZXJ2ZXIvZGIudHMiLCAic3JjL3NlcnZlci9jdXJyaWN1bHVtSGFuZGxlci50cyIsICJzcmMvc2VydmVyL2V2YWx1YXRpb25IYW5kbGVyLnRzIiwgInNyYy9zZXJ2ZXIvbW9kZWxzL0Fzc2Vzc21lbnRTdWJtaXNzaW9uLnRzIiwgInNyYy9zZXJ2ZXIvbW9kZWxzL0Fzc2lnbm1lbnQudHMiLCAic3JjL3NlcnZlci9tb2RlbHMvQXNzaWdubWVudFN1Ym1pc3Npb24udHMiLCAic3JjL3NlcnZlci9tb2RlbHMvUHJvZ3Jlc3MudHMiLCAic3JjL3NlcnZlci9tb2RlbHMvUHJvZ3Jlc3NFdmVudC50cyIsICJzcmMvc2VydmVyL21vZGVscy9MZWFkZXJib2FyZFNjb3JlLnRzIiwgInNyYy9zZXJ2ZXIvY2hhdEhhbmRsZXIudHMiLCAic3JjL3NlcnZlci9tb2RlbHMvQ29udmVyc2F0aW9uLnRzIiwgInNyYy9zZXJ2ZXIvbW9kZWxzL01lc3NhZ2UudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwZWdnYVxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXG1vY2tcXFxccHJvamVjdFxcXFxzcmNcXFxcc2VydmVyXFxcXG1vZGVsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxccGVnZ2FcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxtb2NrXFxcXHByb2plY3RcXFxcc3JjXFxcXHNlcnZlclxcXFxtb2RlbHNcXFxcVXNlci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvcGVnZ2EvT25lRHJpdmUvRGVza3RvcC9tb2NrL3Byb2plY3Qvc3JjL3NlcnZlci9tb2RlbHMvVXNlci50c1wiO2ltcG9ydCBtb25nb29zZSwgeyBTY2hlbWEsIERvY3VtZW50LCBNb2RlbCB9IGZyb20gJ21vbmdvb3NlJztcclxuXHJcbmV4cG9ydCB0eXBlIFVzZXJSb2xlID0gJ2FkbWluJyB8ICd0ZWFjaGVyJyB8ICdzdHVkZW50JztcclxuZXhwb3J0IHR5cGUgVXNlclN0YXR1cyA9ICdQRU5ESU5HX1ZFUklGSUNBVElPTicgfCAnQUNUSVZFJyB8ICdSRUpFQ1RFRCcgfCAnSU5BQ1RJVkUnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVXNlciB7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIGVtYWlsOiBzdHJpbmc7XHJcbiAgcGFzc3dvcmRIYXNoOiBzdHJpbmc7XHJcbiAgcm9sZTogVXNlclJvbGU7XHJcbiAgc3RhdHVzOiBVc2VyU3RhdHVzO1xyXG4gIHBob25lPzogc3RyaW5nO1xyXG4gIGF2YXRhcj86IHN0cmluZztcclxuICBsYXN0TG9naW4/OiBEYXRlO1xyXG4gIGNyZWF0ZWRBdD86IERhdGU7XHJcbiAgdXBkYXRlZEF0PzogRGF0ZTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVXNlckRvY3VtZW50IGV4dGVuZHMgSVVzZXIsIERvY3VtZW50IHt9XHJcblxyXG5jb25zdCBVc2VyU2NoZW1hID0gbmV3IFNjaGVtYTxJVXNlckRvY3VtZW50PihcclxuICB7XHJcbiAgICBuYW1lOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgcmVxdWlyZWQ6IFt0cnVlLCAnTmFtZSBpcyByZXF1aXJlZCddLFxyXG4gICAgICB0cmltOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIGVtYWlsOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgcmVxdWlyZWQ6IFt0cnVlLCAnRW1haWwgaXMgcmVxdWlyZWQnXSxcclxuICAgICAgdW5pcXVlOiB0cnVlLFxyXG4gICAgICBsb3dlcmNhc2U6IHRydWUsXHJcbiAgICAgIHRyaW06IHRydWUsXHJcbiAgICB9LFxyXG4gICAgcGFzc3dvcmRIYXNoOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgcmVxdWlyZWQ6IFt0cnVlLCAnUGFzc3dvcmQgaGFzaCBpcyByZXF1aXJlZCddLFxyXG4gICAgfSxcclxuICAgIHJvbGU6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICBlbnVtOiB7XHJcbiAgICAgICAgdmFsdWVzOiBbJ2FkbWluJywgJ3RlYWNoZXInLCAnc3R1ZGVudCddLFxyXG4gICAgICAgIG1lc3NhZ2U6ICd7VkFMVUV9IGlzIG5vdCBhIHZhbGlkIHJvbGUnLFxyXG4gICAgICB9LFxyXG4gICAgICByZXF1aXJlZDogW3RydWUsICdSb2xlIGlzIHJlcXVpcmVkJ10sXHJcbiAgICB9LFxyXG4gICAgc3RhdHVzOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgZW51bTogWydQRU5ESU5HX1ZFUklGSUNBVElPTicsICdBQ1RJVkUnLCAnUkVKRUNURUQnLCAnSU5BQ1RJVkUnXSxcclxuICAgICAgZGVmYXVsdDogJ1BFTkRJTkdfVkVSSUZJQ0FUSU9OJyxcclxuICAgIH0sXHJcbiAgICBwaG9uZTogeyB0eXBlOiBTdHJpbmcsIHRyaW06IHRydWUgfSxcclxuICAgIGF2YXRhcjogeyB0eXBlOiBTdHJpbmcsIHRyaW06IHRydWUgfSxcclxuICAgIGxhc3RMb2dpbjogeyB0eXBlOiBEYXRlIH0sXHJcbiAgfSxcclxuICB7XHJcbiAgICB0aW1lc3RhbXBzOiB0cnVlLFxyXG4gIH1cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBVc2VyTW9kZWw6IE1vZGVsPElVc2VyRG9jdW1lbnQ+ID1cclxuICBtb25nb29zZS5tb2RlbHMuVXNlciB8fCBtb25nb29zZS5tb2RlbDxJVXNlckRvY3VtZW50PignVXNlcicsIFVzZXJTY2hlbWEpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVXNlck1vZGVsO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHBlZ2dhXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcbW9ja1xcXFxwcm9qZWN0XFxcXHNyY1xcXFxzZXJ2ZXJcXFxcbW9kZWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwZWdnYVxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXG1vY2tcXFxccHJvamVjdFxcXFxzcmNcXFxcc2VydmVyXFxcXG1vZGVsc1xcXFxQcm9ncmFtLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9wZWdnYS9PbmVEcml2ZS9EZXNrdG9wL21vY2svcHJvamVjdC9zcmMvc2VydmVyL21vZGVscy9Qcm9ncmFtLnRzXCI7aW1wb3J0IG1vbmdvb3NlLCB7IFNjaGVtYSwgRG9jdW1lbnQsIE1vZGVsLCBUeXBlcyB9IGZyb20gJ21vbmdvb3NlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVByb2dyYW0ge1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGNvaG9ydElkczogVHlwZXMuT2JqZWN0SWRbXTtcclxuICBzdWJqZWN0SWRzOiBUeXBlcy5PYmplY3RJZFtdO1xyXG4gIHN0YXR1czogJ2FjdGl2ZScgfCAnaW5hY3RpdmUnO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElQcm9ncmFtRG9jdW1lbnQgZXh0ZW5kcyBJUHJvZ3JhbSwgRG9jdW1lbnQge31cclxuXHJcbmNvbnN0IFByb2dyYW1TY2hlbWEgPSBuZXcgU2NoZW1hPElQcm9ncmFtRG9jdW1lbnQ+KFxyXG4gIHtcclxuICAgIG5hbWU6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICByZXF1aXJlZDogW3RydWUsICdQcm9ncmFtIG5hbWUgaXMgcmVxdWlyZWQnXSxcclxuICAgICAgdHJpbTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBkZXNjcmlwdGlvbjogeyB0eXBlOiBTdHJpbmcsIHRyaW06IHRydWUsIGRlZmF1bHQ6ICcnIH0sXHJcbiAgICBjb2hvcnRJZHM6IFt7IHR5cGU6IFNjaGVtYS5UeXBlcy5PYmplY3RJZCwgcmVmOiAnQ29ob3J0JyB9XSxcclxuICAgIHN1YmplY3RJZHM6IFt7IHR5cGU6IFNjaGVtYS5UeXBlcy5PYmplY3RJZCwgcmVmOiAnU3ViamVjdCcgfV0sXHJcbiAgICBzdGF0dXM6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICBlbnVtOiBbJ2FjdGl2ZScsICdpbmFjdGl2ZSddLFxyXG4gICAgICBkZWZhdWx0OiAnYWN0aXZlJyxcclxuICAgIH0sXHJcbiAgfSxcclxuICB7IHRpbWVzdGFtcHM6IHRydWUgfVxyXG4pO1xyXG5cclxuZXhwb3J0IGNvbnN0IFByb2dyYW1Nb2RlbDogTW9kZWw8SVByb2dyYW1Eb2N1bWVudD4gPVxyXG4gIG1vbmdvb3NlLm1vZGVscy5Qcm9ncmFtIHx8XHJcbiAgbW9uZ29vc2UubW9kZWw8SVByb2dyYW1Eb2N1bWVudD4oJ1Byb2dyYW0nLCBQcm9ncmFtU2NoZW1hKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb2dyYW1Nb2RlbDtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwZWdnYVxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXG1vY2tcXFxccHJvamVjdFxcXFxzcmNcXFxcc2VydmVyXFxcXG1vZGVsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxccGVnZ2FcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxtb2NrXFxcXHByb2plY3RcXFxcc3JjXFxcXHNlcnZlclxcXFxtb2RlbHNcXFxcQ29ob3J0LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9wZWdnYS9PbmVEcml2ZS9EZXNrdG9wL21vY2svcHJvamVjdC9zcmMvc2VydmVyL21vZGVscy9Db2hvcnQudHNcIjtpbXBvcnQgbW9uZ29vc2UsIHsgU2NoZW1hLCBEb2N1bWVudCwgTW9kZWwsIFR5cGVzIH0gZnJvbSAnbW9uZ29vc2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQ29ob3J0IHtcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgcHJvZ3JhbUlkOiBUeXBlcy5PYmplY3RJZDtcclxuICBzdHVkZW50Q291bnQ6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQ29ob3J0RG9jdW1lbnQgZXh0ZW5kcyBJQ29ob3J0LCBEb2N1bWVudCB7fVxyXG5cclxuY29uc3QgQ29ob3J0U2NoZW1hID0gbmV3IFNjaGVtYTxJQ29ob3J0RG9jdW1lbnQ+KFxyXG4gIHtcclxuICAgIG5hbWU6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICByZXF1aXJlZDogW3RydWUsICdDb2hvcnQgbmFtZSBpcyByZXF1aXJlZCddLFxyXG4gICAgICB0cmltOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIHByb2dyYW1JZDoge1xyXG4gICAgICB0eXBlOiBTY2hlbWEuVHlwZXMuT2JqZWN0SWQsXHJcbiAgICAgIHJlZjogJ1Byb2dyYW0nLFxyXG4gICAgICByZXF1aXJlZDogW3RydWUsICdQcm9ncmFtIGlzIHJlcXVpcmVkJ10sXHJcbiAgICB9LFxyXG4gICAgc3R1ZGVudENvdW50OiB7IHR5cGU6IE51bWJlciwgZGVmYXVsdDogMCwgbWluOiAwIH0sXHJcbiAgfSxcclxuICB7IHRpbWVzdGFtcHM6IHRydWUgfVxyXG4pO1xyXG5cclxuQ29ob3J0U2NoZW1hLmluZGV4KHsgcHJvZ3JhbUlkOiAxIH0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IENvaG9ydE1vZGVsOiBNb2RlbDxJQ29ob3J0RG9jdW1lbnQ+ID1cclxuICBtb25nb29zZS5tb2RlbHMuQ29ob3J0IHx8XHJcbiAgbW9uZ29vc2UubW9kZWw8SUNvaG9ydERvY3VtZW50PignQ29ob3J0JywgQ29ob3J0U2NoZW1hKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvaG9ydE1vZGVsO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHBlZ2dhXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcbW9ja1xcXFxwcm9qZWN0XFxcXHNyY1xcXFxzZXJ2ZXJcXFxcbW9kZWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwZWdnYVxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXG1vY2tcXFxccHJvamVjdFxcXFxzcmNcXFxcc2VydmVyXFxcXG1vZGVsc1xcXFxTdWJqZWN0LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9wZWdnYS9PbmVEcml2ZS9EZXNrdG9wL21vY2svcHJvamVjdC9zcmMvc2VydmVyL21vZGVscy9TdWJqZWN0LnRzXCI7aW1wb3J0IG1vbmdvb3NlLCB7IFNjaGVtYSwgRG9jdW1lbnQsIE1vZGVsLCBUeXBlcyB9IGZyb20gJ21vbmdvb3NlJztcclxuXHJcbmV4cG9ydCB0eXBlIENvbnRlbnRTdGF0dXMgPSAnRFJBRlQnIHwgJ1BVQkxJU0hFRCcgfCAnQVJDSElWRUQnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU3ViamVjdCB7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgcHJvZ3JhbUlkOiBUeXBlcy5PYmplY3RJZDtcclxuICBzdGF0dXM6IENvbnRlbnRTdGF0dXM7XHJcbiAgbW9kdWxlSWRzOiBUeXBlcy5PYmplY3RJZFtdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTdWJqZWN0RG9jdW1lbnQgZXh0ZW5kcyBJU3ViamVjdCwgRG9jdW1lbnQge31cclxuXHJcbmNvbnN0IFN1YmplY3RTY2hlbWEgPSBuZXcgU2NoZW1hPElTdWJqZWN0RG9jdW1lbnQ+KFxyXG4gIHtcclxuICAgIG5hbWU6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICByZXF1aXJlZDogW3RydWUsICdTdWJqZWN0IG5hbWUgaXMgcmVxdWlyZWQnXSxcclxuICAgICAgdHJpbTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBkZXNjcmlwdGlvbjogeyB0eXBlOiBTdHJpbmcsIHRyaW06IHRydWUsIGRlZmF1bHQ6ICcnIH0sXHJcbiAgICBwcm9ncmFtSWQ6IHtcclxuICAgICAgdHlwZTogU2NoZW1hLlR5cGVzLk9iamVjdElkLFxyXG4gICAgICByZWY6ICdQcm9ncmFtJyxcclxuICAgICAgcmVxdWlyZWQ6IFt0cnVlLCAnUHJvZ3JhbSBpcyByZXF1aXJlZCddLFxyXG4gICAgfSxcclxuICAgIHN0YXR1czoge1xyXG4gICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgIGVudW06IFsnRFJBRlQnLCAnUFVCTElTSEVEJywgJ0FSQ0hJVkVEJ10sXHJcbiAgICAgIGRlZmF1bHQ6ICdEUkFGVCcsXHJcbiAgICB9LFxyXG4gICAgbW9kdWxlSWRzOiBbeyB0eXBlOiBTY2hlbWEuVHlwZXMuT2JqZWN0SWQsIHJlZjogJ01vZHVsZScgfV0sXHJcbiAgfSxcclxuICB7IHRpbWVzdGFtcHM6IHRydWUgfVxyXG4pO1xyXG5cclxuU3ViamVjdFNjaGVtYS5pbmRleCh7IHByb2dyYW1JZDogMSB9KTtcclxuU3ViamVjdFNjaGVtYS5pbmRleCh7IHN0YXR1czogMSB9KTtcclxuXHJcbmV4cG9ydCBjb25zdCBTdWJqZWN0TW9kZWw6IE1vZGVsPElTdWJqZWN0RG9jdW1lbnQ+ID1cclxuICBtb25nb29zZS5tb2RlbHMuU3ViamVjdCB8fFxyXG4gIG1vbmdvb3NlLm1vZGVsPElTdWJqZWN0RG9jdW1lbnQ+KCdTdWJqZWN0JywgU3ViamVjdFNjaGVtYSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdWJqZWN0TW9kZWw7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxccGVnZ2FcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxtb2NrXFxcXHByb2plY3RcXFxcc3JjXFxcXHNlcnZlclxcXFxtb2RlbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHBlZ2dhXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcbW9ja1xcXFxwcm9qZWN0XFxcXHNyY1xcXFxzZXJ2ZXJcXFxcbW9kZWxzXFxcXE1vZHVsZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvcGVnZ2EvT25lRHJpdmUvRGVza3RvcC9tb2NrL3Byb2plY3Qvc3JjL3NlcnZlci9tb2RlbHMvTW9kdWxlLnRzXCI7aW1wb3J0IG1vbmdvb3NlLCB7IFNjaGVtYSwgRG9jdW1lbnQsIE1vZGVsLCBUeXBlcyB9IGZyb20gJ21vbmdvb3NlJztcclxuaW1wb3J0IHR5cGUgeyBDb250ZW50U3RhdHVzIH0gZnJvbSAnLi9TdWJqZWN0JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU1vZHVsZSB7XHJcbiAgc3ViamVjdElkOiBUeXBlcy5PYmplY3RJZDtcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgb3JkZXI6IG51bWJlcjtcclxuICBzdGF0dXM6IENvbnRlbnRTdGF0dXM7XHJcbiAgY29udGVudElkczogVHlwZXMuT2JqZWN0SWRbXTtcclxuICBhc3Nlc3NtZW50SWRzOiBUeXBlcy5PYmplY3RJZFtdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElNb2R1bGVEb2N1bWVudCBleHRlbmRzIElNb2R1bGUsIERvY3VtZW50IHt9XHJcblxyXG5jb25zdCBNb2R1bGVTY2hlbWEgPSBuZXcgU2NoZW1hPElNb2R1bGVEb2N1bWVudD4oXHJcbiAge1xyXG4gICAgc3ViamVjdElkOiB7XHJcbiAgICAgIHR5cGU6IFNjaGVtYS5UeXBlcy5PYmplY3RJZCxcclxuICAgICAgcmVmOiAnU3ViamVjdCcsXHJcbiAgICAgIHJlcXVpcmVkOiBbdHJ1ZSwgJ1N1YmplY3QgaXMgcmVxdWlyZWQnXSxcclxuICAgIH0sXHJcbiAgICB0aXRsZToge1xyXG4gICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgIHJlcXVpcmVkOiBbdHJ1ZSwgJ01vZHVsZSB0aXRsZSBpcyByZXF1aXJlZCddLFxyXG4gICAgICB0cmltOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIGRlc2NyaXB0aW9uOiB7IHR5cGU6IFN0cmluZywgdHJpbTogdHJ1ZSwgZGVmYXVsdDogJycgfSxcclxuICAgIG9yZGVyOiB7IHR5cGU6IE51bWJlciwgcmVxdWlyZWQ6IHRydWUsIG1pbjogMSB9LFxyXG4gICAgc3RhdHVzOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgZW51bTogWydEUkFGVCcsICdQVUJMSVNIRUQnLCAnQVJDSElWRUQnXSxcclxuICAgICAgZGVmYXVsdDogJ0RSQUZUJyxcclxuICAgIH0sXHJcbiAgICBjb250ZW50SWRzOiBbeyB0eXBlOiBTY2hlbWEuVHlwZXMuT2JqZWN0SWQsIHJlZjogJ0NvbnRlbnRJdGVtJyB9XSxcclxuICAgIGFzc2Vzc21lbnRJZHM6IFt7IHR5cGU6IFNjaGVtYS5UeXBlcy5PYmplY3RJZCwgcmVmOiAnQXNzZXNzbWVudCcgfV0sXHJcbiAgfSxcclxuICB7IHRpbWVzdGFtcHM6IHRydWUgfVxyXG4pO1xyXG5cclxuTW9kdWxlU2NoZW1hLmluZGV4KHsgc3ViamVjdElkOiAxLCBvcmRlcjogMSB9KTtcclxuTW9kdWxlU2NoZW1hLmluZGV4KHsgc3RhdHVzOiAxIH0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IE1vZHVsZU1vZGVsOiBNb2RlbDxJTW9kdWxlRG9jdW1lbnQ+ID1cclxuICBtb25nb29zZS5tb2RlbHMuTW9kdWxlIHx8XHJcbiAgbW9uZ29vc2UubW9kZWw8SU1vZHVsZURvY3VtZW50PignTW9kdWxlJywgTW9kdWxlU2NoZW1hKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vZHVsZU1vZGVsO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHBlZ2dhXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcbW9ja1xcXFxwcm9qZWN0XFxcXHNyY1xcXFxzZXJ2ZXJcXFxcbW9kZWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwZWdnYVxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXG1vY2tcXFxccHJvamVjdFxcXFxzcmNcXFxcc2VydmVyXFxcXG1vZGVsc1xcXFxDb250ZW50SXRlbS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvcGVnZ2EvT25lRHJpdmUvRGVza3RvcC9tb2NrL3Byb2plY3Qvc3JjL3NlcnZlci9tb2RlbHMvQ29udGVudEl0ZW0udHNcIjtpbXBvcnQgbW9uZ29vc2UsIHsgU2NoZW1hLCBEb2N1bWVudCwgTW9kZWwsIFR5cGVzIH0gZnJvbSAnbW9uZ29vc2UnO1xyXG5pbXBvcnQgdHlwZSB7IENvbnRlbnRTdGF0dXMgfSBmcm9tICcuL1N1YmplY3QnO1xyXG5cclxuZXhwb3J0IHR5cGUgQ29udGVudFR5cGUgPSAndmlkZW8nIHwgJ2RvY3VtZW50JyB8ICdhdWRpbycgfCAnbGluaycgfCAndGV4dCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElDb250ZW50SXRlbSB7XHJcbiAgbW9kdWxlSWQ6IFR5cGVzLk9iamVjdElkO1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgdHlwZTogQ29udGVudFR5cGU7XHJcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICB1cmw/OiBzdHJpbmc7XHJcbiAgZHVyYXRpb24/OiBudW1iZXI7IC8vIHNlY29uZHNcclxuICBzdGF0dXM6IENvbnRlbnRTdGF0dXM7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNvbnRlbnRJdGVtRG9jdW1lbnQgZXh0ZW5kcyBJQ29udGVudEl0ZW0sIERvY3VtZW50IHt9XHJcblxyXG5jb25zdCBDb250ZW50SXRlbVNjaGVtYSA9IG5ldyBTY2hlbWE8SUNvbnRlbnRJdGVtRG9jdW1lbnQ+KFxyXG4gIHtcclxuICAgIG1vZHVsZUlkOiB7XHJcbiAgICAgIHR5cGU6IFNjaGVtYS5UeXBlcy5PYmplY3RJZCxcclxuICAgICAgcmVmOiAnTW9kdWxlJyxcclxuICAgICAgcmVxdWlyZWQ6IFt0cnVlLCAnTW9kdWxlIGlzIHJlcXVpcmVkJ10sXHJcbiAgICB9LFxyXG4gICAgdGl0bGU6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICByZXF1aXJlZDogW3RydWUsICdUaXRsZSBpcyByZXF1aXJlZCddLFxyXG4gICAgICB0cmltOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIHR5cGU6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICBlbnVtOiBbJ3ZpZGVvJywgJ2RvY3VtZW50JywgJ2F1ZGlvJywgJ2xpbmsnLCAndGV4dCddLFxyXG4gICAgICByZXF1aXJlZDogW3RydWUsICdDb250ZW50IHR5cGUgaXMgcmVxdWlyZWQnXSxcclxuICAgIH0sXHJcbiAgICBkZXNjcmlwdGlvbjogeyB0eXBlOiBTdHJpbmcsIHRyaW06IHRydWUsIGRlZmF1bHQ6ICcnIH0sXHJcbiAgICB1cmw6IHsgdHlwZTogU3RyaW5nLCB0cmltOiB0cnVlIH0sXHJcbiAgICBkdXJhdGlvbjogeyB0eXBlOiBOdW1iZXIsIG1pbjogMCB9LCAvLyBzZWNvbmRzXHJcbiAgICBzdGF0dXM6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICBlbnVtOiBbJ0RSQUZUJywgJ1BVQkxJU0hFRCcsICdBUkNISVZFRCddLFxyXG4gICAgICBkZWZhdWx0OiAnRFJBRlQnLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHsgdGltZXN0YW1wczogdHJ1ZSB9XHJcbik7XHJcblxyXG5Db250ZW50SXRlbVNjaGVtYS5pbmRleCh7IG1vZHVsZUlkOiAxIH0pO1xyXG5Db250ZW50SXRlbVNjaGVtYS5pbmRleCh7IHN0YXR1czogMSB9KTtcclxuXHJcbmV4cG9ydCBjb25zdCBDb250ZW50SXRlbU1vZGVsOiBNb2RlbDxJQ29udGVudEl0ZW1Eb2N1bWVudD4gPVxyXG4gIG1vbmdvb3NlLm1vZGVscy5Db250ZW50SXRlbSB8fFxyXG4gIG1vbmdvb3NlLm1vZGVsPElDb250ZW50SXRlbURvY3VtZW50PignQ29udGVudEl0ZW0nLCBDb250ZW50SXRlbVNjaGVtYSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb250ZW50SXRlbU1vZGVsO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHBlZ2dhXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcbW9ja1xcXFxwcm9qZWN0XFxcXHNyY1xcXFxzZXJ2ZXJcXFxcbW9kZWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwZWdnYVxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXG1vY2tcXFxccHJvamVjdFxcXFxzcmNcXFxcc2VydmVyXFxcXG1vZGVsc1xcXFxBc3Nlc3NtZW50LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9wZWdnYS9PbmVEcml2ZS9EZXNrdG9wL21vY2svcHJvamVjdC9zcmMvc2VydmVyL21vZGVscy9Bc3Nlc3NtZW50LnRzXCI7aW1wb3J0IG1vbmdvb3NlLCB7IFNjaGVtYSwgRG9jdW1lbnQsIE1vZGVsLCBUeXBlcyB9IGZyb20gJ21vbmdvb3NlJztcclxuaW1wb3J0IHR5cGUgeyBDb250ZW50U3RhdHVzIH0gZnJvbSAnLi9TdWJqZWN0JztcclxuXHJcbmV4cG9ydCB0eXBlIFF1ZXN0aW9uVHlwZSA9XHJcbiAgfCAnbWNxJ1xyXG4gIHwgJ211bHRpcGxlX3NlbGVjdCdcclxuICB8ICd0cnVlX2ZhbHNlJ1xyXG4gIHwgJ3Nob3J0X2Fuc3dlcidcclxuICB8ICdhdWRpb19yZXNwb25zZSdcclxuICB8ICd2aWRlb19yZXNwb25zZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElRdWVzdGlvbiB7XHJcbiAgdHlwZTogUXVlc3Rpb25UeXBlO1xyXG4gIHF1ZXN0aW9uOiBzdHJpbmc7XHJcbiAgb3B0aW9ucz86IHN0cmluZ1tdO1xyXG4gIGNvcnJlY3RBbnN3ZXI/OiBzdHJpbmcgfCBzdHJpbmdbXTtcclxuICBtYXJrczogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElBc3Nlc3NtZW50IHtcclxuICBtb2R1bGVJZD86IFR5cGVzLk9iamVjdElkO1xyXG4gIHN1YmplY3RJZD86IFR5cGVzLk9iamVjdElkO1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBxdWVzdGlvbnM6IElRdWVzdGlvbltdO1xyXG4gIHRvdGFsTWFya3M6IG51bWJlcjtcclxuICBwYXNzU2NvcmU6IG51bWJlcjtcclxuICBtYXhBdHRlbXB0czogbnVtYmVyO1xyXG4gIHN0YXR1czogQ29udGVudFN0YXR1cztcclxuICBjcmVhdGVkQnk/OiBUeXBlcy5PYmplY3RJZDsgLy8gdGVhY2hlciB1c2VySWRcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQXNzZXNzbWVudERvY3VtZW50IGV4dGVuZHMgSUFzc2Vzc21lbnQsIERvY3VtZW50IHt9XHJcblxyXG5jb25zdCBRdWVzdGlvblNjaGVtYSA9IG5ldyBTY2hlbWE8SVF1ZXN0aW9uPihcclxuICB7XHJcbiAgICB0eXBlOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgZW51bTogWydtY3EnLCAnbXVsdGlwbGVfc2VsZWN0JywgJ3RydWVfZmFsc2UnLCAnc2hvcnRfYW5zd2VyJywgJ2F1ZGlvX3Jlc3BvbnNlJywgJ3ZpZGVvX3Jlc3BvbnNlJ10sXHJcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIHF1ZXN0aW9uOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUsIHRyaW06IHRydWUgfSxcclxuICAgIG9wdGlvbnM6IFt7IHR5cGU6IFN0cmluZyB9XSxcclxuICAgIGNvcnJlY3RBbnN3ZXI6IHsgdHlwZTogU2NoZW1hLlR5cGVzLk1peGVkIH0sIC8vIHN0cmluZyBvciBzdHJpbmdbXVxyXG4gICAgbWFya3M6IHsgdHlwZTogTnVtYmVyLCByZXF1aXJlZDogdHJ1ZSwgbWluOiAwIH0sXHJcbiAgfSxcclxuICB7IF9pZDogdHJ1ZSB9XHJcbik7XHJcblxyXG5jb25zdCBBc3Nlc3NtZW50U2NoZW1hID0gbmV3IFNjaGVtYTxJQXNzZXNzbWVudERvY3VtZW50PihcclxuICB7XHJcbiAgICBtb2R1bGVJZDoge1xyXG4gICAgICB0eXBlOiBTY2hlbWEuVHlwZXMuT2JqZWN0SWQsXHJcbiAgICAgIHJlZjogJ01vZHVsZScsXHJcbiAgICB9LFxyXG4gICAgc3ViamVjdElkOiB7XHJcbiAgICAgIHR5cGU6IFNjaGVtYS5UeXBlcy5PYmplY3RJZCxcclxuICAgICAgcmVmOiAnU3ViamVjdCcsXHJcbiAgICB9LFxyXG4gICAgdGl0bGU6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICByZXF1aXJlZDogW3RydWUsICdBc3Nlc3NtZW50IHRpdGxlIGlzIHJlcXVpcmVkJ10sXHJcbiAgICAgIHRyaW06IHRydWUsXHJcbiAgICB9LFxyXG4gICAgZGVzY3JpcHRpb246IHsgdHlwZTogU3RyaW5nLCB0cmltOiB0cnVlLCBkZWZhdWx0OiAnJyB9LFxyXG4gICAgcXVlc3Rpb25zOiB7IHR5cGU6IFtRdWVzdGlvblNjaGVtYV0sIGRlZmF1bHQ6IFtdIH0sXHJcbiAgICB0b3RhbE1hcmtzOiB7IHR5cGU6IE51bWJlciwgcmVxdWlyZWQ6IHRydWUsIG1pbjogMCB9LFxyXG4gICAgcGFzc1Njb3JlOiB7IHR5cGU6IE51bWJlciwgcmVxdWlyZWQ6IHRydWUsIG1pbjogMCB9LFxyXG4gICAgbWF4QXR0ZW1wdHM6IHsgdHlwZTogTnVtYmVyLCBkZWZhdWx0OiAzLCBtaW46IDEgfSxcclxuICAgIHN0YXR1czoge1xyXG4gICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgIGVudW06IFsnRFJBRlQnLCAnUFVCTElTSEVEJywgJ0FSQ0hJVkVEJ10sXHJcbiAgICAgIGRlZmF1bHQ6ICdEUkFGVCcsXHJcbiAgICB9LFxyXG4gICAgY3JlYXRlZEJ5OiB7IHR5cGU6IFNjaGVtYS5UeXBlcy5PYmplY3RJZCwgcmVmOiAnVXNlcicgfSxcclxuICB9LFxyXG4gIHsgdGltZXN0YW1wczogdHJ1ZSB9XHJcbik7XHJcblxyXG5Bc3Nlc3NtZW50U2NoZW1hLmluZGV4KHsgbW9kdWxlSWQ6IDEgfSk7XHJcbkFzc2Vzc21lbnRTY2hlbWEuaW5kZXgoeyBzdWJqZWN0SWQ6IDEgfSk7XHJcbkFzc2Vzc21lbnRTY2hlbWEuaW5kZXgoeyBzdGF0dXM6IDEgfSk7XHJcblxyXG5leHBvcnQgY29uc3QgQXNzZXNzbWVudE1vZGVsOiBNb2RlbDxJQXNzZXNzbWVudERvY3VtZW50PiA9XHJcbiAgbW9uZ29vc2UubW9kZWxzLkFzc2Vzc21lbnQgfHxcclxuICBtb25nb29zZS5tb2RlbDxJQXNzZXNzbWVudERvY3VtZW50PignQXNzZXNzbWVudCcsIEFzc2Vzc21lbnRTY2hlbWEpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXNzZXNzbWVudE1vZGVsO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHBlZ2dhXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcbW9ja1xcXFxwcm9qZWN0XFxcXHNyY1xcXFxzZXJ2ZXJcXFxcbW9kZWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwZWdnYVxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXG1vY2tcXFxccHJvamVjdFxcXFxzcmNcXFxcc2VydmVyXFxcXG1vZGVsc1xcXFxTdHVkZW50UHJvZmlsZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvcGVnZ2EvT25lRHJpdmUvRGVza3RvcC9tb2NrL3Byb2plY3Qvc3JjL3NlcnZlci9tb2RlbHMvU3R1ZGVudFByb2ZpbGUudHNcIjtpbXBvcnQgbW9uZ29vc2UsIHsgU2NoZW1hLCBEb2N1bWVudCwgTW9kZWwsIFR5cGVzIH0gZnJvbSAnbW9uZ29vc2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU3R1ZGVudFByb2ZpbGUge1xyXG4gIHVzZXJJZDogVHlwZXMuT2JqZWN0SWQ7XHJcbiAgZG9iPzogRGF0ZTtcclxuICBwcm9ncmFtSWQ/OiBUeXBlcy5PYmplY3RJZDtcclxuICBjb2hvcnRJZD86IFR5cGVzLk9iamVjdElkO1xyXG4gIHRlYWNoZXJJZD86IFR5cGVzLk9iamVjdElkO1xyXG4gIG92ZXJhbGxQcm9ncmVzczogbnVtYmVyO1xyXG4gIGFzc2Vzc21lbnRBdmVyYWdlOiBudW1iZXI7XHJcbiAgYXNzaWdubWVudEF2ZXJhZ2U6IG51bWJlcjtcclxuICBkaXNjaXBsaW5lU2NvcmU6IG51bWJlcjtcclxuICBsZWFkZXJib2FyZFJhbms6IG51bWJlcjtcclxuICBjb25zZW50OiBib29sZWFuO1xyXG4gIHByb2ZpbGU6IHtcclxuICAgIGFkZHJlc3M/OiBzdHJpbmc7XHJcbiAgICBndWFyZGlhbk5hbWU/OiBzdHJpbmc7XHJcbiAgICBndWFyZGlhblBob25lPzogc3RyaW5nO1xyXG4gICAgYmlvPzogc3RyaW5nO1xyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVN0dWRlbnRQcm9maWxlRG9jdW1lbnQgZXh0ZW5kcyBJU3R1ZGVudFByb2ZpbGUsIERvY3VtZW50IHt9XHJcblxyXG5jb25zdCBTdHVkZW50UHJvZmlsZVNjaGVtYSA9IG5ldyBTY2hlbWE8SVN0dWRlbnRQcm9maWxlRG9jdW1lbnQ+KFxyXG4gIHtcclxuICAgIHVzZXJJZDoge1xyXG4gICAgICB0eXBlOiBTY2hlbWEuVHlwZXMuT2JqZWN0SWQsXHJcbiAgICAgIHJlZjogJ1VzZXInLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgdW5pcXVlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIGRvYjogeyB0eXBlOiBEYXRlIH0sXHJcbiAgICBwcm9ncmFtSWQ6IHsgdHlwZTogU2NoZW1hLlR5cGVzLk9iamVjdElkLCByZWY6ICdQcm9ncmFtJyB9LFxyXG4gICAgY29ob3J0SWQ6IHsgdHlwZTogU2NoZW1hLlR5cGVzLk9iamVjdElkLCByZWY6ICdDb2hvcnQnIH0sXHJcbiAgICB0ZWFjaGVySWQ6IHsgdHlwZTogU2NoZW1hLlR5cGVzLk9iamVjdElkLCByZWY6ICdVc2VyJyB9LFxyXG4gICAgb3ZlcmFsbFByb2dyZXNzOiB7IHR5cGU6IE51bWJlciwgZGVmYXVsdDogMCwgbWluOiAwLCBtYXg6IDEwMCB9LFxyXG4gICAgYXNzZXNzbWVudEF2ZXJhZ2U6IHsgdHlwZTogTnVtYmVyLCBkZWZhdWx0OiAwLCBtaW46IDAsIG1heDogMTAwIH0sXHJcbiAgICBhc3NpZ25tZW50QXZlcmFnZTogeyB0eXBlOiBOdW1iZXIsIGRlZmF1bHQ6IDAsIG1pbjogMCwgbWF4OiAxMDAgfSxcclxuICAgIGRpc2NpcGxpbmVTY29yZTogeyB0eXBlOiBOdW1iZXIsIGRlZmF1bHQ6IDAsIG1pbjogMCwgbWF4OiAxMDAgfSxcclxuICAgIGxlYWRlcmJvYXJkUmFuazogeyB0eXBlOiBOdW1iZXIsIGRlZmF1bHQ6IDAgfSxcclxuICAgIGNvbnNlbnQ6IHsgdHlwZTogQm9vbGVhbiwgZGVmYXVsdDogZmFsc2UgfSxcclxuICAgIHByb2ZpbGU6IHtcclxuICAgICAgYWRkcmVzczogeyB0eXBlOiBTdHJpbmcsIHRyaW06IHRydWUgfSxcclxuICAgICAgZ3VhcmRpYW5OYW1lOiB7IHR5cGU6IFN0cmluZywgdHJpbTogdHJ1ZSB9LFxyXG4gICAgICBndWFyZGlhblBob25lOiB7IHR5cGU6IFN0cmluZywgdHJpbTogdHJ1ZSB9LFxyXG4gICAgICBiaW86IHsgdHlwZTogU3RyaW5nLCB0cmltOiB0cnVlIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgeyB0aW1lc3RhbXBzOiB0cnVlIH1cclxuKTtcclxuXHJcblN0dWRlbnRQcm9maWxlU2NoZW1hLmluZGV4KHsgcHJvZ3JhbUlkOiAxIH0pO1xyXG5TdHVkZW50UHJvZmlsZVNjaGVtYS5pbmRleCh7IGNvaG9ydElkOiAxIH0pO1xyXG5TdHVkZW50UHJvZmlsZVNjaGVtYS5pbmRleCh7IHRlYWNoZXJJZDogMSB9KTtcclxuXHJcbmV4cG9ydCBjb25zdCBTdHVkZW50UHJvZmlsZU1vZGVsOiBNb2RlbDxJU3R1ZGVudFByb2ZpbGVEb2N1bWVudD4gPVxyXG4gIG1vbmdvb3NlLm1vZGVscy5TdHVkZW50UHJvZmlsZSB8fFxyXG4gIG1vbmdvb3NlLm1vZGVsPElTdHVkZW50UHJvZmlsZURvY3VtZW50PignU3R1ZGVudFByb2ZpbGUnLCBTdHVkZW50UHJvZmlsZVNjaGVtYSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdHVkZW50UHJvZmlsZU1vZGVsO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHBlZ2dhXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcbW9ja1xcXFxwcm9qZWN0XFxcXHNyY1xcXFxzZXJ2ZXJcXFxcbW9kZWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwZWdnYVxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXG1vY2tcXFxccHJvamVjdFxcXFxzcmNcXFxcc2VydmVyXFxcXG1vZGVsc1xcXFxUZWFjaGVyUHJvZmlsZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvcGVnZ2EvT25lRHJpdmUvRGVza3RvcC9tb2NrL3Byb2plY3Qvc3JjL3NlcnZlci9tb2RlbHMvVGVhY2hlclByb2ZpbGUudHNcIjtpbXBvcnQgbW9uZ29vc2UsIHsgU2NoZW1hLCBEb2N1bWVudCwgTW9kZWwsIFR5cGVzIH0gZnJvbSAnbW9uZ29vc2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVGVhY2hlclByb2ZpbGUge1xyXG4gIHVzZXJJZDogVHlwZXMuT2JqZWN0SWQ7XHJcbiAgZW1wbG95ZWVJZDogc3RyaW5nO1xyXG4gIHByb2dyYW1JZD86IFR5cGVzLk9iamVjdElkO1xyXG4gIGNvaG9ydElkPzogVHlwZXMuT2JqZWN0SWQ7XHJcbiAgc3ViamVjdElkczogVHlwZXMuT2JqZWN0SWRbXTtcclxuICBzdHVkZW50SWRzOiBUeXBlcy5PYmplY3RJZFtdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElUZWFjaGVyUHJvZmlsZURvY3VtZW50IGV4dGVuZHMgSVRlYWNoZXJQcm9maWxlLCBEb2N1bWVudCB7fVxyXG5cclxuY29uc3QgVGVhY2hlclByb2ZpbGVTY2hlbWEgPSBuZXcgU2NoZW1hPElUZWFjaGVyUHJvZmlsZURvY3VtZW50PihcclxuICB7XHJcbiAgICB1c2VySWQ6IHtcclxuICAgICAgdHlwZTogU2NoZW1hLlR5cGVzLk9iamVjdElkLFxyXG4gICAgICByZWY6ICdVc2VyJyxcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgIHVuaXF1ZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBlbXBsb3llZUlkOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgcmVxdWlyZWQ6IFt0cnVlLCAnRW1wbG95ZWUgSUQgaXMgcmVxdWlyZWQnXSxcclxuICAgICAgdW5pcXVlOiB0cnVlLFxyXG4gICAgICB0cmltOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIHByb2dyYW1JZDogeyB0eXBlOiBTY2hlbWEuVHlwZXMuT2JqZWN0SWQsIHJlZjogJ1Byb2dyYW0nIH0sXHJcbiAgICBjb2hvcnRJZDogeyB0eXBlOiBTY2hlbWEuVHlwZXMuT2JqZWN0SWQsIHJlZjogJ0NvaG9ydCcgfSxcclxuICAgIHN1YmplY3RJZHM6IFt7IHR5cGU6IFNjaGVtYS5UeXBlcy5PYmplY3RJZCwgcmVmOiAnU3ViamVjdCcgfV0sXHJcbiAgICBzdHVkZW50SWRzOiBbeyB0eXBlOiBTY2hlbWEuVHlwZXMuT2JqZWN0SWQsIHJlZjogJ1VzZXInIH1dLFxyXG4gIH0sXHJcbiAgeyB0aW1lc3RhbXBzOiB0cnVlIH1cclxuKTtcclxuXHJcblRlYWNoZXJQcm9maWxlU2NoZW1hLmluZGV4KHsgcHJvZ3JhbUlkOiAxIH0pO1xyXG5UZWFjaGVyUHJvZmlsZVNjaGVtYS5pbmRleCh7IGNvaG9ydElkOiAxIH0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IFRlYWNoZXJQcm9maWxlTW9kZWw6IE1vZGVsPElUZWFjaGVyUHJvZmlsZURvY3VtZW50PiA9XHJcbiAgbW9uZ29vc2UubW9kZWxzLlRlYWNoZXJQcm9maWxlIHx8XHJcbiAgbW9uZ29vc2UubW9kZWw8SVRlYWNoZXJQcm9maWxlRG9jdW1lbnQ+KCdUZWFjaGVyUHJvZmlsZScsIFRlYWNoZXJQcm9maWxlU2NoZW1hKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRlYWNoZXJQcm9maWxlTW9kZWw7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxccGVnZ2FcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxtb2NrXFxcXHByb2plY3RcXFxcc3JjXFxcXHNlcnZlclxcXFxtb2RlbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHBlZ2dhXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcbW9ja1xcXFxwcm9qZWN0XFxcXHNyY1xcXFxzZXJ2ZXJcXFxcbW9kZWxzXFxcXEFkbWluUHJvZmlsZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvcGVnZ2EvT25lRHJpdmUvRGVza3RvcC9tb2NrL3Byb2plY3Qvc3JjL3NlcnZlci9tb2RlbHMvQWRtaW5Qcm9maWxlLnRzXCI7aW1wb3J0IG1vbmdvb3NlLCB7IFNjaGVtYSwgRG9jdW1lbnQsIE1vZGVsLCBUeXBlcyB9IGZyb20gJ21vbmdvb3NlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUFkbWluUHJvZmlsZSB7XHJcbiAgdXNlcklkOiBUeXBlcy5PYmplY3RJZDtcclxuICBlbXBsb3llZUlkOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUFkbWluUHJvZmlsZURvY3VtZW50IGV4dGVuZHMgSUFkbWluUHJvZmlsZSwgRG9jdW1lbnQge31cclxuXHJcbmNvbnN0IEFkbWluUHJvZmlsZVNjaGVtYSA9IG5ldyBTY2hlbWE8SUFkbWluUHJvZmlsZURvY3VtZW50PihcclxuICB7XHJcbiAgICB1c2VySWQ6IHtcclxuICAgICAgdHlwZTogU2NoZW1hLlR5cGVzLk9iamVjdElkLFxyXG4gICAgICByZWY6ICdVc2VyJyxcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgIHVuaXF1ZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBlbXBsb3llZUlkOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgcmVxdWlyZWQ6IFt0cnVlLCAnRW1wbG95ZWUgSUQgaXMgcmVxdWlyZWQnXSxcclxuICAgICAgdW5pcXVlOiB0cnVlLFxyXG4gICAgICB0cmltOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHsgdGltZXN0YW1wczogdHJ1ZSB9XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgQWRtaW5Qcm9maWxlTW9kZWw6IE1vZGVsPElBZG1pblByb2ZpbGVEb2N1bWVudD4gPVxyXG4gIG1vbmdvb3NlLm1vZGVscy5BZG1pblByb2ZpbGUgfHxcclxuICBtb25nb29zZS5tb2RlbDxJQWRtaW5Qcm9maWxlRG9jdW1lbnQ+KCdBZG1pblByb2ZpbGUnLCBBZG1pblByb2ZpbGVTY2hlbWEpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWRtaW5Qcm9maWxlTW9kZWw7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxccGVnZ2FcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxtb2NrXFxcXHByb2plY3RcXFxcc3JjXFxcXHNlcnZlclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxccGVnZ2FcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxtb2NrXFxcXHByb2plY3RcXFxcc3JjXFxcXHNlcnZlclxcXFxzZWVkRGF0YWJhc2UudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3BlZ2dhL09uZURyaXZlL0Rlc2t0b3AvbW9jay9wcm9qZWN0L3NyYy9zZXJ2ZXIvc2VlZERhdGFiYXNlLnRzXCI7aW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcclxuaW1wb3J0IFVzZXJNb2RlbCBmcm9tICcuL21vZGVscy9Vc2VyLmpzJztcclxuaW1wb3J0IFByb2dyYW1Nb2RlbCBmcm9tICcuL21vZGVscy9Qcm9ncmFtLmpzJztcclxuaW1wb3J0IENvaG9ydE1vZGVsIGZyb20gJy4vbW9kZWxzL0NvaG9ydC5qcyc7XHJcbmltcG9ydCBTdWJqZWN0TW9kZWwgZnJvbSAnLi9tb2RlbHMvU3ViamVjdC5qcyc7XHJcbmltcG9ydCBNb2R1bGVNb2RlbCBmcm9tICcuL21vZGVscy9Nb2R1bGUuanMnO1xyXG5pbXBvcnQgQ29udGVudEl0ZW1Nb2RlbCBmcm9tICcuL21vZGVscy9Db250ZW50SXRlbS5qcyc7XHJcbmltcG9ydCBBc3Nlc3NtZW50TW9kZWwgZnJvbSAnLi9tb2RlbHMvQXNzZXNzbWVudC5qcyc7XHJcbmltcG9ydCBBc3NpZ25tZW50TW9kZWwgZnJvbSAnLi9tb2RlbHMvQXNzaWdubWVudC5qcyc7XHJcbmltcG9ydCBTdHVkZW50UHJvZmlsZU1vZGVsIGZyb20gJy4vbW9kZWxzL1N0dWRlbnRQcm9maWxlLmpzJztcclxuaW1wb3J0IFRlYWNoZXJQcm9maWxlTW9kZWwgZnJvbSAnLi9tb2RlbHMvVGVhY2hlclByb2ZpbGUuanMnO1xyXG5pbXBvcnQgQWRtaW5Qcm9maWxlTW9kZWwgZnJvbSAnLi9tb2RlbHMvQWRtaW5Qcm9maWxlLmpzJztcclxuXHJcbmxldCBkYXRhYmFzZVNlZWRlZCA9IGZhbHNlO1xyXG5cclxuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHRqcyc7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VlZEFsbENvbGxlY3Rpb25zKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gIGlmIChkYXRhYmFzZVNlZWRlZCkgcmV0dXJuO1xyXG5cclxuICB0cnkge1xyXG4gICAgY29uc29sZS5sb2coJ1x1RDgzQ1x1REYzMSBDaGVja2luZyBNb25nb0RCIEF0bGFzIGNvbGxlY3Rpb25zIGZvciBzZWVkaW5nLi4uJyk7XHJcblxyXG4gICAgLy8gMC4gU2VlZCBVc2Vyc1xyXG4gICAgY29uc3QgdXNlckNvdW50ID0gYXdhaXQgVXNlck1vZGVsLmNvdW50RG9jdW1lbnRzKCk7XHJcbiAgICBpZiAodXNlckNvdW50ID09PSAwKSB7XHJcbiAgICAgIGNvbnN0IHBhc3N3b3JkSGFzaCA9IGF3YWl0IGJjcnlwdC5oYXNoKCdwYXNzd29yZDEyMycsIDEwKTtcclxuICAgICAgXHJcbiAgICAgIGNvbnN0IGFkbWluID0gYXdhaXQgVXNlck1vZGVsLmNyZWF0ZSh7IG5hbWU6ICdEaWtzaGEgQWRtaW4nLCBlbWFpbDogJ2FkbWluQGRpa3NoYS5vcmcnLCBwYXNzd29yZEhhc2gsIHJvbGU6ICdhZG1pbicgfSk7XHJcbiAgICAgIGNvbnN0IHRlYWNoZXIgPSBhd2FpdCBVc2VyTW9kZWwuY3JlYXRlKHsgbmFtZTogJ1Byb2YuIFNoYXJtYScsIGVtYWlsOiAndGVhY2hlckBkaWtzaGEub3JnJywgcGFzc3dvcmRIYXNoLCByb2xlOiAndGVhY2hlcicgfSk7XHJcbiAgICAgIGNvbnN0IHN0dWRlbnQgPSBhd2FpdCBVc2VyTW9kZWwuY3JlYXRlKHsgbmFtZTogJ0FhcmF2IFBhdGVsJywgZW1haWw6ICdzdHVkZW50QGRpa3NoYS5vcmcnLCBwYXNzd29yZEhhc2gsIHJvbGU6ICdzdHVkZW50JyB9KTtcclxuICAgICAgXHJcbiAgICAgIGF3YWl0IEFkbWluUHJvZmlsZU1vZGVsLmNyZWF0ZSh7IHVzZXJJZDogYWRtaW4uX2lkLCBwZXJtaXNzaW9uczogWydhbGwnXSB9KTtcclxuICAgICAgYXdhaXQgVGVhY2hlclByb2ZpbGVNb2RlbC5jcmVhdGUoeyB1c2VySWQ6IHRlYWNoZXIuX2lkLCBzdWJqZWN0czogW10sIGJpbzogJ1NlbmlvciBQcm9mZXNzb3InIH0pO1xyXG4gICAgICBhd2FpdCBTdHVkZW50UHJvZmlsZU1vZGVsLmNyZWF0ZSh7IHVzZXJJZDogc3R1ZGVudC5faWQsIGdyYWRlOiAnMTB0aCcsIHByb2dyYW1JZDogbmV3IG1vbmdvb3NlLlR5cGVzLk9iamVjdElkKCkgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gMS4gU2VlZCBQcm9ncmFtc1xyXG4gICAgY29uc3QgcHJvZ3JhbUNvdW50ID0gYXdhaXQgUHJvZ3JhbU1vZGVsLmNvdW50RG9jdW1lbnRzKCk7XHJcbiAgICBpZiAocHJvZ3JhbUNvdW50ID09PSAwKSB7XHJcbiAgICAgIGNvbnN0IHAxID0gYXdhaXQgUHJvZ3JhbU1vZGVsLmNyZWF0ZSh7XHJcbiAgICAgICAgbmFtZTogJ0ZvdW5kYXRpb24gUHJvZ3JhbScsXHJcbiAgICAgICAgZGVzY3JpcHRpb246ICdDb3JlIGFjYWRlbWljIGZvdW5kYXRpb24gY292ZXJpbmcgc2NpZW5jZSwgbWF0aGVtYXRpY3MsIGFuZCBzb2NpYWwgc3R1ZGllcy4nLFxyXG4gICAgICAgIHN0YXR1czogJ2FjdGl2ZScsXHJcbiAgICAgICAgY29ob3J0SWRzOiBbXSxcclxuICAgICAgICBzdWJqZWN0SWRzOiBbXSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjb25zdCBwMiA9IGF3YWl0IFByb2dyYW1Nb2RlbC5jcmVhdGUoe1xyXG4gICAgICAgIG5hbWU6ICdBZHZhbmNlZCBMZWFybmluZyBUcmFjaycsXHJcbiAgICAgICAgZGVzY3JpcHRpb246ICdBZHZhbmNlZCBjb3Vyc2V3b3JrIGZvciBoaWdoLXBlcmZvcm1pbmcgc3R1ZGVudHMuJyxcclxuICAgICAgICBzdGF0dXM6ICdhY3RpdmUnLFxyXG4gICAgICAgIGNvaG9ydElkczogW10sXHJcbiAgICAgICAgc3ViamVjdElkczogW10sXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gMi4gU2VlZCBDb2hvcnRzXHJcbiAgICAgIGNvbnN0IGMxID0gYXdhaXQgQ29ob3J0TW9kZWwuY3JlYXRlKHsgbmFtZTogJ0NvaG9ydCBBIDIwMjUnLCBwcm9ncmFtSWQ6IHAxLl9pZCwgc3R1ZGVudENvdW50OiA0IH0pO1xyXG4gICAgICBjb25zdCBjMiA9IGF3YWl0IENvaG9ydE1vZGVsLmNyZWF0ZSh7IG5hbWU6ICdDb2hvcnQgQiAyMDI1JywgcHJvZ3JhbUlkOiBwMS5faWQsIHN0dWRlbnRDb3VudDogMiB9KTtcclxuICAgICAgY29uc3QgYzMgPSBhd2FpdCBDb2hvcnRNb2RlbC5jcmVhdGUoeyBuYW1lOiAnQ29ob3J0IEMgMjAyNScsIHByb2dyYW1JZDogcDIuX2lkLCBzdHVkZW50Q291bnQ6IDIgfSk7XHJcblxyXG4gICAgICBwMS5jb2hvcnRJZHMgPSBbYzEuX2lkLCBjMi5faWRdO1xyXG4gICAgICBhd2FpdCBwMS5zYXZlKCk7XHJcbiAgICAgIHAyLmNvaG9ydElkcyA9IFtjMy5faWRdO1xyXG4gICAgICBhd2FpdCBwMi5zYXZlKCk7XHJcblxyXG4gICAgICAvLyAzLiBTZWVkIFN1YmplY3RzXHJcbiAgICAgIGNvbnN0IHMxID0gYXdhaXQgU3ViamVjdE1vZGVsLmNyZWF0ZSh7IG5hbWU6ICdNYXRoZW1hdGljcycsIGRlc2NyaXB0aW9uOiAnQWxnZWJyYSwgZ2VvbWV0cnksIGNhbGN1bHVzIGZ1bmRhbWVudGFscy4nLCBwcm9ncmFtSWQ6IHAxLl9pZCwgc3RhdHVzOiAnUFVCTElTSEVEJywgbW9kdWxlSWRzOiBbXSB9KTtcclxuICAgICAgY29uc3QgczIgPSBhd2FpdCBTdWJqZWN0TW9kZWwuY3JlYXRlKHsgbmFtZTogJ1NjaWVuY2UnLCBkZXNjcmlwdGlvbjogJ1BoeXNpY3MsIGNoZW1pc3RyeSwgYW5kIGJpb2xvZ3kgYmFzaWNzLicsIHByb2dyYW1JZDogcDEuX2lkLCBzdGF0dXM6ICdQVUJMSVNIRUQnLCBtb2R1bGVJZHM6IFtdIH0pO1xyXG4gICAgICBjb25zdCBzMyA9IGF3YWl0IFN1YmplY3RNb2RlbC5jcmVhdGUoeyBuYW1lOiAnU29jaWFsIFN0dWRpZXMnLCBkZXNjcmlwdGlvbjogJ0hpc3RvcnksIGdlb2dyYXBoeSwgYW5kIGNpdmljcy4nLCBwcm9ncmFtSWQ6IHAxLl9pZCwgc3RhdHVzOiAnUFVCTElTSEVEJywgbW9kdWxlSWRzOiBbXSB9KTtcclxuICAgICAgY29uc3QgczQgPSBhd2FpdCBTdWJqZWN0TW9kZWwuY3JlYXRlKHsgbmFtZTogJ0VuZ2xpc2ggJiBDb21tdW5pY2F0aW9uJywgZGVzY3JpcHRpb246ICdSZWFkaW5nLCB3cml0aW5nLCBhbmQgc3Bva2VuIEVuZ2xpc2guJywgcHJvZ3JhbUlkOiBwMi5faWQsIHN0YXR1czogJ1BVQkxJU0hFRCcsIG1vZHVsZUlkczogW10gfSk7XHJcblxyXG4gICAgICBwMS5zdWJqZWN0SWRzID0gW3MxLl9pZCwgczIuX2lkLCBzMy5faWRdO1xyXG4gICAgICBhd2FpdCBwMS5zYXZlKCk7XHJcbiAgICAgIHAyLnN1YmplY3RJZHMgPSBbczQuX2lkXTtcclxuICAgICAgYXdhaXQgcDIuc2F2ZSgpO1xyXG5cclxuICAgICAgLy8gNC4gU2VlZCBNb2R1bGVzXHJcbiAgICAgIGNvbnN0IG0xID0gYXdhaXQgTW9kdWxlTW9kZWwuY3JlYXRlKHsgc3ViamVjdElkOiBzMS5faWQsIHRpdGxlOiAnTGluZWFyIEFsZ2VicmEnLCBkZXNjcmlwdGlvbjogJ1ZlY3RvcnMsIG1hdHJpY2VzLCBhbmQgbGluZWFyIGVxdWF0aW9ucy4nLCBvcmRlcjogMSwgc3RhdHVzOiAnUFVCTElTSEVEJywgY29udGVudElkczogW10sIGFzc2Vzc21lbnRJZHM6IFtdIH0pO1xyXG4gICAgICBjb25zdCBtMiA9IGF3YWl0IE1vZHVsZU1vZGVsLmNyZWF0ZSh7IHN1YmplY3RJZDogczEuX2lkLCB0aXRsZTogJ0dlb21ldHJ5JywgZGVzY3JpcHRpb246ICdTaGFwZXMsIGFuZ2xlcywgYW5kIHRoZW9yZW1zLicsIG9yZGVyOiAyLCBzdGF0dXM6ICdQVUJMSVNIRUQnLCBjb250ZW50SWRzOiBbXSwgYXNzZXNzbWVudElkczogW10gfSk7XHJcbiAgICAgIGNvbnN0IG0zID0gYXdhaXQgTW9kdWxlTW9kZWwuY3JlYXRlKHsgc3ViamVjdElkOiBzMi5faWQsIHRpdGxlOiAnTWVjaGFuaWNzJywgZGVzY3JpcHRpb246ICdOZXd0b24gbGF3cywgbW90aW9uLCBhbmQgZW5lcmd5LicsIG9yZGVyOiAxLCBzdGF0dXM6ICdQVUJMSVNIRUQnLCBjb250ZW50SWRzOiBbXSwgYXNzZXNzbWVudElkczogW10gfSk7XHJcbiAgICAgIGNvbnN0IG00ID0gYXdhaXQgTW9kdWxlTW9kZWwuY3JlYXRlKHsgc3ViamVjdElkOiBzMi5faWQsIHRpdGxlOiAnQ2hlbWljYWwgUmVhY3Rpb25zJywgZGVzY3JpcHRpb246ICdUeXBlcyBvZiByZWFjdGlvbnMgYW5kIGVxdWF0aW9ucy4nLCBvcmRlcjogMiwgc3RhdHVzOiAnRFJBRlQnLCBjb250ZW50SWRzOiBbXSwgYXNzZXNzbWVudElkczogW10gfSk7XHJcbiAgICAgIGNvbnN0IG01ID0gYXdhaXQgTW9kdWxlTW9kZWwuY3JlYXRlKHsgc3ViamVjdElkOiBzMy5faWQsIHRpdGxlOiAnTW9kZXJuIEluZGlhbiBIaXN0b3J5JywgZGVzY3JpcHRpb246ICdJbmRlcGVuZGVuY2UgbW92ZW1lbnQgYW5kIHBvc3QtaW5kZXBlbmRlbmNlIEluZGlhLicsIG9yZGVyOiAxLCBzdGF0dXM6ICdQVUJMSVNIRUQnLCBjb250ZW50SWRzOiBbXSwgYXNzZXNzbWVudElkczogW10gfSk7XHJcbiAgICAgIGNvbnN0IG02ID0gYXdhaXQgTW9kdWxlTW9kZWwuY3JlYXRlKHsgc3ViamVjdElkOiBzNC5faWQsIHRpdGxlOiAnRXNzYXkgV3JpdGluZycsIGRlc2NyaXB0aW9uOiAnU3RydWN0dXJlLCBhcmd1bWVudCwgYW5kIHN0eWxlLicsIG9yZGVyOiAxLCBzdGF0dXM6ICdQVUJMSVNIRUQnLCBjb250ZW50SWRzOiBbXSwgYXNzZXNzbWVudElkczogW10gfSk7XHJcblxyXG4gICAgICBzMS5tb2R1bGVJZHMgPSBbbTEuX2lkLCBtMi5faWRdO1xyXG4gICAgICBhd2FpdCBzMS5zYXZlKCk7XHJcbiAgICAgIHMyLm1vZHVsZUlkcyA9IFttMy5faWQsIG00Ll9pZF07XHJcbiAgICAgIGF3YWl0IHMyLnNhdmUoKTtcclxuICAgICAgczMubW9kdWxlSWRzID0gW201Ll9pZF07XHJcbiAgICAgIGF3YWl0IHMzLnNhdmUoKTtcclxuICAgICAgczQubW9kdWxlSWRzID0gW202Ll9pZF07XHJcbiAgICAgIGF3YWl0IHM0LnNhdmUoKTtcclxuXHJcbiAgICAgIC8vIDUuIFNlZWQgQ29udGVudCBJdGVtc1xyXG4gICAgICBjb25zdCBjdDEgPSBhd2FpdCBDb250ZW50SXRlbU1vZGVsLmNyZWF0ZSh7IG1vZHVsZUlkOiBtMS5faWQsIHRpdGxlOiAnSW50cm9kdWN0aW9uIHRvIFZlY3RvcnMnLCB0eXBlOiAndmlkZW8nLCBkZXNjcmlwdGlvbjogJ0xlYXJuIHRoZSBmdW5kYW1lbnRhbHMgb2YgdmVjdG9ycy4nLCB1cmw6ICdodHRwczovL2V4YW1wbGUuY29tL3ZpZGVvMScsIGR1cmF0aW9uOiAxMjAwLCBzdGF0dXM6ICdQVUJMSVNIRUQnIH0pO1xyXG4gICAgICBjb25zdCBjdDIgPSBhd2FpdCBDb250ZW50SXRlbU1vZGVsLmNyZWF0ZSh7IG1vZHVsZUlkOiBtMS5faWQsIHRpdGxlOiAnTWF0cml4IE9wZXJhdGlvbnMgV29ya3NoZWV0JywgdHlwZTogJ2RvY3VtZW50JywgZGVzY3JpcHRpb246ICdQcmFjdGljZSBwcm9ibGVtcyBmb3IgbWF0cml4IG9wZXJhdGlvbnMuJywgdXJsOiAnaHR0cHM6Ly9leGFtcGxlLmNvbS9kb2MxLnBkZicsIHN0YXR1czogJ1BVQkxJU0hFRCcgfSk7XHJcbiAgICAgIGNvbnN0IGN0MyA9IGF3YWl0IENvbnRlbnRJdGVtTW9kZWwuY3JlYXRlKHsgbW9kdWxlSWQ6IG0yLl9pZCwgdGl0bGU6ICdHZW9tZXRyeSBUaGVvcmVtcyBBdWRpbyBMZWN0dXJlJywgdHlwZTogJ2F1ZGlvJywgZGVzY3JpcHRpb246ICdBdWRpbyBsZWN0dXJlIG9uIGtleSBnZW9tZXRyeSB0aGVvcmVtcy4nLCB1cmw6ICdodHRwczovL2V4YW1wbGUuY29tL2F1ZGlvMS5tcDMnLCBkdXJhdGlvbjogOTAwLCBzdGF0dXM6ICdQVUJMSVNIRUQnIH0pO1xyXG4gICAgICBjb25zdCBjdDQgPSBhd2FpdCBDb250ZW50SXRlbU1vZGVsLmNyZWF0ZSh7IG1vZHVsZUlkOiBtMy5faWQsIHRpdGxlOiAnTmV3dG9uIExhd3Mgb2YgTW90aW9uJywgdHlwZTogJ3ZpZGVvJywgZGVzY3JpcHRpb246ICdWaWRlbyBleHBsYWluaW5nIHRoZSB0aHJlZSBsYXdzIG9mIG1vdGlvbi4nLCB1cmw6ICdodHRwczovL2V4YW1wbGUuY29tL3ZpZGVvMicsIGR1cmF0aW9uOiAxNTAwLCBzdGF0dXM6ICdQVUJMSVNIRUQnIH0pO1xyXG4gICAgICBjb25zdCBjdDUgPSBhd2FpdCBDb250ZW50SXRlbU1vZGVsLmNyZWF0ZSh7IG1vZHVsZUlkOiBtMy5faWQsIHRpdGxlOiAnRW5lcmd5IGFuZCBXb3JrIC0gUmVhZGluZycsIHR5cGU6ICd0ZXh0JywgZGVzY3JpcHRpb246ICdUZXh0IHJlc291cmNlIG9uIHdvcmstZW5lcmd5IHRoZW9yZW0uJywgc3RhdHVzOiAnUFVCTElTSEVEJyB9KTtcclxuICAgICAgY29uc3QgY3Q2ID0gYXdhaXQgQ29udGVudEl0ZW1Nb2RlbC5jcmVhdGUoeyBtb2R1bGVJZDogbTQuX2lkLCB0aXRsZTogJ0JhbGFuY2luZyBFcXVhdGlvbnMgKEV4dGVybmFsKScsIHR5cGU6ICdsaW5rJywgZGVzY3JpcHRpb246ICdFeHRlcm5hbCBpbnRlcmFjdGl2ZSB0b29sIGZvciBiYWxhbmNpbmcgY2hlbWljYWwgZXF1YXRpb25zLicsIHVybDogJ2h0dHBzOi8vZXhhbXBsZS5jb20vY2hlbXRvb2wnLCBzdGF0dXM6ICdEUkFGVCcgfSk7XHJcbiAgICAgIGNvbnN0IGN0NyA9IGF3YWl0IENvbnRlbnRJdGVtTW9kZWwuY3JlYXRlKHsgbW9kdWxlSWQ6IG01Ll9pZCwgdGl0bGU6ICdUaGUgRnJlZWRvbSBTdHJ1Z2dsZScsIHR5cGU6ICdkb2N1bWVudCcsIGRlc2NyaXB0aW9uOiAnUERGIGRvY3VtZW50IG9uIEluZGlhcyBmcmVlZG9tIG1vdmVtZW50LicsIHVybDogJ2h0dHBzOi8vZXhhbXBsZS5jb20vaGlzdG9yeS5wZGYnLCBzdGF0dXM6ICdQVUJMSVNIRUQnIH0pO1xyXG4gICAgICBjb25zdCBjdDggPSBhd2FpdCBDb250ZW50SXRlbU1vZGVsLmNyZWF0ZSh7IG1vZHVsZUlkOiBtNi5faWQsIHRpdGxlOiAnRXNzYXkgU3RydWN0dXJlIFZpZGVvJywgdHlwZTogJ3ZpZGVvJywgZGVzY3JpcHRpb246ICdIb3cgdG8gc3RydWN0dXJlIGEgZml2ZS1wYXJhZ3JhcGggZXNzYXkuJywgdXJsOiAnaHR0cHM6Ly9leGFtcGxlLmNvbS92aWRlbzMnLCBkdXJhdGlvbjogMTgwMCwgc3RhdHVzOiAnUFVCTElTSEVEJyB9KTtcclxuICAgICAgY29uc3QgY3Q5ID0gYXdhaXQgQ29udGVudEl0ZW1Nb2RlbC5jcmVhdGUoeyBtb2R1bGVJZDogbTYuX2lkLCB0aXRsZTogJ1dyaXRpbmcgUHJvbXB0cyBBdWRpbycsIHR5cGU6ICdhdWRpbycsIGRlc2NyaXB0aW9uOiAnQXVkaW8gcHJvbXB0cyBmb3IgcHJhY3RpY2Ugd3JpdGluZy4nLCB1cmw6ICdodHRwczovL2V4YW1wbGUuY29tL2F1ZGlvMi5tcDMnLCBkdXJhdGlvbjogNjAwLCBzdGF0dXM6ICdQVUJMSVNIRUQnIH0pO1xyXG5cclxuICAgICAgbTEuY29udGVudElkcyA9IFtjdDEuX2lkLCBjdDIuX2lkXTtcclxuICAgICAgYXdhaXQgbTEuc2F2ZSgpO1xyXG4gICAgICBtMi5jb250ZW50SWRzID0gW2N0My5faWRdO1xyXG4gICAgICBhd2FpdCBtMi5zYXZlKCk7XHJcbiAgICAgIG0zLmNvbnRlbnRJZHMgPSBbY3Q0Ll9pZCwgY3Q1Ll9pZF07XHJcbiAgICAgIGF3YWl0IG0zLnNhdmUoKTtcclxuICAgICAgbTQuY29udGVudElkcyA9IFtjdDYuX2lkXTtcclxuICAgICAgYXdhaXQgbTQuc2F2ZSgpO1xyXG4gICAgICBtNS5jb250ZW50SWRzID0gW2N0Ny5faWRdO1xyXG4gICAgICBhd2FpdCBtNS5zYXZlKCk7XHJcbiAgICAgIG02LmNvbnRlbnRJZHMgPSBbY3Q4Ll9pZCwgY3Q5Ll9pZF07XHJcbiAgICAgIGF3YWl0IG02LnNhdmUoKTtcclxuXHJcbiAgICAgIC8vIDYuIFNlZWQgQXNzZXNzbWVudHMgQ29sbGVjdGlvblxyXG4gICAgICBjb25zdCBhczEgPSBhd2FpdCBBc3Nlc3NtZW50TW9kZWwuY3JlYXRlKHtcclxuICAgICAgICBtb2R1bGVJZDogbTEuX2lkLFxyXG4gICAgICAgIHN1YmplY3RJZDogczEuX2lkLFxyXG4gICAgICAgIHRpdGxlOiAnTGluZWFyIEFsZ2VicmEgUXVpeicsXHJcbiAgICAgICAgZGVzY3JpcHRpb246ICdUZXN0IHlvdXIgdW5kZXJzdGFuZGluZyBvZiB2ZWN0b3JzIGFuZCBtYXRyaWNlcy4nLFxyXG4gICAgICAgIHF1ZXN0aW9uczogW1xyXG4gICAgICAgICAgeyB0eXBlOiAnbWNxJywgcXVlc3Rpb246ICdXaGF0IGlzIHRoZSBkb3QgcHJvZHVjdCBvZiBbMSwyXSBhbmQgWzMsNF0/Jywgb3B0aW9uczogWyc3JywgJzExJywgJzE0JywgJzEwJ10sIGNvcnJlY3RBbnN3ZXI6ICcxMScsIG1hcmtzOiA1IH0sXHJcbiAgICAgICAgICB7IHR5cGU6ICd0cnVlX2ZhbHNlJywgcXVlc3Rpb246ICdBIG1hdHJpeCBpcyBhbHdheXMgc3F1YXJlLicsIG9wdGlvbnM6IFsnVHJ1ZScsICdGYWxzZSddLCBjb3JyZWN0QW5zd2VyOiAnRmFsc2UnLCBtYXJrczogNSB9LFxyXG4gICAgICAgICAgeyB0eXBlOiAnbXVsdGlwbGVfc2VsZWN0JywgcXVlc3Rpb246ICdXaGljaCBhcmUgdmVjdG9yIG9wZXJhdGlvbnM/Jywgb3B0aW9uczogWydBZGRpdGlvbicsICdNdWx0aXBsaWNhdGlvbicsICdJbnZlcnNpb24nLCAnRG90IHByb2R1Y3QnXSwgY29ycmVjdEFuc3dlcjogWydBZGRpdGlvbicsICdEb3QgcHJvZHVjdCddLCBtYXJrczogMTAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIHRvdGFsTWFya3M6IDIwLFxyXG4gICAgICAgIHBhc3NTY29yZTogMTIsXHJcbiAgICAgICAgYXR0ZW1wdHM6IDMsXHJcbiAgICAgICAgc3RhdHVzOiAnUFVCTElTSEVEJyxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjb25zdCBhczIgPSBhd2FpdCBBc3Nlc3NtZW50TW9kZWwuY3JlYXRlKHtcclxuICAgICAgICBtb2R1bGVJZDogbTIuX2lkLFxyXG4gICAgICAgIHN1YmplY3RJZDogczEuX2lkLFxyXG4gICAgICAgIHRpdGxlOiAnR2VvbWV0cnkgVGVzdCcsXHJcbiAgICAgICAgZGVzY3JpcHRpb246ICdUZXN0IG9uIGFuZ2xlcywgdHJpYW5nbGVzLCBhbmQgdGhlb3JlbXMuJyxcclxuICAgICAgICBxdWVzdGlvbnM6IFtcclxuICAgICAgICAgIHsgdHlwZTogJ21jcScsIHF1ZXN0aW9uOiAnU3VtIG9mIGFuZ2xlcyBpbiBhIHRyaWFuZ2xlPycsIG9wdGlvbnM6IFsnOTBcdTAwQjAnLCAnMTgwXHUwMEIwJywgJzI3MFx1MDBCMCcsICczNjBcdTAwQjAnXSwgY29ycmVjdEFuc3dlcjogJzE4MFx1MDBCMCcsIG1hcmtzOiA1IH0sXHJcbiAgICAgICAgICB7IHR5cGU6ICdzaG9ydF9hbnN3ZXInLCBxdWVzdGlvbjogJ0RlZmluZSBhIHJpZ2h0IGFuZ2xlLicsIG1hcmtzOiAxMCB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgdG90YWxNYXJrczogMTUsXHJcbiAgICAgICAgcGFzc1Njb3JlOiA5LFxyXG4gICAgICAgIGF0dGVtcHRzOiAyLFxyXG4gICAgICAgIHN0YXR1czogJ1BVQkxJU0hFRCcsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3QgYXMzID0gYXdhaXQgQXNzZXNzbWVudE1vZGVsLmNyZWF0ZSh7XHJcbiAgICAgICAgbW9kdWxlSWQ6IG0zLl9pZCxcclxuICAgICAgICBzdWJqZWN0SWQ6IHMyLl9pZCxcclxuICAgICAgICB0aXRsZTogJ01lY2hhbmljcyBBc3Nlc3NtZW50JyxcclxuICAgICAgICBkZXNjcmlwdGlvbjogJ05ld3RvbiBsYXdzIGFuZCBlbmVyZ3kgY29uY2VwdHMuJyxcclxuICAgICAgICBxdWVzdGlvbnM6IFtcclxuICAgICAgICAgIHsgdHlwZTogJ21jcScsIHF1ZXN0aW9uOiAnV2hhdCBpcyB0aGUgU0kgdW5pdCBvZiBmb3JjZT8nLCBvcHRpb25zOiBbJ0pvdWxlJywgJ1dhdHQnLCAnTmV3dG9uJywgJ1Bhc2NhbCddLCBjb3JyZWN0QW5zd2VyOiAnTmV3dG9uJywgbWFya3M6IDUgfSxcclxuICAgICAgICAgIHsgdHlwZTogJ3RydWVfZmFsc2UnLCBxdWVzdGlvbjogJ0VuZXJneSBjYW4gYmUgY3JlYXRlZCBvciBkZXN0cm95ZWQuJywgb3B0aW9uczogWydUcnVlJywgJ0ZhbHNlJ10sIGNvcnJlY3RBbnN3ZXI6ICdGYWxzZScsIG1hcmtzOiA1IH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgICB0b3RhbE1hcmtzOiAxMCxcclxuICAgICAgICBwYXNzU2NvcmU6IDYsXHJcbiAgICAgICAgYXR0ZW1wdHM6IDIsXHJcbiAgICAgICAgc3RhdHVzOiAnUFVCTElTSEVEJyxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjb25zdCBhczQgPSBhd2FpdCBBc3Nlc3NtZW50TW9kZWwuY3JlYXRlKHtcclxuICAgICAgICBtb2R1bGVJZDogbTUuX2lkLFxyXG4gICAgICAgIHN1YmplY3RJZDogczMuX2lkLFxyXG4gICAgICAgIHRpdGxlOiAnSGlzdG9yeSBRdWl6JyxcclxuICAgICAgICBkZXNjcmlwdGlvbjogJ01vZGVybiBJbmRpYW4gaGlzdG9yeSBxdWl6LicsXHJcbiAgICAgICAgcXVlc3Rpb25zOiBbXHJcbiAgICAgICAgICB7IHR5cGU6ICdtY3EnLCBxdWVzdGlvbjogJ0luIHdoaWNoIHllYXIgZGlkIEluZGlhIGdhaW4gaW5kZXBlbmRlbmNlPycsIG9wdGlvbnM6IFsnMTk0NScsICcxOTQ2JywgJzE5NDcnLCAnMTk0OCddLCBjb3JyZWN0QW5zd2VyOiAnMTk0NycsIG1hcmtzOiA1IH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgICB0b3RhbE1hcmtzOiA1LFxyXG4gICAgICAgIHBhc3NTY29yZTogMyxcclxuICAgICAgICBhdHRlbXB0czogMyxcclxuICAgICAgICBzdGF0dXM6ICdQVUJMSVNIRUQnLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIG0xLmFzc2Vzc21lbnRJZHMgPSBbYXMxLl9pZF07XHJcbiAgICAgIGF3YWl0IG0xLnNhdmUoKTtcclxuICAgICAgbTIuYXNzZXNzbWVudElkcyA9IFthczIuX2lkXTtcclxuICAgICAgYXdhaXQgbTIuc2F2ZSgpO1xyXG4gICAgICBtMy5hc3Nlc3NtZW50SWRzID0gW2FzMy5faWRdO1xyXG4gICAgICBhd2FpdCBtMy5zYXZlKCk7XHJcbiAgICAgIG01LmFzc2Vzc21lbnRJZHMgPSBbYXM0Ll9pZF07XHJcbiAgICAgIGF3YWl0IG01LnNhdmUoKTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKCdcdTI3MDUgU3VjY2Vzc2Z1bGx5IHNlZWRlZCBhbGwgTW9uZ29EQiBjdXJyaWN1bHVtLCBhc3Nlc3NtZW50ICYgY29udGVudCBjb2xsZWN0aW9ucyEnKTtcclxuICAgIH1cclxuXHJcbiAgICBkYXRhYmFzZVNlZWRlZCA9IHRydWU7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBzZWVkaW5nIE1vbmdvREIgY29sbGVjdGlvbnM6JywgKGVyciBhcyBFcnJvcikubWVzc2FnZSk7XHJcbiAgfVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxccGVnZ2FcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxtb2NrXFxcXHByb2plY3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHBlZ2dhXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcbW9ja1xcXFxwcm9qZWN0XFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9wZWdnYS9PbmVEcml2ZS9EZXNrdG9wL21vY2svcHJvamVjdC92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xyXG5pbXBvcnQgeyBoYW5kbGVBdXRoUmVxdWVzdCB9IGZyb20gJy4vc3JjL3NlcnZlci9hdXRoSGFuZGxlci50cyc7XHJcbmltcG9ydCB7IGhhbmRsZUN1cnJpY3VsdW1SZXF1ZXN0IH0gZnJvbSAnLi9zcmMvc2VydmVyL2N1cnJpY3VsdW1IYW5kbGVyLnRzJztcclxuaW1wb3J0IHsgaGFuZGxlRXZhbHVhdGlvblJlcXVlc3QgfSBmcm9tICcuL3NyYy9zZXJ2ZXIvZXZhbHVhdGlvbkhhbmRsZXIudHMnO1xyXG5pbXBvcnQgeyBoYW5kbGVDaGF0UmVxdWVzdCB9IGZyb20gJy4vc3JjL3NlcnZlci9jaGF0SGFuZGxlci50cyc7XHJcblxyXG5mdW5jdGlvbiBzZXJ2ZXJBcGlQbHVnaW4oKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIG5hbWU6ICdzZXJ2ZXItYXBpLXBsdWdpbicsXHJcbiAgICBjb25maWd1cmVTZXJ2ZXIoc2VydmVyKSB7XHJcbiAgICAgIHNlcnZlci5taWRkbGV3YXJlcy51c2UoYXN5bmMgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XHJcbiAgICAgICAgaWYgKHJlcS51cmw/LnN0YXJ0c1dpdGgoJy9hcGkvYXV0aC8nKSB8fCByZXEudXJsPy5zdGFydHNXaXRoKCcvYXBpL3Byb2ZpbGUnKSkge1xyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgaGFuZGxlZCA9IGF3YWl0IGhhbmRsZUF1dGhSZXF1ZXN0KHJlcSwgcmVzKTtcclxuICAgICAgICAgICAgaWYgKGhhbmRsZWQpIHJldHVybjtcclxuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdBdXRoIG1pZGRsZXdhcmUgZXJyb3I6JywgZXJyKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJlcS51cmw/LnN0YXJ0c1dpdGgoJy9hcGkvY3VycmljdWx1bScpKSB7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBoYW5kbGVkID0gYXdhaXQgaGFuZGxlQ3VycmljdWx1bVJlcXVlc3QocmVxLCByZXMpO1xyXG4gICAgICAgICAgICBpZiAoaGFuZGxlZCkgcmV0dXJuO1xyXG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0N1cnJpY3VsdW0gbWlkZGxld2FyZSBlcnJvcjonLCBlcnIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmVxLnVybD8uc3RhcnRzV2l0aCgnL2FwaS9jaGF0JykgfHwgcmVxLnVybD8uc3RhcnRzV2l0aCgnL2FwaS91c2VycycpKSB7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBoYW5kbGVkID0gYXdhaXQgaGFuZGxlQ2hhdFJlcXVlc3QocmVxLCByZXMpO1xyXG4gICAgICAgICAgICBpZiAoaGFuZGxlZCkgcmV0dXJuO1xyXG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0NoYXQgbWlkZGxld2FyZSBlcnJvcjonLCBlcnIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBuZXh0KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBldmFsdWF0aW9uQXBpUGx1Z2luKCkge1xyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiAnZXZhbHVhdGlvbi1hcGktcGx1Z2luJyxcclxuICAgIGNvbmZpZ3VyZVNlcnZlcihzZXJ2ZXIpIHtcclxuICAgICAgc2VydmVyLm1pZGRsZXdhcmVzLnVzZShhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcclxuICAgICAgICBpZiAocmVxLnVybD8uc3RhcnRzV2l0aCgnL2FwaS9ldmFsdWF0aW9uLycpKSB7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBoYW5kbGVkID0gYXdhaXQgaGFuZGxlRXZhbHVhdGlvblJlcXVlc3QocmVxLCByZXMpO1xyXG4gICAgICAgICAgICBpZiAoaGFuZGxlZCkgcmV0dXJuO1xyXG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0V2YWx1YXRpb24gbWlkZGxld2FyZSBlcnJvcjonLCBlcnIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBuZXh0KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBzZXJ2ZXJBcGlQbHVnaW4oKSwgZXZhbHVhdGlvbkFwaVBsdWdpbigpXSxcclxuICBzZXJ2ZXI6IHtcclxuICAgIHBvcnQ6IDUxNzMsXHJcbiAgICBob3N0OiB0cnVlLFxyXG4gIH0sXHJcbn0pO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHBlZ2dhXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcbW9ja1xcXFxwcm9qZWN0XFxcXHNyY1xcXFxzZXJ2ZXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHBlZ2dhXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcbW9ja1xcXFxwcm9qZWN0XFxcXHNyY1xcXFxzZXJ2ZXJcXFxcYXV0aEhhbmRsZXIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3BlZ2dhL09uZURyaXZlL0Rlc2t0b3AvbW9jay9wcm9qZWN0L3NyYy9zZXJ2ZXIvYXV0aEhhbmRsZXIudHNcIjtpbXBvcnQgdHlwZSB7IEluY29taW5nTWVzc2FnZSwgU2VydmVyUmVzcG9uc2UgfSBmcm9tICdub2RlOmh0dHAnO1xuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHRqcyc7XG5pbXBvcnQgand0IGZyb20gJ2pzb253ZWJ0b2tlbic7XG5pbXBvcnQgeyBjb25uZWN0VG9EYXRhYmFzZSwgaXNNb25nb0Nvbm5lY3RlZCB9IGZyb20gJy4vZGIuanMnO1xuaW1wb3J0IFVzZXJNb2RlbCwgeyB0eXBlIFVzZXJSb2xlIH0gZnJvbSAnLi9tb2RlbHMvVXNlci5qcyc7XG5pbXBvcnQgU3R1ZGVudFByb2ZpbGVNb2RlbCBmcm9tICcuL21vZGVscy9TdHVkZW50UHJvZmlsZS5qcyc7XG5pbXBvcnQgVGVhY2hlclByb2ZpbGVNb2RlbCBmcm9tICcuL21vZGVscy9UZWFjaGVyUHJvZmlsZS5qcyc7XG5pbXBvcnQgQWRtaW5Qcm9maWxlTW9kZWwgZnJvbSAnLi9tb2RlbHMvQWRtaW5Qcm9maWxlLmpzJztcblxuZXhwb3J0IGNvbnN0IEFMTE9XRURfUk9MRVM6IHJlYWRvbmx5IFVzZXJSb2xlW10gPSBbJ2FkbWluJywgJ3RlYWNoZXInLCAnc3R1ZGVudCddIGFzIGNvbnN0O1xuXG5leHBvcnQgaW50ZXJmYWNlIEluTWVtVXNlciB7XG4gIGlkOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgZW1haWw6IHN0cmluZztcbiAgcGFzc3dvcmRIYXNoOiBzdHJpbmc7XG4gIHJvbGU6IFVzZXJSb2xlO1xuICBjcmVhdGVkQXQ6IHN0cmluZztcbn1cblxuY29uc3QgSldUX1NFQ1JFVCA9IHByb2Nlc3MuZW52LkpXVF9TRUNSRVQgfHwgJ2Rpa3NoYS1mb3VuZGF0aW9uLXNlY3JldC1rZXktMjAyNic7XG5cbi8vIEluLW1lbW9yeSBmYWxsYmFja1xuY29uc3QgaW5NZW1vcnlVc2VyczogTWFwPHN0cmluZywgSW5NZW1Vc2VyPiA9IG5ldyBNYXAoKTtcblxuZnVuY3Rpb24gc2VlZEluTWVtKGlkOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgZW1haWw6IHN0cmluZywgcmF3UGFzc3dvcmQ6IHN0cmluZywgcm9sZTogVXNlclJvbGUpIHtcbiAgY29uc3QgcGFzc3dvcmRIYXNoID0gYmNyeXB0Lmhhc2hTeW5jKHJhd1Bhc3N3b3JkLCAxMCk7XG4gIGluTWVtb3J5VXNlcnMuc2V0KGVtYWlsLnRvTG93ZXJDYXNlKCksIHtcbiAgICBpZCxcbiAgICBuYW1lLFxuICAgIGVtYWlsOiBlbWFpbC50b0xvd2VyQ2FzZSgpLFxuICAgIHBhc3N3b3JkSGFzaCxcbiAgICByb2xlLFxuICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICB9KTtcbn1cblxuaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcblxuc2VlZEluTWVtKG5ldyBtb25nb29zZS5UeXBlcy5PYmplY3RJZCgpLnRvU3RyaW5nKCksICdEaWtzaGEgQWRtaW4nLCAnYWRtaW5AZGlrc2hhLm9yZycsICdwYXNzd29yZDEyMycsICdhZG1pbicpO1xuc2VlZEluTWVtKG5ldyBtb25nb29zZS5UeXBlcy5PYmplY3RJZCgpLnRvU3RyaW5nKCksICdQcm9mLiBTaGFybWEnLCAndGVhY2hlckBkaWtzaGEub3JnJywgJ3Bhc3N3b3JkMTIzJywgJ3RlYWNoZXInKTtcbnNlZWRJbk1lbShuZXcgbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQoKS50b1N0cmluZygpLCAnQWFyYXYgUGF0ZWwnLCAnc3R1ZGVudEBkaWtzaGEub3JnJywgJ3Bhc3N3b3JkMTIzJywgJ3N0dWRlbnQnKTtcblxubGV0IG1vbmdvU2VlZGVkID0gZmFsc2U7XG5hc3luYyBmdW5jdGlvbiBlbnN1cmVNb25nb1NlZWRlZCgpIHtcbiAgaWYgKG1vbmdvU2VlZGVkIHx8ICFpc01vbmdvQ29ubmVjdGVkKCkpIHJldHVybjtcbiAgLy8gU2VlZGluZyBpcyBub3cgaGFuZGxlZCBjZW50cmFsbHkgYnkgc2VlZERhdGFiYXNlLnRzIHdoZW4gZGIudHMgY29ubmVjdHMuXG4gIG1vbmdvU2VlZGVkID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gcGFyc2VKc29uQm9keShyZXE6IEluY29taW5nTWVzc2FnZSk6IFByb21pc2U8YW55PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgbGV0IGJvZHkgPSAnJztcbiAgICByZXEub24oJ2RhdGEnLCAoY2h1bmspID0+IHtcbiAgICAgIGJvZHkgKz0gY2h1bms7XG4gICAgfSk7XG4gICAgcmVxLm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgICBpZiAoIWJvZHkpIHtcbiAgICAgICAgcmVzb2x2ZSh7fSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZShib2R5KSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmVxLm9uKCdlcnJvcicsIChlcnIpID0+IHJlamVjdChlcnIpKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNlbmRKc29uKHJlczogU2VydmVyUmVzcG9uc2UsIHN0YXR1c0NvZGU6IG51bWJlciwgZGF0YTogYW55KSB7XG4gIHJlcy5zdGF0dXNDb2RlID0gc3RhdHVzQ29kZTtcbiAgcmVzLnNldEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgcmVzLmVuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGF1dGhlbnRpY2F0ZShyZXE6IEluY29taW5nTWVzc2FnZSk6IFByb21pc2U8eyB1c2VySWQ6IHN0cmluZzsgcm9sZTogVXNlclJvbGUgfSB8IG51bGw+IHtcbiAgY29uc3QgYXV0aEhlYWRlciA9IHJlcS5oZWFkZXJzLmF1dGhvcml6YXRpb247XG4gIGlmICghYXV0aEhlYWRlciB8fCAhYXV0aEhlYWRlci5zdGFydHNXaXRoKCdCZWFyZXIgJykpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBjb25zdCB0b2tlbiA9IGF1dGhIZWFkZXIuc3BsaXQoJyAnKVsxXTtcbiAgaWYgKCF0b2tlbikgcmV0dXJuIG51bGw7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBkZWNvZGVkID0gand0LnZlcmlmeSh0b2tlbiwgSldUX1NFQ1JFVCkgYXMgeyB1c2VySWQ6IHN0cmluZzsgcm9sZTogVXNlclJvbGUgfTtcbiAgICByZXR1cm4gZGVjb2RlZDtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZUF1dGhSZXF1ZXN0KHJlcTogSW5jb21pbmdNZXNzYWdlLCByZXM6IFNlcnZlclJlc3BvbnNlKTogUHJvbWlzZTxib29sZWFuPiB7XG4gIGNvbnN0IHVybCA9IHJlcS51cmw/LnNwbGl0KCc/JylbMF07XG5cbiAgLy8gUm91dGU6IFBPU1QgL2FwaS9hdXRoL3NpZ251cFxuICBpZiAodXJsID09PSAnL2FwaS9hdXRoL3NpZ251cCcgJiYgcmVxLm1ldGhvZCA9PT0gJ1BPU1QnKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCBwYXJzZUpzb25Cb2R5KHJlcSk7XG4gICAgICBjb25zdCB7IG5hbWUsIGVtYWlsLCBwYXNzd29yZCwgcm9sZSB9ID0gYm9keTtcblxuICAgICAgaWYgKCFuYW1lIHx8IHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJyB8fCAhbmFtZS50cmltKCkpIHtcbiAgICAgICAgc2VuZEpzb24ocmVzLCA0MDAsIHsgbWVzc2FnZTogJ05hbWUgaXMgcmVxdWlyZWQnIH0pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFlbWFpbCB8fCB0eXBlb2YgZW1haWwgIT09ICdzdHJpbmcnIHx8ICFlbWFpbC50cmltKCkpIHtcbiAgICAgICAgc2VuZEpzb24ocmVzLCA0MDAsIHsgbWVzc2FnZTogJ0VtYWlsIGlzIHJlcXVpcmVkJyB9KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmICghcGFzc3dvcmQgfHwgdHlwZW9mIHBhc3N3b3JkICE9PSAnc3RyaW5nJyB8fCBwYXNzd29yZC5sZW5ndGggPCA2KSB7XG4gICAgICAgIHNlbmRKc29uKHJlcywgNDAwLCB7IG1lc3NhZ2U6ICdQYXNzd29yZCBtdXN0IGJlIGF0IGxlYXN0IDYgY2hhcmFjdGVycycgfSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXJvbGUgfHwgIUFMTE9XRURfUk9MRVMuaW5jbHVkZXMocm9sZSBhcyBVc2VyUm9sZSkpIHtcbiAgICAgICAgc2VuZEpzb24ocmVzLCA0MDAsIHtcbiAgICAgICAgICBtZXNzYWdlOiAnSW52YWxpZCByb2xlLiBSb2xlIG11c3QgYmUgb25lIG9mOiBhZG1pbiwgdGVhY2hlciwgc3R1ZGVudC4nLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRFbWFpbCA9IGVtYWlsLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuICAgICAgY29uc3QgcGFzc3dvcmRIYXNoID0gYXdhaXQgYmNyeXB0Lmhhc2gocGFzc3dvcmQsIDEwKTtcblxuICAgICAgY29uc3QgbW9uZ29SZWFkeSA9IGF3YWl0IGNvbm5lY3RUb0RhdGFiYXNlKCk7XG4gICAgICBpZiAobW9uZ29SZWFkeSkge1xuICAgICAgICBhd2FpdCBlbnN1cmVNb25nb1NlZWRlZCgpO1xuICAgICAgICBjb25zdCBleGlzdGluZ1VzZXIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZSh7IGVtYWlsOiBub3JtYWxpemVkRW1haWwgfSk7XG4gICAgICAgIGlmIChleGlzdGluZ1VzZXIpIHtcbiAgICAgICAgICBzZW5kSnNvbihyZXMsIDQwMCwgeyBtZXNzYWdlOiAnRW1haWwgYWxyZWFkeSByZWdpc3RlcmVkJyB9KTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IFVzZXJNb2RlbC5jcmVhdGUoe1xuICAgICAgICAgIG5hbWU6IG5hbWUudHJpbSgpLFxuICAgICAgICAgIGVtYWlsOiBub3JtYWxpemVkRW1haWwsXG4gICAgICAgICAgcGFzc3dvcmRIYXNoLFxuICAgICAgICAgIHJvbGU6IHJvbGUgYXMgVXNlclJvbGUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNlbmRKc29uKHJlcywgMjAxLCB7XG4gICAgICAgICAgbWVzc2FnZTogJ0FjY291bnQgY3JlYXRlZCBzdWNjZXNzZnVsbHknLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChpbk1lbW9yeVVzZXJzLmhhcyhub3JtYWxpemVkRW1haWwpKSB7XG4gICAgICAgIHNlbmRKc29uKHJlcywgNDAwLCB7IG1lc3NhZ2U6ICdFbWFpbCBhbHJlYWR5IHJlZ2lzdGVyZWQnIH0pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV3VXNlcjogSW5NZW1Vc2VyID0ge1xuICAgICAgICBpZDogYHVzcl8ke0RhdGUubm93KCl9XyR7TWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDIsIDcpfWAsXG4gICAgICAgIG5hbWU6IG5hbWUudHJpbSgpLFxuICAgICAgICBlbWFpbDogbm9ybWFsaXplZEVtYWlsLFxuICAgICAgICBwYXNzd29yZEhhc2gsXG4gICAgICAgIHJvbGU6IHJvbGUgYXMgVXNlclJvbGUsXG4gICAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgfTtcbiAgICAgIGluTWVtb3J5VXNlcnMuc2V0KG5vcm1hbGl6ZWRFbWFpbCwgbmV3VXNlcik7XG5cbiAgICAgIHNlbmRKc29uKHJlcywgMjAxLCB7XG4gICAgICAgIG1lc3NhZ2U6ICdBY2NvdW50IGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5JyxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCB7XG4gICAgICBzZW5kSnNvbihyZXMsIDUwMCwgeyBtZXNzYWdlOiAnSW50ZXJuYWwgc2VydmVyIGVycm9yJyB9KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJvdXRlOiBQT1NUIC9hcGkvYXV0aC9sb2dpblxuICBpZiAodXJsID09PSAnL2FwaS9hdXRoL2xvZ2luJyAmJiByZXEubWV0aG9kID09PSAnUE9TVCcpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgYm9keSA9IGF3YWl0IHBhcnNlSnNvbkJvZHkocmVxKTtcbiAgICAgIGNvbnN0IHsgZW1haWwsIHBhc3N3b3JkLCByb2xlIH0gPSBib2R5O1xuXG4gICAgICBpZiAoIXJvbGUgfHwgIUFMTE9XRURfUk9MRVMuaW5jbHVkZXMocm9sZSBhcyBVc2VyUm9sZSkpIHtcbiAgICAgICAgc2VuZEpzb24ocmVzLCA0MDEsIHsgbWVzc2FnZTogJ0ludmFsaWQgZW1haWwsIHBhc3N3b3JkLCBvciByb2xlLicgfSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWVtYWlsIHx8ICFwYXNzd29yZCB8fCB0eXBlb2YgZW1haWwgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBwYXNzd29yZCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgc2VuZEpzb24ocmVzLCA0MDEsIHsgbWVzc2FnZTogJ0ludmFsaWQgZW1haWwsIHBhc3N3b3JkLCBvciByb2xlLicgfSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBub3JtYWxpemVkRW1haWwgPSBlbWFpbC50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcblxuICAgICAgY29uc3QgbW9uZ29SZWFkeSA9IGF3YWl0IGNvbm5lY3RUb0RhdGFiYXNlKCk7XG4gICAgICBpZiAobW9uZ29SZWFkeSkge1xuICAgICAgICBhd2FpdCBlbnN1cmVNb25nb1NlZWRlZCgpO1xuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUoeyBlbWFpbDogbm9ybWFsaXplZEVtYWlsIH0pO1xuXG4gICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgIHNlbmRKc29uKHJlcywgNDAxLCB7IG1lc3NhZ2U6ICdJbnZhbGlkIGVtYWlsLCBwYXNzd29yZCwgb3Igcm9sZS4nIH0pO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaXNQYXNzd29yZE1hdGNoID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUocGFzc3dvcmQsIHVzZXIucGFzc3dvcmRIYXNoKTtcbiAgICAgICAgaWYgKCFpc1Bhc3N3b3JkTWF0Y2gpIHtcbiAgICAgICAgICBzZW5kSnNvbihyZXMsIDQwMSwgeyBtZXNzYWdlOiAnSW52YWxpZCBlbWFpbCwgcGFzc3dvcmQsIG9yIHJvbGUuJyB9KTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1c2VyLnJvbGUgIT09IHJvbGUpIHtcbiAgICAgICAgICBzZW5kSnNvbihyZXMsIDQwMSwgeyBtZXNzYWdlOiAnSW52YWxpZCBlbWFpbCwgcGFzc3dvcmQsIG9yIHJvbGUuJyB9KTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRva2VuID0gand0LnNpZ24oXG4gICAgICAgICAge1xuICAgICAgICAgICAgdXNlcklkOiB1c2VyLl9pZC50b1N0cmluZygpLFxuICAgICAgICAgICAgcm9sZTogdXNlci5yb2xlLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgSldUX1NFQ1JFVCxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBleHBpcmVzSW46ICcyNGgnLFxuICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICBzZW5kSnNvbihyZXMsIDIwMCwge1xuICAgICAgICAgIHRva2VuLFxuICAgICAgICAgIHVzZXI6IHtcbiAgICAgICAgICAgIGlkOiB1c2VyLl9pZC50b1N0cmluZygpLFxuICAgICAgICAgICAgbmFtZTogdXNlci5uYW1lLFxuICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICAgICAgICByb2xlOiB1c2VyLnJvbGUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB1c2VyID0gaW5NZW1vcnlVc2Vycy5nZXQobm9ybWFsaXplZEVtYWlsKTtcbiAgICAgIGlmICghdXNlcikge1xuICAgICAgICBzZW5kSnNvbihyZXMsIDQwMSwgeyBtZXNzYWdlOiAnSW52YWxpZCBlbWFpbCwgcGFzc3dvcmQsIG9yIHJvbGUuJyB9KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGlzUGFzc3dvcmRNYXRjaCA9IGF3YWl0IGJjcnlwdC5jb21wYXJlKHBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkSGFzaCk7XG4gICAgICBpZiAoIWlzUGFzc3dvcmRNYXRjaCkge1xuICAgICAgICBzZW5kSnNvbihyZXMsIDQwMSwgeyBtZXNzYWdlOiAnSW52YWxpZCBlbWFpbCwgcGFzc3dvcmQsIG9yIHJvbGUuJyB9KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh1c2VyLnJvbGUgIT09IHJvbGUpIHtcbiAgICAgICAgc2VuZEpzb24ocmVzLCA0MDEsIHsgbWVzc2FnZTogJ0ludmFsaWQgZW1haWwsIHBhc3N3b3JkLCBvciByb2xlLicgfSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB0b2tlbiA9IGp3dC5zaWduKFxuICAgICAgICB7XG4gICAgICAgICAgdXNlcklkOiB1c2VyLmlkLFxuICAgICAgICAgIHJvbGU6IHVzZXIucm9sZSxcbiAgICAgICAgfSxcbiAgICAgICAgSldUX1NFQ1JFVCxcbiAgICAgICAge1xuICAgICAgICAgIGV4cGlyZXNJbjogJzI0aCcsXG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICAgIHNlbmRKc29uKHJlcywgMjAwLCB7XG4gICAgICAgIHRva2VuLFxuICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgaWQ6IHVzZXIuaWQsXG4gICAgICAgICAgbmFtZTogdXNlci5uYW1lLFxuICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICAgIHJvbGU6IHVzZXIucm9sZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCB7XG4gICAgICBzZW5kSnNvbihyZXMsIDUwMCwgeyBtZXNzYWdlOiAnSW50ZXJuYWwgc2VydmVyIGVycm9yJyB9KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJvdXRlOiBHRVQgL2FwaS9wcm9maWxlXG4gIGlmICh1cmwgPT09ICcvYXBpL3Byb2ZpbGUnICYmIHJlcS5tZXRob2QgPT09ICdHRVQnKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGF1dGggPSBhd2FpdCBhdXRoZW50aWNhdGUocmVxKTtcbiAgICAgIGlmICghYXV0aCkge1xuICAgICAgICBzZW5kSnNvbihyZXMsIDQwMSwgeyBtZXNzYWdlOiAnVW5hdXRob3JpemVkJyB9KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGNvbnN0IG1vbmdvUmVhZHkgPSBhd2FpdCBjb25uZWN0VG9EYXRhYmFzZSgpO1xuICAgICAgaWYgKCFtb25nb1JlYWR5KSB7XG4gICAgICAgIHNlbmRKc29uKHJlcywgNTAzLCB7IG1lc3NhZ2U6ICdEYXRhYmFzZSB1bmF2YWlsYWJsZScgfSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBsZXQgcHJvZmlsZSA9IG51bGw7XG4gICAgICBpZiAoYXV0aC5yb2xlID09PSAnc3R1ZGVudCcpIHByb2ZpbGUgPSBhd2FpdCBTdHVkZW50UHJvZmlsZU1vZGVsLmZpbmRPbmUoeyB1c2VySWQ6IGF1dGgudXNlcklkIH0pO1xuICAgICAgZWxzZSBpZiAoYXV0aC5yb2xlID09PSAndGVhY2hlcicpIHByb2ZpbGUgPSBhd2FpdCBUZWFjaGVyUHJvZmlsZU1vZGVsLmZpbmRPbmUoeyB1c2VySWQ6IGF1dGgudXNlcklkIH0pO1xuICAgICAgZWxzZSBpZiAoYXV0aC5yb2xlID09PSAnYWRtaW4nKSBwcm9maWxlID0gYXdhaXQgQWRtaW5Qcm9maWxlTW9kZWwuZmluZE9uZSh7IHVzZXJJZDogYXV0aC51c2VySWQgfSk7XG5cbiAgICAgIGlmICghcHJvZmlsZSkge1xuICAgICAgICBzZW5kSnNvbihyZXMsIDQwNCwgeyBtZXNzYWdlOiAnUHJvZmlsZSBub3QgZm91bmQnIH0pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgc2VuZEpzb24ocmVzLCAyMDAsIHsgcHJvZmlsZSB9KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgc2VuZEpzb24ocmVzLCA1MDAsIHsgbWVzc2FnZTogJ0ludGVybmFsIHNlcnZlciBlcnJvcicgfSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvLyBSb3V0ZTogUE9TVCAvYXBpL3Byb2ZpbGVcbiAgaWYgKHVybCA9PT0gJy9hcGkvcHJvZmlsZScgJiYgcmVxLm1ldGhvZCA9PT0gJ1BPU1QnKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGF1dGggPSBhd2FpdCBhdXRoZW50aWNhdGUocmVxKTtcbiAgICAgIGlmICghYXV0aCkge1xuICAgICAgICBzZW5kSnNvbihyZXMsIDQwMSwgeyBtZXNzYWdlOiAnVW5hdXRob3JpemVkJyB9KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGNvbnN0IG1vbmdvUmVhZHkgPSBhd2FpdCBjb25uZWN0VG9EYXRhYmFzZSgpO1xuICAgICAgaWYgKCFtb25nb1JlYWR5KSB7XG4gICAgICAgIHNlbmRKc29uKHJlcywgNTAzLCB7IG1lc3NhZ2U6ICdEYXRhYmFzZSB1bmF2YWlsYWJsZScgfSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBib2R5ID0gYXdhaXQgcGFyc2VKc29uQm9keShyZXEpO1xuICAgICAgXG4gICAgICBsZXQgcHJvZmlsZSA9IG51bGw7XG4gICAgICBpZiAoYXV0aC5yb2xlID09PSAnc3R1ZGVudCcpIHtcbiAgICAgICAgY29uc3QgZXhpc3RpbmcgPSBhd2FpdCBTdHVkZW50UHJvZmlsZU1vZGVsLmZpbmRPbmUoeyB1c2VySWQ6IGF1dGgudXNlcklkIH0pO1xuICAgICAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgICAgICBzZW5kSnNvbihyZXMsIDQwMCwgeyBtZXNzYWdlOiAnUHJvZmlsZSBhbHJlYWR5IGV4aXN0cycgfSk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcHJvZmlsZSA9IGF3YWl0IFN0dWRlbnRQcm9maWxlTW9kZWwuY3JlYXRlKHtcbiAgICAgICAgICB1c2VySWQ6IGF1dGgudXNlcklkLFxuICAgICAgICAgIGRvYjogYm9keS5kb2IgPyBuZXcgRGF0ZShib2R5LmRvYikgOiB1bmRlZmluZWQsXG4gICAgICAgICAgY29uc2VudDogYm9keS5jb25zZW50IHx8IGZhbHNlLFxuICAgICAgICAgIHByb2ZpbGU6IGJvZHkucHJvZmlsZSB8fCB7fVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoYXV0aC5yb2xlID09PSAndGVhY2hlcicpIHtcbiAgICAgICAgY29uc3QgZXhpc3RpbmcgPSBhd2FpdCBUZWFjaGVyUHJvZmlsZU1vZGVsLmZpbmRPbmUoeyB1c2VySWQ6IGF1dGgudXNlcklkIH0pO1xuICAgICAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgICAgICBzZW5kSnNvbihyZXMsIDQwMCwgeyBtZXNzYWdlOiAnUHJvZmlsZSBhbHJlYWR5IGV4aXN0cycgfSk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFib2R5LmVtcGxveWVlSWQpIHtcbiAgICAgICAgICBzZW5kSnNvbihyZXMsIDQwMCwgeyBtZXNzYWdlOiAnZW1wbG95ZWVJZCBpcyByZXF1aXJlZCBmb3IgdGVhY2hlcnMnIH0pO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHByb2ZpbGUgPSBhd2FpdCBUZWFjaGVyUHJvZmlsZU1vZGVsLmNyZWF0ZSh7XG4gICAgICAgICAgdXNlcklkOiBhdXRoLnVzZXJJZCxcbiAgICAgICAgICBlbXBsb3llZUlkOiBib2R5LmVtcGxveWVlSWRcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKGF1dGgucm9sZSA9PT0gJ2FkbWluJykge1xuICAgICAgICBjb25zdCBleGlzdGluZyA9IGF3YWl0IEFkbWluUHJvZmlsZU1vZGVsLmZpbmRPbmUoeyB1c2VySWQ6IGF1dGgudXNlcklkIH0pO1xuICAgICAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgICAgICBzZW5kSnNvbihyZXMsIDQwMCwgeyBtZXNzYWdlOiAnUHJvZmlsZSBhbHJlYWR5IGV4aXN0cycgfSk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFib2R5LmVtcGxveWVlSWQpIHtcbiAgICAgICAgICBzZW5kSnNvbihyZXMsIDQwMCwgeyBtZXNzYWdlOiAnZW1wbG95ZWVJZCBpcyByZXF1aXJlZCBmb3IgYWRtaW5zJyB9KTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBwcm9maWxlID0gYXdhaXQgQWRtaW5Qcm9maWxlTW9kZWwuY3JlYXRlKHtcbiAgICAgICAgICB1c2VySWQ6IGF1dGgudXNlcklkLFxuICAgICAgICAgIGVtcGxveWVlSWQ6IGJvZHkuZW1wbG95ZWVJZFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgc2VuZEpzb24ocmVzLCAyMDEsIHsgbWVzc2FnZTogJ1Byb2ZpbGUgY3JlYXRlZCcsIHByb2ZpbGUgfSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgaWYgKGVyci5jb2RlID09PSAxMTAwMCkgeyAvLyBkdXBsaWNhdGUga2V5IGVycm9yXG4gICAgICAgIHNlbmRKc29uKHJlcywgNDAwLCB7IG1lc3NhZ2U6ICdQcm9maWxlIG9yIHVuaXF1ZSBmaWVsZCBhbHJlYWR5IGV4aXN0cycgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZW5kSnNvbihyZXMsIDUwMCwgeyBtZXNzYWdlOiAnSW50ZXJuYWwgc2VydmVyIGVycm9yJywgZXJyb3I6IGVyci5tZXNzYWdlIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgLy8gUm91dGU6IFBVVCAvYXBpL3Byb2ZpbGVcbiAgaWYgKHVybCA9PT0gJy9hcGkvcHJvZmlsZScgJiYgcmVxLm1ldGhvZCA9PT0gJ1BVVCcpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgYXV0aCA9IGF3YWl0IGF1dGhlbnRpY2F0ZShyZXEpO1xuICAgICAgaWYgKCFhdXRoKSB7XG4gICAgICAgIHNlbmRKc29uKHJlcywgNDAxLCB7IG1lc3NhZ2U6ICdVbmF1dGhvcml6ZWQnIH0pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgY29uc3QgbW9uZ29SZWFkeSA9IGF3YWl0IGNvbm5lY3RUb0RhdGFiYXNlKCk7XG4gICAgICBpZiAoIW1vbmdvUmVhZHkpIHtcbiAgICAgICAgc2VuZEpzb24ocmVzLCA1MDMsIHsgbWVzc2FnZTogJ0RhdGFiYXNlIHVuYXZhaWxhYmxlJyB9KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCBwYXJzZUpzb25Cb2R5KHJlcSk7XG4gICAgICBcbiAgICAgIGxldCBwcm9maWxlID0gbnVsbDtcbiAgICAgIGlmIChhdXRoLnJvbGUgPT09ICdzdHVkZW50Jykge1xuICAgICAgICBwcm9maWxlID0gYXdhaXQgU3R1ZGVudFByb2ZpbGVNb2RlbC5maW5kT25lQW5kVXBkYXRlKFxuICAgICAgICAgIHsgdXNlcklkOiBhdXRoLnVzZXJJZCB9LFxuICAgICAgICAgIHsgJHNldDogYm9keSB9LFxuICAgICAgICAgIHsgbmV3OiB0cnVlLCBydW5WYWxpZGF0b3JzOiB0cnVlIH1cbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoYXV0aC5yb2xlID09PSAndGVhY2hlcicpIHtcbiAgICAgICAgcHJvZmlsZSA9IGF3YWl0IFRlYWNoZXJQcm9maWxlTW9kZWwuZmluZE9uZUFuZFVwZGF0ZShcbiAgICAgICAgICB7IHVzZXJJZDogYXV0aC51c2VySWQgfSxcbiAgICAgICAgICB7ICRzZXQ6IGJvZHkgfSxcbiAgICAgICAgICB7IG5ldzogdHJ1ZSwgcnVuVmFsaWRhdG9yczogdHJ1ZSB9XG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKGF1dGgucm9sZSA9PT0gJ2FkbWluJykge1xuICAgICAgICBwcm9maWxlID0gYXdhaXQgQWRtaW5Qcm9maWxlTW9kZWwuZmluZE9uZUFuZFVwZGF0ZShcbiAgICAgICAgICB7IHVzZXJJZDogYXV0aC51c2VySWQgfSxcbiAgICAgICAgICB7ICRzZXQ6IGJvZHkgfSxcbiAgICAgICAgICB7IG5ldzogdHJ1ZSwgcnVuVmFsaWRhdG9yczogdHJ1ZSB9XG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlmICghcHJvZmlsZSkge1xuICAgICAgICBzZW5kSnNvbihyZXMsIDQwNCwgeyBtZXNzYWdlOiAnUHJvZmlsZSBub3QgZm91bmQgdG8gdXBkYXRlJyB9KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHNlbmRKc29uKHJlcywgMjAwLCB7IG1lc3NhZ2U6ICdQcm9maWxlIHVwZGF0ZWQnLCBwcm9maWxlIH0pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgIHNlbmRKc29uKHJlcywgNTAwLCB7IG1lc3NhZ2U6ICdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InLCBlcnJvcjogZXJyLm1lc3NhZ2UgfSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHBlZ2dhXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcbW9ja1xcXFxwcm9qZWN0XFxcXHNyY1xcXFxzZXJ2ZXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHBlZ2dhXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcbW9ja1xcXFxwcm9qZWN0XFxcXHNyY1xcXFxzZXJ2ZXJcXFxcZGIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3BlZ2dhL09uZURyaXZlL0Rlc2t0b3AvbW9jay9wcm9qZWN0L3NyYy9zZXJ2ZXIvZGIudHNcIjtpbXBvcnQgZG5zIGZyb20gJ25vZGU6ZG5zJztcclxuaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcclxuaW1wb3J0IGRvdGVudiBmcm9tICdkb3RlbnYnO1xyXG5cclxuZG90ZW52LmNvbmZpZygpO1xyXG5cclxuLy8gRW5zdXJlIE5vZGUncyBjLWFyZXMgcmVzb2x2ZXIgcmVzb2x2ZXMgTW9uZ29EQiBBdGxhcyBTUlYgcmVjb3JkcyByZWxpYWJseSBvbiBXaW5kb3dzXHJcbnRyeSB7XHJcbiAgZG5zLnNldFNlcnZlcnMoWyc4LjguOC44JywgJzEuMS4xLjEnXSk7XHJcbn0gY2F0Y2gge1xyXG4gIC8vIEZhbGxiYWNrIHRvIGRlZmF1bHQgRE5TIGlmIGN1c3RvbSBzZXJ2ZXIgc2V0dGluZyBpcyByZXN0cmljdGVkXHJcbn1cclxuXHJcbmxldCBpc0Nvbm5lY3RlZCA9IGZhbHNlO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbm5lY3RUb0RhdGFiYXNlKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gIC8vIFJlbG9hZCAuZW52IHNvIHVwZGF0ZXMgdGFrZSBlZmZlY3RcclxuICBkb3RlbnYuY29uZmlnKHsgb3ZlcnJpZGU6IHRydWUgfSk7XHJcblxyXG4gIGlmIChpc0Nvbm5lY3RlZCAmJiBtb25nb29zZS5jb25uZWN0aW9uLnJlYWR5U3RhdGUgPT09IDEpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbW9uZ29VcmkgPSBwcm9jZXNzLmVudi5NT05HT0RCX1VSST8udHJpbSgpO1xyXG5cclxuICBpZiAoIW1vbmdvVXJpKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgZGIgPSBhd2FpdCBtb25nb29zZS5jb25uZWN0KG1vbmdvVXJpLCB7XHJcbiAgICAgIGRiTmFtZTogJ2Rpa3NoYScsXHJcbiAgICAgIHNlcnZlclNlbGVjdGlvblRpbWVvdXRNUzogODAwMCxcclxuICAgIH0pO1xyXG5cclxuICAgIGlzQ29ubmVjdGVkID0gZGIuY29ubmVjdGlvbi5yZWFkeVN0YXRlID09PSAxO1xyXG4gICAgY29uc29sZS5sb2coJ1x1MjcwNSBTdWNjZXNzZnVsbHkgY29ubmVjdGVkIHRvIE1vbmdvREIgQXRsYXMuIERhdGFiYXNlOicsIGRiLmNvbm5lY3Rpb24ubmFtZSk7XHJcblxyXG4gICAgLy8gU2VlZCBpbml0aWFsIGNvbGxlY3Rpb25zIGludG8gTW9uZ29EQiBBdGxhc1xyXG4gICAgY29uc3QgeyBzZWVkQWxsQ29sbGVjdGlvbnMgfSA9IGF3YWl0IGltcG9ydCgnLi9zZWVkRGF0YWJhc2UuanMnKTtcclxuICAgIGF3YWl0IHNlZWRBbGxDb2xsZWN0aW9ucygpO1xyXG5cclxuICAgIHJldHVybiBpc0Nvbm5lY3RlZDtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcignXHUyNzRDIE1vbmdvREIgY29ubmVjdGlvbiBlcnJvcjonLCAoZXJyb3IgYXMgRXJyb3IpLm1lc3NhZ2UpO1xyXG4gICAgaXNDb25uZWN0ZWQgPSBmYWxzZTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc01vbmdvQ29ubmVjdGVkKCk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiBpc0Nvbm5lY3RlZCAmJiBtb25nb29zZS5jb25uZWN0aW9uLnJlYWR5U3RhdGUgPT09IDE7XHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwZWdnYVxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXG1vY2tcXFxccHJvamVjdFxcXFxzcmNcXFxcc2VydmVyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwZWdnYVxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXG1vY2tcXFxccHJvamVjdFxcXFxzcmNcXFxcc2VydmVyXFxcXGN1cnJpY3VsdW1IYW5kbGVyLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9wZWdnYS9PbmVEcml2ZS9EZXNrdG9wL21vY2svcHJvamVjdC9zcmMvc2VydmVyL2N1cnJpY3VsdW1IYW5kbGVyLnRzXCI7aW1wb3J0IHR5cGUgeyBJbmNvbWluZ01lc3NhZ2UsIFNlcnZlclJlc3BvbnNlIH0gZnJvbSAnbm9kZTpodHRwJztcclxuaW1wb3J0IHsgY29ubmVjdFRvRGF0YWJhc2UgfSBmcm9tICcuL2RiLmpzJztcclxuaW1wb3J0IFByb2dyYW1Nb2RlbCBmcm9tICcuL21vZGVscy9Qcm9ncmFtLmpzJztcclxuaW1wb3J0IENvaG9ydE1vZGVsIGZyb20gJy4vbW9kZWxzL0NvaG9ydC5qcyc7XHJcbmltcG9ydCBTdWJqZWN0TW9kZWwgZnJvbSAnLi9tb2RlbHMvU3ViamVjdC5qcyc7XHJcbmltcG9ydCBNb2R1bGVNb2RlbCBmcm9tICcuL21vZGVscy9Nb2R1bGUuanMnO1xyXG5pbXBvcnQgQ29udGVudEl0ZW1Nb2RlbCBmcm9tICcuL21vZGVscy9Db250ZW50SXRlbS5qcyc7XHJcbmltcG9ydCBTdHVkZW50UHJvZmlsZU1vZGVsIGZyb20gJy4vbW9kZWxzL1N0dWRlbnRQcm9maWxlLnRzJztcclxuXHJcbmZ1bmN0aW9uIHBhcnNlSnNvbkJvZHkocmVxOiBJbmNvbWluZ01lc3NhZ2UpOiBQcm9taXNlPGFueT4ge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICBsZXQgYm9keSA9ICcnO1xyXG4gICAgcmVxLm9uKCdkYXRhJywgKGNodW5rKSA9PiB7XHJcbiAgICAgIGJvZHkgKz0gY2h1bms7XHJcbiAgICB9KTtcclxuICAgIHJlcS5vbignZW5kJywgKCkgPT4ge1xyXG4gICAgICBpZiAoIWJvZHkpIHtcclxuICAgICAgICByZXNvbHZlKHt9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgdHJ5IHtcclxuICAgICAgICByZXNvbHZlKEpTT04ucGFyc2UoYm9keSkpO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXEub24oJ2Vycm9yJywgKGVycikgPT4gcmVqZWN0KGVycikpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZW5kSnNvbihyZXM6IFNlcnZlclJlc3BvbnNlLCBzdGF0dXNDb2RlOiBudW1iZXIsIGRhdGE6IGFueSkge1xyXG4gIHJlcy5zdGF0dXNDb2RlID0gc3RhdHVzQ29kZTtcclxuICByZXMuc2V0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xyXG4gIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBleHRyYWN0UGFyYW1zKHVybDogc3RyaW5nLCBwcmVmaXg6IHN0cmluZyk6IHsgcGF0aDogc3RyaW5nOyBpZD86IHN0cmluZzsgYWN0aW9uPzogc3RyaW5nIH0ge1xyXG4gIGNvbnN0IGNsZWFuVXJsID0gdXJsLnNwbGl0KCc/JylbMF07XHJcbiAgY29uc3QgcmVsYXRpdmUgPSBjbGVhblVybC5yZXBsYWNlKHByZWZpeCwgJycpO1xyXG4gIGNvbnN0IHBhcnRzID0gcmVsYXRpdmUuc3BsaXQoJy8nKS5maWx0ZXIoQm9vbGVhbik7XHJcbiAgcmV0dXJuIHtcclxuICAgIHBhdGg6IHBhcnRzWzBdIHx8ICcnLFxyXG4gICAgaWQ6IHBhcnRzWzBdICYmIHBhcnRzWzBdICE9PSAnYXNzaWduLXN0dWRlbnRzJyA/IHBhcnRzWzBdIDogdW5kZWZpbmVkLFxyXG4gICAgYWN0aW9uOiBwYXJ0c1sxXSxcclxuICB9O1xyXG59XHJcblxyXG4vKipcclxuICogQ3VycmljdWx1bSBIYW5kbGVyIGZvciBNZW1iZXIgMjogQ3VycmljdWx1bSAmIEFyY2hpdGVjdHVyZVxyXG4gKiBIYW5kbGVzIEFQSSByZXF1ZXN0cyB1bmRlciAvYXBpL2N1cnJpY3VsdW0vIGZvcjpcclxuICogIC0gUHJvZ3JhbXMgKGNyZWF0ZSwgcmVhZCwgdXBkYXRlLCBkZWxldGUpXHJcbiAqICAtIENvaG9ydHMgKGNyZWF0ZSwgcmVhZCwgdXBkYXRlLCBkZWxldGUsIHN0dWRlbnQgYXNzaWdubWVudClcclxuICogIC0gU3ViamVjdHMgKGNyZWF0ZSwgcmVhZCwgdXBkYXRlLCBkZWxldGUpXHJcbiAqICAtIE1vZHVsZXMgKGNyZWF0ZSwgcmVhZCwgdXBkYXRlLCBkZWxldGUpXHJcbiAqICAtIENvbnRlbnQgSXRlbXMgKGNyZWF0ZSwgcmVhZCwgdXBkYXRlLCBkZWxldGUpXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlQ3VycmljdWx1bVJlcXVlc3QocmVxOiBJbmNvbWluZ01lc3NhZ2UsIHJlczogU2VydmVyUmVzcG9uc2UpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICBjb25zdCByYXdVcmwgPSByZXEudXJsIHx8ICcnO1xyXG4gIGlmICghcmF3VXJsLnN0YXJ0c1dpdGgoJy9hcGkvY3VycmljdWx1bScpKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBjb25zdCBjb25uZWN0ZWQgPSBhd2FpdCBjb25uZWN0VG9EYXRhYmFzZSgpO1xyXG4gIGlmICghY29ubmVjdGVkKSB7XHJcbiAgICBzZW5kSnNvbihyZXMsIDUwMywgeyBtZXNzYWdlOiAnRGF0YWJhc2UgY29ubmVjdGlvbiB1bmF2YWlsYWJsZScgfSk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHVybE9iaiA9IG5ldyBVUkwocmF3VXJsLCAnaHR0cDovL2xvY2FsaG9zdCcpO1xyXG4gIGNvbnN0IHBhdGhuYW1lID0gdXJsT2JqLnBhdGhuYW1lO1xyXG4gIGNvbnN0IHNlYXJjaFBhcmFtcyA9IHVybE9iai5zZWFyY2hQYXJhbXM7XHJcblxyXG4gIHRyeSB7XHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyAxLiBQUk9HUkFNUyBBUEkgKC9hcGkvY3VycmljdWx1bS9wcm9ncmFtcylcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIGlmIChwYXRobmFtZS5zdGFydHNXaXRoKCcvYXBpL2N1cnJpY3VsdW0vcHJvZ3JhbXMnKSkge1xyXG4gICAgICBjb25zdCBwYXJ0cyA9IHBhdGhuYW1lLnJlcGxhY2UoJy9hcGkvY3VycmljdWx1bS9wcm9ncmFtcycsICcnKS5zcGxpdCgnLycpLmZpbHRlcihCb29sZWFuKTtcclxuICAgICAgY29uc3QgcHJvZ3JhbUlkID0gcGFydHNbMF07XHJcblxyXG4gICAgICAvLyBHRVQgL2FwaS9jdXJyaWN1bHVtL3Byb2dyYW1zXHJcbiAgICAgIGlmIChyZXEubWV0aG9kID09PSAnR0VUJyAmJiAhcHJvZ3JhbUlkKSB7XHJcbiAgICAgICAgY29uc3Qgc3RhdHVzRmlsdGVyID0gc2VhcmNoUGFyYW1zLmdldCgnc3RhdHVzJyk7XHJcbiAgICAgICAgY29uc3QgcXVlcnkgPSBzdGF0dXNGaWx0ZXIgPyB7IHN0YXR1czogc3RhdHVzRmlsdGVyIH0gOiB7fTtcclxuICAgICAgICBjb25zdCBwcm9ncmFtcyA9IGF3YWl0IFByb2dyYW1Nb2RlbC5maW5kKHF1ZXJ5KVxyXG4gICAgICAgICAgLnBvcHVsYXRlKCdjb2hvcnRJZHMnKVxyXG4gICAgICAgICAgLnBvcHVsYXRlKCdzdWJqZWN0SWRzJylcclxuICAgICAgICAgIC5zb3J0KHsgY3JlYXRlZEF0OiAtMSB9KTtcclxuICAgICAgICBzZW5kSnNvbihyZXMsIDIwMCwgeyBkYXRhOiBwcm9ncmFtcyB9KTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gR0VUIC9hcGkvY3VycmljdWx1bS9wcm9ncmFtcy86aWRcclxuICAgICAgaWYgKHJlcS5tZXRob2QgPT09ICdHRVQnICYmIHByb2dyYW1JZCkge1xyXG4gICAgICAgIGNvbnN0IHByb2dyYW0gPSBhd2FpdCBQcm9ncmFtTW9kZWwuZmluZEJ5SWQocHJvZ3JhbUlkKVxyXG4gICAgICAgICAgLnBvcHVsYXRlKCdjb2hvcnRJZHMnKVxyXG4gICAgICAgICAgLnBvcHVsYXRlKCdzdWJqZWN0SWRzJyk7XHJcbiAgICAgICAgaWYgKCFwcm9ncmFtKSB7XHJcbiAgICAgICAgICBzZW5kSnNvbihyZXMsIDQwNCwgeyBtZXNzYWdlOiAnUHJvZ3JhbSBub3QgZm91bmQnIH0pO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbmRKc29uKHJlcywgMjAwLCB7IGRhdGE6IHByb2dyYW0gfSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFBPU1QgL2FwaS9jdXJyaWN1bHVtL3Byb2dyYW1zXHJcbiAgICAgIGlmIChyZXEubWV0aG9kID09PSAnUE9TVCcgJiYgIXByb2dyYW1JZCkge1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCBwYXJzZUpzb25Cb2R5KHJlcSk7XHJcbiAgICAgICAgY29uc3QgeyBuYW1lLCBkZXNjcmlwdGlvbiwgc3RhdHVzIH0gPSBib2R5O1xyXG5cclxuICAgICAgICBpZiAoIW5hbWUgfHwgdHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnIHx8ICFuYW1lLnRyaW0oKSkge1xyXG4gICAgICAgICAgc2VuZEpzb24ocmVzLCA0MDAsIHsgbWVzc2FnZTogJ1Byb2dyYW0gbmFtZSBpcyByZXF1aXJlZCcgfSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG5ld1Byb2dyYW0gPSBhd2FpdCBQcm9ncmFtTW9kZWwuY3JlYXRlKHtcclxuICAgICAgICAgIG5hbWU6IG5hbWUudHJpbSgpLFxyXG4gICAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uPy50cmltKCkgfHwgJycsXHJcbiAgICAgICAgICBzdGF0dXM6IHN0YXR1cyB8fCAnYWN0aXZlJyxcclxuICAgICAgICAgIGNvaG9ydElkczogW10sXHJcbiAgICAgICAgICBzdWJqZWN0SWRzOiBbXSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2VuZEpzb24ocmVzLCAyMDEsIHsgbWVzc2FnZTogJ1Byb2dyYW0gY3JlYXRlZCBzdWNjZXNzZnVsbHknLCBkYXRhOiBuZXdQcm9ncmFtIH0pO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBQVVQgL2FwaS9jdXJyaWN1bHVtL3Byb2dyYW1zLzppZFxyXG4gICAgICBpZiAocmVxLm1ldGhvZCA9PT0gJ1BVVCcgJiYgcHJvZ3JhbUlkKSB7XHJcbiAgICAgICAgY29uc3QgYm9keSA9IGF3YWl0IHBhcnNlSnNvbkJvZHkocmVxKTtcclxuICAgICAgICBjb25zdCB1cGRhdGVkID0gYXdhaXQgUHJvZ3JhbU1vZGVsLmZpbmRCeUlkQW5kVXBkYXRlKHByb2dyYW1JZCwgYm9keSwge1xyXG4gICAgICAgICAgbmV3OiB0cnVlLFxyXG4gICAgICAgICAgcnVuVmFsaWRhdG9yczogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXVwZGF0ZWQpIHtcclxuICAgICAgICAgIHNlbmRKc29uKHJlcywgNDA0LCB7IG1lc3NhZ2U6ICdQcm9ncmFtIG5vdCBmb3VuZCcgfSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VuZEpzb24ocmVzLCAyMDAsIHsgbWVzc2FnZTogJ1Byb2dyYW0gdXBkYXRlZCBzdWNjZXNzZnVsbHknLCBkYXRhOiB1cGRhdGVkIH0pO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBERUxFVEUgL2FwaS9jdXJyaWN1bHVtL3Byb2dyYW1zLzppZFxyXG4gICAgICBpZiAocmVxLm1ldGhvZCA9PT0gJ0RFTEVURScgJiYgcHJvZ3JhbUlkKSB7XHJcbiAgICAgICAgY29uc3QgZGVsZXRlZCA9IGF3YWl0IFByb2dyYW1Nb2RlbC5maW5kQnlJZEFuZERlbGV0ZShwcm9ncmFtSWQpO1xyXG4gICAgICAgIGlmICghZGVsZXRlZCkge1xyXG4gICAgICAgICAgc2VuZEpzb24ocmVzLCA0MDQsIHsgbWVzc2FnZTogJ1Byb2dyYW0gbm90IGZvdW5kJyB9KTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZW5kSnNvbihyZXMsIDIwMCwgeyBtZXNzYWdlOiAnUHJvZ3JhbSBkZWxldGVkIHN1Y2Nlc3NmdWxseScgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyAyLiBDT0hPUlRTIEFQSSAoL2FwaS9jdXJyaWN1bHVtL2NvaG9ydHMpXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBpZiAocGF0aG5hbWUuc3RhcnRzV2l0aCgnL2FwaS9jdXJyaWN1bHVtL2NvaG9ydHMnKSkge1xyXG4gICAgICBjb25zdCBwYXJ0cyA9IHBhdGhuYW1lLnJlcGxhY2UoJy9hcGkvY3VycmljdWx1bS9jb2hvcnRzJywgJycpLnNwbGl0KCcvJykuZmlsdGVyKEJvb2xlYW4pO1xyXG4gICAgICBjb25zdCBjb2hvcnRJZCA9IHBhcnRzWzBdO1xyXG4gICAgICBjb25zdCBhY3Rpb24gPSBwYXJ0c1sxXTtcclxuXHJcbiAgICAgIC8vIFBPU1QgL2FwaS9jdXJyaWN1bHVtL2NvaG9ydHMvOmlkL2Fzc2lnbi1zdHVkZW50c1xyXG4gICAgICBpZiAocmVxLm1ldGhvZCA9PT0gJ1BPU1QnICYmIGNvaG9ydElkICYmIGFjdGlvbiA9PT0gJ2Fzc2lnbi1zdHVkZW50cycpIHtcclxuICAgICAgICBjb25zdCBib2R5ID0gYXdhaXQgcGFyc2VKc29uQm9keShyZXEpO1xyXG4gICAgICAgIGNvbnN0IHsgc3R1ZGVudElkcyB9ID0gYm9keTtcclxuXHJcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHN0dWRlbnRJZHMpKSB7XHJcbiAgICAgICAgICBzZW5kSnNvbihyZXMsIDQwMCwgeyBtZXNzYWdlOiAnc3R1ZGVudElkcyBtdXN0IGJlIGFuIGFycmF5IG9mIFN0dWRlbnQgSURzJyB9KTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY29ob3J0ID0gYXdhaXQgQ29ob3J0TW9kZWwuZmluZEJ5SWQoY29ob3J0SWQpO1xyXG4gICAgICAgIGlmICghY29ob3J0KSB7XHJcbiAgICAgICAgICBzZW5kSnNvbihyZXMsIDQwNCwgeyBtZXNzYWdlOiAnQ29ob3J0IG5vdCBmb3VuZCcgfSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSBzdHVkZW50IHByb2ZpbGVzIHdpdGggbmV3IGNvaG9ydElkXHJcbiAgICAgICAgYXdhaXQgU3R1ZGVudFByb2ZpbGVNb2RlbC51cGRhdGVNYW55KFxyXG4gICAgICAgICAgeyBfaWQ6IHsgJGluOiBzdHVkZW50SWRzIH0gfSxcclxuICAgICAgICAgIHsgJHNldDogeyBjb2hvcnRJZDogY29ob3J0Ll9pZCB9IH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgY291bnQgb2Ygc3R1ZGVudHMgaW4gY29ob3J0XHJcbiAgICAgICAgY29uc3QgdG90YWxFbnJvbGxlZCA9IGF3YWl0IFN0dWRlbnRQcm9maWxlTW9kZWwuY291bnREb2N1bWVudHMoeyBjb2hvcnRJZDogY29ob3J0Ll9pZCB9KTtcclxuICAgICAgICBjb2hvcnQuc3R1ZGVudENvdW50ID0gdG90YWxFbnJvbGxlZDtcclxuICAgICAgICBhd2FpdCBjb2hvcnQuc2F2ZSgpO1xyXG5cclxuICAgICAgICBzZW5kSnNvbihyZXMsIDIwMCwge1xyXG4gICAgICAgICAgbWVzc2FnZTogYEFzc2lnbmVkICR7c3R1ZGVudElkcy5sZW5ndGh9IHN0dWRlbnRzIHRvIGNvaG9ydCAke2NvaG9ydC5uYW1lfWAsXHJcbiAgICAgICAgICBkYXRhOiBjb2hvcnQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEdFVCAvYXBpL2N1cnJpY3VsdW0vY29ob3J0c1xyXG4gICAgICBpZiAocmVxLm1ldGhvZCA9PT0gJ0dFVCcgJiYgIWNvaG9ydElkKSB7XHJcbiAgICAgICAgY29uc3QgcHJvZ3JhbUlkRmlsdGVyID0gc2VhcmNoUGFyYW1zLmdldCgncHJvZ3JhbUlkJyk7XHJcbiAgICAgICAgY29uc3QgcXVlcnkgPSBwcm9ncmFtSWRGaWx0ZXIgPyB7IHByb2dyYW1JZDogcHJvZ3JhbUlkRmlsdGVyIH0gOiB7fTtcclxuICAgICAgICBjb25zdCBjb2hvcnRzID0gYXdhaXQgQ29ob3J0TW9kZWwuZmluZChxdWVyeSkucG9wdWxhdGUoJ3Byb2dyYW1JZCcpLnNvcnQoeyBjcmVhdGVkQXQ6IC0xIH0pO1xyXG4gICAgICAgIHNlbmRKc29uKHJlcywgMjAwLCB7IGRhdGE6IGNvaG9ydHMgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEdFVCAvYXBpL2N1cnJpY3VsdW0vY29ob3J0cy86aWRcclxuICAgICAgaWYgKHJlcS5tZXRob2QgPT09ICdHRVQnICYmIGNvaG9ydElkKSB7XHJcbiAgICAgICAgY29uc3QgY29ob3J0ID0gYXdhaXQgQ29ob3J0TW9kZWwuZmluZEJ5SWQoY29ob3J0SWQpLnBvcHVsYXRlKCdwcm9ncmFtSWQnKTtcclxuICAgICAgICBpZiAoIWNvaG9ydCkge1xyXG4gICAgICAgICAgc2VuZEpzb24ocmVzLCA0MDQsIHsgbWVzc2FnZTogJ0NvaG9ydCBub3QgZm91bmQnIH0pO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbmRKc29uKHJlcywgMjAwLCB7IGRhdGE6IGNvaG9ydCB9KTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gUE9TVCAvYXBpL2N1cnJpY3VsdW0vY29ob3J0c1xyXG4gICAgICBpZiAocmVxLm1ldGhvZCA9PT0gJ1BPU1QnICYmICFjb2hvcnRJZCkge1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCBwYXJzZUpzb25Cb2R5KHJlcSk7XHJcbiAgICAgICAgY29uc3QgeyBuYW1lLCBwcm9ncmFtSWQgfSA9IGJvZHk7XHJcblxyXG4gICAgICAgIGlmICghbmFtZSB8fCB0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycgfHwgIW5hbWUudHJpbSgpKSB7XHJcbiAgICAgICAgICBzZW5kSnNvbihyZXMsIDQwMCwgeyBtZXNzYWdlOiAnQ29ob3J0IG5hbWUgaXMgcmVxdWlyZWQnIH0pO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXByb2dyYW1JZCkge1xyXG4gICAgICAgICAgc2VuZEpzb24ocmVzLCA0MDAsIHsgbWVzc2FnZTogJ3Byb2dyYW1JZCBpcyByZXF1aXJlZCcgfSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHByb2dyYW0gPSBhd2FpdCBQcm9ncmFtTW9kZWwuZmluZEJ5SWQocHJvZ3JhbUlkKTtcclxuICAgICAgICBpZiAoIXByb2dyYW0pIHtcclxuICAgICAgICAgIHNlbmRKc29uKHJlcywgNDA0LCB7IG1lc3NhZ2U6ICdSZWZlcmVuY2VkIHByb2dyYW0gbm90IGZvdW5kJyB9KTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbmV3Q29ob3J0ID0gYXdhaXQgQ29ob3J0TW9kZWwuY3JlYXRlKHtcclxuICAgICAgICAgIG5hbWU6IG5hbWUudHJpbSgpLFxyXG4gICAgICAgICAgcHJvZ3JhbUlkLFxyXG4gICAgICAgICAgc3R1ZGVudENvdW50OiAwLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBSZWdpc3RlciBjb2hvcnQgdW5kZXIgcHJvZ3JhbVxyXG4gICAgICAgIHByb2dyYW0uY29ob3J0SWRzLnB1c2gobmV3Q29ob3J0Ll9pZCk7XHJcbiAgICAgICAgYXdhaXQgcHJvZ3JhbS5zYXZlKCk7XHJcblxyXG4gICAgICAgIHNlbmRKc29uKHJlcywgMjAxLCB7IG1lc3NhZ2U6ICdDb2hvcnQgY3JlYXRlZCBzdWNjZXNzZnVsbHknLCBkYXRhOiBuZXdDb2hvcnQgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFBVVCAvYXBpL2N1cnJpY3VsdW0vY29ob3J0cy86aWRcclxuICAgICAgaWYgKHJlcS5tZXRob2QgPT09ICdQVVQnICYmIGNvaG9ydElkKSB7XHJcbiAgICAgICAgY29uc3QgYm9keSA9IGF3YWl0IHBhcnNlSnNvbkJvZHkocmVxKTtcclxuICAgICAgICBjb25zdCB1cGRhdGVkID0gYXdhaXQgQ29ob3J0TW9kZWwuZmluZEJ5SWRBbmRVcGRhdGUoY29ob3J0SWQsIGJvZHksIHtcclxuICAgICAgICAgIG5ldzogdHJ1ZSxcclxuICAgICAgICAgIHJ1blZhbGlkYXRvcnM6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCF1cGRhdGVkKSB7XHJcbiAgICAgICAgICBzZW5kSnNvbihyZXMsIDQwNCwgeyBtZXNzYWdlOiAnQ29ob3J0IG5vdCBmb3VuZCcgfSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VuZEpzb24ocmVzLCAyMDAsIHsgbWVzc2FnZTogJ0NvaG9ydCB1cGRhdGVkIHN1Y2Nlc3NmdWxseScsIGRhdGE6IHVwZGF0ZWQgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIERFTEVURSAvYXBpL2N1cnJpY3VsdW0vY29ob3J0cy86aWRcclxuICAgICAgaWYgKHJlcS5tZXRob2QgPT09ICdERUxFVEUnICYmIGNvaG9ydElkKSB7XHJcbiAgICAgICAgY29uc3QgZGVsZXRlZCA9IGF3YWl0IENvaG9ydE1vZGVsLmZpbmRCeUlkQW5kRGVsZXRlKGNvaG9ydElkKTtcclxuICAgICAgICBpZiAoIWRlbGV0ZWQpIHtcclxuICAgICAgICAgIHNlbmRKc29uKHJlcywgNDA0LCB7IG1lc3NhZ2U6ICdDb2hvcnQgbm90IGZvdW5kJyB9KTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBSZW1vdmUgZnJvbSBwcm9ncmFtIGNvaG9ydCBsaXN0XHJcbiAgICAgICAgYXdhaXQgUHJvZ3JhbU1vZGVsLmZpbmRCeUlkQW5kVXBkYXRlKGRlbGV0ZWQucHJvZ3JhbUlkLCB7XHJcbiAgICAgICAgICAkcHVsbDogeyBjb2hvcnRJZHM6IGRlbGV0ZWQuX2lkIH0sXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNlbmRKc29uKHJlcywgMjAwLCB7IG1lc3NhZ2U6ICdDb2hvcnQgZGVsZXRlZCBzdWNjZXNzZnVsbHknIH0pO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gMy4gU1VCSkVDVFMgQVBJICgvYXBpL2N1cnJpY3VsdW0vc3ViamVjdHMpXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBpZiAocGF0aG5hbWUuc3RhcnRzV2l0aCgnL2FwaS9jdXJyaWN1bHVtL3N1YmplY3RzJykpIHtcclxuICAgICAgY29uc3QgcGFydHMgPSBwYXRobmFtZS5yZXBsYWNlKCcvYXBpL2N1cnJpY3VsdW0vc3ViamVjdHMnLCAnJykuc3BsaXQoJy8nKS5maWx0ZXIoQm9vbGVhbik7XHJcbiAgICAgIGNvbnN0IHN1YmplY3RJZCA9IHBhcnRzWzBdO1xyXG5cclxuICAgICAgLy8gR0VUIC9hcGkvY3VycmljdWx1bS9zdWJqZWN0c1xyXG4gICAgICBpZiAocmVxLm1ldGhvZCA9PT0gJ0dFVCcgJiYgIXN1YmplY3RJZCkge1xyXG4gICAgICAgIGNvbnN0IHByb2dyYW1JZEZpbHRlciA9IHNlYXJjaFBhcmFtcy5nZXQoJ3Byb2dyYW1JZCcpO1xyXG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gcHJvZ3JhbUlkRmlsdGVyID8geyBwcm9ncmFtSWQ6IHByb2dyYW1JZEZpbHRlciB9IDoge307XHJcbiAgICAgICAgY29uc3Qgc3ViamVjdHMgPSBhd2FpdCBTdWJqZWN0TW9kZWwuZmluZChxdWVyeSlcclxuICAgICAgICAgIC5wb3B1bGF0ZSgncHJvZ3JhbUlkJylcclxuICAgICAgICAgIC5wb3B1bGF0ZSgnbW9kdWxlSWRzJylcclxuICAgICAgICAgIC5zb3J0KHsgY3JlYXRlZEF0OiAtMSB9KTtcclxuICAgICAgICBzZW5kSnNvbihyZXMsIDIwMCwgeyBkYXRhOiBzdWJqZWN0cyB9KTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gR0VUIC9hcGkvY3VycmljdWx1bS9zdWJqZWN0cy86aWRcclxuICAgICAgaWYgKHJlcS5tZXRob2QgPT09ICdHRVQnICYmIHN1YmplY3RJZCkge1xyXG4gICAgICAgIGNvbnN0IHN1YmplY3QgPSBhd2FpdCBTdWJqZWN0TW9kZWwuZmluZEJ5SWQoc3ViamVjdElkKVxyXG4gICAgICAgICAgLnBvcHVsYXRlKCdwcm9ncmFtSWQnKVxyXG4gICAgICAgICAgLnBvcHVsYXRlKCdtb2R1bGVJZHMnKTtcclxuICAgICAgICBpZiAoIXN1YmplY3QpIHtcclxuICAgICAgICAgIHNlbmRKc29uKHJlcywgNDA0LCB7IG1lc3NhZ2U6ICdTdWJqZWN0IG5vdCBmb3VuZCcgfSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VuZEpzb24ocmVzLCAyMDAsIHsgZGF0YTogc3ViamVjdCB9KTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gUE9TVCAvYXBpL2N1cnJpY3VsdW0vc3ViamVjdHNcclxuICAgICAgaWYgKHJlcS5tZXRob2QgPT09ICdQT1NUJyAmJiAhc3ViamVjdElkKSB7XHJcbiAgICAgICAgY29uc3QgYm9keSA9IGF3YWl0IHBhcnNlSnNvbkJvZHkocmVxKTtcclxuICAgICAgICBjb25zdCB7IG5hbWUsIGRlc2NyaXB0aW9uLCBwcm9ncmFtSWQsIHN0YXR1cyB9ID0gYm9keTtcclxuXHJcbiAgICAgICAgaWYgKCFuYW1lIHx8IHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJyB8fCAhbmFtZS50cmltKCkpIHtcclxuICAgICAgICAgIHNlbmRKc29uKHJlcywgNDAwLCB7IG1lc3NhZ2U6ICdTdWJqZWN0IG5hbWUgaXMgcmVxdWlyZWQnIH0pO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXByb2dyYW1JZCkge1xyXG4gICAgICAgICAgc2VuZEpzb24ocmVzLCA0MDAsIHsgbWVzc2FnZTogJ3Byb2dyYW1JZCBpcyByZXF1aXJlZCcgfSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHByb2dyYW0gPSBhd2FpdCBQcm9ncmFtTW9kZWwuZmluZEJ5SWQocHJvZ3JhbUlkKTtcclxuICAgICAgICBpZiAoIXByb2dyYW0pIHtcclxuICAgICAgICAgIHNlbmRKc29uKHJlcywgNDA0LCB7IG1lc3NhZ2U6ICdSZWZlcmVuY2VkIHByb2dyYW0gbm90IGZvdW5kJyB9KTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbmV3U3ViamVjdCA9IGF3YWl0IFN1YmplY3RNb2RlbC5jcmVhdGUoe1xyXG4gICAgICAgICAgbmFtZTogbmFtZS50cmltKCksXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24/LnRyaW0oKSB8fCAnJyxcclxuICAgICAgICAgIHByb2dyYW1JZCxcclxuICAgICAgICAgIHN0YXR1czogc3RhdHVzIHx8ICdEUkFGVCcsXHJcbiAgICAgICAgICBtb2R1bGVJZHM6IFtdLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBBZGQgdG8gcHJvZ3JhbSdzIHN1YmplY3RJZHMgYXJyYXlcclxuICAgICAgICBwcm9ncmFtLnN1YmplY3RJZHMucHVzaChuZXdTdWJqZWN0Ll9pZCk7XHJcbiAgICAgICAgYXdhaXQgcHJvZ3JhbS5zYXZlKCk7XHJcblxyXG4gICAgICAgIHNlbmRKc29uKHJlcywgMjAxLCB7IG1lc3NhZ2U6ICdTdWJqZWN0IGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5JywgZGF0YTogbmV3U3ViamVjdCB9KTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gUFVUIC9hcGkvY3VycmljdWx1bS9zdWJqZWN0cy86aWRcclxuICAgICAgaWYgKHJlcS5tZXRob2QgPT09ICdQVVQnICYmIHN1YmplY3RJZCkge1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCBwYXJzZUpzb25Cb2R5KHJlcSk7XHJcbiAgICAgICAgY29uc3QgdXBkYXRlZCA9IGF3YWl0IFN1YmplY3RNb2RlbC5maW5kQnlJZEFuZFVwZGF0ZShzdWJqZWN0SWQsIGJvZHksIHtcclxuICAgICAgICAgIG5ldzogdHJ1ZSxcclxuICAgICAgICAgIHJ1blZhbGlkYXRvcnM6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCF1cGRhdGVkKSB7XHJcbiAgICAgICAgICBzZW5kSnNvbihyZXMsIDQwNCwgeyBtZXNzYWdlOiAnU3ViamVjdCBub3QgZm91bmQnIH0pO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbmRKc29uKHJlcywgMjAwLCB7IG1lc3NhZ2U6ICdTdWJqZWN0IHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5JywgZGF0YTogdXBkYXRlZCB9KTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gREVMRVRFIC9hcGkvY3VycmljdWx1bS9zdWJqZWN0cy86aWRcclxuICAgICAgaWYgKHJlcS5tZXRob2QgPT09ICdERUxFVEUnICYmIHN1YmplY3RJZCkge1xyXG4gICAgICAgIGNvbnN0IGRlbGV0ZWQgPSBhd2FpdCBTdWJqZWN0TW9kZWwuZmluZEJ5SWRBbmREZWxldGUoc3ViamVjdElkKTtcclxuICAgICAgICBpZiAoIWRlbGV0ZWQpIHtcclxuICAgICAgICAgIHNlbmRKc29uKHJlcywgNDA0LCB7IG1lc3NhZ2U6ICdTdWJqZWN0IG5vdCBmb3VuZCcgfSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUmVtb3ZlIHJlZmVyZW5jZSBmcm9tIHByb2dyYW1cclxuICAgICAgICBhd2FpdCBQcm9ncmFtTW9kZWwuZmluZEJ5SWRBbmRVcGRhdGUoZGVsZXRlZC5wcm9ncmFtSWQsIHtcclxuICAgICAgICAgICRwdWxsOiB7IHN1YmplY3RJZHM6IGRlbGV0ZWQuX2lkIH0sXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNlbmRKc29uKHJlcywgMjAwLCB7IG1lc3NhZ2U6ICdTdWJqZWN0IGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5JyB9KTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIDQuIE1PRFVMRVMgQVBJICgvYXBpL2N1cnJpY3VsdW0vbW9kdWxlcylcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIGlmIChwYXRobmFtZS5zdGFydHNXaXRoKCcvYXBpL2N1cnJpY3VsdW0vbW9kdWxlcycpKSB7XHJcbiAgICAgIGNvbnN0IHBhcnRzID0gcGF0aG5hbWUucmVwbGFjZSgnL2FwaS9jdXJyaWN1bHVtL21vZHVsZXMnLCAnJykuc3BsaXQoJy8nKS5maWx0ZXIoQm9vbGVhbik7XHJcbiAgICAgIGNvbnN0IG1vZHVsZUlkID0gcGFydHNbMF07XHJcblxyXG4gICAgICAvLyBHRVQgL2FwaS9jdXJyaWN1bHVtL21vZHVsZXNcclxuICAgICAgaWYgKHJlcS5tZXRob2QgPT09ICdHRVQnICYmICFtb2R1bGVJZCkge1xyXG4gICAgICAgIGNvbnN0IHN1YmplY3RJZEZpbHRlciA9IHNlYXJjaFBhcmFtcy5nZXQoJ3N1YmplY3RJZCcpO1xyXG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gc3ViamVjdElkRmlsdGVyID8geyBzdWJqZWN0SWQ6IHN1YmplY3RJZEZpbHRlciB9IDoge307XHJcbiAgICAgICAgY29uc3QgbW9kdWxlcyA9IGF3YWl0IE1vZHVsZU1vZGVsLmZpbmQocXVlcnkpXHJcbiAgICAgICAgICAucG9wdWxhdGUoJ2NvbnRlbnRJZHMnKVxyXG4gICAgICAgICAgLnBvcHVsYXRlKCdhc3Nlc3NtZW50SWRzJylcclxuICAgICAgICAgIC5zb3J0KHsgb3JkZXI6IDEgfSk7XHJcbiAgICAgICAgc2VuZEpzb24ocmVzLCAyMDAsIHsgZGF0YTogbW9kdWxlcyB9KTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gR0VUIC9hcGkvY3VycmljdWx1bS9tb2R1bGVzLzppZFxyXG4gICAgICBpZiAocmVxLm1ldGhvZCA9PT0gJ0dFVCcgJiYgbW9kdWxlSWQpIHtcclxuICAgICAgICBjb25zdCBtb2R1bGVJdGVtID0gYXdhaXQgTW9kdWxlTW9kZWwuZmluZEJ5SWQobW9kdWxlSWQpXHJcbiAgICAgICAgICAucG9wdWxhdGUoJ2NvbnRlbnRJZHMnKVxyXG4gICAgICAgICAgLnBvcHVsYXRlKCdhc3Nlc3NtZW50SWRzJyk7XHJcbiAgICAgICAgaWYgKCFtb2R1bGVJdGVtKSB7XHJcbiAgICAgICAgICBzZW5kSnNvbihyZXMsIDQwNCwgeyBtZXNzYWdlOiAnTW9kdWxlIG5vdCBmb3VuZCcgfSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VuZEpzb24ocmVzLCAyMDAsIHsgZGF0YTogbW9kdWxlSXRlbSB9KTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gUE9TVCAvYXBpL2N1cnJpY3VsdW0vbW9kdWxlc1xyXG4gICAgICBpZiAocmVxLm1ldGhvZCA9PT0gJ1BPU1QnICYmICFtb2R1bGVJZCkge1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCBwYXJzZUpzb25Cb2R5KHJlcSk7XHJcbiAgICAgICAgY29uc3QgeyB0aXRsZSwgZGVzY3JpcHRpb24sIHN1YmplY3RJZCwgb3JkZXIsIHN0YXR1cyB9ID0gYm9keTtcclxuXHJcbiAgICAgICAgaWYgKCF0aXRsZSB8fCB0eXBlb2YgdGl0bGUgIT09ICdzdHJpbmcnIHx8ICF0aXRsZS50cmltKCkpIHtcclxuICAgICAgICAgIHNlbmRKc29uKHJlcywgNDAwLCB7IG1lc3NhZ2U6ICdNb2R1bGUgdGl0bGUgaXMgcmVxdWlyZWQnIH0pO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXN1YmplY3RJZCkge1xyXG4gICAgICAgICAgc2VuZEpzb24ocmVzLCA0MDAsIHsgbWVzc2FnZTogJ3N1YmplY3RJZCBpcyByZXF1aXJlZCcgfSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHN1YmplY3QgPSBhd2FpdCBTdWJqZWN0TW9kZWwuZmluZEJ5SWQoc3ViamVjdElkKTtcclxuICAgICAgICBpZiAoIXN1YmplY3QpIHtcclxuICAgICAgICAgIHNlbmRKc29uKHJlcywgNDA0LCB7IG1lc3NhZ2U6ICdSZWZlcmVuY2VkIHN1YmplY3Qgbm90IGZvdW5kJyB9KTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbW9kdWxlT3JkZXIgPSBvcmRlciA/PyAoc3ViamVjdC5tb2R1bGVJZHMubGVuZ3RoICsgMSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG5ld01vZHVsZSA9IGF3YWl0IE1vZHVsZU1vZGVsLmNyZWF0ZSh7XHJcbiAgICAgICAgICB0aXRsZTogdGl0bGUudHJpbSgpLFxyXG4gICAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uPy50cmltKCkgfHwgJycsXHJcbiAgICAgICAgICBzdWJqZWN0SWQsXHJcbiAgICAgICAgICBvcmRlcjogbW9kdWxlT3JkZXIsXHJcbiAgICAgICAgICBzdGF0dXM6IHN0YXR1cyB8fCAnRFJBRlQnLFxyXG4gICAgICAgICAgY29udGVudElkczogW10sXHJcbiAgICAgICAgICBhc3Nlc3NtZW50SWRzOiBbXSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gQWRkIHRvIHN1YmplY3QncyBtb2R1bGVJZHNcclxuICAgICAgICBzdWJqZWN0Lm1vZHVsZUlkcy5wdXNoKG5ld01vZHVsZS5faWQpO1xyXG4gICAgICAgIGF3YWl0IHN1YmplY3Quc2F2ZSgpO1xyXG5cclxuICAgICAgICBzZW5kSnNvbihyZXMsIDIwMSwgeyBtZXNzYWdlOiAnTW9kdWxlIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5JywgZGF0YTogbmV3TW9kdWxlIH0pO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBQVVQgL2FwaS9jdXJyaWN1bHVtL21vZHVsZXMvOmlkXHJcbiAgICAgIGlmIChyZXEubWV0aG9kID09PSAnUFVUJyAmJiBtb2R1bGVJZCkge1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCBwYXJzZUpzb25Cb2R5KHJlcSk7XHJcbiAgICAgICAgY29uc3QgdXBkYXRlZCA9IGF3YWl0IE1vZHVsZU1vZGVsLmZpbmRCeUlkQW5kVXBkYXRlKG1vZHVsZUlkLCBib2R5LCB7XHJcbiAgICAgICAgICBuZXc6IHRydWUsXHJcbiAgICAgICAgICBydW5WYWxpZGF0b3JzOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghdXBkYXRlZCkge1xyXG4gICAgICAgICAgc2VuZEpzb24ocmVzLCA0MDQsIHsgbWVzc2FnZTogJ01vZHVsZSBub3QgZm91bmQnIH0pO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbmRKc29uKHJlcywgMjAwLCB7IG1lc3NhZ2U6ICdNb2R1bGUgdXBkYXRlZCBzdWNjZXNzZnVsbHknLCBkYXRhOiB1cGRhdGVkIH0pO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBERUxFVEUgL2FwaS9jdXJyaWN1bHVtL21vZHVsZXMvOmlkXHJcbiAgICAgIGlmIChyZXEubWV0aG9kID09PSAnREVMRVRFJyAmJiBtb2R1bGVJZCkge1xyXG4gICAgICAgIGNvbnN0IGRlbGV0ZWQgPSBhd2FpdCBNb2R1bGVNb2RlbC5maW5kQnlJZEFuZERlbGV0ZShtb2R1bGVJZCk7XHJcbiAgICAgICAgaWYgKCFkZWxldGVkKSB7XHJcbiAgICAgICAgICBzZW5kSnNvbihyZXMsIDQwNCwgeyBtZXNzYWdlOiAnTW9kdWxlIG5vdCBmb3VuZCcgfSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUmVtb3ZlIHJlZmVyZW5jZSBmcm9tIHN1YmplY3RcclxuICAgICAgICBhd2FpdCBTdWJqZWN0TW9kZWwuZmluZEJ5SWRBbmRVcGRhdGUoZGVsZXRlZC5zdWJqZWN0SWQsIHtcclxuICAgICAgICAgICRwdWxsOiB7IG1vZHVsZUlkczogZGVsZXRlZC5faWQgfSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2VuZEpzb24ocmVzLCAyMDAsIHsgbWVzc2FnZTogJ01vZHVsZSBkZWxldGVkIHN1Y2Nlc3NmdWxseScgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyA1LiBDT05URU5UIElURU1TIEFQSSAoL2FwaS9jdXJyaWN1bHVtL2NvbnRlbnQtaXRlbXMpXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBpZiAocGF0aG5hbWUuc3RhcnRzV2l0aCgnL2FwaS9jdXJyaWN1bHVtL2NvbnRlbnQtaXRlbXMnKSkge1xyXG4gICAgICBjb25zdCBwYXJ0cyA9IHBhdGhuYW1lLnJlcGxhY2UoJy9hcGkvY3VycmljdWx1bS9jb250ZW50LWl0ZW1zJywgJycpLnNwbGl0KCcvJykuZmlsdGVyKEJvb2xlYW4pO1xyXG4gICAgICBjb25zdCBjb250ZW50SWQgPSBwYXJ0c1swXTtcclxuXHJcbiAgICAgIC8vIEdFVCAvYXBpL2N1cnJpY3VsdW0vY29udGVudC1pdGVtc1xyXG4gICAgICBpZiAocmVxLm1ldGhvZCA9PT0gJ0dFVCcgJiYgIWNvbnRlbnRJZCkge1xyXG4gICAgICAgIGNvbnN0IG1vZHVsZUlkRmlsdGVyID0gc2VhcmNoUGFyYW1zLmdldCgnbW9kdWxlSWQnKTtcclxuICAgICAgICBjb25zdCBxdWVyeSA9IG1vZHVsZUlkRmlsdGVyID8geyBtb2R1bGVJZDogbW9kdWxlSWRGaWx0ZXIgfSA6IHt9O1xyXG4gICAgICAgIGNvbnN0IGl0ZW1zID0gYXdhaXQgQ29udGVudEl0ZW1Nb2RlbC5maW5kKHF1ZXJ5KS5zb3J0KHsgY3JlYXRlZEF0OiAxIH0pO1xyXG4gICAgICAgIHNlbmRKc29uKHJlcywgMjAwLCB7IGRhdGE6IGl0ZW1zIH0pO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBHRVQgL2FwaS9jdXJyaWN1bHVtL2NvbnRlbnQtaXRlbXMvOmlkXHJcbiAgICAgIGlmIChyZXEubWV0aG9kID09PSAnR0VUJyAmJiBjb250ZW50SWQpIHtcclxuICAgICAgICBjb25zdCBpdGVtID0gYXdhaXQgQ29udGVudEl0ZW1Nb2RlbC5maW5kQnlJZChjb250ZW50SWQpO1xyXG4gICAgICAgIGlmICghaXRlbSkge1xyXG4gICAgICAgICAgc2VuZEpzb24ocmVzLCA0MDQsIHsgbWVzc2FnZTogJ0NvbnRlbnQgaXRlbSBub3QgZm91bmQnIH0pO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbmRKc29uKHJlcywgMjAwLCB7IGRhdGE6IGl0ZW0gfSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFBPU1QgL2FwaS9jdXJyaWN1bHVtL2NvbnRlbnQtaXRlbXNcclxuICAgICAgaWYgKHJlcS5tZXRob2QgPT09ICdQT1NUJyAmJiAhY29udGVudElkKSB7XHJcbiAgICAgICAgY29uc3QgYm9keSA9IGF3YWl0IHBhcnNlSnNvbkJvZHkocmVxKTtcclxuICAgICAgICBjb25zdCB7IHRpdGxlLCB0eXBlLCBkZXNjcmlwdGlvbiwgdXJsLCBkdXJhdGlvbiwgc3RhdHVzLCBtb2R1bGVJZCB9ID0gYm9keTtcclxuXHJcbiAgICAgICAgaWYgKCF0aXRsZSB8fCB0eXBlb2YgdGl0bGUgIT09ICdzdHJpbmcnIHx8ICF0aXRsZS50cmltKCkpIHtcclxuICAgICAgICAgIHNlbmRKc29uKHJlcywgNDAwLCB7IG1lc3NhZ2U6ICdDb250ZW50IHRpdGxlIGlzIHJlcXVpcmVkJyB9KTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0eXBlIHx8ICFbJ3ZpZGVvJywgJ2RvY3VtZW50JywgJ2F1ZGlvJywgJ2xpbmsnLCAndGV4dCddLmluY2x1ZGVzKHR5cGUpKSB7XHJcbiAgICAgICAgICBzZW5kSnNvbihyZXMsIDQwMCwgeyBtZXNzYWdlOiAnVmFsaWQgY29udGVudCB0eXBlICh2aWRlbywgZG9jdW1lbnQsIGF1ZGlvLCBsaW5rLCB0ZXh0KSBpcyByZXF1aXJlZCcgfSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghbW9kdWxlSWQpIHtcclxuICAgICAgICAgIHNlbmRKc29uKHJlcywgNDAwLCB7IG1lc3NhZ2U6ICdtb2R1bGVJZCBpcyByZXF1aXJlZCcgfSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHRhcmdldE1vZHVsZSA9IGF3YWl0IE1vZHVsZU1vZGVsLmZpbmRCeUlkKG1vZHVsZUlkKTtcclxuICAgICAgICBpZiAoIXRhcmdldE1vZHVsZSkge1xyXG4gICAgICAgICAgc2VuZEpzb24ocmVzLCA0MDQsIHsgbWVzc2FnZTogJ1JlZmVyZW5jZWQgbW9kdWxlIG5vdCBmb3VuZCcgfSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG5ld0NvbnRlbnQgPSBhd2FpdCBDb250ZW50SXRlbU1vZGVsLmNyZWF0ZSh7XHJcbiAgICAgICAgICB0aXRsZTogdGl0bGUudHJpbSgpLFxyXG4gICAgICAgICAgdHlwZSxcclxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbj8udHJpbSgpIHx8ICcnLFxyXG4gICAgICAgICAgdXJsOiB1cmw/LnRyaW0oKSxcclxuICAgICAgICAgIGR1cmF0aW9uOiB0eXBlb2YgZHVyYXRpb24gPT09ICdudW1iZXInID8gZHVyYXRpb24gOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICBzdGF0dXM6IHN0YXR1cyB8fCAnRFJBRlQnLFxyXG4gICAgICAgICAgbW9kdWxlSWQsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIEFkZCB0byBtb2R1bGUncyBjb250ZW50SWRzXHJcbiAgICAgICAgdGFyZ2V0TW9kdWxlLmNvbnRlbnRJZHMucHVzaChuZXdDb250ZW50Ll9pZCk7XHJcbiAgICAgICAgYXdhaXQgdGFyZ2V0TW9kdWxlLnNhdmUoKTtcclxuXHJcbiAgICAgICAgc2VuZEpzb24ocmVzLCAyMDEsIHsgbWVzc2FnZTogJ0NvbnRlbnQgaXRlbSBhZGRlZCBzdWNjZXNzZnVsbHknLCBkYXRhOiBuZXdDb250ZW50IH0pO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBQVVQgL2FwaS9jdXJyaWN1bHVtL2NvbnRlbnQtaXRlbXMvOmlkXHJcbiAgICAgIGlmIChyZXEubWV0aG9kID09PSAnUFVUJyAmJiBjb250ZW50SWQpIHtcclxuICAgICAgICBjb25zdCBib2R5ID0gYXdhaXQgcGFyc2VKc29uQm9keShyZXEpO1xyXG4gICAgICAgIGNvbnN0IHVwZGF0ZWQgPSBhd2FpdCBDb250ZW50SXRlbU1vZGVsLmZpbmRCeUlkQW5kVXBkYXRlKGNvbnRlbnRJZCwgYm9keSwge1xyXG4gICAgICAgICAgbmV3OiB0cnVlLFxyXG4gICAgICAgICAgcnVuVmFsaWRhdG9yczogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXVwZGF0ZWQpIHtcclxuICAgICAgICAgIHNlbmRKc29uKHJlcywgNDA0LCB7IG1lc3NhZ2U6ICdDb250ZW50IGl0ZW0gbm90IGZvdW5kJyB9KTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZW5kSnNvbihyZXMsIDIwMCwgeyBtZXNzYWdlOiAnQ29udGVudCBpdGVtIHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5JywgZGF0YTogdXBkYXRlZCB9KTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gREVMRVRFIC9hcGkvY3VycmljdWx1bS9jb250ZW50LWl0ZW1zLzppZFxyXG4gICAgICBpZiAocmVxLm1ldGhvZCA9PT0gJ0RFTEVURScgJiYgY29udGVudElkKSB7XHJcbiAgICAgICAgY29uc3QgZGVsZXRlZCA9IGF3YWl0IENvbnRlbnRJdGVtTW9kZWwuZmluZEJ5SWRBbmREZWxldGUoY29udGVudElkKTtcclxuICAgICAgICBpZiAoIWRlbGV0ZWQpIHtcclxuICAgICAgICAgIHNlbmRKc29uKHJlcywgNDA0LCB7IG1lc3NhZ2U6ICdDb250ZW50IGl0ZW0gbm90IGZvdW5kJyB9KTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBSZW1vdmUgZnJvbSBtb2R1bGUgY29udGVudElkc1xyXG4gICAgICAgIGF3YWl0IE1vZHVsZU1vZGVsLmZpbmRCeUlkQW5kVXBkYXRlKGRlbGV0ZWQubW9kdWxlSWQsIHtcclxuICAgICAgICAgICRwdWxsOiB7IGNvbnRlbnRJZHM6IGRlbGV0ZWQuX2lkIH0sXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNlbmRKc29uKHJlcywgMjAwLCB7IG1lc3NhZ2U6ICdDb250ZW50IGl0ZW0gZGVsZXRlZCBzdWNjZXNzZnVsbHknIH0pO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2VuZEpzb24ocmVzLCA0MDQsIHsgbWVzc2FnZTogJ0N1cnJpY3VsdW0gQVBJIGVuZHBvaW50IG5vdCBmb3VuZCcgfSk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcignQ3VycmljdWx1bSBoYW5kbGVyIGVycm9yOicsIGVycm9yKTtcclxuICAgIHNlbmRKc29uKHJlcywgNTAwLCB7IG1lc3NhZ2U6ICdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InLCBlcnJvcjogKGVycm9yIGFzIEVycm9yKS5tZXNzYWdlIH0pO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxccGVnZ2FcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxtb2NrXFxcXHByb2plY3RcXFxcc3JjXFxcXHNlcnZlclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxccGVnZ2FcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxtb2NrXFxcXHByb2plY3RcXFxcc3JjXFxcXHNlcnZlclxcXFxldmFsdWF0aW9uSGFuZGxlci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvcGVnZ2EvT25lRHJpdmUvRGVza3RvcC9tb2NrL3Byb2plY3Qvc3JjL3NlcnZlci9ldmFsdWF0aW9uSGFuZGxlci50c1wiOy8qKlxyXG4gKiBldmFsdWF0aW9uSGFuZGxlci50c1xyXG4gKiBNZW1iZXIgMyBcdTIwMTQgRXZhbHVhdGlvbiAmIFByb2dyZXNzIEFQSVxyXG4gKlxyXG4gKiBSb3V0ZXMgKGFsbCBwcmVmaXhlZCB3aXRoIC9hcGkvZXZhbHVhdGlvbi8pOlxyXG4gKlxyXG4gKiAgQXNzZXNzbWVudHM6XHJcbiAqICAgIFBPU1QgICAvYXNzZXNzbWVudHMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGVhY2hlci9hZG1pbikgY3JlYXRlXHJcbiAqICAgIEdFVCAgICAvYXNzZXNzbWVudHMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYW55KSAgICAgICAgICAgbGlzdCAocXVlcnk6IG1vZHVsZUlkLCBzdWJqZWN0SWQsIHN0YXR1cylcclxuICogICAgR0VUICAgIC9hc3Nlc3NtZW50cy86aWQgICAgICAgICAgICAgICAgICAgICAgICAgIChhbnkpICAgICAgICAgICBnZXQgc2luZ2xlXHJcbiAqICAgIFBBVENIICAvYXNzZXNzbWVudHMvOmlkICAgICAgICAgICAgICAgICAgICAgICAgICAodGVhY2hlci9hZG1pbikgdXBkYXRlXHJcbiAqICAgIERFTEVURSAvYXNzZXNzbWVudHMvOmlkICAgICAgICAgICAgICAgICAgICAgICAgICAodGVhY2hlci9hZG1pbikgZGVsZXRlXHJcbiAqXHJcbiAqICBBc3Nlc3NtZW50IFN1Ym1pc3Npb25zOlxyXG4gKiAgICBQT1NUICAgL2Fzc2Vzc21lbnRzLzppZC9zdWJtaXQgICAgICAgICAgICAgICAgICAgKHN0dWRlbnQpICAgICAgIHN1Ym1pdCArIGF1dG8tZ3JhZGVcclxuICogICAgR0VUICAgIC9hc3Nlc3NtZW50cy86aWQvc3VibWlzc2lvbnMgICAgICAgICAgICAgICh0ZWFjaGVyL2FkbWluKSBhbGwgc3VibWlzc2lvbnNcclxuICogICAgR0VUICAgIC9hc3Nlc3NtZW50cy86aWQvc3VibWlzc2lvbnMvbWluZSAgICAgICAgIChzdHVkZW50KSAgICAgICBvd24gc3VibWlzc2lvbihzKVxyXG4gKiAgICBQQVRDSCAgL3N1Ym1pc3Npb25zL2Fzc2Vzc21lbnQvOnN1YklkL2dyYWRlICAgICAgKHRlYWNoZXIvYWRtaW4pIG1hbnVhbCBncmFkZVxyXG4gKlxyXG4gKiAgQXNzaWdubWVudHM6XHJcbiAqICAgIFBPU1QgICAvYXNzaWdubWVudHMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGVhY2hlci9hZG1pbikgY3JlYXRlXHJcbiAqICAgIEdFVCAgICAvYXNzaWdubWVudHMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYW55KSAgICAgICAgICAgbGlzdCAocm9sZS1zY29wZWQpXHJcbiAqICAgIEdFVCAgICAvYXNzaWdubWVudHMvOmlkICAgICAgICAgICAgICAgICAgICAgICAgICAoYW55KSAgICAgICAgICAgZ2V0IHNpbmdsZVxyXG4gKiAgICBQQVRDSCAgL2Fzc2lnbm1lbnRzLzppZCAgICAgICAgICAgICAgICAgICAgICAgICAgKHRlYWNoZXIvYWRtaW4pIHVwZGF0ZVxyXG4gKiAgICBERUxFVEUgL2Fzc2lnbm1lbnRzLzppZCAgICAgICAgICAgICAgICAgICAgICAgICAgKHRlYWNoZXIvYWRtaW4pIGRlbGV0ZVxyXG4gKlxyXG4gKiAgQXNzaWdubWVudCBTdWJtaXNzaW9uczpcclxuICogICAgUE9TVCAgIC9hc3NpZ25tZW50cy86aWQvc3VibWl0ICAgICAgICAgICAgICAgICAgIChzdHVkZW50KSAgICAgICBzdWJtaXRcclxuICogICAgR0VUICAgIC9hc3NpZ25tZW50cy86aWQvc3VibWlzc2lvbiAgICAgICAgICAgICAgICh0ZWFjaGVyL2FkbWluKSBnZXQgc3VibWlzc2lvblxyXG4gKiAgICBQQVRDSCAgL3N1Ym1pc3Npb25zL2Fzc2lnbm1lbnQvOnN1YklkL2dyYWRlICAgICAgKHRlYWNoZXIvYWRtaW4pIGdyYWRlICsgbGVhZGVyYm9hcmQgdXBzZXJ0XHJcbiAqXHJcbiAqICBQcm9ncmVzczpcclxuICogICAgR0VUICAgIC9wcm9ncmVzcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzdHVkZW50KSAgICAgICBvd24gcHJvZ3Jlc3MgcmVjb3Jkc1xyXG4gKiAgICBHRVQgICAgL3Byb2dyZXNzLzpzdHVkZW50SWQgICAgICAgICAgICAgICAgICAgICAgKHRlYWNoZXIvYWRtaW4pIGEgc3R1ZGVudCdzIHByb2dyZXNzXHJcbiAqICAgIFBPU1QgICAvcHJvZ3Jlc3MvZXZlbnQgICAgICAgICAgICAgICAgICAgICAgICAgICAoc3R1ZGVudCkgICAgICAgbG9nIHByb2dyZXNzIGV2ZW50XHJcbiAqICAgIEdFVCAgICAvcHJvZ3Jlc3MvZXZlbnRzICAgICAgICAgICAgICAgICAgICAgICAgICAoc3R1ZGVudCkgICAgICAgb3duIGV2ZW50IGZlZWRcclxuICpcclxuICogIExlYWRlcmJvYXJkOlxyXG4gKiAgICBHRVQgICAgL2xlYWRlcmJvYXJkICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGFueSkgICAgICAgICAgIGxpc3QgKHF1ZXJ5OiBjb2hvcnRJZCwgcHJvZ3JhbUlkKVxyXG4gKiAgICBHRVQgICAgL2xlYWRlcmJvYXJkL21lICAgICAgICAgICAgICAgICAgICAgICAgICAgKHN0dWRlbnQpICAgICAgIG93biBlbnRyeVxyXG4gKi9cclxuXHJcbmltcG9ydCB0eXBlIHsgSW5jb21pbmdNZXNzYWdlLCBTZXJ2ZXJSZXNwb25zZSB9IGZyb20gJ25vZGU6aHR0cCc7XHJcbmltcG9ydCBqd3QgZnJvbSAnanNvbndlYnRva2VuJztcclxuaW1wb3J0IHsgY29ubmVjdFRvRGF0YWJhc2UgfSBmcm9tICcuL2RiLmpzJztcclxuaW1wb3J0IEFzc2Vzc21lbnRNb2RlbCBmcm9tICcuL21vZGVscy9Bc3Nlc3NtZW50LmpzJztcclxuaW1wb3J0IEFzc2Vzc21lbnRTdWJtaXNzaW9uTW9kZWwgZnJvbSAnLi9tb2RlbHMvQXNzZXNzbWVudFN1Ym1pc3Npb24uanMnO1xyXG5pbXBvcnQgQXNzaWdubWVudE1vZGVsIGZyb20gJy4vbW9kZWxzL0Fzc2lnbm1lbnQuanMnO1xyXG5pbXBvcnQgQXNzaWdubWVudFN1Ym1pc3Npb25Nb2RlbCBmcm9tICcuL21vZGVscy9Bc3NpZ25tZW50U3VibWlzc2lvbi5qcyc7XHJcbmltcG9ydCBQcm9ncmVzc01vZGVsIGZyb20gJy4vbW9kZWxzL1Byb2dyZXNzLmpzJztcclxuaW1wb3J0IFByb2dyZXNzRXZlbnRNb2RlbCBmcm9tICcuL21vZGVscy9Qcm9ncmVzc0V2ZW50LmpzJztcclxuaW1wb3J0IExlYWRlcmJvYXJkU2NvcmVNb2RlbCBmcm9tICcuL21vZGVscy9MZWFkZXJib2FyZFNjb3JlLmpzJztcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBTaGFyZWQgaGVscGVyc1xyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbmNvbnN0IEpXVF9TRUNSRVQgPSBwcm9jZXNzLmVudi5KV1RfU0VDUkVUIHx8ICdkaWtzaGEtZm91bmRhdGlvbi1zZWNyZXQta2V5LTIwMjYnO1xyXG5cclxuaW50ZXJmYWNlIFRva2VuUGF5bG9hZCB7XHJcbiAgdXNlcklkOiBzdHJpbmc7XHJcbiAgcm9sZTogJ2FkbWluJyB8ICd0ZWFjaGVyJyB8ICdzdHVkZW50JztcclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VKc29uQm9keShyZXE6IEluY29taW5nTWVzc2FnZSk6IFByb21pc2U8YW55PiB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIGxldCBib2R5ID0gJyc7XHJcbiAgICByZXEub24oJ2RhdGEnLCAoY2h1bmspID0+IHsgYm9keSArPSBjaHVuazsgfSk7XHJcbiAgICByZXEub24oJ2VuZCcsICgpID0+IHtcclxuICAgICAgaWYgKCFib2R5KSB7IHJlc29sdmUoe30pOyByZXR1cm47IH1cclxuICAgICAgdHJ5IHsgcmVzb2x2ZShKU09OLnBhcnNlKGJvZHkpKTsgfVxyXG4gICAgICBjYXRjaCAoZXJyKSB7IHJlamVjdChlcnIpOyB9XHJcbiAgICB9KTtcclxuICAgIHJlcS5vbignZXJyb3InLCAoZXJyKSA9PiByZWplY3QoZXJyKSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbmRKc29uKHJlczogU2VydmVyUmVzcG9uc2UsIHN0YXR1c0NvZGU6IG51bWJlciwgZGF0YTogYW55KSB7XHJcbiAgcmVzLnN0YXR1c0NvZGUgPSBzdGF0dXNDb2RlO1xyXG4gIHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcbiAgcmVzLmVuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZlcmlmeVRva2VuKHJlcTogSW5jb21pbmdNZXNzYWdlKTogVG9rZW5QYXlsb2FkIHwgbnVsbCB7XHJcbiAgY29uc3QgYXV0aEhlYWRlciA9IHJlcS5oZWFkZXJzWydhdXRob3JpemF0aW9uJ107XHJcbiAgaWYgKCFhdXRoSGVhZGVyPy5zdGFydHNXaXRoKCdCZWFyZXIgJykpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IHRva2VuID0gYXV0aEhlYWRlci5zbGljZSg3KTtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIGp3dC52ZXJpZnkodG9rZW4sIEpXVF9TRUNSRVQpIGFzIFRva2VuUGF5bG9hZDtcclxuICB9IGNhdGNoIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG5cclxuLyoqIEV4dHJhY3QgLzpzZWdtZW50IGZyb20gYSBrbm93biBwcmVmaXgsIGUuZy4gcHJlZml4PVwiL2FwaS9ldmFsdWF0aW9uL2Fzc2Vzc21lbnRzL1wiICovXHJcbmZ1bmN0aW9uIGV4dHJhY3RTZWdtZW50KHVybDogc3RyaW5nLCBwcmVmaXg6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgcmV0dXJuIHVybC5zbGljZShwcmVmaXgubGVuZ3RoKS5zcGxpdCgnLycpWzBdO1xyXG59XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gQXV0by1ncmFkaW5nIGhlbHBlclxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbmludGVyZmFjZSBBdXRvR3JhZGVSZXN1bHQge1xyXG4gIHNjb3JlOiBudW1iZXI7XHJcbiAgbmVlZHNNYW51YWxHcmFkZTogYm9vbGVhbjtcclxufVxyXG5cclxuZnVuY3Rpb24gYXV0b0dyYWRlKFxyXG4gIHF1ZXN0aW9uczogeyB0eXBlOiBzdHJpbmc7IGNvcnJlY3RBbnN3ZXI/OiBzdHJpbmcgfCBzdHJpbmdbXTsgbWFya3M6IG51bWJlciB9W10sXHJcbiAgYW5zd2VyczogUmVjb3JkPHN0cmluZywgc3RyaW5nIHwgc3RyaW5nW10+XHJcbik6IEF1dG9HcmFkZVJlc3VsdCB7XHJcbiAgbGV0IHNjb3JlID0gMDtcclxuICBsZXQgbmVlZHNNYW51YWxHcmFkZSA9IGZhbHNlO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHF1ZXN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3QgcSA9IHF1ZXN0aW9uc1tpXTtcclxuICAgIGNvbnN0IGtleSA9IFN0cmluZyhpKTtcclxuICAgIGNvbnN0IHN0dWRlbnRBbnN3ZXIgPSBhbnN3ZXJzW2tleV07XHJcblxyXG4gICAgaWYgKHEudHlwZSA9PT0gJ21jcScgfHwgcS50eXBlID09PSAndHJ1ZV9mYWxzZScpIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIHN0dWRlbnRBbnN3ZXIgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgIHEuY29ycmVjdEFuc3dlciAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgU3RyaW5nKHN0dWRlbnRBbnN3ZXIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpID09PVxyXG4gICAgICAgICAgU3RyaW5nKHEuY29ycmVjdEFuc3dlcikudHJpbSgpLnRvTG93ZXJDYXNlKClcclxuICAgICAgKSB7XHJcbiAgICAgICAgc2NvcmUgKz0gcS5tYXJrcztcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChxLnR5cGUgPT09ICdtdWx0aXBsZV9zZWxlY3QnKSB7XHJcbiAgICAgIGNvbnN0IGNvcnJlY3QgPSBBcnJheS5pc0FycmF5KHEuY29ycmVjdEFuc3dlcilcclxuICAgICAgICA/IFsuLi5xLmNvcnJlY3RBbnN3ZXJdLnNvcnQoKS5qb2luKCcsJylcclxuICAgICAgICA6IFN0cmluZyhxLmNvcnJlY3RBbnN3ZXIgPz8gJycpO1xyXG4gICAgICBjb25zdCBnaXZlbiA9IEFycmF5LmlzQXJyYXkoc3R1ZGVudEFuc3dlcilcclxuICAgICAgICA/IFsuLi5zdHVkZW50QW5zd2VyXS5zb3J0KCkuam9pbignLCcpXHJcbiAgICAgICAgOiBTdHJpbmcoc3R1ZGVudEFuc3dlciA/PyAnJyk7XHJcbiAgICAgIGlmIChnaXZlbiA9PT0gY29ycmVjdCkge1xyXG4gICAgICAgIHNjb3JlICs9IHEubWFya3M7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIHNob3J0X2Fuc3dlciAvIGF1ZGlvX3Jlc3BvbnNlIC8gdmlkZW9fcmVzcG9uc2UgXHUyMTkyIG1hbnVhbFxyXG4gICAgICBuZWVkc01hbnVhbEdyYWRlID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiB7IHNjb3JlLCBuZWVkc01hbnVhbEdyYWRlIH07XHJcbn1cclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBMZWFkZXJib2FyZCB1cHNlcnQgaGVscGVyXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gdXBzZXJ0TGVhZGVyYm9hcmRBc3NpZ25tZW50U2NvcmUoc3R1ZGVudElkOiBzdHJpbmcpIHtcclxuICB0cnkge1xyXG4gICAgLy8gR2V0IGFsbCBncmFkZWQgYXNzaWdubWVudCBzdWJtaXNzaW9ucyBmb3IgdGhpcyBzdHVkZW50XHJcbiAgICBjb25zdCBzdWJzID0gYXdhaXQgQXNzaWdubWVudFN1Ym1pc3Npb25Nb2RlbC5maW5kKHtcclxuICAgICAgc3R1ZGVudElkLFxyXG4gICAgICBtYXJrczogeyAkZXhpc3RzOiB0cnVlLCAkbmU6IG51bGwgfSxcclxuICAgIH0pLmxlYW4oKTtcclxuXHJcbiAgICBpZiAoc3Vicy5sZW5ndGggPT09IDApIHJldHVybjtcclxuXHJcbiAgICAvLyBHZXQgY29ycmVzcG9uZGluZyBhc3NpZ25tZW50cyB0byBjb21wdXRlIHBlcmNlbnRhZ2VzXHJcbiAgICBjb25zdCBhc3NpZ25tZW50SWRzID0gc3Vicy5tYXAoKHMpID0+IHMuYXNzaWdubWVudElkKTtcclxuICAgIGNvbnN0IGFzc2lnbm1lbnRzID0gYXdhaXQgQXNzaWdubWVudE1vZGVsLmZpbmQoeyBfaWQ6IHsgJGluOiBhc3NpZ25tZW50SWRzIH0gfSkubGVhbigpO1xyXG4gICAgY29uc3QgYXNzaWdubWVudE1hcCA9IG5ldyBNYXAoYXNzaWdubWVudHMubWFwKChhKSA9PiBbU3RyaW5nKGEuX2lkKSwgYV0pKTtcclxuXHJcbiAgICBsZXQgdG90YWxQY3QgPSAwO1xyXG4gICAgbGV0IGNvdW50ID0gMDtcclxuICAgIGxldCBwcm9ncmFtSWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcclxuICAgIGxldCBjb2hvcnRJZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgIGZvciAoY29uc3Qgc3ViIG9mIHN1YnMpIHtcclxuICAgICAgY29uc3QgYXNzaWdubWVudCA9IGFzc2lnbm1lbnRNYXAuZ2V0KFN0cmluZyhzdWIuYXNzaWdubWVudElkKSk7XHJcbiAgICAgIGlmICghYXNzaWdubWVudCB8fCAhYXNzaWdubWVudC5tYXhNYXJrcyB8fCBhc3NpZ25tZW50Lm1heE1hcmtzID09PSAwKSBjb250aW51ZTtcclxuICAgICAgdG90YWxQY3QgKz0gKChzdWIubWFya3MgPz8gMCkgLyBhc3NpZ25tZW50Lm1heE1hcmtzKSAqIDEwMDtcclxuICAgICAgY291bnQrKztcclxuICAgICAgLy8gVXNlIHN1YmplY3RJZCdzIGNvaG9ydC9wcm9ncmFtIGNvbnRleHQgXHUyMDE0IHdlIGRvbid0IGhhdmUgY29ob3J0SWQgaGVyZSBkaXJlY3RseSxcclxuICAgICAgLy8gc28gd2UnbGwgc2tpcCBsZWFkZXJib2FyZCB1cGRhdGUgaWYgd2UgY2FuJ3QgZmluZCB0aGUgcmVjb3JkIHlldFxyXG4gICAgfVxyXG5cclxuICAgIGlmIChjb3VudCA9PT0gMCkgcmV0dXJuO1xyXG4gICAgY29uc3QgYXZnUGN0ID0gTWF0aC5taW4oMTAwLCBNYXRoLnJvdW5kKHRvdGFsUGN0IC8gY291bnQpKTtcclxuXHJcbiAgICAvLyBVcGRhdGUgZXhpc3RpbmcgbGVhZGVyYm9hcmQgcmVjb3JkKHMpIGZvciB0aGlzIHN0dWRlbnRcclxuICAgIGF3YWl0IExlYWRlcmJvYXJkU2NvcmVNb2RlbC51cGRhdGVNYW55KFxyXG4gICAgICB7IHN0dWRlbnRJZCB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgJHNldDogeyBhc3NpZ25tZW50U2NvcmU6IGF2Z1BjdCB9LFxyXG4gICAgICAgICRzZXRPbkluc2VydDoge1xyXG4gICAgICAgICAgcmFuazogOTk5OSxcclxuICAgICAgICAgIG92ZXJhbGxTY29yZTogYXZnUGN0LFxyXG4gICAgICAgICAgYXNzZXNzbWVudFNjb3JlOiAwLFxyXG4gICAgICAgICAgZGlzY2lwbGluZVNjb3JlOiAwLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgLy8gQWxzbyB1cGRhdGUgU3R1ZGVudFByb2ZpbGUgbW9kZWxcclxuICAgIGNvbnN0IFN0dWRlbnRQcm9maWxlTW9kZWwgPSAoYXdhaXQgaW1wb3J0KCcuL21vZGVscy9TdHVkZW50UHJvZmlsZS5qcycpKS5kZWZhdWx0O1xyXG4gICAgYXdhaXQgU3R1ZGVudFByb2ZpbGVNb2RlbC51cGRhdGVPbmUoXHJcbiAgICAgIHsgdXNlcklkOiBzdHVkZW50SWQgfSxcclxuICAgICAgeyAkc2V0OiB7IGFzc2lnbm1lbnRBdmVyYWdlOiBhdmdQY3QgfSB9XHJcbiAgICApO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgY29uc29sZS5lcnJvcignTGVhZGVyYm9hcmRTY29yZSB1cHNlcnQgZXJyb3I6JywgKGVyciBhcyBFcnJvcikubWVzc2FnZSk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gTWFpbiBleHBvcnRlZCBoYW5kbGVyXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZUV2YWx1YXRpb25SZXF1ZXN0KFxyXG4gIHJlcTogSW5jb21pbmdNZXNzYWdlLFxyXG4gIHJlczogU2VydmVyUmVzcG9uc2VcclxuKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgY29uc3QgcmF3VXJsID0gcmVxLnVybCA/PyAnJztcclxuICBjb25zdCB1cmwgPSByYXdVcmwuc3BsaXQoJz8nKVswXTtcclxuICBjb25zdCBtZXRob2QgPSByZXEubWV0aG9kID8/ICcnO1xyXG5cclxuICAvLyBPbmx5IGhhbmRsZSAvYXBpL2V2YWx1YXRpb24vIHJvdXRlc1xyXG4gIGlmICghdXJsLnN0YXJ0c1dpdGgoJy9hcGkvZXZhbHVhdGlvbi8nKSkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gRXN0YWJsaXNoIERCIGNvbm5lY3Rpb24gKGFsbCByb3V0ZXMgbmVlZCBpdClcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgY29uc3QgbW9uZ29SZWFkeSA9IGF3YWl0IGNvbm5lY3RUb0RhdGFiYXNlKCk7XHJcblxyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAvLyBBU1NFU1NNRU5UU1xyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgLy8gUE9TVCAvYXBpL2V2YWx1YXRpb24vYXNzZXNzbWVudHMgXHUyMDE0IGNyZWF0ZVxyXG4gIGlmICh1cmwgPT09ICcvYXBpL2V2YWx1YXRpb24vYXNzZXNzbWVudHMnICYmIG1ldGhvZCA9PT0gJ1BPU1QnKSB7XHJcbiAgICBjb25zdCB1c2VyID0gdmVyaWZ5VG9rZW4ocmVxKTtcclxuICAgIGlmICghdXNlcikgeyBzZW5kSnNvbihyZXMsIDQwMSwgeyBtZXNzYWdlOiAnVW5hdXRob3JpemVkJyB9KTsgcmV0dXJuIHRydWU7IH1cclxuICAgIGlmICh1c2VyLnJvbGUgPT09ICdzdHVkZW50JykgeyBzZW5kSnNvbihyZXMsIDQwMywgeyBtZXNzYWdlOiAnRm9yYmlkZGVuOiB0ZWFjaGVycy9hZG1pbnMgb25seScgfSk7IHJldHVybiB0cnVlOyB9XHJcbiAgICBpZiAoIW1vbmdvUmVhZHkpIHsgc2VuZEpzb24ocmVzLCA1MDMsIHsgbWVzc2FnZTogJ0RhdGFiYXNlIHVuYXZhaWxhYmxlJyB9KTsgcmV0dXJuIHRydWU7IH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBib2R5ID0gYXdhaXQgcGFyc2VKc29uQm9keShyZXEpO1xyXG4gICAgICBjb25zdCB7IG1vZHVsZUlkLCBzdWJqZWN0SWQsIHRpdGxlLCBkZXNjcmlwdGlvbiwgcXVlc3Rpb25zLCB0b3RhbE1hcmtzLCBwYXNzU2NvcmUsIG1heEF0dGVtcHRzLCBzdGF0dXMgfSA9IGJvZHk7XHJcblxyXG4gICAgICBpZiAoIXRpdGxlIHx8IHRvdGFsTWFya3MgPT09IHVuZGVmaW5lZCB8fCBwYXNzU2NvcmUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHNlbmRKc29uKHJlcywgNDAwLCB7IG1lc3NhZ2U6ICd0aXRsZSwgdG90YWxNYXJrcywgYW5kIHBhc3NTY29yZSBhcmUgcmVxdWlyZWQnIH0pO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBhc3Nlc3NtZW50ID0gYXdhaXQgQXNzZXNzbWVudE1vZGVsLmNyZWF0ZSh7XHJcbiAgICAgICAgbW9kdWxlSWQ6IG1vZHVsZUlkIHx8IHVuZGVmaW5lZCxcclxuICAgICAgICBzdWJqZWN0SWQ6IHN1YmplY3RJZCB8fCB1bmRlZmluZWQsXHJcbiAgICAgICAgdGl0bGU6IHRpdGxlLnRyaW0oKSxcclxuICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24gPz8gJycsXHJcbiAgICAgICAgcXVlc3Rpb25zOiBxdWVzdGlvbnMgPz8gW10sXHJcbiAgICAgICAgdG90YWxNYXJrcyxcclxuICAgICAgICBwYXNzU2NvcmUsXHJcbiAgICAgICAgbWF4QXR0ZW1wdHM6IG1heEF0dGVtcHRzID8/IDMsXHJcbiAgICAgICAgc3RhdHVzOiBzdGF0dXMgPz8gJ0RSQUZUJyxcclxuICAgICAgICBjcmVhdGVkQnk6IHVzZXIudXNlcklkLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHNlbmRKc29uKHJlcywgMjAxLCB7IG1lc3NhZ2U6ICdBc3Nlc3NtZW50IGNyZWF0ZWQnLCBhc3Nlc3NtZW50IH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHNlbmRKc29uKHJlcywgNTAwLCB7IG1lc3NhZ2U6IChlcnIgYXMgRXJyb3IpLm1lc3NhZ2UgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8vIEdFVCAvYXBpL2V2YWx1YXRpb24vYXNzZXNzbWVudHMgXHUyMDE0IGxpc3RcclxuICBpZiAodXJsLnN0YXJ0c1dpdGgoJy9hcGkvZXZhbHVhdGlvbi9hc3Nlc3NtZW50cycpICYmIG1ldGhvZCA9PT0gJ0dFVCcpIHtcclxuICAgIGNvbnN0IGFmdGVyID0gdXJsLnNsaWNlKCcvYXBpL2V2YWx1YXRpb24vYXNzZXNzbWVudHMnLmxlbmd0aCk7XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIEdFVCAvYXBpL2V2YWx1YXRpb24vYXNzZXNzbWVudHMgKGV4YWN0KSBcdTIwMTQgbGlzdCB3aXRoIG9wdGlvbmFsIGZpbHRlcnNcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBpZiAoYWZ0ZXIgPT09ICcnIHx8IGFmdGVyID09PSAnLycpIHtcclxuICAgICAgY29uc3QgdXNlciA9IHZlcmlmeVRva2VuKHJlcSk7XHJcbiAgICAgIGlmICghdXNlcikgeyBzZW5kSnNvbihyZXMsIDQwMSwgeyBtZXNzYWdlOiAnVW5hdXRob3JpemVkJyB9KTsgcmV0dXJuIHRydWU7IH1cclxuICAgICAgaWYgKCFtb25nb1JlYWR5KSB7IHNlbmRKc29uKHJlcywgMjAwLCB7IGFzc2Vzc21lbnRzOiBbXSB9KTsgcmV0dXJuIHRydWU7IH1cclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHJhd1VybC5zcGxpdCgnPycpWzFdID8/ICcnKTtcclxuICAgICAgICBjb25zdCBmaWx0ZXI6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7fTtcclxuICAgICAgICBpZiAocXMuZ2V0KCdtb2R1bGVJZCcpKSBmaWx0ZXIubW9kdWxlSWQgPSBxcy5nZXQoJ21vZHVsZUlkJyk7XHJcbiAgICAgICAgaWYgKHFzLmdldCgnc3ViamVjdElkJykpIGZpbHRlci5zdWJqZWN0SWQgPSBxcy5nZXQoJ3N1YmplY3RJZCcpO1xyXG4gICAgICAgIGlmIChxcy5nZXQoJ3N0YXR1cycpKSBmaWx0ZXIuc3RhdHVzID0gcXMuZ2V0KCdzdGF0dXMnKTtcclxuICAgICAgICAvLyBTdHVkZW50cyBvbmx5IHNlZSBwdWJsaXNoZWRcclxuICAgICAgICBpZiAodXNlci5yb2xlID09PSAnc3R1ZGVudCcpIGZpbHRlci5zdGF0dXMgPSAnUFVCTElTSEVEJztcclxuXHJcbiAgICAgICAgY29uc3QgYXNzZXNzbWVudHMgPSBhd2FpdCBBc3Nlc3NtZW50TW9kZWwuZmluZChmaWx0ZXIpLnNvcnQoeyBjcmVhdGVkQXQ6IC0xIH0pLmxlYW4oKTtcclxuICAgICAgICBzZW5kSnNvbihyZXMsIDIwMCwgeyBhc3Nlc3NtZW50cyB9KTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgc2VuZEpzb24ocmVzLCA1MDAsIHsgbWVzc2FnZTogKGVyciBhcyBFcnJvcikubWVzc2FnZSB9KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYXJ0cyA9IGFmdGVyLnNwbGl0KCcvJykuZmlsdGVyKEJvb2xlYW4pOyAvLyBlLmcuIFsnPGlkPiddIG9yIFsnPGlkPicsICdzdWJtaXNzaW9ucyddIG9yIFsnPGlkPicsICdzdWJtaXNzaW9ucycsICdtaW5lJ11cclxuICAgIGNvbnN0IGFzc2Vzc21lbnRJZCA9IHBhcnRzWzBdO1xyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBHRVQgL2FwaS9ldmFsdWF0aW9uL2Fzc2Vzc21lbnRzLzppZC9zdWJtaXNzaW9ucy9taW5lXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgaWYgKHBhcnRzWzFdID09PSAnc3VibWlzc2lvbnMnICYmIHBhcnRzWzJdID09PSAnbWluZScgJiYgbWV0aG9kID09PSAnR0VUJykge1xyXG4gICAgICBjb25zdCB1c2VyID0gdmVyaWZ5VG9rZW4ocmVxKTtcclxuICAgICAgaWYgKCF1c2VyKSB7IHNlbmRKc29uKHJlcywgNDAxLCB7IG1lc3NhZ2U6ICdVbmF1dGhvcml6ZWQnIH0pOyByZXR1cm4gdHJ1ZTsgfVxyXG4gICAgICBpZiAodXNlci5yb2xlICE9PSAnc3R1ZGVudCcpIHsgc2VuZEpzb24ocmVzLCA0MDMsIHsgbWVzc2FnZTogJ0ZvcmJpZGRlbjogc3R1ZGVudHMgb25seScgfSk7IHJldHVybiB0cnVlOyB9XHJcbiAgICAgIGlmICghbW9uZ29SZWFkeSkgeyBzZW5kSnNvbihyZXMsIDIwMCwgeyBzdWJtaXNzaW9uczogW10gfSk7IHJldHVybiB0cnVlOyB9XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHN1Ym1pc3Npb25zID0gYXdhaXQgQXNzZXNzbWVudFN1Ym1pc3Npb25Nb2RlbC5maW5kKHtcclxuICAgICAgICAgIGFzc2Vzc21lbnRJZCxcclxuICAgICAgICAgIHN0dWRlbnRJZDogdXNlci51c2VySWQsXHJcbiAgICAgICAgfSkuc29ydCh7IGF0dGVtcHROdW1iZXI6IC0xIH0pLmxlYW4oKTtcclxuICAgICAgICBzZW5kSnNvbihyZXMsIDIwMCwgeyBzdWJtaXNzaW9ucyB9KTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgc2VuZEpzb24ocmVzLCA1MDAsIHsgbWVzc2FnZTogKGVyciBhcyBFcnJvcikubWVzc2FnZSB9KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gR0VUIC9hcGkvZXZhbHVhdGlvbi9hc3Nlc3NtZW50cy86aWQvc3VibWlzc2lvbnMgXHUyMDE0IGFsbCAodGVhY2hlci9hZG1pbilcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBpZiAocGFydHNbMV0gPT09ICdzdWJtaXNzaW9ucycgJiYgbWV0aG9kID09PSAnR0VUJykge1xyXG4gICAgICBjb25zdCB1c2VyID0gdmVyaWZ5VG9rZW4ocmVxKTtcclxuICAgICAgaWYgKCF1c2VyKSB7IHNlbmRKc29uKHJlcywgNDAxLCB7IG1lc3NhZ2U6ICdVbmF1dGhvcml6ZWQnIH0pOyByZXR1cm4gdHJ1ZTsgfVxyXG4gICAgICBpZiAodXNlci5yb2xlID09PSAnc3R1ZGVudCcpIHsgc2VuZEpzb24ocmVzLCA0MDMsIHsgbWVzc2FnZTogJ0ZvcmJpZGRlbjogdGVhY2hlcnMvYWRtaW5zIG9ubHknIH0pOyByZXR1cm4gdHJ1ZTsgfVxyXG4gICAgICBpZiAoIW1vbmdvUmVhZHkpIHsgc2VuZEpzb24ocmVzLCAyMDAsIHsgc3VibWlzc2lvbnM6IFtdIH0pOyByZXR1cm4gdHJ1ZTsgfVxyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBzdWJtaXNzaW9ucyA9IGF3YWl0IEFzc2Vzc21lbnRTdWJtaXNzaW9uTW9kZWwuZmluZCh7IGFzc2Vzc21lbnRJZCB9KVxyXG4gICAgICAgICAgLnBvcHVsYXRlKCdzdHVkZW50SWQnLCAnbmFtZSBlbWFpbCcpXHJcbiAgICAgICAgICAuc29ydCh7IGNyZWF0ZWRBdDogLTEgfSlcclxuICAgICAgICAgIC5sZWFuKCk7XHJcbiAgICAgICAgc2VuZEpzb24ocmVzLCAyMDAsIHsgc3VibWlzc2lvbnMgfSk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIHNlbmRKc29uKHJlcywgNTAwLCB7IG1lc3NhZ2U6IChlcnIgYXMgRXJyb3IpLm1lc3NhZ2UgfSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIFBPU1QgL2FwaS9ldmFsdWF0aW9uL2Fzc2Vzc21lbnRzLzppZC9zdWJtaXQgXHUyMDE0IHN0dWRlbnQgc3VibWl0c1xyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIGlmIChwYXJ0c1sxXSA9PT0gJ3N1Ym1pdCcgJiYgbWV0aG9kID09PSAnUE9TVCcpIHtcclxuICAgICAgY29uc3QgdXNlciA9IHZlcmlmeVRva2VuKHJlcSk7XHJcbiAgICAgIGlmICghdXNlcikgeyBzZW5kSnNvbihyZXMsIDQwMSwgeyBtZXNzYWdlOiAnVW5hdXRob3JpemVkJyB9KTsgcmV0dXJuIHRydWU7IH1cclxuICAgICAgaWYgKHVzZXIucm9sZSAhPT0gJ3N0dWRlbnQnKSB7IHNlbmRKc29uKHJlcywgNDAzLCB7IG1lc3NhZ2U6ICdGb3JiaWRkZW46IHN0dWRlbnRzIG9ubHknIH0pOyByZXR1cm4gdHJ1ZTsgfVxyXG4gICAgICBpZiAoIW1vbmdvUmVhZHkpIHsgc2VuZEpzb24ocmVzLCA1MDMsIHsgbWVzc2FnZTogJ0RhdGFiYXNlIHVuYXZhaWxhYmxlJyB9KTsgcmV0dXJuIHRydWU7IH1cclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgYXNzZXNzbWVudCA9IGF3YWl0IEFzc2Vzc21lbnRNb2RlbC5maW5kQnlJZChhc3Nlc3NtZW50SWQpLmxlYW4oKTtcclxuICAgICAgICBpZiAoIWFzc2Vzc21lbnQpIHsgc2VuZEpzb24ocmVzLCA0MDQsIHsgbWVzc2FnZTogJ0Fzc2Vzc21lbnQgbm90IGZvdW5kJyB9KTsgcmV0dXJuIHRydWU7IH1cclxuICAgICAgICBpZiAoYXNzZXNzbWVudC5zdGF0dXMgIT09ICdQVUJMSVNIRUQnKSB7IHNlbmRKc29uKHJlcywgNDAwLCB7IG1lc3NhZ2U6ICdBc3Nlc3NtZW50IGlzIG5vdCBwdWJsaXNoZWQnIH0pOyByZXR1cm4gdHJ1ZTsgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayBhdHRlbXB0IGNvdW50XHJcbiAgICAgICAgY29uc3QgZXhpc3RpbmdBdHRlbXB0cyA9IGF3YWl0IEFzc2Vzc21lbnRTdWJtaXNzaW9uTW9kZWwuY291bnREb2N1bWVudHMoe1xyXG4gICAgICAgICAgYXNzZXNzbWVudElkLFxyXG4gICAgICAgICAgc3R1ZGVudElkOiB1c2VyLnVzZXJJZCxcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoZXhpc3RpbmdBdHRlbXB0cyA+PSBhc3Nlc3NtZW50Lm1heEF0dGVtcHRzKSB7XHJcbiAgICAgICAgICBzZW5kSnNvbihyZXMsIDQwMCwgeyBtZXNzYWdlOiBgTWF4aW11bSBhdHRlbXB0cyAoJHthc3Nlc3NtZW50Lm1heEF0dGVtcHRzfSkgcmVhY2hlZGAgfSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCBwYXJzZUpzb25Cb2R5KHJlcSk7XHJcbiAgICAgICAgY29uc3QgeyBhbnN3ZXJzIH0gPSBib2R5OyAvLyBleHBlY3RlZDogeyBcIjBcIjogXCJBXCIsIFwiMVwiOiBbXCJYXCIsXCJZXCJdLCAuLi4gfVxyXG5cclxuICAgICAgICBpZiAoIWFuc3dlcnMgfHwgdHlwZW9mIGFuc3dlcnMgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICBzZW5kSnNvbihyZXMsIDQwMCwgeyBtZXNzYWdlOiAnYW5zd2VycyBvYmplY3QgaXMgcmVxdWlyZWQnIH0pO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB7IHNjb3JlLCBuZWVkc01hbnVhbEdyYWRlIH0gPSBhdXRvR3JhZGUoYXNzZXNzbWVudC5xdWVzdGlvbnMgYXMgYW55W10sIGFuc3dlcnMpO1xyXG4gICAgICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSBhc3Nlc3NtZW50LnRvdGFsTWFya3MgPiAwXHJcbiAgICAgICAgICA/IE1hdGgucm91bmQoKHNjb3JlIC8gYXNzZXNzbWVudC50b3RhbE1hcmtzKSAqIDEwMClcclxuICAgICAgICAgIDogMDtcclxuICAgICAgICBjb25zdCBwYXNzZWQgPSAhbmVlZHNNYW51YWxHcmFkZSAmJiBzY29yZSA+PSBhc3Nlc3NtZW50LnBhc3NTY29yZTtcclxuXHJcbiAgICAgICAgY29uc3Qgc3VibWlzc2lvbiA9IGF3YWl0IEFzc2Vzc21lbnRTdWJtaXNzaW9uTW9kZWwuY3JlYXRlKHtcclxuICAgICAgICAgIGFzc2Vzc21lbnRJZCxcclxuICAgICAgICAgIHN0dWRlbnRJZDogdXNlci51c2VySWQsXHJcbiAgICAgICAgICBhbnN3ZXJzLFxyXG4gICAgICAgICAgc2NvcmUsXHJcbiAgICAgICAgICBwZXJjZW50YWdlLFxyXG4gICAgICAgICAgcGFzc2VkLFxyXG4gICAgICAgICAgc3RhdHVzOiBuZWVkc01hbnVhbEdyYWRlID8gJ3N1Ym1pdHRlZCcgOiAnZ3JhZGVkJyxcclxuICAgICAgICAgIGF0dGVtcHROdW1iZXI6IGV4aXN0aW5nQXR0ZW1wdHMgKyAxLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBMb2cgcHJvZ3Jlc3MgZXZlbnRcclxuICAgICAgICBhd2FpdCBQcm9ncmVzc0V2ZW50TW9kZWwuY3JlYXRlKHtcclxuICAgICAgICAgIHN0dWRlbnRJZDogdXNlci51c2VySWQsXHJcbiAgICAgICAgICB0eXBlOiAnYXNzZXNzbWVudF9zdWJtaXR0ZWQnLFxyXG4gICAgICAgICAgZGVzY3JpcHRpb246IGBTdWJtaXR0ZWQgYXNzZXNzbWVudDogJHthc3Nlc3NtZW50LnRpdGxlfWAsXHJcbiAgICAgICAgICBlbnRpdHlJZDogYXNzZXNzbWVudC5faWQsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNlbmRKc29uKHJlcywgMjAxLCB7XHJcbiAgICAgICAgICBtZXNzYWdlOiBuZWVkc01hbnVhbEdyYWRlXHJcbiAgICAgICAgICAgID8gJ1N1Ym1pdHRlZC4gQXdhaXRpbmcgbWFudWFsIGdyYWRpbmcgZm9yIG9wZW4tZW5kZWQgcXVlc3Rpb25zLidcclxuICAgICAgICAgICAgOiBgR3JhZGVkLiBTY29yZTogJHtzY29yZX0vJHthc3Nlc3NtZW50LnRvdGFsTWFya3N9ICgke3BlcmNlbnRhZ2V9JSkuICR7cGFzc2VkID8gJ1Bhc3NlZCBcdTI3MTMnIDogJ05vdCBwYXNzZWQgXHUyNzE3J31gLFxyXG4gICAgICAgICAgc3VibWlzc2lvbixcclxuICAgICAgICB9KTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgc2VuZEpzb24ocmVzLCA1MDAsIHsgbWVzc2FnZTogKGVyciBhcyBFcnJvcikubWVzc2FnZSB9KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gR0VUIC9hcGkvZXZhbHVhdGlvbi9hc3Nlc3NtZW50cy86aWQgXHUyMDE0IGdldCBzaW5nbGVcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBpZiAocGFydHMubGVuZ3RoID09PSAxICYmIG1ldGhvZCA9PT0gJ0dFVCcpIHtcclxuICAgICAgY29uc3QgdXNlciA9IHZlcmlmeVRva2VuKHJlcSk7XHJcbiAgICAgIGlmICghdXNlcikgeyBzZW5kSnNvbihyZXMsIDQwMSwgeyBtZXNzYWdlOiAnVW5hdXRob3JpemVkJyB9KTsgcmV0dXJuIHRydWU7IH1cclxuICAgICAgaWYgKCFtb25nb1JlYWR5KSB7IHNlbmRKc29uKHJlcywgNTAzLCB7IG1lc3NhZ2U6ICdEYXRhYmFzZSB1bmF2YWlsYWJsZScgfSk7IHJldHVybiB0cnVlOyB9XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGFzc2Vzc21lbnQgPSBhd2FpdCBBc3Nlc3NtZW50TW9kZWwuZmluZEJ5SWQoYXNzZXNzbWVudElkKS5sZWFuKCk7XHJcbiAgICAgICAgaWYgKCFhc3Nlc3NtZW50KSB7IHNlbmRKc29uKHJlcywgNDA0LCB7IG1lc3NhZ2U6ICdBc3Nlc3NtZW50IG5vdCBmb3VuZCcgfSk7IHJldHVybiB0cnVlOyB9XHJcbiAgICAgICAgLy8gU3R1ZGVudHMgZG9uJ3Qgc2VlIGNvcnJlY3QgYW5zd2Vyc1xyXG4gICAgICAgIGlmICh1c2VyLnJvbGUgPT09ICdzdHVkZW50Jykge1xyXG4gICAgICAgICAgY29uc3Qgc2FuaXRpemVkID0ge1xyXG4gICAgICAgICAgICAuLi5hc3Nlc3NtZW50LFxyXG4gICAgICAgICAgICBxdWVzdGlvbnM6IChhc3Nlc3NtZW50LnF1ZXN0aW9ucyBhcyBhbnlbXSkubWFwKChxKSA9PiAoe1xyXG4gICAgICAgICAgICAgIC4uLnEsXHJcbiAgICAgICAgICAgICAgY29ycmVjdEFuc3dlcjogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICB9KSksXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgc2VuZEpzb24ocmVzLCAyMDAsIHsgYXNzZXNzbWVudDogc2FuaXRpemVkIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzZW5kSnNvbihyZXMsIDIwMCwgeyBhc3Nlc3NtZW50IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgc2VuZEpzb24ocmVzLCA1MDAsIHsgbWVzc2FnZTogKGVyciBhcyBFcnJvcikubWVzc2FnZSB9KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gUEFUQ0ggL2FwaS9ldmFsdWF0aW9uL2Fzc2Vzc21lbnRzLzppZCBcdTIwMTQgdXBkYXRlXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMSAmJiBtZXRob2QgPT09ICdQQVRDSCcpIHtcclxuICAgICAgY29uc3QgdXNlciA9IHZlcmlmeVRva2VuKHJlcSk7XHJcbiAgICAgIGlmICghdXNlcikgeyBzZW5kSnNvbihyZXMsIDQwMSwgeyBtZXNzYWdlOiAnVW5hdXRob3JpemVkJyB9KTsgcmV0dXJuIHRydWU7IH1cclxuICAgICAgaWYgKHVzZXIucm9sZSA9PT0gJ3N0dWRlbnQnKSB7IHNlbmRKc29uKHJlcywgNDAzLCB7IG1lc3NhZ2U6ICdGb3JiaWRkZW46IHRlYWNoZXJzL2FkbWlucyBvbmx5JyB9KTsgcmV0dXJuIHRydWU7IH1cclxuICAgICAgaWYgKCFtb25nb1JlYWR5KSB7IHNlbmRKc29uKHJlcywgNTAzLCB7IG1lc3NhZ2U6ICdEYXRhYmFzZSB1bmF2YWlsYWJsZScgfSk7IHJldHVybiB0cnVlOyB9XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCBwYXJzZUpzb25Cb2R5KHJlcSk7XHJcbiAgICAgICAgY29uc3QgYWxsb3dlZCA9IFsndGl0bGUnLCAnZGVzY3JpcHRpb24nLCAncXVlc3Rpb25zJywgJ3RvdGFsTWFya3MnLCAncGFzc1Njb3JlJywgJ21heEF0dGVtcHRzJywgJ3N0YXR1cyddO1xyXG4gICAgICAgIGNvbnN0IHVwZGF0ZXM6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7fTtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBhbGxvd2VkKSB7XHJcbiAgICAgICAgICBpZiAoYm9keVtrZXldICE9PSB1bmRlZmluZWQpIHVwZGF0ZXNba2V5XSA9IGJvZHlba2V5XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGFzc2Vzc21lbnQgPSBhd2FpdCBBc3Nlc3NtZW50TW9kZWwuZmluZEJ5SWRBbmRVcGRhdGUoXHJcbiAgICAgICAgICBhc3Nlc3NtZW50SWQsXHJcbiAgICAgICAgICB7ICRzZXQ6IHVwZGF0ZXMgfSxcclxuICAgICAgICAgIHsgbmV3OiB0cnVlLCBydW5WYWxpZGF0b3JzOiB0cnVlIH1cclxuICAgICAgICApLmxlYW4oKTtcclxuXHJcbiAgICAgICAgaWYgKCFhc3Nlc3NtZW50KSB7IHNlbmRKc29uKHJlcywgNDA0LCB7IG1lc3NhZ2U6ICdBc3Nlc3NtZW50IG5vdCBmb3VuZCcgfSk7IHJldHVybiB0cnVlOyB9XHJcbiAgICAgICAgc2VuZEpzb24ocmVzLCAyMDAsIHsgbWVzc2FnZTogJ0Fzc2Vzc21lbnQgdXBkYXRlZCcsIGFzc2Vzc21lbnQgfSk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIHNlbmRKc29uKHJlcywgNTAwLCB7IG1lc3NhZ2U6IChlcnIgYXMgRXJyb3IpLm1lc3NhZ2UgfSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIERFTEVURSAvYXBpL2V2YWx1YXRpb24vYXNzZXNzbWVudHMvOmlkIFx1MjAxNCBkZWxldGVcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBpZiAocGFydHMubGVuZ3RoID09PSAxICYmIG1ldGhvZCA9PT0gJ0RFTEVURScpIHtcclxuICAgICAgY29uc3QgdXNlciA9IHZlcmlmeVRva2VuKHJlcSk7XHJcbiAgICAgIGlmICghdXNlcikgeyBzZW5kSnNvbihyZXMsIDQwMSwgeyBtZXNzYWdlOiAnVW5hdXRob3JpemVkJyB9KTsgcmV0dXJuIHRydWU7IH1cclxuICAgICAgaWYgKHVzZXIucm9sZSA9PT0gJ3N0dWRlbnQnKSB7IHNlbmRKc29uKHJlcywgNDAzLCB7IG1lc3NhZ2U6ICdGb3JiaWRkZW46IHRlYWNoZXJzL2FkbWlucyBvbmx5JyB9KTsgcmV0dXJuIHRydWU7IH1cclxuICAgICAgaWYgKCFtb25nb1JlYWR5KSB7IHNlbmRKc29uKHJlcywgNTAzLCB7IG1lc3NhZ2U6ICdEYXRhYmFzZSB1bmF2YWlsYWJsZScgfSk7IHJldHVybiB0cnVlOyB9XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGFzc2Vzc21lbnQgPSBhd2FpdCBBc3Nlc3NtZW50TW9kZWwuZmluZEJ5SWRBbmREZWxldGUoYXNzZXNzbWVudElkKS5sZWFuKCk7XHJcbiAgICAgICAgaWYgKCFhc3Nlc3NtZW50KSB7IHNlbmRKc29uKHJlcywgNDA0LCB7IG1lc3NhZ2U6ICdBc3Nlc3NtZW50IG5vdCBmb3VuZCcgfSk7IHJldHVybiB0cnVlOyB9XHJcbiAgICAgICAgc2VuZEpzb24ocmVzLCAyMDAsIHsgbWVzc2FnZTogJ0Fzc2Vzc21lbnQgZGVsZXRlZCcgfSk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIHNlbmRKc29uKHJlcywgNTAwLCB7IG1lc3NhZ2U6IChlcnIgYXMgRXJyb3IpLm1lc3NhZ2UgfSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgLy8gQVNTRVNTTUVOVCBTVUJNSVNTSU9OUyBcdTIwMTQgbWFudWFsIGdyYWRlXHJcbiAgLy8gUEFUQ0ggL2FwaS9ldmFsdWF0aW9uL3N1Ym1pc3Npb25zL2Fzc2Vzc21lbnQvOnN1YklkL2dyYWRlXHJcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gIGlmICh1cmwuc3RhcnRzV2l0aCgnL2FwaS9ldmFsdWF0aW9uL3N1Ym1pc3Npb25zL2Fzc2Vzc21lbnQvJykgJiYgdXJsLmVuZHNXaXRoKCcvZ3JhZGUnKSAmJiBtZXRob2QgPT09ICdQQVRDSCcpIHtcclxuICAgIGNvbnN0IHVzZXIgPSB2ZXJpZnlUb2tlbihyZXEpO1xyXG4gICAgaWYgKCF1c2VyKSB7IHNlbmRKc29uKHJlcywgNDAxLCB7IG1lc3NhZ2U6ICdVbmF1dGhvcml6ZWQnIH0pOyByZXR1cm4gdHJ1ZTsgfVxyXG4gICAgaWYgKHVzZXIucm9sZSA9PT0gJ3N0dWRlbnQnKSB7IHNlbmRKc29uKHJlcywgNDAzLCB7IG1lc3NhZ2U6ICdGb3JiaWRkZW46IHRlYWNoZXJzL2FkbWlucyBvbmx5JyB9KTsgcmV0dXJuIHRydWU7IH1cclxuICAgIGlmICghbW9uZ29SZWFkeSkgeyBzZW5kSnNvbihyZXMsIDUwMywgeyBtZXNzYWdlOiAnRGF0YWJhc2UgdW5hdmFpbGFibGUnIH0pOyByZXR1cm4gdHJ1ZTsgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHN1YklkID0gZXh0cmFjdFNlZ21lbnQodXJsLCAnL2FwaS9ldmFsdWF0aW9uL3N1Ym1pc3Npb25zL2Fzc2Vzc21lbnQvJyk7XHJcbiAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCBwYXJzZUpzb25Cb2R5KHJlcSk7XHJcbiAgICAgIGNvbnN0IHsgc2NvcmUsIGZlZWRiYWNrIH0gPSBib2R5O1xyXG5cclxuICAgICAgaWYgKHNjb3JlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHNjb3JlICE9PSAnbnVtYmVyJykge1xyXG4gICAgICAgIHNlbmRKc29uKHJlcywgNDAwLCB7IG1lc3NhZ2U6ICdzY29yZSAobnVtYmVyKSBpcyByZXF1aXJlZCcgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHN1YiA9IGF3YWl0IEFzc2Vzc21lbnRTdWJtaXNzaW9uTW9kZWwuZmluZEJ5SWQoc3ViSWQpO1xyXG4gICAgICBpZiAoIXN1YikgeyBzZW5kSnNvbihyZXMsIDQwNCwgeyBtZXNzYWdlOiAnU3VibWlzc2lvbiBub3QgZm91bmQnIH0pOyByZXR1cm4gdHJ1ZTsgfVxyXG5cclxuICAgICAgY29uc3QgYXNzZXNzbWVudCA9IGF3YWl0IEFzc2Vzc21lbnRNb2RlbC5maW5kQnlJZChzdWIuYXNzZXNzbWVudElkKS5sZWFuKCk7XHJcbiAgICAgIGNvbnN0IHRvdGFsTWFya3MgPSBhc3Nlc3NtZW50Py50b3RhbE1hcmtzID8/IDA7XHJcbiAgICAgIGNvbnN0IHBhc3NTY29yZSA9IGFzc2Vzc21lbnQ/LnBhc3NTY29yZSA/PyAwO1xyXG4gICAgICBjb25zdCBwZXJjZW50YWdlID0gdG90YWxNYXJrcyA+IDAgPyBNYXRoLnJvdW5kKChzY29yZSAvIHRvdGFsTWFya3MpICogMTAwKSA6IDA7XHJcblxyXG4gICAgICBzdWIuc2NvcmUgPSBzY29yZTtcclxuICAgICAgc3ViLnBlcmNlbnRhZ2UgPSBwZXJjZW50YWdlO1xyXG4gICAgICBzdWIucGFzc2VkID0gc2NvcmUgPj0gcGFzc1Njb3JlO1xyXG4gICAgICBzdWIuc3RhdHVzID0gJ2dyYWRlZCc7XHJcbiAgICAgIGlmIChmZWVkYmFjayAhPT0gdW5kZWZpbmVkKSBzdWIuZmVlZGJhY2sgPSBmZWVkYmFjaztcclxuICAgICAgYXdhaXQgc3ViLnNhdmUoKTtcclxuXHJcbiAgICAgIHNlbmRKc29uKHJlcywgMjAwLCB7IG1lc3NhZ2U6ICdBc3Nlc3NtZW50IHN1Ym1pc3Npb24gZ3JhZGVkJywgc3VibWlzc2lvbjogc3ViIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHNlbmRKc29uKHJlcywgNTAwLCB7IG1lc3NhZ2U6IChlcnIgYXMgRXJyb3IpLm1lc3NhZ2UgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAvLyBBU1NJR05NRU5UU1xyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgLy8gUE9TVCAvYXBpL2V2YWx1YXRpb24vYXNzaWdubWVudHMgXHUyMDE0IGNyZWF0ZVxyXG4gIGlmICh1cmwgPT09ICcvYXBpL2V2YWx1YXRpb24vYXNzaWdubWVudHMnICYmIG1ldGhvZCA9PT0gJ1BPU1QnKSB7XHJcbiAgICBjb25zdCB1c2VyID0gdmVyaWZ5VG9rZW4ocmVxKTtcclxuICAgIGlmICghdXNlcikgeyBzZW5kSnNvbihyZXMsIDQwMSwgeyBtZXNzYWdlOiAnVW5hdXRob3JpemVkJyB9KTsgcmV0dXJuIHRydWU7IH1cclxuICAgIGlmICh1c2VyLnJvbGUgPT09ICdzdHVkZW50JykgeyBzZW5kSnNvbihyZXMsIDQwMywgeyBtZXNzYWdlOiAnRm9yYmlkZGVuOiB0ZWFjaGVycy9hZG1pbnMgb25seScgfSk7IHJldHVybiB0cnVlOyB9XHJcbiAgICBpZiAoIW1vbmdvUmVhZHkpIHsgc2VuZEpzb24ocmVzLCA1MDMsIHsgbWVzc2FnZTogJ0RhdGFiYXNlIHVuYXZhaWxhYmxlJyB9KTsgcmV0dXJuIHRydWU7IH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBib2R5ID0gYXdhaXQgcGFyc2VKc29uQm9keShyZXEpO1xyXG4gICAgICBjb25zdCB7IHN0dWRlbnRJZCwgc3ViamVjdElkLCBtb2R1bGVJZCwgdGl0bGUsIGluc3RydWN0aW9ucywgYXR0YWNobWVudHMsIG1heE1hcmtzLCBkdWVEYXRlIH0gPSBib2R5O1xyXG5cclxuICAgICAgaWYgKCFzdHVkZW50SWQgfHwgIXRpdGxlIHx8IG1heE1hcmtzID09PSB1bmRlZmluZWQgfHwgIWR1ZURhdGUpIHtcclxuICAgICAgICBzZW5kSnNvbihyZXMsIDQwMCwgeyBtZXNzYWdlOiAnc3R1ZGVudElkLCB0aXRsZSwgbWF4TWFya3MsIGFuZCBkdWVEYXRlIGFyZSByZXF1aXJlZCcgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChzdHVkZW50SWQgPT09ICdBTEwnKSB7XHJcbiAgICAgICAgY29uc3QgU3R1ZGVudE1vZGVsID0gKGF3YWl0IGltcG9ydCgnLi9tb2RlbHMvVXNlci5qcycpKS5kZWZhdWx0O1xyXG4gICAgICAgIGNvbnN0IGFsbFN0dWRlbnRzID0gYXdhaXQgU3R1ZGVudE1vZGVsLmZpbmQoeyByb2xlOiAnc3R1ZGVudCcgfSkubGVhbigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGFzc2lnbm1lbnRzID0gYXdhaXQgQXNzaWdubWVudE1vZGVsLmluc2VydE1hbnkoXHJcbiAgICAgICAgICBhbGxTdHVkZW50cy5tYXAoc3R1ZGVudCA9PiAoe1xyXG4gICAgICAgICAgICBzdHVkZW50SWQ6IHN0dWRlbnQuX2lkLFxyXG4gICAgICAgICAgICB0ZWFjaGVySWQ6IHVzZXIudXNlcklkLFxyXG4gICAgICAgICAgICBzdWJqZWN0SWQ6IHN1YmplY3RJZCB8fCB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIG1vZHVsZUlkOiBtb2R1bGVJZCB8fCB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZS50cmltKCksXHJcbiAgICAgICAgICAgIGluc3RydWN0aW9uczogaW5zdHJ1Y3Rpb25zID8/ICcnLFxyXG4gICAgICAgICAgICBhdHRhY2htZW50czogYXR0YWNobWVudHMgPz8gW10sXHJcbiAgICAgICAgICAgIG1heE1hcmtzLFxyXG4gICAgICAgICAgICBkdWVEYXRlOiBuZXcgRGF0ZShkdWVEYXRlKSxcclxuICAgICAgICAgICAgc3RhdHVzOiAnTkVXJyxcclxuICAgICAgICAgIH0pKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgc2VuZEpzb24ocmVzLCAyMDEsIHsgbWVzc2FnZTogJ0Fzc2lnbm1lbnRzIGNyZWF0ZWQgZm9yIGFsbCBzdHVkZW50cycsIGFzc2lnbm1lbnRzIH0pO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBhc3NpZ25tZW50ID0gYXdhaXQgQXNzaWdubWVudE1vZGVsLmNyZWF0ZSh7XHJcbiAgICAgICAgc3R1ZGVudElkLFxyXG4gICAgICAgIHRlYWNoZXJJZDogdXNlci51c2VySWQsXHJcbiAgICAgICAgc3ViamVjdElkOiBzdWJqZWN0SWQgfHwgdW5kZWZpbmVkLFxyXG4gICAgICAgIG1vZHVsZUlkOiBtb2R1bGVJZCB8fCB1bmRlZmluZWQsXHJcbiAgICAgICAgdGl0bGU6IHRpdGxlLnRyaW0oKSxcclxuICAgICAgICBpbnN0cnVjdGlvbnM6IGluc3RydWN0aW9ucyA/PyAnJyxcclxuICAgICAgICBhdHRhY2htZW50czogYXR0YWNobWVudHMgPz8gW10sXHJcbiAgICAgICAgbWF4TWFya3MsXHJcbiAgICAgICAgZHVlRGF0ZTogbmV3IERhdGUoZHVlRGF0ZSksXHJcbiAgICAgICAgc3RhdHVzOiAnTkVXJyxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBzZW5kSnNvbihyZXMsIDIwMSwgeyBtZXNzYWdlOiAnQXNzaWdubWVudCBjcmVhdGVkJywgYXNzaWdubWVudCB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBzZW5kSnNvbihyZXMsIDUwMCwgeyBtZXNzYWdlOiAoZXJyIGFzIEVycm9yKS5tZXNzYWdlIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICAvLyBHRVQgL2FwaS9ldmFsdWF0aW9uL2Fzc2lnbm1lbnRzIFx1MjAxNCBsaXN0IChyb2xlLXNjb3BlZClcclxuICBpZiAodXJsID09PSAnL2FwaS9ldmFsdWF0aW9uL2Fzc2lnbm1lbnRzJyAmJiBtZXRob2QgPT09ICdHRVQnKSB7XHJcbiAgICBjb25zdCB1c2VyID0gdmVyaWZ5VG9rZW4ocmVxKTtcclxuICAgIGlmICghdXNlcikgeyBzZW5kSnNvbihyZXMsIDQwMSwgeyBtZXNzYWdlOiAnVW5hdXRob3JpemVkJyB9KTsgcmV0dXJuIHRydWU7IH1cclxuICAgIGlmICghbW9uZ29SZWFkeSkgeyBzZW5kSnNvbihyZXMsIDIwMCwgeyBhc3NpZ25tZW50czogW10gfSk7IHJldHVybiB0cnVlOyB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHJhd1VybC5zcGxpdCgnPycpWzFdID8/ICcnKTtcclxuICAgICAgY29uc3QgZmlsdGVyOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge307XHJcblxyXG4gICAgICBjb25zdCBtb25nb29zZSA9IChhd2FpdCBpbXBvcnQoJ21vbmdvb3NlJykpLmRlZmF1bHQ7XHJcbiAgICAgIGlmICh1c2VyLnJvbGUgPT09ICdzdHVkZW50Jykge1xyXG4gICAgICAgIGZpbHRlci5zdHVkZW50SWQgPSBtb25nb29zZS5UeXBlcy5PYmplY3RJZC5pc1ZhbGlkKHVzZXIudXNlcklkKSA/IHVzZXIudXNlcklkIDogbnVsbDtcclxuICAgICAgfSBlbHNlIGlmICh1c2VyLnJvbGUgPT09ICd0ZWFjaGVyJykge1xyXG4gICAgICAgIGZpbHRlci50ZWFjaGVySWQgPSBtb25nb29zZS5UeXBlcy5PYmplY3RJZC5pc1ZhbGlkKHVzZXIudXNlcklkKSA/IHVzZXIudXNlcklkIDogbnVsbDtcclxuICAgICAgfVxyXG4gICAgICAvLyBhZG1pbiBzZWVzIGFsbFxyXG4gICAgICBpZiAocXMuZ2V0KCdzdHVkZW50SWQnKSAmJiB1c2VyLnJvbGUgIT09ICdzdHVkZW50JykgZmlsdGVyLnN0dWRlbnRJZCA9IHFzLmdldCgnc3R1ZGVudElkJyk7XHJcbiAgICAgIGlmIChxcy5nZXQoJ3N1YmplY3RJZCcpKSBmaWx0ZXIuc3ViamVjdElkID0gcXMuZ2V0KCdzdWJqZWN0SWQnKTtcclxuICAgICAgaWYgKHFzLmdldCgnbW9kdWxlSWQnKSkgZmlsdGVyLm1vZHVsZUlkID0gcXMuZ2V0KCdtb2R1bGVJZCcpO1xyXG4gICAgICBpZiAocXMuZ2V0KCdzdGF0dXMnKSkgZmlsdGVyLnN0YXR1cyA9IHFzLmdldCgnc3RhdHVzJyk7XHJcblxyXG4gICAgICBjb25zdCBhc3NpZ25tZW50cyA9IGF3YWl0IEFzc2lnbm1lbnRNb2RlbC5maW5kKGZpbHRlcikuc29ydCh7IGR1ZURhdGU6IDEgfSkubGVhbigpO1xyXG4gICAgICBzZW5kSnNvbihyZXMsIDIwMCwgeyBhc3NpZ25tZW50cyB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBzZW5kSnNvbihyZXMsIDUwMCwgeyBtZXNzYWdlOiAoZXJyIGFzIEVycm9yKS5tZXNzYWdlIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBpZiAodXJsLnN0YXJ0c1dpdGgoJy9hcGkvZXZhbHVhdGlvbi9hc3NpZ25tZW50cy8nKSAmJiB1cmwgIT09ICcvYXBpL2V2YWx1YXRpb24vYXNzaWdubWVudHMvJykge1xyXG4gICAgY29uc3QgYWZ0ZXIgPSB1cmwuc2xpY2UoJy9hcGkvZXZhbHVhdGlvbi9hc3NpZ25tZW50cy8nLmxlbmd0aCk7XHJcbiAgICBjb25zdCBwYXJ0cyA9IGFmdGVyLnNwbGl0KCcvJykuZmlsdGVyKEJvb2xlYW4pO1xyXG4gICAgY29uc3QgYXNzaWdubWVudElkID0gcGFydHNbMF07XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIFBPU1QgL2FwaS9ldmFsdWF0aW9uL2Fzc2lnbm1lbnRzLzppZC9zdWJtaXQgXHUyMDE0IHN0dWRlbnQgc3VibWl0c1xyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIGlmIChwYXJ0c1sxXSA9PT0gJ3N1Ym1pdCcgJiYgbWV0aG9kID09PSAnUE9TVCcpIHtcclxuICAgICAgY29uc3QgdXNlciA9IHZlcmlmeVRva2VuKHJlcSk7XHJcbiAgICAgIGlmICghdXNlcikgeyBzZW5kSnNvbihyZXMsIDQwMSwgeyBtZXNzYWdlOiAnVW5hdXRob3JpemVkJyB9KTsgcmV0dXJuIHRydWU7IH1cclxuICAgICAgaWYgKHVzZXIucm9sZSAhPT0gJ3N0dWRlbnQnKSB7IHNlbmRKc29uKHJlcywgNDAzLCB7IG1lc3NhZ2U6ICdGb3JiaWRkZW46IHN0dWRlbnRzIG9ubHknIH0pOyByZXR1cm4gdHJ1ZTsgfVxyXG4gICAgICBpZiAoIW1vbmdvUmVhZHkpIHsgc2VuZEpzb24ocmVzLCA1MDMsIHsgbWVzc2FnZTogJ0RhdGFiYXNlIHVuYXZhaWxhYmxlJyB9KTsgcmV0dXJuIHRydWU7IH1cclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgYXNzaWdubWVudCA9IGF3YWl0IEFzc2lnbm1lbnRNb2RlbC5maW5kQnlJZChhc3NpZ25tZW50SWQpO1xyXG4gICAgICAgIGlmICghYXNzaWdubWVudCkgeyBzZW5kSnNvbihyZXMsIDQwNCwgeyBtZXNzYWdlOiAnQXNzaWdubWVudCBub3QgZm91bmQnIH0pOyByZXR1cm4gdHJ1ZTsgfVxyXG4gICAgICAgIGlmIChTdHJpbmcoYXNzaWdubWVudC5zdHVkZW50SWQpICE9PSB1c2VyLnVzZXJJZCkge1xyXG4gICAgICAgICAgc2VuZEpzb24ocmVzLCA0MDMsIHsgbWVzc2FnZTogJ1RoaXMgYXNzaWdubWVudCBpcyBub3QgYXNzaWduZWQgdG8geW91JyB9KTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgYm9keSA9IGF3YWl0IHBhcnNlSnNvbkJvZHkocmVxKTtcclxuICAgICAgICBjb25zdCB7IHRleHRSZXNwb25zZSwgYXR0YWNobWVudHMgfSA9IGJvZHk7XHJcbiAgICAgICAgY29uc3QgaXNMYXRlID0gbmV3IERhdGUoKSA+IG5ldyBEYXRlKGFzc2lnbm1lbnQuZHVlRGF0ZSk7XHJcblxyXG4gICAgICAgIC8vIFVwc2VydDogb25lIHN1Ym1pc3Npb24gcGVyIHN0dWRlbnQgcGVyIGFzc2lnbm1lbnRcclxuICAgICAgICBjb25zdCBleGlzdGluZyA9IGF3YWl0IEFzc2lnbm1lbnRTdWJtaXNzaW9uTW9kZWwuZmluZE9uZSh7XHJcbiAgICAgICAgICBhc3NpZ25tZW50SWQsXHJcbiAgICAgICAgICBzdHVkZW50SWQ6IHVzZXIudXNlcklkLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgc3VibWlzc2lvbjtcclxuICAgICAgICBpZiAoZXhpc3RpbmcpIHtcclxuICAgICAgICAgIGV4aXN0aW5nLnRleHRSZXNwb25zZSA9IHRleHRSZXNwb25zZSA/PyBleGlzdGluZy50ZXh0UmVzcG9uc2U7XHJcbiAgICAgICAgICBleGlzdGluZy5hdHRhY2htZW50cyA9IGF0dGFjaG1lbnRzID8/IGV4aXN0aW5nLmF0dGFjaG1lbnRzO1xyXG4gICAgICAgICAgZXhpc3RpbmcuaXNMYXRlID0gaXNMYXRlO1xyXG4gICAgICAgICAgc3VibWlzc2lvbiA9IGF3YWl0IGV4aXN0aW5nLnNhdmUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3VibWlzc2lvbiA9IGF3YWl0IEFzc2lnbm1lbnRTdWJtaXNzaW9uTW9kZWwuY3JlYXRlKHtcclxuICAgICAgICAgICAgYXNzaWdubWVudElkLFxyXG4gICAgICAgICAgICBzdHVkZW50SWQ6IHVzZXIudXNlcklkLFxyXG4gICAgICAgICAgICB0ZXh0UmVzcG9uc2U6IHRleHRSZXNwb25zZSA/PyAnJyxcclxuICAgICAgICAgICAgYXR0YWNobWVudHM6IGF0dGFjaG1lbnRzID8/IFtdLFxyXG4gICAgICAgICAgICBpc0xhdGUsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSBhc3NpZ25tZW50IHN0YXR1c1xyXG4gICAgICAgIGFzc2lnbm1lbnQuc3RhdHVzID0gaXNMYXRlID8gJ0xBVEUnIDogJ1NVQk1JVFRFRCc7XHJcbiAgICAgICAgYXdhaXQgYXNzaWdubWVudC5zYXZlKCk7XHJcblxyXG4gICAgICAgIC8vIExvZyBwcm9ncmVzcyBldmVudFxyXG4gICAgICAgIGF3YWl0IFByb2dyZXNzRXZlbnRNb2RlbC5jcmVhdGUoe1xyXG4gICAgICAgICAgc3R1ZGVudElkOiB1c2VyLnVzZXJJZCxcclxuICAgICAgICAgIHR5cGU6ICdhc3NpZ25tZW50X3N1Ym1pdHRlZCcsXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjogYFN1Ym1pdHRlZCBhc3NpZ25tZW50OiAke2Fzc2lnbm1lbnQudGl0bGV9JHtpc0xhdGUgPyAnIChsYXRlKScgOiAnJ31gLFxyXG4gICAgICAgICAgZW50aXR5SWQ6IGFzc2lnbm1lbnQuX2lkLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzZW5kSnNvbihyZXMsIDIwMSwge1xyXG4gICAgICAgICAgbWVzc2FnZTogaXNMYXRlID8gJ0Fzc2lnbm1lbnQgc3VibWl0dGVkIChtYXJrZWQgYXMgbGF0ZSknIDogJ0Fzc2lnbm1lbnQgc3VibWl0dGVkIHN1Y2Nlc3NmdWxseScsXHJcbiAgICAgICAgICBzdWJtaXNzaW9uLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBzZW5kSnNvbihyZXMsIDUwMCwgeyBtZXNzYWdlOiAoZXJyIGFzIEVycm9yKS5tZXNzYWdlIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBHRVQgL2FwaS9ldmFsdWF0aW9uL2Fzc2lnbm1lbnRzLzppZC9zdWJtaXNzaW9uIFx1MjAxNCB0ZWFjaGVyL2FkbWluIGdldHMgc3VibWlzc2lvblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIGlmIChwYXJ0c1sxXSA9PT0gJ3N1Ym1pc3Npb24nICYmIG1ldGhvZCA9PT0gJ0dFVCcpIHtcclxuICAgICAgY29uc3QgdXNlciA9IHZlcmlmeVRva2VuKHJlcSk7XHJcbiAgICAgIGlmICghdXNlcikgeyBzZW5kSnNvbihyZXMsIDQwMSwgeyBtZXNzYWdlOiAnVW5hdXRob3JpemVkJyB9KTsgcmV0dXJuIHRydWU7IH1cclxuICAgICAgaWYgKHVzZXIucm9sZSA9PT0gJ3N0dWRlbnQnKSB7IHNlbmRKc29uKHJlcywgNDAzLCB7IG1lc3NhZ2U6ICdGb3JiaWRkZW46IHRlYWNoZXJzL2FkbWlucyBvbmx5JyB9KTsgcmV0dXJuIHRydWU7IH1cclxuICAgICAgaWYgKCFtb25nb1JlYWR5KSB7IHNlbmRKc29uKHJlcywgNTAzLCB7IG1lc3NhZ2U6ICdEYXRhYmFzZSB1bmF2YWlsYWJsZScgfSk7IHJldHVybiB0cnVlOyB9XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHN1Ym1pc3Npb24gPSBhd2FpdCBBc3NpZ25tZW50U3VibWlzc2lvbk1vZGVsLmZpbmRPbmUoeyBhc3NpZ25tZW50SWQgfSlcclxuICAgICAgICAgIC5wb3B1bGF0ZSgnc3R1ZGVudElkJywgJ25hbWUgZW1haWwnKVxyXG4gICAgICAgICAgLmxlYW4oKTtcclxuICAgICAgICBpZiAoIXN1Ym1pc3Npb24pIHsgc2VuZEpzb24ocmVzLCA0MDQsIHsgbWVzc2FnZTogJ05vIHN1Ym1pc3Npb24gZm91bmQgZm9yIHRoaXMgYXNzaWdubWVudCcgfSk7IHJldHVybiB0cnVlOyB9XHJcbiAgICAgICAgc2VuZEpzb24ocmVzLCAyMDAsIHsgc3VibWlzc2lvbiB9KTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgc2VuZEpzb24ocmVzLCA1MDAsIHsgbWVzc2FnZTogKGVyciBhcyBFcnJvcikubWVzc2FnZSB9KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gR0VUIC9hcGkvZXZhbHVhdGlvbi9hc3NpZ25tZW50cy86aWQgXHUyMDE0IGdldCBzaW5nbGVcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBpZiAocGFydHMubGVuZ3RoID09PSAxICYmIG1ldGhvZCA9PT0gJ0dFVCcpIHtcclxuICAgICAgY29uc3QgdXNlciA9IHZlcmlmeVRva2VuKHJlcSk7XHJcbiAgICAgIGlmICghdXNlcikgeyBzZW5kSnNvbihyZXMsIDQwMSwgeyBtZXNzYWdlOiAnVW5hdXRob3JpemVkJyB9KTsgcmV0dXJuIHRydWU7IH1cclxuICAgICAgaWYgKCFtb25nb1JlYWR5KSB7IHNlbmRKc29uKHJlcywgNTAzLCB7IG1lc3NhZ2U6ICdEYXRhYmFzZSB1bmF2YWlsYWJsZScgfSk7IHJldHVybiB0cnVlOyB9XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGFzc2lnbm1lbnQgPSBhd2FpdCBBc3NpZ25tZW50TW9kZWwuZmluZEJ5SWQoYXNzaWdubWVudElkKS5sZWFuKCk7XHJcbiAgICAgICAgaWYgKCFhc3NpZ25tZW50KSB7IHNlbmRKc29uKHJlcywgNDA0LCB7IG1lc3NhZ2U6ICdBc3NpZ25tZW50IG5vdCBmb3VuZCcgfSk7IHJldHVybiB0cnVlOyB9XHJcbiAgICAgICAgLy8gU3R1ZGVudHMgY2FuIG9ubHkgc2VlIHRoZWlyIG93biBhc3NpZ25tZW50c1xyXG4gICAgICAgIGlmICh1c2VyLnJvbGUgPT09ICdzdHVkZW50JyAmJiBTdHJpbmcoYXNzaWdubWVudC5zdHVkZW50SWQpICE9PSB1c2VyLnVzZXJJZCkge1xyXG4gICAgICAgICAgc2VuZEpzb24ocmVzLCA0MDMsIHsgbWVzc2FnZTogJ0ZvcmJpZGRlbicgfSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VuZEpzb24ocmVzLCAyMDAsIHsgYXNzaWdubWVudCB9KTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgc2VuZEpzb24ocmVzLCA1MDAsIHsgbWVzc2FnZTogKGVyciBhcyBFcnJvcikubWVzc2FnZSB9KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gUEFUQ0ggL2FwaS9ldmFsdWF0aW9uL2Fzc2lnbm1lbnRzLzppZCBcdTIwMTQgdXBkYXRlXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMSAmJiBtZXRob2QgPT09ICdQQVRDSCcpIHtcclxuICAgICAgY29uc3QgdXNlciA9IHZlcmlmeVRva2VuKHJlcSk7XHJcbiAgICAgIGlmICghdXNlcikgeyBzZW5kSnNvbihyZXMsIDQwMSwgeyBtZXNzYWdlOiAnVW5hdXRob3JpemVkJyB9KTsgcmV0dXJuIHRydWU7IH1cclxuICAgICAgaWYgKHVzZXIucm9sZSA9PT0gJ3N0dWRlbnQnKSB7IHNlbmRKc29uKHJlcywgNDAzLCB7IG1lc3NhZ2U6ICdGb3JiaWRkZW46IHRlYWNoZXJzL2FkbWlucyBvbmx5JyB9KTsgcmV0dXJuIHRydWU7IH1cclxuICAgICAgaWYgKCFtb25nb1JlYWR5KSB7IHNlbmRKc29uKHJlcywgNTAzLCB7IG1lc3NhZ2U6ICdEYXRhYmFzZSB1bmF2YWlsYWJsZScgfSk7IHJldHVybiB0cnVlOyB9XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCBwYXJzZUpzb25Cb2R5KHJlcSk7XHJcbiAgICAgICAgY29uc3QgYWxsb3dlZCA9IFsndGl0bGUnLCAnaW5zdHJ1Y3Rpb25zJywgJ2F0dGFjaG1lbnRzJywgJ21heE1hcmtzJywgJ2R1ZURhdGUnLCAnc3RhdHVzJywgJ3N0dWRlbnRJZCcsICdzdWJqZWN0SWQnLCAnbW9kdWxlSWQnXTtcclxuICAgICAgICBjb25zdCB1cGRhdGVzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge307XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgYWxsb3dlZCkge1xyXG4gICAgICAgICAgaWYgKGJvZHlba2V5XSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHVwZGF0ZXNba2V5XSA9IGtleSA9PT0gJ2R1ZURhdGUnID8gbmV3IERhdGUoYm9keVtrZXldKSA6IGJvZHlba2V5XTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGFzc2lnbm1lbnQgPSBhd2FpdCBBc3NpZ25tZW50TW9kZWwuZmluZEJ5SWRBbmRVcGRhdGUoXHJcbiAgICAgICAgICBhc3NpZ25tZW50SWQsXHJcbiAgICAgICAgICB7ICRzZXQ6IHVwZGF0ZXMgfSxcclxuICAgICAgICAgIHsgbmV3OiB0cnVlLCBydW5WYWxpZGF0b3JzOiB0cnVlIH1cclxuICAgICAgICApLmxlYW4oKTtcclxuXHJcbiAgICAgICAgaWYgKCFhc3NpZ25tZW50KSB7IHNlbmRKc29uKHJlcywgNDA0LCB7IG1lc3NhZ2U6ICdBc3NpZ25tZW50IG5vdCBmb3VuZCcgfSk7IHJldHVybiB0cnVlOyB9XHJcbiAgICAgICAgc2VuZEpzb24ocmVzLCAyMDAsIHsgbWVzc2FnZTogJ0Fzc2lnbm1lbnQgdXBkYXRlZCcsIGFzc2lnbm1lbnQgfSk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIHNlbmRKc29uKHJlcywgNTAwLCB7IG1lc3NhZ2U6IChlcnIgYXMgRXJyb3IpLm1lc3NhZ2UgfSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIERFTEVURSAvYXBpL2V2YWx1YXRpb24vYXNzaWdubWVudHMvOmlkIFx1MjAxNCBkZWxldGVcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBpZiAocGFydHMubGVuZ3RoID09PSAxICYmIG1ldGhvZCA9PT0gJ0RFTEVURScpIHtcclxuICAgICAgY29uc3QgdXNlciA9IHZlcmlmeVRva2VuKHJlcSk7XHJcbiAgICAgIGlmICghdXNlcikgeyBzZW5kSnNvbihyZXMsIDQwMSwgeyBtZXNzYWdlOiAnVW5hdXRob3JpemVkJyB9KTsgcmV0dXJuIHRydWU7IH1cclxuICAgICAgaWYgKHVzZXIucm9sZSA9PT0gJ3N0dWRlbnQnKSB7IHNlbmRKc29uKHJlcywgNDAzLCB7IG1lc3NhZ2U6ICdGb3JiaWRkZW46IHRlYWNoZXJzL2FkbWlucyBvbmx5JyB9KTsgcmV0dXJuIHRydWU7IH1cclxuICAgICAgaWYgKCFtb25nb1JlYWR5KSB7IHNlbmRKc29uKHJlcywgNTAzLCB7IG1lc3NhZ2U6ICdEYXRhYmFzZSB1bmF2YWlsYWJsZScgfSk7IHJldHVybiB0cnVlOyB9XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGFzc2lnbm1lbnQgPSBhd2FpdCBBc3NpZ25tZW50TW9kZWwuZmluZEJ5SWRBbmREZWxldGUoYXNzaWdubWVudElkKS5sZWFuKCk7XHJcbiAgICAgICAgaWYgKCFhc3NpZ25tZW50KSB7IHNlbmRKc29uKHJlcywgNDA0LCB7IG1lc3NhZ2U6ICdBc3NpZ25tZW50IG5vdCBmb3VuZCcgfSk7IHJldHVybiB0cnVlOyB9XHJcbiAgICAgICAgc2VuZEpzb24ocmVzLCAyMDAsIHsgbWVzc2FnZTogJ0Fzc2lnbm1lbnQgZGVsZXRlZCcgfSk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIHNlbmRKc29uKHJlcywgNTAwLCB7IG1lc3NhZ2U6IChlcnIgYXMgRXJyb3IpLm1lc3NhZ2UgfSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgLy8gQVNTSUdOTUVOVCBTVUJNSVNTSU9OUyBcdTIwMTQgbWFudWFsIGdyYWRlXHJcbiAgLy8gUEFUQ0ggL2FwaS9ldmFsdWF0aW9uL3N1Ym1pc3Npb25zL2Fzc2lnbm1lbnQvOnN1YklkL2dyYWRlXHJcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gIGlmICh1cmwuc3RhcnRzV2l0aCgnL2FwaS9ldmFsdWF0aW9uL3N1Ym1pc3Npb25zL2Fzc2lnbm1lbnQvJykgJiYgdXJsLmVuZHNXaXRoKCcvZ3JhZGUnKSAmJiBtZXRob2QgPT09ICdQQVRDSCcpIHtcclxuICAgIGNvbnN0IHVzZXIgPSB2ZXJpZnlUb2tlbihyZXEpO1xyXG4gICAgaWYgKCF1c2VyKSB7IHNlbmRKc29uKHJlcywgNDAxLCB7IG1lc3NhZ2U6ICdVbmF1dGhvcml6ZWQnIH0pOyByZXR1cm4gdHJ1ZTsgfVxyXG4gICAgaWYgKHVzZXIucm9sZSA9PT0gJ3N0dWRlbnQnKSB7IHNlbmRKc29uKHJlcywgNDAzLCB7IG1lc3NhZ2U6ICdGb3JiaWRkZW46IHRlYWNoZXJzL2FkbWlucyBvbmx5JyB9KTsgcmV0dXJuIHRydWU7IH1cclxuICAgIGlmICghbW9uZ29SZWFkeSkgeyBzZW5kSnNvbihyZXMsIDUwMywgeyBtZXNzYWdlOiAnRGF0YWJhc2UgdW5hdmFpbGFibGUnIH0pOyByZXR1cm4gdHJ1ZTsgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHN1YklkID0gZXh0cmFjdFNlZ21lbnQodXJsLCAnL2FwaS9ldmFsdWF0aW9uL3N1Ym1pc3Npb25zL2Fzc2lnbm1lbnQvJyk7XHJcbiAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCBwYXJzZUpzb25Cb2R5KHJlcSk7XHJcbiAgICAgIGNvbnN0IHsgbWFya3MsIGZlZWRiYWNrIH0gPSBib2R5O1xyXG5cclxuICAgICAgaWYgKG1hcmtzID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIG1hcmtzICE9PSAnbnVtYmVyJykge1xyXG4gICAgICAgIHNlbmRKc29uKHJlcywgNDAwLCB7IG1lc3NhZ2U6ICdtYXJrcyAobnVtYmVyKSBpcyByZXF1aXJlZCcgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHN1YiA9IGF3YWl0IEFzc2lnbm1lbnRTdWJtaXNzaW9uTW9kZWwuZmluZEJ5SWQoc3ViSWQpO1xyXG4gICAgICBpZiAoIXN1YikgeyBzZW5kSnNvbihyZXMsIDQwNCwgeyBtZXNzYWdlOiAnU3VibWlzc2lvbiBub3QgZm91bmQnIH0pOyByZXR1cm4gdHJ1ZTsgfVxyXG5cclxuICAgICAgc3ViLm1hcmtzID0gbWFya3M7XHJcbiAgICAgIGlmIChmZWVkYmFjayAhPT0gdW5kZWZpbmVkKSBzdWIuZmVlZGJhY2sgPSBmZWVkYmFjaztcclxuICAgICAgc3ViLmdyYWRlZEF0ID0gbmV3IERhdGUoKTtcclxuICAgICAgc3ViLmdyYWRlZEJ5ID0gdXNlci51c2VySWQgYXMgYW55O1xyXG4gICAgICBhd2FpdCBzdWIuc2F2ZSgpO1xyXG5cclxuICAgICAgLy8gVXBkYXRlIGFzc2lnbm1lbnQgc3RhdHVzIFx1MjE5MiBHUkFERURcclxuICAgICAgYXdhaXQgQXNzaWdubWVudE1vZGVsLmZpbmRCeUlkQW5kVXBkYXRlKHN1Yi5hc3NpZ25tZW50SWQsIHsgc3RhdHVzOiAnR1JBREVEJyB9KTtcclxuXHJcbiAgICAgIC8vIEFzeW5jIGxlYWRlcmJvYXJkIHVwc2VydCAobm9uLWJsb2NraW5nKVxyXG4gICAgICB1cHNlcnRMZWFkZXJib2FyZEFzc2lnbm1lbnRTY29yZShTdHJpbmcoc3ViLnN0dWRlbnRJZCkpLmNhdGNoKCgpID0+IHt9KTtcclxuXHJcbiAgICAgIHNlbmRKc29uKHJlcywgMjAwLCB7IG1lc3NhZ2U6ICdBc3NpZ25tZW50IGdyYWRlZCBzdWNjZXNzZnVsbHknLCBzdWJtaXNzaW9uOiBzdWIgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgc2VuZEpzb24ocmVzLCA1MDAsIHsgbWVzc2FnZTogKGVyciBhcyBFcnJvcikubWVzc2FnZSB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gIC8vIFBST0dSRVNTXHJcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAvLyBHRVQgL2FwaS9ldmFsdWF0aW9uL3Byb2dyZXNzL2V2ZW50cyBcdTIwMTQgb3duIGV2ZW50IGZlZWQgKG11c3QgY29tZSBiZWZvcmUgL3Byb2dyZXNzLzpzdHVkZW50SWQpXHJcbiAgaWYgKHVybCA9PT0gJy9hcGkvZXZhbHVhdGlvbi9wcm9ncmVzcy9ldmVudHMnICYmIG1ldGhvZCA9PT0gJ0dFVCcpIHtcclxuICAgIGNvbnN0IHVzZXIgPSB2ZXJpZnlUb2tlbihyZXEpO1xyXG4gICAgaWYgKCF1c2VyKSB7IHNlbmRKc29uKHJlcywgNDAxLCB7IG1lc3NhZ2U6ICdVbmF1dGhvcml6ZWQnIH0pOyByZXR1cm4gdHJ1ZTsgfVxyXG4gICAgaWYgKCFtb25nb1JlYWR5KSB7IHNlbmRKc29uKHJlcywgMjAwLCB7IGV2ZW50czogW10gfSk7IHJldHVybiB0cnVlOyB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHJhd1VybC5zcGxpdCgnPycpWzFdID8/ICcnKTtcclxuICAgICAgY29uc3QgbGltaXQgPSBNYXRoLm1pbihwYXJzZUludChxcy5nZXQoJ2xpbWl0JykgPz8gJzUwJywgMTApLCAyMDApO1xyXG4gICAgICBjb25zdCBzdHVkZW50SWQgPSB1c2VyLnJvbGUgPT09ICdzdHVkZW50JyA/IHVzZXIudXNlcklkIDogKHFzLmdldCgnc3R1ZGVudElkJykgPz8gdXNlci51c2VySWQpO1xyXG5cclxuICAgICAgY29uc3QgZXZlbnRzID0gYXdhaXQgUHJvZ3Jlc3NFdmVudE1vZGVsLmZpbmQoeyBzdHVkZW50SWQgfSlcclxuICAgICAgICAuc29ydCh7IGNyZWF0ZWRBdDogLTEgfSlcclxuICAgICAgICAubGltaXQobGltaXQpXHJcbiAgICAgICAgLmxlYW4oKTtcclxuXHJcbiAgICAgIHNlbmRKc29uKHJlcywgMjAwLCB7IGV2ZW50cyB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBzZW5kSnNvbihyZXMsIDUwMCwgeyBtZXNzYWdlOiAoZXJyIGFzIEVycm9yKS5tZXNzYWdlIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICAvLyBQT1NUIC9hcGkvZXZhbHVhdGlvbi9wcm9ncmVzcy9ldmVudCBcdTIwMTQgbG9nIHByb2dyZXNzIGV2ZW50XHJcbiAgaWYgKHVybCA9PT0gJy9hcGkvZXZhbHVhdGlvbi9wcm9ncmVzcy9ldmVudCcgJiYgbWV0aG9kID09PSAnUE9TVCcpIHtcclxuICAgIGNvbnN0IHVzZXIgPSB2ZXJpZnlUb2tlbihyZXEpO1xyXG4gICAgaWYgKCF1c2VyKSB7IHNlbmRKc29uKHJlcywgNDAxLCB7IG1lc3NhZ2U6ICdVbmF1dGhvcml6ZWQnIH0pOyByZXR1cm4gdHJ1ZTsgfVxyXG4gICAgaWYgKCFtb25nb1JlYWR5KSB7IHNlbmRKc29uKHJlcywgNTAzLCB7IG1lc3NhZ2U6ICdEYXRhYmFzZSB1bmF2YWlsYWJsZScgfSk7IHJldHVybiB0cnVlOyB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgYm9keSA9IGF3YWl0IHBhcnNlSnNvbkJvZHkocmVxKTtcclxuICAgICAgY29uc3QgeyB0eXBlLCBkZXNjcmlwdGlvbiwgZW50aXR5SWQgfSA9IGJvZHk7XHJcblxyXG4gICAgICBjb25zdCBWQUxJRF9UWVBFUyA9IFsnY29udGVudF9jb21wbGV0ZWQnLCAnYXNzZXNzbWVudF9zdWJtaXR0ZWQnLCAnYXNzaWdubWVudF9zdWJtaXR0ZWQnLCAnbG9naW4nLCAnbW9kdWxlX2NvbXBsZXRlZCddO1xyXG4gICAgICBpZiAoIXR5cGUgfHwgIVZBTElEX1RZUEVTLmluY2x1ZGVzKHR5cGUpKSB7XHJcbiAgICAgICAgc2VuZEpzb24ocmVzLCA0MDAsIHsgbWVzc2FnZTogYHR5cGUgbXVzdCBiZSBvbmUgb2Y6ICR7VkFMSURfVFlQRVMuam9pbignLCAnKX1gIH0pO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghZGVzY3JpcHRpb24pIHtcclxuICAgICAgICBzZW5kSnNvbihyZXMsIDQwMCwgeyBtZXNzYWdlOiAnZGVzY3JpcHRpb24gaXMgcmVxdWlyZWQnIH0pO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBldmVudCA9IGF3YWl0IFByb2dyZXNzRXZlbnRNb2RlbC5jcmVhdGUoe1xyXG4gICAgICAgIHN0dWRlbnRJZDogdXNlci51c2VySWQsXHJcbiAgICAgICAgdHlwZSxcclxuICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24udHJpbSgpLFxyXG4gICAgICAgIGVudGl0eUlkOiBlbnRpdHlJZCA/PyB1bmRlZmluZWQsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gSWYgY29udGVudF9jb21wbGV0ZWQsIHRyeSB0byB1cGRhdGUgdGhlIFByb2dyZXNzIHJlY29yZFxyXG4gICAgICBpZiAodHlwZSA9PT0gJ2NvbnRlbnRfY29tcGxldGVkJyAmJiBlbnRpdHlJZCAmJiBib2R5Lm1vZHVsZUlkICYmIGJvZHkuc3ViamVjdElkKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IHByb2dyZXNzID0gYXdhaXQgUHJvZ3Jlc3NNb2RlbC5maW5kT25lKHtcclxuICAgICAgICAgICAgc3R1ZGVudElkOiB1c2VyLnVzZXJJZCxcclxuICAgICAgICAgICAgbW9kdWxlSWQ6IGJvZHkubW9kdWxlSWQsXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBpZiAocHJvZ3Jlc3MpIHtcclxuICAgICAgICAgICAgY29uc3QgYWxyZWFkeUNvbXBsZXRlZCA9IHByb2dyZXNzLmNvbXBsZXRlZENvbnRlbnRJZHNcclxuICAgICAgICAgICAgICAubWFwKFN0cmluZylcclxuICAgICAgICAgICAgICAuaW5jbHVkZXMoU3RyaW5nKGVudGl0eUlkKSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWFscmVhZHlDb21wbGV0ZWQpIHtcclxuICAgICAgICAgICAgICBwcm9ncmVzcy5jb21wbGV0ZWRDb250ZW50SWRzLnB1c2goZW50aXR5SWQpO1xyXG4gICAgICAgICAgICAgIHByb2dyZXNzLmxhc3RBY2Nlc3NlZEF0ID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAvLyBSZWNvbXB1dGUgY29tcGxldGlvblBlcmNlbnRhZ2UgaWYgdG90YWxJdGVtcyBwcm92aWRlZFxyXG4gICAgICAgICAgICAgIGlmIChib2R5LnRvdGFsSXRlbXMgJiYgYm9keS50b3RhbEl0ZW1zID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3MuY29tcGxldGlvblBlcmNlbnRhZ2UgPSBNYXRoLnJvdW5kKFxyXG4gICAgICAgICAgICAgICAgICAocHJvZ3Jlc3MuY29tcGxldGVkQ29udGVudElkcy5sZW5ndGggLyBib2R5LnRvdGFsSXRlbXMpICogMTAwXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBhd2FpdCBwcm9ncmVzcy5zYXZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIEZpcnN0IGFjY2VzcyBcdTIwMTQgY3JlYXRlIHByb2dyZXNzIHJlY29yZFxyXG4gICAgICAgICAgICBhd2FpdCBQcm9ncmVzc01vZGVsLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgICAgc3R1ZGVudElkOiB1c2VyLnVzZXJJZCxcclxuICAgICAgICAgICAgICBzdWJqZWN0SWQ6IGJvZHkuc3ViamVjdElkLFxyXG4gICAgICAgICAgICAgIG1vZHVsZUlkOiBib2R5Lm1vZHVsZUlkLFxyXG4gICAgICAgICAgICAgIGNvbXBsZXRlZENvbnRlbnRJZHM6IFtlbnRpdHlJZF0sXHJcbiAgICAgICAgICAgICAgY29tcGxldGlvblBlcmNlbnRhZ2U6IGJvZHkudG90YWxJdGVtcyA/IE1hdGgucm91bmQoKDEgLyBib2R5LnRvdGFsSXRlbXMpICogMTAwKSA6IDAsXHJcbiAgICAgICAgICAgICAgbGFzdEFjY2Vzc2VkQXQ6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgLy8gTm9uLWZhdGFsIFx1MjAxNCBwcm9ncmVzcyB1cGRhdGUgZmFpbHVyZSBkb2Vzbid0IGZhaWwgdGhlIGV2ZW50XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBzZW5kSnNvbihyZXMsIDIwMSwgeyBtZXNzYWdlOiAnUHJvZ3Jlc3MgZXZlbnQgbG9nZ2VkJywgZXZlbnQgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgc2VuZEpzb24ocmVzLCA1MDAsIHsgbWVzc2FnZTogKGVyciBhcyBFcnJvcikubWVzc2FnZSB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLy8gR0VUIC9hcGkvZXZhbHVhdGlvbi9wcm9ncmVzcyBcdTIwMTQgb3duIHByb2dyZXNzIHJlY29yZHMgKHN0dWRlbnQpXHJcbiAgaWYgKHVybCA9PT0gJy9hcGkvZXZhbHVhdGlvbi9wcm9ncmVzcycgJiYgbWV0aG9kID09PSAnR0VUJykge1xyXG4gICAgY29uc3QgdXNlciA9IHZlcmlmeVRva2VuKHJlcSk7XHJcbiAgICBpZiAoIXVzZXIpIHsgc2VuZEpzb24ocmVzLCA0MDEsIHsgbWVzc2FnZTogJ1VuYXV0aG9yaXplZCcgfSk7IHJldHVybiB0cnVlOyB9XHJcbiAgICBpZiAoIW1vbmdvUmVhZHkpIHsgc2VuZEpzb24ocmVzLCAyMDAsIHsgcHJvZ3Jlc3M6IFtdIH0pOyByZXR1cm4gdHJ1ZTsgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHN0dWRlbnRJZCA9IHVzZXIucm9sZSA9PT0gJ3N0dWRlbnQnXHJcbiAgICAgICAgPyB1c2VyLnVzZXJJZFxyXG4gICAgICAgIDogKG5ldyBVUkxTZWFyY2hQYXJhbXMocmF3VXJsLnNwbGl0KCc/JylbMV0gPz8gJycpKS5nZXQoJ3N0dWRlbnRJZCcpID8/IHVzZXIudXNlcklkO1xyXG5cclxuICAgICAgY29uc3QgcHJvZ3Jlc3MgPSBhd2FpdCBQcm9ncmVzc01vZGVsLmZpbmQoeyBzdHVkZW50SWQgfSlcclxuICAgICAgICAucG9wdWxhdGUoJ3N1YmplY3RJZCcsICduYW1lJylcclxuICAgICAgICAucG9wdWxhdGUoJ21vZHVsZUlkJywgJ3RpdGxlJylcclxuICAgICAgICAuc29ydCh7IGxhc3RBY2Nlc3NlZEF0OiAtMSB9KVxyXG4gICAgICAgIC5sZWFuKCk7XHJcblxyXG4gICAgICBzZW5kSnNvbihyZXMsIDIwMCwgeyBwcm9ncmVzcyB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBzZW5kSnNvbihyZXMsIDUwMCwgeyBtZXNzYWdlOiAoZXJyIGFzIEVycm9yKS5tZXNzYWdlIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICAvLyBHRVQgL2FwaS9ldmFsdWF0aW9uL3Byb2dyZXNzLzpzdHVkZW50SWQgXHUyMDE0IHRlYWNoZXIvYWRtaW4gdmlld3MgYSBzdHVkZW50J3MgcHJvZ3Jlc3NcclxuICBpZiAodXJsLnN0YXJ0c1dpdGgoJy9hcGkvZXZhbHVhdGlvbi9wcm9ncmVzcy8nKSAmJiBtZXRob2QgPT09ICdHRVQnKSB7XHJcbiAgICBjb25zdCB1c2VyID0gdmVyaWZ5VG9rZW4ocmVxKTtcclxuICAgIGlmICghdXNlcikgeyBzZW5kSnNvbihyZXMsIDQwMSwgeyBtZXNzYWdlOiAnVW5hdXRob3JpemVkJyB9KTsgcmV0dXJuIHRydWU7IH1cclxuICAgIGlmICh1c2VyLnJvbGUgPT09ICdzdHVkZW50JykgeyBzZW5kSnNvbihyZXMsIDQwMywgeyBtZXNzYWdlOiAnRm9yYmlkZGVuOiB0ZWFjaGVycy9hZG1pbnMgb25seScgfSk7IHJldHVybiB0cnVlOyB9XHJcbiAgICBpZiAoIW1vbmdvUmVhZHkpIHsgc2VuZEpzb24ocmVzLCAyMDAsIHsgcHJvZ3Jlc3M6IFtdIH0pOyByZXR1cm4gdHJ1ZTsgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHN0dWRlbnRJZCA9IHVybC5zbGljZSgnL2FwaS9ldmFsdWF0aW9uL3Byb2dyZXNzLycubGVuZ3RoKS5zcGxpdCgnLycpWzBdO1xyXG4gICAgICBjb25zdCBwcm9ncmVzcyA9IGF3YWl0IFByb2dyZXNzTW9kZWwuZmluZCh7IHN0dWRlbnRJZCB9KVxyXG4gICAgICAgIC5wb3B1bGF0ZSgnc3ViamVjdElkJywgJ25hbWUnKVxyXG4gICAgICAgIC5wb3B1bGF0ZSgnbW9kdWxlSWQnLCAndGl0bGUnKVxyXG4gICAgICAgIC5zb3J0KHsgbGFzdEFjY2Vzc2VkQXQ6IC0xIH0pXHJcbiAgICAgICAgLmxlYW4oKTtcclxuXHJcbiAgICAgIHNlbmRKc29uKHJlcywgMjAwLCB7IHByb2dyZXNzIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHNlbmRKc29uKHJlcywgNTAwLCB7IG1lc3NhZ2U6IChlcnIgYXMgRXJyb3IpLm1lc3NhZ2UgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAvLyBMRUFERVJCT0FSRFxyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgLy8gR0VUIC9hcGkvZXZhbHVhdGlvbi9sZWFkZXJib2FyZC9tZSBcdTIwMTQgb3duIGVudHJ5XHJcbiAgaWYgKHVybCA9PT0gJy9hcGkvZXZhbHVhdGlvbi9sZWFkZXJib2FyZC9tZScgJiYgbWV0aG9kID09PSAnR0VUJykge1xyXG4gICAgY29uc3QgdXNlciA9IHZlcmlmeVRva2VuKHJlcSk7XHJcbiAgICBpZiAoIXVzZXIpIHsgc2VuZEpzb24ocmVzLCA0MDEsIHsgbWVzc2FnZTogJ1VuYXV0aG9yaXplZCcgfSk7IHJldHVybiB0cnVlOyB9XHJcbiAgICBpZiAoIW1vbmdvUmVhZHkpIHsgc2VuZEpzb24ocmVzLCAyMDAsIHsgc2NvcmU6IG51bGwgfSk7IHJldHVybiB0cnVlOyB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3Qgc2NvcmUgPSBhd2FpdCBMZWFkZXJib2FyZFNjb3JlTW9kZWwuZmluZE9uZSh7IHN0dWRlbnRJZDogdXNlci51c2VySWQgfSlcclxuICAgICAgICAucG9wdWxhdGUoJ3Byb2dyYW1JZCcsICduYW1lJylcclxuICAgICAgICAucG9wdWxhdGUoJ2NvaG9ydElkJywgJ25hbWUnKVxyXG4gICAgICAgIC5sZWFuKCk7XHJcblxyXG4gICAgICBzZW5kSnNvbihyZXMsIDIwMCwgeyBzY29yZSB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBzZW5kSnNvbihyZXMsIDUwMCwgeyBtZXNzYWdlOiAoZXJyIGFzIEVycm9yKS5tZXNzYWdlIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICAvLyBHRVQgL2FwaS9ldmFsdWF0aW9uL2xlYWRlcmJvYXJkIFx1MjAxNCBsaXN0IChmaWx0ZXIgYnkgY29ob3J0SWQgLyBwcm9ncmFtSWQpXHJcbiAgaWYgKHVybCA9PT0gJy9hcGkvZXZhbHVhdGlvbi9sZWFkZXJib2FyZCcgJiYgbWV0aG9kID09PSAnR0VUJykge1xyXG4gICAgY29uc3QgdXNlciA9IHZlcmlmeVRva2VuKHJlcSk7XHJcbiAgICBpZiAoIXVzZXIpIHsgc2VuZEpzb24ocmVzLCA0MDEsIHsgbWVzc2FnZTogJ1VuYXV0aG9yaXplZCcgfSk7IHJldHVybiB0cnVlOyB9XHJcbiAgICBpZiAoIW1vbmdvUmVhZHkpIHsgc2VuZEpzb24ocmVzLCAyMDAsIHsgbGVhZGVyYm9hcmQ6IFtdIH0pOyByZXR1cm4gdHJ1ZTsgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHFzID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhyYXdVcmwuc3BsaXQoJz8nKVsxXSA/PyAnJyk7XHJcbiAgICAgIGNvbnN0IGZpbHRlcjogUmVjb3JkPHN0cmluZywgYW55PiA9IHt9O1xyXG4gICAgICBpZiAocXMuZ2V0KCdjb2hvcnRJZCcpKSBmaWx0ZXIuY29ob3J0SWQgPSBxcy5nZXQoJ2NvaG9ydElkJyk7XHJcbiAgICAgIGlmIChxcy5nZXQoJ3Byb2dyYW1JZCcpKSBmaWx0ZXIucHJvZ3JhbUlkID0gcXMuZ2V0KCdwcm9ncmFtSWQnKTtcclxuXHJcbiAgICAgIGNvbnN0IGxlYWRlcmJvYXJkID0gYXdhaXQgTGVhZGVyYm9hcmRTY29yZU1vZGVsLmZpbmQoZmlsdGVyKVxyXG4gICAgICAgIC5wb3B1bGF0ZSgnc3R1ZGVudElkJywgJ25hbWUgZW1haWwnKVxyXG4gICAgICAgIC5wb3B1bGF0ZSgncHJvZ3JhbUlkJywgJ25hbWUnKVxyXG4gICAgICAgIC5wb3B1bGF0ZSgnY29ob3J0SWQnLCAnbmFtZScpXHJcbiAgICAgICAgLnNvcnQoeyByYW5rOiAxLCBvdmVyYWxsU2NvcmU6IC0xIH0pXHJcbiAgICAgICAgLmxlYW4oKTtcclxuXHJcbiAgICAgIHNlbmRKc29uKHJlcywgMjAwLCB7IGxlYWRlcmJvYXJkIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHNlbmRKc29uKHJlcywgNTAwLCB7IG1lc3NhZ2U6IChlcnIgYXMgRXJyb3IpLm1lc3NhZ2UgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8vIFJvdXRlIG5vdCBoYW5kbGVkIGJ5IHRoaXMgaGFuZGxlclxyXG4gIHJldHVybiBmYWxzZTtcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHBlZ2dhXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcbW9ja1xcXFxwcm9qZWN0XFxcXHNyY1xcXFxzZXJ2ZXJcXFxcbW9kZWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwZWdnYVxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXG1vY2tcXFxccHJvamVjdFxcXFxzcmNcXFxcc2VydmVyXFxcXG1vZGVsc1xcXFxBc3Nlc3NtZW50U3VibWlzc2lvbi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvcGVnZ2EvT25lRHJpdmUvRGVza3RvcC9tb2NrL3Byb2plY3Qvc3JjL3NlcnZlci9tb2RlbHMvQXNzZXNzbWVudFN1Ym1pc3Npb24udHNcIjtpbXBvcnQgbW9uZ29vc2UsIHsgU2NoZW1hLCBEb2N1bWVudCwgTW9kZWwsIFR5cGVzIH0gZnJvbSAnbW9uZ29vc2UnO1xyXG5cclxuZXhwb3J0IHR5cGUgQXNzZXNzbWVudFN1Ym1pc3Npb25TdGF0dXMgPSAnc3VibWl0dGVkJyB8ICdncmFkZWQnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQXNzZXNzbWVudFN1Ym1pc3Npb24ge1xyXG4gIGFzc2Vzc21lbnRJZDogVHlwZXMuT2JqZWN0SWQ7XHJcbiAgc3R1ZGVudElkOiBUeXBlcy5PYmplY3RJZDtcclxuICBhbnN3ZXJzOiBNYXA8c3RyaW5nLCBzdHJpbmcgfCBzdHJpbmdbXT47XHJcbiAgc2NvcmU6IG51bWJlcjtcclxuICBwZXJjZW50YWdlOiBudW1iZXI7XHJcbiAgcGFzc2VkOiBib29sZWFuO1xyXG4gIGZlZWRiYWNrPzogc3RyaW5nO1xyXG4gIHN0YXR1czogQXNzZXNzbWVudFN1Ym1pc3Npb25TdGF0dXM7XHJcbiAgYXR0ZW1wdE51bWJlcjogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElBc3Nlc3NtZW50U3VibWlzc2lvbkRvY3VtZW50IGV4dGVuZHMgSUFzc2Vzc21lbnRTdWJtaXNzaW9uLCBEb2N1bWVudCB7fVxyXG5cclxuY29uc3QgQXNzZXNzbWVudFN1Ym1pc3Npb25TY2hlbWEgPSBuZXcgU2NoZW1hPElBc3Nlc3NtZW50U3VibWlzc2lvbkRvY3VtZW50PihcclxuICB7XHJcbiAgICBhc3Nlc3NtZW50SWQ6IHtcclxuICAgICAgdHlwZTogU2NoZW1hLlR5cGVzLk9iamVjdElkLFxyXG4gICAgICByZWY6ICdBc3Nlc3NtZW50JyxcclxuICAgICAgcmVxdWlyZWQ6IFt0cnVlLCAnQXNzZXNzbWVudCBpcyByZXF1aXJlZCddLFxyXG4gICAgfSxcclxuICAgIHN0dWRlbnRJZDoge1xyXG4gICAgICB0eXBlOiBTY2hlbWEuVHlwZXMuT2JqZWN0SWQsXHJcbiAgICAgIHJlZjogJ1VzZXInLFxyXG4gICAgICByZXF1aXJlZDogW3RydWUsICdTdHVkZW50IGlzIHJlcXVpcmVkJ10sXHJcbiAgICB9LFxyXG4gICAgYW5zd2Vyczoge1xyXG4gICAgICB0eXBlOiBNYXAsXHJcbiAgICAgIG9mOiBTY2hlbWEuVHlwZXMuTWl4ZWQsIC8vIHN0cmluZyBvciBzdHJpbmdbXVxyXG4gICAgICBkZWZhdWx0OiBuZXcgTWFwKCksXHJcbiAgICB9LFxyXG4gICAgc2NvcmU6IHsgdHlwZTogTnVtYmVyLCByZXF1aXJlZDogdHJ1ZSwgbWluOiAwIH0sXHJcbiAgICBwZXJjZW50YWdlOiB7IHR5cGU6IE51bWJlciwgcmVxdWlyZWQ6IHRydWUsIG1pbjogMCwgbWF4OiAxMDAgfSxcclxuICAgIHBhc3NlZDogeyB0eXBlOiBCb29sZWFuLCByZXF1aXJlZDogdHJ1ZSB9LFxyXG4gICAgZmVlZGJhY2s6IHsgdHlwZTogU3RyaW5nLCB0cmltOiB0cnVlIH0sXHJcbiAgICBzdGF0dXM6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICBlbnVtOiBbJ3N1Ym1pdHRlZCcsICdncmFkZWQnXSxcclxuICAgICAgZGVmYXVsdDogJ3N1Ym1pdHRlZCcsXHJcbiAgICB9LFxyXG4gICAgYXR0ZW1wdE51bWJlcjogeyB0eXBlOiBOdW1iZXIsIGRlZmF1bHQ6IDEsIG1pbjogMSB9LFxyXG4gIH0sXHJcbiAgeyB0aW1lc3RhbXBzOiB0cnVlIH1cclxuKTtcclxuXHJcbkFzc2Vzc21lbnRTdWJtaXNzaW9uU2NoZW1hLmluZGV4KHsgYXNzZXNzbWVudElkOiAxLCBzdHVkZW50SWQ6IDEgfSk7XHJcbkFzc2Vzc21lbnRTdWJtaXNzaW9uU2NoZW1hLmluZGV4KHsgc3R1ZGVudElkOiAxIH0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IEFzc2Vzc21lbnRTdWJtaXNzaW9uTW9kZWw6IE1vZGVsPElBc3Nlc3NtZW50U3VibWlzc2lvbkRvY3VtZW50PiA9XHJcbiAgbW9uZ29vc2UubW9kZWxzLkFzc2Vzc21lbnRTdWJtaXNzaW9uIHx8XHJcbiAgbW9uZ29vc2UubW9kZWw8SUFzc2Vzc21lbnRTdWJtaXNzaW9uRG9jdW1lbnQ+KCdBc3Nlc3NtZW50U3VibWlzc2lvbicsIEFzc2Vzc21lbnRTdWJtaXNzaW9uU2NoZW1hKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFzc2Vzc21lbnRTdWJtaXNzaW9uTW9kZWw7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxccGVnZ2FcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxtb2NrXFxcXHByb2plY3RcXFxcc3JjXFxcXHNlcnZlclxcXFxtb2RlbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHBlZ2dhXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcbW9ja1xcXFxwcm9qZWN0XFxcXHNyY1xcXFxzZXJ2ZXJcXFxcbW9kZWxzXFxcXEFzc2lnbm1lbnQudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3BlZ2dhL09uZURyaXZlL0Rlc2t0b3AvbW9jay9wcm9qZWN0L3NyYy9zZXJ2ZXIvbW9kZWxzL0Fzc2lnbm1lbnQudHNcIjtpbXBvcnQgbW9uZ29vc2UsIHsgU2NoZW1hLCBEb2N1bWVudCwgTW9kZWwsIFR5cGVzIH0gZnJvbSAnbW9uZ29vc2UnO1xyXG5cclxuZXhwb3J0IHR5cGUgQXNzaWdubWVudFN0YXR1cyA9XHJcbiAgfCAnTkVXJ1xyXG4gIHwgJ0lOX1BST0dSRVNTJ1xyXG4gIHwgJ1NVQk1JVFRFRCdcclxuICB8ICdMQVRFJ1xyXG4gIHwgJ0dSQURFRCdcclxuICB8ICdPVkVSRFVFJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUF0dGFjaG1lbnQge1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBzaXplOiBudW1iZXI7XHJcbiAgdHlwZTogc3RyaW5nO1xyXG4gIHVybD86IHN0cmluZztcclxufVxyXG5cclxuY29uc3QgQXR0YWNobWVudFNjaGVtYSA9IG5ldyBTY2hlbWE8SUF0dGFjaG1lbnQ+KFxyXG4gIHtcclxuICAgIG5hbWU6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSwgdHJpbTogdHJ1ZSB9LFxyXG4gICAgc2l6ZTogeyB0eXBlOiBOdW1iZXIsIHJlcXVpcmVkOiB0cnVlLCBtaW46IDAgfSxcclxuICAgIHR5cGU6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSwgdHJpbTogdHJ1ZSB9LFxyXG4gICAgdXJsOiB7IHR5cGU6IFN0cmluZywgdHJpbTogdHJ1ZSB9LFxyXG4gIH0sXHJcbiAgeyBfaWQ6IHRydWUgfVxyXG4pO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQXNzaWdubWVudCB7XHJcbiAgc3R1ZGVudElkOiBUeXBlcy5PYmplY3RJZDtcclxuICB0ZWFjaGVySWQ6IFR5cGVzLk9iamVjdElkO1xyXG4gIHN1YmplY3RJZD86IFR5cGVzLk9iamVjdElkO1xyXG4gIG1vZHVsZUlkPzogVHlwZXMuT2JqZWN0SWQ7XHJcbiAgdGl0bGU6IHN0cmluZztcclxuICBpbnN0cnVjdGlvbnM6IHN0cmluZztcclxuICBhdHRhY2htZW50czogSUF0dGFjaG1lbnRbXTtcclxuICBtYXhNYXJrczogbnVtYmVyO1xyXG4gIGR1ZURhdGU6IERhdGU7XHJcbiAgc3RhdHVzOiBBc3NpZ25tZW50U3RhdHVzO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElBc3NpZ25tZW50RG9jdW1lbnQgZXh0ZW5kcyBJQXNzaWdubWVudCwgRG9jdW1lbnQge31cclxuXHJcbmNvbnN0IEFzc2lnbm1lbnRTY2hlbWEgPSBuZXcgU2NoZW1hPElBc3NpZ25tZW50RG9jdW1lbnQ+KFxyXG4gIHtcclxuICAgIHN0dWRlbnRJZDoge1xyXG4gICAgICB0eXBlOiBTY2hlbWEuVHlwZXMuT2JqZWN0SWQsXHJcbiAgICAgIHJlZjogJ1VzZXInLFxyXG4gICAgICByZXF1aXJlZDogW3RydWUsICdTdHVkZW50IGlzIHJlcXVpcmVkJ10sXHJcbiAgICB9LFxyXG4gICAgdGVhY2hlcklkOiB7XHJcbiAgICAgIHR5cGU6IFNjaGVtYS5UeXBlcy5PYmplY3RJZCxcclxuICAgICAgcmVmOiAnVXNlcicsXHJcbiAgICAgIHJlcXVpcmVkOiBbdHJ1ZSwgJ1RlYWNoZXIgaXMgcmVxdWlyZWQnXSxcclxuICAgIH0sXHJcbiAgICBzdWJqZWN0SWQ6IHsgdHlwZTogU2NoZW1hLlR5cGVzLk9iamVjdElkLCByZWY6ICdTdWJqZWN0JyB9LFxyXG4gICAgbW9kdWxlSWQ6IHsgdHlwZTogU2NoZW1hLlR5cGVzLk9iamVjdElkLCByZWY6ICdNb2R1bGUnIH0sXHJcbiAgICB0aXRsZToge1xyXG4gICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgIHJlcXVpcmVkOiBbdHJ1ZSwgJ1RpdGxlIGlzIHJlcXVpcmVkJ10sXHJcbiAgICAgIHRyaW06IHRydWUsXHJcbiAgICB9LFxyXG4gICAgaW5zdHJ1Y3Rpb25zOiB7IHR5cGU6IFN0cmluZywgdHJpbTogdHJ1ZSwgZGVmYXVsdDogJycgfSxcclxuICAgIGF0dGFjaG1lbnRzOiB7IHR5cGU6IFtBdHRhY2htZW50U2NoZW1hXSwgZGVmYXVsdDogW10gfSxcclxuICAgIG1heE1hcmtzOiB7IHR5cGU6IE51bWJlciwgcmVxdWlyZWQ6IHRydWUsIG1pbjogMCB9LFxyXG4gICAgZHVlRGF0ZTogeyB0eXBlOiBEYXRlLCByZXF1aXJlZDogW3RydWUsICdEdWUgZGF0ZSBpcyByZXF1aXJlZCddIH0sXHJcbiAgICBzdGF0dXM6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICBlbnVtOiBbJ05FVycsICdJTl9QUk9HUkVTUycsICdTVUJNSVRURUQnLCAnTEFURScsICdHUkFERUQnLCAnT1ZFUkRVRSddLFxyXG4gICAgICBkZWZhdWx0OiAnTkVXJyxcclxuICAgIH0sXHJcbiAgfSxcclxuICB7IHRpbWVzdGFtcHM6IHRydWUgfVxyXG4pO1xyXG5cclxuQXNzaWdubWVudFNjaGVtYS5pbmRleCh7IHN0dWRlbnRJZDogMSB9KTtcclxuQXNzaWdubWVudFNjaGVtYS5pbmRleCh7IHRlYWNoZXJJZDogMSB9KTtcclxuQXNzaWdubWVudFNjaGVtYS5pbmRleCh7IG1vZHVsZUlkOiAxIH0pO1xyXG5Bc3NpZ25tZW50U2NoZW1hLmluZGV4KHsgc3ViamVjdElkOiAxIH0pO1xyXG5Bc3NpZ25tZW50U2NoZW1hLmluZGV4KHsgc3RhdHVzOiAxIH0pO1xyXG5Bc3NpZ25tZW50U2NoZW1hLmluZGV4KHsgZHVlRGF0ZTogMSB9KTtcclxuXHJcbmV4cG9ydCBjb25zdCBBc3NpZ25tZW50TW9kZWw6IE1vZGVsPElBc3NpZ25tZW50RG9jdW1lbnQ+ID1cclxuICBtb25nb29zZS5tb2RlbHMuQXNzaWdubWVudCB8fFxyXG4gIG1vbmdvb3NlLm1vZGVsPElBc3NpZ25tZW50RG9jdW1lbnQ+KCdBc3NpZ25tZW50JywgQXNzaWdubWVudFNjaGVtYSk7XHJcblxyXG5leHBvcnQgeyBBdHRhY2htZW50U2NoZW1hIH07XHJcbmV4cG9ydCBkZWZhdWx0IEFzc2lnbm1lbnRNb2RlbDtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwZWdnYVxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXG1vY2tcXFxccHJvamVjdFxcXFxzcmNcXFxcc2VydmVyXFxcXG1vZGVsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxccGVnZ2FcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxtb2NrXFxcXHByb2plY3RcXFxcc3JjXFxcXHNlcnZlclxcXFxtb2RlbHNcXFxcQXNzaWdubWVudFN1Ym1pc3Npb24udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3BlZ2dhL09uZURyaXZlL0Rlc2t0b3AvbW9jay9wcm9qZWN0L3NyYy9zZXJ2ZXIvbW9kZWxzL0Fzc2lnbm1lbnRTdWJtaXNzaW9uLnRzXCI7aW1wb3J0IG1vbmdvb3NlLCB7IFNjaGVtYSwgRG9jdW1lbnQsIE1vZGVsLCBUeXBlcyB9IGZyb20gJ21vbmdvb3NlJztcclxuaW1wb3J0IHsgQXR0YWNobWVudFNjaGVtYSwgdHlwZSBJQXR0YWNobWVudCB9IGZyb20gJy4vQXNzaWdubWVudCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElBc3NpZ25tZW50U3VibWlzc2lvbiB7XHJcbiAgYXNzaWdubWVudElkOiBUeXBlcy5PYmplY3RJZDtcclxuICBzdHVkZW50SWQ6IFR5cGVzLk9iamVjdElkO1xyXG4gIHRleHRSZXNwb25zZTogc3RyaW5nO1xyXG4gIGF0dGFjaG1lbnRzOiBJQXR0YWNobWVudFtdO1xyXG4gIGlzTGF0ZTogYm9vbGVhbjtcclxuICBtYXJrcz86IG51bWJlcjtcclxuICBmZWVkYmFjaz86IHN0cmluZztcclxuICBncmFkZWRBdD86IERhdGU7XHJcbiAgZ3JhZGVkQnk/OiBUeXBlcy5PYmplY3RJZDsgLy8gdGVhY2hlciB1c2VySWRcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQXNzaWdubWVudFN1Ym1pc3Npb25Eb2N1bWVudCBleHRlbmRzIElBc3NpZ25tZW50U3VibWlzc2lvbiwgRG9jdW1lbnQge31cclxuXHJcbmNvbnN0IEFzc2lnbm1lbnRTdWJtaXNzaW9uU2NoZW1hID0gbmV3IFNjaGVtYTxJQXNzaWdubWVudFN1Ym1pc3Npb25Eb2N1bWVudD4oXHJcbiAge1xyXG4gICAgYXNzaWdubWVudElkOiB7XHJcbiAgICAgIHR5cGU6IFNjaGVtYS5UeXBlcy5PYmplY3RJZCxcclxuICAgICAgcmVmOiAnQXNzaWdubWVudCcsXHJcbiAgICAgIHJlcXVpcmVkOiBbdHJ1ZSwgJ0Fzc2lnbm1lbnQgaXMgcmVxdWlyZWQnXSxcclxuICAgIH0sXHJcbiAgICBzdHVkZW50SWQ6IHtcclxuICAgICAgdHlwZTogU2NoZW1hLlR5cGVzLk9iamVjdElkLFxyXG4gICAgICByZWY6ICdVc2VyJyxcclxuICAgICAgcmVxdWlyZWQ6IFt0cnVlLCAnU3R1ZGVudCBpcyByZXF1aXJlZCddLFxyXG4gICAgfSxcclxuICAgIHRleHRSZXNwb25zZTogeyB0eXBlOiBTdHJpbmcsIHRyaW06IHRydWUsIGRlZmF1bHQ6ICcnIH0sXHJcbiAgICBhdHRhY2htZW50czogeyB0eXBlOiBbQXR0YWNobWVudFNjaGVtYV0sIGRlZmF1bHQ6IFtdIH0sXHJcbiAgICBpc0xhdGU6IHsgdHlwZTogQm9vbGVhbiwgZGVmYXVsdDogZmFsc2UgfSxcclxuICAgIG1hcmtzOiB7IHR5cGU6IE51bWJlciwgbWluOiAwIH0sXHJcbiAgICBmZWVkYmFjazogeyB0eXBlOiBTdHJpbmcsIHRyaW06IHRydWUgfSxcclxuICAgIGdyYWRlZEF0OiB7IHR5cGU6IERhdGUgfSxcclxuICAgIGdyYWRlZEJ5OiB7IHR5cGU6IFNjaGVtYS5UeXBlcy5PYmplY3RJZCwgcmVmOiAnVXNlcicgfSxcclxuICB9LFxyXG4gIHsgdGltZXN0YW1wczogdHJ1ZSB9XHJcbik7XHJcblxyXG4vLyBFYWNoIHN0dWRlbnQgc3VibWl0cyBvbmNlIHBlciBhc3NpZ25tZW50IChsYXRlc3QgYXR0ZW1wdClcclxuQXNzaWdubWVudFN1Ym1pc3Npb25TY2hlbWEuaW5kZXgoeyBhc3NpZ25tZW50SWQ6IDEsIHN0dWRlbnRJZDogMSB9LCB7IHVuaXF1ZTogdHJ1ZSB9KTtcclxuQXNzaWdubWVudFN1Ym1pc3Npb25TY2hlbWEuaW5kZXgoeyBzdHVkZW50SWQ6IDEgfSk7XHJcblxyXG5leHBvcnQgY29uc3QgQXNzaWdubWVudFN1Ym1pc3Npb25Nb2RlbDogTW9kZWw8SUFzc2lnbm1lbnRTdWJtaXNzaW9uRG9jdW1lbnQ+ID1cclxuICBtb25nb29zZS5tb2RlbHMuQXNzaWdubWVudFN1Ym1pc3Npb24gfHxcclxuICBtb25nb29zZS5tb2RlbDxJQXNzaWdubWVudFN1Ym1pc3Npb25Eb2N1bWVudD4oJ0Fzc2lnbm1lbnRTdWJtaXNzaW9uJywgQXNzaWdubWVudFN1Ym1pc3Npb25TY2hlbWEpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXNzaWdubWVudFN1Ym1pc3Npb25Nb2RlbDtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwZWdnYVxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXG1vY2tcXFxccHJvamVjdFxcXFxzcmNcXFxcc2VydmVyXFxcXG1vZGVsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxccGVnZ2FcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxtb2NrXFxcXHByb2plY3RcXFxcc3JjXFxcXHNlcnZlclxcXFxtb2RlbHNcXFxcUHJvZ3Jlc3MudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3BlZ2dhL09uZURyaXZlL0Rlc2t0b3AvbW9jay9wcm9qZWN0L3NyYy9zZXJ2ZXIvbW9kZWxzL1Byb2dyZXNzLnRzXCI7aW1wb3J0IG1vbmdvb3NlLCB7IFNjaGVtYSwgRG9jdW1lbnQsIE1vZGVsLCBUeXBlcyB9IGZyb20gJ21vbmdvb3NlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVByb2dyZXNzIHtcclxuICBzdHVkZW50SWQ6IFR5cGVzLk9iamVjdElkO1xyXG4gIHN1YmplY3RJZDogVHlwZXMuT2JqZWN0SWQ7XHJcbiAgbW9kdWxlSWQ6IFR5cGVzLk9iamVjdElkO1xyXG4gIGNvbXBsZXRpb25QZXJjZW50YWdlOiBudW1iZXI7XHJcbiAgY29tcGxldGVkQ29udGVudElkczogVHlwZXMuT2JqZWN0SWRbXTtcclxuICBsYXN0QWNjZXNzZWRBdDogRGF0ZTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUHJvZ3Jlc3NEb2N1bWVudCBleHRlbmRzIElQcm9ncmVzcywgRG9jdW1lbnQge31cclxuXHJcbmNvbnN0IFByb2dyZXNzU2NoZW1hID0gbmV3IFNjaGVtYTxJUHJvZ3Jlc3NEb2N1bWVudD4oXHJcbiAge1xyXG4gICAgc3R1ZGVudElkOiB7XHJcbiAgICAgIHR5cGU6IFNjaGVtYS5UeXBlcy5PYmplY3RJZCxcclxuICAgICAgcmVmOiAnVXNlcicsXHJcbiAgICAgIHJlcXVpcmVkOiBbdHJ1ZSwgJ1N0dWRlbnQgaXMgcmVxdWlyZWQnXSxcclxuICAgIH0sXHJcbiAgICBzdWJqZWN0SWQ6IHtcclxuICAgICAgdHlwZTogU2NoZW1hLlR5cGVzLk9iamVjdElkLFxyXG4gICAgICByZWY6ICdTdWJqZWN0JyxcclxuICAgICAgcmVxdWlyZWQ6IFt0cnVlLCAnU3ViamVjdCBpcyByZXF1aXJlZCddLFxyXG4gICAgfSxcclxuICAgIG1vZHVsZUlkOiB7XHJcbiAgICAgIHR5cGU6IFNjaGVtYS5UeXBlcy5PYmplY3RJZCxcclxuICAgICAgcmVmOiAnTW9kdWxlJyxcclxuICAgICAgcmVxdWlyZWQ6IFt0cnVlLCAnTW9kdWxlIGlzIHJlcXVpcmVkJ10sXHJcbiAgICB9LFxyXG4gICAgY29tcGxldGlvblBlcmNlbnRhZ2U6IHtcclxuICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBtaW46IDAsXHJcbiAgICAgIG1heDogMTAwLFxyXG4gICAgfSxcclxuICAgIGNvbXBsZXRlZENvbnRlbnRJZHM6IFt7IHR5cGU6IFNjaGVtYS5UeXBlcy5PYmplY3RJZCwgcmVmOiAnQ29udGVudEl0ZW0nIH1dLFxyXG4gICAgbGFzdEFjY2Vzc2VkQXQ6IHsgdHlwZTogRGF0ZSwgZGVmYXVsdDogRGF0ZS5ub3cgfSxcclxuICB9LFxyXG4gIHsgdGltZXN0YW1wczogdHJ1ZSB9XHJcbik7XHJcblxyXG4vLyBFYWNoIHN0dWRlbnQgaGFzIG9uZSBwcm9ncmVzcyByZWNvcmQgcGVyIG1vZHVsZVxyXG5Qcm9ncmVzc1NjaGVtYS5pbmRleCh7IHN0dWRlbnRJZDogMSwgbW9kdWxlSWQ6IDEgfSwgeyB1bmlxdWU6IHRydWUgfSk7XHJcblByb2dyZXNzU2NoZW1hLmluZGV4KHsgc3R1ZGVudElkOiAxLCBzdWJqZWN0SWQ6IDEgfSk7XHJcblxyXG5leHBvcnQgY29uc3QgUHJvZ3Jlc3NNb2RlbDogTW9kZWw8SVByb2dyZXNzRG9jdW1lbnQ+ID1cclxuICBtb25nb29zZS5tb2RlbHMuUHJvZ3Jlc3MgfHxcclxuICBtb25nb29zZS5tb2RlbDxJUHJvZ3Jlc3NEb2N1bWVudD4oJ1Byb2dyZXNzJywgUHJvZ3Jlc3NTY2hlbWEpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUHJvZ3Jlc3NNb2RlbDtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwZWdnYVxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXG1vY2tcXFxccHJvamVjdFxcXFxzcmNcXFxcc2VydmVyXFxcXG1vZGVsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxccGVnZ2FcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxtb2NrXFxcXHByb2plY3RcXFxcc3JjXFxcXHNlcnZlclxcXFxtb2RlbHNcXFxcUHJvZ3Jlc3NFdmVudC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvcGVnZ2EvT25lRHJpdmUvRGVza3RvcC9tb2NrL3Byb2plY3Qvc3JjL3NlcnZlci9tb2RlbHMvUHJvZ3Jlc3NFdmVudC50c1wiO2ltcG9ydCBtb25nb29zZSwgeyBTY2hlbWEsIERvY3VtZW50LCBNb2RlbCwgVHlwZXMgfSBmcm9tICdtb25nb29zZSc7XHJcblxyXG5leHBvcnQgdHlwZSBQcm9ncmVzc0V2ZW50VHlwZSA9XHJcbiAgfCAnY29udGVudF9jb21wbGV0ZWQnXHJcbiAgfCAnYXNzZXNzbWVudF9zdWJtaXR0ZWQnXHJcbiAgfCAnYXNzaWdubWVudF9zdWJtaXR0ZWQnXHJcbiAgfCAnbG9naW4nXHJcbiAgfCAnbW9kdWxlX2NvbXBsZXRlZCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElQcm9ncmVzc0V2ZW50IHtcclxuICBzdHVkZW50SWQ6IFR5cGVzLk9iamVjdElkO1xyXG4gIHR5cGU6IFByb2dyZXNzRXZlbnRUeXBlO1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgZW50aXR5SWQ/OiBUeXBlcy5PYmplY3RJZDsgLy8gY29udGVudCwgYXNzZXNzbWVudCwgYXNzaWdubWVudCwgb3IgbW9kdWxlIGlkXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVByb2dyZXNzRXZlbnREb2N1bWVudCBleHRlbmRzIElQcm9ncmVzc0V2ZW50LCBEb2N1bWVudCB7fVxyXG5cclxuY29uc3QgUHJvZ3Jlc3NFdmVudFNjaGVtYSA9IG5ldyBTY2hlbWE8SVByb2dyZXNzRXZlbnREb2N1bWVudD4oXHJcbiAge1xyXG4gICAgc3R1ZGVudElkOiB7XHJcbiAgICAgIHR5cGU6IFNjaGVtYS5UeXBlcy5PYmplY3RJZCxcclxuICAgICAgcmVmOiAnVXNlcicsXHJcbiAgICAgIHJlcXVpcmVkOiBbdHJ1ZSwgJ1N0dWRlbnQgaXMgcmVxdWlyZWQnXSxcclxuICAgIH0sXHJcbiAgICB0eXBlOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgZW51bTogW1xyXG4gICAgICAgICdjb250ZW50X2NvbXBsZXRlZCcsXHJcbiAgICAgICAgJ2Fzc2Vzc21lbnRfc3VibWl0dGVkJyxcclxuICAgICAgICAnYXNzaWdubWVudF9zdWJtaXR0ZWQnLFxyXG4gICAgICAgICdsb2dpbicsXHJcbiAgICAgICAgJ21vZHVsZV9jb21wbGV0ZWQnLFxyXG4gICAgICBdLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBkZXNjcmlwdGlvbjogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlLCB0cmltOiB0cnVlIH0sXHJcbiAgICBlbnRpdHlJZDogeyB0eXBlOiBTY2hlbWEuVHlwZXMuT2JqZWN0SWQgfSxcclxuICB9LFxyXG4gIHsgdGltZXN0YW1wczogdHJ1ZSB9XHJcbik7XHJcblxyXG5Qcm9ncmVzc0V2ZW50U2NoZW1hLmluZGV4KHsgc3R1ZGVudElkOiAxLCBjcmVhdGVkQXQ6IC0xIH0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IFByb2dyZXNzRXZlbnRNb2RlbDogTW9kZWw8SVByb2dyZXNzRXZlbnREb2N1bWVudD4gPVxyXG4gIG1vbmdvb3NlLm1vZGVscy5Qcm9ncmVzc0V2ZW50IHx8XHJcbiAgbW9uZ29vc2UubW9kZWw8SVByb2dyZXNzRXZlbnREb2N1bWVudD4oJ1Byb2dyZXNzRXZlbnQnLCBQcm9ncmVzc0V2ZW50U2NoZW1hKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb2dyZXNzRXZlbnRNb2RlbDtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwZWdnYVxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXG1vY2tcXFxccHJvamVjdFxcXFxzcmNcXFxcc2VydmVyXFxcXG1vZGVsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxccGVnZ2FcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxtb2NrXFxcXHByb2plY3RcXFxcc3JjXFxcXHNlcnZlclxcXFxtb2RlbHNcXFxcTGVhZGVyYm9hcmRTY29yZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvcGVnZ2EvT25lRHJpdmUvRGVza3RvcC9tb2NrL3Byb2plY3Qvc3JjL3NlcnZlci9tb2RlbHMvTGVhZGVyYm9hcmRTY29yZS50c1wiO2ltcG9ydCBtb25nb29zZSwgeyBTY2hlbWEsIERvY3VtZW50LCBNb2RlbCwgVHlwZXMgfSBmcm9tICdtb25nb29zZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElMZWFkZXJib2FyZFNjb3JlIHtcclxuICBzdHVkZW50SWQ6IFR5cGVzLk9iamVjdElkO1xyXG4gIHByb2dyYW1JZDogVHlwZXMuT2JqZWN0SWQ7XHJcbiAgY29ob3J0SWQ6IFR5cGVzLk9iamVjdElkO1xyXG4gIHJhbms6IG51bWJlcjtcclxuICBvdmVyYWxsU2NvcmU6IG51bWJlcjtcclxuICBhc3Nlc3NtZW50U2NvcmU6IG51bWJlcjtcclxuICBhc3NpZ25tZW50U2NvcmU6IG51bWJlcjtcclxuICBkaXNjaXBsaW5lU2NvcmU6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTGVhZGVyYm9hcmRTY29yZURvY3VtZW50IGV4dGVuZHMgSUxlYWRlcmJvYXJkU2NvcmUsIERvY3VtZW50IHt9XHJcblxyXG5jb25zdCBMZWFkZXJib2FyZFNjb3JlU2NoZW1hID0gbmV3IFNjaGVtYTxJTGVhZGVyYm9hcmRTY29yZURvY3VtZW50PihcclxuICB7XHJcbiAgICBzdHVkZW50SWQ6IHtcclxuICAgICAgdHlwZTogU2NoZW1hLlR5cGVzLk9iamVjdElkLFxyXG4gICAgICByZWY6ICdVc2VyJyxcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgcHJvZ3JhbUlkOiB7XHJcbiAgICAgIHR5cGU6IFNjaGVtYS5UeXBlcy5PYmplY3RJZCxcclxuICAgICAgcmVmOiAnUHJvZ3JhbScsXHJcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIGNvaG9ydElkOiB7XHJcbiAgICAgIHR5cGU6IFNjaGVtYS5UeXBlcy5PYmplY3RJZCxcclxuICAgICAgcmVmOiAnQ29ob3J0JyxcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgcmFuazogeyB0eXBlOiBOdW1iZXIsIHJlcXVpcmVkOiB0cnVlLCBtaW46IDEgfSxcclxuICAgIG92ZXJhbGxTY29yZTogeyB0eXBlOiBOdW1iZXIsIHJlcXVpcmVkOiB0cnVlLCBtaW46IDAsIG1heDogMTAwIH0sXHJcbiAgICBhc3Nlc3NtZW50U2NvcmU6IHsgdHlwZTogTnVtYmVyLCByZXF1aXJlZDogdHJ1ZSwgbWluOiAwLCBtYXg6IDEwMCB9LFxyXG4gICAgYXNzaWdubWVudFNjb3JlOiB7IHR5cGU6IE51bWJlciwgcmVxdWlyZWQ6IHRydWUsIG1pbjogMCwgbWF4OiAxMDAgfSxcclxuICAgIGRpc2NpcGxpbmVTY29yZTogeyB0eXBlOiBOdW1iZXIsIHJlcXVpcmVkOiB0cnVlLCBtaW46IDAsIG1heDogMTAwIH0sXHJcbiAgfSxcclxuICB7IHRpbWVzdGFtcHM6IHRydWUgfVxyXG4pO1xyXG5cclxuLy8gT25lIHNjb3JlIHJlY29yZCBwZXIgc3R1ZGVudCBwZXIgY29ob3J0XHJcbkxlYWRlcmJvYXJkU2NvcmVTY2hlbWEuaW5kZXgoeyBzdHVkZW50SWQ6IDEsIGNvaG9ydElkOiAxIH0sIHsgdW5pcXVlOiB0cnVlIH0pO1xyXG5MZWFkZXJib2FyZFNjb3JlU2NoZW1hLmluZGV4KHsgcHJvZ3JhbUlkOiAxLCBjb2hvcnRJZDogMSwgcmFuazogMSB9KTtcclxuXHJcbmV4cG9ydCBjb25zdCBMZWFkZXJib2FyZFNjb3JlTW9kZWw6IE1vZGVsPElMZWFkZXJib2FyZFNjb3JlRG9jdW1lbnQ+ID1cclxuICBtb25nb29zZS5tb2RlbHMuTGVhZGVyYm9hcmRTY29yZSB8fFxyXG4gIG1vbmdvb3NlLm1vZGVsPElMZWFkZXJib2FyZFNjb3JlRG9jdW1lbnQ+KCdMZWFkZXJib2FyZFNjb3JlJywgTGVhZGVyYm9hcmRTY29yZVNjaGVtYSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMZWFkZXJib2FyZFNjb3JlTW9kZWw7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxccGVnZ2FcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxtb2NrXFxcXHByb2plY3RcXFxcc3JjXFxcXHNlcnZlclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxccGVnZ2FcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxtb2NrXFxcXHByb2plY3RcXFxcc3JjXFxcXHNlcnZlclxcXFxjaGF0SGFuZGxlci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvcGVnZ2EvT25lRHJpdmUvRGVza3RvcC9tb2NrL3Byb2plY3Qvc3JjL3NlcnZlci9jaGF0SGFuZGxlci50c1wiO2ltcG9ydCB0eXBlIHsgSW5jb21pbmdNZXNzYWdlLCBTZXJ2ZXJSZXNwb25zZSB9IGZyb20gJ25vZGU6aHR0cCc7XG5pbXBvcnQgand0IGZyb20gJ2pzb253ZWJ0b2tlbic7XG5pbXBvcnQgeyBjb25uZWN0VG9EYXRhYmFzZSB9IGZyb20gJy4vZGIuanMnO1xuaW1wb3J0IENvbnZlcnNhdGlvbk1vZGVsIGZyb20gJy4vbW9kZWxzL0NvbnZlcnNhdGlvbi5qcyc7XG5pbXBvcnQgTWVzc2FnZU1vZGVsIGZyb20gJy4vbW9kZWxzL01lc3NhZ2UuanMnO1xuaW1wb3J0IFVzZXJNb2RlbCBmcm9tICcuL21vZGVscy9Vc2VyLmpzJztcblxuY29uc3QgSldUX1NFQ1JFVCA9IHByb2Nlc3MuZW52LkpXVF9TRUNSRVQgfHwgJ2Rpa3NoYS1mb3VuZGF0aW9uLXNlY3JldC1rZXktMjAyNic7XG5cbmludGVyZmFjZSBUb2tlblBheWxvYWQge1xuICB1c2VySWQ6IHN0cmluZztcbiAgcm9sZTogJ2FkbWluJyB8ICd0ZWFjaGVyJyB8ICdzdHVkZW50Jztcbn1cblxuZnVuY3Rpb24gcGFyc2VKc29uQm9keShyZXE6IEluY29taW5nTWVzc2FnZSk6IFByb21pc2U8YW55PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgbGV0IGJvZHkgPSAnJztcbiAgICByZXEub24oJ2RhdGEnLCAoY2h1bmspID0+IHsgYm9keSArPSBjaHVuazsgfSk7XG4gICAgcmVxLm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgICBpZiAoIWJvZHkpIHsgcmVzb2x2ZSh7fSk7IHJldHVybjsgfVxuICAgICAgdHJ5IHsgcmVzb2x2ZShKU09OLnBhcnNlKGJvZHkpKTsgfVxuICAgICAgY2F0Y2ggKGVycikgeyByZWplY3QoZXJyKTsgfVxuICAgIH0pO1xuICAgIHJlcS5vbignZXJyb3InLCAoZXJyKSA9PiByZWplY3QoZXJyKSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZW5kSnNvbihyZXM6IFNlcnZlclJlc3BvbnNlLCBzdGF0dXNDb2RlOiBudW1iZXIsIGRhdGE6IGFueSkge1xuICByZXMuc3RhdHVzQ29kZSA9IHN0YXR1c0NvZGU7XG4gIHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xufVxuXG5mdW5jdGlvbiB2ZXJpZnlUb2tlbihyZXE6IEluY29taW5nTWVzc2FnZSk6IFRva2VuUGF5bG9hZCB8IG51bGwge1xuICBjb25zdCBhdXRoSGVhZGVyID0gcmVxLmhlYWRlcnNbJ2F1dGhvcml6YXRpb24nXTtcbiAgaWYgKCFhdXRoSGVhZGVyPy5zdGFydHNXaXRoKCdCZWFyZXIgJykpIHJldHVybiBudWxsO1xuICBjb25zdCB0b2tlbiA9IGF1dGhIZWFkZXIuc2xpY2UoNyk7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGp3dC52ZXJpZnkodG9rZW4sIEpXVF9TRUNSRVQpIGFzIFRva2VuUGF5bG9hZDtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZUNoYXRSZXF1ZXN0KHJlcTogSW5jb21pbmdNZXNzYWdlLCByZXM6IFNlcnZlclJlc3BvbnNlKTogUHJvbWlzZTxib29sZWFuPiB7XG4gIGNvbnN0IHJhd1VybCA9IHJlcS51cmwgfHwgJyc7XG4gIGlmICghcmF3VXJsLnN0YXJ0c1dpdGgoJy9hcGkvY2hhdCcpICYmICFyYXdVcmwuc3RhcnRzV2l0aCgnL2FwaS91c2VycycpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3QgY29ubmVjdGVkID0gYXdhaXQgY29ubmVjdFRvRGF0YWJhc2UoKTtcbiAgaWYgKCFjb25uZWN0ZWQpIHtcbiAgICBzZW5kSnNvbihyZXMsIDUwMywgeyBtZXNzYWdlOiAnRGF0YWJhc2UgY29ubmVjdGlvbiB1bmF2YWlsYWJsZScgfSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBjb25zdCBtZXRob2QgPSByZXEubWV0aG9kO1xuICBjb25zdCB1cmxPYmogPSBuZXcgVVJMKHJhd1VybCwgJ2h0dHA6Ly9sb2NhbGhvc3QnKTtcbiAgY29uc3QgcGF0aG5hbWUgPSB1cmxPYmoucGF0aG5hbWU7XG4gIGNvbnN0IHNlYXJjaFBhcmFtcyA9IHVybE9iai5zZWFyY2hQYXJhbXM7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBHRVQgL2FwaS91c2Vyc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIGlmIChwYXRobmFtZSA9PT0gJy9hcGkvdXNlcnMnICYmIG1ldGhvZCA9PT0gJ0dFVCcpIHtcbiAgICBjb25zdCB1c2VyID0gdmVyaWZ5VG9rZW4ocmVxKTtcbiAgICBpZiAoIXVzZXIpIHsgc2VuZEpzb24ocmVzLCA0MDEsIHsgbWVzc2FnZTogJ1VuYXV0aG9yaXplZCcgfSk7IHJldHVybiB0cnVlOyB9XG5cbiAgICBjb25zdCByb2xlID0gc2VhcmNoUGFyYW1zLmdldCgncm9sZScpO1xuICAgIGNvbnN0IHF1ZXJ5ID0gcm9sZSA/IHsgcm9sZSB9IDoge307XG4gICAgXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVzZXJzID0gYXdhaXQgVXNlck1vZGVsLmZpbmQocXVlcnkpLnNlbGVjdCgnLXBhc3N3b3JkSGFzaCcpLmxlYW4oKTtcbiAgICAgIHNlbmRKc29uKHJlcywgMjAwLCB7IGRhdGE6IHVzZXJzIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgc2VuZEpzb24ocmVzLCA1MDAsIHsgbWVzc2FnZTogKGVyciBhcyBFcnJvcikubWVzc2FnZSB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEdFVCAvYXBpL2NoYXQvY29udmVyc2F0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIGlmIChwYXRobmFtZSA9PT0gJy9hcGkvY2hhdC9jb252ZXJzYXRpb25zJyAmJiBtZXRob2QgPT09ICdHRVQnKSB7XG4gICAgY29uc3QgdXNlciA9IHZlcmlmeVRva2VuKHJlcSk7XG4gICAgaWYgKCF1c2VyKSB7IHNlbmRKc29uKHJlcywgNDAxLCB7IG1lc3NhZ2U6ICdVbmF1dGhvcml6ZWQnIH0pOyByZXR1cm4gdHJ1ZTsgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGZpbHRlciA9IHVzZXIucm9sZSA9PT0gJ3N0dWRlbnQnID8geyBzdHVkZW50SWQ6IHVzZXIudXNlcklkIH0gOiB7IHRlYWNoZXJJZDogdXNlci51c2VySWQgfTtcbiAgICAgIGNvbnN0IGNvbnZzID0gYXdhaXQgQ29udmVyc2F0aW9uTW9kZWwuZmluZChmaWx0ZXIpXG4gICAgICAgIC5wb3B1bGF0ZSgnc3R1ZGVudElkJywgJ25hbWUgZW1haWwgYXZhdGFyJylcbiAgICAgICAgLnBvcHVsYXRlKCd0ZWFjaGVySWQnLCAnbmFtZSBlbWFpbCBhdmF0YXInKVxuICAgICAgICAuc29ydCh7IGxhc3RNZXNzYWdlQXQ6IC0xIH0pXG4gICAgICAgIC5sZWFuKCk7XG4gICAgICBzZW5kSnNvbihyZXMsIDIwMCwgeyBkYXRhOiBjb252cyB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHNlbmRKc29uKHJlcywgNTAwLCB7IG1lc3NhZ2U6IChlcnIgYXMgRXJyb3IpLm1lc3NhZ2UgfSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBQT1NUIC9hcGkvY2hhdC9jb252ZXJzYXRpb25zXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgaWYgKHBhdGhuYW1lID09PSAnL2FwaS9jaGF0L2NvbnZlcnNhdGlvbnMnICYmIG1ldGhvZCA9PT0gJ1BPU1QnKSB7XG4gICAgY29uc3QgdXNlciA9IHZlcmlmeVRva2VuKHJlcSk7XG4gICAgaWYgKCF1c2VyKSB7IHNlbmRKc29uKHJlcywgNDAxLCB7IG1lc3NhZ2U6ICdVbmF1dGhvcml6ZWQnIH0pOyByZXR1cm4gdHJ1ZTsgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCBwYXJzZUpzb25Cb2R5KHJlcSk7XG4gICAgICBjb25zdCB7IHRhcmdldFVzZXJJZCB9ID0gYm9keTtcbiAgICAgIFxuICAgICAgaWYgKCF0YXJnZXRVc2VySWQpIHtcbiAgICAgICAgc2VuZEpzb24ocmVzLCA0MDAsIHsgbWVzc2FnZTogJ3RhcmdldFVzZXJJZCBpcyByZXF1aXJlZCcgfSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB0YXJnZXRVc2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRCeUlkKHRhcmdldFVzZXJJZCk7XG4gICAgICBpZiAoIXRhcmdldFVzZXIpIHtcbiAgICAgICAgc2VuZEpzb24ocmVzLCA0MDQsIHsgbWVzc2FnZTogJ1RhcmdldCB1c2VyIG5vdCBmb3VuZCcgfSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBsZXQgc3R1ZGVudElkLCB0ZWFjaGVySWQ7XG4gICAgICBpZiAodXNlci5yb2xlID09PSAnc3R1ZGVudCcgJiYgdGFyZ2V0VXNlci5yb2xlID09PSAndGVhY2hlcicpIHtcbiAgICAgICAgc3R1ZGVudElkID0gdXNlci51c2VySWQ7XG4gICAgICAgIHRlYWNoZXJJZCA9IHRhcmdldFVzZXJJZDtcbiAgICAgIH0gZWxzZSBpZiAodXNlci5yb2xlID09PSAndGVhY2hlcicgJiYgdGFyZ2V0VXNlci5yb2xlID09PSAnc3R1ZGVudCcpIHtcbiAgICAgICAgc3R1ZGVudElkID0gdGFyZ2V0VXNlcklkO1xuICAgICAgICB0ZWFjaGVySWQgPSB1c2VyLnVzZXJJZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbmRKc29uKHJlcywgNDAwLCB7IG1lc3NhZ2U6ICdDb252ZXJzYXRpb25zIG11c3QgYmUgYmV0d2VlbiBhIHN0dWRlbnQgYW5kIGEgdGVhY2hlcicgfSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBsZXQgY29udiA9IGF3YWl0IENvbnZlcnNhdGlvbk1vZGVsLmZpbmRPbmUoeyBzdHVkZW50SWQsIHRlYWNoZXJJZCB9KTtcbiAgICAgIGlmICghY29udikge1xuICAgICAgICBjb252ID0gYXdhaXQgQ29udmVyc2F0aW9uTW9kZWwuY3JlYXRlKHsgc3R1ZGVudElkLCB0ZWFjaGVySWQgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFJlLWZldGNoIHdpdGggcG9wdWxhdGVkIHVzZXJzXG4gICAgICBjb25zdCBwb3B1bGF0ZWRDb252ID0gYXdhaXQgQ29udmVyc2F0aW9uTW9kZWwuZmluZEJ5SWQoY29udi5faWQpXG4gICAgICAgIC5wb3B1bGF0ZSgnc3R1ZGVudElkJywgJ25hbWUgZW1haWwgYXZhdGFyJylcbiAgICAgICAgLnBvcHVsYXRlKCd0ZWFjaGVySWQnLCAnbmFtZSBlbWFpbCBhdmF0YXInKVxuICAgICAgICAubGVhbigpO1xuXG4gICAgICBzZW5kSnNvbihyZXMsIDIwMCwgeyBkYXRhOiBwb3B1bGF0ZWRDb252IH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgc2VuZEpzb24ocmVzLCA1MDAsIHsgbWVzc2FnZTogKGVyciBhcyBFcnJvcikubWVzc2FnZSB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBFeHRyYWN0IENvbnZlcnNhdGlvbiBJRCBmb3Igcm91dGVzIGxpa2UgL2FwaS9jaGF0L2NvbnZlcnNhdGlvbnMvOmlkLy4uLlxuICBpZiAocGF0aG5hbWUuc3RhcnRzV2l0aCgnL2FwaS9jaGF0L2NvbnZlcnNhdGlvbnMvJykgJiYgcGF0aG5hbWUuc3BsaXQoJy8nKS5sZW5ndGggPj0gNSkge1xuICAgIGNvbnN0IHBhcnRzID0gcGF0aG5hbWUuc3BsaXQoJy8nKTtcbiAgICBjb25zdCBjb252SWQgPSBwYXJ0c1s0XTtcbiAgICBjb25zdCBhY3Rpb24gPSBwYXJ0c1s1XTtcblxuICAgIC8vIEdFVCAvYXBpL2NoYXQvY29udmVyc2F0aW9ucy86aWQvbWVzc2FnZXNcbiAgICBpZiAoYWN0aW9uID09PSAnbWVzc2FnZXMnICYmIG1ldGhvZCA9PT0gJ0dFVCcpIHtcbiAgICAgIGNvbnN0IHVzZXIgPSB2ZXJpZnlUb2tlbihyZXEpO1xuICAgICAgaWYgKCF1c2VyKSB7IHNlbmRKc29uKHJlcywgNDAxLCB7IG1lc3NhZ2U6ICdVbmF1dGhvcml6ZWQnIH0pOyByZXR1cm4gdHJ1ZTsgfVxuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBtZXNzYWdlcyA9IGF3YWl0IE1lc3NhZ2VNb2RlbC5maW5kKHsgY29udmVyc2F0aW9uSWQ6IGNvbnZJZCB9KVxuICAgICAgICAgIC5zb3J0KHsgc2VudEF0OiAxIH0pXG4gICAgICAgICAgLmxlYW4oKTtcbiAgICAgICAgc2VuZEpzb24ocmVzLCAyMDAsIHsgZGF0YTogbWVzc2FnZXMgfSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgc2VuZEpzb24ocmVzLCA1MDAsIHsgbWVzc2FnZTogKGVyciBhcyBFcnJvcikubWVzc2FnZSB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIFBPU1QgL2FwaS9jaGF0L2NvbnZlcnNhdGlvbnMvOmlkL21lc3NhZ2VzXG4gICAgaWYgKGFjdGlvbiA9PT0gJ21lc3NhZ2VzJyAmJiBtZXRob2QgPT09ICdQT1NUJykge1xuICAgICAgY29uc3QgdXNlciA9IHZlcmlmeVRva2VuKHJlcSk7XG4gICAgICBpZiAoIXVzZXIpIHsgc2VuZEpzb24ocmVzLCA0MDEsIHsgbWVzc2FnZTogJ1VuYXV0aG9yaXplZCcgfSk7IHJldHVybiB0cnVlOyB9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCBwYXJzZUpzb25Cb2R5KHJlcSk7XG4gICAgICAgIGNvbnN0IHsgdGV4dCwgYXR0YWNobWVudHMgfSA9IGJvZHk7XG5cbiAgICAgICAgY29uc3QgY29udiA9IGF3YWl0IENvbnZlcnNhdGlvbk1vZGVsLmZpbmRCeUlkKGNvbnZJZCk7XG4gICAgICAgIGlmICghY29udikge1xuICAgICAgICAgIHNlbmRKc29uKHJlcywgNDA0LCB7IG1lc3NhZ2U6ICdDb252ZXJzYXRpb24gbm90IGZvdW5kJyB9KTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1zZyA9IGF3YWl0IE1lc3NhZ2VNb2RlbC5jcmVhdGUoe1xuICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiBjb252SWQsXG4gICAgICAgICAgc2VuZGVySWQ6IHVzZXIudXNlcklkLFxuICAgICAgICAgIHNlbmRlclJvbGU6IHVzZXIucm9sZSxcbiAgICAgICAgICB0ZXh0OiB0ZXh0IHx8ICcnLFxuICAgICAgICAgIGF0dGFjaG1lbnRzOiBhdHRhY2htZW50cyB8fCBbXSxcbiAgICAgICAgICBzZW50QXQ6IG5ldyBEYXRlKClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gVXBkYXRlIGNvbnZlcnNhdGlvbiBsYXN0TWVzc2FnZUF0IGFuZCB1bnJlYWRDb3VudFxuICAgICAgICBjb252Lmxhc3RNZXNzYWdlQXQgPSBtc2cuc2VudEF0O1xuICAgICAgICBpZiAodXNlci5yb2xlID09PSAnc3R1ZGVudCcpIHtcbiAgICAgICAgICAgLy8gVGVhY2hlciBnZXRzIHVucmVhZFxuICAgICAgICAgICBjb252LnVucmVhZENvdW50ICs9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgIC8vIFN0dWRlbnQgZ2V0cyB1bnJlYWRcbiAgICAgICAgICAgY29udi51bnJlYWRDb3VudCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IGNvbnYuc2F2ZSgpO1xuXG4gICAgICAgIHNlbmRKc29uKHJlcywgMjAxLCB7IGRhdGE6IG1zZyB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBzZW5kSnNvbihyZXMsIDUwMCwgeyBtZXNzYWdlOiAoZXJyIGFzIEVycm9yKS5tZXNzYWdlIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gUEFUQ0ggL2FwaS9jaGF0L2NvbnZlcnNhdGlvbnMvOmlkL3JlYWRcbiAgICBpZiAoYWN0aW9uID09PSAncmVhZCcgJiYgbWV0aG9kID09PSAnUEFUQ0gnKSB7XG4gICAgICBjb25zdCB1c2VyID0gdmVyaWZ5VG9rZW4ocmVxKTtcbiAgICAgIGlmICghdXNlcikgeyBzZW5kSnNvbihyZXMsIDQwMSwgeyBtZXNzYWdlOiAnVW5hdXRob3JpemVkJyB9KTsgcmV0dXJuIHRydWU7IH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY29udiA9IGF3YWl0IENvbnZlcnNhdGlvbk1vZGVsLmZpbmRCeUlkKGNvbnZJZCk7XG4gICAgICAgIGlmICghY29udikge1xuICAgICAgICAgIHNlbmRKc29uKHJlcywgNDA0LCB7IG1lc3NhZ2U6ICdDb252ZXJzYXRpb24gbm90IGZvdW5kJyB9KTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIG5haXZlbHkgcmVzZXQgdW5yZWFkIGNvdW50IGZvciBub3cuXG4gICAgICAgIC8vIEluIGEgcGVyZmVjdCBzeXN0ZW0sIHdlJ2QgdHJhY2sgd2hvIHJlYWQgd2hhdCwgYnV0IG91ciBtb2RlbCBqdXN0IGhhcyBhIHNpbmdsZSB1bnJlYWRDb3VudFxuICAgICAgICBjb252LnVucmVhZENvdW50ID0gMDtcbiAgICAgICAgYXdhaXQgY29udi5zYXZlKCk7XG5cbiAgICAgICAgYXdhaXQgTWVzc2FnZU1vZGVsLnVwZGF0ZU1hbnkoXG4gICAgICAgICAgeyBjb252ZXJzYXRpb25JZDogY29udklkLCBzZW5kZXJJZDogeyAkbmU6IHVzZXIudXNlcklkIH0gfSxcbiAgICAgICAgICB7ICRzZXQ6IHsgcmVhZDogdHJ1ZSB9IH1cbiAgICAgICAgKTtcblxuICAgICAgICBzZW5kSnNvbihyZXMsIDIwMCwgeyBtZXNzYWdlOiAnQ29udmVyc2F0aW9uIG1hcmtlZCBhcyByZWFkJyB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBzZW5kSnNvbihyZXMsIDUwMCwgeyBtZXNzYWdlOiAoZXJyIGFzIEVycm9yKS5tZXNzYWdlIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwZWdnYVxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXG1vY2tcXFxccHJvamVjdFxcXFxzcmNcXFxcc2VydmVyXFxcXG1vZGVsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxccGVnZ2FcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxtb2NrXFxcXHByb2plY3RcXFxcc3JjXFxcXHNlcnZlclxcXFxtb2RlbHNcXFxcQ29udmVyc2F0aW9uLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9wZWdnYS9PbmVEcml2ZS9EZXNrdG9wL21vY2svcHJvamVjdC9zcmMvc2VydmVyL21vZGVscy9Db252ZXJzYXRpb24udHNcIjtpbXBvcnQgbW9uZ29vc2UsIHsgU2NoZW1hLCBEb2N1bWVudCwgTW9kZWwsIFR5cGVzIH0gZnJvbSAnbW9uZ29vc2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQ29udmVyc2F0aW9uIHtcclxuICBzdHVkZW50SWQ6IFR5cGVzLk9iamVjdElkO1xyXG4gIHRlYWNoZXJJZDogVHlwZXMuT2JqZWN0SWQ7XHJcbiAgbGFzdE1lc3NhZ2VBdDogRGF0ZTtcclxuICB1bnJlYWRDb3VudDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElDb252ZXJzYXRpb25Eb2N1bWVudCBleHRlbmRzIElDb252ZXJzYXRpb24sIERvY3VtZW50IHt9XHJcblxyXG5jb25zdCBDb252ZXJzYXRpb25TY2hlbWEgPSBuZXcgU2NoZW1hPElDb252ZXJzYXRpb25Eb2N1bWVudD4oXHJcbiAge1xyXG4gICAgc3R1ZGVudElkOiB7XHJcbiAgICAgIHR5cGU6IFNjaGVtYS5UeXBlcy5PYmplY3RJZCxcclxuICAgICAgcmVmOiAnVXNlcicsXHJcbiAgICAgIHJlcXVpcmVkOiBbdHJ1ZSwgJ1N0dWRlbnQgaXMgcmVxdWlyZWQnXSxcclxuICAgIH0sXHJcbiAgICB0ZWFjaGVySWQ6IHtcclxuICAgICAgdHlwZTogU2NoZW1hLlR5cGVzLk9iamVjdElkLFxyXG4gICAgICByZWY6ICdVc2VyJyxcclxuICAgICAgcmVxdWlyZWQ6IFt0cnVlLCAnVGVhY2hlciBpcyByZXF1aXJlZCddLFxyXG4gICAgfSxcclxuICAgIGxhc3RNZXNzYWdlQXQ6IHsgdHlwZTogRGF0ZSwgZGVmYXVsdDogRGF0ZS5ub3cgfSxcclxuICAgIHVucmVhZENvdW50OiB7IHR5cGU6IE51bWJlciwgZGVmYXVsdDogMCwgbWluOiAwIH0sXHJcbiAgfSxcclxuICB7IHRpbWVzdGFtcHM6IHRydWUgfVxyXG4pO1xyXG5cclxuLy8gRWFjaCBzdHVkZW50LXRlYWNoZXIgcGFpciBoYXMgZXhhY3RseSBvbmUgY29udmVyc2F0aW9uIHRocmVhZFxyXG5Db252ZXJzYXRpb25TY2hlbWEuaW5kZXgoeyBzdHVkZW50SWQ6IDEsIHRlYWNoZXJJZDogMSB9LCB7IHVuaXF1ZTogdHJ1ZSB9KTtcclxuXHJcbmV4cG9ydCBjb25zdCBDb252ZXJzYXRpb25Nb2RlbDogTW9kZWw8SUNvbnZlcnNhdGlvbkRvY3VtZW50PiA9XHJcbiAgbW9uZ29vc2UubW9kZWxzLkNvbnZlcnNhdGlvbiB8fFxyXG4gIG1vbmdvb3NlLm1vZGVsPElDb252ZXJzYXRpb25Eb2N1bWVudD4oJ0NvbnZlcnNhdGlvbicsIENvbnZlcnNhdGlvblNjaGVtYSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb252ZXJzYXRpb25Nb2RlbDtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwZWdnYVxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXG1vY2tcXFxccHJvamVjdFxcXFxzcmNcXFxcc2VydmVyXFxcXG1vZGVsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxccGVnZ2FcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxtb2NrXFxcXHByb2plY3RcXFxcc3JjXFxcXHNlcnZlclxcXFxtb2RlbHNcXFxcTWVzc2FnZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvcGVnZ2EvT25lRHJpdmUvRGVza3RvcC9tb2NrL3Byb2plY3Qvc3JjL3NlcnZlci9tb2RlbHMvTWVzc2FnZS50c1wiO2ltcG9ydCBtb25nb29zZSwgeyBTY2hlbWEsIERvY3VtZW50LCBNb2RlbCwgVHlwZXMgfSBmcm9tICdtb25nb29zZSc7XHJcbmltcG9ydCB0eXBlIHsgVXNlclJvbGUgfSBmcm9tICcuL1VzZXInO1xyXG5pbXBvcnQgeyBBdHRhY2htZW50U2NoZW1hLCB0eXBlIElBdHRhY2htZW50IH0gZnJvbSAnLi9Bc3NpZ25tZW50JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU1lc3NhZ2Uge1xyXG4gIGNvbnZlcnNhdGlvbklkOiBUeXBlcy5PYmplY3RJZDtcclxuICBzZW5kZXJJZDogVHlwZXMuT2JqZWN0SWQ7XHJcbiAgc2VuZGVyUm9sZTogVXNlclJvbGU7XHJcbiAgdGV4dDogc3RyaW5nO1xyXG4gIGF0dGFjaG1lbnRzOiBJQXR0YWNobWVudFtdO1xyXG4gIHJlYWQ6IGJvb2xlYW47XHJcbiAgc2VudEF0OiBEYXRlO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElNZXNzYWdlRG9jdW1lbnQgZXh0ZW5kcyBJTWVzc2FnZSwgRG9jdW1lbnQge31cclxuXHJcbmNvbnN0IE1lc3NhZ2VTY2hlbWEgPSBuZXcgU2NoZW1hPElNZXNzYWdlRG9jdW1lbnQ+KFxyXG4gIHtcclxuICAgIGNvbnZlcnNhdGlvbklkOiB7XHJcbiAgICAgIHR5cGU6IFNjaGVtYS5UeXBlcy5PYmplY3RJZCxcclxuICAgICAgcmVmOiAnQ29udmVyc2F0aW9uJyxcclxuICAgICAgcmVxdWlyZWQ6IFt0cnVlLCAnQ29udmVyc2F0aW9uIGlzIHJlcXVpcmVkJ10sXHJcbiAgICB9LFxyXG4gICAgc2VuZGVySWQ6IHtcclxuICAgICAgdHlwZTogU2NoZW1hLlR5cGVzLk9iamVjdElkLFxyXG4gICAgICByZWY6ICdVc2VyJyxcclxuICAgICAgcmVxdWlyZWQ6IFt0cnVlLCAnU2VuZGVyIGlzIHJlcXVpcmVkJ10sXHJcbiAgICB9LFxyXG4gICAgc2VuZGVyUm9sZToge1xyXG4gICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgIGVudW06IFsnYWRtaW4nLCAndGVhY2hlcicsICdzdHVkZW50J10sXHJcbiAgICAgIHJlcXVpcmVkOiBbdHJ1ZSwgJ1NlbmRlciByb2xlIGlzIHJlcXVpcmVkJ10sXHJcbiAgICB9LFxyXG4gICAgdGV4dDogeyB0eXBlOiBTdHJpbmcsIHRyaW06IHRydWUsIGRlZmF1bHQ6ICcnIH0sXHJcbiAgICBhdHRhY2htZW50czogeyB0eXBlOiBbQXR0YWNobWVudFNjaGVtYV0sIGRlZmF1bHQ6IFtdIH0sXHJcbiAgICByZWFkOiB7IHR5cGU6IEJvb2xlYW4sIGRlZmF1bHQ6IGZhbHNlIH0sXHJcbiAgICBzZW50QXQ6IHsgdHlwZTogRGF0ZSwgZGVmYXVsdDogRGF0ZS5ub3cgfSxcclxuICB9LFxyXG4gIHsgdGltZXN0YW1wczogdHJ1ZSB9XHJcbik7XHJcblxyXG5NZXNzYWdlU2NoZW1hLmluZGV4KHsgY29udmVyc2F0aW9uSWQ6IDEsIHNlbnRBdDogMSB9KTtcclxuTWVzc2FnZVNjaGVtYS5pbmRleCh7IHNlbmRlcklkOiAxIH0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IE1lc3NhZ2VNb2RlbDogTW9kZWw8SU1lc3NhZ2VEb2N1bWVudD4gPVxyXG4gIG1vbmdvb3NlLm1vZGVscy5NZXNzYWdlIHx8XHJcbiAgbW9uZ29vc2UubW9kZWw8SU1lc3NhZ2VEb2N1bWVudD4oJ01lc3NhZ2UnLCBNZXNzYWdlU2NoZW1hKTtcclxuXHJcbmV4cG9ydCBkZWZh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QUFDQSxhQUFLO0FBQUEsTUFDUCxDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFDRjtBQUVBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLEdBQUcsZ0JBQWdCLEdBQUcsb0JBQW9CLENBQUM7QUFBQSxFQUMzRCxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbIm1vbmdvb3NlIiwgIlNjaGVtYSIsICJtb25nb29zZSIsICJTY2hlbWEiLCAibW9uZ29vc2UiLCAiU2NoZW1hIiwgIm1vbmdvb3NlIiwgIlNjaGVtYSIsICJtb25nb29zZSIsICJTY2hlbWEiLCAibW9uZ29vc2UiLCAiU2NoZW1hIiwgIm1vbmdvb3NlIiwgIlNjaGVtYSIsICJtb25nb29zZSIsICJTY2hlbWEiLCAibW9uZ29vc2UiLCAiU2NoZW1hIiwgIm1vbmdvb3NlIiwgImJjcnlwdCIsICJtb25nb29zZSIsICJtb25nb29zZSIsICJzZWVkQWxsQ29sbGVjdGlvbnMiLCAibW9uZ29vc2UiLCAiYmNyeXB0IiwgIm1vbmdvb3NlIiwgInVzZXIiLCAiaXNQYXNzd29yZE1hdGNoIiwgInRva2VuIiwgInBhcnNlSnNvbkJvZHkiLCAic2VuZEpzb24iLCAic2VuZEpzb24iLCAicGFyc2VKc29uQm9keSIsICJqd3QiLCAibW9uZ29vc2UiLCAiU2NoZW1hIiwgIlNjaGVtYSIsICJtb25nb29zZSIsICJtb25nb29zZSIsICJTY2hlbWEiLCAiU2NoZW1hIiwgIm1vbmdvb3NlIiwgIm1vbmdvb3NlIiwgIlNjaGVtYSIsICJTY2hlbWEiLCAibW9uZ29vc2UiLCAibW9uZ29vc2UiLCAiU2NoZW1hIiwgIlNjaGVtYSIsICJtb25nb29zZSIsICJtb25nb29zZSIsICJTY2hlbWEiLCAiU2NoZW1hIiwgIm1vbmdvb3NlIiwgIm1vbmdvb3NlIiwgIlNjaGVtYSIsICJTY2hlbWEiLCAibW9uZ29vc2UiLCAiSldUX1NFQ1JFVCIsICJwYXJzZUpzb25Cb2R5IiwgInNlbmRKc29uIiwgImp3dCIsICJTdHVkZW50UHJvZmlsZU1vZGVsIiwgIm1vbmdvb3NlIiwgImp3dCIsICJtb25nb29zZSIsICJTY2hlbWEiLCAiU2NoZW1hIiwgIm1vbmdvb3NlIiwgIm1vbmdvb3NlIiwgIlNjaGVtYSIsICJTY2hlbWEiLCAibW9uZ29vc2UiLCAiSldUX1NFQ1JFVCIsICJwYXJzZUpzb25Cb2R5IiwgInNlbmRKc29uIiwgInZlcmlmeVRva2VuIiwgImp3dCJdCn0K
