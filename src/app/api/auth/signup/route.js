import { NextResponse } from "next/server"
import { signupUser } from "@/services/auth.service"
import { signupSchema } from "@/validations/auth.schema"

// POST /api/auth/signup
export async function POST(request) {
    try {
        const body = await request.json()

        // 1. Validate incoming data
        const parsed = signupSchema.safeParse(body)
        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.flatten().fieldErrors },
                { status: 400 }
            )
        }

        // 2. Delegate to the service layer
        const user = await signupUser(parsed.data)

        return NextResponse.json(
            { message: "Account created successfully", userId: user._id },
            { status: 201 }
        )
    } catch (error) {
        console.error("[POST /api/auth/signup]", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
