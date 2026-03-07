import { z } from "zod";

// Signup
export const signupSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().toLowerCase().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Login
export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Enter a valid email address"),

  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required"),
});
