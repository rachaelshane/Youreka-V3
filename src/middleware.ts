import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)'])

export default clerkMiddleware((auth, req) => {
  const path = req.nextUrl.pathname

  // Protect non-public routes (redirects to sign-in if unauthenticated)
  if (!isPublicRoute(req)) {
    auth.protect()
  }

  const { userId, sessionClaims } = auth()

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
