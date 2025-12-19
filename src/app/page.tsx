import { Hero } from '@/components/landing/Hero'
import { ProblemStatement } from '@/components/landing/ProblemStatement'
import { Features } from '@/components/landing/Features'
import { SkinQuiz } from '@/components/landing/SkinQuiz'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { Stats } from '@/components/landing/Stats'
import { CTASection } from '@/components/landing/CTASection'

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <ProblemStatement />
      <SkinQuiz />
      <Features />
      <HowItWorks />
      <Stats />
      <CTASection />
    </main>
  )
}
