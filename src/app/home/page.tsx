import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  if (!user.publicMetadata?.onboardingCompleted) {
    redirect('/onboarding')
  }

  return <>{children}</>
}
