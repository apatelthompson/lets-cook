import { NextResponse } from "next/server";
import { toE164 } from "@/lib/phone";
import { unsubscribeByPhone } from "@/lib/airtable";

export const runtime = "nodejs";

/**
 * Sendblue delivers inbound messages via webhook. Configure this URL in the
 * Sendblue dashboard under Webhooks -> Received Messages.
 *
 * Payload shape (see sendblue.co/docs):
 *   { from_number: "+14155551234", content: "STOP", ... }
 *
 * We treat any message matching STOP/UNSUBSCRIBE/CANCEL/END/QUIT as an
 * opt-out, which is the standard CTIA keyword set.
 */
const STOP_KEYWORDS = new Set(["STOP", "UNSUBSCRIBE", "CANCEL", "END", "QUIT", "STOPALL"]);

interface InboundPayload {
  from_number?: string;
  content?: string;
}

export async function POST(req: Request) {
  let payload: InboundPayload;
  try {
    payload = (await req.json()) as InboundPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const phone = toE164(payload.from_number ?? "");
  const text = (payload.content ?? "").trim().toUpperCase();
  if (!phone || !text) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  if (STOP_KEYWORDS.has(text)) {
    const removed = await unsubscribeByPhone(phone);
    console.log(`[webhook] STOP from ${phone} — removed=${removed}`);
    return NextResponse.json({ ok: true, unsubscribed: removed });
  }

  // Non-STOP inbound — ignore for now. (Could log replies to an Airtable
  // table later if you want to see engagement.)
  return NextResponse.json({ ok: true, ignored: true });
}
