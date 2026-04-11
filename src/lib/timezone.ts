import { config } from "./config";

/**
 * Validate an IANA timezone string via Intl.
 */
export function isValidTimezone(tz: string): boolean {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

/**
 * Extract timezone from a Next.js request. Vercel sets `x-vercel-ip-timezone`
 * on incoming requests; locally this header will be absent, so we fall back
 * to the configured default (America/Los_Angeles).
 */
export function timezoneFromHeaders(headers: Headers): string {
  const fromVercel = headers.get("x-vercel-ip-timezone");
  if (fromVercel && isValidTimezone(fromVercel)) return fromVercel;
  return config.defaultTimezone;
}

/**
 * Return parts of a Date rendered in a given IANA timezone.
 */
export function partsInTimezone(date: Date, tz: string) {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts: Record<string, string> = {};
  for (const p of fmt.formatToParts(date)) {
    if (p.type !== "literal") parts[p.type] = p.value;
  }
  // Intl sometimes renders midnight as hour "24" in hour12:false mode.
  const hour = parts.hour === "24" ? "00" : parts.hour;
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(hour),
    minute: Number(parts.minute),
    isoDate: `${parts.year}-${parts.month}-${parts.day}`, // YYYY-MM-DD
  };
}

/**
 * Calendar-day difference (today - base) in a given timezone. Compares
 * calendar dates, not wall-clock instants, so DST transitions are safe.
 */
export function localDayDiff(baseIsoDate: string, now: Date, tz: string): number {
  const today = partsInTimezone(now, tz).isoDate;
  const [by, bm, bd] = baseIsoDate.split("-").map(Number);
  const [ty, tm, td] = today.split("-").map(Number);
  const base = Date.UTC(by, bm - 1, bd);
  const cur = Date.UTC(ty, tm - 1, td);
  return Math.round((cur - base) / 86_400_000);
}
