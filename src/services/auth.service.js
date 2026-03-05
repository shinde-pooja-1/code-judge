/**
 * auth.service.js
 *
 * Contains all business logic related to authentication.
 * Route handlers should call these functions — never put DB/JWT logic in routes.
 */

import connectDB from "@/lib/mongodb"
import { signToken } from "@/lib/jwt"
import User from "@/models/User.model"

// ---------------------------------------------------------------------------
// Sign up a new user
// ---------------------------------------------------------------------------
export async function signupUser({ name, email, password }) {
    await connectDB()

    const existing = await User.findOne({ email })
    if (existing) {
        throw new Error("EMAIL_ALREADY_IN_USE")
    }

    // Password is hashed automatically by the User model's pre-save hook
    const user = await User.create({ name, email, password })
    return user
}

// ---------------------------------------------------------------------------
// Log in an existing user — returns a JWT token
// ---------------------------------------------------------------------------
export async function loginUser({ email, password }) {
    await connectDB()

    // .select("+password") because password has `select: false` in the schema
    const user = await User.findOne({ email }).select("+password")
    if (!user) throw new Error("INVALID_CREDENTIALS")

    const isMatch = await user.comparePassword(password)
    if (!isMatch) throw new Error("INVALID_CREDENTIALS")

    const token = signToken({ id: user._id, role: user.role })

    // Strip the password before returning the user object
    const safeUser = { _id: user._id, name: user.name, email: user.email, role: user.role }
    return { token, user: safeUser }
}
