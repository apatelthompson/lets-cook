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
    chips: ["Performance review drafts", "Sprint retro summaries", "Meeting notes"],
  },
  {
    cls: "mm-partner",
    num: "IV",
    role: "Partner",
    pill: "Assist and learn",
    tagline: "Lighten the load",
    question: "What do I have deep expertise in, but not meaning — and would be happy to teach and hand off?",
    chips: ["Weekly metrics pulls", "Research synthesis", "Draft generation"],
  },
];

const steps = [
  {
    n: 1,
    title: "Values mapping",
    body: "Take your organization's values and translate them into the AI context — what should AI never do, and where should it always defer to humans?",
  },
  {
    n: 2,
    title: "Expertise mapping",
    body: "Understand where your organization's deep expertise and competitive advantage truly lie. These areas belong in Bodyguard territory.",
  },
  {
    n: 3,
    title: "Work mapping",
    body: "Map key workflows against the quadrants. Test steps 1 and 2. Results may vary by individual — work toward an org-level view.",
  },
  {
    n: 4,
    title: "Tool selection",
    body: "For each quadrant, identify the right AI tools to invest in. Don't use one tool for everything — match tools to roles intentionally.",
  },
  {
    n: 5,
    title: "Rituals & boundaries",
    body: "Design the processes, norms, and guardrails that will enable your organization to operate sustainably within the framework.",
  },
];

const questions = [
  {
    icon: "⚖️",
    text: "Who owns decisions — and what does accountability look like when AI is involved?",
  },
  {
    icon: "💰",
    text: "How are costs managed? What's the budget model for AI tools across quadrants?",
  },
  {
    icon: "🎯",
    text: "What does good look like? Are your goals clearly defined before AI enters the picture?",
  },
];

export default function MissionMatrixPage() {
  return (
    <div className="mm-page">
      <nav className="mm-nav">
        <a className="mm-nav-link" href="https://hbr.org" target="_blank" rel="noopener noreferrer">
          Read the HBR article →
        </a>
      </nav>

      <section className="mm-hero">
        <div>
          <span className="mm-eyebrow">Unlocking organizational ambition</span>
          <h1 className="mm-hero-h1">
            The Mission <em>Matrix</em>
          </h1>
          <p className="mm-hero-body">
            How audacious leaders can leverage four different AI roles to achieve
            their organization&rsquo;s ambitious goals. Stop asking{" "}
            <em>&ldquo;How should we use AI?&rdquo;</em> &mdash; start asking{" "}
            <em>&ldquo;What can we finally become?&rdquo;</em>
          </p>
          <a className="mm-cta-btn" href="#matrix">Explore the framework →</a>
          <span className="mm-hero-sub">Work in progress · Shifting the conversation from how to why</span>
        </div>
        <div className="mm-mini-matrix" aria-hidden="true">
          <div className="mm-mini-card mm-coach">
            <span className="mm-mini-num">II</span>
            <span className="mm-mini-name">Coach</span>
            <span className="mm-mini-tag">Challenge and push</span>
          </div>
          <div className="mm-mini-card mm-bodyguard">
            <span className="mm-mini-num">I</span>
            <span className="mm-mini-name">Bodyguard</span>
            <span className="mm-mini-tag">Protect and make space</span>
          </div>
          <div className="mm-mini-card mm-intern">
            <span className="mm-mini-num">III</span>
            <span className="mm-mini-name">Intern</span>
            <span className="mm-mini-tag">Delegate and remove</span>
          </div>
          <div className="mm-mini-card mm-partner">
            <span className="mm-mini-num">IV</span>
            <span className="mm-mini-name">Partner</span>
            <span className="mm-mini-tag">Partner and lighten</span>
          </div>
        </div>
      </section>

      <section className="mm-matrix-section" id="matrix">
        <div className="mm-inner">
          <div className="mm-section-header">
            <span className="mm-eyebrow">The Framework</span>
            <h2 className="mm-h2">Four roles. One clear map.</h2>
            <p className="mm-section-body">
              Plot any activity across two axes — the depth of meaning required in the work,
              and the depth of expertise you bring to it. The quadrant tells you which AI role belongs there.
            </p>
          </div>
          <div className="mm-axes-wrap">
            <div className="mm-axis-x-row">
              <span className="mm-axis-end">← Low meaning</span>
              <span className="mm-axis-center-x">Depth of Meaning</span>
              <span className="mm-axis-end">High meaning →</span>
            </div>
            <div className="mm-axis-y-col">
              <span className="mm-axis-end">High expertise ↑</span>
              <span className="mm-axis-center-y">Depth of Expertise</span>
              <span className="mm-axis-end">↓ Low expertise</span>
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
          <h2 className="mm-h2">Five steps to putting the matrix to work</h2>
          <div className="mm-steps-grid">
            {steps.map((s) => (
              <div key={s.n} className="mm-step-card">
                <div className="mm-step-num">{s.n}</div>
                <h4>{s.title}</h4>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mm-questions-section">
        <div className="mm-inner">
          <span className="mm-eyebrow">Before you begin</span>
          <h2 className="mm-h2">Three questions every leader must answer</h2>
          <div className="mm-q-grid">
            {questions.map((q) => (
              <div key={q.icon} className="mm-q-card">
                <span className="mm-q-icon">{q.icon}</span>
                <p>{q.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mm-cta-section">
        <div className="mm-cta-inner">
          <span className="mm-eyebrow">Ready to map your organization?</span>
          <h2 className="mm-h2">Read the full research in <em>Harvard Business Review</em></h2>
          <p className="mm-cta-body">
            The Mission Matrix is grounded in research on invisible work and organizational ambition.
            Reach out to explore how it applies to your org.
          </p>
          <div className="mm-cta-buttons">
            <a className="mm-cta-btn" href="mailto:avni@thisbeautifulchaos.org">Go deeper with your org →</a>
            <a className="mm-cta-secondary" href="https://hbr.org" target="_blank" rel="noopener noreferrer">
              Read the HBR article →
            </a>
          </div>
        </div>
      </section>

      <footer className="mm-footer">
        © 2024 This Beautiful Chaos · avni@thisbeautifulchaos.org
      </footer>
    </div>
  );
}
