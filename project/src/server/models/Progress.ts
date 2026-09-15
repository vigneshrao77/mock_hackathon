import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IProgress {
  studentId: Types.ObjectId;
  subjectId: Types.ObjectId;
  moduleId: Types.ObjectId;
  completionPercentage: number;
  completedContentIds: Types.ObjectId[];
  lastAccessedAt: Date;
}

export interface IProgressDocument extends IProgress, Document {}

const ProgressSchema = new Schema<IProgressDocument>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Student is required'],
    },
    subjectId: {
      type: Schema.Types.ObjectId,
      ref: 'Subject',
      required: [true, 'Subject is required'],
    },
    moduleId: {
      type: Schema.Types.ObjectId,
      ref: 'Module',
      required: [true, 'Module is required'],
    },
    completionPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    completedContentIds: [{ type: Schema.Types.ObjectId, ref: 'ContentItem' }],
    lastAccessedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Each student has one progress record per module
ProgressSchema.index({ studentId: 1, moduleId: 1 }, { unique: true });
ProgressSchema.index({ studentId: 1, subjectId: 1 });

export const ProgressModel: Model<IProgressDocument> =
  mongoose.models.Progress ||
  mongoose.model<IProgressDocument>('Progress', ProgressSchema);

export default ProgressModel;
