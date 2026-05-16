"use client";

import { useState } from "react";
import "../mission-matrix.css";
import "../assessment/assessment.css";
import "./playground.css";
import { AssessmentProvider, useAssessment } from "../assessment/_components/AssessmentContext";
import StepRate from "../assessment/_components/StepRate";
import StepPlot from "../assessment/_components/StepPlot";
import StepRole from "./_components/StepRole";
import StepStarters from "./_components/StepStarters";
import StepBrainstorm from "./_components/StepBrainstorm";

const PLAYGROUND_STORAGE_KEY = "mm-playground-v1";

const STEPS = ["Role", "Pick work", "Rate", "Plot", "Brainstorm"];

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mm-assess-top">
      <div className="mm-assess-brand">Mission Matrix · Playground</div>
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

function Wizard() {
  const [step, setStep] = useState(0);
  const { reset } = useAssessment();

  const next = () => {
    setStep((s) => s + 1);
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  };
  const back = () => {
    setStep((s) => Math.max(0, s - 1));
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
        <StepRole onNext={next} />
      ) : step === 1 ? (
        <StepStarters onNext={next} onBack={back} />
      ) : step === 2 ? (
        <StepRate onNext={next} onBack={back} />
      ) : step === 3 ? (
        <StepPlot onNext={next} onBack={back} nextLabel="What AI fits? →" />
      ) : (
        <StepBrainstorm onBack={back} onRestart={restart} />
      )}
    </div>
  );
}

export default function Page() {
  return (
    <AssessmentProvider storageKey={PLAYGROUND_STORAGE_KEY}>
      <Wizard />
    </AssessmentProvider>
  );
}
