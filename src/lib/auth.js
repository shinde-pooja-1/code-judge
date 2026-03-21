import { cookies } from "next/headers";
import { verifyToken } from "./jwt";
import connectDB from "./mongodb";
import User from "@/models/User.model";
import { ADMIN_EMAILS } from "@/constants/global.const";

function getAdminEmailSet() {
  return new Set(
    ADMIN_EMAILS.split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  );
}

export function isAdminUser(user) {
  if (!user?.email) return false;

  const adminEmails = getAdminEmailSet();
  return user.role === "admin" || adminEmails.has(user.email.toLowerCase());
}

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
      role: isAdminUser(user) ? "admin" : user.role || "user",
      isAdmin: isAdminUser(user),
    };
  } catch {
    return null;
  }
}
