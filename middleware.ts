import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if accessing admin dashboard
  if (request.nextUrl.pathname.startsWith("/admin/dashboard")) {
    // In a real app, check for auth token in cookies
    // For now, redirect to login if not authenticated
    const isAuthenticated = request.cookies.get("admin_session")

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
}
