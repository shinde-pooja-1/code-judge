/**
 * lib/jwt.js
 *
 * Thin wrappers around the `jsonwebtoken` library.
 * Import these helpers everywhere instead of calling jwt directly.
 *
 * Usage:
 *   import { signToken, verifyToken } from "@/lib/jwt"
 *
 *   const token = signToken({ id: user._id, role: user.role })
 *   const payload = verifyToken(token)
 */

import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d"

if (!JWT_SECRET) {
    throw new Error("Please define JWT_SECRET in your .env.local file")
}

// Sign a new token with the given payload
export function signToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

// Verify a token — throws if invalid or expired
export function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET)
}
