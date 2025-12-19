'use client'

import React, { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { FadeIn } from '@/components/animations/FadeIn'
import { ArrowRight, Sparkles } from 'lucide-react'

interface QuizOption {
  id: string
  text: string
  emoji: string
  skinType: 'oily' | 'dry' | 'combination' | 'sensitive'
}

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "How does your skin feel by midday?",
    options: [
      { id: 'a', text: "Super oily, especially on my forehead and nose", emoji: "💧", skinType: 'oily' as const },
      { id: 'b', text: "Tight and a bit flaky", emoji: "🏜️", skinType: 'dry' as const },
      { id: 'c', text: "Oily T-zone but dry on cheeks", emoji: "🎭", skinType: 'combination' as const },
      { id: 'd', text: "Red or irritated easily", emoji: "🔴", skinType: 'sensitive' as const },
    ]
  },
  {
    id: 2,
    question: "What's your biggest skin concern?",
    options: [
      { id: 'a', text: "Acne and large pores", emoji: "🎯", skinType: 'oily' as const },
      { id: 'b', text: "Dry patches and dullness", emoji: "😞", skinType: 'dry' as const },
      { id: 'c', text: "Uneven texture and some breakouts", emoji: "🤔", skinType: 'combination' as const },
      { id: 'd', text: "Redness and reactions to products", emoji: "😣", skinType: 'sensitive' as const },
    ]
  },
  {
    id: 3,
    question: "How does your skin react to new products?",
    options: [
      { id: 'a', text: "Sometimes breaks out, especially with heavy creams", emoji: "😤", skinType: 'oily' as const },
      { id: 'b', text: "Soaks them right up, always needs more moisture", emoji: "🧽", skinType: 'dry' as const },
      { id: 'c', text: "Depends on the area - forehead vs cheeks react differently", emoji: "🤷", skinType: 'combination' as const },
      { id: 'd', text: "Gets irritated or red easily", emoji: "⚠️", skinType: 'sensitive' as const },
    ]
  }
]

const SKIN_TYPE_RESULTS = {
  oily: {
    title: "Oily Skin",
    description: "Your skin produces excess sebum, which can lead to shine and breakouts.",
    tips: [
      "Use oil-free, non-comedogenic products",
      "Try a gentle foaming cleanser",
      "Don't skip moisturizer - use a lightweight gel",
      "Look for salicylic acid to control oil"
    ],
    products: ["CeraVe Foaming Cleanser", "Neutrogena Oil-Free Moisturizer", "The Ordinary Niacinamide"],
    emoji: "💧"
  },
  dry: {
    title: "Dry Skin",
    description: "Your skin needs extra hydration and can feel tight or flaky.",
    tips: [
      "Use a creamy, hydrating cleanser",
      "Layer on the moisture with hyaluronic acid",
      "Never skip sunscreen - look for moisturizing formulas",
      "Avoid harsh, drying ingredients"
    ],
    products: ["CeraVe Hydrating Cleanser", "Cetaphil Daily Hydrating Lotion", "The Ordinary Hyaluronic Acid"],
    emoji: "🏜️"
  },
  combination: {
    title: "Combination Skin",
    description: "You have both oily and dry areas - usually oily T-zone and dry cheeks.",
    tips: [
      "Use balanced, gentle products",
      "Consider different products for different areas",
      "Gel moisturizers work great",
      "Blotting papers are your friend"
    ],
    products: ["CeraVe Foaming Cleanser", "Neutrogena Hydro Boost Gel", "Paula's Choice BHA Exfoliant"],
    emoji: "🎭"
  },
  sensitive: {
    title: "Sensitive Skin",
    description: "Your skin is easily irritated and needs gentle, fragrance-free products.",
    tips: [
      "Patch test everything before using",
      "Avoid fragrance and harsh ingredients",
      "Look for 'hypoallergenic' and 'for sensitive skin' labels",
      "Keep your routine simple - less is more"
    ],
    products: ["Vanicream Gentle Cleanser", "La Roche-Posay Toleriane", "Aveeno Calm + Restore"],
    emoji: "🔴"
  }
}

export const SkinQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)
  const [selectedSkinType, setSelectedSkinType] = useState<keyof typeof SKIN_TYPE_RESULTS | null>(null)

  const handleAnswer = (option: QuizOption) => {
    const newAnswers = [...answers, option.skinType]
    setAnswers(newAnswers)

    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate most common skin type
      const counts = newAnswers.reduce((acc, type) => {
        acc[type] = (acc[type] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      const mostCommon = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as keyof typeof SKIN_TYPE_RESULTS
      setSelectedSkinType(mostCommon)
      setShowResults(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
    setSelectedSkinType(null)
  }

  const result = selectedSkinType ? SKIN_TYPE_RESULTS[selectedSkinType] : null

  return (
    <section id="quiz" className="py-20 bg-gradient-to-br from-primary/5 via-white to-accent-blue/5">
      <Container>
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-h2-mobile md:text-h2 text-text-primary mb-4">
              Not Sure Your Skin Type?
            </h2>
            <p className="text-body-mobile md:text-body text-text-secondary max-w-2xl mx-auto">
              Take this quick 3-question quiz to find out
            </p>
          </div>
        </FadeIn>

        <div className="max-w-3xl mx-auto">
          {!showResults ? (
            <FadeIn key={currentQuestion}>
              <Card className="p-8">
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-text-secondary mb-2">
                    <span>Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}</span>
                    <span>{Math.round(((currentQuestion) / QUIZ_QUESTIONS.length) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent-blue rounded-full transition-all duration-500"
                      style={{ width: `${((currentQuestion) / QUIZ_QUESTIONS.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Question */}
                <h3 className="text-2xl font-bold text-text-primary mb-8 text-center">
                  {QUIZ_QUESTIONS[currentQuestion].question}
                </h3>

                {/* Options */}
                <div className="space-y-4">
                  {QUIZ_QUESTIONS[currentQuestion].options.map((option, index) => (
                    <FadeIn key={option.id} delay={index * 0.1}>
                      <button
                        onClick={() => handleAnswer(option)}
                        className="w-full p-6 text-left bg-white border-2 border-gray-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="text-4xl flex-shrink-0">{option.emoji}</div>
                          <p className="text-text-primary font-medium group-hover:text-primary transition-colors">
                            {option.text}
                          </p>
                        </div>
                      </button>
                    </FadeIn>
                  ))}
                </div>
              </Card>
            </FadeIn>
          ) : result ? (
            <FadeIn>
              <Card className="p-8">
                <div className="text-center mb-8">
                  <div className="text-7xl mb-4">{result.emoji}</div>
                  <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
                    <Sparkles size={16} className="mr-2" />
                    Your Results Are In!
                  </div>
                  <h3 className="text-3xl font-bold text-text-primary mb-2">
                    {result.title}
                  </h3>
                  <p className="text-lg text-text-secondary max-w-xl mx-auto">
                    {result.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Tips */}
                  <div className="bg-primary/5 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
                      <span className="text-2xl mr-2">💡</span>
                      Tips for You
                    </h4>
                    <ul className="space-y-2">
                      {result.tips.map((tip, index) => (
                        <li key={index} className="flex items-start text-sm text-text-secondary">
                          <span className="text-primary mr-2 flex-shrink-0">✓</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Products */}
                  <div className="bg-accent-blue/5 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
                      <span className="text-2xl mr-2">🛍️</span>
                      Recommended Products
                    </h4>
                    <ul className="space-y-3">
                      {result.products.map((product, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <span className="text-accent-yellow mr-2">⭐</span>
                          <span className="text-text-primary font-medium">{product}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="secondary" size="lg" onClick={resetQuiz}>
                    Retake Quiz
                  </Button>
                </div>
                <p className="text-center text-sm text-text-secondary mt-4">
                  Sign up to get your full personalized skincare routine and product recommendations
                </p>
              </Card>
            </FadeIn>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
