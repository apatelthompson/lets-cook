"use client";

import { useEffect, useState, type FormEvent } from "react";
import "./styles.css";

type State =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "ok"; message: string }
  | { kind: "err"; message: string };

function formatPhone(input: string): string {
  // International numbers (other than +1): light passthrough, strip junk
  if (input.startsWith("+") && !input.startsWith("+1")) {
    return input.replace(/[^\d+\s()-]/g, "").slice(0, 20);
  }
  const digits = input.replace(/\D/g, "");
  const ten = (digits.startsWith("1") ? digits.slice(1) : digits).slice(0, 10);
  if (!ten) return "";
  const a = ten.slice(0, 3);
  const b = ten.slice(3, 6);
  const c = ten.slice(6, 10);
  if (ten.length <= 3) return `+1 (${a}`;
  if (ten.length <= 6) return `+1 (${a}) ${b}`;
  return `+1 (${a}) ${b}-${c}`;
}

const DAYS = [
  {
    photo: "/img/28-days/sunrise-water.jpg",
    title: "👋 Today: let's talk LLMs.",
    body: `Here's 5 things to know:
1. LLMs like Claude or ChatGPT are neural networks that learn to predict the next word.
2. Trained on massive text — books, the open web, Reddit.
3. Flexibility = creativity, but also hallucinations.
4. Each lab ships a family. Anthropic: Opus, Sonnet, Haiku.
5. Best at text reasoning + verifiable tasks like coding.

Go deeper → tap to read more`,
    label: "Day 01",
  },
  {
    photo: "/img/28-days/ferris-wheel.jpg",
    title: "🎡 Today: the context window.",
    body: `Here's 5 things to know:
1. It's the AI's short-term memory in one chat.
2. Sizes vary — a few pages to a whole book.
3. Paste the email, doc, or error log. More context = sharper answers.
4. When it fills up, the oldest stuff falls off the back.
5. Stuck? New chat = fresh window.

Go deeper → tap to read more`,
    label: "Day 07",
  },
  {
    photo: "/img/28-days/moon.jpg",
    title: "🤔 Heads up: hallucinations.",
    body: `Here's 5 things to know:
1. AI sometimes invents facts that sound true.
2. Confident tone ≠ correct answer.
3. Ask for sources — then check one.
4. Paste the source yourself to ground the answer.
5. Ask: "what would make you wrong here?"

Go deeper → tap to read more`,
    label: "Day 14",
  },
];

export default function Page() {
  const [idx, setIdx] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const [phone, setPhone] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % DAYS.length), 7000);
    return () => clearInterval(id);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!agreed) {
      setState({ kind: "err", message: "Please agree to the terms before signing up." });
      return;
    }
    const form = e.currentTarget;
    const fd = new FormData(form);
    setState({ kind: "submitting" });
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: fd.get("phone"), name: fd.get("name") }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setState({ kind: "err", message: data.error ?? "Something went wrong. Try again." });
        return;
      }
      form.reset();
      setAgreed(false);
      setPhone("");
      setState({ kind: "ok", message: "You're in. Your first message arrives tomorrow at 10am." });
    } catch {
      setState({ kind: "err", message: "Network error. Try again." });
    }
  }

  const d = DAYS[idx];

  return (
    <div className="td5">
      {/* Left: photo stage with floating phone */}
      <div className="td5-stage" aria-hidden="true">
        <div className="td5-msg">
          <div className="td5-msg-header">
            <div className="td5-msg-back">‹</div>
            <div className="td5-msg-contact">
              <div className="td5-msg-avatar">👯‍♀️</div>
              <div className="td5-msg-name">
                28 Days of AI <span className="td5-chev">›</span>
              </div>
            </div>
            <div />
          </div>

          <div className="td5-msg-scroll">
            <div className="td5-msg-daystamp">
              <strong>Today</strong> 10:00 AM
            </div>
            <div key={idx} className="td5-msg-thread">
              <div className="td5-msg-attach-row">
                <div className="td5-msg-attach">
                  <img src={d.photo} alt="" />
                </div>
                <div className="td5-msg-dl">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 2v9" />
                    <polyline points="4.5 7.5 8 11 11.5 7.5" />
                    <path d="M3 12.5v1A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-1" />
                  </svg>
                </div>
              </div>
              <div className="td5-msg-bubble">
                {d.title}
                {"\n\n"}
                {d.body}
              </div>
              <div className="td5-msg-delivered">Delivered</div>
            </div>
          </div>

          <div className="td5-msg-pager">
            {DAYS.map((dd, i) => (
              <button
                key={i}
                type="button"
                className="td5-msg-pip"
                data-active={i === idx}
                onClick={() => setIdx(i)}
                aria-label={dd.label}
              >
                {dd.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right: signup form */}
      <div className="td5-form-side">
        <div className="td5-card">
          <div className="td5-rule">An SMS program</div>
          <h1 className="td5-title">
            28 Days
            <br />
            <em>of AI.</em>
          </h1>
          <p className="td5-tag">
            Go from AI curious to AI confident in a month. Learn one bite-sized concept a day — from
            LLMs to inference to evals to agent harnesses.
          </p>
          <p className="td5-tag">
            Have fun exploring with exercise nuggets and insightful ways to go deeper.
          </p>

          <form onSubmit={onSubmit}>
            <div className="td5-field">
              <label className="td5-label" htmlFor="td5-name">
                Name <span className="td5-opt">(optional)</span>
              </label>
              <input
                id="td5-name"
                name="name"
                className="td5-input"
                placeholder="Your full name"
                autoComplete="name"
              />
            </div>
            <div className="td5-field">
              <label className="td5-label" htmlFor="td5-phone">
                Mobile number
              </label>
              <input
                id="td5-phone"
                name="phone"
                type="tel"
                required
                className="td5-input"
                placeholder="+1 (415) 555-0134"
                autoComplete="tel"
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
              />
            </div>

            <div
              className="td5-consent"
              role="checkbox"
              tabIndex={0}
              aria-checked={agreed}
              onClick={() => setAgreed(!agreed)}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                  e.preventDefault();
                  setAgreed(!agreed);
                }
              }}
            >
              <div className="td5-check" data-checked={agreed} />
              <div>
                I agree to receive one SMS per day for 28 days from <strong>28 Days of AI</strong>{" "}
                and accept the{" "}
                <a href="/terms" onClick={(e) => e.stopPropagation()}>
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" onClick={(e) => e.stopPropagation()}>
                  Privacy Policy
                </a>
                . Reply <span className="td5-mono">STOP</span> to unsubscribe,{" "}
                <span className="td5-mono">HELP</span> for help. Message & data rates may apply.
              </div>
            </div>

            <button
              type="submit"
              className="td5-submit"
              disabled={!agreed || state.kind === "submitting"}
            >
              {state.kind === "submitting" ? "Signing you up…" : "Subscribe & begin Day 01"}
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="2" y1="8" x2="13" y2="8" />
                <polyline points="9 4 13 8 9 12" />
              </svg>
            </button>
            <div className="td5-note">No spam. Unsubscribe anytime.</div>
            {state.kind === "ok" && <div className="td5-message ok">{state.message}</div>}
            {state.kind === "err" && <div className="td5-message err">{state.message}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
