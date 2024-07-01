import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const user = request.cookies.get("next-auth.session-token");
  const pathname = request.nextUrl.pathname;
  
  if (pathname.includes("api")) {
    return NextResponse.next();
  }
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/profile", "/createEvent"]
};
