import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export type ContentStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface ISubject {
  name: string;
  description: string;
  programId: Types.ObjectId;
  status: ContentStatus;
  moduleIds: Types.ObjectId[];
}

export interface ISubjectDocument extends ISubject, Document {}

const SubjectSchema = new Schema<ISubjectDocument>(
  {
    name: {
      type: String,
      required: [true, 'Subject name is required'],
      trim: true,
    },
    description: { type: String, trim: true, default: '' },
    programId: {
      type: Schema.Types.ObjectId,
      ref: 'Program',
      required: [true, 'Program is required'],
    },
    status: {
      type: String,
      enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
      default: 'DRAFT',
    },
    moduleIds: [{ type: Schema.Types.ObjectId, ref: 'Module' }],
  },
  { timestamps: true }
);

SubjectSchema.index({ programId: 1 });
SubjectSchema.index({ status: 1 });

export const SubjectModel: Model<ISubjectDocument> =
  mongoose.models.Subject ||
  mongoose.model<ISubjectDocument>('Subject', SubjectSchema);

export default SubjectModel;
