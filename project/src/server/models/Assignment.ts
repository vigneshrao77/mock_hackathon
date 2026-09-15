import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export type AssignmentStatus =
  | 'NEW'
  | 'IN_PROGRESS'
  | 'SUBMITTED'
  | 'LATE'
  | 'GRADED'
  | 'OVERDUE';

export interface IAttachment {
  name: string;
  size: number;
  type: string;
  url?: string;
}

const AttachmentSchema = new Schema<IAttachment>(
  {
    name: { type: String, required: true, trim: true },
    size: { type: Number, required: true, min: 0 },
    type: { type: String, required: true, trim: true },
    url: { type: String, trim: true },
  },
  { _id: true }
);

export interface IAssignment {
  studentId: Types.ObjectId;
  teacherId: Types.ObjectId;
  subjectId?: Types.ObjectId;
  moduleId?: Types.ObjectId;
  title: string;
  instructions: string;
  attachments: IAttachment[];
  maxMarks: number;
  dueDate: Date;
  status: AssignmentStatus;
}

export interface IAssignmentDocument extends IAssignment, Document {}

const AssignmentSchema = new Schema<IAssignmentDocument>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Student is required'],
    },
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Teacher is required'],
    },
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject' },
    moduleId: { type: Schema.Types.ObjectId, ref: 'Module' },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    instructions: { type: String, trim: true, default: '' },
    attachments: { type: [AttachmentSchema], default: [] },
    maxMarks: { type: Number, required: true, min: 0 },
    dueDate: { type: Date, required: [true, 'Due date is required'] },
    status: {
      type: String,
      enum: ['NEW', 'IN_PROGRESS', 'SUBMITTED', 'LATE', 'GRADED', 'OVERDUE'],
      default: 'NEW',
    },
  },
  { timestamps: true }
);

AssignmentSchema.index({ studentId: 1 });
AssignmentSchema.index({ teacherId: 1 });
AssignmentSchema.index({ moduleId: 1 });
AssignmentSchema.index({ subjectId: 1 });
AssignmentSchema.index({ status: 1 });
AssignmentSchema.index({ dueDate: 1 });

export const AssignmentModel: Model<IAssignmentDocument> =
  mongoose.models.Assignment ||
  mongoose.model<IAssignmentDocument>('Assignment', AssignmentSchema);

export { AttachmentSchema };
export default AssignmentModel;
