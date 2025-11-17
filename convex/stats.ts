import { query } from "./_generated/server";

export const visitTotals = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("visits").collect();

    const byDay = new Map<string, number>();
    for (const v of rows) {
      byDay.set(v.day, (byDay.get(v.day) ?? 0) + 1);
    }

    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);

    const today = byDay.get(todayStr) ?? 0;

    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - 6);

    let week = 0;
    let month = 0;
    const daily: { day: string; count: number }[] = [];
    const byMonth = new Map<string, number>(); // "YYYY-MM" => count

    for (const [day, count] of byDay) {
      const d = new Date(day);
      daily.push({ day, count });

      const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      byMonth.set(ym, (byMonth.get(ym) ?? 0) + count);

      if (d >= weekStart && d <= now) week += count;
      if (
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      ) {
        month += count;
      }
    }

    daily.sort((a, b) => (a.day < b.day ? -1 : a.day > b.day ? 1 : 0));

    const monthly: { month: string; count: number }[] = Array.from(byMonth).map(
      ([monthKey, count]) => ({ month: monthKey, count }),
    );
    monthly.sort((a, b) => (a.month < b.month ? -1 : a.month > b.month ? 1 : 0));

    return { today, week, month, daily, monthly };
  },
});
