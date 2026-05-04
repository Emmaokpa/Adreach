import { v } from "convex/values";
import { mutation, query, MutationCtx, QueryCtx } from "./_generated/server";

export const createBusiness = mutation({
  args: {
    name: v.string(),
    industry: v.string(),
    city: v.string(),
    goal: v.string(),
    targetCustomer: v.string(),
    promotingType: v.string(),
  },
  handler: async (ctx: MutationCtx, args: any) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q: any) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    return await ctx.db.insert("businesses", {
      ownerId: user._id,
      name: args.name,
      industry: args.industry,
      city: args.city,
      goal: args.goal,
      targetCustomer: args.targetCustomer,
      promotingType: args.promotingType,
      walletBalance: 0,
      verificationScore: 0,
      onboardingStep: "connect",
      createdAt: Date.now(),
    });
  },
});

export const getMyBusiness = query({
  handler: async (ctx: QueryCtx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q: any) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) return null;

    return await ctx.db
      .query("businesses")
      .withIndex("by_owner", (q: any) => q.eq("ownerId", user._id))
      .unique();
  },
});

export const updateBusiness = mutation({
  args: {
    id: v.id("businesses"),
    metaConnected: v.optional(v.boolean()),
    onboardingStep: v.optional(v.string()),
  },
  handler: async (ctx: MutationCtx, args: any) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

export const fundWallet = mutation({
  args: {
    businessId: v.id("businesses"),
    amount: v.number(),
    reference: v.string(),
  },
  handler: async (ctx: MutationCtx, args: any) => {
    const business = await ctx.db.get(args.businessId);
    if (!business) throw new Error("Business not found");

    // Update wallet balance
    await ctx.db.patch(args.businessId, {
      walletBalance: (business.walletBalance ?? 0) + args.amount,
    });

    // Log transaction
    await ctx.db.insert("transactions", {
      businessId: args.businessId,
      amount: args.amount,
      adBudget: args.amount, // For top-ups, entire amount is ad budget
      serviceFee: 0,
      paystackReference: args.reference,
      status: "success",
      paidAt: Date.now(),
      createdAt: Date.now(),
    });

    return true;
  },
});

export const getTransactions = query({
  args: { businessId: v.id("businesses") },
  handler: async (ctx: QueryCtx, args: any) => {
    return await ctx.db
      .query("transactions")
      .withIndex("by_business", (q: any) => q.eq("businessId", args.businessId))
      .order("desc")
      .take(50);
  },
});
