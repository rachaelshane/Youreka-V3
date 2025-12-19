'use client'

import React from 'react'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/animations/FadeIn'
import { FEATURES } from '@/lib/constants'

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <Container>
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-h2-mobile md:text-h2 text-text-primary mb-4">
              Everything You Need for Clear, Healthy Skin
            </h2>
            <p className="text-body-mobile md:text-body text-text-secondary max-w-2xl mx-auto">
              No more guessing - get personalized recommendations that work for YOUR skin
            </p>
          </div>
        </FadeIn>

        <div className="space-y-24">
          {FEATURES.map((feature, index) => (
            <FadeIn key={feature.id} delay={index * 0.1}>
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="inline-block text-6xl mb-4">{feature.icon}</div>
                  <h3 className="text-h3-mobile md:text-h3 text-text-primary">
                    {feature.title}
                  </h3>
                  <p className="text-xl text-text-primary font-medium">
                    {feature.description}
                  </p>
                  <p className="text-body-mobile md:text-body text-text-secondary">
                    {feature.subtitle}
                  </p>

                  {/* Feature-specific highlights */}
                  {feature.id === 1 && (
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span className="text-text-secondary">Know if you're oily, dry, combo, or sensitive</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span className="text-text-secondary">Identify acne-prone areas and dry patches</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span className="text-text-secondary">Results in under 10 seconds, completely free</span>
                      </li>
                    </ul>
                  )}

                  {feature.id === 2 && (
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span className="text-text-secondary">Products reviewed by other teens</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span className="text-text-secondary">Real results from people with your skin type</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span className="text-text-secondary">Specific solutions for acne, texture, and more</span>
                      </li>
                    </ul>
                  )}

                  {feature.id === 3 && (
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span className="text-text-secondary">Drugstore gems that work as well as $$$</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span className="text-text-secondary">Filter by your budget - under $15, $30, etc.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span className="text-text-secondary">No more wasting money on products that don't work</span>
                      </li>
                    </ul>
                  )}

                  {feature.id === 4 && (
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span className="text-text-secondary">Simple AM & PM routines (3-5 steps max)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span className="text-text-secondary">Learn what each product does and why</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span className="text-text-secondary">No complicated routines or confusing jargon</span>
                      </li>
                    </ul>
                  )}
                </div>

                {/* Visual Mockup */}
                <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="bg-background-gray rounded-2xl p-8 shadow-xl">
                    {/* Feature-specific mockup */}
                    {feature.id === 1 && (
                      <div className="space-y-4">
                        <div className="bg-white rounded-lg p-4 border-l-4 border-primary">
                          <p className="text-sm font-semibold text-text-primary mb-2">Your Skin Type: Combination</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-text-secondary">Scan completed in 8 sec</span>
                            <span className="text-primary text-sm font-semibold">✨ 98% Confident</span>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-text-primary">🎯 Active Acne</span>
                            <span className="text-xs text-accent-yellow">T-Zone</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-text-primary">💧 Dry Patches</span>
                            <span className="text-xs text-accent-blue">Cheeks</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {feature.id === 2 && (
                      <div className="space-y-4">
                        <div className="bg-white rounded-lg p-4">
                          <p className="text-sm text-text-secondary mb-1">For Combination + Acne-Prone</p>
                          <p className="text-2xl font-bold text-primary mb-2">Recommended</p>
                        </div>
                        <div className="space-y-3">
                          <div className="bg-white rounded-lg p-4 border-l-4 border-primary">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-sm font-semibold text-text-primary">CeraVe Foaming Cleanser</p>
                              <span className="text-accent-yellow text-sm">⭐ 4.7</span>
                            </div>
                            <p className="text-xs text-text-secondary mb-2">Perfect for oily T-zone</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-primary font-semibold">$12.99</span>
                              <span className="text-xs text-accent-blue">467 teens verified</span>
                            </div>
                          </div>
                          <div className="bg-white rounded-lg p-4 border-l-4 border-accent-blue">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-sm font-semibold text-text-primary">Neutrogena Hydro Boost</p>
                              <span className="text-accent-yellow text-sm">⭐ 4.6</span>
                            </div>
                            <p className="text-xs text-text-secondary mb-2">Hydrates dry cheeks</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-primary font-semibold">$18.99</span>
                              <span className="text-xs text-accent-blue">892 teens verified</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {feature.id === 3 && (
                      <div className="space-y-3">
                        <div className="bg-white rounded-lg p-4">
                          <p className="text-xs text-text-secondary mb-2">Budget Filter</p>
                          <div className="space-y-2">
                            <button className="w-full text-left px-3 py-2 bg-primary/10 rounded-lg">
                              <p className="text-sm font-semibold text-primary">💰 Under $15</p>
                            </button>
                            <button className="w-full text-left px-3 py-2 bg-gray-100 rounded-lg">
                              <p className="text-sm text-text-secondary">$15 - $30</p>
                            </button>
                            <button className="w-full text-left px-3 py-2 bg-gray-100 rounded-lg">
                              <p className="text-sm text-text-secondary">$30+</p>
                            </button>
                          </div>
                        </div>
                        <div className="bg-accent-blue/10 rounded-lg p-3">
                          <p className="text-xs font-semibold text-accent-blue mb-2">💡 Pro Tip</p>
                          <p className="text-xs text-text-primary">The Ordinary has great dupes for expensive serums!</p>
                        </div>
                      </div>
                    )}

                    {feature.id === 4 && (
                      <div className="space-y-3">
                        <div className="bg-white rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-sm font-semibold text-text-primary">Morning Routine</p>
                            <span className="text-xs text-primary">☀️ AM</span>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">1</div>
                              <div>
                                <p className="text-sm font-medium text-text-primary">Cleanser</p>
                                <p className="text-xs text-text-secondary">Removes oil & dirt</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">2</div>
                              <div>
                                <p className="text-sm font-medium text-text-primary">Moisturizer</p>
                                <p className="text-xs text-text-secondary">Hydrates skin</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">3</div>
                              <div>
                                <p className="text-sm font-medium text-text-primary">Sunscreen</p>
                                <p className="text-xs text-text-secondary">Prevents damage</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-accent-yellow/10 rounded-lg p-3">
                          <p className="text-xs font-semibold text-text-primary">⏱️ Takes only 3 minutes!</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  )
}


