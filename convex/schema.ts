import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  users: defineTable({
    login: v.string(),
    senha: v.string(),
    admin: v.string(), // "sim" ou "não"
  }).index("by_login", ["login"]),
  products: defineTable({
    name: v.string(),
    description: v.string(),
    category: v.string(),
    imageUrl: v.optional(v.string()),
    sortOrder: v.optional(v.number()),
  }).index("by_category", ["category"]),
  testimonials: defineTable({
    name: v.string(),
    event: v.string(),
    description: v.string(),
    photoUrl: v.optional(v.string()),
  }),
  visits: defineTable({
    ip: v.string(),
    day: v.string(), // "YYYY-MM-DD"
    createdAt: v.number(),
  }).index("by_day_ip", ["day", "ip"]),
  announcements: defineTable({
    active: v.boolean(),
    title: v.string(),
    message: v.string(),
    imageUrl: v.optional(v.string()),
    linkUrl: v.optional(v.string()),
    startAt: v.optional(v.number()),
    durationDays: v.optional(v.number()),
    category: v.optional(v.string()),
  }).index("by_active", ["active"]),
});
