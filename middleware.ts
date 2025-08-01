import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Define protected routes
const protectedRoutes = ["/private/auth/dashboard", "/private/auth/create"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only check protected routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = req.cookies.get("accessToken")?.value;

    if (!token) {
      const loginUrl = new URL("/private/auth/login", req.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "supersecret");
      await jwtVerify(token, secret); // will throw if invalid
      return NextResponse.next();
    } catch (err) {
      const loginUrl = new URL("/private/auth/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Apply middleware only to these routes
export const config = {
  matcher: ["/private/auth/:path*"],
};
