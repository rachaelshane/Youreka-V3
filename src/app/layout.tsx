import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'Youreka - Find Your Perfect Skincare Match',
  description: 'No more guessing what works for your skin. Our AI helps teens discover the right products for acne, oily skin, dryness, and everything in between. Get personalized recommendations that actually work.',
  keywords: ['teen skincare', 'acne treatment', 'skincare for teens', 'skin type quiz', 'affordable skincare', 'budget skincare', 'skincare routine'],
  authors: [{ name: 'Youreka Team' }],
  openGraph: {
    title: 'Youreka - Find Your Perfect Skincare Match',
    description: 'Help teens discover the right products for their skin type. Free quiz and personalized recommendations.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
        </head>
        <body style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}
