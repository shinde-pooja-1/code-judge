import { cookies } from "next/headers";
import { verifyToken } from "./jwt";
import connectDB from "./mongodb";
import User from "@/models/User.model";

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const decoded = verifyToken(token);

    await connectDB();
    const user = await User.findById(decoded.id).select("-password").lean();

    if (!user) return null;

    return {
      _id: user._id.toString(),
      name: user.name,
      userName: user.userName,
      email: user.email,
    };
  } catch {
    return null;
  }
}
