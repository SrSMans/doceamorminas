import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getActive = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db
      .query("announcements")
      .withIndex("by_active", (q) => q.eq("active", true))
      .order("desc")
      .collect();
    return rows[0] ?? null;
  },
});

export const upsert = mutation({
  args: {
    active: v.boolean(),
    title: v.string(),
    message: v.string(),
    imageUrl: v.optional(v.string()),
    linkUrl: v.optional(v.string()),
    startAt: v.optional(v.number()),
    durationDays: v.optional(v.number()),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const current = await ctx.db
      .query("announcements")
      .withIndex("by_active", (q) => q.eq("active", true))
      .order("desc")
      .collect();
    if (current[0]) {
      await ctx.db.patch(current[0]._id, args);
    } else {
      await ctx.db.insert("announcements", {
        ...args,
        startAt: args.startAt ?? Date.now(),
        durationDays: args.durationDays ?? 7,
      });
    }
  },
});

export const toggle = mutation({
  args: { active: v.boolean() },
  handler: async (ctx, args) => {
    const current = await ctx.db
      .query("announcements")
      .withIndex("by_active", (q) => q.eq("active", true))
      .order("desc")
      .collect();
    if (current[0]) {
      await ctx.db.patch(current[0]._id, { active: args.active });
    } else {
      await ctx.db.insert("announcements", {
        active: args.active,
        title: "Novidade no Cardápio",
        message: "Temos novos sabores disponíveis!",
      });
    }
  },
});

export const deleteActive = mutation({
  args: {},
  handler: async (ctx) => {
    const current = await ctx.db
      .query("announcements")
      .withIndex("by_active", (q) => q.eq("active", true))
      .order("desc")
      .collect();
    if (current[0]) {
      await ctx.db.delete(current[0]._id);
    }
  },
});
