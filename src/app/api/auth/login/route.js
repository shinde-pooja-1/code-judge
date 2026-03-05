import { NextResponse } from "next/server"
import { loginUser } from "@/services/auth.service"
import { loginSchema } from "@/validations/auth.schema"

// POST /api/auth/login
export async function POST(request) {
    try {
        const body = await request.json()

        // 1. Validate incoming data
        const parsed = loginSchema.safeParse(body)
        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.flatten().fieldErrors },
                { status: 400 }
            )
        }

        // 2. Delegate to the service layer (returns token + user)
        const { token, user } = await loginUser(parsed.data)

        return NextResponse.json(
            { message: "Login successful", token, user },
            { status: 200 }
        )
    } catch (error) {
        console.error("[POST /api/auth/login]", error)

        if (error.message === "INVALID_CREDENTIALS") {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
        }

        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
