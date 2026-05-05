"use client";

import { useState } from "react";

type Day = { label: string; text: string };
type Option = { format: string; price: string; days: Day[] };
export type Offering = {
  id: string;
  emoji: string;
  name: string;
  pitch: string;
  priceSummary: string;
  bestFor: string;
  options: Option[];
  subjectLine: string;
};

export default function WorkTogetherDeck({ offerings }: { offerings: Offering[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="mm-wt-deck" data-state={expandedId ? "open" : "closed"}>
      {offerings.map((o, idx) => {
        const expanded = expandedId === o.id;
        const collapsed = expandedId !== null && !expanded;
        const cls = [
          "mm-wt-card",
          expanded ? "is-expanded" : "",
          collapsed ? "is-collapsed" : "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <article
            key={o.id}
            className={cls}
            onClick={() => {
              if (!expanded) setExpandedId(o.id);
            }}
            role="button"
            tabIndex={0}
            aria-expanded={expanded}
            onKeyDown={(e) => {
              if ((e.key === "Enter" || e.key === " ") && !expanded) {
                e.preventDefault();
                setExpandedId(o.id);
              }
              if (e.key === "Escape" && expanded) {
                setExpandedId(null);
              }
            }}
          >
            <header className="mm-wt-card-head">
              <span className="mm-wt-card-num">{String(idx + 1).padStart(2, "0")}</span>
              <span className="mm-wt-card-emoji" aria-hidden>
                {o.emoji}
              </span>
              {expanded && (
                <button
                  type="button"
                  className="mm-wt-card-close"
                  aria-label="Close details"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedId(null);
                  }}
                >
                  ×
                </button>
              )}
            </header>

            <h2 className="mm-wt-card-name">{o.name}</h2>
            <p className="mm-wt-card-pitch">{o.pitch}</p>

            {!expanded && (
              <footer className="mm-wt-card-foot">
                <span className="mm-wt-card-price">{o.priceSummary}</span>
                <span className="mm-wt-card-more">View details →</span>
              </footer>
            )}

            {expanded && (
              <div
                className="mm-wt-card-details"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="mm-wt-bestfor">
                  <span className="mm-wt-bestfor-label">Best for</span>
                  {o.bestFor}
                </p>

                <div className="mm-wt-options">
                  {o.options.map((opt, i) => (
                    <div key={i} className="mm-wt-option">
                      {o.options.length > 1 && (
                        <span className="mm-wt-option-num">
                          Option {String.fromCharCode(65 + i)}
                        </span>
                      )}
                      <div className="mm-wt-option-head">
                        <span className="mm-wt-format">{opt.format}</span>
                        <span className="mm-wt-dot" aria-hidden>
                          ·
                        </span>
                        <span className="mm-wt-price">{opt.price}</span>
                      </div>
                      <ul className="mm-wt-days">
                        {opt.days.map((d, j) => (
                          <li key={j}>
                            <span className="mm-wt-day-label">{d.label}.</span>{" "}
                            {d.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <a
                  className="mm-wt-row-cta"
                  href={`mailto:avni@thisbeautifulchaos.org?subject=${encodeURIComponent(
                    o.subjectLine,
                  )}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  Start a conversation →
                </a>
              </div>
            )}
          </article>
        );
      })}
    </section>
  );
}
