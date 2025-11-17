import { httpRouter } from "convex/server";

const http = httpRouter();

// Handler separado para facilitar tipagem
const trackVisitHandler = async (ctx: any, req: Request): Promise<Response> => {
  const ip = (ctx as any).requestIP ?? req.headers.get("x-forwarded-for") ?? "unknown";
  const now = Date.now();
  const day = new Date(now).toISOString().slice(0, 10); // YYYY-MM-DD

  const existing = await (ctx as any).db
    .query("visits")
    .withIndex("by_day_ip", (q: any) => q.eq("day", day).eq("ip", ip))
    .first();

  if (!existing) {
    await (ctx as any).db.insert("visits", { ip, day, createdAt: now });
  }

  return new Response("ok", { status: 200 });
};

// Endpoint para registrar visitas únicas por IP e dia
http.route({
  path: "/trackVisit",
  method: "POST",
  handler: trackVisitHandler as any,
});

export default http;
