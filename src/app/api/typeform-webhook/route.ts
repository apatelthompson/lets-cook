import { NextResponse } from "next/server";
import crypto from "crypto";
import { google } from "googleapis";

export const runtime = "nodejs";

const DATES_101 = ["2026-05-08", "2026-05-15"];
const DATES_201 = ["2026-05-22", "2026-05-29"];

const GROUP_TIMES = {
  morning: { start: "09:00", end: "10:30", label: "9–10:30am PT" },
  noon:    { start: "12:00", end: "13:30", label: "noon–1:30pm PT" },
} as const;

const TIMEZONE = "America/Los_Angeles";

interface TypeformAnswer {
  type: string;
  field?: { ref?: string; title?: string; type?: string };
  email?: string;
  text?: string;
  phone_number?: string;
  number?: number;
  boolean?: boolean;
  choice?: { label?: string; other?: string };
  choices?: { labels?: string[] };
  payment?: { amount?: string; currency?: string };
}

interface TypeformPayload {
  form_response?: { token?: string; answers?: TypeformAnswer[] };
}

function eventIdFor(token: string, date: string): string {
  return crypto.createHash("sha256").update(`${token}:${date}`).digest("hex");
}

function verifySignature(rawBody: string, header: string | null, secret: string | undefined): boolean {
  if (!header || !secret) return false;
  const expected =
    "sha256=" +
    crypto.createHmac("sha256", secret).update(rawBody).digest("base64");
  const a = Buffer.from(expected);
  const b = Buffer.from(header);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function answerValue(a: TypeformAnswer): string {
  if (a.type === "email") return a.email ?? "";
  if (a.type === "text" || a.type === "short_text" || a.type === "long_text") return a.text ?? "";
  if (a.type === "choice") return a.choice?.label ?? a.choice?.other ?? "";
  if (a.type === "choices") return (a.choices?.labels ?? []).join(", ");
  if (a.type === "phone_number") return a.phone_number ?? "";
  if (a.type === "number") return a.number != null ? String(a.number) : "";
  if (a.type === "boolean") return a.boolean ? "Yes" : "No";
  if (a.type === "payment") return a.payment ? `${a.payment.amount} ${a.payment.currency}` : "";
  return "";
}

function parseAnswers(payload: TypeformPayload) {
  const answers = payload?.form_response?.answers ?? [];
  let email: string | null = null;
  let name: string | null = null;
  for (const a of answers) {
    if (!email && a.type === "email" && a.email) email = a.email;
    if (!name && (a.type === "text" || a.type === "short_text") && a.text) name = a.text;
  }
  return { email, name, answers };
}

function pickSessionChoice(answers: TypeformAnswer[]): string {
  for (const a of answers) {
    if (a.type !== "choice" && a.type !== "choices") continue;
    const label = a.choice?.label ?? a.choices?.labels?.[0] ?? "";
    if (/\b(101|201)\b/i.test(label) || /dates.*don.?t.*work/i.test(label)) {
      return label;
    }
  }
  return "";
}

interface Schedule {
  skip: boolean;
  reason?: string;
  label: string;
  dates?: string[];
  time?: typeof GROUP_TIMES[keyof typeof GROUP_TIMES];
  track?: string;
}

function resolveSchedule(label: string): Schedule {
  const s = label.toLowerCase();
  const has101 = s.includes("101");
  const has201 = s.includes("201");
  const isNoon = s.includes("noon") || /\b12\b/.test(s) || /1[:.]30\s*pm/.test(s);

  if (!has101 && !has201) {
    return { skip: true, reason: "no track in choice", label };
  }

  const dates: string[] = [];
  if (has101) dates.push(...DATES_101);
  if (has201) dates.push(...DATES_201);
  const time = isNoon ? GROUP_TIMES.noon : GROUP_TIMES.morning;
  const track = has101 && has201 ? "🍍 AI 101 + 201" : has101 ? "🌴 AI 101" : "🌺 AI 201";

  return { skip: false, dates, time, track, label };
}

function buildDescription() {
  return [
    "You've signed up for AI with friends (https://mission-matrix.vercel.app/ai-with-friends)",
    "",
    "If you have any questions, please reach out to: avni@thisbeautifulchaos.org",
    "",
    "👯‍♀️ btw learning and experimenting is more fun with a buddy — refer a friend who signs up and you'll get $50 back.",
  ].join("\n");
}

function calendarClient() {
  const oauth2 = new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  );
  oauth2.setCredentials({
    refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
  });
  return google.calendar({ version: "v3", auth: oauth2 });
}

export async function POST(req: Request) {
  try {
    return await handle(req);
  } catch (err: unknown) {
    const e = err as { message?: string; stack?: string };
    console.error("[typeform-webhook] top-level error", err);
    return NextResponse.json({
      ok: false,
      stage: "top-level",
      message: e?.message ?? String(err),
      stack: e?.stack?.split("\n").slice(0, 6).join("\n"),
    }, { status: 500 });
  }
}

async function handle(req: Request) {
  const rawBody = await req.text();

  const sig = req.headers.get("typeform-signature");
  if (!verifySignature(rawBody, sig, process.env.TYPEFORM_WEBHOOK_SECRET)) {
    return NextResponse.json({ ok: false, error: "Invalid signature" }, { status: 401 });
  }

  let payload: TypeformPayload;
  try {
    payload = JSON.parse(rawBody) as TypeformPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { email, name, answers } = parseAnswers(payload);
  if (!email) {
    return NextResponse.json({ ok: false, error: "No email in submission" }, { status: 400 });
  }

  const choice = pickSessionChoice(answers);
  const schedule = resolveSchedule(choice);

  if (schedule.skip) {
    return NextResponse.json({
      ok: true,
      attendee: email,
      skipped: schedule.reason,
      label: choice,
    });
  }

  const token = payload.form_response?.token;
  if (!token) {
    return NextResponse.json({ ok: false, error: "Missing form_response.token" }, { status: 400 });
  }

  const calendar = calendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";
  const description = buildDescription();
  const summary = `AI with Friends (${schedule.track})`;

  const created: string[] = [];
  const skipped: string[] = [];
  for (const date of schedule.dates ?? []) {
    const id = eventIdFor(token, date);
    try {
      const ev = await calendar.events.insert({
        calendarId,
        sendUpdates: "all",
        requestBody: {
          id,
          summary,
          description,
          start: { dateTime: `${date}T${schedule.time!.start}:00`, timeZone: TIMEZONE },
          end:   { dateTime: `${date}T${schedule.time!.end}:00`,   timeZone: TIMEZONE },
          attendees: [{ email, displayName: name ?? undefined }],
          guestsCanModify: false,
          guestsCanInviteOthers: false,
        },
      });
      if (ev.data.id) created.push(ev.data.id);
    } catch (err: unknown) {
      const e = err as { message?: string; code?: number; errors?: unknown };
      if (e?.code === 409) {
        skipped.push(id);
        continue;
      }
      console.error("[typeform-webhook] calendar error", err);
      return NextResponse.json({
        ok: false,
        stage: "calendar.events.insert",
        message: e?.message ?? String(err),
        code: e?.code,
        errors: e?.errors,
        calendarId,
        created,
        skipped,
      }, { status: 500 });
    }
  }

  return NextResponse.json({
    ok: true,
    attendee: email,
    track: schedule.track,
    time: schedule.time?.label,
    eventsCreated: created.length,
    eventsSkipped: skipped.length,
  });
}
