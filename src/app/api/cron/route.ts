import { NextResponse } from "next/server";
import { config } from "@/lib/config";
import { runTick } from "@/lib/schedule";

export const runtime = "nodejs";
// Don't cache — we want a fresh run every tick.
export const dynamic = "force-dynamic";

/**
 * Invoked hourly by Vercel Cron (see vercel.json). Vercel attaches an
 * `Authorization: Bearer <CRON_SECRET>` header when the cron job runs, so
 * we reject anything without that header. You can also hit this manually
 * with the same header for debugging.
 */
export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  const expected = `Bearer ${config.cronSecret}`;
  if (!config.cronSecret || auth !== expected) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await runTick();
    return NextResponse.json({ ok: true, result });
  } catch (err) {
    console.error("[cron] error", err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
