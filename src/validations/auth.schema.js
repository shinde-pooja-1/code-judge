import { z } from "zod";

// Signup
export const signupSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().toLowerCase().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Login
export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
