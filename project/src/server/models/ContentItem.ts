import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import type { ContentStatus } from './Subject';

export type ContentType = 'video' | 'document' | 'audio' | 'link' | 'text';

export interface IContentItem {
  moduleId: Types.ObjectId;
  title: string;
  type: ContentType;
  description: string;
  url?: string;
  duration?: number; // seconds
  status: ContentStatus;
}

export interface IContentItemDocument extends IContentItem, Document {}

const ContentItemSchema = new Schema<IContentItemDocument>(
  {
    moduleId: {
      type: Schema.Types.ObjectId,
      ref: 'Module',
      required: [true, 'Module is required'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['video', 'document', 'audio', 'link', 'text'],
      required: [true, 'Content type is required'],
    },
    description: { type: String, trim: true, default: '' },
    url: { type: String, trim: true },
    duration: { type: Number, min: 0 }, // seconds
    status: {
      type: String,
      enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
      default: 'DRAFT',
    },
  },
  { timestamps: true }
);

ContentItemSchema.index({ moduleId: 1 });
ContentItemSchema.index({ status: 1 });

export const ContentItemModel: Model<IContentItemDocument> =
  mongoose.models.ContentItem ||
  mongoose.model<IContentItemDocument>('ContentItem', ContentItemSchema);

export default ContentItemModel;
