import connectDB from "@/lib/mongodb";
import { getCurrentUser, isAdminUser } from "@/lib/auth";
import Problem from "@/models/Problems.model";
import { problemSchema } from "@/validations/problem.schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const problems = await Problem.find({})
      .select("title slug difficulty tags statement")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: problems || [],
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch problems",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    // const user = await getCurrentUser();

    // if (!user || !isAdminUser(user)) {
    //   return NextResponse.json(
    //     {
    //       error: "Only admins can create problems",
    //     },
    //     { status: 403 },
    //   );
    // }

    const body = await request.json();
    const parsed = problemSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    await connectDB();

    const existingProblem = await Problem.findOne({ slug: parsed.data.slug });
    if (existingProblem) {
      return NextResponse.json(
        {
          error: "A problem with this slug already exists",
        },
        { status: 409 },
      );
    }

    const problem = await Problem.create(parsed.data);

    return NextResponse.json(
      {
        success: true,
        message: "Problem created successfully",
        data: problem,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message || "Failed to create problem",
      },
      { status: 500 },
    );
  }
}
