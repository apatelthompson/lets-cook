"use client";

import { useState } from "react";
import { useAssessment } from "./AssessmentContext";
import type { AssessmentState } from "@/lib/mission-matrix-types";

interface Props {
  onBack: () => void;
  onDone: (assessmentId: string) => void;
}

export default function StepConsent({ onBack, onDone }: Props) {
  const { state, update } = useAssessment();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ready = state.consent_research;

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state satisfies AssessmentState),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Submit failed (${res.status})`);
      }
      const body = (await res.json()) as { assessmentId: string };
      onDone(body.assessmentId);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Something went wrong — try again in a moment.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <main className="mm-assess-main">
        <div className="mm-assess-eyebrow">Last step</div>
        <h1 className="mm-assess-title">Get your PDF.</h1>
        <p className="mm-assess-sub">
          We&apos;ll generate a personalized copy with your items already placed
          in their quadrants — yours to keep, print, or come back to.
        </p>

        <div className="mm-field-row">
          <div className="mm-field">
            <label className="mm-field-label" htmlFor="name">
              Full name <span style={{ opacity: 0.55 }}>(optional)</span>
            </label>
            <input
              id="name"
              className="mm-input"
              type="text"
              value={state.name}
              onChange={(e) => update({ name: e.target.value })}
            />
          </div>
          <div className="mm-field">
            <label className="mm-field-label" htmlFor="email">
              Email <span style={{ opacity: 0.55 }}>(optional)</span>
            </label>
            <input
              id="email"
              className="mm-input"
              type="email"
              placeholder="you@example.com"
              value={state.email}
              onChange={(e) => update({ email: e.target.value })}
            />
          </div>
        </div>

        <label className="mm-consent-row">
          <input
            type="checkbox"
            checked={state.consent_research}
            onChange={(e) => update({ consent_research: e.target.checked })}
          />
          <span className="mm-consent-text">
            <strong>Help us refine the framework.</strong> Use my anonymized
            responses to improve the Mission Matrix. We never share your answers
            publicly or with your name attached.
          </span>
        </label>

        <label className="mm-consent-row">
          <input
            type="checkbox"
            checked={state.consent_marketing}
            onChange={(e) => update({ consent_marketing: e.target.checked })}
          />
          <span className="mm-consent-text">
            Email me when Step 2 (<em>Audition the tools</em>) launches — no
            other email, ever.
          </span>
        </label>

        {error && <div className="mm-error">{error}</div>}
      </main>

      <div className="mm-assess-actions">
        <button
          className="mm-btn mm-btn-ghost"
          onClick={onBack}
          disabled={submitting}
        >
          ← Back
        </button>
        <button
          className="mm-btn mm-btn-primary"
          onClick={submit}
          disabled={!ready || submitting}
        >
          {submitting ? "Preparing your PDF…" : "Get my PDF"}
        </button>
      </div>
    </>
  );
}
