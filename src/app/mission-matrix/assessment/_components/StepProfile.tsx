"use client";

import { useAssessment } from "./AssessmentContext";
import {
  COMPANY_SIZES,
  PROFESSION_CATEGORIES,
  YEARS_EXPERIENCE,
} from "@/lib/mission-matrix-types";

export default function StepProfile({ onNext }: { onNext: () => void }) {
  const { state, update } = useAssessment();
  const ready =
    state.profession_category !== "" &&
    state.role_title.trim().length > 0 &&
    state.company_size !== "" &&
    state.years_experience !== "" &&
    (state.profession_category !== "Other" ||
      state.profession_other.trim().length > 0);

  return (
    <>
      <main className="mm-assess-main">
        <div className="mm-assess-eyebrow">About you</div>
        <h1 className="mm-assess-title">A quick hello.</h1>
        <p className="mm-assess-sub">
          A few details to ground the exercise — and to help us understand how
          this framework lands across different kinds of work. Nothing here is
          shared publicly.
        </p>

        <div className="mm-field">
          <label className="mm-field-label" htmlFor="profession_category">
            What best describes your work?
          </label>
          <select
            id="profession_category"
            className="mm-select"
            value={state.profession_category}
            onChange={(e) =>
              update({
                profession_category: e.target
                  .value as typeof state.profession_category,
              })
            }
          >
            <option value="">Choose one…</option>
            {PROFESSION_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {state.profession_category === "Other" && (
          <div className="mm-field">
            <label className="mm-field-label" htmlFor="profession_other">
              Tell us more
            </label>
            <input
              id="profession_other"
              className="mm-input"
              type="text"
              placeholder="e.g. Clinician · Product coach · Policy advisor"
              value={state.profession_other}
              onChange={(e) => update({ profession_other: e.target.value })}
            />
          </div>
        )}

        <div className="mm-field">
          <label className="mm-field-label" htmlFor="role_title">
            Your role or title
          </label>
          <input
            id="role_title"
            className="mm-input"
            type="text"
            placeholder="e.g. Head of Product · Senior Counsel · Founder"
            value={state.role_title}
            onChange={(e) => update({ role_title: e.target.value })}
          />
        </div>

        <div className="mm-field-row">
          <div className="mm-field">
            <label className="mm-field-label" htmlFor="company_size">
              Company size
            </label>
            <select
              id="company_size"
              className="mm-select"
              value={state.company_size}
              onChange={(e) =>
                update({
                  company_size: e.target.value as typeof state.company_size,
                })
              }
            >
              <option value="">Choose one…</option>
              {COMPANY_SIZES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="mm-field">
            <label className="mm-field-label" htmlFor="years_experience">
              Years in this role
            </label>
            <select
              id="years_experience"
              className="mm-select"
              value={state.years_experience}
              onChange={(e) =>
                update({
                  years_experience: e.target
                    .value as typeof state.years_experience,
                })
              }
            >
              <option value="">Choose one…</option>
              {YEARS_EXPERIENCE.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mm-field-row">
          <div className="mm-field">
            <label className="mm-field-label" htmlFor="company_name">
              Company <span style={{ opacity: 0.55 }}>(optional)</span>
            </label>
            <input
              id="company_name"
              className="mm-input"
              type="text"
              value={state.company_name}
              onChange={(e) => update({ company_name: e.target.value })}
            />
          </div>
          <div className="mm-field">
            <label className="mm-field-label" htmlFor="location">
              City or country <span style={{ opacity: 0.55 }}>(optional)</span>
            </label>
            <input
              id="location"
              className="mm-input"
              type="text"
              value={state.location}
              onChange={(e) => update({ location: e.target.value })}
            />
          </div>
        </div>
      </main>

      <div className="mm-assess-actions">
        <span />
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
