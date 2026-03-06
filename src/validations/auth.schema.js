import { z } from "zod";

// Signup
export const signupSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be under 50 characters"),

  email: z
    .string({ required_error: "Email is required" })
    .email("Enter a valid email address"),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
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
