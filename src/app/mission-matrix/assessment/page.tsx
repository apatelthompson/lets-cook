"use client";

import { useState } from "react";
import "../mission-matrix.css";
import "./assessment.css";
import { AssessmentProvider } from "./_components/AssessmentContext";
import ProgressBar from "./_components/ProgressBar";
import StepProfile from "./_components/StepProfile";
import StepBrainDump from "./_components/StepBrainDump";
import StepRate from "./_components/StepRate";
import StepPlot from "./_components/StepPlot";
import StepReflect from "./_components/StepReflect";
import StepConsent from "./_components/StepConsent";
import StepDone from "./_components/StepDone";

function Wizard() {
  const [step, setStep] = useState(0);
  const [assessmentId, setAssessmentId] = useState<string | null>(null);

  const next = () => {
    setStep((s) => s + 1);
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  };
  const back = () => {
    setStep((s) => Math.max(0, s - 1));
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  };

  return (
    <div className="mm-assess">
      {!assessmentId && <ProgressBar step={step} />}

      {assessmentId ? (
        <StepDone assessmentId={assessmentId} />
      ) : step === 0 ? (
        <StepProfile onNext={next} />
      ) : step === 1 ? (
        <StepBrainDump onNext={next} onBack={back} />
      ) : step === 2 ? (
        <StepRate onNext={next} onBack={back} />
      ) : step === 3 ? (
        <StepPlot onNext={next} onBack={back} />
      ) : step === 4 ? (
        <StepReflect onNext={next} onBack={back} />
      ) : (
        <StepConsent
          onBack={back}
          onDone={(id) => setAssessmentId(id)}
        />
      )}
    </div>
  );
}

export default function Page() {
  return (
    <AssessmentProvider>
      <Wizard />
    </AssessmentProvider>
  );
}
