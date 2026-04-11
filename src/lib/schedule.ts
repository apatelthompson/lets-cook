import { config } from "./config";
import {
  fetchMessages,
  hasSent,
  listActiveSubscribers,
  logSend,
  updateSubscriber,
  type ProgramMessage,
  type Subscriber,
} from "./airtable";
import { sendMessage } from "./sendblue";
import { localDayDiff, partsInTimezone } from "./timezone";

export interface RunResult {
  checked: number;
  sent: number;
  skipped: number;
  failed: number;
  completed: number;
  details: Array<{
    phone: string;
    action: "sent" | "skipped" | "failed" | "completed";
    day?: number;
    reason?: string;
  }>;
}

/**
 * Decide whether a subscriber is due to receive a message right now, and
 * which day number they should receive. Returns null if they should be
 * skipped this tick.
 *
 * Rules:
 *  - Day 1 arrives the morning AFTER signup (so daysSinceSignup must be >= 1)
 *  - Must be at the delivery hour in the subscriber's local time
 *  - Must not have already been sent that day
 *  - Program caps at config.programLengthDays (default 28)
 */
export function dueDayForSubscriber(
  sub: Subscriber,
  now: Date,
): { dueDay: number } | { skipReason: string } {
  if (sub.status !== "active") return { skipReason: `status=${sub.status}` };
  if (!sub.timezone || !sub.signupLocalDate) {
    return { skipReason: "missing tz or signup date" };
  }

  const localHour = partsInTimezone(now, sub.timezone).hour;
  if (localHour !== config.deliveryHour) {
    return { skipReason: `local hour ${localHour} != ${config.deliveryHour}` };
  }

  const daysSince = localDayDiff(sub.signupLocalDate, now, sub.timezone);
  if (daysSince < 1) return { skipReason: "before day 1" };
  if (daysSince > config.programLengthDays) {
    return { skipReason: "program finished" };
  }
  if (daysSince <= sub.lastSentDay) {
    return { skipReason: `already sent day ${daysSince}` };
  }

  return { dueDay: daysSince };
}

/**
 * Run one scheduling tick. Safe to call hourly; idempotent per (phone, day)
 * via the SendLog table and LastSentDay field.
 */
export async function runTick(now: Date = new Date()): Promise<RunResult> {
  const result: RunResult = {
    checked: 0,
    sent: 0,
    skipped: 0,
    failed: 0,
    completed: 0,
    details: [],
  };

  const [messages, subs] = await Promise.all([
    fetchMessages(),
    listActiveSubscribers(),
  ]);

  for (const sub of subs) {
    result.checked++;
    const decision = dueDayForSubscriber(sub, now);
    if ("skipReason" in decision) {
      result.skipped++;
      result.details.push({
        phone: sub.phone,
        action: "skipped",
        reason: decision.skipReason,
      });
      continue;
    }

    const day = decision.dueDay;
    const msg: ProgramMessage | undefined = messages.get(day);
    if (!msg) {
      result.failed++;
      result.details.push({
        phone: sub.phone,
        action: "failed",
        day,
        reason: "message not found in Airtable",
      });
      continue;
    }

    // Extra idempotency guard — e.g. if two cron ticks race, or LastSentDay
    // wasn't written before a retry.
    if (await hasSent(sub.phone, day)) {
      await updateSubscriber(sub.id, { lastSentDay: day });
      result.skipped++;
      result.details.push({
        phone: sub.phone,
        action: "skipped",
        day,
        reason: "already in SendLog",
      });
      continue;
    }

    const body = composeBody(msg);
    const send = await sendMessage({
      to: sub.phone,
      body,
      mediaUrl: msg.imageUrl,
    });

    if (!send.ok) {
      result.failed++;
      await logSend({
        phone: sub.phone,
        day,
        status: "failed",
        error: send.error,
      });
      result.details.push({
        phone: sub.phone,
        action: "failed",
        day,
        reason: send.error,
      });
      continue;
    }

    await logSend({ phone: sub.phone, day, status: "sent" });
    const isLast = day >= config.programLengthDays;
    await updateSubscriber(sub.id, {
      lastSentDay: day,
      status: isLast ? "completed" : "active",
    });
    result.sent++;
    result.details.push({ phone: sub.phone, action: "sent", day });
    if (isLast) {
      result.completed++;
      result.details.push({ phone: sub.phone, action: "completed", day });
    }
  }

  return result;
}

function composeBody(msg: ProgramMessage): string {
  // iMessage auto-unfurls URLs, so just append the link on its own line.
  if (msg.linkUrl && !msg.body.includes(msg.linkUrl)) {
    return `${msg.body}\n\n${msg.linkUrl}`;
  }
  return msg.body;
}

export { composeBody };
