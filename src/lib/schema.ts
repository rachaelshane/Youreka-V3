import {
  pgTable,
  serial,
  text,
  integer,
  numeric,
  boolean,
  jsonb,
  timestamp,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// ─── Users ────────────────────────────────────────────────────────────────────

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  clerkUserId: text('clerk_user_id').notNull().unique(),
  email: text('email').notNull(),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// ─── Skin Profiles ────────────────────────────────────────────────────────────

export const skinProfiles = pgTable('skin_profiles', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  ageRange: text('age_range'),             // e.g. "13-17", "18-24", "25-34"
  skinType: text('skin_type'),             // oily | dry | combination | sensitive
  skinConcerns: text('skin_concerns').array(),   // acne, aging, dullness, etc.
  sensitivities: text('sensitivities').array(),
  knownConditions: text('known_conditions').array(),
  allergies: text('allergies').array(),
  budget: text('budget'),                  // low | medium | high
  routinePreference: text('routine_preference'), // minimal | moderate | extensive
  lifestyleData: jsonb('lifestyle_data'),  // freeform JSON for extra context
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// ─── Products ─────────────────────────────────────────────────────────────────

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  category: text('category').notNull(),    // serum | moisturizer | cleanser | toner | spf | treatment
  brand: text('brand').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }),
  ingredients: text('ingredients').array(),
  skinTypeMatch: text('skin_type_match').array(),
  concernsTargeted: text('concerns_targeted').array(),
  isFragranceFree: boolean('is_fragrance_free').default(false),
  isVegan: boolean('is_vegan').default(false),
  imageUrl: text('image_url'),
  buyLink: text('buy_link'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// ─── Product Matches ──────────────────────────────────────────────────────────

export const productMatches = pgTable('product_matches', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  productId: integer('product_id')
    .references(() => products.id, { onDelete: 'cascade' })
    .notNull(),
  matchScore: integer('match_score'),      // 0–100
  matchReason: text('match_reason'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// ─── Relations ────────────────────────────────────────────────────────────────

export const usersRelations = relations(users, ({ one, many }) => ({
  skinProfile: one(skinProfiles, {
    fields: [users.id],
    references: [skinProfiles.userId],
  }),
  productMatches: many(productMatches),
}))

export const skinProfilesRelations = relations(skinProfiles, ({ one }) => ({
  user: one(users, {
    fields: [skinProfiles.userId],
    references: [users.id],
  }),
}))

export const productsRelations = relations(products, ({ many }) => ({
  productMatches: many(productMatches),
}))

export const productMatchesRelations = relations(productMatches, ({ one }) => ({
  user: one(users, {
    fields: [productMatches.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [productMatches.productId],
    references: [products.id],
  }),
}))

// ─── Types ────────────────────────────────────────────────────────────────────

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type SkinProfile = typeof skinProfiles.$inferSelect
export type NewSkinProfile = typeof skinProfiles.$inferInsert
export type Product = typeof products.$inferSelect
export type ProductMatch = typeof productMatches.$inferSelect
