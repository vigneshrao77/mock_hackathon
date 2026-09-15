import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IProgram {
  name: string;
  description: string;
  cohortIds: Types.ObjectId[];
  subjectIds: Types.ObjectId[];
  status: 'active' | 'inactive';
}

export interface IProgramDocument extends IProgram, Document {}

const ProgramSchema = new Schema<IProgramDocument>(
  {
    name: {
      type: String,
      required: [true, 'Program name is required'],
      trim: true,
    },
    description: { type: String, trim: true, default: '' },
    cohortIds: [{ type: Schema.Types.ObjectId, ref: 'Cohort' }],
    subjectIds: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  { timestamps: true }
);

export const ProgramModel: Model<IProgramDocument> =
  mongoose.models.Program ||
  mongoose.model<IProgramDocument>('Program', ProgramSchema);

export default ProgramModel;
