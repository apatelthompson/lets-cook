# Mission Matrix

Umbrella Next.js 14 app (App Router, TypeScript) on Vercel hosting three workstreams.

- **Production URL**: `https://mission-matrix.vercel.app`
- **GitHub**: `apatelthompson/mission-matrix`
- **Local path**: `~/Projects/mission-matrix`
- **Vercel project**: `mission-matrix` (id `prj_bTY5JuuWOGDYKY3hr6lQNgKEAtnD`)
- **Owner**: Avni Patel Thompson (`avni@thisbeautifulchaos.org`)

## Workstreams

| Route | What it is | State |
|---|---|---|
| `/` | The Mission Matrix framework page (4-quadrant AI roles framework) | live |
| `/ai-with-friends` | Small group AI learning sessions, May 2026 cohorts, Typeform-driven signup | live, taking signups |
| `/sms`, `/terms`, `/privacy` | 28 Days of AI SMS drip program | **on hold** since 2026-04-24 (A2P 10DLC rejection, see SMS section below) |

## Architecture (current, live workstreams)

### `/` and `/ai-with-friends` (live)
Static-rendered Next.js pages. AWF page has a Typeform integration (the form itself lives on Typeform; this repo handles the resulting webhook):

```
Typeform submission → /api/typeform-webhook → verify HMAC signature
                                            → resolve cohort + dates from choice label
                                            → create Google Calendar events (one per session)
                                              (deterministic event IDs = idempotent on retry)
                                            → invitee gets the calendar invite via Google
```

### `/sms` (on hold)
SMS drip program — see SMS section below for full architecture.

## Active gotchas

- **Typeform webhook URL must be the canonical domain.** `mission-matrix.vercel.app/api/typeform-webhook` returns 308 → `themissionmatrix.com/api/typeform-webhook`. Typeform doesn't follow POST redirects, so any webhook configured against the `.vercel.app` host silently dies — Typeform sees 308 and the handler never runs. **The Typeform webhook MUST be set to `https://themissionmatrix.com/api/typeform-webhook`.** Hit on 2026-05-06 — Robin Stein signed up for the Friday full series and got no invites; fixed manually after-the-fact. If the custom domain is ever changed or added, re-verify the Typeform webhook URL immediately.
- **Cohort sync.** Tuesday and Friday cohort dates must stay in sync between [src/app/ai-with-friends/page.tsx](src/app/ai-with-friends/page.tsx) (the user-facing schedule) and the `COHORTS` const in [src/app/api/typeform-webhook/route.ts](src/app/api/typeform-webhook/route.ts) (the calendar-event generator). They were out of sync on 2026-04-30 — the webhook had only Friday dates, so a Tuesday signup got Friday calendar invites. Fixed, but the structural risk remains: any cohort change must touch both files.
- **Webhook idempotency via deterministic event IDs.** Calendar event IDs are `sha256(typeform-token + date)`. Re-running the webhook for the same signup is a no-op (returns 409 from Google, which we swallow). To genuinely re-trigger a signup, you must first delete the existing events from Google Calendar.
- **AWF cohort detection happens by string-match on the Typeform choice label.** `resolveSchedule()` reads "tues" or "fri" from the label. If the form options are renamed without those substrings, the webhook will skip with `"no cohort detected"` and no calendar invites go out. If you rename Typeform options, audit the regex.

## Decisions

See [DECISIONS.md](DECISIONS.md) at the repo root for the running log of structural decisions and trade-offs. Read it on session start along with this file.

## Key files

### Mission Matrix framework + layout
- [src/app/layout.tsx](src/app/layout.tsx) — root layout, sets default browser title "Mission Matrix" + 🎯 favicon
- [src/app/page.tsx](src/app/page.tsx) — re-exports the Mission Matrix homepage
- [src/app/mission-matrix/page.tsx](src/app/mission-matrix/page.tsx) — the framework content
- [src/app/mission-matrix.css](src/app/mission-matrix.css) — framework styles

### AI with Friends
- [src/app/ai-with-friends/page.tsx](src/app/ai-with-friends/page.tsx) — landing page (Notes-app aesthetic)
- [src/app/api/typeform-webhook/route.ts](src/app/api/typeform-webhook/route.ts) — webhook handler, calendar event creation
- See COHORTS const for source-of-truth dates

### 28 Days of AI SMS (on hold, but code exists)
- [src/app/sms/page.tsx](src/app/sms/page.tsx) — signup form (with consent checkbox, Terms/Privacy links)
- [src/app/terms/page.tsx](src/app/terms/page.tsx) — Terms of Service
- [src/app/privacy/page.tsx](src/app/privacy/page.tsx) — Privacy Policy
- [src/app/api/signup/route.ts](src/app/api/signup/route.ts) — E.164 validation, tz capture, sends Day 0 welcome
- [src/app/api/cron/route.ts](src/app/api/cron/route.ts) — hourly entrypoint, guarded by `CRON_SECRET`
- [src/app/api/webhook/twilio/route.ts](src/app/api/webhook/twilio/route.ts) — STOP handler, validates Twilio signature
- [src/lib/schedule.ts](src/lib/schedule.ts) — `dueDayForSubscriber` decides who gets what
- [src/lib/twilio.ts](src/lib/twilio.ts) — Twilio adapter (supports `TWILIO_MOCK=1` for local dev)
- [src/lib/airtable.ts](src/lib/airtable.ts) — typed reads/writes for Messages, Subscribers, SendLog
- [src/lib/timezone.ts](src/lib/timezone.ts) — DST-safe calendar-day math
- [.github/workflows/cron.yml](.github/workflows/cron.yml) — hourly cron (uses `VERCEL_APP_URL` + `CRON_SECRET` secrets)

## Env vars (Vercel — NEW Twilio account, AWF webhook)

```
# Airtable (SMS subscribers + content)
AIRTABLE_API_KEY=pat...
AIRTABLE_BASE_ID=appyRMXrUgQny9twd

# Twilio (SMS — NEW "Beautiful Chaos" account)
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_FROM_NUMBER=+18087467470    # Hawaii local number (intentional for brand vibes)
TWILIO_MOCK=0

# SMS cron
CRON_SECRET=dc184a2a5c6ae65394b58b047135643a511acc1cef3c52ef01847316161647c9

# AWF Typeform webhook → Google Calendar
TYPEFORM_WEBHOOK_SECRET=...
GOOGLE_OAUTH_CLIENT_ID=...
GOOGLE_OAUTH_CLIENT_SECRET=...
GOOGLE_OAUTH_REFRESH_TOKEN=...
GOOGLE_CALENDAR_ID=...   # defaults to 'primary' if unset
```

GitHub Actions secrets (for SMS cron):
- `VERCEL_APP_URL=https://mission-matrix.vercel.app`
- `CRON_SECRET` (same value as Vercel)

---

# 28 Days of AI — SMS drip program (ON HOLD as of 2026-04-24)

User paused work after second A2P 10DLC campaign rejection to stop spending money on resubmissions. Active focus shifted to Mission Matrix and AI with Friends. Resume SMS when ready to invest in another resubmission attempt. Detail below preserved for that resumption.

## SMS architecture

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

## SMS — current status

### ✅ Working
- Signup → Airtable → Twilio pipeline works end-to-end
- GitHub Actions hourly cron firing correctly (HTTP 200)
- Compliance: `/terms`, `/privacy`, required consent checkbox, STOP/HELP disclosure
- Twilio (new "Beautiful Chaos" account):
  - Customer Profile: **Approved**
  - Brand "Beautiful Chaos": **Registered** (Sole Proprietor)
  - Messaging Service `MG069b46638ddc6b696699339aeb1134d` with `+18087467470` in sender pool
  - Phone `+12069534230` verified as caller ID in NEW account
- Vercel env vars all point at new Twilio account

### ⚠️ Blocked: A2P 10DLC Campaign REJECTED (twice)
Two rejection reasons returned by TCR:
1. **Opt-in information** — TCR wants explicit consent language including program name, frequency ("one per day"), STOP/HELP, and "msg & data rates may apply"; checkbox must be required (not pre-checked) and submit disabled until checked
2. **CTA verification** — Description of landing page CTA didn't match what the reviewer saw

No detailed rejection email received. Real SMS delivery blocked by carriers (error 30034) until campaign approves. $15 per resubmission.

## SMS — next steps when resuming

1. **Fix A2P campaign rejection**:
   - Open Twilio support ticket first (free, gets specific TCR feedback on what to change) before burning another $15 on resubmission
   - Audit consent checkbox label on production page against TCR checklist: program name "28 Days of AI" ✓, frequency "one per day for 28 days", STOP/HELP ✓, msg&data rates ✓, Terms + Privacy links ✓
   - Update "How end-users consent" and "Campaign Description" fields in Twilio with ultra-explicit, word-for-word language matching the live page
   - Resubmit once
2. **Do NOT push design changes to production until campaign approves** — mid-review design changes risk another rejection
3. **Populate Messages table** with all 28 days of content (plus optional Day 0 welcome)
4. **Post-approval**: real SMS smoke test (sign up at prod URL → phone should buzz)
5. **Custom domain**: attach `28days.thisbeautifulchaos.org` in Vercel → add CNAME record in Netlify DNS
6. **Cleanup**: close/release old Twilio account's `+14243221233` ($1/mo otherwise)
7. **Update GitHub Actions `VERCEL_APP_URL` secret** to `https://mission-matrix.vercel.app` (currently still old URL)

## SMS — important context / gotchas

- **Two Twilio accounts exist**. Original account has `+14243221233` (unused now). NEW "Beautiful Chaos" account has `+18087467470`, Brand, Customer Profile, Messaging Service, and campaign registration. All Vercel creds point at NEW account. Do not confuse them.
- **Preview deployments persist forever** on Vercel. Always use the canonical production URL `https://mission-matrix.vercel.app`. Old previews can serve stale code.
- **Twilio Console CSRF tokens expire**. If campaign/messaging-service Create buttons return bare HTTP 403 "Forbidden" with text/html response, log out & log back in to refresh session — not a real permission issue.
- **"User cannot perform this status update"** on brand registration = stuck brand from earlier attempt. Delete and retry.
- **Twilio errors use snake_case** (`from_number` in error messages) — this is just how Twilio formats validation errors.
- **Tried Sendblue first** (blue-bubble iMessage relay) — pivoted due to $100/mo pricing and "no blast" TOS risking account ban. Briefly considered Loopmessage. Landed on Twilio for reliability.
- **Green bubble, not blue** — accepted trade-off for using Twilio.
- **iMessage auto-unfurls only the FIRST URL** in a message body. Put the "hero" link first or last on its own line.
- **Welcome message (Day 0)** — sends immediately at signup. Falls back to: `"You're in. Your first real message arrives tomorrow at 10am. Reply STOP any time to unsubscribe."`
- **Day 1 arrives morning AFTER signup** (predictable cross-timezone).
- **Sole prop A2P limits** (new, 2026): 3,000 segments/day, 1 segment/sec. Setup cost: $4.50 brand + $15 campaign vetting (per attempt).

## User context

- User is non-technical-ish: walk through Terminal/Vercel/GitHub steps carefully, one at a time. Avoid walls of instructions.
- User's phone: `+12069534230` (verified in NEW Twilio account)
- Domain `thisbeautifulchaos.org` is owned, DNS via Netlify
- Mac, Node v24.13.0
- **Planned custom domain for SMS**: `28days.thisbeautifulchaos.org` (deferred until campaign approves)
