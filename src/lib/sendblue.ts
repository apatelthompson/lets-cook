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
 * Send a message via Sendblue's iMessage API.
 * Docs: https://sendblue.co/docs/send-message
 *
 * When SENDBLUE_MOCK=1 or credentials are missing, logs to console instead
 * of making a network call. This lets you run end-to-end flows locally
 * before you have a Sendblue account.
 */
export async function sendMessage(input: SendMessageInput): Promise<SendMessageResult> {
  if (config.sendblue.mock) {
    console.log("[sendblue:mock] ->", {
      to: input.to,
      body: input.body,
      mediaUrl: input.mediaUrl,
    });
    return { ok: true, mocked: true, id: `mock_${Date.now()}` };
  }

  try {
    const res = await fetch("https://api.sendblue.co/api/send-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "sb-api-key-id": config.sendblue.apiKey,
        "sb-api-secret-key": config.sendblue.apiSecret,
      },
      body: JSON.stringify({
        number: input.to,
        content: input.body,
        ...(config.sendblue.fromNumber
          ? { from_number: config.sendblue.fromNumber }
          : {}),
        ...(input.mediaUrl ? { media_url: input.mediaUrl } : {}),
      }),
    });
    const data = (await res.json().catch(() => ({}))) as {
      message_handle?: string;
      error_message?: string;
    };
    if (!res.ok) {
      return { ok: false, error: data.error_message || `HTTP ${res.status}` };
    }
    return { ok: true, id: data.message_handle };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
