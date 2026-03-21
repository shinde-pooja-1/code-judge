import connectDB from "@/lib/mongodb";
import Problem from "@/models/Problems.model";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();

    const problem = await Problem.findById(id);
    if (!problem) {
      return NextResponse.json(
        {
          success: false,
          message: "Problem not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: problem || {},
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch problem",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
