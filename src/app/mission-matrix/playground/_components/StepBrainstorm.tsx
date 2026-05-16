"use client";

import { useMemo } from "react";
import { useAssessment } from "../../assessment/_components/AssessmentContext";
import {
  QUADRANT_META,
  quadrantFor,
  type Quadrant,
} from "@/lib/mission-matrix-types";

/**
 * Canonical Mission Matrix mapping (Q1 top-right, counterclockwise).
 * Q1 is the most important place — where our deeply human selves live.
 * See memory: feedback_mission_matrix_quadrants.md
 */
interface ArchetypeMeta {
  q: 1 | 2 | 3 | 4;
  name: string;
  archetype: string;
  pitch: string;
  movement?: string;
}

const ARCHETYPES: Record<Quadrant, ArchetypeMeta> = {
  craft: {
    q: 1,
    name: "Q1 · Craft",
    archetype: "Forcefield agent",
    pitch:
      "This is where your deeply human self lives — and where AI's job is to protect that. A forcefield agent shields you from the noise (inbox triage, scheduling chatter, status pings) so you can show up present, in lead, bringing your expertise and human gifts to the work that only you can do.",
  },
  growth: {
    q: 2,
    name: "Q2 · Growth",
    archetype: "Chat with context",
    pitch:
      "You bring the why; AI brings the how. The trick is telling it how you like to be challenged, where your expertise gaps are, and what you actually want to learn — not just getting an answer. The chat is a thinking partner, not a vending machine.",
    movement:
      "This is a movement quadrant. As you do the work, some of it will turn out not very meaningful — let that move to Q3 (automate or eliminate). The rest will become deeply meaningful — invest in it, and it graduates to Q1 craft.",
  },
  routine: {
    q: 3,
    name: "Q3 · Routine",
    archetype: "Automate — or eliminate",
    pitch:
      "Low meaning, low expertise. Context is thin and easily shared via wikis. The first move is automation (a scheduled job, a webhook, a cron). The second, equally important move: eliminate. Even automating costs management overhead — sometimes the right answer is to stop doing it at all.",
  },
  drain: {
    q: 4,
    name: "Q4 · Drain",
    archetype: "Skills / Projects",
    pitch:
      "You're great at this. It costs you. Skills and projects let you extend your toolkit — package the context you've built so the work runs with you in the driver's seat, not against you.",
    movement:
      "This is a movement quadrant. Some of this work can move to Q3 (it really can just be automated). Some of it — once unburdened by the crud — is actually deeply meaningful, and graduates to Q1 craft.",
  },
};

// Render order: Q1 first (the most important place), then Q2, Q4, Q3.
const RENDER_ORDER: Quadrant[] = ["craft", "growth", "drain", "routine"];

export default function StepBrainstorm({
  onBack,
  onRestart,
}: {
  onBack: () => void;
  onRestart: () => void;
}) {
  const { state } = useAssessment();

  const byQuadrant = useMemo(() => {
    const out: Record<Quadrant, string[]> = {
      growth: [],
      craft: [],
      routine: [],
      drain: [],
    };
    for (const it of state.items) {
      if (it.meaning == null || it.expertise == null || !it.text.trim()) continue;
      out[quadrantFor(it.meaning, it.expertise)].push(it.text.trim());
    }
    return out;
  }, [state.items]);

  return (
    <>
      <main className="mm-assess-main">
        <div className="mm-assess-eyebrow">Playground · Step 5</div>
        <h1 className="mm-assess-title">Now — what kind of AI fits where?</h1>
        <p className="mm-assess-sub">
          Each quadrant calls for a different shape of AI. Look at where your
          work actually landed, then read what fits. Q1 is the most important
          place — it&apos;s where your deeply human self lives.
        </p>

        <div className="pg-brainstorm-list">
          {RENDER_ORDER.map((q) => {
            const meta = QUADRANT_META[q];
            const arch = ARCHETYPES[q];
            const items = byQuadrant[q];
            return (
              <section
                key={q}
                className="pg-brainstorm-card"
                style={{ background: meta.bg, color: meta.ink }}
              >
                <div className="pg-brainstorm-head">
                  <div className="pg-brainstorm-q">{arch.name}</div>
                  <h2 className="pg-brainstorm-title">{meta.title}</h2>
                  <div className="pg-brainstorm-sub">{meta.subtitle}</div>
                </div>

                <div className="pg-brainstorm-archetype">
                  <span className="pg-brainstorm-archetype-label">AI archetype</span>
                  <span className="pg-brainstorm-archetype-name">
                    {arch.archetype}
                  </span>
                </div>

                <p className="pg-brainstorm-pitch">{arch.pitch}</p>

                {arch.movement && (
                  <p className="pg-brainstorm-movement">{arch.movement}</p>
                )}

                <div className="pg-brainstorm-yours">
                  <div className="pg-brainstorm-yours-label">
                    Your work here
                  </div>
                  {items.length === 0 ? (
                    <div className="pg-brainstorm-empty">
                      Nothing landed here. That&apos;s information too.
                    </div>
                  ) : (
                    <ul className="pg-brainstorm-items">
                      {items.map((t, i) => (
                        <li key={i}>{t}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </main>

      <div className="mm-assess-actions">
        <button className="mm-btn mm-btn-ghost" onClick={onBack}>
          ← Back to plot
        </button>
        <button className="mm-btn mm-btn-primary" onClick={onRestart}>
          Start over
        </button>
      </div>
    </>
  );
}
