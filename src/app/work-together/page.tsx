import "../mission-matrix/mission-matrix.css";
import WorkTogetherDeck, { type Offering } from "./WorkTogetherDeck";

export const metadata = {
  title: "Work together — The Mission Matrix",
  description:
    "Three ways to bring Aligned AI into your organization: company-wide reset, function deep dive, or 1:1 tutor.",
};

const offerings: Offering[] = [
  {
    id: "company-reset",
    num: "01",
    accent: "peach",
    emoji: "👩🏻‍🎨",
    name: "Company-wide AI reset",
    audienceShort: "Whole orgs, 50–300",
    pitch:
      "Get the full company to AI native — through the lens of your goals and priorities.",
    summaryPrice: "$7.5K",
    summaryPriceUnit: "/ mo",
    bestFor:
      "Organizations of 50–300 people, needing an unfair advantage to accomplish their audacious goals with urgency. An aligned AI strategy that lets everyone row together, faster.",
    options: [
      {
        label: "Option A",
        title: "3 half-day sessions over 3 months",
        price: "$7.5K",
        priceUnit: "/ mo",
        days: [
          {
            label: "Day 1",
            text: "C-suite deep dive — translate company strategy and goals into an AI-aligned version using the Mission Matrix. Define where the lines are drawn and what work lives in each quadrant.",
          },
          {
            label: "Day 2",
            text: "Full company by division — distill the Matrix to each function's work, identify AI products that align with their needs, and kick off a month-long build project.",
          },
          {
            label: "Day 3",
            text: "Full company together — refine the strategy and host a company demo day of each function's most game-changing AI build.",
          },
        ],
      },
      {
        label: "Option B",
        title: "One-day full company onsite",
        price: "$10K",
        priceUnit: "",
        days: [
          {
            label: "AM",
            text: "Mission Matrix — define the lines as a company and map the work by function.",
          },
          {
            label: "PM",
            text: "Get the full team to base AI fluency, plus a small build session.",
          },
        ],
      },
    ],
    subjectLine: "Aligned AI — Company-wide reset",
  },
  {
    id: "function-deep-dive",
    num: "02",
    accent: "sun",
    emoji: "🧑‍🎤",
    name: "Function / Division deep dive",
    audienceShort: "One team, one day",
    pitch:
      "Unlock the capabilities of a smaller team — through their priorities and long-term goals.",
    summaryPrice: "$3K",
    summaryPriceUnit: "/ $5K",
    bestFor:
      "Functional leaders in larger organizations who want to uplevel their team quickly and strategically.",
    options: [
      {
        label: "Format",
        title: "Half day or full day",
        price: "$3K",
        priceUnit: "/ $5K",
        days: [
          {
            label: "Audit",
            text: "Review goals and audit existing AI use and capabilities.",
          },
          {
            label: "Map",
            text: "Use the Mission Matrix to map the team's work.",
          },
          {
            label: "Build",
            text: "Tackle 2–3 high-priority challenges via a build session.",
          },
        ],
      },
    ],
    subjectLine: "Aligned AI — Function / Division deep dive",
  },
  {
    id: "tech-tutor",
    num: "03",
    accent: "coral",
    emoji: "👩🏻‍🏫",
    name: "1:1 Tech Tutor",
    audienceShort: "Solo execs",
    pitch:
      "Unlock the capabilities of non-technical leaders — efficiently and effectively.",
    summaryPrice: "$5K",
    summaryPriceUnit: "",
    bestFor:
      "Senior leaders who want capability uplift without sitting through a course they don't need.",
    options: [
      {
        label: "Format",
        title: "4 weeks · 30 min live / week + async SMS support",
        price: "$5K",
        priceUnit: "",
        days: [
          {
            label: "Week 1",
            text: "Audit your capabilities and existing use, identify your goals against the Mission Matrix, and choose the right AI tools to start using.",
          },
          {
            label: "Weeks 1–2",
            text: "Pick a Quadrant II project (Coach) to push your capabilities — building something you couldn't have built before.",
          },
          {
            label: "Weeks 3–4",
            text: "Build automations and skills to create capacity in Quadrants III and IV.",
          },
        ],
      },
    ],
    subjectLine: "Aligned AI — 1:1 Tech Tutor",
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
            Three ways to bring the Mission Matrix into your organization, scaled
            to the moment you&rsquo;re in.{" "}
            <a
              className="mm-wt-hero-link"
              href="mailto:avni@thisbeautifulchaos.org?subject=Aligned%20AI%20%E2%80%94%20which%20fits%3F"
            >
              Not sure which? Email Avni →
            </a>
          </p>
        </div>
      </section>

      <WorkTogetherDeck offerings={offerings} defaultId="function-deep-dive" />
    </div>
  );
}
