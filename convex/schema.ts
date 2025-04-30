import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  products: defineTable({
    name: v.string(),
    description: v.string(),
    category: v.string(),
    imageUrl: v.optional(v.string()),
  }).index("by_category", ["category"]),
});
