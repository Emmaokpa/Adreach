import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({

  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    imageUrl: v.optional(v.string()),
    role: v.union(v.literal("admin"), v.literal("business")),
    createdAt: v.number(),
  }).index("by_clerk_id", ["clerkId"]),

  businesses: defineTable({
    ownerId: v.id("users"),
    name: v.string(),
    industry: v.string(),
    city: v.string(),
    targetCustomer: v.string(),
    goal: v.string(),
    promotingType: v.string(),
    walletBalance: v.number(),
    verificationScore: v.number(),
    onboardingStep: v.string(),
    metaConnected: v.boolean(),
    createdAt: v.number(),
  }).index("by_owner", ["ownerId"]),

  campaigns: defineTable({
    businessId: v.id("businesses"),
    name: v.string(),

    // Campaign type — this determines the ad format
    campaignType: v.union(
      v.literal("standard"),     // Single product or service — one image/video
      v.literal("carousel"),     // Multiple products — swipeable cards
      v.literal("catalog")       // Full store — dynamic product catalog ads
    ),

    status: v.union(
      v.literal("draft"),
      v.literal("generating"),        // AI is working
      v.literal("pending_approval"),  // Waiting for your review
      v.literal("approved"),          // You approved, ready to launch
      v.literal("paying"),            // Business in Paystack flow
      v.literal("launching"),         // Calling Meta API
      v.literal("active"),
      v.literal("paused"),
      v.literal("completed"),
      v.literal("failed")
    ),

    // Budget
    totalBudget: v.number(),          // What business paid total (NGN)
    adBudget: v.number(),             // Amount pushed to Meta
    serviceFee: v.number(),           // Your earnings
    addOnFees: v.optional(v.object({
      imageGeneration: v.optional(v.number()),
      videoGeneration: v.optional(v.number()),
      imageEnhancement: v.optional(v.number()),
    })),

    // AI-generated audience targeting
    aiAudience: v.optional(v.object({
      ageMin: v.number(),
      ageMax: v.number(),
      genders: v.array(v.string()),
      interests: v.array(v.string()),
      locations: v.array(v.string()),
      devicePlatforms: v.array(v.string()),
      publisherPlatforms: v.array(v.string()),
      rationale: v.string(),
    })),

    // Creative assets
    creativeAssets: v.optional(v.object({
      type: v.union(v.literal("image"), v.literal("video"), v.literal("carousel"), v.literal("catalog")),
      heroImageUrl: v.optional(v.string()),
      heroVideoUrl: v.optional(v.string()),
      carouselCards: v.optional(v.array(v.object({
        imageUrl: v.string(),
        headline: v.string(),
        description: v.optional(v.string()),
        link: v.optional(v.string()),
      }))),
      catalogId: v.optional(v.string()),         // Meta catalog ID
      assetSource: v.union(
        v.literal("uploaded"),       // Business uploaded their own
        v.literal("ai_generated"),   // Generated via Replicate
        v.literal("enhanced"),       // Business uploaded, AI enhanced
      ),
    })),

    // AI-generated ad copy
    aiCreatives: v.optional(v.array(v.object({
      variant: v.number(),
      angle: v.string(),
      headline: v.string(),
      primaryText: v.string(),
      callToAction: v.string(),
      imagePrompt: v.optional(v.string()),
      selected: v.boolean(),
    }))),

    // Meta IDs
    metaCampaignId: v.optional(v.string()),
    metaAdSetId: v.optional(v.string()),
    metaAdIds: v.optional(v.array(v.string())),
    metaCatalogId: v.optional(v.string()),

    // Performance metrics
    metrics: v.optional(v.object({
      reach: v.number(),
      impressions: v.number(),
      clicks: v.number(),
      ctr: v.number(),
      cpm: v.number(),
      spend: v.number(),
      leads: v.optional(v.number()),
      purchases: v.optional(v.number()),
      roas: v.optional(v.number()),
      lastSyncedAt: v.number(),
    })),

    // Optimiser notes
    latestOptimisation: v.optional(v.object({
      action: v.string(),
      reason: v.string(),
      recommendation: v.string(),
      runAt: v.number(),
    })),

    startDate: v.number(),
    endDate: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_business", ["businessId"])
    .index("by_status", ["status"])
    .index("by_type", ["campaignType"]),

  catalogs: defineTable({
    businessId: v.id("businesses"),
    name: v.string(),
    metaCatalogId: v.optional(v.string()),
    products: v.array(v.object({
      id: v.string(),
      name: v.string(),
      description: v.string(),
      price: v.number(),
      currency: v.string(),
      imageUrl: v.string(),
      link: v.optional(v.string()),
      availability: v.string(),
    })),
    sourceType: v.union(
      v.literal("csv_upload"),
      v.literal("instagram_shop"),
      v.literal("manual"),
    ),
    productCount: v.number(),
    status: v.union(v.literal("draft"), v.literal("synced"), v.literal("syncing")),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_business", ["businessId"]),

  transactions: defineTable({
    businessId: v.id("businesses"),
    campaignId: v.optional(v.id("campaigns")),
    paystackReference: v.string(),
    amount: v.number(),
    adBudget: v.number(),
    serviceFee: v.number(),
    addOnFees: v.optional(v.number()),
    status: v.union(v.literal("pending"), v.literal("success"), v.literal("failed")),
    paidAt: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_business", ["businessId"])
    .index("by_paystack_ref", ["paystackReference"]),

  reports: defineTable({
    businessId: v.id("businesses"),
    campaignId: v.id("campaigns"),
    weekStart: v.number(),
    weekEnd: v.number(),
    summary: v.string(),
    metrics: v.object({
      reach: v.number(),
      clicks: v.number(),
      spend: v.number(),
      ctr: v.number(),
      leads: v.optional(v.number()),
    }),
    emailSent: v.boolean(),
    createdAt: v.number(),
  }).index("by_business", ["businessId"]),

});
