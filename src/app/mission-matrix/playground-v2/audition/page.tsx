"use client";

import "../../mission-matrix.css";
import "../../assessment/assessment.css";
import "../playground.css";
import { AssessmentProvider } from "../../assessment/_components/AssessmentContext";
import {
  Wizard,
  PLAYGROUND_V2_STORAGE_KEY,
  PART_II_START_STEP,
} from "../page";

/**
 * Deep-link to Part II — for people coming back to pick up where they
 * left off. Mounts the same wizard with the same storage key, but starts
 * at the first Part II step. If the user has no rated items in storage,
 * the wizard's own effect bounces them back to step 0.
 */
export default function Page() {
  return (
    <AssessmentProvider storageKey={PLAYGROUND_V2_STORAGE_KEY}>
      <Wizard initialStep={PART_II_START_STEP} />
    </AssessmentProvider>
  );
}
