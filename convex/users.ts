import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Buscar usuário por login
export const getByLogin = query({
  args: { login: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_login", (q) => q.eq("login", args.login))
      .first();
    return user;
  },
});
