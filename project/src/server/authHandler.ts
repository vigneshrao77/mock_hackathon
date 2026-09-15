import type { IncomingMessage, ServerResponse } from 'node:http';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase, isMongoConnected } from './db.js';
import UserModel, { type UserRole } from './models/User.js';
import StudentProfileModel from './models/StudentProfile.js';
import TeacherProfileModel from './models/TeacherProfile.js';
import AdminProfileModel from './models/AdminProfile.js';

export const ALLOWED_ROLES: readonly UserRole[] = ['admin', 'teacher', 'student'] as const;

export interface InMemUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'diksha-foundation-secret-key-2026';

// In-memory fallback
const inMemoryUsers: Map<string, InMemUser> = new Map();

function seedInMem(id: string, name: string, email: string, rawPassword: string, role: UserRole) {
  const passwordHash = bcrypt.hashSync(rawPassword, 10);
  inMemoryUsers.set(email.toLowerCase(), {
    id,
    name,
    email: email.toLowerCase(),
    passwordHash,
    role,
    createdAt: new Date().toISOString(),
  });
}

seedInMem('usr_admin_1', 'Diksha Admin', 'admin@diksha.org', 'password123', 'admin');
seedInMem('usr_teacher_1', 'Prof. Sharma', 'teacher@diksha.org', 'password123', 'teacher');
seedInMem('usr_student_1', 'Aarav Patel', 'student@diksha.org', 'password123', 'student');

let mongoSeeded = false;
async function ensureMongoSeeded() {
  if (mongoSeeded || !isMongoConnected()) return;
  try {
    const count = await UserModel.countDocuments();
    if (count === 0) {
      const demoAccounts = [
        { name: 'Diksha Admin', email: 'admin@diksha.org', password: 'password123', role: 'admin' },
        { name: 'Prof. Sharma', email: 'teacher@diksha.org', password: 'password123', role: 'teacher' },
        { name: 'Aarav Patel', email: 'student@diksha.org', password: 'password123', role: 'student' },
      ];
      for (const account of demoAccounts) {
        const passwordHash = await bcrypt.hash(account.password, 10);
        await UserModel.create({
          name: account.name,
          email: account.email.toLowerCase(),
          passwordHash,
          role: account.role as UserRole,
        });
      }
      console.log('🌱 Seeded demo accounts into MongoDB Atlas successfully.');
    }
    mongoSeeded = true;
  } catch (err) {
    console.error('Error seeding demo accounts into MongoDB:', (err as Error).message);
  }
}

function parseJsonBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', (err) => reject(err));
  });
}

function sendJson(res: ServerResponse, statusCode: number, data: any) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

async function authenticate(req: IncomingMessage): Promise<{ userId: string; role: UserRole } | null> {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: UserRole };
    return decoded;
  } catch {
    return null;
  }
}

export async function handleAuthRequest(req: IncomingMessage, res: ServerResponse): Promise<boolean> {
  const url = req.url?.split('?')[0];

  // Route: POST /api/auth/signup
  if (url === '/api/auth/signup' && req.method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const { name, email, password, role } = body;

      if (!name || typeof name !== 'string' || !name.trim()) {
        sendJson(res, 400, { message: 'Name is required' });
        return true;
      }

      if (!email || typeof email !== 'string' || !email.trim()) {
        sendJson(res, 400, { message: 'Email is required' });
        return true;
      }

      if (!password || typeof password !== 'string' || password.length < 6) {
        sendJson(res, 400, { message: 'Password must be at least 6 characters' });
        return true;
      }

      if (!role || !ALLOWED_ROLES.includes(role as UserRole)) {
        sendJson(res, 400, {
          message: 'Invalid role. Role must be one of: admin, teacher, student.',
        });
        return true;
      }

      const normalizedEmail = email.toLowerCase().trim();
      const passwordHash = await bcrypt.hash(password, 10);

      const mongoReady = await connectToDatabase();
      if (mongoReady) {
        await ensureMongoSeeded();
        const existingUser = await UserModel.findOne({ email: normalizedEmail });
        if (existingUser) {
          sendJson(res, 400, { message: 'Email already registered' });
          return true;
        }

        await UserModel.create({
          name: name.trim(),
          email: normalizedEmail,
          passwordHash,
          role: role as UserRole,
        });

        sendJson(res, 201, {
          message: 'Account created successfully',
        });
        return true;
      }

      if (inMemoryUsers.has(normalizedEmail)) {
        sendJson(res, 400, { message: 'Email already registered' });
        return true;
      }

      const newUser: InMemUser = {
        id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        role: role as UserRole,
        createdAt: new Date().toISOString(),
      };
      inMemoryUsers.set(normalizedEmail, newUser);

      sendJson(res, 201, {
        message: 'Account created successfully',
      });
      return true;
    } catch {
      sendJson(res, 500, { message: 'Internal server error' });
      return true;
    }
  }

  // Route: POST /api/auth/login
  if (url === '/api/auth/login' && req.method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const { email, password, role } = body;

      if (!role || !ALLOWED_ROLES.includes(role as UserRole)) {
        sendJson(res, 401, { message: 'Invalid email, password, or role.' });
        return true;
      }

      if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
        sendJson(res, 401, { message: 'Invalid email, password, or role.' });
        return true;
      }

      const normalizedEmail = email.toLowerCase().trim();

      const mongoReady = await connectToDatabase();
      if (mongoReady) {
        await ensureMongoSeeded();
        const user = await UserModel.findOne({ email: normalizedEmail });

        if (!user) {
          sendJson(res, 401, { message: 'Invalid email, password, or role.' });
          return true;
        }

        const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordMatch) {
          sendJson(res, 401, { message: 'Invalid email, password, or role.' });
          return true;
        }

        if (user.role !== role) {
          sendJson(res, 401, { message: 'Invalid email, password, or role.' });
          return true;
        }

        const token = jwt.sign(
          {
            userId: user._id.toString(),
            role: user.role,
          },
          JWT_SECRET,
          {
            expiresIn: '24h',
          }
        );

        sendJson(res, 200, {
          token,
          user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
        return true;
      }

      const user = inMemoryUsers.get(normalizedEmail);
      if (!user) {
        sendJson(res, 401, { message: 'Invalid email, password, or role.' });
        return true;
      }

      const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordMatch) {
        sendJson(res, 401, { message: 'Invalid email, password, or role.' });
        return true;
      }

      if (user.role !== role) {
        sendJson(res, 401, { message: 'Invalid email, password, or role.' });
        return true;
      }

      const token = jwt.sign(
        {
          userId: user.id,
          role: user.role,
        },
        JWT_SECRET,
        {
          expiresIn: '24h',
        }
      );

      sendJson(res, 200, {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
      return true;
    } catch {
      sendJson(res, 500, { message: 'Internal server error' });
      return true;
    }
  }

  // Route: GET /api/profile
  if (url === '/api/profile' && req.method === 'GET') {
    try {
      const auth = await authenticate(req);
      if (!auth) {
        sendJson(res, 401, { message: 'Unauthorized' });
        return true;
      }
      
      const mongoReady = await connectToDatabase();
      if (!mongoReady) {
        sendJson(res, 503, { message: 'Database unavailable' });
        return true;
      }

      let profile = null;
      if (auth.role === 'student') profile = await StudentProfileModel.findOne({ userId: auth.userId });
      else if (auth.role === 'teacher') profile = await TeacherProfileModel.findOne({ userId: auth.userId });
      else if (auth.role === 'admin') profile = await AdminProfileModel.findOne({ userId: auth.userId });

      if (!profile) {
        sendJson(res, 404, { message: 'Profile not found' });
        return true;
      }

      sendJson(res, 200, { profile });
      return true;
    } catch (err) {
      sendJson(res, 500, { message: 'Internal server error' });
      return true;
    }
  }

  // Route: POST /api/profile
  if (url === '/api/profile' && req.method === 'POST') {
    try {
      const auth = await authenticate(req);
      if (!auth) {
        sendJson(res, 401, { message: 'Unauthorized' });
        return true;
      }
      
      const mongoReady = await connectToDatabase();
      if (!mongoReady) {
        sendJson(res, 503, { message: 'Database unavailable' });
        return true;
      }

      const body = await parseJsonBody(req);
      
      let profile = null;
      if (auth.role === 'student') {
        const existing = await StudentProfileModel.findOne({ userId: auth.userId });
        if (existing) {
          sendJson(res, 400, { message: 'Profile already exists' });
          return true;
        }
        profile = await StudentProfileModel.create({
          userId: auth.userId,
          dob: body.dob ? new Date(body.dob) : undefined,
          consent: body.consent || false,
          profile: body.profile || {}
        });
      } else if (auth.role === 'teacher') {
        const existing = await TeacherProfileModel.findOne({ userId: auth.userId });
        if (existing) {
          sendJson(res, 400, { message: 'Profile already exists' });
          return true;
        }
        if (!body.employeeId) {
          sendJson(res, 400, { message: 'employeeId is required for teachers' });
          return true;
        }
        profile = await TeacherProfileModel.create({
          userId: auth.userId,
          employeeId: body.employeeId
        });
      } else if (auth.role === 'admin') {
        const existing = await AdminProfileModel.findOne({ userId: auth.userId });
        if (existing) {
          sendJson(res, 400, { message: 'Profile already exists' });
          return true;
        }
        if (!body.employeeId) {
          sendJson(res, 400, { message: 'employeeId is required for admins' });
          return true;
        }
        profile = await AdminProfileModel.create({
          userId: auth.userId,
          employeeId: body.employeeId
        });
      }

      sendJson(res, 201, { message: 'Profile created', profile });
      return true;
    } catch (err: any) {
      if (err.code === 11000) { // duplicate key error
        sendJson(res, 400, { message: 'Profile or unique field already exists' });
      } else {
        sendJson(res, 500, { message: 'Internal server error', error: err.message });
      }
      return true;
    }
  }

  // Route: PUT /api/profile
  if (url === '/api/profile' && req.method === 'PUT') {
    try {
      const auth = await authenticate(req);
      if (!auth) {
        sendJson(res, 401, { message: 'Unauthorized' });
        return true;
      }
      
      const mongoReady = await connectToDatabase();
      if (!mongoReady) {
        sendJson(res, 503, { message: 'Database unavailable' });
        return true;
      }

      const body = await parseJsonBody(req);
      
      let profile = null;
      if (auth.role === 'student') {
        profile = await StudentProfileModel.findOneAndUpdate(
          { userId: auth.userId },
          { $set: body },
          { new: true, runValidators: true }
        );
      } else if (auth.role === 'teacher') {
        profile = await TeacherProfileModel.findOneAndUpdate(
          { userId: auth.userId },
          { $set: body },
          { new: true, runValidators: true }
        );
      } else if (auth.role === 'admin') {
        profile = await AdminProfileModel.findOneAndUpdate(
          { userId: auth.userId },
          { $set: body },
          { new: true, runValidators: true }
        );
      }

      if (!profile) {
        sendJson(res, 404, { message: 'Profile not found to update' });
        return true;
      }

      sendJson(res, 200, { message: 'Profile updated', profile });
      return true;
    } catch (err: any) {
      sendJson(res, 500, { message: 'Internal server error', error: err.message });
      return true;
    }
  }

  return false;
}
