import mongoose from "mongoose"
import bcrypt from "bcryptjs"

// ---------------------------------------------------------------------------
// Schema definition
// ---------------------------------------------------------------------------
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
            select: false, // never returned in queries by default
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
    },
    { timestamps: true } // adds createdAt and updatedAt automatically
)

// ---------------------------------------------------------------------------
// Middleware — hash password before saving
// ---------------------------------------------------------------------------
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// ---------------------------------------------------------------------------
// Instance methods
// ---------------------------------------------------------------------------
UserSchema.methods.comparePassword = function (plainPassword) {
    return bcrypt.compare(plainPassword, this.password)
}

// ---------------------------------------------------------------------------
// Prevent model recompilation in Next.js hot-reload
// ---------------------------------------------------------------------------
const User = mongoose.models.User || mongoose.model("User", UserSchema)

export default User
