import "./mission-matrix.css";
import QuadrantDetails from "./QuadrantDetails";

export const metadata = {
  title: "The Mission Matrix — This Beautiful Chaos",
  description:
    "How audacious leaders can leverage four different AI roles to achieve their organization's ambitious goals.",
};

const quadrants = [
  {
    cls: "mm-coach",
    num: "II",
    role: "Coach",
    pill: "Enable doing the previously impossible",
    tagline: "Challenge & push",
    question: "What could I not do before but have always wanted to?",
    chips: ["Building your own prototype", "Public speaking practice", "New strategic capabilities"],
  },
  {
    cls: "mm-bodyguard",
    num: "I",
    role: "Bodyguard",
    pill: "Filter noise + create a forcefield",
    tagline: "Protect & make space",
    question: "What is deeply meaningful and I find purpose in being present and in the friction?",
    chips: ["Client debriefs", "Weekly team lunches", "High-stakes decisions"],
  },
  {
    cls: "mm-intern",
    num: "III",
    role: "Intern",
    pill: "Automate with transparency",
    tagline: "Automate & remove",
    question: "What routine work could I fully hand off if I trusted the output?",
    chips: ["Weekly metrics pulls", "Sprint retro summaries", "Meeting notes"],
  },
  {
    cls: "mm-partner",
    num: "IV",
    role: "Partner",
    pill: "Assist and learn",
    tagline: "Lighten the load",
    question: "What do I have unique expertise in, but not meaning — and would be happy to teach and hand off?",
    chips: ["Performance review drafts", "Research synthesis", "Draft generation"],
  },
];

const steps = [
  {
    n: 1,
    title: "Map the work",
    body: "Start with your organization's mission, expertise, and the jobs to be done. Plot them across the matrix — your map stays stable even as the AI tools keep changing.",
  },
  {
    n: 2,
    title: "Audition AI for the role",
    body: "For each job to be done, audition AI candidates for the right role: Coach, Bodyguard, Intern, or Partner. Pick the model that fits the moment — don't use one AI for everything.",
  },
  {
    n: 3,
    title: "Lead with purpose",
    body: "Design the rituals, norms, and guardrails that enable your organization to operate sustainably within the framework.",
  },
];

export default function MissionMatrixPage() {
  return (
    <div className="mm-page">
      <section className="mm-hero">
        <div>
          <span className="mm-eyebrow">a framework for Aligned AI</span>
          <h1 className="mm-hero-h1">
            The Mission <em>Matrix</em>
          </h1>
          <p className="mm-hero-body">
            How audacious leaders root AI in their organization&rsquo;s mission &mdash;
            and audition AI for one of four roles, by job to be done. Stop asking{" "}
            <em>&ldquo;How should we use AI?&rdquo;</em> Start asking{" "}
            <em>&ldquo;What can we finally become?&rdquo;</em>
          </p>
          <a className="mm-cta-btn" href="#matrix">Explore the framework →</a>
        </div>
        <div className="mm-mini-matrix-wrap">
          <div className="mm-mini-axis-y">
            <span className="mm-mini-axis-label">High meaning</span>
            <span className="mm-mini-axis-label mm-mini-axis-center">Meaning</span>
            <span className="mm-mini-axis-label">Low meaning</span>
          </div>
          <div>
            <div className="mm-mini-axis-x">
              <span className="mm-mini-axis-label">Low unique expertise</span>
              <span className="mm-mini-axis-label mm-mini-axis-center">Unique expertise</span>
              <span className="mm-mini-axis-label">High unique expertise</span>
            </div>
            <div className="mm-mini-matrix">
              {/* Top-left: high meaning, low expertise */}
              <div className="mm-mini-card mm-coach">
                <span className="mm-mini-name">Your growth edge</span>
                <span className="mm-mini-tag">High meaning · Low unique expertise</span>
              </div>
              {/* Top-right: high meaning, high expertise */}
              <div className="mm-mini-card mm-bodyguard">
                <span className="mm-mini-name">Your core craft</span>
                <span className="mm-mini-tag">High meaning · High unique expertise</span>
              </div>
              {/* Bottom-left: low meaning, low expertise */}
              <div className="mm-mini-card mm-intern">
                <span className="mm-mini-name">Routine tasks</span>
                <span className="mm-mini-tag">Low meaning · Low unique expertise</span>
              </div>
              {/* Bottom-right: low meaning, high expertise */}
              <div className="mm-mini-card mm-partner">
                <span className="mm-mini-name">Skilled but draining</span>
                <span className="mm-mini-tag">Low meaning · High unique expertise</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mm-matrix-section" id="matrix">
        <div className="mm-inner">
          <div className="mm-section-header">
            <span className="mm-eyebrow">Unlocking organizational ambition</span>
            <h2 className="mm-h2">Four roles. One clear map.</h2>
            <p className="mm-section-body">
              Plot any activity across two axes — the depth of meaning required in the work,
              and how uniquely your expertise is needed to do it. The quadrant tells you which AI role belongs there.
            </p>
          </div>
          <div className="mm-axes-wrap">
            <div className="mm-axis-x-row">
              <span className="mm-axis-end">← Low unique expertise</span>
              <span className="mm-axis-center-x">Unique Expertise</span>
              <span className="mm-axis-end">High unique expertise →</span>
            </div>
            <div className="mm-axis-y-col">
              <span className="mm-axis-end">High meaning ↑</span>
              <span className="mm-axis-center-y">Depth of Meaning</span>
              <span className="mm-axis-end">↓ Low meaning</span>
            </div>
            <div className="mm-matrix-grid-wrap">
              <div className="mm-matrix-grid">
                {quadrants.map((q) => (
                  <article key={q.role} className={`mm-quad ${q.cls}`}>
                    <div className="mm-quad-header">
                      <span className="mm-quad-num">Quadrant {q.num}</span>
                      <span className="mm-quad-role-pill">{q.pill}</span>
                    </div>
                    <h3 className="mm-quad-name">{q.role}</h3>
                    <p className="mm-quad-tagline">{q.tagline}</p>
                    <p className="mm-quad-question">&ldquo;{q.question}&rdquo;</p>
                    <div className="mm-chips">
                      {q.chips.map((c) => (
                        <span key={c} className="mm-chip">{c}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuadrantDetails />

      <section className="mm-impl-section">
        <div className="mm-inner">
          <span className="mm-eyebrow">How to implement it</span>
          <h2 className="mm-h2">Three steps to putting the matrix to work</h2>
          <div className="mm-steps-grid">
            {steps.map((s) => (
              <div key={s.n} className="mm-step-card">
                <div className="mm-step-num">{s.n}</div>
                <h4>{s.title}</h4>
                <p>{s.body}</p>
                {s.n === 1 && (
                  <a
                    className="mm-step-cta"
                    href="/mission-matrix/assessment"
                  >
                    Take the assessment →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="mm-footer">
        © 2026 This Beautiful Chaos · avni@thisbeautifulchaos.org
      </footer>
    </div>
  );
}
