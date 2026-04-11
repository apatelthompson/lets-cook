import { parsePhoneNumberFromString } from "libphonenumber-js";

/**
 * Normalize a user-supplied phone number to E.164 format (e.g. +14155551234).
 * Defaults to US when no country code is provided.
 * Returns null if the number is invalid.
 */
export function toE164(input: string, defaultCountry: "US" = "US"): string | null {
  if (!input) return null;
  const parsed = parsePhoneNumberFromString(input, defaultCountry);
  if (!parsed || !parsed.isValid()) return null;
  return parsed.number; // E.164
}
