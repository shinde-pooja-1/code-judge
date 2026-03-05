/**
 * lib/mongodb.js
 *
 * Singleton Mongoose connection.
 * Next.js hot-reload creates new module instances, so we cache the
 * connection on the global object to avoid opening multiple connections.
 *
 * Usage:
 *   import connectDB from "@/lib/mongodb"
 *   await connectDB()
 */

import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in your .env.local file")
}

// Cache the connection across hot reloads in development
let cached = global._mongooseCache

if (!cached) {
    cached = global._mongooseCache = { conn: null, promise: null }
}

async function connectDB() {
    if (cached.conn) return cached.conn

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        })
    }

    cached.conn = await cached.promise
    return cached.conn
}

export default connectDB
