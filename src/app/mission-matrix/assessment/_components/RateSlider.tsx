"use client";

import { useState } from "react";

/**
 * 5-stop slider with a live readout above and small endpoint hints below.
 * Hover a stop to preview that level without committing.
 *
 * Buttons are used (not a native range input) so we get clean keyboard
 * access via Tab + Enter/Space, accurate hover events, and full CSS
 * control across browsers.
 */
export default function RateSlider({
  value,
  onChange,
  hints,
  accent,
}: {
  /** 1–5, or null if not yet picked */
  value: number | null;
  onChange: (n: number) => void;
  /** keys 1–5 to short descriptive text */
  hints: Record<number, string>;
  /** the saturated fill color used at value=5 (CSS color) */
  accent: string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const display = hover ?? value;
  const filledTo = value ?? 0; // how many stops are "filled" visually
  const fillPct =
    filledTo > 0 ? ((filledTo - 1) / 4) * 100 : 0;

  return (
    <div className="mm-slider">
      <div className="mm-slider-readout">
        {display != null ? (
          <>
            <span className="mm-slider-readout-num">{display}</span>
            <span className="mm-slider-readout-text">{hints[display]}</span>
          </>
        ) : (
          <span className="mm-slider-placeholder">
            Pick a level — hover to preview
          </span>
        )}
      </div>

      <div className="mm-slider-track-wrap">
        <div className="mm-slider-track" />
        <div
          className="mm-slider-fill"
          style={{
            width: `${fillPct}%`,
            background: filledTo > 0 ? accent : "transparent",
          }}
        />
        <div className="mm-slider-stops">
          {[1, 2, 3, 4, 5].map((n) => {
            const isFilled = value != null && n <= value;
            const isSelected = value === n;
            const isHovered = hover === n;
            return (
              <button
                type="button"
                key={n}
                className={
                  "mm-slider-stop" +
                  (isFilled ? " filled" : "") +
                  (isSelected ? " selected" : "") +
                  (isHovered ? " hovered" : "")
                }
                style={isFilled ? { background: accent, borderColor: accent } : undefined}
                aria-label={`${n} — ${hints[n]}`}
                onClick={() => onChange(n)}
                onMouseEnter={() => setHover(n)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(n)}
                onBlur={() => setHover(null)}
              >
                <span className="mm-slider-stop-num">{n}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mm-slider-endpoints">
        <span>{hints[1]}</span>
        <span>{hints[5]}</span>
      </div>
    </div>
  );
}
