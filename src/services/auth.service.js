import { NODE_ENV } from "@/constants/global.const";
import { signToken } from "@/lib/jwt";
import connectDB from "@/lib/mongodb";
import User from "@/models/User.model";
import { cookies } from "next/headers";

export async function signupUser({ name, email, password }) {
  await connectDB();

  const existing = await User.findOne({ email });
  if (existing) {
    return { error: "EMAIL_ALREADY_IN_USE" };
  }

  const userName = email;

  const user = await User.create({ name, email, password, userName });

  const token = signToken({
    id: user._id.toString(),
    userName: user.userName,
  });

  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return {
    data: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      userName: user.userName,
    },
  };
}

export async function loginUser({ email, password }) {
  await connectDB();

  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new Error("INVALID_CREDENTIALS");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("INVALID_CREDENTIALS");

  const token = signToken({
    id: user._id.toString(),
    userName: user.userName,
  });

  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return {
    data: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      userName: user.userName,
    },
  };
}
