# AdReach — Complete Master Build Plan
### AI-Powered Meta Ads Automation Platform for Nigerian Businesses
**Last Updated: May 2026**

---

## 0. The Big Picture — What AdReach Actually Is

AdReach is a SaaS platform where Nigerian businesses pay to have their Facebook and Instagram ads run automatically by AI. They connect their Meta ad account, answer a few questions about their business, pay their ad budget, and the platform handles everything else — audience targeting, ad copy, creative assets, campaign launch, daily optimisation, and weekly performance reports.

**You (the founder) do almost nothing after building it.** No manual ad management. No client calls. No creative work. The AI agents handle all of it.

### Who runs the ads?
**The AI runs the ads. Fully automated.**

Here is the exact flow after a business signs up:
1. Business completes onboarding form (5 minutes)
2. Business connects their Meta ad account via OAuth (2 clicks)
3. Business selects what they are promoting (single product/service, catalog, or full store)
4. Business uploads assets OR requests AI generation OR uses image enhancer
5. Business pays their ad budget via Paystack
6. Audience Agent generates optimal Meta targeting automatically
7. Creative Agent writes 3 ad copy variants automatically
8. Platform creates and launches the live campaign via Meta Marketing API
9. Every 24 hours, Optimiser Agent pulls stats and adjusts the campaign
10. Every Monday, Report Agent emails a plain-English summary to the business
11. Upsell Agent watches for winning campaigns and nudges businesses to increase budget
12. You collect your fee in your Paystack dashboard and check your admin panel

---

## 1. Business Model

### Pricing
- **Fee:** 15% of ad spend
- **Minimum fee:** ₦2,000 (minimum campaign = ₦13,334 ad budget)
- **Maximum fee:** ₦150,000 (applies to budgets above ₦1,000,000)
- **No monthly subscription for clients** — pay per campaign, Nigerian market preference

### Fee Formula
```
serviceFee = adBudget × 0.15
serviceFee = Math.min(Math.max(serviceFee, 2000), 150000)
totalCharged = adBudget + serviceFee
```

### Fee Reference Table
| Ad Budget | Your Fee | Business Pays Total |
|-----------|----------|-------------------|
| ₦13,334 | ₦2,000 (min) | ₦15,334 |
| ₦50,000 | ₦7,500 | ₦57,500 |
| ₦100,000 | ₦15,000 | ₦115,000 |
| ₦300,000 | ₦45,000 | ₦345,000 |
| ₦500,000 | ₦75,000 | ₦575,000 |
| ₦1,000,000 | ₦150,000 (max) | ₦1,150,000 |

### Add-on Revenue (Per Campaign, at Checkout)
| Add-on | Price to Business | Your Cost | Profit |
|--------|-----------------|-----------|--------|
| AI Image Pack (4 images, pick 1) | ₦2,500 | ~₦200 | ₦2,300 |
| AI Video Clip (10-sec animated) | ₦5,000 | ~₦500 | ₦4,500 |
| Photo Enhancer (1 photo cleaned up) | ₦1,000 | ~₦20 | ₦980 |

### Monthly Running Costs
| Cost Item | Amount |
|-----------|--------|
| Vercel (hosting) | Free → $20/month at scale |
| Convex (backend) | Free up to 1M calls/month |
| Clerk (auth) | Free up to 10,000 users |
| Claude API (~₦500/campaign) | Scales with clients |
| Replicate (images/video) | Only when add-ons purchased |
| Paystack (1.5% per transaction) | Deducted from revenue |
| Resend (emails) | Free up to 3,000/month |
| Domain + misc | ~₦15,000/year |
| **Total fixed base** | **~₦20,000–₦30,000/month** |

---

## 2. Complete Tech Stack

### Frontend
- **Next.js 14** — App Router, React Server Components
- **Tailwind CSS** — styling
- **shadcn/ui** — component library (buttons, forms, modals, tables)
- **Recharts** — dashboard charts, sparklines, performance graphs
- **React Hook Form + Zod** — form validation and type safety
- **Framer Motion** — micro-animations and transitions

### Backend
- **Convex** — database, real-time subscriptions, mutations, queries, HTTP actions, scheduled crons
- **Clerk** — authentication (email/password + Google OAuth)
- **Paystack Node SDK** — NGN payment processing

### AI Layer
- **Anthropic SDK** (`@anthropic-ai/sdk`) — Claude Sonnet 4 for all 5 agents
- **OpenAI SDK** — fallback option if needed

### Creative Generation APIs
- **Replicate** — image generation (Flux Schnell model), video generation (Stable Video Diffusion), photo enhancement
- **Cloudinary** — image/video storage, transformations, CDN delivery

### Communication
- **Resend** — transactional emails (welcome, weekly reports, payment receipts, upsell alerts)
- **Termii or Twilio** — WhatsApp notifications (Phase 5, Nigerian users prefer WhatsApp)

### Infrastructure
- **Vercel** — Next.js hosting
- **Convex Cloud** — backend hosting (free tier covers early scale)

### External APIs
- **Meta Marketing API v20.0** — campaign creation, management, insights, catalog ads

---

## 3. Complete Project File Structure

```
adreach/
├── app/
│   ├── (marketing)/                    # Public pages
│   │   ├── page.tsx                    # Landing page
│   │   ├── pricing/page.tsx
│   │   ├── how-it-works/page.tsx
│   │   └── case-studies/page.tsx
│   │
│   ├── (auth)/
│   │   ├── sign-in/page.tsx
│   │   └── sign-up/page.tsx
│   │
│   ├── (dashboard)/                    # Protected — business owners
│   │   ├── layout.tsx                  # Dashboard shell + sidebar
│   │   ├── dashboard/page.tsx          # Main overview
│   │   ├── campaigns/
│   │   │   ├── page.tsx                # All campaigns list
│   │   │   ├── new/
│   │   │   │   ├── page.tsx            # Campaign type selector
│   │   │   │   ├── standard/page.tsx   # Single product/service flow
│   │   │   │   ├── carousel/page.tsx   # Multiple products flow
│   │   │   │   └── catalog/page.tsx    # Full store/catalog flow
│   │   │   └── [id]/page.tsx           # Single campaign detail
│   │   ├── onboarding/
│   │   │   ├── business/page.tsx       # Step 1: Business profile
│   │   │   ├── connect/page.tsx        # Step 2: Meta OAuth
│   │   │   └── complete/page.tsx       # Step 3: Success
│   │   ├── billing/page.tsx
│   │   └── settings/page.tsx
│   │
│   ├── (admin)/                        # Your private admin panel
│   │   ├── layout.tsx                  # Admin shell (role-gated)
│   │   ├── page.tsx                    # Revenue overview
│   │   ├── clients/page.tsx
│   │   ├── campaigns/page.tsx
│   │   └── approvals/page.tsx          # Campaign approval queue
│   │
│   └── api/
│       ├── webhooks/
│       │   ├── paystack/route.ts       # Payment confirmation
│       │   └── meta/route.ts           # Meta webhook events
│       └── meta/
│           └── callback/route.ts       # OAuth callback handler
│
├── convex/
│   ├── schema.ts                       # All table definitions
│   ├── users.ts
│   ├── businesses.ts
│   ├── campaigns.ts
│   ├── transactions.ts
│   ├── reports.ts
│   ├── catalogs.ts                     # Catalog/store ad data
│   ├── metaApi.ts                      # Meta API actions
│   ├── aiAgents.ts                     # All 5 AI agents
│   ├── imageGeneration.ts              # Image/video/enhance actions
│   ├── crons.ts                        # Scheduled jobs
│   └── http.ts                         # Webhook HTTP handlers
│
├── lib/
│   ├── meta/
│   │   ├── client.ts
│   │   ├── campaigns.ts                # Standard + carousel + catalog
│   │   ├── insights.ts
│   │   └── catalog.ts                  # Meta catalog management
│   ├── ai/
│   │   ├── audienceAgent.ts
│   │   ├── creativeAgent.ts
│   │   ├── optimiserAgent.ts
│   │   ├── reportAgent.ts
│   │   └── upsellAgent.ts
│   ├── creative/
│   │   ├── imageGenerator.ts           # Replicate Flux integration
│   │   ├── videoGenerator.ts           # Replicate video integration
│   │   └── imageEnhancer.ts            # Replicate enhancement
│   ├── paystack/client.ts
│   └── email/resend.ts
│
└── components/
    ├── ui/                             # shadcn components
    ├── dashboard/
    │   ├── CampaignCard.tsx
    │   ├── MetricsGrid.tsx
    │   ├── PerformanceChart.tsx
    │   └── UpsellNotification.tsx
    ├── onboarding/
    │   ├── BusinessForm.tsx
    │   ├── MetaConnectButton.tsx
    │   └── BudgetSelector.tsx
    ├── campaigns/
    │   ├── CampaignTypeSelector.tsx    # Standard / Carousel / Catalog
    │   ├── CreativeAssetStep.tsx       # Upload / Generate / Enhance
    │   ├── AIGeneratingLoader.tsx      # Beautiful loading animation
    │   ├── AudiencePreview.tsx
    │   └── AdVariantCards.tsx
    └── creative/
        ├── UploadZone.tsx
        ├── AIGeneratePanel.tsx
        ├── VideoGeneratePanel.tsx
        ├── EnhancerPanel.tsx
        └── CatalogUploader.tsx
```

---

## 4. Convex Database Schema

```typescript
// convex/schema.ts

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({

  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    phone: v.optional(v.string()),
    role: v.union(v.literal("business"), v.literal("admin")),
    createdAt: v.number(),
  }).index("by_clerk_id", ["clerkId"]),

  businesses: defineTable({
    userId: v.id("users"),
    businessName: v.string(),
    industry: v.string(),
    city: v.string(),
    targetCustomer: v.string(),
    goal: v.string(),
    websiteUrl: v.optional(v.string()),
    phoneNumber: v.string(),
    instagramHandle: v.optional(v.string()),
    // Meta connection
    metaAccessToken: v.optional(v.string()),
    metaAdAccountId: v.optional(v.string()),
    metaPageId: v.optional(v.string()),
    metaConnected: v.boolean(),
    onboardingComplete: v.boolean(),
    // Stats
    totalCampaigns: v.number(),
    totalSpend: v.number(),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),

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
    // For standard campaigns: one image or video
    // For carousel: array of cards (each with image + headline)
    // For catalog: hero image/video + catalog reference
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

    // AI-generated ad copy (3 variants for standard/carousel, 1 for catalog)
    aiCreatives: v.optional(v.array(v.object({
      variant: v.number(),
      angle: v.string(),
      headline: v.string(),
      primaryText: v.string(),
      callToAction: v.string(),
      imagePrompt: v.optional(v.string()),
      selected: v.boolean(),
    }))),

    // Meta IDs (populated after launch)
    metaCampaignId: v.optional(v.string()),
    metaAdSetId: v.optional(v.string()),
    metaAdIds: v.optional(v.array(v.string())),
    metaCatalogId: v.optional(v.string()),

    // Performance metrics (synced from Meta every 6 hours)
    metrics: v.optional(v.object({
      reach: v.number(),
      impressions: v.number(),
      clicks: v.number(),
      ctr: v.number(),
      cpm: v.number(),
      spend: v.number(),
      leads: v.optional(v.number()),
      purchases: v.optional(v.number()),
      roas: v.optional(v.number()),          // For catalog/store campaigns
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
    metaCatalogId: v.optional(v.string()),    // Meta's catalog ID after upload
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
      v.literal("csv_upload"),       // Business uploaded a spreadsheet
      v.literal("instagram_shop"),   // Connected Instagram Shop
      v.literal("manual"),           // Entered manually
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
    summary: v.string(),               // AI-generated plain-English text
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
```

---

## 5. The Three Campaign Types — Full Detail

This is the answer to "what if someone is promoting a catalog or store?"

### Type 1: Standard Campaign
**For:** Single product, single service, one offer, one event

**Ad format:** One image or one video with headline and body copy

**Creative flow:**
- Business describes what they're promoting
- AI generates 3 copy variants (headline, body, CTA)
- Business either uploads one image/video, generates with AI, or enhances a photo
- Platform creates a single Meta campaign with 3 ad variants (same audience, different copy)
- Meta automatically learns which variant performs best and shows it more

**Meta API objects created:**
- 1 Campaign
- 1 Ad Set (with AI audience)
- 3 Ads (one per copy variant)

---

### Type 2: Carousel Campaign
**For:** Multiple products, a menu, a collection, a before/after showcase

**Ad format:** Swipeable cards — each card has its own image, headline, and link

**Creative flow:**
- Business uploads 3–10 product photos (or AI generates them)
- Business enters a product name and price per item (or uploads a mini-spreadsheet)
- AI writes a carousel intro headline and a short description per card
- Platform creates a carousel ad that users can swipe through
- Each card can link to a different product page

**Meta API objects created:**
- 1 Campaign
- 1 Ad Set (with AI audience)
- 1 Carousel Ad (containing all cards as child creatives)

---

### Type 3: Catalog / Store Campaign
**For:** Online stores, large inventories, Instagram shops, market sellers with many products

**Ad format:** Dynamic catalog ads — Meta automatically shows each user the products they are most likely to buy based on their behaviour

**This is the most powerful ad type for e-commerce.** The ads are fully dynamic — Meta picks which products from the catalog to show each individual user. A user who browsed fashion gets shown fashion items. A user who looked at shoes gets shown shoes.

**Creative flow:**
- **Step 1 — Upload catalog:** Business uploads a CSV spreadsheet of their products (ID, name, description, price, image URL, product link). Platform parses it and creates a Meta product catalog via the Catalog API.
  - OR: Business connects their Instagram Shop (already has catalog) — platform reads it directly
  - OR: Business manually enters up to 20 products through a form UI
- **Step 2 — Hero creative:** AI generates one hero image/video for the top of the Collection ad (the large banner users see before scrolling the catalog)
- **Step 3 — AI writes the campaign headline and body copy** — one set for the whole campaign since the products sell themselves
- **Step 4 — Platform creates a Collection Ad** which has the hero creative at top and pulls dynamic products below it automatically from the catalog

**Meta API objects created:**
- 1 Product Catalog (uploaded via Catalog API)
- 1 Campaign
- 1 Ad Set (with AI audience + catalog targeting)
- 1 Collection Ad (hero creative + dynamic product grid below)

**Ongoing automation for catalog campaigns:**
- Platform syncs catalog weekly if business updates their spreadsheet
- AI monitors which products are getting the most catalog clicks and surfaces them in the weekly report
- Optimiser adjusts the audience if catalog ROAS (return on ad spend) drops below 2x

**Catalog CSV format businesses upload:**
```csv
id,name,description,price,currency,image_url,link,availability
SKU001,Lagos Fit Joggers,Comfortable daily joggers in 3 colours,12500,NGN,https://...,https://...,in stock
SKU002,Ankara Print Dress,Premium handwoven fabric,18000,NGN,https://...,https://...,in stock
```

---

## 6. Creative Assets — The Full System

Every campaign goes through a creative asset step. The business sees three options:

### Option A: Upload Your Own
- Drag-and-drop image or video upload
- Accepted formats: JPG, PNG, MP4, MOV
- Size requirements shown clearly (Meta requires at least 1080×1080px for feed ads)
- For carousel: upload multiple images at once, reorder by drag-and-drop
- For catalog: upload hero image only (product images come from catalog)
- Cloudinary handles storage and CDN delivery

### Option B: Generate with AI (Add-on ₦2,500)
**How it works:**
1. Creative Agent has already written the ad copy
2. Image Agent (Claude) reads the copy and business profile and writes a detailed image generation prompt automatically
3. Platform calls Replicate (Flux Schnell model) with that prompt
4. Four image variations are generated in parallel
5. Business previews all four and selects one
6. Selected image is uploaded to Cloudinary and used in the campaign

**The image prompt Claude generates looks like this:**
```
Professional advertising photo for a Nigerian fashion boutique. 
A confident Nigerian woman in her late 20s wearing stylish ankara print dress, 
standing in a clean modern Lagos apartment interior with natural light. 
Photo-realistic, editorial photography style, warm skin tones, 
vibrant fabric colours, no text, square format (1:1), 
shot like a high-end fashion brand campaign.
```

**For video generation (Add-on ₦5,000):**
- Business either generates from scratch (text-to-video) OR animates one of their uploaded/generated images
- Platform calls Replicate (Stable Video Diffusion) with the selected image
- Produces a 5–10 second subtle motion video (product floating, zoom-in, pan)
- Perfect for businesses that have a product photo but no video content

### Option C: Photo Enhancer (Add-on ₦1,000)
**The most useful feature for small Nigerian businesses.**

Many small businesses take photos on low-end Android phones — blurry, poor lighting, cluttered backgrounds. This feature:
1. Business uploads their raw phone photo
2. Platform calls Replicate (Real-ESRGAN upscaler + background removal if needed)
3. Returns a cleaned-up, upscaled, professional-looking version
4. Business reviews and confirms
5. Enhanced image goes into the ad

**This feels like magic to a market trader or small boutique owner** who cannot afford a photographer.

---

## 7. The Five AI Agents — Complete Implementation

### Agent 1: Audience Agent
**Trigger:** When business completes campaign form
**Runtime:** ~3 seconds
**Cost:** ~₦150 in Claude API fees

```typescript
// lib/ai/audienceAgent.ts

export async function generateAudience(business: Business, campaign: Campaign) {
  const prompt = `
You are an expert Meta ads targeting specialist for Nigerian businesses.
You have deep knowledge of Nigerian social media users, demographics, and buying behaviour.

Business Profile:
- Name: ${business.businessName}
- Industry: ${business.industry}
- City: ${business.city}, Nigeria
- Campaign goal: ${campaign.goal}
- Target customer: ${business.targetCustomer}
- Campaign type: ${campaign.campaignType}

Generate the optimal Meta ads audience. Return ONLY valid JSON:
{
  "ageMin": number,
  "ageMax": number,
  "genders": ["all"] | ["male"] | ["female"],
  "interests": [5-8 specific Facebook interest keywords Nigerian users follow],
  "locations": [Nigerian cities/states — include ${business.city} + nearby major cities],
  "devicePlatforms": ["mobile"] | ["mobile", "desktop"],
  "publisherPlatforms": ["facebook", "instagram"] | subset,
  "objective": "OUTCOME_LEADS" | "OUTCOME_TRAFFIC" | "OUTCOME_SALES",
  "rationale": "2-sentence explanation"
}

Nigerian targeting rules:
- 95%+ of Nigerian Facebook/Instagram users are on mobile — always include mobile
- Instagram: fashion, beauty, food, lifestyle, youth (18-35)
- Facebook: broader age range, real estate, B2B, finance
- For catalog/store campaigns: use OUTCOME_SALES objective
- Include Lagos even if business is in another city — it has the highest purchasing power
- Use interests that actually exist on Facebook (verified interest names)
`;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    messages: [{ role: "user", content: prompt }],
  });

  return JSON.parse(response.content[0].text);
}
```

---

### Agent 2: Creative Agent
**Trigger:** After audience is generated
**Runtime:** ~5 seconds
**Cost:** ~₦200 in Claude API fees

```typescript
export async function generateCreatives(
  business: Business,
  campaign: Campaign,
  audience: MetaAudience
) {
  // For catalog campaigns, generate 1 variant (catalog sells itself)
  // For standard/carousel, generate 3 variants
  const variantCount = campaign.campaignType === "catalog" ? 1 : 3;

  const prompt = `
You are a world-class Nigerian advertising copywriter.
Write compelling Meta ad copy for this business.

Business: ${business.businessName}
Industry: ${business.industry}
Goal: ${campaign.goal}
Target audience: ${business.targetCustomer}
Campaign type: ${campaign.campaignType}
${campaign.campaignType === "catalog" ? "Note: This is a store/catalog ad. The products sell themselves — write copy that builds brand desire and drives browsing." : ""}
${campaign.campaignType === "carousel" ? "Note: This is a carousel ad. Write an engaging intro that makes people want to swipe through." : ""}

Write ${variantCount} ad variant(s). Return ONLY valid JSON array:
[{
  "variant": 1,
  "angle": "urgency | social_proof | curiosity | value | emotion | fomo",
  "headline": "max 40 chars, powerful opening",
  "primaryText": "80-125 words, warm and direct, Nigerian English, ends with clear CTA",
  "callToAction": "SHOP_NOW | LEARN_MORE | CONTACT_US | GET_QUOTE | BOOK_NOW | SEE_MORE",
  "imagePrompt": "detailed prompt for AI image generation (professional, photo-realistic, Nigerian context, no text in image)"
}]

Nigerian copywriting principles:
- Nigerians respond to confidence, aspiration, community, and bold claims
- Be direct — Nigerians appreciate people who get to the point
- Name the city when relevant ("Serving Lagos businesses since...")
- Use social proof angles ("Join 200+ businesses...")
- Never sound generic or like a foreign ad template
- For B2C: appeal to status, family, and looking good
- For B2B: appeal to growth, profit, and beating competitors
`;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2000,
    messages: [{ role: "user", content: prompt }],
  });

  return JSON.parse(response.content[0].text);
}
```

---

### Agent 3: Optimiser Agent
**Trigger:** Convex cron — runs every day at 8am WAT
**What it does:**
- Fetches latest metrics from Meta Insights API for every active campaign
- Compares against industry benchmarks
- Makes automated decisions: continue, pause, shift budget
- Can pause individual underperforming ad variants
- Writes recommendation to database (shown in dashboard)

```typescript
export async function optimiseCampaign(
  campaign: Campaign,
  metrics: MetaMetrics,
) {
  const BENCHMARKS = {
    fashion: { ctr: 1.2, cpm: 800 },
    food: { ctr: 0.9, cpm: 600 },
    beauty: { ctr: 1.4, cpm: 900 },
    real_estate: { ctr: 0.7, cpm: 1200 },
    ecommerce: { ctr: 1.1, cpm: 750 },
    default: { ctr: 1.0, cpm: 800 },
  };

  const benchmark = BENCHMARKS[campaign.industry] || BENCHMARKS.default;

  const prompt = `
Analyse this Meta ads campaign performance and decide what action to take.

Campaign: ${campaign.name} (${campaign.campaignType})
Running for: ${campaign.daysActive} days
Spent so far: ₦${metrics.spend.toLocaleString()} of ₦${campaign.adBudget.toLocaleString()} budget

Metrics:
- Reach: ${metrics.reach.toLocaleString()}
- Clicks: ${metrics.clicks.toLocaleString()}  
- CTR: ${metrics.ctr}%
- CPM: ₦${metrics.cpm}
- Spend: ₦${metrics.spend}
${metrics.roas ? `- ROAS: ${metrics.roas}x` : ""}

Industry benchmark for ${campaign.industry}:
- Expected CTR: ${benchmark.ctr}%
- Expected CPM: ₦${benchmark.cpm}

Rules:
- Never pause a campaign that has been running less than 48 hours (learning phase)
- Pause if CTR < 0.4% after 3+ days
- Pause if CPM is more than 3× benchmark after 3+ days
- Suggest budget increase if CTR > 2× benchmark
- For catalog campaigns: also consider ROAS — pause if ROAS < 1.5x after 5 days
- Always be conservative — if uncertain, recommend "continue" with monitoring

Return ONLY valid JSON:
{
  "action": "continue" | "pause" | "pause_worst_variant" | "suggest_increase",
  "confidence": "high" | "medium" | "low",
  "reason": "one sentence, plain English",
  "recommendation": "what you advise the business, in plain language (no jargon)",
  "performanceScore": 1-10
}
`;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 500,
    messages: [{ role: "user", content: prompt }],
  });

  const decision = JSON.parse(response.content[0].text);

  // Execute the decision automatically
  if (decision.action === "pause") {
    await pauseMetaCampaign(campaign.metaCampaignId, business.metaAccessToken);
  } else if (decision.action === "pause_worst_variant") {
    const worstAdId = getWorstPerformingAd(campaign.metaAdIds, metricsPerAd);
    await pauseMetaAd(worstAdId, business.metaAccessToken);
  }

  return decision;
}
```

---

### Agent 4: Report Agent
**Trigger:** Convex cron — every Monday 9am WAT
**What it does:** Generates plain-English weekly email sent to business owner

```typescript
export async function generateWeeklyReport(
  business: Business,
  campaign: Campaign,
  thisWeek: MetaMetrics,
  lastWeek: MetaMetrics | null
) {
  const prompt = `
Write a friendly, plain-English weekly ad performance report for a Nigerian business owner.
They are not technical. Use simple language. No jargon.

Business: ${business.businessName}
Campaign goal: ${campaign.goal}
Campaign type: ${campaign.campaignType}

This week:
- People who saw the ad: ${thisWeek.reach.toLocaleString()}
- People who clicked: ${thisWeek.clicks.toLocaleString()}
- Click rate: ${thisWeek.ctr}%
- Amount spent from budget: ₦${thisWeek.spend.toLocaleString()}
${thisWeek.leads ? `- Leads/enquiries: ${thisWeek.leads}` : ""}
${thisWeek.roas ? `- Every ₦1 spent returned ₦${thisWeek.roas} in sales` : ""}

${lastWeek ? `Last week: ${lastWeek.reach.toLocaleString()} people reached, ${lastWeek.clicks.toLocaleString()} clicks` : ""}

Write the report. Structure:
1. One strong headline summary sentence
2. What happened this week in plain language (2-3 sentences)  
3. Comparison to last week (if data available)
4. One specific actionable tip for next week
5. Warm, encouraging closing line

Rules:
- NEVER say "CTR", "CPM", "impressions" — translate everything to plain language
- Say "people who saw your ad" not "impressions"
- Say "out of every 100 people who saw your ad, X clicked" not "CTR was X%"
- Keep total under 180 words
- Warm, professional, encouraging tone
- Sign off as "The AdReach Team"
`;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 600,
    messages: [{ role: "user", content: prompt }],
  });

  return response.content[0].text;
}
```

---

### Agent 5: Upsell Agent
**Trigger:** Convex cron — runs daily, checks campaigns on day 5+
**What it does:** Detects winning campaigns and nudges businesses to increase budget

```typescript
export async function checkUpsellOpportunity(
  campaign: Campaign,
  metrics: MetaMetrics,
  benchmark: Benchmark
) {
  // Only trigger if campaign has been running 5+ days
  if (campaign.daysActive < 5) return null;

  const performanceRatio = metrics.ctr / benchmark.ctr;

  // Only upsell if genuinely outperforming by 50%+
  if (performanceRatio < 1.5) return null;

  const prompt = `
A Meta ad campaign is performing significantly above average.
Write a short, exciting in-app notification encouraging the business to increase their budget.

Business: ${campaign.businessName}
Current ad budget: ₦${campaign.adBudget.toLocaleString()}
Performance: ${Math.round(performanceRatio * 100)}% better than average for their industry
People reached so far: ${metrics.reach.toLocaleString()}
Clicks received: ${metrics.clicks.toLocaleString()}
Days running: ${campaign.daysActive}

Write 2 sentences maximum. Be excited but not pushy. Suggest doubling the budget.

Return ONLY valid JSON:
{
  "title": "short notification title (max 8 words)",
  "message": "2-sentence message with specific numbers",
  "suggestedBudget": ${campaign.adBudget * 2},
  "ctaText": "Increase Budget"
}
`;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 300,
    messages: [{ role: "user", content: prompt }],
  });

  return JSON.parse(response.content[0].text);
}
```

---

## 8. Image Generation System — Full Detail

### Image Generator (Add-on ₦2,500)

```typescript
// lib/creative/imageGenerator.ts
import Replicate from "replicate";
const replicate = new Replicate({ auth: process.env.REPLICATE_API_KEY });

export async function generateAdImages(
  creative: AdCreative,
  business: Business,
  campaignType: string
): Promise<string[]> {

  // Step 1: Claude writes a professional image prompt
  const promptResponse = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 300,
    messages: [{
      role: "user",
      content: `
Write a detailed image generation prompt for a Meta ad for this business.

Business: ${business.businessName}
Industry: ${business.industry}
City: ${business.city}
Ad headline: ${creative.headline}
Ad copy: ${creative.primaryText}
Campaign type: ${campaignType}

Requirements:
- Photo-realistic advertising photography style
- Nigerian setting and people where appropriate
- Professional lighting, clean composition
- NO text, NO logos, NO watermarks in the image
- Square format (1:1 ratio) optimised for Instagram and Facebook feed
- Show the product/service in real-life use context

Return ONLY the image generation prompt.
`
    }],
  });

  const imagePrompt = promptResponse.content[0].text;

  // Step 2: Generate 4 variations in parallel using Flux Schnell
  const outputs = await Promise.all(
    Array.from({ length: 4 }, () =>
      replicate.run("black-forest-labs/flux-schnell", {
        input: {
          prompt: imagePrompt,
          num_outputs: 1,
          aspect_ratio: "1:1",
          output_format: "jpg",
          output_quality: 90,
        }
      })
    )
  );

  // Step 3: Upload to Cloudinary for permanent storage + CDN
  const imageUrls = await Promise.all(
    outputs.map(async (output) => {
      const result = await cloudinary.uploader.upload(output[0], {
        folder: `adreach/${business._id}/generated`,
        resource_type: "image",
      });
      return result.secure_url;
    })
  );

  return imageUrls; // Returns 4 URLs for business to choose from
}
```

---

### Video Generator (Add-on ₦5,000)

```typescript
// lib/creative/videoGenerator.ts

export async function generateAdVideo(
  selectedImageUrl: string,  // Animate an existing image (most useful)
  campaign: Campaign
): Promise<string> {

  // Image-to-video: animates a static image into a subtle motion clip
  // Best for product photos, shop photos, food photos
  const output = await replicate.run(
    "stability-ai/stable-video-diffusion:3f0457e4619daac51203dedb472816fd4af51f3149fa7a9e0b5ffcf1b8172438",
    {
      input: {
        input_image: selectedImageUrl,
        video_length: "25_frames_with_svd_xt",  // ~5 seconds
        sizing_strategy: "crop_to_16_9",
        motion_bucket_id: 40,     // 1-255, lower = less motion (subtle is better for ads)
        cond_aug: 0.02,
      }
    }
  );

  // Upload to Cloudinary
  const result = await cloudinary.uploader.upload(output, {
    folder: `adreach/${campaign.businessId}/videos`,
    resource_type: "video",
  });

  return result.secure_url;
}
```

---

### Photo Enhancer (Add-on ₦1,000)

```typescript
// lib/creative/imageEnhancer.ts

export async function enhanceProductPhoto(
  imageUrl: string,
  options: {
    removeBackground?: boolean   // Good for product shots
    upscale?: boolean            // Fix blurry phone photos
  }
): Promise<string> {

  let processedUrl = imageUrl;

  // Step 1: Upscale and denoise (fixes blurry phone photos)
  if (options.upscale) {
    const upscaled = await replicate.run(
      "nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7b",
      {
        input: {
          image: processedUrl,
          scale: 4,               // 4x upscale
          face_enhance: false,    // For products, not faces
        }
      }
    );
    processedUrl = upscaled;
  }

  // Step 2: Remove background if requested (for product-only shots)
  if (options.removeBackground) {
    const bgRemoved = await replicate.run(
      "cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003",
      {
        input: { image: processedUrl }
      }
    );
    processedUrl = bgRemoved;
  }

  // Upload enhanced version to Cloudinary
  const result = await cloudinary.uploader.upload(processedUrl, {
    folder: `adreach/${businessId}/enhanced`,
    resource_type: "image",
  });

  return result.secure_url;
}
```

---

## 9. Meta Marketing API — Full Integration

### App Setup Checklist
- [ ] Go to developers.facebook.com → Create App
- [ ] App type: **Other** (not a preset) → then **Business**
- [ ] App name: AdReach
- [ ] Add products: **Facebook Login** + **Marketing API**
- [ ] Facebook Login → Settings → Add OAuth redirect URIs:
  - `http://localhost:3000/api/meta/callback` (dev)
  - `https://adreach.com.ng/api/meta/callback` (prod)
- [ ] Copy App ID → `META_APP_ID` env var
- [ ] Copy App Secret → `META_APP_SECRET` env var
- [ ] Business Settings → System Users → Create System User → Generate Token with `ads_management`, `ads_read`
- [ ] App Review → Request permissions: `ads_management`, `ads_read`, `business_management`, `pages_read_engagement`
- [ ] Submit for App Review with video screencast (start this in Phase 2)

### OAuth Flow

```typescript
// Step 1: Generate the Meta login URL
export function getMetaAuthUrl(businessId: string): string {
  const params = new URLSearchParams({
    client_id: process.env.META_APP_ID!,
    redirect_uri: `${process.env.NEXT_PUBLIC_URL}/api/meta/callback`,
    scope: "ads_management,ads_read,business_management,pages_read_engagement",
    state: businessId,                    // Pass businessId through OAuth flow
    response_type: "code",
  });
  return `https://www.facebook.com/v20.0/dialog/oauth?${params}`;
}

// Step 2: Handle callback — app/api/meta/callback/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const businessId = searchParams.get("state");

  // Exchange code for access token
  const tokenRes = await fetch(
    `https://graph.facebook.com/v20.0/oauth/access_token?` +
    `client_id=${process.env.META_APP_ID}&` +
    `client_secret=${process.env.META_APP_SECRET}&` +
    `redirect_uri=${process.env.NEXT_PUBLIC_URL}/api/meta/callback&` +
    `code=${code}`
  );
  const { access_token } = await tokenRes.json();

  // Get their ad account IDs
  const accountsRes = await fetch(
    `https://graph.facebook.com/v20.0/me/adaccounts?access_token=${access_token}`
  );
  const { data: adAccounts } = await accountsRes.json();

  // Store token + ad account in Convex
  await convex.mutation(api.businesses.updateMetaConnection, {
    businessId,
    metaAccessToken: access_token,   // TODO: encrypt before storing
    metaAdAccountId: adAccounts[0].id,
    metaConnected: true,
  });

  redirect("/dashboard/onboarding/complete");
}
```

### Creating Standard Campaign

```typescript
export const createStandardCampaign = action({
  handler: async (ctx, { campaignId }) => {
    const campaign = await ctx.runQuery(internal.campaigns.get, { id: campaignId });
    const business = await ctx.runQuery(internal.businesses.get, { id: campaign.businessId });

    const base = `https://graph.facebook.com/v20.0`;
    const token = business.metaAccessToken;
    const account = business.metaAdAccountId;  // "act_XXXXXXXXX"

    // 1. Create Campaign
    const { id: metaCampaignId } = await callMetaApi(`${base}/${account}/campaigns`, {
      name: campaign.name,
      objective: campaign.aiAudience.objective,
      status: "ACTIVE",
      special_ad_categories: [],
      access_token: token,
    });

    // 2. Create Ad Set
    const audience = campaign.aiAudience;
    const { id: metaAdSetId } = await callMetaApi(`${base}/${account}/adsets`, {
      name: `${campaign.name} – Ad Set`,
      campaign_id: metaCampaignId,
      billing_event: "IMPRESSIONS",
      optimization_goal: "LINK_CLICKS",
      daily_budget: Math.floor((campaign.adBudget / 7) * 100),  // In kobo (NGN subunit)
      targeting: {
        age_min: audience.ageMin,
        age_max: audience.ageMax,
        genders: audience.genders[0] === "all" ? [1, 2] : audience.genders[0] === "male" ? [1] : [2],
        geo_locations: {
          cities: audience.locations.map(city => ({ key: city, radius: 25, distance_unit: "kilometer" }))
        },
        interests: audience.interests.map(i => ({ name: i })),
        device_platforms: audience.devicePlatforms,
        publisher_platforms: audience.publisherPlatforms,
      },
      status: "ACTIVE",
      access_token: token,
    });

    // 3. Create 3 Ads (one per creative variant)
    const selectedCreative = campaign.aiCreatives.find(c => c.selected) || campaign.aiCreatives[0];
    const metaAdIds = [];

    for (const creative of campaign.aiCreatives) {
      const { id: adId } = await callMetaApi(`${base}/${account}/ads`, {
        name: `${campaign.name} – Variant ${creative.variant}`,
        adset_id: metaAdSetId,
        creative: {
          title: creative.headline,
          body: creative.primaryText,
          call_to_action: { type: creative.callToAction },
          image_url: campaign.creativeAssets.heroImageUrl,
          link: business.websiteUrl,
          page_id: business.metaPageId,
        },
        status: "ACTIVE",
        access_token: token,
      });
      metaAdIds.push(adId);
    }

    await ctx.runMutation(internal.campaigns.updateAfterLaunch, {
      id: campaignId,
      metaCampaignId,
      metaAdSetId,
      metaAdIds,
      status: "active",
    });
  }
});
```

### Creating Catalog Campaign

```typescript
export const createCatalogCampaign = action({
  handler: async (ctx, { campaignId }) => {
    const campaign = await ctx.runQuery(internal.campaigns.get, { id: campaignId });
    const business = await ctx.runQuery(internal.businesses.get, { id: campaign.businessId });
    const catalog = await ctx.runQuery(internal.catalogs.getByBusiness, { businessId: campaign.businessId });

    const base = `https://graph.facebook.com/v20.0`;
    const token = business.metaAccessToken;
    const account = business.metaAdAccountId;

    // 1. Upload catalog to Meta (if not already uploaded)
    let metaCatalogId = catalog.metaCatalogId;
    if (!metaCatalogId) {
      const { id } = await callMetaApi(
        `${base}/${business.metaBusinessId}/owned_product_catalogs`,
        { name: `${business.businessName} Catalog`, access_token: token }
      );
      metaCatalogId = id;

      // Upload products to catalog
      await callMetaApi(`${base}/${metaCatalogId}/batch`, {
        requests: catalog.products.map(product => ({
          method: "CREATE",
          data: {
            id: product.id,
            name: product.name,
            description: product.description,
            price: `${product.price} NGN`,
            availability: product.availability,
            image_link: product.imageUrl,
            link: product.link,
          }
        })),
        access_token: token,
      });

      await ctx.runMutation(internal.catalogs.updateMetaId, {
        id: catalog._id,
        metaCatalogId,
      });
    }

    // 2. Create Campaign with CATALOG_SALES objective
    const { id: metaCampaignId } = await callMetaApi(`${base}/${account}/campaigns`, {
      name: campaign.name,
      objective: "OUTCOME_SALES",
      status: "ACTIVE",
      access_token: token,
    });

    // 3. Create Ad Set with catalog targeting
    const { id: metaAdSetId } = await callMetaApi(`${base}/${account}/adsets`, {
      name: `${campaign.name} – Ad Set`,
      campaign_id: metaCampaignId,
      billing_event: "IMPRESSIONS",
      optimization_goal: "OFFSITE_CONVERSIONS",
      daily_budget: Math.floor((campaign.adBudget / 7) * 100),
      promoted_object: {
        product_catalog_id: metaCatalogId,
        product_set_id: "ALL",   // Promote all products
      },
      targeting: {
        age_min: campaign.aiAudience.ageMin,
        age_max: campaign.aiAudience.ageMax,
        geo_locations: { countries: ["NG"] },
        interests: campaign.aiAudience.interests.map(i => ({ name: i })),
        device_platforms: ["mobile"],
        publisher_platforms: ["facebook", "instagram"],
      },
      status: "ACTIVE",
      access_token: token,
    });

    // 4. Create Collection Ad (hero image + dynamic product grid)
    const creative = campaign.aiCreatives[0];
    const { id: metaAdId } = await callMetaApi(`${base}/${account}/ads`, {
      name: `${campaign.name} – Collection Ad`,
      adset_id: metaAdSetId,
      creative: {
        format: "COLLECTION",
        name: campaign.name,
        object_story_spec: {
          page_id: business.metaPageId,
          template_data: {
            message: creative.primaryText,
            link: business.websiteUrl,
            name: creative.headline,
            call_to_action: { type: creative.callToAction },
            // Hero image/video at top
            image_hash: campaign.creativeAssets.heroImageUrl,
            // Dynamic products below (Meta auto-populates from catalog)
            retailer_item_ids: [],    // Empty = show all catalog items dynamically
            multi_share_optimized: true,
          }
        },
        product_set_id: "ALL",
      },
      status: "ACTIVE",
      access_token: token,
    });

    await ctx.runMutation(internal.campaigns.updateAfterLaunch, {
      id: campaignId,
      metaCampaignId,
      metaAdSetId,
      metaAdIds: [metaAdId],
      metaCatalogId,
      status: "active",
    });
  }
});
```

---

## 10. Paystack Payment Flow

```typescript
// Step 1: Calculate fees and show breakdown to business
export function calculateFees(adBudget: number) {
  const serviceFee = Math.min(Math.max(adBudget * 0.15, 2000), 150000);
  const totalCharge = adBudget + serviceFee;
  return { adBudget, serviceFee, totalCharge };
}

// Step 2: Initialise Paystack transaction
export async function initiatePayment(
  business: Business,
  campaign: Campaign,
  addOns: AddOnFees
) {
  const fees = calculateFees(campaign.adBudget);
  const addOnTotal = (addOns.imageGeneration || 0) + (addOns.videoGeneration || 0) + (addOns.imageEnhancement || 0);
  const grandTotal = fees.totalCharge + addOnTotal;

  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: business.email,
      amount: grandTotal * 100,   // Paystack uses kobo
      currency: "NGN",
      reference: `adreach_${campaign._id}_${Date.now()}`,
      metadata: {
        campaignId: campaign._id,
        businessId: business._id,
        adBudget: fees.adBudget,
        serviceFee: fees.serviceFee,
        addOnFees: addOns,
        addOnTotal,
      },
      callback_url: `${process.env.NEXT_PUBLIC_URL}/dashboard/campaigns/${campaign._id}?payment=success`,
    }),
  });

  const { data } = await res.json();
  return data.authorization_url;    // Redirect business here
}

// Step 3: Webhook — app/api/webhooks/paystack/route.ts
export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("x-paystack-signature");

  // Verify it's really from Paystack
  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest("hex");

  if (hash !== signature) {
    return new Response("Invalid signature", { status: 401 });
  }

  const event = JSON.parse(body);

  if (event.event === "charge.success") {
    const { campaignId, businessId, adBudget, serviceFee, addOnFees } = event.data.metadata;

    // Record the transaction
    await convex.mutation(api.transactions.create, {
      campaignId,
      businessId,
      paystackReference: event.data.reference,
      amount: event.data.amount / 100,
      adBudget,
      serviceFee,
      addOnFees,
      status: "success",
      paidAt: Date.now(),
    });

    // Update campaign status and trigger launch
    await convex.mutation(api.campaigns.updateStatus, {
      id: campaignId,
      status: "launching",
    });

    // Fire the appropriate campaign creation action
    await convex.action(api.metaApi.launchCampaign, { campaignId });
  }

  return new Response("OK", { status: 200 });
}
```

---

## 11. Convex Scheduled Jobs

```typescript
// convex/crons.ts
import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Run optimiser every day at 8am WAT (7am UTC)
crons.daily(
  "daily-optimiser",
  { hourUTC: 7, minuteUTC: 0 },
  internal.aiAgents.runDailyOptimiser
  // Loops all active campaigns, calls optimiseCampaign(), executes decisions
);

// Sync Meta metrics every 6 hours
crons.interval(
  "sync-meta-metrics",
  { hours: 6 },
  internal.metaApi.syncAllCampaignMetrics
  // Loops all active campaigns, hits Meta Insights API, updates DB
);

// Send weekly reports every Monday 9am WAT (8am UTC)
crons.weekly(
  "weekly-reports",
  { dayOfWeek: "monday", hourUTC: 8, minuteUTC: 0 },
  internal.aiAgents.sendWeeklyReports
  // Generates report text for each active campaign, sends email via Resend
);

// Check upsell opportunities daily at noon WAT
crons.daily(
  "upsell-check",
  { hourUTC: 11, minuteUTC: 0 },
  internal.aiAgents.checkUpsellOpportunities
  // Checks campaigns on day 5+, creates upsell notification if warranted
);

// Sync product catalogs weekly (for catalog campaign businesses)
crons.weekly(
  "catalog-sync",
  { dayOfWeek: "sunday", hourUTC: 2, minuteUTC: 0 },
  internal.metaApi.syncProductCatalogs
  // Re-uploads updated catalog data to Meta for catalog campaigns
);

export default crons;
```

---

## 12. Build Phases — Complete Step-by-Step

### Phase 1 — Foundation (Week 1–2)
**Goal:** Working app where a business can sign up and connect Meta account

- [ ] Init Next.js 14 project with Tailwind + shadcn/ui
- [ ] Set up Convex — init project, write initial schema (users + businesses tables)
- [ ] Integrate Clerk — install, configure middleware, protect dashboard routes
- [ ] Build marketing landing page (hero, features, how it works, pricing, footer)
- [ ] Build sign-up and sign-in pages
- [ ] Build onboarding Step 1: Business profile form
  - Fields: name, industry dropdown, city dropdown, goal cards, target customer textarea, **"What are you promoting?"** cards (Standard / Carousel / Catalog)
- [ ] Build onboarding Step 2: Meta OAuth connect
  - Button → redirects to Meta login → handles callback → stores token
  - Show which permissions are being requested
- [ ] Build onboarding Step 3: Success screen
- [ ] Dashboard shell with sidebar navigation
- [ ] Dashboard home with empty state

**✅ Done when:** A business can sign up, fill profile, and connect Meta account.

---

### Phase 2 — Payments & Basic Campaigns (Week 3)
**Goal:** Accept real payments, create real (but manually targeted) campaigns

- [ ] Paystack SDK integration
- [ ] Fee calculator component — shows breakdown before payment
  - "Ad budget: ₦50,000 | AdReach fee (15%): ₦7,500 | Total: ₦57,500"
- [ ] Add-on checkboxes at checkout (AI Images ₦2,500, AI Video ₦5,000, Photo Enhancer ₦1,000)
- [ ] Paystack payment redirect + callback
- [ ] Paystack webhook handler (verify signature → update transaction → trigger launch)
- [ ] Transaction records in Convex
- [ ] Creative asset upload step (upload only for now — no AI generation yet)
- [ ] Basic Meta campaign creation using hardcoded/manual targeting
- [ ] Campaign detail page showing status (Draft / Launching / Active / Paused)
- [ ] Admin panel foundation: see all clients + transactions
- [ ] Submit Meta App for App Review (record screencast, write policy pages)

**✅ Done when:** Business pays, campaign launches in their Meta Ads Manager.

---

### Phase 3 — AI Layer (Week 4–5)
**Goal:** AI generates audience, copy, and creative assets automatically

- [ ] Audience Agent — wired into campaign creation flow
  - Show audience preview UI (age, gender, interests as chips, cities)
  - Business can see but not edit (v1) — editing comes later
- [ ] Creative Agent — generates 3 copy variants
  - Ad variant cards: headline, body text, CTA preview, "Select" button
  - Business selects one variant (or platform picks best-performing one)
- [ ] AI image generation (Replicate Flux Schnell)
  - "Generate with AI" option in creative asset step
  - Shows 4 image options in a grid, business picks one
  - Add-on fee charged at Paystack checkout
- [ ] Photo Enhancer (Replicate Real-ESRGAN)
  - "Enhance my photo" option — upload blurry phone photo, get back clean version
  - Side-by-side before/after preview before confirming
- [ ] AI Generating loading screen (4-step animated checklist)
- [ ] Campaign review screen before payment
  - Left: audience summary | Right: 3 ad copy variants
  - Business can click "Regenerate" to get new AI suggestions
- [ ] Your approval queue in admin panel — review AI output before it goes live
- [ ] Cloudinary integration for all image storage

**✅ Done when:** Business answers questions, AI generates everything, business reviews and pays.

---

### Phase 4 — Full Automation (Week 6–7)
**Goal:** Platform runs itself with no manual intervention

- [ ] Convex crons setup
- [ ] Meta Insights API sync every 6 hours → update metrics in DB
- [ ] Optimiser Agent + daily cron
  - Auto-pauses underperforming ads via Meta API
  - Writes recommendation to DB → shown on campaign detail page
- [ ] Report Agent + Monday cron → email via Resend
  - Professional HTML email template with AdReach branding
  - Plain-English performance summary
- [ ] Upsell Agent + daily cron → in-app notification
  - Notification card on dashboard with "Increase Budget" CTA
  - Clicking opens payment flow for budget top-up
- [ ] Performance dashboard with charts (Recharts)
  - Reach over time line chart (7 days)
  - Clicks bar chart
  - Spend vs budget progress bar
- [ ] AI Recommendations card on campaign detail page
- [ ] Campaign status badges with micro-animations
- [ ] Video generation (Replicate Stable Video Diffusion)
  - "Animate this image" option after image is selected
  - 5-second motion clip generated, previewed, confirmed
- [ ] Error handling + retry logic for Meta API failures
- [ ] Email notifications to you when new client signs up

**✅ Done when:** Platform runs 7 days untouched — campaigns optimise, reports send, clients receive updates.

---

### Phase 5 — Catalog Support + Polish (Week 8–9)
**Goal:** Handle catalog/store businesses, polish everything

- [ ] Catalog CSV upload flow
  - Upload spreadsheet → parse → show product list → confirm → upload to Meta Catalog API
- [ ] Instagram Shop connection option (read existing catalog)
- [ ] Manual product entry (up to 20 products via form)
- [ ] Catalog campaign creation flow in Meta API
- [ ] Collection Ad format (hero image + dynamic product grid)
- [ ] Weekly catalog sync cron
- [ ] Carousel campaign type (multiple product images, AI writes per-card copy)
- [ ] Mobile-responsive dashboard
- [ ] Full admin panel
  - Revenue dashboard with monthly chart
  - All clients table with search/filter
  - All campaigns overview
  - Approval queue with one-click approve/reject
- [ ] "How it works" page with step-by-step screenshots
- [ ] FAQ page
- [ ] WhatsApp chat button (Tidio or direct WhatsApp Business link)
- [ ] SEO meta tags, OG images, sitemap

**✅ Done when:** All three campaign types work end-to-end. Platform looks and feels premium.

---

### Phase 6 — Growth Features (Post-Launch)
- [ ] Referral system: ₦5,000 off for each friend referred who signs up
- [ ] WhatsApp notifications via Termii (weekly report + upsell via WhatsApp)
- [ ] Multi-campaign support per business
- [ ] Campaign duplication (re-run a past campaign with one click)
- [ ] Industry benchmark dashboard (anonymised averages)
- [ ] Retargeting campaign type (target people who clicked but didn't buy)
- [ ] Agency/white-label tier (other agencies use AdReach under their brand)
- [ ] Paystack payment plan (split ad budget across 2 payments)

---

## 13. Environment Variables

```bash
# .env.local

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard/onboarding/business

# Convex
NEXT_PUBLIC_CONVEX_URL=https://...convex.cloud
CONVEX_DEPLOY_KEY=prod:...

# Meta
META_APP_ID=your_meta_app_id
META_APP_SECRET=your_meta_app_secret
META_VERIFY_TOKEN=any_random_string_you_choose

# AI
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...

# Creative Generation
REPLICATE_API_KEY=r8_...

# Cloudinary
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# Payments
PAYSTACK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_...

# Email
RESEND_API_KEY=re_...
FROM_EMAIL=hello@adreach.com.ng
REPORT_FROM_EMAIL=reports@adreach.com.ng

# App
NEXT_PUBLIC_URL=https://adreach.com.ng
ADMIN_CLERK_USER_ID=your_personal_clerk_user_id
```

---

## 14. Nigerian Market Details

### Industries to Target First
| Industry | Why | Key cities |
|----------|-----|-----------|
| Fashion & clothing | High Instagram presence, impulsive buyers | Lagos, Abuja |
| Food & restaurants | Daily spend, high repeat | Lagos, PH, Abuja |
| Beauty & skincare | Fast-growing, very social-media active | Lagos, Abuja |
| Real estate agents | High-value leads, willing to pay | Lagos, Abuja |
| Event planning | Seasonal but high budget | Lagos, PH |
| E-commerce / online stores | Perfect for catalog campaigns | Nationwide |
| Logistics / delivery | B2B, growing rapidly | Lagos, PH |

### Payment Behaviour
- Accept card, bank transfer, USSD via Paystack (show all three)
- Many SMEs prefer bank transfer — make it visible
- Paystack holds first few transactions for 24–48hrs (new accounts) — factor this into cash flow

### Customer Communication
- Add WhatsApp chat button — Nigerians use WhatsApp over email
- Weekly reports should arrive at 9am Monday — business owners check phones in the morning
- Use formal but warm English — not too casual, not corporate-stiff

### Onboarding Copy Tips
- Explain every step clearly — many first-time users
- Use screenshots in the Meta connect flow — it looks technical but is actually 2 clicks
- Show the fee breakdown clearly and early — Nigerians are price-conscious, transparency builds trust

---

## 15. Client Acquisition Strategy

### Stage 1 — First 5 Clients (Before or During Build)
- Search Instagram: `#lagossmallbusiness` `#abujavendors` `#naijafashion` `#nigerianentrepreneur`
- Find businesses with 500–10,000 followers who are clearly trying to grow
- DM them: pitch the result, not the platform. Offer first campaign free or at cost.
- Goal: 5 real campaigns running with real results data

### Stage 2 — WhatsApp Groups (Month 1–2)
- Join Nigerian entrepreneur WhatsApp groups
- Post weekly: screenshot of real results ("This Lagos boutique reached 18,000 people for ₦12,000")
- Never pitch in the first post — share value, let DMs come naturally

### Stage 3 — Twitter/X + LinkedIn (Month 2+)
- Post weekly results posts on Twitter/X with hashtags `#NigerianBusiness` `#LagosBusiness`
- LinkedIn for larger SMEs and chains
- Tag clients who give permission

### Stage 4 — Partner Referrals (Month 2+)
- Partner with business coaches, accountants, and legal services
- Offer ₦5,000–₦10,000 referral fee per paying signup
- One coach with 50 clients is worth more than 1,000 cold DMs

### Stage 5 — Run Paid Ads for AdReach (Month 3+)
- Use AdReach to run ads for AdReach (perfect proof of concept)
- Target: Nigerian business owners, age 25–45, interested in entrepreneurship
- Budget: ₦30,000–₦50,000 to start
- Ad angle: "We ran ads for this Lagos bakery. 12,000 people reached. ₦10,000 spent. Here's the proof."

---

## 16. Revenue Projections

| Scenario | Month 3 clients | Avg budget | Monthly revenue | Monthly profit |
|----------|----------------|-----------|----------------|---------------|
| Slow | 15 | ₦30,000 | ₦67,500 | ~₦40,000 |
| Normal | 30 | ₦45,000 | ₦202,500 | ~₦165,000 |
| Fast | 60 | ₦60,000 | ₦540,000 | ~₦467,000 |

**Month 12 projections (normal growth, 63 clients, ₦50k avg):**
- Revenue: ~₦472,500/month
- Add-on revenue (images/video): ~₦50,000/month
- Costs: ~₦30,000/month
- **Net profit: ~₦490,000/month**

---

## 17. Key Development Commands

```bash
# Development
npx convex dev          # Start Convex dev server (run this first)
npm run dev             # Start Next.js development server

# Convex
npx convex deploy       # Deploy Convex functions to production

# Deployment
vercel --prod           # Deploy Next.js to Vercel

# Testing
# Meta API: Use Graph API Explorer at developers.facebook.com/tools/explorer
# Paystack test card: 4084 0840 8408 4081, CVV: 408, Expiry: any future date
# Paystack test bank: Provide account number 0000000000, select any bank
```

---

## 18. Quick Reference Checklist — Before First Client

- [ ] Meta Developer App created with correct permissions
- [ ] Meta App Review submitted
- [ ] Paystack business account verified (not just personal)
- [ ] Cloudinary account set up with organized folder structure
- [ ] Replicate account funded with credits
- [ ] Anthropic API key funded
- [ ] Resend domain verified (send from @adreach.com.ng)
- [ ] All env vars set in Vercel production
- [ ] Admin panel locked to your Clerk user ID
- [ ] Privacy Policy page live (required by Meta for App Review)
- [ ] Terms of Service page live
- [ ] Test full flow end-to-end with your own test Meta ad account

---

*AdReach — Built with Next.js 14 · Convex · Clerk · Meta Marketing API v20.0 · Claude Sonnet 4 · Replicate · Paystack*
*Plan version: May 2026*