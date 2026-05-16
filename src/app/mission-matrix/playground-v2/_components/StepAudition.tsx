"use client";

import { useMemo, useState } from "react";
import { useAssessment } from "../../assessment/_components/AssessmentContext";
import {
  FUNCTION_AREAS,
  QUADRANT_META,
  quadrantFor,
  type AssessmentState,
  type Quadrant,
} from "@/lib/mission-matrix-types";

const RENDER_ORDER: Quadrant[] = ["craft", "growth", "drain", "routine"];

const BRAINSTORM_FIELD: Record<
  Quadrant,
  "brainstorm_craft" | "brainstorm_growth" | "brainstorm_routine" | "brainstorm_drain"
> = {
  craft: "brainstorm_craft",
  growth: "brainstorm_growth",
  routine: "brainstorm_routine",
  drain: "brainstorm_drain",
};

export default function StepAudition({
  onBack,
  onRestart,
}: {
  onBack: () => void;
  onRestart: () => void;
}) {
  const { state, update } = useAssessment();
  const [loadingQuadrant, setLoadingQuadrant] = useState<Quadrant | null>(null);
  const [errorByQuadrant, setErrorByQuadrant] = useState<
    Partial<Record<Quadrant, string>>
  >({});
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const itemsByQuadrant = useMemo(() => {
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

  const suggestions = state.suggestions_by_item ?? {};

  async function saveAndDownload() {
    setDownloading(true);
    setDownloadError(null);
    try {
      // Consent must be true to submit. The v2 flow's consent step sets
      // it earlier; if a user deep-linked into /audition without ever
      // hitting consent, we set it implicitly here since they are
      // explicitly asking for the PDF.
      const payload: AssessmentState = {
        ...state,
        consent_research: true,
      };
      const res = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Save failed (${res.status})`);
      }
      const { assessmentId } = (await res.json()) as { assessmentId: string };

      // Trigger the download. Open in a new tab so the user stays on
      // the audition page (they may want to keep editing notes).
      const pdfHref = `/api/assessment/${assessmentId}/pdf`;
      window.open(pdfHref, "_blank");
    } catch (e) {
      setDownloadError(
        e instanceof Error
          ? e.message
          : "Couldn't save your matrix — try again in a moment.",
      );
    } finally {
      setDownloading(false);
    }
  }

  async function getSuggestions(q: Quadrant) {
    const items = itemsByQuadrant[q];
    if (items.length === 0) return;
    setLoadingQuadrant(q);
    setErrorByQuadrant((e) => ({ ...e, [q]: undefined }));

    try {
      const functionLabel = FUNCTION_AREAS.find(
        (f) => f.id === state.function_area,
      )?.label;
      const res = await fetch("/api/audition/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quadrant: q,
          items,
          profile: {
            career_stage: state.career_stage,
            function_label: functionLabel,
            role_title: state.role_title,
            team_size_managed: state.team_size_managed,
            years_experience: state.years_experience,
            company_size: state.company_size,
          },
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Request failed (${res.status})`);
      }
      const body = (await res.json()) as {
        suggestions: Record<string, string[]>;
      };
      update({
        suggestions_by_item: { ...suggestions, ...body.suggestions },
      });
    } catch (e) {
      setErrorByQuadrant((errs) => ({
        ...errs,
        [q]:
          e instanceof Error
            ? e.message
            : "Something went wrong generating suggestions.",
      }));
    } finally {
      setLoadingQuadrant(null);
    }
  }

  return (
    <>
      <main className="mm-assess-main">
        <div className="mm-assess-eyebrow">Part II · Your audition board</div>
        <h1 className="mm-assess-title">
          Now — what would you actually build?
        </h1>
        <p className="mm-assess-sub">
          For each quadrant, jot down the AI helpers that come to mind. Hit
          <strong> ✨ Get AI suggestions</strong> to get starter ideas tailored
          to your role — then make them yours.
        </p>

        <div className="pg-audition-list">
          {RENDER_ORDER.map((q) => {
            const meta = QUADRANT_META[q];
            const items = itemsByQuadrant[q];
            const field = BRAINSTORM_FIELD[q];
            const text = state[field] ?? "";
            const isLoading = loadingQuadrant === q;
            const error = errorByQuadrant[q];

            return (
              <section
                key={q}
                className="pg-audition-card"
                style={{ background: meta.bg, color: meta.ink }}
              >
                <div className="pg-audition-head">
                  <h2 className="pg-audition-title">{meta.title}</h2>
                  <span className="pg-audition-sub">{meta.subtitle}</span>
                </div>

                {items.length === 0 ? (
                  <div className="pg-audition-empty">
                    Nothing landed here. Skip and come back if you want.
                  </div>
                ) : (
                  <>
                    <ul className="pg-audition-items">
                      {items.map((t) => {
                        const ideas = suggestions[t];
                        return (
                          <li key={t} className="pg-audition-item">
                            <div className="pg-audition-item-text">{t}</div>
                            {ideas && ideas.length > 0 && (
                              <ul className="pg-audition-ideas">
                                {ideas.map((idea, i) => (
                                  <li key={i}>{idea}</li>
                                ))}
                              </ul>
                            )}
                          </li>
                        );
                      })}
                    </ul>

                    <div className="pg-audition-action-row">
                      <button
                        type="button"
                        className="pg-audition-suggest-btn"
                        onClick={() => getSuggestions(q)}
                        disabled={isLoading}
                      >
                        {isLoading
                          ? "✨ Generating…"
                          : items.some((t) => suggestions[t])
                            ? "✨ Refresh suggestions"
                            : "✨ Get AI suggestions"}
                      </button>
                      {error && <span className="pg-audition-error">{error}</span>}
                    </div>

                    <label className="pg-audition-brainstorm-label">
                      Your notes — what would you actually build?
                    </label>
                    <textarea
                      className="pg-audition-textarea"
                      rows={4}
                      placeholder="Sketch the AI helpers you'd build for the items above…"
                      value={text}
                      onChange={(e) =>
                        update({ [field]: e.target.value } as never)
                      }
                    />
                  </>
                )}
              </section>
            );
          })}
        </div>
      </main>

      {downloadError && (
        <div className="mm-error" style={{ margin: "12px 0" }}>
          {downloadError}
        </div>
      )}

      <div className="mm-assess-actions">
        <button
          className="mm-btn mm-btn-ghost"
          onClick={onBack}
          disabled={downloading}
        >
          ← Back
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            type="button"
            className="pg-restart-link"
            onClick={onRestart}
            disabled={downloading}
          >
            Start over
          </button>
          <button
            className="mm-btn mm-btn-primary"
            onClick={saveAndDownload}
            disabled={downloading}
          >
            {downloading ? "Saving…" : "Download my matrix PDF"}
          </button>
        </div>
      </div>
    </>
  );
}
