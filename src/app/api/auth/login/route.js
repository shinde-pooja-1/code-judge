import { NextResponse } from "next/server";
import { loginUser } from "@/services/auth.service";
import { loginSchema } from "@/validations/auth.schema";

// POST /api/auth/login
export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }
    const resp = await loginUser(parsed.data);
    if (resp?.error) {
      return NextResponse.json(
        {
          error: resp.error,
        },
        { status: 409 },
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[POST /api/auth/login]", error);

    if (error.message === "INVALID_CREDENTIALS") {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
