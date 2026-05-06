"use client";

import { useState, type CSSProperties } from "react";

type Day = { label: string; text: string };
type Option = {
  label: string;
  title: string;
  price: string;
  priceUnit: string;
  days: Day[];
};

export type Offering = {
  id: string;
  num: string;
  accent: "peach" | "sun" | "coral";
  emoji: string;
  name: string;
  audienceShort: string;
  pitch: string;
  summaryPrice: string;
  summaryPriceUnit: string;
  bestFor: string;
  options: Option[];
  subjectLine: string;
};

const ACCENTS: Record<
  Offering["accent"],
  { solid: string; light: string; ink: string }
> = {
  peach: { solid: "#FAA55A", light: "#FFE3CC", ink: "#7A4A1F" },
  sun: { solid: "#EBC959", light: "#F7EECB", ink: "#6B5418" },
  coral: { solid: "#EE7B6E", light: "#FADCD7", ink: "#7C2A22" },
};

function accentVars(accent: Offering["accent"]): CSSProperties {
  const a = ACCENTS[accent];
  return {
    ["--mm-wt-accent-solid" as string]: a.solid,
    ["--mm-wt-accent-light" as string]: a.light,
    ["--mm-wt-accent-ink" as string]: a.ink,
  };
}

export default function WorkTogetherDeck({
  offerings,
  defaultId,
}: {
  offerings: Offering[];
  defaultId: string;
}) {
  const [activeId, setActiveId] = useState<string>(
    offerings.some((o) => o.id === defaultId) ? defaultId : offerings[0]?.id,
  );

  const active = offerings.find((o) => o.id === activeId) ?? offerings[0];
  const detailPanelId = "mm-wt-detail";

  return (
    <section className="mm-wt-deck">
      <div className="mm-wt-inner">
        <div className="mm-wt-row">
          {offerings.map((o) => {
            const isActive = o.id === activeId;
            const mailto = `mailto:avni@thisbeautifulchaos.org?subject=${encodeURIComponent(
              o.subjectLine,
            )}`;
            return (
              <button
                key={o.id}
                type="button"
                className="mm-wt-mini"
                data-active={isActive}
                style={accentVars(o.accent)}
                onClick={() => setActiveId(o.id)}
                aria-expanded={isActive}
                aria-controls={detailPanelId}
              >
                <div className="mm-wt-mini-head">
                  <div>
                    <div className="mm-wt-mini-num">{o.num}</div>
                    <div className="mm-wt-mini-pill">{o.audienceShort}</div>
                  </div>
                  <div className="mm-wt-mini-avatar" aria-hidden>
                    {o.emoji}
                  </div>
                </div>
                <div className="mm-wt-mini-name">{o.name}</div>
                <p className="mm-wt-mini-tag">{o.pitch}</p>
                <div className="mm-wt-mini-foot">
                  <div>
                    <span className="mm-wt-mini-price">{o.summaryPrice}</span>
                    {o.summaryPriceUnit && (
                      <span className="mm-wt-mini-price-unit">
                        {" "}
                        {o.summaryPriceUnit}
                      </span>
                    )}
                  </div>
                  <span className="mm-wt-mini-cue">
                    {isActive ? "Viewing ↓" : "See details →"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {active && (
          <section
            id={detailPanelId}
            key={active.id}
            className="mm-wt-detail"
            style={accentVars(active.accent)}
            role="region"
            aria-labelledby={`mm-wt-detail-name-${active.id}`}
          >
            <div className="mm-wt-detail-rule" />
            <div className="mm-wt-detail-grid">
              <aside className="mm-wt-detail-side">
                <div className="mm-wt-detail-numeral">{active.num}</div>
                <div className="mm-wt-detail-avatar" aria-hidden>
                  {active.emoji}
                </div>
                <div className="mm-wt-detail-quickfacts">
                  <div className="mm-wt-quickfact-label">Best for</div>
                  <p className="mm-wt-quickfact-body">{active.bestFor}</p>
                </div>
              </aside>

              <div className="mm-wt-detail-body">
                <h2
                  id={`mm-wt-detail-name-${active.id}`}
                  className="mm-wt-detail-name"
                >
                  {active.name}
                </h2>
                <p className="mm-wt-detail-tagline">{active.pitch}</p>

                <div className="mm-wt-options">
                  {active.options.map((opt, i) => (
                    <article className="mm-wt-option" key={i}>
                      <header className="mm-wt-option-head">
                        <div>
                          <span className="mm-wt-option-label">
                            {opt.label}
                          </span>
                          <div className="mm-wt-option-title">{opt.title}</div>
                        </div>
                        <div className="mm-wt-option-price-wrap">
                          <span className="mm-wt-option-price">
                            {opt.price}
                          </span>
                          {opt.priceUnit && (
                            <span className="mm-wt-option-price-unit">
                              {" "}
                              {opt.priceUnit}
                            </span>
                          )}
                        </div>
                      </header>
                      <div className="mm-wt-days">
                        {opt.days.map((d, j) => (
                          <p key={j} className="mm-wt-day">
                            <strong>{d.label}.</strong> {d.text}
                          </p>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>

                <div className="mm-wt-foot-row">
                  <a
                    className="mm-wt-btn mm-wt-btn-primary"
                    href={`mailto:avni@thisbeautifulchaos.org?subject=${encodeURIComponent(
                      `Book a call — ${active.name}`,
                    )}`}
                  >
                    Book a call about {active.name} →
                  </a>
                  <a
                    className="mm-wt-btn mm-wt-btn-ghost"
                    href={`mailto:avni@thisbeautifulchaos.org?subject=${encodeURIComponent(
                      `Question — ${active.name}`,
                    )}`}
                  >
                    Or ask a question
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </section>
  );
}
