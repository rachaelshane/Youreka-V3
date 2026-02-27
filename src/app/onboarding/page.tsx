'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: {
    value: string;
    label: string;
    emoji: string;
  }[];
}

const questions: Question[] = [
  {
    id: 'skinType',
    question: 'How does your skin feel by midday?',
    options: [
      { value: 'oily', label: 'Oily all over', emoji: '💧' },
      { value: 'dry', label: 'Tight and dry', emoji: '🏜️' },
      { value: 'combination', label: 'Oily T-zone, dry cheeks', emoji: '🎭' },
      { value: 'normal', label: 'Balanced and comfortable', emoji: '😊' },
    ],
  },
  {
    id: 'skinConcern',
    question: "What's your main skin concern?",
    options: [
      { value: 'acne', label: 'Acne & breakouts', emoji: '🔴' },
      { value: 'aging', label: 'Fine lines & wrinkles', emoji: '⏰' },
      { value: 'dryness', label: 'Dryness & dehydration', emoji: '💦' },
      { value: 'sensitivity', label: 'Redness & sensitivity', emoji: '🌸' },
      { value: 'hyperpigmentation', label: 'Dark spots & uneven tone', emoji: '🎨' },
      { value: 'pores', label: 'Large pores', emoji: '👁️' },
    ],
  },
  {
    id: 'skinGoal',
    question: 'What do you want to achieve with your skincare?',
    options: [
      { value: 'clear', label: 'Clear, blemish-free skin', emoji: '✨' },
      { value: 'hydrated', label: 'Hydrated, plump skin', emoji: '💧' },
      { value: 'bright', label: 'Bright, even-toned skin', emoji: '🌟' },
      { value: 'youthful', label: 'Youthful, firm skin', emoji: '🌺' },
      { value: 'calm', label: 'Calm, balanced skin', emoji: '🕊️' },
    ],
  },
  {
    id: 'experience',
    question: 'How experienced are you with skincare?',
    options: [
      { value: 'beginner', label: 'Just starting out', emoji: '🌱' },
      { value: 'intermediate', label: 'I have a basic routine', emoji: '🌿' },
      { value: 'advanced', label: 'I know my ingredients', emoji: '🌳' },
    ],
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;
  const isLastStep = currentStep === questions.length - 1;

  // Show loading state while user data is loading
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="h-12 w-12 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  const handleOptionSelect = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const handleNext = () => {
    if (answers[currentQuestion.id]) {
      if (isLastStep) {
        handleSubmit();
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Save onboarding data server-side via publicMetadata (reliable for server checks)
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skinProfile: answers }),
      });

      if (!res.ok) throw new Error('Failed to save onboarding data');

      // Hard navigation so the server-side layout re-runs with fresh user data
      window.location.href = '/home';
    } catch (error) {
      console.error('Error saving onboarding data:', error);
      setIsSubmitting(false);
    }
  };

  const selectedAnswer = answers[currentQuestion.id];

  return (
    <div className="min-h-screen bg-background">
      <Container className="py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-text-primary">Welcome to Youreka!</h1>
          <p className="text-text-secondary">Let's personalize your skincare journey</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm text-text-secondary">
            <span>Question {currentStep + 1} of {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="mx-auto max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="rounded-lg bg-white p-8 shadow-sm"
            >
              <h2 className="mb-6 text-2xl font-semibold text-text-primary">
                {currentQuestion.question}
              </h2>

              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleOptionSelect(option.value)}
                    className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                      selectedAnswer === option.value
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.emoji}</span>
                      <span className="font-medium text-text-primary">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>

            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!selectedAnswer || isSubmitting}
              className="flex items-center gap-2"
            >
              {isSubmitting ? (
                'Saving...'
              ) : isLastStep ? (
                <>
                  Complete
                  <Sparkles className="h-4 w-4" />
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
