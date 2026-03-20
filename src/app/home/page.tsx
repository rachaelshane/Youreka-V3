'use client'

import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Camera, BarChart2, TrendingUp, ShoppingBag, Lightbulb, Settings } from 'lucide-react'

const features = [
  {
    icon: Camera,
    title: 'Take Your First Scan',
    description: 'Start your beauty journey with an AI-powered face scan',
    color: 'text-violet-500',
    bg: 'bg-violet-50',
  },
  {
    icon: BarChart2,
    title: 'View Your Profile',
    description: 'Check your personalized beauty recommendations',
    color: 'text-sky-500',
    bg: 'bg-sky-50',
  },
  {
    icon: TrendingUp,
    title: 'Track Progress',
    description: 'Monitor your skin health improvements over time',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
  },
  {
    icon: ShoppingBag,
    title: 'Product Matches',
    description: 'Discover products perfect for your skin type',
    color: 'text-rose-500',
    bg: 'bg-rose-50',
  },
  {
    icon: Lightbulb,
    title: 'Beauty Tips',
    description: 'Get personalized advice for glowing skin',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
  },
  {
    icon: Settings,
    title: 'Settings',
    description: 'Customize your experience and preferences',
    color: 'text-slate-500',
    bg: 'bg-slate-50',
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen pt-24 pb-12 bg-background-gray">
      <Container>
        <div className="mb-10 text-center">
          <h1 className="text-h1-mobile md:text-h1 text-text-primary mb-4">
            Your Skincare Dashboard
          </h1>
          <p className="text-body-mobile md:text-body text-text-secondary mb-6">
            Track your skin journey and discover personalized product recommendations
          </p>
          <p className="text-sm text-text-secondary">
            (Authentication coming soon - for now, explore our{' '}
            <a href="/" className="text-primary hover:underline">landing page</a>)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description, color, bg }) => (
            <Card key={title} hover>
              <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${bg} mb-4`}>
                <Icon size={22} className={color} strokeWidth={1.75} />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">{title}</h3>
              <p className="text-text-secondary">{description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </main>
  )
}
