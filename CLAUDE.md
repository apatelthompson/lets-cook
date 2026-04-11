# Let's Cook — 28-day SMS drip program

## What it is
Next.js 14 (App Router, TypeScript) app on Vercel. Users sign up on a web form, and receive one sequential message per day for 28 days, delivered at 10am in their local timezone. Content + subscribers live in Airtable. Supports images and links in messages.

## Architecture
```
Signup site → /api/signup → Airtable (Subscribers) + immediate Day 0 welcome send
                              ↑
GitHub Actions cron (hourly) → /api/cron → Airtable (Messages, SendLog) → Twilio → SMS/MMS
                                       ↓
Inbound STOP → /api/webhook/twilio → Airtable (unsubscribe)
```

- **Per-recipient local 10am** via Vercel's `x-vercel-ip-timezone` header; fallback `America/Los_Angeles`
- **Day 0** sends immediately at signup (welcome message). Days 1–28 fire via cron.
- **Idempotent**: `LastSentDay` on Subscribers + SendLog pre-check prevents double-sends
- **Auto-completion**: status flips to `completed` after day 28
- **Cron runs on GitHub Actions** (not Vercel Cron — Vercel Hobby only allows daily). Hourly ticks are needed for per-timezone delivery.

## Key files
- `src/app/page.tsx` — signup form
- `src/app/api/signup/route.ts` — E.164 validation, tz capture, sends Day 0 welcome
- `src/app/api/cron/route.ts` — hourly entrypoint, guarded by `CRON_SECRET`
- `src/app/api/webhook/twilio/route.ts` — STOP handler, validates Twilio signature
- `src/lib/schedule.ts` — `dueDayForSubscriber` decides who gets what
- `src/lib/twilio.ts` — Twilio adapter (supports `TWILIO_MOCK=1` for local dev)
- `src/lib/airtable.ts` — typed reads/writes for Messages, Subscribers, SendLog
- `src/lib/timezone.ts` — DST-safe calendar-day math
- `.github/workflows/cron.yml` — hourly cron (uses `VERCEL_APP_URL` + `CRON_SECRET` secrets)

## Airtable schema (base: `appyRMXrUgQny9twd`)
**Messages** (primary: Day)
- Day (number int, 0–28; Day 0 = welcome, optional — falls back to hardcoded string)
- Body (long text)
- ImageURL (URL, optional — must be publicly hosted, NOT Airtable attachments)
- LinkURL (URL, optional — can also just put links inline in Body)

**Subscribers** (primary: Phone)
- Phone (text, E.164 format)
- Name (text)
- Timezone (text)
- SignupLocalDate (text, YYYY-MM-DD)
- Status (single select: active / completed / unsubscribed)
- LastSentDay (number int)

**SendLog**
- Phone, Day, Status (sent/failed), Error, SentAt (datetime ISO)

Extra custom columns anywhere are fine — code only reads the known fields.

## Env vars
```
AIRTABLE_API_KEY=pat...
AIRTABLE_BASE_ID=appyRMXrUgQny9twd
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_FROM_NUMBER=+14243221233
TWILIO_MOCK=0    # 1 = local dev, logs to console
CRON_SECRET=dc184a2a5c6ae65394b58b047135643a511acc1cef3c52ef01847316161647c9
```

## Current status (as of conversation end)
- ✅ Code deployed to Vercel from `main` (PR #1 merged). Branch: `claude/sms-messaging-program-9hH79`
- ✅ Airtable base set up with all 3 tables and field names matching
- ✅ Signup flow works end-to-end (writes Subscriber + Day 0 welcome + SendLog row)
- ✅ Twilio configured, phone `+14243221233` (424 Santa Monica), user's phone `+12069534230` verified as caller ID
- ✅ Twilio API calls succeed (SendLog shows `sent`)
- ⚠️ **Messages not actually delivered to handsets**: Twilio error 30034 — A2P 10DLC not registered. US carriers silently drop unregistered long-code messages.
- ⚠️ **GitHub Actions cron failing**: `VERCEL_APP_URL` secret points at a stale/deleted deployment, returns `DEPLOYMENT_NOT_FOUND`. Needs to be updated to canonical production URL.

## Next steps (where we stopped)
1. **Fix `VERCEL_APP_URL`** GitHub secret — get canonical production URL from Vercel dashboard, update `https://github.com/apatelthompson/lets-cook/settings/secrets/actions`, re-run cron workflow to verify HTTP 200.
2. **Register A2P 10DLC Sole Proprietor** in Twilio Console → Regulatory Compliance → US A2P 10DLC. ~$4 one-time + ~$2/mo. Approves in hours-to-days. Unblocks real delivery with no code changes.
3. **Populate Messages table** with all 28 days of content (plus optional Day 0 welcome).
4. While waiting for 10DLC: set `TWILIO_MOCK=1` in Vercel to keep iterating without confusing failed sends.
5. Style the signup form (deferred).

## Important context / gotchas
- **Preview deployments persist forever** on Vercel. Older previews with old code (e.g. Sendblue) can be accidentally hit via bookmarks. Always use the canonical production URL.
- **Twilio errors use snake_case** (`from_number` in error messages) — this is NOT a leftover Sendblue reference. Twilio just formats validation errors that way.
- **We tried Sendblue first** (blue-bubble iMessage relay) but pivoted to Twilio: Sendblue was $100/mo, has "no blast" TOS restrictions that risked account ban for drip sends at the 10am tick.
- **Briefly considered Loopmessage** but pivoted to Twilio for reliability (legit carrier-backed, designed for drips).
- **Green bubble, not blue** — the accepted trade-off for using Twilio.
- **iMessage auto-unfurls only the FIRST URL** in a message body. Put the "hero" link first or last on its own line.
- **Welcome message (Day 0)** — sends immediately at signup, falls back to: `"You're in. Your first real message arrives tomorrow at 10am. Reply STOP any time to unsubscribe."`
- **Day 1 arrives morning AFTER signup** (predictable cross-timezone).
- **User is non-technical-ish**: walk through Terminal/Vercel/GitHub steps carefully, one at a time. Avoid walls of instructions.

## User info
- GitHub: `apatelthompson`
- Repo: `apatelthompson/lets-cook`
- Local path: `~/Projects/lets-cook`
- User's phone: `+12069534230` (verified in Twilio trial)
- Mac, Node v24.13.0
