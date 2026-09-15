import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import type { ContentStatus } from './Subject';

export type QuestionType =
  | 'mcq'
  | 'multiple_select'
  | 'true_false'
  | 'short_answer'
  | 'audio_response'
  | 'video_response';

export interface IQuestion {
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer?: string | string[];
  marks: number;
}

export interface IAssessment {
  moduleId?: Types.ObjectId;
  subjectId?: Types.ObjectId;
  title: string;
  description: string;
  questions: IQuestion[];
  totalMarks: number;
  passScore: number;
  maxAttempts: number;
  status: ContentStatus;
  createdBy?: Types.ObjectId; // teacher userId
}

export interface IAssessmentDocument extends IAssessment, Document {}

const QuestionSchema = new Schema<IQuestion>(
  {
    type: {
      type: String,
      enum: ['mcq', 'multiple_select', 'true_false', 'short_answer', 'audio_response', 'video_response'],
      required: true,
    },
    question: { type: String, required: true, trim: true },
    options: [{ type: String }],
    correctAnswer: { type: Schema.Types.Mixed }, // string or string[]
    marks: { type: Number, required: true, min: 0 },
  },
  { _id: true }
);

const AssessmentSchema = new Schema<IAssessmentDocument>(
  {
    moduleId: {
      type: Schema.Types.ObjectId,
      ref: 'Module',
    },
    subjectId: {
      type: Schema.Types.ObjectId,
      ref: 'Subject',
    },
    title: {
      type: String,
      required: [true, 'Assessment title is required'],
      trim: true,
    },
    description: { type: String, trim: true, default: '' },
    questions: { type: [QuestionSchema], default: [] },
    totalMarks: { type: Number, required: true, min: 0 },
    passScore: { type: Number, required: true, min: 0 },
    maxAttempts: { type: Number, default: 3, min: 1 },
    status: {
      type: String,
      enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
      default: 'DRAFT',
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

AssessmentSchema.index({ moduleId: 1 });
AssessmentSchema.index({ subjectId: 1 });
AssessmentSchema.index({ status: 1 });

export const AssessmentModel: Model<IAssessmentDocument> =
  mongoose.models.Assessment ||
  mongoose.model<IAssessmentDocument>('Assessment', AssessmentSchema);

export default AssessmentModel;
