"use client";

import { useAssessment } from "./AssessmentContext";
import type { AssessmentItem } from "@/lib/mission-matrix-types";

const MAX_ITEMS = 15;
const MIN_FILLED = 5;

export default function StepBrainDump({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { state, update } = useAssessment();

  const filled = state.items.filter((it) => it.text.trim()).length;
  const ready = filled >= MIN_FILLED;

  function setItemText(idx: number, text: string) {
    const items = state.items.map((it, i) =>
      i === idx ? { ...it, text } : it,
    );
    update({ items });
  }

  function removeItem(idx: number) {
    const items = state.items
      .filter((_, i) => i !== idx)
      .map<AssessmentItem>((it, i) => ({ ...it, order: i + 1 }));
    update({ items });
  }

  function addItem() {
    if (state.items.length >= MAX_ITEMS) return;
    update({
      items: [
        ...state.items,
        {
          order: state.items.length + 1,
          text: "",
          meaning: null,
          expertise: null,
        },
      ],
    });
  }

  return (
    <>
      <main className="mm-assess-main">
        <div className="mm-assess-eyebrow">Step A · Brain dump</div>
        <h1 className="mm-assess-title">What&apos;s on your plate?</h1>
        <p className="mm-assess-sub">
          List the work you actually spend time on in a typical week or month —
          projects, meetings, recurring tasks, the things that keep showing up.
          Start with 7. Messy is welcome.
        </p>

        <div className="mm-items-list">
          {state.items.map((it, i) => (
            <div className="mm-item-row" key={i}>
              <div className="mm-item-row-num">{String(i + 1).padStart(2, "0")}</div>
              <input
                className="mm-input"
                type="text"
                value={it.text}
                placeholder={
                  i === 0
                    ? "e.g. Weekly 1:1s with team"
                    : i === 1
                    ? "e.g. Q2 board prep"
                    : ""
                }
                onChange={(e) => setItemText(i, e.target.value)}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    i === state.items.length - 1 &&
                    state.items.length < MAX_ITEMS
                  ) {
                    e.preventDefault();
                    addItem();
                  }
                }}
              />
              <button
                className="mm-item-row-remove"
                aria-label="Remove"
                onClick={() => removeItem(i)}
                disabled={state.items.length <= 1}
                title="Remove this row"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <button
          className="mm-add-row"
          onClick={addItem}
          disabled={state.items.length >= MAX_ITEMS}
        >
          {state.items.length >= MAX_ITEMS
            ? "You've reached 15 — that's plenty"
            : "+ Add another"}
        </button>

        <p className="mm-field-hint" style={{ marginTop: 16 }}>
          {filled < MIN_FILLED
            ? `Add at least ${MIN_FILLED - filled} more to continue`
            : `${filled} item${filled === 1 ? "" : "s"} — you can keep going or continue`}
        </p>
      </main>

      <div className="mm-assess-actions">
        <button className="mm-btn mm-btn-ghost" onClick={onBack}>
          ← Back
        </button>
        <button
          className="mm-btn mm-btn-primary"
          onClick={onNext}
          disabled={!ready}
        >
          Continue →
        </button>
      </div>
    </>
  );
}
