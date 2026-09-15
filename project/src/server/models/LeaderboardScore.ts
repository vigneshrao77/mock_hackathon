import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface ILeaderboardScore {
  studentId: Types.ObjectId;
  programId: Types.ObjectId;
  cohortId: Types.ObjectId;
  rank: number;
  overallScore: number;
  assessmentScore: number;
  assignmentScore: number;
  disciplineScore: number;
}

export interface ILeaderboardScoreDocument extends ILeaderboardScore, Document {}

const LeaderboardScoreSchema = new Schema<ILeaderboardScoreDocument>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    programId: {
      type: Schema.Types.ObjectId,
      ref: 'Program',
      required: true,
    },
    cohortId: {
      type: Schema.Types.ObjectId,
      ref: 'Cohort',
      required: true,
    },
    rank: { type: Number, required: true, min: 1 },
    overallScore: { type: Number, required: true, min: 0, max: 100 },
    assessmentScore: { type: Number, required: true, min: 0, max: 100 },
    assignmentScore: { type: Number, required: true, min: 0, max: 100 },
    disciplineScore: { type: Number, required: true, min: 0, max: 100 },
  },
  { timestamps: true }
);

// One score record per student per cohort
LeaderboardScoreSchema.index({ studentId: 1, cohortId: 1 }, { unique: true });
LeaderboardScoreSchema.index({ programId: 1, cohortId: 1, rank: 1 });

export const LeaderboardScoreModel: Model<ILeaderboardScoreDocument> =
  mongoose.models.LeaderboardScore ||
  mongoose.model<ILeaderboardScoreDocument>('LeaderboardScore', LeaderboardScoreSchema);

export default LeaderboardScoreModel;
