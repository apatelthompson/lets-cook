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
    <div className="layout">
      {/* === LEFT: iPhone with iMessage === */}
      <div className="hero-side">
        <div className="iphone">
          {/* Dynamic Island */}
          <div className="iphone-island" />

          {/* Status bar */}
          <div className="iphone-status-bar">
            <span className="status-time">9:41</span>
            <div className="status-icons">
              <svg width="16" height="12" viewBox="0 0 16 12" fill="white" aria-hidden="true">
                <rect x="0" y="5" width="3" height="7" rx="0.5" opacity="0.4" />
                <rect x="4.5" y="3.5" width="3" height="8.5" rx="0.5" opacity="0.6" />
                <rect x="9" y="1.5" width="3" height="10.5" rx="0.5" opacity="0.8" />
                <rect x="13.5" y="0" width="3" height="12" rx="0.5" />
              </svg>
              <svg width="15" height="12" viewBox="0 0 15 12" fill="white" aria-hidden="true">
                <path d="M7.5 3.6C9.4 3.6 11.1 4.3 12.4 5.5L13.8 4.1C12.1 2.5 9.9 1.5 7.5 1.5S2.9 2.5 1.2 4.1L2.6 5.5C3.9 4.3 5.6 3.6 7.5 3.6Z" opacity="0.8" />
                <path d="M7.5 6.6C8.8 6.6 10 7.1 10.9 7.9L12.3 6.5C11 5.3 9.3 4.6 7.5 4.6S4 5.3 2.7 6.5L4.1 7.9C5 7.1 6.2 6.6 7.5 6.6Z" />
                <path d="M7.5 9.5C8.2 9.5 8.8 9.8 9.3 10.2L7.5 12L5.7 10.2C6.2 9.8 6.8 9.5 7.5 9.5Z" />
              </svg>
              <svg width="25" height="12" viewBox="0 0 25 12" fill="white" aria-hidden="true">
                <rect x="0" y="1" width="21" height="10" rx="2" stroke="white" strokeWidth="1" fill="none" opacity="0.4" />
                <rect x="1.5" y="2.5" width="14" height="7" rx="1" fill="white" />
                <rect x="22" y="4" width="2" height="4" rx="0.5" opacity="0.5" />
              </svg>
            </div>
          </div>

          {/* iMessage nav bar */}
          <div className="imessage-nav">
            <div className="imessage-back">
              <svg width="10" height="16" viewBox="0 0 10 16" fill="none" stroke="#007AFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M8.5 1.5L2 8L8.5 14.5" />
              </svg>
            </div>
            <div className="imessage-contact">
              <div className="imessage-avatar">🌴</div>
              <div className="imessage-contact-name">28 Days of AI</div>
            </div>
          </div>

          {/* Messages */}
          <div className="imessage-body">
            {/* Timestamp */}
            <div className="imessage-timestamp">Today 10:00 AM</div>

            {/* Incoming: Day 1 */}
            <div className="imessage-row incoming">
              <div className="imessage-bubble incoming">
                <strong>Day 1 of 28: What is an LLM?</strong>
                <br /><br />
                Think of it as autocomplete on steroids. It reads your prompt
                and predicts the best next word, one word at a time, billions
                of times per second.
                <br /><br />
                The wild part? Nobody programmed the answers — it learned
                patterns from reading the internet.
                <span className="bubble-emoji">🧬</span>
              </div>
            </div>

            {/* Outgoing reply */}
            <div className="imessage-row outgoing">
              <div className="imessage-bubble outgoing">
                Wait this is actually fascinating 🤯
              </div>
            </div>

            {/* Delivered receipt */}
            <div className="imessage-delivered">Delivered</div>

            {/* Typing indicator */}
            <div className="imessage-row incoming">
              <div className="imessage-typing">
                <span /><span /><span />
              </div>
            </div>
          </div>

          {/* iMessage input bar */}
          <div className="imessage-input-bar">
            <div className="imessage-plus">+</div>
            <div className="imessage-input-field">iMessage</div>
            <div className="imessage-send">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="10" cy="10" r="10" fill="#007AFF" />
                <path d="M10 14V7M10 7L7 10M10 7L13 10" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Home indicator */}
          <div className="iphone-home-indicator" />
        </div>
      </div>

      {/* === RIGHT: Headline + Form === */}
      <main>
        <h1>28 Days of AI</h1>
        <p className="lede">
          Sign up to receive 28 daily SMS lessons about AI. One text a day at
          10am, for 28 days. Bite-sized, practical, zero fluff.
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
              I agree to receive 28 SMS messages (one per day for 28 days) from
              28 Days of AI and accept the{" "}
              <a href="/terms">Terms of Service</a> and{" "}
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
    </div>
  );
}
