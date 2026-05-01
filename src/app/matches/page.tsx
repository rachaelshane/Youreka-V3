'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Sparkles, ExternalLink, ShoppingBag, RefreshCw, Lock } from 'lucide-react'
import Link from 'next/link'

// ─── Types ────────────────────────────────────────────────────────────────────

interface SkinProfile {
  skinType?: string
  skinConcern?: string
  skinGoal?: string
  experience?: string
}

interface Product {
  name: string
  brand: string
  category: string
  price: string
  skinTypeMatch: string[]
  concernsTargeted: string[]
  isFragranceFree: boolean
  isVegan: boolean
  buyLink: string
  score: number
  reason: string
}

// ─── Inline product catalogue (mirrors seed.ts) ───────────────────────────────

const PRODUCTS = [
  {
    name: 'Foaming Facial Cleanser',
    brand: 'CeraVe',
    category: 'cleanser',
    price: '14.99',
    skinTypeMatch: ['oily', 'combination'],
    concernsTargeted: ['acne', 'pores', 'oily'],
    isFragranceFree: true,
    isVegan: false,
    buyLink: 'https://www.amazon.com/dp/B01N1N5TXO',
  },
  {
    name: 'Hydrating Facial Cleanser',
    brand: 'CeraVe',
    category: 'cleanser',
    price: '14.99',
    skinTypeMatch: ['dry', 'sensitive'],
    concernsTargeted: ['dryness', 'sensitivity'],
    isFragranceFree: true,
    isVegan: false,
    buyLink: 'https://www.amazon.com/dp/B00TTD9BRC',
  },
  {
    name: 'Toleriane Hydrating Gentle Cleanser',
    brand: 'La Roche-Posay',
    category: 'cleanser',
    price: '15.99',
    skinTypeMatch: ['sensitive', 'dry'],
    concernsTargeted: ['sensitivity', 'dryness'],
    isFragranceFree: true,
    isVegan: false,
    buyLink: 'https://www.amazon.com/dp/B01MXMNO42',
  },
  {
    name: 'Oil-Free Acne Wash',
    brand: 'Neutrogena',
    category: 'cleanser',
    price: '8.99',
    skinTypeMatch: ['oily', 'combination'],
    concernsTargeted: ['acne', 'oily'],
    isFragranceFree: false,
    isVegan: false,
    buyLink: 'https://www.amazon.com/dp/B00007YCRT',
  },
  {
    name: 'Moisturizing Cream',
    brand: 'CeraVe',
    category: 'moisturizer',
    price: '19.99',
    skinTypeMatch: ['dry', 'sensitive'],
    concernsTargeted: ['dryness', 'sensitivity'],
    isFragranceFree: true,
    isVegan: false,
    buyLink: 'https://www.amazon.com/dp/B00TTD9BRC',
  },
  {
    name: 'Hydro Boost Water Gel',
    brand: 'Neutrogena',
    category: 'moisturizer',
    price: '21.99',
    skinTypeMatch: ['oily', 'combination'],
    concernsTargeted: ['dryness', 'hydrated'],
    isFragranceFree: false,
    isVegan: false,
    buyLink: 'https://www.amazon.com/dp/B00NR1YQK4',
  },
  {
    name: 'Daily Hydrating Lotion',
    brand: 'Cetaphil',
    category: 'moisturizer',
    price: '13.99',
    skinTypeMatch: ['dry', 'sensitive', 'combination'],
    concernsTargeted: ['dryness', 'hydrated'],
    isFragranceFree: true,
    isVegan: false,
    buyLink: 'https://www.amazon.com/dp/B005IHT94S',
  },
  {
    name: 'Toleriane Double Repair Moisturizer',
    brand: 'La Roche-Posay',
    category: 'moisturizer',
    price: '22.99',
    skinTypeMatch: ['sensitive', 'dry', 'combination'],
    concernsTargeted: ['dryness', 'sensitivity'],
    isFragranceFree: true,
    isVegan: false,
    buyLink: 'https://www.amazon.com/dp/B01N9SPQHZ',
  },
  {
    name: 'Niacinamide 10% + Zinc 1%',
    brand: 'The Ordinary',
    category: 'serum',
    price: '6.90',
    skinTypeMatch: ['oily', 'combination'],
    concernsTargeted: ['acne', 'pores', 'oily', 'hyperpigmentation'],
    isFragranceFree: true,
    isVegan: true,
    buyLink: 'https://www.amazon.com/dp/B06VWT73GR',
  },
  {
    name: 'Hyaluronic Acid 2% + B5',
    brand: 'The Ordinary',
    category: 'serum',
    price: '8.90',
    skinTypeMatch: ['dry', 'sensitive', 'combination', 'oily'],
    concernsTargeted: ['dryness', 'hydrated', 'aging'],
    isFragranceFree: true,
    isVegan: true,
    buyLink: 'https://www.amazon.com/dp/B06VVDD3GH',
  },
  {
    name: 'Vitamin C Serum',
    brand: 'TruSkin',
    category: 'serum',
    price: '19.99',
    skinTypeMatch: ['dry', 'combination', 'oily', 'sensitive'],
    concernsTargeted: ['hyperpigmentation', 'bright', 'aging'],
    isFragranceFree: false,
    isVegan: true,
    buyLink: 'https://www.amazon.com/dp/B01M0XOILF',
  },
  {
    name: 'Alpha Arbutin 2% + HA',
    brand: 'The Ordinary',
    category: 'treatment',
    price: '9.90',
    skinTypeMatch: ['dry', 'combination', 'oily', 'sensitive'],
    concernsTargeted: ['hyperpigmentation', 'bright'],
    isFragranceFree: true,
    isVegan: true,
    buyLink: 'https://www.amazon.com/dp/B07QMFMJG5',
  },
  {
    name: 'Witch Hazel Toner — Unscented',
    brand: 'Thayers',
    category: 'toner',
    price: '10.99',
    skinTypeMatch: ['oily', 'combination'],
    concernsTargeted: ['acne', 'pores', 'oily'],
    isFragranceFree: true,
    isVegan: true,
    buyLink: 'https://www.amazon.com/dp/B07RR9XLBM',
  },
  {
    name: 'Skin Perfecting 2% BHA Exfoliant',
    brand: "Paula's Choice",
    category: 'toner',
    price: '34.00',
    skinTypeMatch: ['oily', 'combination'],
    concernsTargeted: ['acne', 'pores', 'aging'],
    isFragranceFree: true,
    isVegan: true,
    buyLink: 'https://www.amazon.com/dp/B0046H5DZ8',
  },
  {
    name: 'UV Clear Broad-Spectrum SPF 46',
    brand: 'EltaMD',
    category: 'spf',
    price: '39.00',
    skinTypeMatch: ['sensitive', 'oily', 'combination'],
    concernsTargeted: ['sensitivity', 'acne', 'aging'],
    isFragranceFree: true,
    isVegan: false,
    buyLink: 'https://www.amazon.com/dp/B002MSN3QQ',
  },
  {
    name: 'Ultra Sheer Dry-Touch SPF 55',
    brand: 'Neutrogena',
    category: 'spf',
    price: '12.99',
    skinTypeMatch: ['oily', 'combination', 'dry', 'sensitive'],
    concernsTargeted: ['aging'],
    isFragranceFree: false,
    isVegan: false,
    buyLink: 'https://www.amazon.com/dp/B003P2YSD6',
  },
  {
    name: 'Adapalene Gel 0.1%',
    brand: 'Differin',
    category: 'treatment',
    price: '13.99',
    skinTypeMatch: ['oily', 'combination'],
    concernsTargeted: ['acne', 'aging', 'pores'],
    isFragranceFree: true,
    isVegan: false,
    buyLink: 'https://www.amazon.com/dp/B07L1PHSY9',
  },
  {
    name: 'Acne Spot Dots',
    brand: 'Peach Slices',
    category: 'treatment',
    price: '4.99',
    skinTypeMatch: ['oily', 'combination', 'sensitive'],
    concernsTargeted: ['acne'],
    isFragranceFree: true,
    isVegan: true,
    buyLink: 'https://www.amazon.com/dp/B07DKMQXJF',
  },
  {
    name: 'Drying Lotion',
    brand: 'Mario Badescu',
    category: 'treatment',
    price: '12.00',
    skinTypeMatch: ['oily', 'combination'],
    concernsTargeted: ['acne'],
    isFragranceFree: false,
    isVegan: false,
    buyLink: 'https://www.amazon.com/dp/B001B2MFKS',
  },
]

// ─── Matching logic (client-side) ─────────────────────────────────────────────

function scoreProduct(profile: SkinProfile, product: typeof PRODUCTS[0]): { score: number; reason: string } {
  let score = 0
  const reasons: string[] = []

  // Skin type (40 pts)
  if (profile.skinType && product.skinTypeMatch.includes(profile.skinType)) {
    score += 40
    reasons.push(`great for ${profile.skinType} skin`)
  }

  // Concern (30 pts)
  const concern = profile.skinConcern ?? ''
  if (concern && product.concernsTargeted.includes(concern)) {
    score += 30
    reasons.push(`targets ${concern}`)
  }

  // Goal alignment (15 pts)
  const goal = profile.skinGoal ?? ''
  if (goal && product.concernsTargeted.some(c => c.includes(goal) || goal.includes(c))) {
    score += 15
    reasons.push(`supports your goal`)
  }

  // Beginner-friendliness (15 pts) — reward fragrance-free for beginners
  if (profile.experience === 'beginner' && product.isFragranceFree) {
    score += 15
    reasons.push('beginner-friendly')
  }

  return {
    score: Math.min(100, score),
    reason: reasons.length > 0 ? reasons.join(' · ') : 'general recommendation',
  }
}

function rankProducts(profile: SkinProfile) {
  return PRODUCTS.map(p => ({
    ...p,
    ...scoreProduct(profile, p),
  })).sort((a, b) => b.score - a.score)
}

// ─── UI helpers ───────────────────────────────────────────────────────────────

const CATEGORY_EMOJI: Record<string, string> = {
  cleanser: '🧼',
  moisturizer: '💧',
  serum: '✨',
  toner: '🌿',
  spf: '☀️',
  treatment: '🎯',
}

const CATEGORY_COLOR: Record<string, string> = {
  cleanser: 'bg-sky-100 text-sky-700',
  moisturizer: 'bg-blue-100 text-blue-700',
  serum: 'bg-violet-100 text-violet-700',
  toner: 'bg-emerald-100 text-emerald-700',
  spf: 'bg-amber-100 text-amber-700',
  treatment: 'bg-rose-100 text-rose-700',
}

function MatchScore({ score }: { score: number }) {
  const color =
    score >= 70 ? 'text-emerald-600 bg-emerald-50 border-emerald-200' :
    score >= 40 ? 'text-amber-600 bg-amber-50 border-amber-200' :
    'text-slate-500 bg-slate-50 border-slate-200'

  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${color}`}>
      {score}% match
    </span>
  )
}

const SKIN_TYPE_LABELS: Record<string, string> = {
  oily: 'Oily',
  dry: 'Dry',
  combination: 'Combination',
  normal: 'Normal',
  sensitive: 'Sensitive',
}

const CATEGORIES = ['all', 'cleanser', 'moisturizer', 'serum', 'toner', 'spf', 'treatment']

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MatchesPage() {
  const { user, isLoaded } = useUser()
  const [profile, setProfile] = useState<SkinProfile | null>(null)
  const [ranked, setRanked] = useState<(typeof PRODUCTS[0] & { score: number; reason: string })[]>([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [showOnlyFragFree, setShowOnlyFragFree] = useState(false)

  useEffect(() => {
    if (!isLoaded || !user) return
    const meta = user.publicMetadata as { skinProfile?: SkinProfile }
    const sp = meta?.skinProfile ?? null
    setProfile(sp)
    if (sp) {
      setRanked(rankProducts(sp))
    }
  }, [isLoaded, user])

  if (!isLoaded) {
    return (
      <main className="min-h-screen pt-24 pb-12 bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Sparkles className="h-8 w-8 text-primary animate-pulse" />
          <p className="text-white/60 text-sm">Loading your matches…</p>
        </div>
      </main>
    )
  }

  // Not completed onboarding
  if (!profile) {
    return (
      <main className="min-h-screen pt-24 pb-12 bg-gray-950">
        <Container>
          <div className="max-w-md mx-auto text-center py-24 space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10">
              <Lock className="h-7 w-7 text-white/40" />
            </div>
            <h1 className="text-2xl font-bold text-white">Complete Your Skin Profile First</h1>
            <p className="text-white/50 text-sm leading-relaxed">
              We need to know your skin type and concerns before we can match you with the right products.
            </p>
            <Button href="/onboarding" variant="primary" size="lg">
              Take the Skin Quiz
              <Sparkles className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Container>
      </main>
    )
  }

  const filtered = ranked.filter(p => {
    if (activeCategory !== 'all' && p.category !== activeCategory) return false
    if (showOnlyFragFree && !p.isFragranceFree) return false
    return true
  })

  const topMatch = ranked[0]

  return (
    <main className="min-h-screen pt-24 pb-12 bg-gray-950">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Your Product Matches</h1>
              <p className="text-white/50 text-sm mt-1">
                Matched for{' '}
                <span className="text-primary font-medium">
                  {SKIN_TYPE_LABELS[profile.skinType ?? ''] ?? profile.skinType ?? 'your'} skin
                </span>
                {profile.skinConcern && (
                  <> · concern: <span className="text-primary font-medium">{profile.skinConcern}</span></>
                )}
              </p>
            </div>
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Update profile
            </Link>
          </div>
        </div>

        {/* Top Match Hero */}
        {topMatch && topMatch.score > 0 && (
          <div className="relative mb-8 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20 p-6">
            <div className="absolute top-4 right-4">
              <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/30 px-3 py-1 rounded-full">
                ⭐ Top Pick for You
              </span>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-4xl">{CATEGORY_EMOJI[topMatch.category] ?? '✨'}</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-white/40 mb-0.5 uppercase tracking-wider">{topMatch.brand}</p>
                <h2 className="text-lg font-bold text-white truncate">{topMatch.name}</h2>
                <p className="text-sm text-white/60 mt-1">{topMatch.reason}</p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-primary font-bold text-lg">${topMatch.price}</span>
                  <MatchScore score={topMatch.score} />
                  {topMatch.isFragranceFree && (
                    <span className="text-xs text-white/40">Fragrance-free</span>
                  )}
                  {topMatch.isVegan && (
                    <span className="text-xs text-white/40">Vegan</span>
                  )}
                </div>
              </div>
              <a
                href={topMatch.buyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-1.5 bg-primary text-gray-900 font-semibold text-sm px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                Buy
              </a>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6 items-center">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                  activeCategory === cat
                    ? 'bg-primary text-gray-900'
                    : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80'
                }`}
              >
                {cat === 'all' ? 'All' : `${CATEGORY_EMOJI[cat]} ${cat}`}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowOnlyFragFree(v => !v)}
            className={`ml-auto px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              showOnlyFragFree
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80'
            }`}
          >
            Fragrance-free only
          </button>
        </div>

        {/* Results count */}
        <p className="text-xs text-white/30 mb-4">{filtered.length} products</p>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((product, i) => (
            <div
              key={`${product.brand}-${product.name}`}
              className="group relative rounded-2xl bg-gray-900 border border-white/8 p-5 flex flex-col gap-3 hover:border-white/20 hover:shadow-xl transition-all duration-200"
            >
              {/* Category badge */}
              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${CATEGORY_COLOR[product.category] ?? 'bg-gray-100 text-gray-600'}`}>
                  {CATEGORY_EMOJI[product.category]} {product.category}
                </span>
                <MatchScore score={product.score} />
              </div>

              {/* Name & brand */}
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider">{product.brand}</p>
                <h3 className="text-sm font-semibold text-white leading-snug mt-0.5">{product.name}</h3>
              </div>

              {/* Reason */}
              {product.reason && product.reason !== 'general recommendation' && (
                <p className="text-xs text-white/50 leading-relaxed">{product.reason}</p>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {product.isFragranceFree && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/40">
                    Fragrance-free
                  </span>
                )}
                {product.isVegan && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/40">
                    Vegan
                  </span>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
                <span className="text-primary font-bold">${product.price}</span>
                <a
                  href={product.buyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-white/40 hover:text-white/70 transition-colors"
                >
                  Buy <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-white/30">
            <ShoppingBag className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p>No products match this filter.</p>
            <button
              onClick={() => { setActiveCategory('all'); setShowOnlyFragFree(false) }}
              className="mt-3 text-sm text-primary/70 hover:text-primary transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </Container>
    </main>
  )
}

