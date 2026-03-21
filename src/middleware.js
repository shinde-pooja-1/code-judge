import { NextResponse } from "next/server";

const public_routes = ["/", "/login/", "/signup/"];

export function middleware(request) {
  const token = request.cookies.get("token");
  const path = request.nextUrl.pathname;

  const isPublicRoute = public_routes.some((route) => {
    if (route === "/" && path === "/") return true;
    return path.startsWith(route);
  });
  // console.log("token", token, "isPublic", isPublicRoute, "path", path);

  if (!token && !isPublicRoute) {
    // console.log("Middleware running not public");

    return NextResponse.redirect(new URL("/signup", request.url));
  } else if (token && (path === "/login/" || path === "/signup/")) {
    // console.log("Middleware running  public");

    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

// export const config = {
//   matcher: ["/login"],
// };
