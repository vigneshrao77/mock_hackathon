import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import type { ContentStatus } from './Subject';

export interface IModule {
  subjectId: Types.ObjectId;
  title: string;
  description: string;
  order: number;
  status: ContentStatus;
  contentIds: Types.ObjectId[];
  assessmentIds: Types.ObjectId[];
}

export interface IModuleDocument extends IModule, Document {}

const ModuleSchema = new Schema<IModuleDocument>(
  {
    subjectId: {
      type: Schema.Types.ObjectId,
      ref: 'Subject',
      required: [true, 'Subject is required'],
    },
    title: {
      type: String,
      required: [true, 'Module title is required'],
      trim: true,
    },
    description: { type: String, trim: true, default: '' },
    order: { type: Number, required: true, min: 1 },
    status: {
      type: String,
      enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
      default: 'DRAFT',
    },
    contentIds: [{ type: Schema.Types.ObjectId, ref: 'ContentItem' }],
    assessmentIds: [{ type: Schema.Types.ObjectId, ref: 'Assessment' }],
  },
  { timestamps: true }
);

ModuleSchema.index({ subjectId: 1, order: 1 });
ModuleSchema.index({ status: 1 });

export const ModuleModel: Model<IModuleDocument> =
  mongoose.models.Module ||
  mongoose.model<IModuleDocument>('Module', ModuleSchema);

export default ModuleModel;
