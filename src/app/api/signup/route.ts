import { NextResponse } from "next/server";
import { createSubscriber, findSubscriberByPhone } from "@/lib/airtable";
import { toE164 } from "@/lib/phone";
import { partsInTimezone, timezoneFromHeaders } from "@/lib/timezone";

export const runtime = "nodejs";

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

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[signup] error", err);
    return NextResponse.json(
      { ok: false, error: "Server error. Please try again." },
      { status: 500 },
    );
  }
}
