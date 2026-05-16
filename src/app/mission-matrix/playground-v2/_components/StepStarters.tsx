"use client";

import { useEffect, useMemo, useState } from "react";
import { useAssessment } from "../../assessment/_components/AssessmentContext";
import { findSeedRole } from "@/lib/mission-matrix-seeds";
import type { AssessmentItem } from "@/lib/mission-matrix-types";

const MIN_FILLED = 5;
const MAX_ITEMS = 20;

interface Row {
  text: string;
  selected: boolean;
  isSeed: boolean;
}

/**
 * Seed-driven brain dump. Uses state.function_area to pull starter tasks
 * from the seed library. If function is "other" or not in the library,
 * falls back to an empty brain dump that the user fills from scratch.
 *
 * The user can come back to this step later (via Add More on the plot)
 * with scores preserved.
 */
export default function StepStarters({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { state, update } = useAssessment();
  const role = findSeedRole(state.function_area ?? "");
  const hasSeeds = !!role;

  const [rows, setRows] = useState<Row[]>(() => {
    const existingTexts = new Set(
      state.items.filter((it) => it.text.trim()).map((it) => it.text.trim()),
    );

    // If we have seeds, surface them all (default-selected when this is a
    // fresh session; preserve user toggles when state.items already has
    // selections from a prior visit).
    if (role) {
      const seeded: Row[] = role.tasks.map((t) => ({
        text: t.text,
        selected: existingTexts.size === 0 ? true : existingTexts.has(t.text),
        isSeed: true,
      }));
      const seedTexts = new Set(role.tasks.map((t) => t.text));
      const customs: Row[] = [];
      for (const it of state.items) {
        const t = it.text.trim();
        if (!t || seedTexts.has(t)) continue;
        customs.push({ text: t, selected: true, isSeed: false });
      }
      return [...seeded, ...customs];
    }

    // No seeds — fall back to empty brain-dump style. Start with 5 empty
    // rows for the user to fill in themselves.
    if (existingTexts.size > 0) {
      return state.items
        .filter((it) => it.text.trim())
        .map((it) => ({ text: it.text, selected: true, isSeed: false }));
    }
    return Array.from({ length: 5 }, () => ({
      text: "",
      selected: true,
      isSeed: false,
    }));
  });

  const filled = rows.filter((r) => r.selected && r.text.trim()).length;
  const ready = filled >= MIN_FILLED;

  // Sync into shared state.items every change. Preserve scores by text match.
  useEffect(() => {
    const items: AssessmentItem[] = rows
      .filter((r) => r.selected && r.text.trim())
      .map((r, i) => {
        const prior = state.items.find(
          (it) => it.text.trim() === r.text.trim(),
        );
        return {
          order: i + 1,
          text: r.text.trim(),
          meaning: prior?.meaning ?? null,
          expertise: prior?.expertise ?? null,
        };
      });
    update({ items });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);

  function toggle(i: number) {
    setRows((rs) => rs.map((r, j) => (j === i ? { ...r, selected: !r.selected } : r)));
  }
  function editText(i: number, text: string) {
    setRows((rs) => rs.map((r, j) => (j === i ? { ...r, text } : r)));
  }
  function removeRow(i: number) {
    setRows((rs) => rs.filter((_, j) => j !== i));
  }
  function addCustom() {
    if (rows.length >= MAX_ITEMS) return;
    setRows((rs) => [...rs, { text: "", selected: true, isSeed: false }]);
  }

  const counts = useMemo(() => {
    const sel = rows.filter((r) => r.selected && r.text.trim()).length;
    return { total: rows.length, sel };
  }, [rows]);

  return (
    <>
      <main className="mm-assess-main">
        <div className="mm-assess-eyebrow">
          Step A · Brain dump{role ? ` · ${role.label}` : ""}
        </div>
        <h1 className="mm-assess-title">What&apos;s on your plate?</h1>
        <p className="mm-assess-sub">
          {hasSeeds
            ? "We pulled starter tasks for your function — they're a thought-starter, not the answer. Uncheck what doesn't apply, edit wording to fit your life, add anything missing. Start with at least 5 — you'll have a chance to come back and add more after you see your map."
            : "List the work you actually spend time on in a typical week or month — projects, meetings, recurring tasks, the things that keep showing up. Start with at least 5 — you'll have a chance to come back and add more after you see your map."}
        </p>

        <div className="pg-starters-list">
          {rows.map((r, i) => (
            <div
              key={i}
              className={"pg-starter-row" + (r.selected ? " selected" : "")}
            >
              <label className="pg-starter-check">
                <input
                  type="checkbox"
                  checked={r.selected}
                  onChange={() => toggle(i)}
                />
              </label>
              <input
                className="mm-input pg-starter-text"
                type="text"
                value={r.text}
                placeholder={
                  r.isSeed
                    ? ""
                    : i === 0
                      ? "e.g. Weekly 1:1s with team"
                      : i === 1
                        ? "e.g. Q2 board prep"
                        : "Add your own…"
                }
                onChange={(e) => editText(i, e.target.value)}
              />
              {!r.isSeed && (
                <button
                  type="button"
                  className="mm-item-row-remove"
                  aria-label="Remove"
                  onClick={() => removeRow(i)}
                  title="Remove this row"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          className="mm-add-row"
          onClick={addCustom}
          disabled={rows.length >= MAX_ITEMS}
        >
          {rows.length >= MAX_ITEMS
            ? "That's plenty — pick the most important ones"
            : "+ Add your own"}
        </button>

        <p className="mm-field-hint" style={{ marginTop: 16 }}>
          {counts.sel < MIN_FILLED
            ? `Pick at least ${MIN_FILLED - counts.sel} more to continue`
            : `${counts.sel} selected · ready to rate`}
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
