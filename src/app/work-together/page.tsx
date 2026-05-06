import "../mission-matrix/mission-matrix.css";
import WorkTogetherDeck, { type Offering } from "./WorkTogetherDeck";

export const metadata = {
  title: "Work together — The Mission Matrix",
  description:
    "Turn AI confusion into a clear execution roadmap. Three ways to work together: AI Transformation Sprint, Executive Advisory, and Keynotes.",
};

const BRIEFING_MAILTO =
  "mailto:avni@thisbeautifulchaos.org?subject=" +
  encodeURIComponent("30-minute executive briefing");

const offerings: Offering[] = [
  {
    id: "transformation-sprint",
    num: "01",
    accent: "peach",
    emoji: "🎯",
    name: "AI Transformation Sprint",
    audienceShort: "Exec teams · 4–6 wks",
    pitch:
      "Turn ambiguity into a clear, actionable roadmap — your top 3 AI opportunities, prioritized by ROI and feasibility.",
    summaryPrice: "4–6 wks",
    summaryPriceUnit: "",
    bestFor:
      "Executive teams navigating AI strategy and prioritization. Organizations with resources to invest — but unclear where to focus. Companies under pressure to move from exploration to execution. Not a fit for early-stage startups, purely technical teams, or low-urgency exploration.",
    options: [
      {
        label: "What you walk away with",
        title: "Multi-million dollar opportunity clarity, and a plan to capture it",
        price: "By scope",
        priceUnit: "",
        days: [
          {
            label: "Top 3",
            text: "Your top 3 AI opportunities, prioritized by ROI and feasibility.",
          },
          {
            label: "Roadmap",
            text: "A clear execution roadmap for each initiative.",
          },
          {
            label: "Alignment",
            text: "Alignment across your leadership team on where to focus and why.",
          },
          {
            label: "Next steps",
            text: "Defined next steps your organization can actually implement — not a strategy document.",
          },
        ],
      },
      {
        label: "How we get there",
        title: "Grounded in the Mission Matrix",
        price: "4–6 wks",
        priceUnit: "",
        days: [
          {
            label: "Discover",
            text: "Where AI creates real leverage in your organization — through the lens of your goals, not the latest tools.",
          },
          {
            label: "Assess",
            text: "What's actually feasible in your current environment, with the people and systems you have.",
          },
          {
            label: "Sequence",
            text: "How to sequence initiatives for maximum impact — what to ship first, second, third.",
          },
        ],
      },
    ],
    subjectLine: "AI Transformation Sprint — let's talk",
  },
  {
    id: "executive-advisory",
    num: "02",
    accent: "sun",
    emoji: "🧭",
    name: "Executive Advisory",
    audienceShort: "Ongoing partnership",
    pitch:
      "Ongoing support for leadership teams actively executing on AI initiatives — beyond the initial sprint.",
    summaryPrice: "Ongoing",
    summaryPriceUnit: "",
    bestFor:
      "Leadership teams that have prioritized — and now want sustained guidance as capabilities, models, and markets keep moving. Builds on 4+ years working with leaders and founders through Harvard Business School, plus operating at the frontier of applied AI.",
    options: [
      {
        label: "Format",
        title: "Monthly cadence + as-needed access",
        price: "Custom",
        priceUnit: "",
        days: [
          {
            label: "Strategy",
            text: "Ongoing guidance on AI strategy and prioritization as your environment evolves.",
          },
          {
            label: "Decisions",
            text: "Support for executive decision-making — a sounding board when high-stakes calls land on your desk.",
          },
          {
            label: "Iteration",
            text: "Iteration on the roadmap as capabilities and markets shift, so the plan stays current.",
          },
        ],
      },
    ],
    subjectLine: "Executive Advisory — let's talk",
  },
  {
    id: "keynotes-sessions",
    num: "03",
    accent: "coral",
    emoji: "🎤",
    name: "Keynotes & Executive Sessions",
    audienceShort: "Leadership teams",
    pitch:
      "From AI hype to execution — talks designed to spark immediate clarity and align leadership around what actually matters.",
    summaryPrice: "Per event",
    summaryPriceUnit: "",
    bestFor:
      "Leadership teams and organizations that need clarity, not just inspiration. Sessions designed to drive alignment around what actually matters and move teams from exploration to execution.",
    options: [
      {
        label: "Keynote",
        title: "From AI Hype to Execution",
        price: "By event",
        priceUnit: "",
        days: [
          {
            label: "Why",
            text: "Why most AI initiatives stall — and how to avoid it.",
          },
          {
            label: "Identify",
            text: "How to identify high-impact use cases quickly.",
          },
          {
            label: "Execute",
            text: "What separates organizations that execute from those that don't.",
          },
        ],
      },
      {
        label: "Recent talks",
        title: "On stage, recently",
        price: "",
        priceUnit: "",
        days: [
          {
            label: "TED",
            text: "Can AI help with the chaos of family life?",
            href: "https://www.ted.com/talks/avni_patel_thompson_can_ai_help_with_the_chaos_of_family_life",
          },
          {
            label: "YC",
            text: "Founder Conference talk on building applied AI.",
            href: "https://www.youtube.com/watch?v=0W5Jaip5_-g",
          },
        ],
      },
    ],
    subjectLine: "Keynote / executive session — let's talk",
  },
];

export default function WorkTogetherPage() {
  return (
    <div className="mm-page mm-wt-page">
      <section className="mm-wt-hero">
        <div className="mm-wt-inner">
          <span className="mm-wt-eyebrow">Aligned AI in practice</span>
          <h1 className="mm-wt-h1">Work together</h1>
          <p className="mm-wt-lede">
            Turn AI confusion into a clear execution roadmap — in weeks, not
            months. The goal isn&rsquo;t more AI ideas; it&rsquo;s better
            decisions, and measurable outcomes.{" "}
            <a className="mm-wt-hero-link" href={BRIEFING_MAILTO}>
              Book a 30-minute executive briefing →
            </a>
          </p>
        </div>
      </section>

      <WorkTogetherDeck offerings={offerings} defaultId="transformation-sprint" />

      <section className="mm-wt-closer">
        <div className="mm-wt-inner">
          <p className="mm-wt-closer-body">
            There is no shortage of AI ideas. What&rsquo;s missing in most
            organizations is <strong>clarity, prioritization, and execution
            discipline</strong> — that&rsquo;s the gap this work is designed to
            close.
          </p>
          <a className="mm-wt-btn mm-wt-btn-primary" href={BRIEFING_MAILTO}>
            Book a 30-minute executive briefing →
          </a>
        </div>
      </section>
    </div>
  );
}
