import {NextResponse, type NextRequest } from "next/server"
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  // Check if accessing admin dashboard
  return await updateSession(request)
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
}
