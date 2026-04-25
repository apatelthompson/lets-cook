# 28 Days of AI — SMS drip program

## What it is
Next.js 14 (App Router, TypeScript) app on Vercel. Users sign up on a web form and receive one sequential message per day for 28 days, delivered at 10am in their local timezone. Content + subscribers live in Airtable. Supports images and links in messages.

**Production URL**: https://lets-cook-rho.vercel.app
**Planned custom domain**: `28days.thisbeautifulchaos.org` (DNS managed via Netlify — deferred)

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
- `src/app/page.tsx` — signup form (with consent checkbox, Terms/Privacy links)
- `src/app/terms/page.tsx` — Terms of Service
- `src/app/privacy/page.tsx` — Privacy Policy
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

## Env vars (Vercel, all populated & pointing to NEW Twilio account)
```
AIRTABLE_API_KEY=pat...
AIRTABLE_BASE_ID=appyRMXrUgQny9twd
TWILIO_ACCOUNT_SID=AC...          # NEW "Beautiful Chaos" account
TWILIO_AUTH_TOKEN=...              # NEW account's token
TWILIO_FROM_NUMBER=+18087467470    # Hawaii local number (intentional for brand vibes)
TWILIO_MOCK=0
CRON_SECRET=dc184a2a5c6ae65394b58b047135643a511acc1cef3c52ef01847316161647c9
```

GitHub Actions secrets (for cron):
- `VERCEL_APP_URL=https://lets-cook-rho.vercel.app`
- `CRON_SECRET` (same value as Vercel)

## Current status

### 🛑 SMS project ON HOLD (as of 2026-04-24)
Second A2P 10DLC campaign rejection. User paused work to stop spending money on resubmissions. Active focus is now Mission Matrix and AI with Friends (sibling routes in this same repo). Resume SMS when ready to invest in another resubmission attempt.

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

### ⚠️ Blocked: A2P 10DLC Campaign REJECTED
Two rejection reasons returned by TCR:
1. **Opt-in information** — TCR wants explicit consent language including program name, frequency ("one per day"), STOP/HELP, and "msg & data rates may apply"; checkbox must be required (not pre-checked) and submit disabled until checked
2. **CTA verification** — Description of landing page CTA didn't match what the reviewer saw

No detailed rejection email received. Real SMS delivery blocked by carriers (error 30034) until campaign approves. $15 per resubmission.

## Next steps (where we stopped)

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

## Design state (in flux, branch `claude/aloha-palm-springs-vibes`)

- **Deployed (commit 31de147)**: Dusk scene with single palm tree silhouette, bright magic-hour sky gradient (indigo→magenta→coral→yellow), moon, stars, layered mountain ridges
- **Local only, uncommitted**: iPhone mockup design — iMessage-style phone on left showing Day 1 preview (Dynamic Island, status bar, iMessage chrome, typing indicator), form on right. Two-column layout fits in viewport without scroll. Warm cream background.
- User wanted scrapbook/polaroid/enamel-pin aesthetic originally but landed on dusk palm; now exploring SMS product-focused iPhone mockup direction

## Important context / gotchas
- **Two Twilio accounts exist**. Original account has `+14243221233` (unused now). NEW "Beautiful Chaos" account has `+18087467470`, Brand, Customer Profile, Messaging Service, and campaign registration. All Vercel creds point at NEW account. Do not confuse them.
- **Preview deployments persist forever** on Vercel. Always use the canonical production URL `https://lets-cook-rho.vercel.app`. Old previews (e.g. with `-i42z9m2fa-` hash in URL) can serve stale code including deleted Sendblue integration.
- **Twilio Console CSRF tokens expire**. If campaign/messaging-service Create buttons return bare HTTP 403 "Forbidden" with text/html response, log out & log back in to refresh session — not a real permission issue.
- **"User cannot perform this status update"** on brand registration = stuck brand from earlier attempt. Delete and retry.
- **Twilio errors use snake_case** (`from_number` in error messages) — this is just how Twilio formats validation errors.
- **Tried Sendblue first** (blue-bubble iMessage relay) — pivoted due to $100/mo pricing and "no blast" TOS risking account ban. Briefly considered Loopmessage. Landed on Twilio for reliability.
- **Green bubble, not blue** — accepted trade-off for using Twilio.
- **iMessage auto-unfurls only the FIRST URL** in a message body. Put the "hero" link first or last on its own line.
- **Welcome message (Day 0)** — sends immediately at signup. Falls back to: `"You're in. Your first real message arrives tomorrow at 10am. Reply STOP any time to unsubscribe."`
- **Day 1 arrives morning AFTER signup** (predictable cross-timezone).
- **User is non-technical-ish**: walk through Terminal/Vercel/GitHub steps carefully, one at a time. Avoid walls of instructions.
- **Sole prop A2P limits** (new, 2026): 3,000 segments/day, 1 segment/sec. Setup cost: $4.50 brand + $15 campaign vetting (per attempt).

## User info
- GitHub: `apatelthompson`
- Repo: `apatelthompson/lets-cook`
- Local path: `~/Projects/aligned-ai` (renamed from `lets-cook` — umbrella folder for Mission Matrix, AI with Friends, and 28 Days SMS)
- GitHub repo still named `lets-cook` (not renamed)
- User's phone: `+12069534230` (verified in NEW Twilio account)
- Support email: `avni@thisbeautifulchaos.org`
- Domain `thisbeautifulchaos.org` is owned, DNS via Netlify
- Mac, Node v24.13.0
