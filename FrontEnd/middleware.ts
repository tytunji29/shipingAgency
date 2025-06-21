import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log("hello");
  // IMPORTANT: Since localStorage is client-side only, we cannot access it in middleware
  // Instead, we'll use a different approach for server-side protection

  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define paths that should be protected
  const isProtectedPath =
    path === "/dashboard" || path.startsWith("/dashboard/");

  // For protected paths, we'll render the page but rely on client-side authentication
  // The client component will check localStorage and redirect if needed

  // We could implement a server-side auth check here if needed in the future
  // For example, by checking an auth cookie that's synced with localStorage
  // or by verifying a JWT token in an Authorization header

  return NextResponse.next();
}

// Configure which paths this middleware will run on
export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
