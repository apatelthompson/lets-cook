"use client";

import { useAssessment } from "../../assessment/_components/AssessmentContext";
import {
  CAREER_STAGES,
  COMPANY_SIZES,
  FUNCTION_AREAS,
  TEAM_SIZES,
  YEARS_EXPERIENCE,
} from "@/lib/mission-matrix-types";

/**
 * Title suggestions shown in the datalist. Users can type anything;
 * this is just a nudge toward standardized values.
 */
const TITLE_SUGGESTIONS = [
  "Chief Executive Officer",
  "Founder",
  "Co-founder",
  "Chief of Staff",
  "Chief Operating Officer",
  "VP Operations",
  "Head of Operations",
  "Operations Manager",
  "Chief People Officer",
  "VP People",
  "Head of HR",
  "People Partner",
  "Chief Financial Officer",
  "VP Finance",
  "Head of Finance",
  "Controller",
  "Chief Marketing Officer",
  "VP Marketing",
  "Head of Marketing",
  "Marketing Manager",
  "Chief Revenue Officer",
  "VP Sales",
  "Head of Sales",
  "Sales Director",
  "Account Executive",
  "VP Customer Success",
  "Head of Customer Success",
  "Customer Success Manager",
  "Head of Design",
  "Principal Designer",
  "Senior Product Designer",
  "Product Designer",
  "VP Product",
  "Head of Product",
  "Senior Product Manager",
  "Product Manager",
  "VP Engineering",
  "Engineering Manager",
  "Staff Engineer",
  "Senior Software Engineer",
];

export default function StepProfile({ onNext }: { onNext: () => void }) {
  const { state, update } = useAssessment();

  const ready =
    !!state.career_stage &&
    !!state.function_area &&
    state.role_title.trim().length > 0 &&
    !!state.team_size_managed &&
    state.company_size !== "" &&
    state.years_experience !== "";

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

        <div className="mm-field-row">
          <div className="mm-field">
            <label className="mm-field-label" htmlFor="career_stage">
              What best describes your work?
            </label>
            <select
              id="career_stage"
              className="mm-select"
              value={state.career_stage ?? ""}
              onChange={(e) =>
                update({
                  career_stage: e.target.value as typeof state.career_stage,
                })
              }
            >
              <option value="">Choose one…</option>
              {CAREER_STAGES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="mm-field">
            <label className="mm-field-label" htmlFor="function_area">
              Function
            </label>
            <select
              id="function_area"
              className="mm-select"
              value={state.function_area ?? ""}
              onChange={(e) =>
                update({
                  function_area: e.target.value as typeof state.function_area,
                })
              }
            >
              <option value="">Choose one…</option>
              {FUNCTION_AREAS.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mm-field-row">
          <div className="mm-field">
            <label className="mm-field-label" htmlFor="role_title">
              Title
            </label>
            <input
              id="role_title"
              className="mm-input"
              type="text"
              list="title-suggestions"
              placeholder="Start typing — or pick from suggestions"
              value={state.role_title}
              onChange={(e) => update({ role_title: e.target.value })}
              autoComplete="off"
            />
            <datalist id="title-suggestions">
              {TITLE_SUGGESTIONS.map((t) => (
                <option key={t} value={t} />
              ))}
            </datalist>
          </div>
          <div className="mm-field">
            <label className="mm-field-label" htmlFor="team_size_managed">
              Team size you manage
            </label>
            <select
              id="team_size_managed"
              className="mm-select"
              value={state.team_size_managed ?? ""}
              onChange={(e) =>
                update({
                  team_size_managed: e.target
                    .value as typeof state.team_size_managed,
                })
              }
            >
              <option value="">Choose one…</option>
              {TEAM_SIZES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
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
