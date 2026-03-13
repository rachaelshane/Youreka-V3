import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background-gray flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-h2-mobile md:text-h2 text-text-primary">
            Create your account
          </h1>
          <p className="mt-2 text-body-mobile md:text-body text-text-secondary">
            Start your personalized skincare journey today
          </p>
        </div>
        <div className="flex justify-center">
          <SignUp
            afterSignUpUrl="/home"
            appearance={{
              elements: {
                formButtonPrimary:
                  'bg-primary hover:bg-primary-dark text-white',
                card: 'shadow-card',
                headerTitle: 'text-text-primary',
                headerSubtitle: 'text-text-secondary',
                socialButtonsBlockButton:
                  'border-divider hover:bg-background-gray',
                formFieldInput:
                  'border-divider focus:border-primary focus:ring-primary',
                footerActionLink: 'text-primary hover:text-primary-dark',
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}
