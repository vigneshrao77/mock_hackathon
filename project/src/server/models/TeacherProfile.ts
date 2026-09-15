import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface ITeacherProfile {
  userId: Types.ObjectId;
  employeeId: string;
  programId?: Types.ObjectId;
  cohortId?: Types.ObjectId;
  subjectIds: Types.ObjectId[];
  studentIds: Types.ObjectId[];
}

export interface ITeacherProfileDocument extends ITeacherProfile, Document {}

const TeacherProfileSchema = new Schema<ITeacherProfileDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    employeeId: {
      type: String,
      required: [true, 'Employee ID is required'],
      unique: true,
      trim: true,
    },
    programId: { type: Schema.Types.ObjectId, ref: 'Program' },
    cohortId: { type: Schema.Types.ObjectId, ref: 'Cohort' },
    subjectIds: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
    studentIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

TeacherProfileSchema.index({ programId: 1 });
TeacherProfileSchema.index({ cohortId: 1 });

export const TeacherProfileModel: Model<ITeacherProfileDocument> =
  mongoose.models.TeacherProfile ||
  mongoose.model<ITeacherProfileDocument>('TeacherProfile', TeacherProfileSchema);

export default TeacherProfileModel;
