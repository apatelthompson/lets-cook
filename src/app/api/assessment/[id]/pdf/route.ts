import { NextResponse } from "next/server";
import { loadAssessment } from "@/lib/mission-matrix-airtable";
import { fillAssessmentPdf } from "@/lib/fill-pdf";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!id || !/^rec[A-Za-z0-9]+$/.test(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const state = await loadAssessment(id);
  if (!state) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const bytes = await fillAssessmentPdf(state);
    return new NextResponse(bytes as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="map-the-meaning-${id}.pdf"`,
        "Cache-Control": "private, max-age=60",
      },
    });
  } catch (e) {
    console.error("[assessment pdf] fill failed", e);
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
