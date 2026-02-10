import { authMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export default authMiddleware({
  publicRoutes: ['/', '/sign-in(.*)', '/sign-up(.*)'],
  afterAuth(auth, req) {
    // If user is signed in and trying to access protected routes
    if (auth.userId) {
      const path = req.nextUrl.pathname

      // Skip onboarding check for onboarding page itself and public routes
      if (path.startsWith('/onboarding') || path.startsWith('/sign-') || path === '/') {
        return NextResponse.next()
      }

      // Check if user has completed onboarding
      const unsafeMetadata = auth.sessionClaims?.unsafeMetadata as { onboardingCompleted?: boolean } | undefined
      const onboardingCompleted = unsafeMetadata?.onboardingCompleted

      // Redirect to onboarding if not completed
      if (!onboardingCompleted && !path.startsWith('/onboarding')) {
        const onboardingUrl = new URL('/onboarding', req.url)
        return NextResponse.redirect(onboardingUrl)
      }
    }

    return NextResponse.next()
  },
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
