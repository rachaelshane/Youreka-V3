import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { skinProfile } = body

  const client = await clerkClient()
  await client.users.updateUser(userId, {
    publicMetadata: {
      onboardingCompleted: true,
      skinProfile,
      onboardingDate: new Date().toISOString(),
    },
  })

  return NextResponse.json({ success: true })
}
