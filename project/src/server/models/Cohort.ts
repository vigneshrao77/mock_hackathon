import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface ICohort {
  name: string;
  programId: Types.ObjectId;
  studentCount: number;
}

export interface ICohortDocument extends ICohort, Document {}

const CohortSchema = new Schema<ICohortDocument>(
  {
    name: {
      type: String,
      required: [true, 'Cohort name is required'],
      trim: true,
    },
    programId: {
      type: Schema.Types.ObjectId,
      ref: 'Program',
      required: [true, 'Program is required'],
    },
    studentCount: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

CohortSchema.index({ programId: 1 });

export const CohortModel: Model<ICohortDocument> =
  mongoose.models.Cohort ||
  mongoose.model<ICohortDocument>('Cohort', CohortSchema);

export default CohortModel;
