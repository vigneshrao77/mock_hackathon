import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IStudentProfile {
  userId: Types.ObjectId;
  dob?: Date;
  programId?: Types.ObjectId;
  cohortId?: Types.ObjectId;
  teacherId?: Types.ObjectId;
  overallProgress: number;
  assessmentAverage: number;
  assignmentAverage: number;
  disciplineScore: number;
  leaderboardRank: number;
  consent: boolean;
  profile: {
    address?: string;
    guardianName?: string;
    guardianPhone?: string;
    bio?: string;
  };
}

export interface IStudentProfileDocument extends IStudentProfile, Document {}

const StudentProfileSchema = new Schema<IStudentProfileDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    dob: { type: Date },
    programId: { type: Schema.Types.ObjectId, ref: 'Program' },
    cohortId: { type: Schema.Types.ObjectId, ref: 'Cohort' },
    teacherId: { type: Schema.Types.ObjectId, ref: 'User' },
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
      bio: { type: String, trim: true },
    },
  },
  { timestamps: true }
);

StudentProfileSchema.index({ programId: 1 });
StudentProfileSchema.index({ cohortId: 1 });
StudentProfileSchema.index({ teacherId: 1 });

export const StudentProfileModel: Model<IStudentProfileDocument> =
  mongoose.models.StudentProfile ||
  mongoose.model<IStudentProfileDocument>('StudentProfile', StudentProfileSchema);

export default StudentProfileModel;
