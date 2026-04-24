import Airtable from "airtable";
import { config } from "./config";
import type { AssessmentItem, AssessmentState } from "./mission-matrix-types";
import { quadrantFor } from "./mission-matrix-types";

let _base: Airtable.Base | null = null;
function base(): Airtable.Base {
  if (_base) return _base;
  if (!config.airtable.apiKey || !config.airtable.missionMatrixBaseId) {
    throw new Error(
      "Mission Matrix Airtable not configured. Set AIRTABLE_API_KEY and AIRTABLE_MISSION_MATRIX_BASE_ID.",
    );
  }
  _base = new Airtable({ apiKey: config.airtable.apiKey }).base(
    config.airtable.missionMatrixBaseId,
  );
  return _base;
}

function countQuadrants(state: AssessmentState) {
  const counts = { growth: 0, craft: 0, routine: 0, drain: 0 };
  for (const it of state.items) {
    if (it.meaning == null || it.expertise == null || !it.text.trim()) continue;
    counts[quadrantFor(it.meaning, it.expertise)]++;
  }
  return counts;
}

export async function saveAssessment(state: AssessmentState) {
  const completionSeconds = Math.round((Date.now() - state.started_at) / 1000);
  const counts = countQuadrants(state);

  const assessmentsTable = base()(config.airtable.missionMatrixAssessmentsTable);
  const itemsTable = base()(config.airtable.missionMatrixItemsTable);

  // Create the parent assessment record.
  const createdAssessment = await assessmentsTable.create([
    {
      fields: {
        completion_seconds: completionSeconds,
        profession_category: state.profession_category || undefined,
        profession_other: state.profession_other || undefined,
        role_title: state.role_title || undefined,
        company_size: state.company_size || undefined,
        years_experience: state.years_experience || undefined,
        company_name: state.company_name || undefined,
        location: state.location || undefined,
        email: state.email || undefined,
        first_name: state.first_name || undefined,
        consent_research: state.consent_research,
        consent_marketing: state.consent_marketing,
        reflection_1: state.reflection_1 || undefined,
        reflection_2: state.reflection_2 || undefined,
        reflection_3: state.reflection_3 || undefined,
        quadrant_count_growth: counts.growth,
        quadrant_count_craft: counts.craft,
        quadrant_count_routine: counts.routine,
        quadrant_count_drain: counts.drain,
      },
    },
  ]);

  const assessmentRecord = createdAssessment[0];
  const assessmentId = assessmentRecord.id;

  // Create item records in batches of 10 (Airtable cap).
  const validItems = state.items.filter(
    (it) =>
      it.text.trim() && it.meaning != null && it.expertise != null,
  );
  for (let i = 0; i < validItems.length; i += 10) {
    const chunk = validItems.slice(i, i + 10);
    await itemsTable.create(
      chunk.map((it) => ({
        fields: {
          assessment: [assessmentId],
          order_num: it.order,
          item_text: it.text,
          meaning_score: it.meaning!,
          expertise_score: it.expertise!,
          quadrant: quadrantFor(it.meaning!, it.expertise!),
        },
      })),
    );
  }

  return { assessmentId };
}

/** Load a saved assessment back from Airtable for PDF rendering. */
export async function loadAssessment(
  assessmentId: string,
): Promise<AssessmentState | null> {
  const assessmentsTable = base()(config.airtable.missionMatrixAssessmentsTable);
  const itemsTable = base()(config.airtable.missionMatrixItemsTable);

  let record;
  try {
    record = await assessmentsTable.find(assessmentId);
  } catch {
    return null;
  }
  const fields = record.fields as Record<string, unknown>;

  const itemRecords = await itemsTable
    .select({
      filterByFormula: `{assessment} = '${assessmentId}'`,
      pageSize: 100,
    })
    .all();

  const items: AssessmentItem[] = itemRecords
    .map((r) => ({
      order: Number(r.get("order_num") ?? 0),
      text: String(r.get("item_text") ?? ""),
      meaning: Number(r.get("meaning_score")) || null,
      expertise: Number(r.get("expertise_score")) || null,
    }))
    .sort((a, b) => a.order - b.order);

  return {
    profession_category: (fields.profession_category as never) ?? "",
    profession_other: String(fields.profession_other ?? ""),
    role_title: String(fields.role_title ?? ""),
    company_size: (fields.company_size as never) ?? "",
    years_experience: (fields.years_experience as never) ?? "",
    company_name: String(fields.company_name ?? ""),
    location: String(fields.location ?? ""),
    items,
    reflection_1: String(fields.reflection_1 ?? ""),
    reflection_2: String(fields.reflection_2 ?? ""),
    reflection_3: String(fields.reflection_3 ?? ""),
    first_name: String(fields.first_name ?? ""),
    email: String(fields.email ?? ""),
    consent_research: Boolean(fields.consent_research),
    consent_marketing: Boolean(fields.consent_marketing),
    started_at: Date.now(),
  };
}
