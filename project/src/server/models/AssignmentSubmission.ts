import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import { AttachmentSchema, type IAttachment } from './Assignment';

export interface IAssignmentSubmission {
  assignmentId: Types.ObjectId;
  studentId: Types.ObjectId;
  textResponse: string;
  attachments: IAttachment[];
  isLate: boolean;
  marks?: number;
  feedback?: string;
  gradedAt?: Date;
  gradedBy?: Types.ObjectId; // teacher userId
}

export interface IAssignmentSubmissionDocument extends IAssignmentSubmission, Document {}

const AssignmentSubmissionSchema = new Schema<IAssignmentSubmissionDocument>(
  {
    assignmentId: {
      type: Schema.Types.ObjectId,
      ref: 'Assignment',
      required: [true, 'Assignment is required'],
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Student is required'],
    },
    textResponse: { type: String, trim: true, default: '' },
    attachments: { type: [AttachmentSchema], default: [] },
    isLate: { type: Boolean, default: false },
    marks: { type: Number, min: 0 },
    feedback: { type: String, trim: true },
    gradedAt: { type: Date },
    gradedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

// Each student submits once per assignment (latest attempt)
AssignmentSubmissionSchema.index({ assignmentId: 1, studentId: 1 }, { unique: true });
AssignmentSubmissionSchema.index({ studentId: 1 });

export const AssignmentSubmissionModel: Model<IAssignmentSubmissionDocument> =
  mongoose.models.AssignmentSubmission ||
  mongoose.model<IAssignmentSubmissionDocument>('AssignmentSubmission', AssignmentSubmissionSchema);

export default AssignmentSubmissionModel;
