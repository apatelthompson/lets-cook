"use client";

import { useState, type FormEvent } from "react";

type State =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "ok"; message: string }
  | { kind: "err"; message: string };

export default function Page() {
  const [state, setState] = useState<State>({ kind: "idle" });
  const [agreed, setAgreed] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!agreed) {
      setState({
        kind: "err",
        message: "Please agree to the terms before signing up.",
      });
      return;
    }
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
      setAgreed(false);
      setState({
        kind: "ok",
        message: "You're in. Your first message arrives tomorrow at 10am.",
      });
    } catch {
      setState({ kind: "err", message: "Network error. Try again." });
    }
  }

  return (
    <>
      <div className="decoration polaroid polaroid-1" aria-hidden="true">
        <div className="polaroid-photo photo-mars" />
        <div className="polaroid-caption">Mars &apos;69</div>
      </div>
      <div className="decoration polaroid polaroid-2" aria-hidden="true">
        <div className="polaroid-photo photo-desert" />
        <div className="polaroid-caption">Joshua Tree</div>
      </div>
      <div className="decoration polaroid polaroid-3" aria-hidden="true">
        <div className="polaroid-photo photo-galaxy" />
        <div className="polaroid-caption">Apollo</div>
      </div>
      <div className="patch patch-est" aria-hidden="true">
        <span>Est<br />2026</span>
      </div>
      <div className="patch patch-vibes" aria-hidden="true">
        <span>Good<br />Vibes<br />Only</span>
      </div>
      <div className="patch patch-aloha" aria-hidden="true">
        <span>Aloha<br />Kakou</span>
      </div>
      <div className="sparkle sparkle-1" aria-hidden="true">✦</div>
      <div className="sparkle sparkle-2" aria-hidden="true">✦</div>
      <div className="sparkle sparkle-3" aria-hidden="true">✦</div>
      <main>
      <h1>28 Days of AI</h1>
      <p className="lede">
        A breezy little text program about artificial intelligence. One
        message a day, straight to your phone at 10am sharp. No app, no
        login, no fuss.
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
        <label className="consent">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            required
          />
          <span>
            I agree to receive 28 daily SMS messages from thisbeautifulchaos.org
            and accept the <a href="/terms">Terms of Service</a> and{" "}
            <a href="/privacy">Privacy Policy</a>. Reply STOP to unsubscribe,
            HELP for help. Message &amp; data rates may apply.
          </span>
        </label>
        <button
          type="submit"
          disabled={state.kind === "submitting" || !agreed}
        >
          {state.kind === "submitting" ? "Signing you up..." : "Start the 28 days"}
        </button>
        {state.kind === "ok" && (
          <div className="message ok">{state.message}</div>
        )}
        {state.kind === "err" && (
          <div className="message err">{state.message}</div>
        )}
      </form>
      </main>
    </>
  );
}
