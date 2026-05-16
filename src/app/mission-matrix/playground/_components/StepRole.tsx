"use client";

import { useAssessment } from "../../assessment/_components/AssessmentContext";
import { SEED_ROLES } from "@/lib/mission-matrix-seeds";

export default function StepRole({ onNext }: { onNext: () => void }) {
  const { state, update } = useAssessment();
  const selected = state.role_id ?? "";

  return (
    <>
      <main className="mm-assess-main">
        <div className="mm-assess-eyebrow">Playground · Step 1</div>
        <h1 className="mm-assess-title">Where do you sit?</h1>
        <p className="mm-assess-sub">
          Pick the closest fit. We&apos;ll show you a starter list of work that
          tends to show up in this role — you&apos;ll edit, add, and drop from
          there. Nothing about this list is &quot;right&quot; — it&apos;s a
          thought-starter, not an answer.
        </p>

        <div className="pg-role-grid">
          {SEED_ROLES.map((role) => (
            <button
              key={role.id}
              type="button"
              className={
                "pg-role-card" + (selected === role.id ? " selected" : "")
              }
              onClick={() => update({ role_id: role.id })}
            >
              <span className="pg-role-card-label">{role.label}</span>
              <span className="pg-role-card-meta">
                {role.tasks.length} starter tasks
              </span>
            </button>
          ))}
        </div>
      </main>

      <div className="mm-assess-actions">
        <span />
        <button
          className="mm-btn mm-btn-primary"
          onClick={onNext}
          disabled={!selected}
        >
          Continue →
        </button>
      </div>
    </>
  );
}
