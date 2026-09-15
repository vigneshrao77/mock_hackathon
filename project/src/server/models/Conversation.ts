import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IConversation {
  studentId: Types.ObjectId;
  teacherId: Types.ObjectId;
  lastMessageAt: Date;
  unreadCount: number;
}

export interface IConversationDocument extends IConversation, Document {}

const ConversationSchema = new Schema<IConversationDocument>(
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
    lastMessageAt: { type: Date, default: Date.now },
    unreadCount: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

// Each student-teacher pair has exactly one conversation thread
ConversationSchema.index({ studentId: 1, teacherId: 1 }, { unique: true });

export const ConversationModel: Model<IConversationDocument> =
  mongoose.models.Conversation ||
  mongoose.model<IConversationDocument>('Conversation', ConversationSchema);

export default ConversationModel;
