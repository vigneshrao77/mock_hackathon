import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IAdminProfile {
  userId: Types.ObjectId;
  employeeId: string;
}

export interface IAdminProfileDocument extends IAdminProfile, Document {}

const AdminProfileSchema = new Schema<IAdminProfileDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    employeeId: {
      type: String,
      required: [true, 'Employee ID is required'],
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const AdminProfileModel: Model<IAdminProfileDocument> =
  mongoose.models.AdminProfile ||
  mongoose.model<IAdminProfileDocument>('AdminProfile', AdminProfileSchema);

export default AdminProfileModel;
