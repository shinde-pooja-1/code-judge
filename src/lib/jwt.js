import { JWT_EXPIRES_IN, JWT_SECRET } from "@/constants/global.const";
import jwt from "jsonwebtoken";

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}
