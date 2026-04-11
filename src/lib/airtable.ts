import Airtable, { type FieldSet, type Record as AirRecord } from "airtable";
import { config } from "./config";

let _base: Airtable.Base | null = null;
function base(): Airtable.Base {
  if (_base) return _base;
  if (!config.airtable.apiKey || !config.airtable.baseId) {
    throw new Error(
      "Airtable is not configured. Set AIRTABLE_API_KEY and AIRTABLE_BASE_ID.",
    );
  }
  _base = new Airtable({ apiKey: config.airtable.apiKey }).base(
    config.airtable.baseId,
  );
  return _base;
}

// ---------- Messages ----------

export interface ProgramMessage {
  day: number;
  body: string;
  imageUrl?: string;
  linkUrl?: string;
}

/** Fetch all 28 messages, keyed by day number. */
export async function fetchMessages(): Promise<Map<number, ProgramMessage>> {
  const records = await base()(config.airtable.messagesTable)
    .select({ pageSize: 100 })
    .all();
  const byDay = new Map<number, ProgramMessage>();
  for (const r of records) {
    const day = Number(r.get("Day"));
    if (!Number.isFinite(day)) continue;
    byDay.set(day, {
      day,
      body: String(r.get("Body") ?? ""),
      imageUrl: (r.get("ImageURL") as string) || undefined,
      linkUrl: (r.get("LinkURL") as string) || undefined,
    });
  }
  return byDay;
}

export async function fetchMessage(day: number): Promise<ProgramMessage | null> {
  const all = await fetchMessages();
  return all.get(day) ?? null;
}

// ---------- Subscribers ----------

export interface Subscriber {
  id: string; // Airtable record id
  phone: string; // E.164
  name?: string;
  timezone: string;
  signupLocalDate: string; // YYYY-MM-DD in subscriber's tz
  status: "active" | "completed" | "unsubscribed";
  lastSentDay: number; // 0 before any sends
}

function toSubscriber(r: AirRecord<FieldSet>): Subscriber {
  return {
    id: r.id,
    phone: String(r.get("Phone") ?? ""),
    name: (r.get("Name") as string) || undefined,
    timezone: String(r.get("Timezone") ?? ""),
    signupLocalDate: String(r.get("SignupLocalDate") ?? ""),
    status: ((r.get("Status") as string) || "active") as Subscriber["status"],
    lastSentDay: Number(r.get("LastSentDay") ?? 0),
  };
}

export async function findSubscriberByPhone(phone: string): Promise<Subscriber | null> {
  const safe = phone.replace(/'/g, "\\'");
  const records = await base()(config.airtable.subscribersTable)
    .select({
      filterByFormula: `{Phone} = '${safe}'`,
      maxRecords: 1,
    })
    .firstPage();
  if (records.length === 0) return null;
  return toSubscriber(records[0]);
}

export async function createSubscriber(input: {
  phone: string;
  name?: string;
  timezone: string;
  signupLocalDate: string;
}): Promise<Subscriber> {
  const [rec] = await base()(config.airtable.subscribersTable).create([
    {
      fields: {
        Phone: input.phone,
        Name: input.name ?? "",
        Timezone: input.timezone,
        SignupLocalDate: input.signupLocalDate,
        Status: "active",
        LastSentDay: 0,
      },
    },
  ]);
  return toSubscriber(rec);
}

export async function listActiveSubscribers(): Promise<Subscriber[]> {
  const records = await base()(config.airtable.subscribersTable)
    .select({
      filterByFormula: `{Status} = 'active'`,
      pageSize: 100,
    })
    .all();
  return records.map(toSubscriber);
}

export async function updateSubscriber(
  id: string,
  patch: Partial<Pick<Subscriber, "status" | "lastSentDay">>,
): Promise<void> {
  const fields: Partial<FieldSet> = {};
  if (patch.status !== undefined) fields.Status = patch.status;
  if (patch.lastSentDay !== undefined) fields.LastSentDay = patch.lastSentDay;
  await base()(config.airtable.subscribersTable).update([{ id, fields }]);
}

export async function unsubscribeByPhone(phone: string): Promise<boolean> {
  const sub = await findSubscriberByPhone(phone);
  if (!sub) return false;
  await updateSubscriber(sub.id, { status: "unsubscribed" });
  return true;
}

// ---------- SendLog (idempotency) ----------

export async function hasSent(phone: string, day: number): Promise<boolean> {
  const safe = phone.replace(/'/g, "\\'");
  const records = await base()(config.airtable.sendLogTable)
    .select({
      filterByFormula: `AND({Phone} = '${safe}', {Day} = ${day})`,
      maxRecords: 1,
    })
    .firstPage();
  return records.length > 0;
}

export async function logSend(input: {
  phone: string;
  day: number;
  status: "sent" | "failed";
  error?: string;
}): Promise<void> {
  await base()(config.airtable.sendLogTable).create([
    {
      fields: {
        Phone: input.phone,
        Day: input.day,
        Status: input.status,
        Error: input.error ?? "",
        SentAt: new Date().toISOString(),
      },
    },
  ]);
}
