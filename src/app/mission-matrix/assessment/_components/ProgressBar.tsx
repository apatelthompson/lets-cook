"use client";

export const STEP_LABELS = [
  "Profile",
  "Brain dump",
  "Rate",
  "Plot",
  "Reflect",
  "Get your PDF",
];

export default function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mm-assess-top">
      <div className="mm-assess-brand">Mission Matrix</div>
      <div className="mm-assess-progress">
        {STEP_LABELS.map((_, i) => (
          <div
            key={i}
            className={
              "mm-assess-progress-dot " +
              (i < step ? "done" : i === step ? "active" : "")
            }
          />
        ))}
      </div>
      <div className="mm-assess-step-label">
        {step + 1} / {STEP_LABELS.length}
      </div>
    </div>
  );
}
