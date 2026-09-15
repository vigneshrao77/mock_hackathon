import dns from 'node:dns';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Ensure Node's c-ares resolver resolves MongoDB Atlas SRV records reliably on Windows
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Fallback to default DNS if custom server setting is restricted
}

let isConnected = false;

export async function connectToDatabase(): Promise<boolean> {
  // Always reload .env so changes take effect without server restart
  dotenv.config({ override: true });

  if (isConnected && mongoose.connection.readyState === 1) {
    return true;
  }

  const mongoUri = process.env.MONGODB_URI?.trim();

  if (!mongoUri) {
    return false;
  }

  try {
    const db = await mongoose.connect(mongoUri, {
      dbName: 'diksha',
      serverSelectionTimeoutMS: 8000,
    });

    isConnected = db.connection.readyState === 1;
    console.log('✅ Successfully connected to MongoDB Atlas. Database:', db.connection.name);
    return isConnected;
  } catch (error) {
    console.error('❌ MongoDB connection error:', (error as Error).message);
    isConnected = false;
    return false;
  }
}

export function isMongoConnected(): boolean {
  return isConnected && mongoose.connection.readyState === 1;
}
