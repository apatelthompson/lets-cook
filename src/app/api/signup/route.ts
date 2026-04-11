import { NextResponse } from "next/server";
import {
  createSubscriber,
  fetchMessage,
  findSubscriberByPhone,
  logSend,
} from "@/lib/airtable";
import { toE164 } from "@/lib/phone";
import { composeBody } from "@/lib/schedule";
import { sendMessage } from "@/lib/twilio";
import { partsInTimezone, timezoneFromHeaders } from "@/lib/timezone";

export const runtime = "nodejs";

/**
 * Day 0 is the welcome message sent immediately at signup time. Edit the
 * content in the Messages table in Airtable (Day = 0). If no row exists we
 * fall back to this string so the signup flow still works end-to-end.
 */
const FALLBACK_WELCOME = `You're in. Your first real message arrives tomorrow at 10am. Reply STOP any time to unsubscribe.`;

async function sendWelcome(phone: string): Promise<void> {
  try {
    const welcome = await fetchMessage(0);
    const body = welcome ? composeBody(welcome) : FALLBACK_WELCOME;
    const mediaUrl = welcome?.imageUrl;
    const send = await sendMessage({ to: phone, body, mediaUrl });
    await logSend({
      phone,
      day: 0,
      status: send.ok ? "sent" : "failed",
      error: send.error,
    });
  } catch (err) {
    // A failing welcome must not fail the signup — just log it.
    console.error("[signup] welcome send failed", err);
  }
}

interface SignupBody {
  phone?: string;
  name?: string;
}

export async function POST(req: Request) {
  let body: SignupBody;
  try {
    body = (await req.json()) as SignupBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON." },
      { status: 400 },
    );
  }

  const phone = toE164(body.phone ?? "");
  if (!phone) {
    return NextResponse.json(
      { ok: false, error: "That doesn't look like a valid phone number." },
      { status: 400 },
    );
  }

  const timezone = timezoneFromHeaders(req.headers);
  const signupLocalDate = partsInTimezone(new Date(), timezone).isoDate;

  try {
    const existing = await findSubscriberByPhone(phone);
    if (existing) {
      if (existing.status === "unsubscribed") {
        return NextResponse.json(
          {
            ok: false,
            error:
              "This number previously unsubscribed. Text START to rejoin.",
          },
          { status: 409 },
        );
      }
      return NextResponse.json(
        { ok: false, error: "This number is already signed up." },
        { status: 409 },
      );
    }

    await createSubscriber({
      phone,
      name: body.name?.trim() || undefined,
      timezone,
      signupLocalDate,
    });

    await sendWelcome(phone);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[signup] error", err);
    return NextResponse.json(
      { ok: false, error: "Server error. Please try again." },
      { status: 500 },
    );
  }
}
