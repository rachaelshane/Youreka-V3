import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)'])

export default clerkMiddleware((auth, req) => {
  const { userId, sessionClaims } = auth()
  const path = req.nextUrl.pathname

  // Redirect unauthenticated users to sign-in for protected routes
  if (!isPublicRoute(req) && !userId) {
    const signInUrl = new URL('/sign-in', req.url)
    signInUrl.searchParams.set('redirect_url', req.url)
    return NextResponse.redirect(signInUrl)
  }

  // Redirect authenticated users to onboarding if not completed
  if (userId && !path.startsWith('/onboarding')) {
    const unsafeMetadata = sessionClaims?.unsafeMetadata as { onboardingCompleted?: boolean } | undefined
    const onboardingCompleted = unsafeMetadata?.onboardingCompleted

    if (!onboardingCompleted) {
      return NextResponse.redirect(new URL('/onboarding', req.url))
    }
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
