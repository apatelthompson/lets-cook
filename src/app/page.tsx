"use client";

import { useState, type FormEvent } from "react";

type State =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "ok"; message: string }
  | { kind: "err"; message: string };

export default function Page() {
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setState({ kind: "submitting" });
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: fd.get("phone"),
          name: fd.get("name"),
        }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setState({
          kind: "err",
          message: data.error ?? "Something went wrong. Try again.",
        });
        return;
      }
      form.reset();
      setState({
        kind: "ok",
        message: "You're in. Your first message arrives tomorrow at 10am.",
      });
    } catch {
      setState({ kind: "err", message: "Network error. Try again." });
    }
  }

  return (
    <main>
      <h1>Let&apos;s Cook</h1>
      <p className="lede">
        28 days. One message each morning at 10am, straight to your iMessage.
        No app, no login.
      </p>
      <form onSubmit={onSubmit}>
        <label>
          Name (optional)
          <input name="name" type="text" autoComplete="given-name" />
        </label>
        <label>
          Phone number
          <input
            name="phone"
            type="tel"
            required
            placeholder="(415) 555-1234"
            autoComplete="tel"
            inputMode="tel"
          />
        </label>
        <button type="submit" disabled={state.kind === "submitting"}>
          {state.kind === "submitting" ? "Signing you up..." : "Start the 28 days"}
        </button>
        {state.kind === "ok" && (
          <div className="message ok">{state.message}</div>
        )}
        {state.kind === "err" && (
          <div className="message err">{state.message}</div>
        )}
      </form>
      <p className="legal">
        By signing up you agree to receive 28 daily messages. Reply STOP at any
        time to unsubscribe. Message &amp; data rates may apply.
      </p>
    </main>
  );
}
