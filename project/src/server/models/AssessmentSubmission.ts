import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export type AssessmentSubmissionStatus = 'submitted' | 'graded';

export interface IAssessmentSubmission {
  assessmentId: Types.ObjectId;
  studentId: Types.ObjectId;
  answers: Map<string, string | string[]>;
  score: number;
  percentage: number;
  passed: boolean;
  feedback?: string;
  status: AssessmentSubmissionStatus;
  attemptNumber: number;
}

export interface IAssessmentSubmissionDocument extends IAssessmentSubmission, Document {}

const AssessmentSubmissionSchema = new Schema<IAssessmentSubmissionDocument>(
  {
    assessmentId: {
      type: Schema.Types.ObjectId,
      ref: 'Assessment',
      required: [true, 'Assessment is required'],
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Student is required'],
    },
    answers: {
      type: Map,
      of: Schema.Types.Mixed, // string or string[]
      default: new Map(),
    },
    score: { type: Number, required: true, min: 0 },
    percentage: { type: Number, required: true, min: 0, max: 100 },
    passed: { type: Boolean, required: true },
    feedback: { type: String, trim: true },
    status: {
      type: String,
      enum: ['submitted', 'graded'],
      default: 'submitted',
    },
    attemptNumber: { type: Number, default: 1, min: 1 },
  },
  { timestamps: true }
);

AssessmentSubmissionSchema.index({ assessmentId: 1, studentId: 1 });
AssessmentSubmissionSchema.index({ studentId: 1 });

export const AssessmentSubmissionModel: Model<IAssessmentSubmissionDocument> =
  mongoose.models.AssessmentSubmission ||
  mongoose.model<IAssessmentSubmissionDocument>('AssessmentSubmission', AssessmentSubmissionSchema);

export default AssessmentSubmissionModel;
