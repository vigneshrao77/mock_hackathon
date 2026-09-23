import type { IncomingMessage, ServerResponse } from 'node:http';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from './db.js';
import ConversationModel from './models/Conversation.js';
import MessageModel from './models/Message.js';
import UserModel from './models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'diksha-foundation-secret-key-2026';

interface TokenPayload {
  userId: string;
  role: 'admin' | 'teacher' | 'student';
}

function parseJsonBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      if (!body) { resolve({}); return; }
      try { resolve(JSON.parse(body)); }
      catch (err) { reject(err); }
    });
    req.on('error', (err) => reject(err));
  });
}

function sendJson(res: ServerResponse, statusCode: number, data: any) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

function verifyToken(req: IncomingMessage): TokenPayload | null {
  const authHeader = req.headers['authorization'];
  if (!authHeader?.startsWith('Bearer ')) return null;
  const token = authHeader.slice(7);
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export async function handleChatRequest(req: IncomingMessage, res: ServerResponse, io?: any): Promise<boolean> {
  const rawUrl = req.url || '';
  if (!rawUrl.startsWith('/api/chat') && !rawUrl.startsWith('/api/users')) {
    return false;
  }

  const connected = await connectToDatabase();
  if (!connected) {
    sendJson(res, 503, { message: 'Database connection unavailable' });
    return true;
  }

  const method = req.method;
  const urlObj = new URL(rawUrl, 'http://localhost');
  const pathname = urlObj.pathname;
  const searchParams = urlObj.searchParams;

  // -------------------------------------------------------------
  // GET /api/users
  // -------------------------------------------------------------
  if (pathname === '/api/users' && method === 'GET') {
    const user = verifyToken(req);
    if (!user) { sendJson(res, 401, { message: 'Unauthorized' }); return true; }

    const role = searchParams.get('role');
    const query = role ? { role } : {};
    
    try {
      const users = await UserModel.find(query).select('-passwordHash').lean();
      sendJson(res, 200, { data: users });
    } catch (err) {
      sendJson(res, 500, { message: (err as Error).message });
    }
    return true;
  }

  // -------------------------------------------------------------
  // GET /api/chat/conversations
  // -------------------------------------------------------------
  if (pathname === '/api/chat/conversations' && method === 'GET') {
    const user = verifyToken(req);
    if (!user) { sendJson(res, 401, { message: 'Unauthorized' }); return true; }

    try {
      const filter = user.role === 'student' ? { studentId: user.userId } : { teacherId: user.userId };
      const convs = await ConversationModel.find(filter)
        .populate('studentId', 'name email avatar')
        .populate('teacherId', 'name email avatar')
        .sort({ lastMessageAt: -1 })
        .lean();
      sendJson(res, 200, { data: convs });
    } catch (err) {
      sendJson(res, 500, { message: (err as Error).message });
    }
    return true;
  }

  // -------------------------------------------------------------
  // POST /api/chat/conversations
  // -------------------------------------------------------------
  if (pathname === '/api/chat/conversations' && method === 'POST') {
    const user = verifyToken(req);
    if (!user) { sendJson(res, 401, { message: 'Unauthorized' }); return true; }

    try {
      const body = await parseJsonBody(req);
      const { targetUserId } = body;
      
      if (!targetUserId) {
        sendJson(res, 400, { message: 'targetUserId is required' });
        return true;
      }

      const targetUser = await UserModel.findById(targetUserId);
      if (!targetUser) {
        sendJson(res, 404, { message: 'Target user not found' });
        return true;
      }

      let studentId, teacherId;
      if (user.role === 'student' && targetUser.role === 'teacher') {
        studentId = user.userId;
        teacherId = targetUserId;
      } else if (user.role === 'teacher' && targetUser.role === 'student') {
        studentId = targetUserId;
        teacherId = user.userId;
      } else {
        sendJson(res, 400, { message: 'Conversations must be between a student and a teacher' });
        return true;
      }

      let conv = await ConversationModel.findOne({ studentId, teacherId });
      if (!conv) {
        conv = await ConversationModel.create({ studentId, teacherId });
      }

      // Re-fetch with populated users
      const populatedConv = await ConversationModel.findById(conv._id)
        .populate('studentId', 'name email avatar')
        .populate('teacherId', 'name email avatar')
        .lean();

      sendJson(res, 200, { data: populatedConv });
    } catch (err) {
      sendJson(res, 500, { message: (err as Error).message });
    }
    return true;
  }

  // Extract Conversation ID for routes like /api/chat/conversations/:id/...
  if (pathname.startsWith('/api/chat/conversations/') && pathname.split('/').length >= 5) {
    const parts = pathname.split('/');
    const convId = parts[4];
    const action = parts[5];

    // GET /api/chat/conversations/:id/messages
    if (action === 'messages' && method === 'GET') {
      const user = verifyToken(req);
      if (!user) { sendJson(res, 401, { message: 'Unauthorized' }); return true; }

      try {
        const messages = await MessageModel.find({ conversationId: convId })
          .sort({ sentAt: 1 })
          .lean();
        sendJson(res, 200, { data: messages });
      } catch (err) {
        sendJson(res, 500, { message: (err as Error).message });
      }
      return true;
    }

    // POST /api/chat/conversations/:id/messages
    if (action === 'messages' && method === 'POST') {
      const user = verifyToken(req);
      if (!user) { sendJson(res, 401, { message: 'Unauthorized' }); return true; }

      try {
        const body = await parseJsonBody(req);
        const { text, attachments } = body;

        const conv = await ConversationModel.findById(convId);
        if (!conv) {
          sendJson(res, 404, { message: 'Conversation not found' });
          return true;
        }

        const msg = await MessageModel.create({
          conversationId: convId,
          senderId: user.userId,
          senderRole: user.role,
          text: text || '',
          attachments: attachments || [],
          sentAt: new Date()
        });

        // Update conversation lastMessageAt and unreadCount
        conv.lastMessageAt = msg.sentAt;
        if (user.role === 'student') {
           // Teacher gets unread
           conv.unreadCount += 1;
        } else {
           // Student gets unread
           conv.unreadCount += 1;
        }
        await conv.save();

        if (io) {
          const targetId = user.role === 'student' ? conv.teacherId.toString() : conv.studentId.toString();
          io.to(targetId).emit('newMessage', msg);
          io.to(targetId).emit('conversationUpdated', conv);
        }

        sendJson(res, 201, { data: msg });
      } catch (err) {
        sendJson(res, 500, { message: (err as Error).message });
      }
      return true;
    }

    // PATCH /api/chat/conversations/:id/read
    if (action === 'read' && method === 'PATCH') {
      const user = verifyToken(req);
      if (!user) { sendJson(res, 401, { message: 'Unauthorized' }); return true; }

      try {
        const conv = await ConversationModel.findById(convId);
        if (!conv) {
          sendJson(res, 404, { message: 'Conversation not found' });
          return true;
        }

        // We naively reset unread count for now.
        // In a perfect system, we'd track who read what, but our model just has a single unreadCount
        conv.unreadCount = 0;
        await conv.save();

        await MessageModel.updateMany(
          { conversationId: convId, senderId: { $ne: user.userId } },
          { $set: { read: true } }
        );

        sendJson(res, 200, { message: 'Conversation marked as read' });
      } catch (err) {
        sendJson(res, 500, { message: (err as Error).message });
      }
      return true;
    }
  }

  return false;
}
