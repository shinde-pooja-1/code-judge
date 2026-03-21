import { NODE_ENV } from "@/constants/global.const";
import { signToken } from "@/lib/jwt";
import connectDB from "@/lib/mongodb";
import User from "@/models/User.model";
import { cookies } from "next/headers";

export async function signupUser({ name, email, password }) {
  try {
    await connectDB();

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return { error: "EMAIL_ALREADY_IN_USE" };
    }

    const userName = email.split("@")[0];

    const user = await User.create({
      name: name,
      email: email,
      password,
      userName,
    });

    const token = signToken({
      id: user._id.toString(),
      userName: user.name,
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
        role: user.role,
      },
    };
  } catch (error) {
    return { error: error || "FAILED_TO_SIGNUP" };
  }
}

export async function loginUser({ email, password }) {
  try {
    await connectDB();
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return { error: "INVALID_CREDENTIALS" };
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return { error: "INCORRECT_PASSWORD" };
    }

    const token = signToken({
      id: user._id.toString(),
      userName: user.name,
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
        role: user.role,
      },
    };
  } catch (error) {
    return { error: error || "FAILED_TO_LOGIN" };
  }
}
