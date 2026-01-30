'use client'

import { useUser } from '@clerk/nextjs'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Camera, Droplets, Sun, Moon, Sparkles, TrendingUp, ShoppingBag, ChevronRight, Check, Clock } from 'lucide-react'

const MORNING_ROUTINE = [
  { id: 1, step: 'Cleanser', product: 'CeraVe Foaming Cleanser', done: true },
  { id: 2, step: 'Toner', product: 'Paula\'s Choice BHA', done: true },
  { id: 3, step: 'Moisturizer', product: 'Neutrogena Hydro Boost', done: false },
  { id: 4, step: 'Sunscreen', product: 'La Roche-Posay SPF 50', done: false },
]

const EVENING_ROUTINE = [
  { id: 1, step: 'Oil Cleanser', product: 'DHC Deep Cleansing Oil', done: false },
  { id: 2, step: 'Cleanser', product: 'CeraVe Foaming Cleanser', done: false },
  { id: 3, step: 'Treatment', product: 'The Ordinary Niacinamide', done: false },
  { id: 4, step: 'Moisturizer', product: 'CeraVe PM Moisturizer', done: false },
]

const RECOMMENDED_PRODUCTS = [
  {
    id: 1,
    name: 'CeraVe Foaming Cleanser',
    category: 'Cleanser',
    price: '$15.99',
    match: 98,
    image: '🧴',
  },
  {
    id: 2,
    name: 'The Ordinary Niacinamide 10%',
    category: 'Serum',
    price: '$6.50',
    match: 95,
    image: '💧',
  },
  {
    id: 3,
    name: 'La Roche-Posay SPF 50',
    category: 'Sunscreen',
    price: '$19.99',
    match: 92,
    image: '☀️',
  },
]

const SKIN_CONCERNS = [
  { name: 'Oily T-Zone', level: 'Moderate', color: 'bg-accent-yellow' },
  { name: 'Acne', level: 'Mild', color: 'bg-accent-pink' },
  { name: 'Dark Spots', level: 'Low', color: 'bg-accent-lavender' },
]

const WEEKLY_PROGRESS = [
  { day: 'Mon', score: 72 },
  { day: 'Tue', score: 75 },
  { day: 'Wed', score: 74 },
  { day: 'Thu', score: 78 },
  { day: 'Fri', score: 80 },
  { day: 'Sat', score: 82 },
  { day: 'Sun', score: 85 },
]

export default function DashboardPage() {
  const { user, isLoaded } = useUser()

  const firstName = user?.firstName || 'there'
  const currentHour = new Date().getHours()
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <main className="min-h-screen pt-24 pb-12 bg-background-gray">
      <Container>
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-h1-mobile md:text-h1 text-text-primary mb-2">
            {greeting}, {firstName}! 👋
          </h1>
          <p className="text-body-mobile md:text-body text-text-secondary">
            Your skin is looking great today. Keep up the routine!
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-primary text-white cursor-pointer group" hover>
            <div className="flex items-center justify-between">
              <div>
                <Camera className="w-8 h-8 mb-3" />
                <h3 className="text-lg font-semibold mb-1">Take Skin Scan</h3>
                <p className="text-sm text-white/80">Get AI analysis</p>
              </div>
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>

          <Card className="cursor-pointer group" hover>
            <div className="flex items-center justify-between">
              <div>
                <ShoppingBag className="w-8 h-8 mb-3 text-primary" />
                <h3 className="text-lg font-semibold text-text-primary mb-1">Shop Products</h3>
                <p className="text-sm text-text-secondary">3 new matches</p>
              </div>
              <ChevronRight className="w-6 h-6 text-text-secondary group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>

          <Card className="cursor-pointer group" hover>
            <div className="flex items-center justify-between">
              <div>
                <TrendingUp className="w-8 h-8 mb-3 text-primary" />
                <h3 className="text-lg font-semibold text-text-primary mb-1">View Progress</h3>
                <p className="text-sm text-text-secondary">+13% this week</p>
              </div>
              <ChevronRight className="w-6 h-6 text-text-secondary group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skin Profile */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text-primary">Your Skin Profile</h2>
                <span className="text-sm text-text-secondary">Last scan: 2 days ago</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <Droplets className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Skin Type</p>
                      <p className="text-xl font-semibold text-text-primary">Combination</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-text-secondary">Hydration</span>
                        <span className="text-text-primary font-medium">68%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-accent-blue rounded-full" style={{ width: '68%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-text-secondary">Oil Control</span>
                        <span className="text-text-primary font-medium">45%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-accent-yellow rounded-full" style={{ width: '45%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-text-secondary">Skin Health</span>
                        <span className="text-text-primary font-medium">85%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '85%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-text-secondary mb-3">Current Concerns</p>
                  <div className="space-y-2">
                    {SKIN_CONCERNS.map((concern) => (
                      <div key={concern.name} className="flex items-center justify-between p-3 bg-background-gray rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${concern.color}`} />
                          <span className="text-text-primary">{concern.name}</span>
                        </div>
                        <span className="text-sm text-text-secondary">{concern.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Weekly Progress */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text-primary">Weekly Progress</h2>
                <span className="text-sm text-primary font-medium">+13% improvement</span>
              </div>

              <div className="flex items-end justify-between gap-2 h-32">
                {WEEKLY_PROGRESS.map((day) => (
                  <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '100px' }}>
                      <div
                        className="absolute bottom-0 w-full bg-primary/80 rounded-t-lg transition-all duration-500"
                        style={{ height: `${day.score}%` }}
                      />
                    </div>
                    <span className="text-xs text-text-secondary">{day.day}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-text-primary">
                  <Sparkles className="w-4 h-4 inline mr-2 text-primary" />
                  Your skin health score increased from 72 to 85 this week. Great job staying consistent!
                </p>
              </div>
            </Card>

            {/* Product Recommendations */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text-primary">Recommended For You</h2>
                <button className="text-sm text-primary font-medium hover:underline">View all</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {RECOMMENDED_PRODUCTS.map((product) => (
                  <div key={product.id} className="p-4 bg-background-gray rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="text-4xl mb-3">{product.image}</div>
                    <p className="text-xs text-text-secondary mb-1">{product.category}</p>
                    <p className="font-medium text-text-primary mb-2 line-clamp-2">{product.name}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-semibold">{product.price}</span>
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                        {product.match}% match
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Routines */}
          <div className="space-y-6">
            {/* Morning Routine */}
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent-yellow/30 flex items-center justify-center">
                  <Sun className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">Morning Routine</h3>
                  <p className="text-xs text-text-secondary">2 of 4 completed</p>
                </div>
              </div>

              <div className="space-y-3">
                {MORNING_ROUTINE.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer ${
                      item.done ? 'bg-primary/10' : 'bg-background-gray hover:bg-gray-100'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      item.done ? 'bg-primary border-primary' : 'border-gray-300'
                    }`}>
                      {item.done && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${item.done ? 'text-text-secondary line-through' : 'text-text-primary'}`}>
                        {item.step}
                      </p>
                      <p className="text-xs text-text-secondary truncate">{item.product}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Evening Routine */}
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent-lavender/50 flex items-center justify-center">
                  <Moon className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">Evening Routine</h3>
                  <p className="text-xs text-text-secondary">0 of 4 completed</p>
                </div>
              </div>

              <div className="space-y-3">
                {EVENING_ROUTINE.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer ${
                      item.done ? 'bg-primary/10' : 'bg-background-gray hover:bg-gray-100'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      item.done ? 'bg-primary border-primary' : 'border-gray-300'
                    }`}>
                      {item.done && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${item.done ? 'text-text-secondary line-through' : 'text-text-primary'}`}>
                        {item.step}
                      </p>
                      <p className="text-xs text-text-secondary truncate">{item.product}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Daily Tip */}
            <Card className="bg-gradient-to-br from-accent-pink/30 to-accent-lavender/30">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-text-primary">Daily Tip</h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                Don't forget to apply sunscreen even on cloudy days! UV rays can penetrate clouds and still damage your skin. ☀️
              </p>
            </Card>

            {/* Streak Card */}
            <Card className="text-center">
              <div className="text-4xl mb-2">🔥</div>
              <p className="text-3xl font-bold text-text-primary mb-1">7 Days</p>
              <p className="text-sm text-text-secondary">Current Streak</p>
              <p className="text-xs text-primary mt-2">Keep it up!</p>
            </Card>
          </div>
        </div>
      </Container>
    </main>
  )
}
