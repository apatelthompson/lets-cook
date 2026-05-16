"use client";

import { QUADRANT_META, type Quadrant } from "@/lib/mission-matrix-types";

/**
 * Page 1 of Part II — educational. Four cards, one per quadrant, each
 * showing the AI archetype and the *type* of tool that fits, with a few
 * named examples in parentheses. Examples are intentionally short — kept
 * at the level of "tool category" not "specific implementation."
 */
interface ToolTypeMeta {
  q: 1 | 2 | 3 | 4;
  name: string;
  archetype: string;
  toolType: string;
  examples: string;
  pitch: string;
}

const TOOLS: Record<Quadrant, ToolTypeMeta> = {
  craft: {
    q: 1,
    name: "Q1 · Craft",
    archetype: "Forcefield agent",
    toolType: "Agent",
    examples: "Claude Code, n8n persistent flows, CrewAI",
    pitch:
      "A long-running agent that quietly handles the noise — so you show up present, in lead, bringing your expertise to the work only you can do.",
  },
  growth: {
    q: 2,
    name: "Q2 · Growth",
    archetype: "Chat with context",
    toolType: "Chat",
    examples: "ChatGPT, Claude, Gemini",
    pitch:
      "You bring the why; the AI brings the how. Tell it how you like to be challenged and where your gaps are — it becomes a thinking partner, not a vending machine.",
  },
  routine: {
    q: 3,
    name: "Q3 · Routine",
    archetype: "Automate — or eliminate",
    toolType: "Automation",
    examples: "Zapier, n8n, Make, GitHub Actions",
    pitch:
      "Fire and forget. Or — equally valid — stop doing it at all. Even automation costs management overhead; sometimes the right answer is elimination.",
  },
  drain: {
    q: 4,
    name: "Q4 · Drain",
    archetype: "Skills / Projects",
    toolType: "Skills",
    examples: "Claude Skills, Claude Projects, Custom GPTs",
    pitch:
      "Package the context you've built into something reusable. You stay in the driver's seat; the AI handles the parts that drain you.",
  },
};

const RENDER_ORDER: Quadrant[] = ["craft", "growth", "drain", "routine"];

export default function StepToolTypes({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <>
      <main className="mm-assess-main">
        <div className="mm-assess-eyebrow">Part II · Audition the tools</div>
        <h1 className="mm-assess-title">
          One AI doesn&apos;t fit every kind of work.
        </h1>
        <p className="mm-assess-sub">
          Each quadrant calls for a different shape of AI. Here&apos;s the lay
          of the land — next step, we&apos;ll match these to your actual work.
        </p>

        <div className="pg-tooltype-list">
          {RENDER_ORDER.map((q) => {
            const meta = QUADRANT_META[q];
            const tool = TOOLS[q];
            return (
              <section
                key={q}
                className="pg-tooltype-card"
                style={{ background: meta.bg, color: meta.ink }}
              >
                <div className="pg-tooltype-head">
                  <div className="pg-tooltype-q">{tool.name}</div>
                  <h2 className="pg-tooltype-title">{meta.title}</h2>
                </div>

                <div className="pg-tooltype-archetype">
                  <span className="pg-tooltype-label">AI archetype</span>
                  <span className="pg-tooltype-value">{tool.archetype}</span>
                </div>

                <div className="pg-tooltype-tool">
                  <span className="pg-tooltype-tool-type">{tool.toolType}</span>
                  <span className="pg-tooltype-tool-examples">
                    ({tool.examples})
                  </span>
                </div>

                <p className="pg-tooltype-pitch">{tool.pitch}</p>
              </section>
            );
          })}
        </div>
      </main>

      <div className="mm-assess-actions">
        <button className="mm-btn mm-btn-ghost" onClick={onBack}>
          ← Back
        </button>
        <button className="mm-btn mm-btn-primary" onClick={onNext}>
          Match to your work →
        </button>
      </div>
    </>
  );
}
