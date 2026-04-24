import { NextResponse } from "next/server";
import { saveAssessment } from "@/lib/mission-matrix-airtable";
import type { AssessmentState } from "@/lib/mission-matrix-types";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: AssessmentState;
  try {
    body = (await req.json()) as AssessmentState;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || !Array.isArray(body.items)) {
    return NextResponse.json({ error: "Malformed payload" }, { status: 400 });
  }
  if (!body.consent_research) {
    return NextResponse.json(
      { error: "Consent is required to submit." },
      { status: 400 },
    );
  }

  try {
    const { assessmentId } = await saveAssessment(body);
    return NextResponse.json({ assessmentId });
  } catch (e) {
    console.error("[assessment] save failed", e);
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
