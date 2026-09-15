import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export type HealthCheckStatus = 'UPCOMING' | 'DUE' | 'OVERDUE' | 'COMPLETED';

export interface IHealthCheck {
  studentId: Types.ObjectId;
  teacherId: Types.ObjectId;
  title: string;
  lastCheckDate?: Date;
  nextCheckDate: Date;
  status: HealthCheckStatus;
}

export interface IHealthCheckDocument extends IHealthCheck, Document {}

const HealthCheckSchema = new Schema<IHealthCheckDocument>(
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
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    lastCheckDate: { type: Date },
    nextCheckDate: { type: Date, required: [true, 'Next check date is required'] },
    status: {
      type: String,
      enum: ['UPCOMING', 'DUE', 'OVERDUE', 'COMPLETED'],
      default: 'UPCOMING',
    },
  },
  { timestamps: true }
);

HealthCheckSchema.index({ studentId: 1 });
HealthCheckSchema.index({ teacherId: 1 });
HealthCheckSchema.index({ status: 1 });
HealthCheckSchema.index({ nextCheckDate: 1 });

export const HealthCheckModel: Model<IHealthCheckDocument> =
  mongoose.models.HealthCheck ||
  mongoose.model<IHealthCheckDocument>('HealthCheck', HealthCheckSchema);

export default HealthCheckModel;
