"use client";

import { useMemo } from "react";
import { useAssessment } from "./AssessmentContext";
import {
  QUADRANT_META,
  quadrantFor,
  type Quadrant,
} from "@/lib/mission-matrix-types";

export default function StepPlot({
  onNext,
  onBack,
  onAddMore,
  nextLabel = "Reflect →",
}: {
  onNext: () => void;
  onBack: () => void;
  /** Optional — when provided, renders an "Add more tasks" button that
   *  loops the user back to the brain-dump step with scores preserved. */
  onAddMore?: () => void;
  nextLabel?: string;
}) {
  const { state } = useAssessment();

  const byQuadrant = useMemo(() => {
    const out: Record<Quadrant, string[]> = {
      growth: [],
      craft: [],
      routine: [],
      drain: [],
    };
    for (const it of state.items) {
      if (it.meaning == null || it.expertise == null || !it.text.trim()) continue;
      out[quadrantFor(it.meaning, it.expertise)].push(it.text.trim());
    }
    return out;
  }, [state.items]);

  // Visual layout order for the 2×2 (matches the PDF + site image):
  // top-left = growth, top-right = craft, bottom-left = routine, bottom-right = drain
  const layout: Quadrant[] = ["growth", "craft", "routine", "drain"];

  return (
    <>
      <main className="mm-assess-main">
        <div className="mm-assess-eyebrow">Step C · Your 2×2</div>
        <h1 className="mm-assess-title">Here&apos;s what it looks like.</h1>
        <p className="mm-assess-sub">
          Each item dropped into the quadrant its scores point to. Nothing to
          fix yet — just notice.
        </p>

        <div className="mm-plot-wrap">
          <div className="mm-plot-axis-top">
            <span>Low unique expertise</span>
            <span>High unique expertise</span>
          </div>
          <div className="mm-plot-grid">
            {layout.map((q) => {
              const meta = QUADRANT_META[q];
              const items = byQuadrant[q];
              return (
                <div
                  key={q}
                  className="mm-plot-cell"
                  style={{ background: meta.bg, color: meta.ink }}
                >
                  <h3 className="mm-plot-cell-title">{meta.title}</h3>
                  <p className="mm-plot-cell-sub">{meta.subtitle}</p>
                  {items.length === 0 ? (
                    <div className="mm-plot-cell-empty">— nothing here —</div>
                  ) : (
                    <ul className="mm-plot-cell-items">
                      {items.map((t, i) => (
                        <li key={i}>{t}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mm-plot-legend">
            <span>High meaning — top row</span>
            <span>Low meaning — bottom row</span>
          </div>
        </div>
      </main>

      <div className="mm-assess-actions">
        <button className="mm-btn mm-btn-ghost" onClick={onBack}>
          ← Back
        </button>
        <div style={{ display: "flex", gap: 8 }}>
          {onAddMore && (
            <button className="mm-btn mm-btn-ghost" onClick={onAddMore}>
              + Add more tasks
            </button>
          )}
          <button className="mm-btn mm-btn-primary" onClick={onNext}>
            {nextLabel}
          </button>
        </div>
      </div>
    </>
  );
}
