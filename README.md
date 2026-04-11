# Let's Cook — 28 day SMS program

A small Next.js app that signs people up on a website and delivers one SMS
per day for 28 days at 10am local time. Messages are authored in Airtable and
sent via [Twilio](https://www.twilio.com).

## How it works

```
  Signup site  ─┐
  (Next.js)     │
                ▼
            Airtable  ─── 28 Messages  (you edit these)
               ▲  ▲
               │  └── Subscribers  (phone, tz, signup date, progress)
               │  └── SendLog      (idempotency + audit trail)
               │
  GitHub     ─┘   hourly → /api/cron
  Actions         For each active subscriber whose local hour == 10
                  and local date == signup + N, send message N via Twilio.

  Twilio → SMS/MMS → 📱
  Inbound STOP → /api/webhook/twilio → mark unsubscribed in Airtable
```

- **Delivery hour is per-recipient local time.** Timezone is auto-detected at
  signup from Vercel's `x-vercel-ip-timezone` header, falling back to
  `America/Los_Angeles`.
- **Cron runs hourly.** Each tick picks up subscribers whose local hour is 10.
  This gives you one delivery opportunity per subscriber per day — idempotent
  thanks to the `LastSentDay` field and the `SendLog` table.
- **Day 1 arrives the morning after signup**, not the same day.
- **Mock mode** lets you run end-to-end locally with no Twilio account —
  just set `TWILIO_MOCK=1` and outgoing messages are logged to the console.

## Airtable setup

Create a new base with three tables.

### Table 1: `Messages`

| Field          | Type          | Notes                                  |
| -------------- | ------------- | -------------------------------------- |
| `Day`          | Number        | 1 through 28 (primary field)           |
| `Body`         | Long text     | The message body                       |
| `ImageURL`     | URL           | Optional. Publicly reachable image URL |
| `LinkURL`      | URL           | Optional. Appended to body on its own line |

Populate 28 rows, one per day.

> **Image hosting note.** Don't use Airtable attachments for `ImageURL` —
> their signed URLs expire. Host images on S3 / Cloudinary / a GitHub repo /
> anywhere with a stable public URL, and paste that URL into the `ImageURL`
> field.

### Table 2: `Subscribers`

| Field              | Type          | Notes                                        |
| ------------------ | ------------- | -------------------------------------------- |
| `Phone`            | Single line   | E.164 format (e.g. `+14155551234`). Primary. |
| `Name`             | Single line   | Optional                                    |
| `Timezone`         | Single line   | IANA tz (e.g. `America/Los_Angeles`)        |
| `SignupLocalDate`  | Single line   | `YYYY-MM-DD` in the subscriber's tz          |
| `Status`           | Single select | `active`, `completed`, `unsubscribed`        |
| `LastSentDay`      | Number        | 0 before any sends; 28 when done             |

### Table 3: `SendLog`

| Field     | Type          | Notes                                |
| --------- | ------------- | ------------------------------------ |
| `Phone`   | Single line   | E.164                               |
| `Day`     | Number        | 1–28                                |
| `Status`  | Single select | `sent`, `failed`                    |
| `Error`   | Long text     | Populated on failure                |
| `SentAt`  | Date (w/ time)| ISO timestamp                       |

Get an Airtable personal access token at
<https://airtable.com/create/tokens> with scopes
`data.records:read`, `data.records:write`, `schema.bases:read`
and access to this one base.

## Local development

```bash
cp .env.example .env.local
# Fill in AIRTABLE_API_KEY and AIRTABLE_BASE_ID
# Leave SENDBLUE_MOCK=1 for now
npm install
npm run dev
```

Open <http://localhost:3000> and sign up with a test phone number. You should
see a row appear in the `Subscribers` table.

### Testing the cron manually

```bash
curl -H "Authorization: Bearer $(grep CRON_SECRET .env.local | cut -d= -f2)" \
     http://localhost:3000/api/cron
```

With `TWILIO_MOCK=1`, outgoing messages are logged to the terminal running
`npm run dev` — no real messages are sent. To test a send right now, set your
subscriber's `SignupLocalDate` to yesterday in their timezone and make sure
your local clock is at the `DELIVERY_HOUR` (default 10).

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel.
3. Add environment variables from `.env.example` in the Vercel project settings.
4. Deploy.

### Scheduler

The `/api/cron` endpoint is hit **hourly from GitHub Actions**, not from
Vercel Cron. Vercel's Hobby (free) plan only allows cron jobs to run once
per day, but this program needs an hourly tick to support per-recipient
timezones (10am PST and 10am EST happen at different UTC hours).

The workflow lives at `.github/workflows/cron.yml`. It runs `curl` against
your deployed `/api/cron` endpoint with the `CRON_SECRET` as a bearer token.
Add these two repo secrets at `Settings -> Secrets and variables -> Actions`:

| Secret            | Value                                        |
| ----------------- | -------------------------------------------- |
| `VERCEL_APP_URL`  | e.g. `https://lets-cook-xyz.vercel.app`      |
| `CRON_SECRET`     | same value you set in Vercel                 |

You can manually trigger a tick at any time from the **Actions** tab in
GitHub (pick "cron — hourly drip tick" → "Run workflow"), which is useful
for debugging without waiting for the next scheduled run.

## Twilio setup

1. Sign up at <https://www.twilio.com>. The trial account comes with $15 in
   credit, which is plenty for smoke testing.
2. Buy a phone number ($1/month). During trial you can only send to verified
   numbers (add your own phone to "Verified Caller IDs" in the console).
3. Copy your **Account SID** and **Auth Token** from the console home page.
4. Set `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER`, and
   `TWILIO_MOCK=0` in Vercel.
5. In the Twilio console, go to **Phone Numbers -> Manage -> Active numbers**,
   click your number, and under **Messaging -> A message comes in**, set the
   webhook to:
   ```
   https://<your-domain>/api/webhook/twilio
   ```
   Method: `HTTP POST`. This is how STOP replies flow back to Airtable.
6. For production (any real recipient volume), complete A2P 10DLC brand
   and campaign registration in the Twilio console. Takes 1-2 weeks to
   approve but is required for reliable US carrier delivery.

## Compliance notes

- The STOP handler matches `STOP / UNSUBSCRIBE / CANCEL / END / QUIT / STOPALL`
  (standard CTIA keywords) and flips the subscriber's Status to
  `unsubscribed`. Twilio's own carrier layer also auto-sends a standard
  unsubscribe confirmation, so we return an empty TwiML response.
- The signup form includes opt-in language. Keep it — US carriers require
  it for compliant A2P SMS programs.
- The webhook verifies `X-Twilio-Signature` before acting on any inbound
  request, so spoofed STOP requests can't unsubscribe arbitrary numbers.

## Files worth knowing

- `src/app/page.tsx` — signup form
- `src/app/api/signup/route.ts` — signup handler, phone validation + tz capture
- `src/app/api/cron/route.ts` — hourly cron entrypoint
- `src/app/api/webhook/twilio/route.ts` — inbound STOP handler + signature verification
- `src/lib/schedule.ts` — the "who's due right now" logic
- `src/lib/twilio.ts` — send adapter (with mock mode)
- `src/lib/airtable.ts` — all Airtable reads/writes
- `src/lib/timezone.ts` — IANA tz math
- `.github/workflows/cron.yml` — hourly GitHub Actions cron
