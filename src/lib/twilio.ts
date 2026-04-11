import { config } from "./config";

export interface SendMessageInput {
  to: string; // E.164
  body: string;
  mediaUrl?: string;
}

export interface SendMessageResult {
  ok: boolean;
  id?: string;
  error?: string;
  mocked?: boolean;
}

/**
 * Send an SMS/MMS via Twilio's REST API.
 *
 * Docs: https://www.twilio.com/docs/sms/api/message-resource
 *
 * When TWILIO_MOCK=1 or credentials are missing, logs to console instead
 * of making a network call — lets you smoke-test the full flow without
 * hitting Twilio (and without spending credits).
 *
 * Uses plain fetch + Basic auth so we don't need the Twilio Node SDK as
 * a dependency. The Messages endpoint takes application/x-www-form-urlencoded,
 * not JSON.
 */
export async function sendMessage(input: SendMessageInput): Promise<SendMessageResult> {
  if (config.twilio.mock) {
    console.log("[twilio:mock] ->", {
      to: input.to,
      from: config.twilio.fromNumber,
      body: input.body,
      mediaUrl: input.mediaUrl,
    });
    return { ok: true, mocked: true, id: `mock_${Date.now()}` };
  }

  if (!config.twilio.accountSid || !config.twilio.authToken || !config.twilio.fromNumber) {
    return {
      ok: false,
      error:
        "Twilio is not configured. Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER.",
    };
  }

  const form = new URLSearchParams();
  form.set("From", config.twilio.fromNumber);
  form.set("To", input.to);
  form.set("Body", input.body);
  if (input.mediaUrl) {
    form.set("MediaUrl", input.mediaUrl);
  }

  const url = `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(
    config.twilio.accountSid,
  )}/Messages.json`;

  const auth = Buffer.from(
    `${config.twilio.accountSid}:${config.twilio.authToken}`,
  ).toString("base64");

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
    });

    const data = (await res.json().catch(() => ({}))) as {
      sid?: string;
      error_code?: number | null;
      error_message?: string | null;
      message?: string;
      status?: string;
    };

    if (!res.ok || data.error_code) {
      return {
        ok: false,
        error: data.error_message || data.message || `HTTP ${res.status}`,
      };
    }
    return { ok: true, id: data.sid };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
