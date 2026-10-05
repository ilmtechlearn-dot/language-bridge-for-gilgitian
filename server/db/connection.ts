import mongoose from 'mongoose';

let isMongoConnected = false;

export async function connectDB(): Promise<boolean> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('[DB] No MONGODB_URI provided in environment. Utilizing resilient in-memory & file storage layer with full MongoDB model API compatibility.');
    isMongoConnected = false;
    return false;
  }

  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
    });
    console.log('[DB] Connected to external MongoDB instance at', uri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));
    isMongoConnected = true;
    return true;
  } catch (err) {
    console.warn('[DB] Could not connect to external MongoDB server. Falling back to internal resilient JSON/in-memory store:', (err as Error).message);
    isMongoConnected = false;
    return false;
  }
}

export function isUsingExternalMongo(): boolean {
  return isMongoConnected;
}
