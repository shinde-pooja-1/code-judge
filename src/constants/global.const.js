export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
export const JWT_SECRET = process.env.JWT_SECRET;
export const MONGODB_URI = process.env.MONGODB_URI;
export const NODE_ENV = process.env.NODE_ENV;
export const ADMIN_EMAILS = process.env.ADMIN_EMAILS || "";
export const API_ROUTES = {
  SIGN_UP_API: "/api/auth/signup",
  LOGIN_API: "/api/auth/login",
  PROBLEMS_API: "/api/problems",
  ADMIN_PROBLEMS_API: "/api/problems",
};
