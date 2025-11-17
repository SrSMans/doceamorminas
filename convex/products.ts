import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("products").collect();
    rows.sort((a, b) => (a.sortOrder ?? 1e12) - (b.sortOrder ?? 1e12));
    return rows;
  },
});

export const listByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    const rows = await ctx.db
      .query("products")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();
    rows.sort((a, b) => (a.sortOrder ?? 1e12) - (b.sortOrder ?? 1e12));
    return rows;
  },
});

export const add = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    category: v.string(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("products", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("products"),
    name: v.string(),
    description: v.string(),
    category: v.string(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

// Reordenar produtos de acordo com a ordem recebida
export const reorder = mutation({
  args: {
    orderedIds: v.array(v.id("products")),
  },
  handler: async (ctx, args) => {
    await Promise.all(
      args.orderedIds.map((id, index) =>
        ctx.db.patch(id, { sortOrder: index }),
      ),
    );
  },
});
