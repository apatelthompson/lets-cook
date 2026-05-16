import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import {
  QUADRANT_META,
  type Quadrant,
} from "@/lib/mission-matrix-types";

/**
 * POST /api/audition/suggest
 *
 * Generates per-item AI helper sketches for one quadrant, tailored to
 * the user's role profile. Uses Claude Haiku 4.5 (cheap + fast) and
 * caches the system prompt so subsequent quadrant calls within the same
 * session reuse the role context for free.
 *
 * Request body: { quadrant, items, profile }
 * Response: { suggestions: { [itemText]: string[] } }  (2 sketches per item)
 */

interface Profile {
  career_stage?: string;
  function_label?: string;
  role_title?: string;
  team_size_managed?: string;
  years_experience?: string;
  company_size?: string;
}

interface RequestBody {
  quadrant: Quadrant;
  items: string[];
  profile: Profile;
}

const QUADRANT_TO_ARCHETYPE: Record<Quadrant, string> = {
  craft: "Forcefield Agent — a long-running agent that shields the user from noise",
  growth: "Chat with context — a thinking partner the user shares context and gaps with",
  routine: "Automation — or elimination (sometimes the right answer is to stop doing it)",
  drain: "Skill / Project — a packaged context the user can run to lighten the load",
};

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "AI suggestions need the ANTHROPIC_API_KEY env var. Add it to .env.local (local) or Vercel project settings (production).",
      },
      { status: 503 },
    );
  }

  let body: RequestBody;
  try {
    body = (await req.json()) as RequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { quadrant, items, profile } = body;
  if (!quadrant || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json(
      { error: "quadrant and items[] are required" },
      { status: 400 },
    );
  }
  if (!QUADRANT_TO_ARCHETYPE[quadrant]) {
    return NextResponse.json({ error: "Unknown quadrant" }, { status: 400 });
  }

  const archetype = QUADRANT_TO_ARCHETYPE[quadrant];
  const quadrantMeta = QUADRANT_META[quadrant];

  // System prompt — gets cached. Same across all 4 quadrant calls in a
  // session because the profile doesn't change mid-flow.
  const profileLines = [
    profile.career_stage && `Career stage: ${profile.career_stage}`,
    profile.function_label && `Function: ${profile.function_label}`,
    profile.role_title && `Title: ${profile.role_title}`,
    profile.team_size_managed &&
      `Team they manage: ${profile.team_size_managed}`,
    profile.years_experience && `Years in role: ${profile.years_experience}`,
    profile.company_size && `Company size: ${profile.company_size}`,
  ]
    .filter(Boolean)
    .join("\n");

  const systemText = `You are an AI advisor helping someone audition AI tools for the work on their plate. They have just mapped their work onto the Mission Matrix (a 2x2 of meaning x unique expertise), and now want concrete, specific ideas for AI helpers — at the level of "what would I actually build."

Their profile:
${profileLines || "(no profile provided)"}

Tailor every suggestion to their role, team size, and tenure. A CEO of a 5-person startup needs different helpers than a Senior Marketing Manager at a 500-person company. Reference their specific context where it adds signal.

Your job is to suggest concrete, buildable AI helpers — not vague advice. Each suggestion should be one tight sentence that names the helper's job and (when possible) hints at how it would work.`;

  const userText = `For each of these work items in the **${quadrantMeta.title}** quadrant (${quadrantMeta.subtitle}), suggest exactly 2 concrete AI helper sketches.

The right shape of AI for this quadrant: ${archetype}.

Items:
${items.map((it, i) => `${i + 1}. ${it}`).join("\n")}

Respond as a single JSON object with this exact shape — no markdown, no prose:
{
  "suggestions": {
    "<exact item text 1>": ["sketch 1", "sketch 2"],
    "<exact item text 2>": ["sketch 1", "sketch 2"],
    ...
  }
}

Each sketch: one sentence, specific, actionable. Lead with the helper type (e.g. "Forcefield agent that...", "Claude Project for...", "Zap that..."). No filler.`;

  const client = new Anthropic({ apiKey });

  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 1500,
      system: [
        {
          type: "text",
          text: systemText,
          // Cache the system prompt — saves tokens across the 4 quadrant
          // calls in a single session.
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [{ role: "user", content: userText }],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("LLM returned no text block");
    }

    // Defensive parse — the model is asked for JSON only, but strip
    // accidental code fences just in case.
    const raw = textBlock.text.trim().replace(/^```(?:json)?\s*|\s*```$/g, "");
    const parsed = JSON.parse(raw) as {
      suggestions: Record<string, string[]>;
    };

    return NextResponse.json({
      suggestions: parsed.suggestions,
      usage: response.usage,
    });
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Unknown error generating suggestions";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
