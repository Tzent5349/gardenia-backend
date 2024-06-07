// lib/database/connection.ts
import mongoose from "mongoose";

const MONGODB_URI: string = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = (global as any).mongoose || { conn: null, promise: null };

/* async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      dbName: "dashboard",
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        return mongoose;
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        throw error; // Rethrow the error to propagate it further
      });
  }

  cached.conn = await cached.promise;
  // (global as any).mongoose = cached;
  return cached.conn;
} */

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      dbName: "dashboard",
      bufferCommands: false,
    };

    try {
      cached.conn = await mongoose.connect(MONGODB_URI, opts);
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }

  return cached.conn;
}


export default connectToDatabase;
