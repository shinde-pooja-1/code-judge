export const dynamic = "force-dynamic";

import { signupUser } from "@/services/auth.service";
import { signupSchema } from "@/validations/auth.schema";
import { NextResponse } from "next/server";

// POST /api/auth/signup
export async function POST(request) {
  try {
    const body = await request.json();

    const parsed = signupSchema.safeParse(body);

    if (!parsed?.success) {
      return NextResponse.json(
        {
          error: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const resp = await signupUser(parsed?.data);

    if (resp?.error) {
      return NextResponse.json(
        {
          error: resp.error,
        },
        { status: 409 },
      );
    }

    const response = NextResponse.json(
      {
        success: true,
        message: "Signup successful",
      },
      { status: 201 },
    );

    return response;
  } catch (error) {
    console.error("[POST /api/auth/signup]", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
