"use client";

import { useAssessment } from "./AssessmentContext";

export default function StepDone({ assessmentId }: { assessmentId: string }) {
  const { reset } = useAssessment();
  const pdfHref = `/api/assessment/${assessmentId}/pdf`;

  return (
    <>
      <main className="mm-assess-main">
        <div className="mm-done-card">
          <div className="mm-done-emoji">🌿</div>
          <h1
            className="mm-assess-title"
            style={{ marginTop: 12, fontSize: 34 }}
          >
            Your matrix is ready.
          </h1>
          <p className="mm-assess-sub" style={{ margin: "12px auto 0" }}>
            Thank you. Each assessment helps tune this framework for the next
            person who tries it.
          </p>
          <div className="mm-done-actions">
            <a href={pdfHref} className="mm-btn mm-btn-primary" download>
              Download my PDF
            </a>
            <button
              className="mm-btn mm-btn-ghost"
              onClick={() => {
                reset();
                window.location.href = "/mission-matrix";
              }}
            >
              Back to the Mission Matrix
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
