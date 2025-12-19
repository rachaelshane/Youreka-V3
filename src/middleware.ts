import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware that allows all routes (no authentication)
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
