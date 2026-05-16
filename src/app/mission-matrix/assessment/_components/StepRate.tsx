"use client";

import { useMemo, useState } from "react";
import { useAssessment } from "./AssessmentContext";
import RateSlider from "./RateSlider";

const MEANING_ACCENT = "#7c5cd1"; // purple-leaning, growth/craft pop
const EXPERTISE_ACCENT = "#3d8a5e"; // green-leaning, craft pop

const MEANING_HINT: Record<number, string> = {
  1: "drains me / feels empty",
  2: "mostly neutral",
  3: "somewhat meaningful",
  4: "matters to me",
  5: "lights me up / deeply matters",
};
const EXPERTISE_HINT: Record<number, string> = {
  1: "anyone could do this",
  2: "easy to hand off — a few weeks to ramp",
  3: "takes context to do well",
  4: "takes years to do at my level",
  5: "one of the only people in my org with the context to do this",
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
            <div className="mm-rate-axis-label">Meaning</div>
            <RateSlider
              value={current.meaning}
              onChange={(n) => setScore("meaning", n)}
              hints={MEANING_HINT}
              accent={MEANING_ACCENT}
            />
          </div>

          <div className="mm-rate-axis">
            <div className="mm-rate-axis-label">Unique expertise</div>
            <RateSlider
              value={current.expertise}
              onChange={(n) => setScore("expertise", n)}
              hints={EXPERTISE_HINT}
              accent={EXPERTISE_ACCENT}
            />
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
