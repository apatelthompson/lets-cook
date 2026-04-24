"use client";

import { useAssessment } from "./AssessmentContext";

const PROMPTS: Array<{
  key: "reflection_1" | "reflection_2" | "reflection_3";
  title: string;
}> = [
  {
    key: "reflection_1",
    title: "Which quadrant is most crowded — and is that a surprise?",
  },
  {
    key: "reflection_2",
    title: "What's one item that jumped quadrants between your gut and your rating?",
  },
  {
    key: "reflection_3",
    title:
      "What's something you'd love to do more of — but don't yet have the expertise for?",
  },
];

export default function StepReflect({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { state, update } = useAssessment();

  return (
    <>
      <main className="mm-assess-main">
        <div className="mm-assess-eyebrow">Now that it&apos;s on the page</div>
        <h1 className="mm-assess-title">What do you see?</h1>
        <p className="mm-assess-sub">
          Three short prompts. These stay with you — answer only what you want
          to answer.
        </p>

        {PROMPTS.map((p, i) => (
          <div className="mm-field" key={p.key}>
            <label className="mm-field-label" htmlFor={p.key}>
              <span style={{ color: "#435e35", fontWeight: 700 }}>
                0{i + 1}
              </span>{" "}
              · {p.title}
            </label>
            <textarea
              id={p.key}
              className="mm-textarea"
              rows={3}
              value={state[p.key]}
              onChange={(e) => update({ [p.key]: e.target.value } as never)}
            />
          </div>
        ))}
      </main>

      <div className="mm-assess-actions">
        <button className="mm-btn mm-btn-ghost" onClick={onBack}>
          ← Back
        </button>
        <button className="mm-btn mm-btn-primary" onClick={onNext}>
          Continue →
        </button>
      </div>
    </>
  );
}
