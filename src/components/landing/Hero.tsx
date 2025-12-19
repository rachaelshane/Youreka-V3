'use client'

import React from 'react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { FadeIn } from '@/components/animations/FadeIn'
import { APP_TAGLINE, APP_DESCRIPTION } from '@/lib/constants'
import { ArrowRight, Zap } from 'lucide-react'

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-primary/5 via-white to-primary/10 pt-16">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
          {/* Left Content */}
          <div className="space-y-8">
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary/10 to-accent-blue/10 rounded-full text-primary text-sm font-medium border border-primary/20">
                <Zap size={16} className="mr-2" />
                Join 500K+ Teens Getting Clear Skin
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-h1-mobile md:text-h1 text-text-primary leading-tight">
                {APP_TAGLINE}
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed">
                {APP_DESCRIPTION}
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" href="#quiz" className="group shadow-lg hover:shadow-xl transition-shadow">
                  Find My Skin Type Free
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
                <Button variant="secondary" size="lg" href="#features" className="border-2">
                  See How It Works
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center text-sm text-text-secondary">
                  <div className="w-8 h-8 bg-accent-blue/20 rounded-full flex items-center justify-center mr-2">
                    ✓
                  </div>
                  100% Free Forever
                </div>
                <div className="flex items-center text-sm text-text-secondary">
                  <div className="w-8 h-8 bg-accent-yellow/20 rounded-full flex items-center justify-center mr-2">
                    ✓
                  </div>
                  No Signup Required
                </div>
                <div className="flex items-center text-sm text-text-secondary">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mr-2">
                    ✓
                  </div>
                  Results in 10 Seconds
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Content - Animated Elements */}
          <FadeIn delay={0.3} direction="left" className="relative">
            <div className="relative">
              {/* Main Phone Mockup Placeholder */}
              <div className="relative z-10 mx-auto w-full max-w-md">
                <div className="bg-white rounded-3xl shadow-2xl p-6 border-8 border-gray-800">
                  {/* Phone Screen Content */}
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-text-secondary">Your Skin Type</p>
                        <h3 className="text-lg font-semibold text-text-primary">Combination • Acne-Prone</h3>
                      </div>
                      <div className="bg-accent-blue/20 px-3 py-1 rounded-full">
                        <span className="text-sm font-bold">✨ 98%</span>
                      </div>
                    </div>

                    {/* Concerns Cards */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-primary/10 rounded-lg p-4">
                        <div className="text-2xl mb-2">🎯</div>
                        <p className="text-sm font-bold text-text-primary">Active Acne</p>
                        <p className="text-xs text-text-secondary">T-Zone Area</p>
                      </div>
                      <div className="bg-accent-yellow/10 rounded-lg p-4">
                        <div className="text-2xl mb-2">💧</div>
                        <p className="text-sm font-bold text-text-primary">Dry Cheeks</p>
                        <p className="text-xs text-text-secondary">Needs Hydration</p>
                      </div>
                    </div>

                    {/* Product Recommendation */}
                    <div className="bg-white border-2 border-primary/20 rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-primary">TOP MATCH FOR YOU</span>
                        <span className="text-xs text-accent-yellow">⭐ 4.8</span>
                      </div>
                      <p className="text-sm font-bold text-text-primary">CeraVe Foaming Cleanser</p>
                      <p className="text-xs text-text-secondary">Perfect for oily/combo skin • $12.99</p>
                    </div>

                    {/* Quick Action */}
                    <div className="bg-gradient-to-r from-primary to-accent-blue rounded-lg p-4 text-white">
                      <p className="text-sm font-semibold mb-1">Start Your Routine</p>
                      <p className="text-xs opacity-90">3 simple steps, morning & night</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 bg-accent-blue text-white px-4 py-2 rounded-lg shadow-lg animate-float">
                <p className="text-sm font-semibold">✨ Skin Analyzed</p>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-accent-yellow text-text-primary px-4 py-2 rounded-lg shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                <p className="text-sm font-semibold">💰 Budget Picks!</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>

      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/30 rounded-full blur-3xl opacity-20"></div>
    </section>
  )
}


