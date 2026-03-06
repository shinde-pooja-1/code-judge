import { MONGODB_URI } from "@/constants/global.const";
import mongoose from "mongoose";

export default async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("DB connection error:", error);
  }
}
