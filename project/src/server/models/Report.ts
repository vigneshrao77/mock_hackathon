import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export type ReportType =
  | 'student'
  | 'teacher'
  | 'cohort'
  | 'assessment'
  | 'assignment'
  | 'progress';

export type ReportStatus = 'generating' | 'ready' | 'failed';

export interface IReport {
  type: ReportType;
  title: string;
  filters: Record<string, string>;
  status: ReportStatus;
  downloadUrl?: string;
  createdBy?: Types.ObjectId; // admin userId
}

export interface IReportDocument extends IReport, Document {}

const ReportSchema = new Schema<IReportDocument>(
  {
    type: {
      type: String,
      enum: ['student', 'teacher', 'cohort', 'assessment', 'assignment', 'progress'],
      required: [true, 'Report type is required'],
    },
    title: {
      type: String,
      required: [true, 'Report title is required'],
      trim: true,
    },
    filters: { type: Schema.Types.Mixed, default: {} },
    status: {
      type: String,
      enum: ['generating', 'ready', 'failed'],
      default: 'generating',
    },
    downloadUrl: { type: String, trim: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

ReportSchema.index({ status: 1, createdAt: -1 });
ReportSchema.index({ createdBy: 1 });

export const ReportModel: Model<IReportDocument> =
  mongoose.models.Report ||
  mongoose.model<IReportDocument>('Report', ReportSchema);

export default ReportModel;
