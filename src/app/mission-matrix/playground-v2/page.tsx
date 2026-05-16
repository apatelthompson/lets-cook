"use client";

import { useEffect, useState } from "react";
import "../mission-matrix.css";
import "../assessment/assessment.css";
import "./playground.css";
import {
  AssessmentProvider,
  useAssessment,
} from "../assessment/_components/AssessmentContext";
import StepRate from "../assessment/_components/StepRate";
import StepPlot from "../assessment/_components/StepPlot";
import StepReflect from "../assessment/_components/StepReflect";
import StepConsent from "../assessment/_components/StepConsent";
import StepProfile from "./_components/StepProfile";
import StepStarters from "./_components/StepStarters";
import StepToolTypes from "./_components/StepToolTypes";
import StepAudition from "./_components/StepAudition";

const PLAYGROUND_V2_STORAGE_KEY = "mm-playground-v2";

const STEPS = [
  "About you",
  "Pick work",
  "Rate",
  "Plot",
  "Reflect",
  "Get your PDF",
  "Tool types",
  "Your audition",
];

const PART_II_START_STEP = 6;

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mm-assess-top">
      <div className="mm-assess-brand">Mission Matrix · Playground v2</div>
      <div className="mm-assess-progress">
        {STEPS.map((_, i) => (
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
        {step + 1} / {STEPS.length}
      </div>
    </div>
  );
}

function Wizard({ initialStep = 0 }: { initialStep?: number }) {
  const [step, setStep] = useState(initialStep);
  const { state, hydrated, reset } = useAssessment();

  // If we landed on a Part II step (via /audition deep-link) but the
  // user has no rated items after hydration finishes, bounce them back
  // to the start so they're not staring at an empty audition board.
  useEffect(() => {
    if (!hydrated || step < PART_II_START_STEP) return;
    const ratedCount = state.items.filter(
      (it) => it.text.trim() && it.meaning != null && it.expertise != null,
    ).length;
    if (ratedCount === 0) setStep(0);
  }, [step, state.items, hydrated]);

  const next = () => {
    setStep((s) => s + 1);
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  };
  const back = () => {
    setStep((s) => Math.max(0, s - 1));
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  };
  const goToStarters = () => {
    setStep(1);
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  };
  const restart = () => {
    reset();
    setStep(0);
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  };

  return (
    <div className="mm-assess">
      <ProgressBar step={step} />
      {step === 0 ? (
        <StepProfile onNext={next} />
      ) : step === 1 ? (
        <StepStarters onNext={next} onBack={back} />
      ) : step === 2 ? (
        <StepRate onNext={next} onBack={back} />
      ) : step === 3 ? (
        <StepPlot
          onNext={next}
          onBack={back}
          onAddMore={goToStarters}
          nextLabel="Reflect →"
        />
      ) : step === 4 ? (
        <StepReflect onNext={next} onBack={back} />
      ) : step === 5 ? (
        <StepConsent
          onBack={back}
          dryRun
          showMarketingOptIn={false}
          submitLabel="Continue to Part II →"
          submitLoadingLabel="Saving…"
          onDone={() => next()}
        />
      ) : step === 6 ? (
        <StepToolTypes onNext={next} onBack={back} />
      ) : (
        <StepAudition onBack={back} onRestart={restart} />
      )}
    </div>
  );
}

export default function Page() {
  return (
    <AssessmentProvider storageKey={PLAYGROUND_V2_STORAGE_KEY}>
      <Wizard />
    </AssessmentProvider>
  );
}

// Exported so the /audition route can mount the same wizard at Part II.
export { Wizard, PLAYGROUND_V2_STORAGE_KEY, PART_II_START_STEP };
