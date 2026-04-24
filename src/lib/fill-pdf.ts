import { PDFDocument, type PDFTextField } from "pdf-lib";
import fs from "node:fs/promises";
import path from "node:path";
import type { AssessmentState } from "./mission-matrix-types";
import { quadrantFor, type Quadrant } from "./mission-matrix-types";

const TEMPLATE_PATH = path.join(
  process.cwd(),
  "public",
  "downloads",
  "map-the-meaning.pdf",
);

function safeSet(form: ReturnType<PDFDocument["getForm"]>, name: string, value: string) {
  try {
    const field = form.getTextField(name) as PDFTextField;
    field.setText(value);
  } catch {
    // field missing from template — ignore
  }
}

export async function fillAssessmentPdf(state: AssessmentState): Promise<Uint8Array> {
  const bytes = await fs.readFile(TEMPLATE_PATH);
  const doc = await PDFDocument.load(bytes);
  const form = doc.getForm();

  // cover fields
  if (state.name) safeSet(form, "your_name", state.name);
  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  safeSet(form, "date", today);

  // Items: fill both the brain-dump slots and the rating table.
  const byQuadrant: Record<Quadrant, string[]> = {
    growth: [],
    craft: [],
    routine: [],
    drain: [],
  };

  state.items.forEach((it, i) => {
    const slot = i + 1;
    if (it.text.trim()) {
      safeSet(form, `item_${slot}`, it.text);
      safeSet(form, `rate_item_${slot}`, it.text);
    }
    if (it.meaning != null) safeSet(form, `meaning_${slot}`, String(it.meaning));
    if (it.expertise != null) safeSet(form, `expertise_${slot}`, String(it.expertise));

    if (it.text.trim() && it.meaning != null && it.expertise != null) {
      byQuadrant[quadrantFor(it.meaning, it.expertise)].push(it.text.trim());
    }
  });

  // Quadrant text areas
  safeSet(form, "q_growth", byQuadrant.growth.join("\n"));
  safeSet(form, "q_craft", byQuadrant.craft.join("\n"));
  safeSet(form, "q_routine", byQuadrant.routine.join("\n"));
  safeSet(form, "q_drain", byQuadrant.drain.join("\n"));

  // Reflections
  safeSet(form, "refl_1", state.reflection_1);
  safeSet(form, "refl_2", state.reflection_2);
  safeSet(form, "refl_3", state.reflection_3);

  // Keep the form editable — don't flatten. Users can still type / print.
  return await doc.save();
}
