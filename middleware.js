import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
