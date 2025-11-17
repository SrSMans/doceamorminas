import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Lista todos os depoimentos (pode futuramente ordenar por data ou prioridade)
export const list = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("testimonials").collect();
    // Ordena do mais recente para o mais antigo usando _creationTime
    rows.sort((a, b) => b._creationTime - a._creationTime);
    return rows;
  },
});

// (Opcional) listar com limite ou paginação no futuro

// Adiciona um novo depoimento
export const add = mutation({
  args: {
    name: v.string(),
    event: v.string(),
    description: v.string(),
    photoUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("testimonials", args);
  },
});

// Atualiza um depoimento existente
export const update = mutation({
  args: {
    id: v.id("testimonials"),
    name: v.string(),
    event: v.string(),
    description: v.string(),
    photoUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});
