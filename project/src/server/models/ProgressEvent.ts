import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export type ProgressEventType =
  | 'content_completed'
  | 'assessment_submitted'
  | 'assignment_submitted'
  | 'login'
  | 'module_completed';

export interface IProgressEvent {
  studentId: Types.ObjectId;
  type: ProgressEventType;
  description: string;
  entityId?: Types.ObjectId; // content, assessment, assignment, or module id
}

export interface IProgressEventDocument extends IProgressEvent, Document {}

const ProgressEventSchema = new Schema<IProgressEventDocument>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Student is required'],
    },
    type: {
      type: String,
      enum: [
        'content_completed',
        'assessment_submitted',
        'assignment_submitted',
        'login',
        'module_completed',
      ],
      required: true,
    },
    description: { type: String, required: true, trim: true },
    entityId: { type: Schema.Types.ObjectId },
  },
  { timestamps: true }
);

ProgressEventSchema.index({ studentId: 1, createdAt: -1 });

export const ProgressEventModel: Model<IProgressEventDocument> =
  mongoose.models.ProgressEvent ||
  mongoose.model<IProgressEventDocument>('ProgressEvent', ProgressEventSchema);

export default ProgressEventModel;
