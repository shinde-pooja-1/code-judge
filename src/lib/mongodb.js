import { MONGODB_URI } from "@/constants/global.const";
import mongoose from "mongoose";

let cached =
  global.mongooseCache ||
  (global.mongooseCache = { conn: null, promise: null });

export default async function connectDB() {
  try {
    if (cached.conn) {
      return cached.conn;
    }
    if (!cached.promise) {
      cached.promise = mongoose.connect(MONGODB_URI);
    }
    cached.conn = await cached.promise;

    console.log("MongoDB connected");

    return cached.conn;
  } catch (error) {
    console.log("DB connection error:", error);
  }
}
