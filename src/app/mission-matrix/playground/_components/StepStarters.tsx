"use client";

import { useEffect, useMemo, useState } from "react";
import { useAssessment } from "../../assessment/_components/AssessmentContext";
import { findSeedRole } from "@/lib/mission-matrix-seeds";
import type { AssessmentItem } from "@/lib/mission-matrix-types";

const MIN_FILLED = 5;
const MAX_ITEMS = 15;

/**
 * Internal staging shape — one row per candidate task.
 * `selected` toggles whether it gets passed into the rate step.
 * `text` is editable. Custom rows are just rows where selected
 * defaults true.
 */
interface Row {
  text: string;
  selected: boolean;
  isSeed: boolean;
}

export default function StepStarters({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { state, update } = useAssessment();
  const role = findSeedRole(state.role_id ?? "");

  // Seed the staging rows when role first lands, or hydrate from
  // already-saved items (so back/forward preserves selection + edits).
  const [rows, setRows] = useState<Row[]>(() => {
    if (!role) return [];
    const existingTexts = new Set(
      state.items.filter((it) => it.text.trim()).map((it) => it.text.trim()),
    );
    const seeded: Row[] = role.tasks.map((t) => ({
      text: t.text,
      selected: existingTexts.size === 0 ? true : existingTexts.has(t.text),
      isSeed: true,
    }));
    // any custom rows the user added previously and that aren't in the
    // seed set come back as editable rows with selected=true
    const seedTexts = new Set(role.tasks.map((t) => t.text));
    const customs: Row[] = [];
    for (const it of state.items) {
      const t = it.text.trim();
      if (!t || seedTexts.has(t)) continue;
      customs.push({ text: t, selected: true, isSeed: false });
    }
    return [...seeded, ...customs];
  });

  const filled = rows.filter((r) => r.selected && r.text.trim()).length;
  const ready = filled >= MIN_FILLED;

  // Persist selections into the shared items[] state on every change so
  // StepRate sees a fresh list when we advance.
  useEffect(() => {
    const items: AssessmentItem[] = rows
      .filter((r) => r.selected && r.text.trim())
      .map((r, i) => ({
        order: i + 1,
        text: r.text.trim(),
        // Preserve existing meaning/expertise if the text matches a prior item
        meaning:
          state.items.find((it) => it.text.trim() === r.text.trim())
            ?.meaning ?? null,
        expertise:
          state.items.find((it) => it.text.trim() === r.text.trim())
            ?.expertise ?? null,
      }));
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
    const total = rows.length;
    const sel = rows.filter((r) => r.selected && r.text.trim()).length;
    return { total, sel };
  }, [rows]);

  if (!role) {
    return (
      <main className="mm-assess-main">
        <p className="mm-assess-sub">Pick a role first.</p>
        <button className="mm-btn mm-btn-ghost" onClick={onBack}>
          ← Back
        </button>
      </main>
    );
  }

  return (
    <>
      <main className="mm-assess-main">
        <div className="mm-assess-eyebrow">Playground · Step 2 · {role.label}</div>
        <h1 className="mm-assess-title">Pick the work that&apos;s actually yours.</h1>
        <p className="mm-assess-sub">
          These are a thought-starter, not the answer. Uncheck the ones that
          don&apos;t apply, edit the wording to fit your life, and add anything
          missing. Aim for {MIN_FILLED}–10 you actually do.
        </p>

        <div className="pg-starters-list">
          {rows.map((r, i) => (
            <div
              key={i}
              className={
                "pg-starter-row" + (r.selected ? " selected" : "")
              }
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
                placeholder={r.isSeed ? "" : "Add your own…"}
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
            ? "You've reached 15 — that's plenty"
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
