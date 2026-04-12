"use client";

import { useState, type FormEvent } from "react";

type State =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "ok"; message: string }
  | { kind: "err"; message: string };

// Single feathered palm frond — used 10 times with rotation
const FROND_PATH =
  "M 0,0 L -3,-8 -2,-11 -5,-18 -3,-22 -7,-30 -4,-34 -9,-42 -5,-46 -11,-54 -6,-58 -12,-66 -6,-70 -12,-78 -6,-82 -11,-90 -5,-94 -9,-102 -4,-106 -7,-114 -3,-118 -4,-125 0,-132 L 4,-125 3,-118 7,-114 4,-106 9,-102 5,-94 11,-90 6,-82 12,-78 6,-70 12,-66 6,-58 11,-54 5,-46 9,-42 4,-34 7,-30 3,-22 5,-18 2,-11 3,-8 Z";

function PalmTree({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 380 760"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <path id="frond" d={FROND_PATH} />
      </defs>
      <g fill="#0A051C">
        {/* Curved tapered trunk */}
        <path d="M 168,760 Q 174,640 180,520 Q 186,400 192,300 Q 196,220 200,170 L 216,170 Q 213,220 210,300 Q 205,400 200,520 Q 195,640 188,760 Z" />
        {/* Crown center nub */}
        <circle cx="208" cy="168" r="6" />
        {/* 10 fronds radiating from crown */}
        <g transform="translate(208 168)">
          <use href="#frond" transform="rotate(-150) scale(0.88)" />
          <use href="#frond" transform="rotate(-115) scale(0.96)" />
          <use href="#frond" transform="rotate(-75) scale(1.1)" />
          <use href="#frond" transform="rotate(-42) scale(1.02)" />
          <use href="#frond" transform="rotate(-12) scale(0.94)" />
          <use href="#frond" transform="rotate(14) scale(0.98)" />
          <use href="#frond" transform="rotate(42) scale(1.05)" />
          <use href="#frond" transform="rotate(78) scale(1.12)" />
          <use href="#frond" transform="rotate(115) scale(0.94)" />
          <use href="#frond" transform="rotate(150) scale(0.88)" />
        </g>
      </g>
    </svg>
  );
}

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
      {/* === SCENE === */}
      <div className="stars" aria-hidden="true" />
      <div className="stars-bright" aria-hidden="true" />
      <div className="moon" aria-hidden="true" />

      {/* Distant haze of mountains */}
      <svg
        className="mountains mountains-far"
        viewBox="0 0 1440 280"
        preserveAspectRatio="none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,280 L0,150 Q90,130 170,145 Q250,160 330,125 Q410,90 490,115 Q570,140 650,110 Q730,80 810,105 Q890,130 970,100 Q1050,70 1130,95 Q1210,120 1290,90 Q1370,60 1440,80 L1440,280 Z"
          fill="#9B6BB5"
        />
      </svg>

      {/* Mid mountain ridge */}
      <svg
        className="mountains mountains-mid"
        viewBox="0 0 1440 280"
        preserveAspectRatio="none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,280 L0,180 Q70,165 140,175 Q210,185 280,150 Q350,115 420,140 Q490,165 560,135 Q630,105 700,130 Q770,155 840,125 Q910,95 980,120 Q1050,145 1120,115 Q1190,85 1260,110 Q1330,135 1440,110 L1440,280 Z"
          fill="#5A2D70"
        />
      </svg>

      {/* Closer ridge with rocky outline */}
      <svg
        className="mountains mountains-near"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,200 L0,140 Q60,125 120,135 Q180,145 240,120 Q300,95 360,115 Q420,135 480,110 Q540,85 600,108 Q660,130 720,105 Q780,80 840,100 Q900,120 960,95 Q1020,70 1080,92 Q1140,115 1200,90 Q1260,65 1320,88 Q1380,110 1440,95 L1440,200 Z"
          fill="#2E1444"
        />
      </svg>

      {/* Single palm tree */}
      <PalmTree className="palm" />

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
