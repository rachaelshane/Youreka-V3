import type { SkinProfile, Product } from './schema'

const BUDGET_RANGES: Record<string, [number, number]> = {
  low: [0, 15],
  medium: [15, 40],
  high: [40, Infinity],
}

/**
 * Score a single product against a user's skin profile (0–100).
 * Returns the score and a human-readable reason string.
 */
export function scoreProduct(
  profile: SkinProfile,
  product: Product
): { score: number; reason: string } {
  let score = 0
  const reasons: string[] = []

  // ── 1. Skin type match (40 pts) ──────────────────────────────────────────
  if (profile.skinType && product.skinTypeMatch?.includes(profile.skinType)) {
    score += 40
    reasons.push(`great for ${profile.skinType} skin`)
  } else if (product.skinTypeMatch?.includes('all')) {
    score += 20
    reasons.push('suitable for all skin types')
  }

  // ── 2. Concerns overlap (30 pts, up to 10 pts per concern) ───────────────
  const userConcerns = profile.skinConcerns ?? []
  const productConcerns = product.concernsTargeted ?? []
  const sharedConcerns = userConcerns.filter((c) => productConcerns.includes(c))

  const concernPoints = Math.min(sharedConcerns.length * 10, 30)
  score += concernPoints
  if (sharedConcerns.length > 0) {
    reasons.push(`targets ${sharedConcerns.join(', ')}`)
  }

  // ── 3. Budget fit (15 pts) ────────────────────────────────────────────────
  if (profile.budget && product.price !== null && product.price !== undefined) {
    const price = parseFloat(String(product.price))
    const [min, max] = BUDGET_RANGES[profile.budget] ?? [0, Infinity]
    if (price >= min && price <= max) {
      score += 15
      reasons.push('within your budget')
    }
  }

  // ── 4. Sensitivity / allergen safety (15 pts) ─────────────────────────────
  let penaltyApplied = false

  // If user has sensitivities and product is fragrance-free, reward
  const hasSensitivities =
    (profile.sensitivities?.length ?? 0) > 0 ||
    (profile.knownConditions?.length ?? 0) > 0

  if (hasSensitivities && product.isFragranceFree) {
    score += 10
    reasons.push('fragrance-free (good for sensitive skin)')
  }

  // Penalise if product ingredient overlaps with known allergies
  const userAllergies = (profile.allergies ?? []).map((a) => a.toLowerCase())
  const productIngredients = (product.ingredients ?? []).map((i) => i.toLowerCase())
  const allergenHit = userAllergies.some((a) =>
    productIngredients.some((i) => i.includes(a))
  )
  if (allergenHit) {
    score = Math.max(0, score - 30)
    penaltyApplied = true
    reasons.push('⚠️ may contain an ingredient you are allergic to')
  }

  if (!penaltyApplied && hasSensitivities) {
    score += 5
  }

  const finalScore = Math.min(100, Math.max(0, score))
  const reason =
    reasons.length > 0
      ? reasons.join(' · ')
      : 'general recommendation'

  return { score: finalScore, reason }
}

/**
 * Score all products against a profile and return them sorted best-first.
 */
export function rankProducts(
  profile: SkinProfile,
  products: Product[]
): Array<{ product: Product; score: number; reason: string }> {
  return products
    .map((product) => {
      const { score, reason } = scoreProduct(profile, product)
      return { product, score, reason }
    })
    .sort((a, b) => b.score - a.score)
}
