import { httpRouter } from "convex/server";
import { httpAction, internalQuery, internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

const http = httpRouter();

// Query interna para verificar se já existe uma visita
export const checkVisit = internalQuery({
  args: { ip: v.string(), day: v.string() },
  handler: async (ctx, { ip, day }) => {
    return await ctx.db
      .query("visits")
      .withIndex("by_day_ip", (q) => q.eq("day", day).eq("ip", ip))
      .first();
  },
});

// Mutation interna para registrar uma nova visita
export const recordVisit = internalMutation({
  args: { ip: v.string(), day: v.string(), createdAt: v.number() },
  handler: async (ctx, { ip, day, createdAt }) => {
    return await ctx.db.insert("visits", { ip, day, createdAt });
  },
});

// Endpoint para registrar visitas únicas por IP e dia
http.route({
  path: "/trackVisit",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    try {
      const ip = req.headers.get("x-forwarded-for") ?? 
                req.headers.get("x-real-ip") ?? 
                "unknown";
      
      const now = Date.now();
      const day = new Date(now).toISOString().slice(0, 10); // YYYY-MM-DD

      console.log(`[trackVisit] IP: ${ip}, Day: ${day}`);

      const existing = await ctx.runQuery(internal.router.checkVisit, { ip, day });

      if (!existing) {
        await ctx.runMutation(internal.router.recordVisit, { ip, day, createdAt: now });
        console.log(`[trackVisit] Nova visita registrada: ${ip} em ${day}`);
      } else {
        console.log(`[trackVisit] Visita já registrada hoje: ${ip}`);
      }

      return new Response(JSON.stringify({ success: true }), { 
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }
      });
    } catch (error) {
      console.error("[trackVisit] Erro:", error);
      return new Response(JSON.stringify({ error: String(error) }), { 
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }
      });
    }
  }),
});

export default http;
