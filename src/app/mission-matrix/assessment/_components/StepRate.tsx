"use client";

import { useMemo, useState } from "react";
import { useAssessment } from "./AssessmentContext";

const MEANING_HINT: Record<number, string> = {
  1: "drains me / feels empty",
  2: "mostly neutral",
  3: "somewhat meaningful",
  4: "matters to me",
  5: "lights me up / deeply matters",
};
const EXPERTISE_HINT: Record<number, string> = {
  1: "easily teachable",
  2: "learnable in a month",
  3: "takes some context",
  4: "takes years to get right",
  5: "deep invisible context and skill",
};

export default function StepRate({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { state, update } = useAssessment();

  // Only rate items with actual text.
  const rateableIndexes = useMemo(
    () =>
      state.items
        .map((it, i) => (it.text.trim() ? i : -1))
        .filter((i) => i >= 0),
    [state.items],
  );

  const [cursor, setCursor] = useState<number>(() => {
    // resume at first unrated item, else last
    const firstUnrated = state.items.findIndex(
      (it, i) =>
        rateableIndexes.includes(i) &&
        (it.meaning == null || it.expertise == null),
    );
    return firstUnrated >= 0 ? firstUnrated : rateableIndexes[0] ?? 0;
  });

  const current = state.items[cursor];
  const cursorPos = rateableIndexes.indexOf(cursor) + 1;
  const totalRateable = rateableIndexes.length;

  const allRated = state.items.every(
    (it) =>
      !it.text.trim() || (it.meaning != null && it.expertise != null),
  );

  function setScore(field: "meaning" | "expertise", value: number) {
    const items = state.items.map((it, i) =>
      i === cursor ? { ...it, [field]: value } : it,
    );
    update({ items });
  }

  function goNextItem() {
    const currentIdxInRateable = rateableIndexes.indexOf(cursor);
    const next = rateableIndexes[currentIdxInRateable + 1];
    if (next != null) setCursor(next);
  }

  function goPrevItem() {
    const currentIdxInRateable = rateableIndexes.indexOf(cursor);
    const prev = rateableIndexes[currentIdxInRateable - 1];
    if (prev != null) setCursor(prev);
  }

  const canAdvanceItem =
    current?.meaning != null && current?.expertise != null;
  const isLastItem =
    rateableIndexes.indexOf(cursor) === rateableIndexes.length - 1;

  if (!current) return null;

  return (
    <>
      <main className="mm-assess-main">
        <div className="mm-assess-eyebrow">
          Step B · Rate · {cursorPos} of {totalRateable}
        </div>
        <h1 className="mm-assess-title">Two honest scores.</h1>
        <p className="mm-assess-sub">
          Go with your gut — this isn&apos;t a test, and there aren&apos;t right
          answers.
        </p>

        <div className="mm-rate-card">
          <div className="mm-rate-item-index">
            Item {String(cursor + 1).padStart(2, "0")}
          </div>
          <div className="mm-rate-item-text">{current.text}</div>

          <div className="mm-rate-axis">
            <div className="mm-rate-axis-label">Meaning · 1–5</div>
            <div className="mm-rate-axis-hint">
              {current.meaning != null
                ? MEANING_HINT[current.meaning]
                : "1 = drains me · 5 = lights me up"}
            </div>
            <div className="mm-rate-buttons">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  className={
                    "mm-rate-btn" + (current.meaning === n ? " selected" : "")
                  }
                  onClick={() => setScore("meaning", n)}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="mm-rate-axis">
            <div className="mm-rate-axis-label">Expertise · 1–5</div>
            <div className="mm-rate-axis-hint">
              {current.expertise != null
                ? EXPERTISE_HINT[current.expertise]
                : "1 = easily teachable · 5 = deep invisible context and skill"}
            </div>
            <div className="mm-rate-buttons">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  className={
                    "mm-rate-btn" + (current.expertise === n ? " selected" : "")
                  }
                  onClick={() => setScore("expertise", n)}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            className="mm-btn mm-btn-ghost"
            onClick={goPrevItem}
            disabled={rateableIndexes.indexOf(cursor) === 0}
          >
            ← Previous item
          </button>
          {!isLastItem && (
            <button
              className="mm-btn mm-btn-ghost"
              onClick={goNextItem}
              disabled={!canAdvanceItem}
            >
              Next item →
            </button>
          )}
        </div>
      </main>

      <div className="mm-assess-actions">
        <button className="mm-btn mm-btn-ghost" onClick={onBack}>
          ← Back
        </button>
        <button
          className="mm-btn mm-btn-primary"
          onClick={onNext}
          disabled={!allRated}
        >
          See your matrix →
        </button>
      </div>
    </>
  );
}
