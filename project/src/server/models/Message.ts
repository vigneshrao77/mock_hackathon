import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import type { UserRole } from './User';
import { AttachmentSchema, type IAttachment } from './Assignment';

export interface IMessage {
  conversationId: Types.ObjectId;
  senderId: Types.ObjectId;
  senderRole: UserRole;
  text: string;
  attachments: IAttachment[];
  read: boolean;
  sentAt: Date;
}

export interface IMessageDocument extends IMessage, Document {}

const MessageSchema = new Schema<IMessageDocument>(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
      required: [true, 'Conversation is required'],
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Sender is required'],
    },
    senderRole: {
      type: String,
      enum: ['admin', 'teacher', 'student'],
      required: [true, 'Sender role is required'],
    },
    text: { type: String, trim: true, default: '' },
    attachments: { type: [AttachmentSchema], default: [] },
    read: { type: Boolean, default: false },
    sentAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

MessageSchema.index({ conversationId: 1, sentAt: 1 });
MessageSchema.index({ senderId: 1 });

export const MessageModel: Model<IMessageDocument> =
  mongoose.models.Message ||
  mongoose.model<IMessageDocument>('Message', MessageSchema);

export default MessageModel;
