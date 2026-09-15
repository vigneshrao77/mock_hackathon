import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IHealthRecord {
  studentId: Types.ObjectId;
  teacherId: Types.ObjectId;
  date: Date;
  bmi: number;
  vitaminD: number;
  vitaminB12: number;
  iron: number;
  hemoglobin: number;
  notes: string;
  nextCheckDate: Date;
}

export interface IHealthRecordDocument extends IHealthRecord, Document {}

const HealthRecordSchema = new Schema<IHealthRecordDocument>(
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
    date: { type: Date, required: [true, 'Record date is required'] },
    bmi: { type: Number, required: true },
    vitaminD: { type: Number, required: true },
    vitaminB12: { type: Number, required: true },
    iron: { type: Number, required: true },
    hemoglobin: { type: Number, required: true },
    notes: { type: String, trim: true, default: '' },
    nextCheckDate: { type: Date, required: [true, 'Next check date is required'] },
  },
  { timestamps: true }
);

HealthRecordSchema.index({ studentId: 1, date: -1 });
HealthRecordSchema.index({ teacherId: 1 });

export const HealthRecordModel: Model<IHealthRecordDocument> =
  mongoose.models.HealthRecord ||
  mongoose.model<IHealthRecordDocument>('HealthRecord', HealthRecordSchema);

export default HealthRecordModel;
