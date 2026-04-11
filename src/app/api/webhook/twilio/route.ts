import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { toE164 } from "@/lib/phone";
import { unsubscribeByPhone } from "@/lib/airtable";
import { config } from "@/lib/config";

export const runtime = "nodejs";

/**
 * Twilio delivers inbound SMS/MMS via webhook. Configure this URL in the
 * Twilio console: Phone Numbers -> Manage -> Active numbers -> your number
 * -> Messaging -> "A message comes in" -> Webhook, POST,
 *   https://<your-domain>/api/webhook/twilio
 *
 * Twilio sends application/x-www-form-urlencoded with fields like:
 *   From       = +14155551234
 *   To         = +14243221233  (your Twilio number)
 *   Body       = "STOP"
 *   MessageSid = SMxxxxxxxx
 *
 * Twilio also sets X-Twilio-Signature so we can verify the request is
 * really from Twilio (and not a spoof). Verification uses HMAC-SHA1 with
 * the account auth token as the key.
 *
 * Standard CTIA STOP keywords are matched and flip the subscriber's
 * Status to "unsubscribed" in Airtable.
 */
const STOP_KEYWORDS = new Set([
  "STOP",
  "UNSUBSCRIBE",
  "CANCEL",
  "END",
  "QUIT",
  "STOPALL",
]);

/**
 * Validate Twilio's X-Twilio-Signature header against the request URL and
 * POST params. See https://www.twilio.com/docs/usage/webhooks/webhooks-security
 */
function isValidTwilioSignature(
  url: string,
  params: Record<string, string>,
  signature: string,
  authToken: string,
): boolean {
  const sortedKeys = Object.keys(params).sort();
  let data = url;
  for (const key of sortedKeys) {
    data += key + params[key];
  }
  const expected = crypto
    .createHmac("sha1", authToken)
    .update(data)
    .digest("base64");
  try {
    const a = Buffer.from(expected);
    const b = Buffer.from(signature);
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  // Parse the form-encoded body into a plain object so we can both
  // validate the signature and read the fields.
  const rawBody = await req.text();
  const params: Record<string, string> = {};
  for (const [k, v] of new URLSearchParams(rawBody).entries()) {
    params[k] = v;
  }

  // Reconstruct the full request URL Twilio signed against. On Vercel,
  // req.url is the internal URL (https://<deployment>.vercel.app/...),
  // which matches what Twilio sees if you configured the webhook with
  // that same hostname.
  const signature = req.headers.get("x-twilio-signature") ?? "";
  const url = req.url;

  if (config.twilio.authToken && signature) {
    if (!isValidTwilioSignature(url, params, signature, config.twilio.authToken)) {
      console.warn("[webhook:twilio] bad signature");
      return NextResponse.json({ ok: false, error: "bad signature" }, { status: 403 });
    }
  }

  const phone = toE164(params.From ?? "");
  const text = (params.Body ?? "").trim().toUpperCase();
  if (!phone || !text) {
    return new NextResponse("<Response/>", {
      status: 200,
      headers: { "Content-Type": "text/xml" },
    });
  }

  if (STOP_KEYWORDS.has(text)) {
    const removed = await unsubscribeByPhone(phone);
    console.log(`[webhook:twilio] STOP from ${phone} — removed=${removed}`);
  }

  // Twilio expects a TwiML response. An empty <Response/> means "don't
  // auto-reply" — Twilio's carrier layer already handles sending the
  // standard STOP confirmation to the recipient.
  return new NextResponse("<Response/>", {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });
}
