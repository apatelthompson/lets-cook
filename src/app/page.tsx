import "./mission-matrix.css";

export const metadata = {
  title: "The Mission Matrix — Unlocking organizational ambition",
  description:
    "How audacious leaders can leverage four AI roles — Bodyguard, Coach, Intern, Partner — to achieve their organization's ambitious goals.",
};

type Quadrant = {
  klass: "q-coach" | "q-bodyguard" | "q-intern" | "q-partner";
  num: string;
  role: string;
  name: string;
  tagline: string;
  question: string;
  examples: string[];
};

const QUADRANTS: Quadrant[] = [
  {
    klass: "q-coach",
    num: "Quadrant II",
    role: "Enable doing the previously impossible",
    name: "Coach",
    tagline: "Challenge and push",
    question: "“What could I not do before but have always wanted to?”",
    examples: [
      "Building your own prototype",
      "Public speaking practice",
      "New strategic capabilities",
    ],
  },
  {
    klass: "q-bodyguard",
    num: "Quadrant I",
    role: "Filter noise + create a forcefield",
    name: "Bodyguard",
    tagline: "Protect and make space",
    question:
      "“What is deeply meaningful and I find purpose in being present and in the friction?”",
    examples: ["Client debriefs", "Weekly team lunches", "High-stakes decisions"],
  },
  {
    klass: "q-intern",
    num: "Quadrant III",
    role: "Automate with transparency",
    name: "Intern",
    tagline: "Delegate and do",
    question:
      "“What routine work could I fully hand off if I trusted the output?”",
    examples: [
      "Performance review drafts",
      "Sprint retro summaries",
      "Meeting notes",
    ],
  },
  {
    klass: "q-partner",
    num: "Quadrant IV",
    role: "Assist and learn",
    name: "Partner",
    tagline: "Lighten the load",
    question:
      "“What do I have deep expertise in, but not meaning — and would be happy to teach and hand off?”",
    examples: ["Weekly metrics pulls", "Research synthesis", "Draft generation"],
  },
];

type Dynamic = {
  icon: string;
  title: string;
  body: string;
  from: { label: string; klass: string };
  to: { label: string; klass: string };
};

const DYNAMICS: Dynamic[] = [
  {
    icon: "\u{1F5FA}\u{FE0F}",
    title: "Map well enough to hand off",
    body: "When a workflow is well-understood, it can move from Partner to Intern — fully automated with transparency. Meeting summary notes are a classic example.",
    from: { label: "Partner (IV)", klass: "pill-partner" },
    to: { label: "Intern (III)", klass: "pill-intern" },
  },
  {
    icon: "\u{1F4A1}",
    title: "Discover meaning in the detail",
    body: "Working with AI to lighten a task can reveal where deep context connects to deep meaning — pulling that work back into your most protected space. Performance reviews → real coaching.",
    from: { label: "Partner (IV)", klass: "pill-partner" },
    to: { label: "Bodyguard (I)", klass: "pill-bodyguard" },
  },
  {
    icon: "\u{1F680}",
    title: "Own what you’ve mastered",
    body: "As AI coaches you into new capabilities, you can fully take ownership and bring that skill into your most meaningful work. Writing a speech goes from Coach to Bodyguard.",
    from: { label: "Coach (II)", klass: "pill-coach" },
    to: { label: "Bodyguard (I)", klass: "pill-bodyguard" },
  },
  {
    icon: "⚙️",
    title: "Automate as expertise matures",
    body: "New capabilities you develop with a Coach eventually become routine enough to automate. Writing tests and debugging code is a common example for technical leaders.",
    from: { label: "Coach (II)", klass: "pill-coach" },
    to: { label: "Intern (III)", klass: "pill-intern" },
  },
];

const STEPS = [
  {
    title: "Values mapping",
    body: "Take your organization’s values and translate them into the AI context — what should AI never do, and where should it always defer to humans?",
  },
  {
    title: "Expertise mapping",
    body: "Understand where your organization’s deep expertise and competitive advantage truly lie. These areas belong in Bodyguard territory.",
  },
  {
    title: "Work mapping",
    body: "Map key workflows against the quadrants. Test steps 1 and 2. Results may vary by individual — work toward an org-level view.",
  },
  {
    title: "Tool selection",
    body: "For each quadrant, identify the right AI tools to invest in. Don’t use one tool for everything — match tools to roles intentionally.",
  },
  {
    title: "Rituals & boundaries",
    body: "Design the processes, norms, and guardrails that will enable your organization to operate sustainably within the framework.",
  },
];

const QUESTIONS = [
  {
    icon: "⚖️",
    body: "Who owns decisions — and what does accountability look like when AI is involved?",
  },
  {
    icon: "\u{1F4B0}",
    body: "How are costs managed? What’s the budget model for AI tools across quadrants?",
  },
  {
    icon: "\u{1F3AF}",
    body: "What does good look like? Are your goals clearly defined before AI enters the picture?",
  },
];

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8h10M8 3l5 5-5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Page() {
  return (
    <div className="mm">
      <nav className="mm-nav">
        <div className="mm-logo" aria-hidden />
        <a
          href="https://hbr.org"
          target="_blank"
          rel="noopener noreferrer"
          className="mm-nav-link"
        >
          Read the HBR article →
        </a>
      </nav>

      <section className="mm-hero">
        <div>
          <p className="mm-eyebrow">Unlocking organizational ambition</p>
          <h1>
            The Mission
            <br />
            <em>Matrix</em>
          </h1>
          <p className="mm-hero-desc">
            How audacious leaders can leverage four different AI roles to
            achieve their organization&rsquo;s ambitious goals. Stop asking{" "}
            <em>&ldquo;How should we use AI?&rdquo;</em> &mdash; start asking{" "}
            <em>&ldquo;What can we finally become?&rdquo;</em>
          </p>
          <a href="#matrix" className="mm-btn-primary">
            Explore the framework
            <ArrowIcon />
          </a>
          <p className="mm-hero-sub">
            Work in progress &middot; Shifting the conversation from how to why
          </p>
        </div>

        <div>
          <div className="mm-mini-matrix">
            <div className="mm-mini-q mm-mini-coach">
              <div className="mm-mini-num">II</div>
              <div className="mm-mini-name">Coach</div>
              <div className="mm-mini-role">Challenge and push</div>
            </div>
            <div className="mm-mini-q mm-mini-bodyguard">
              <div className="mm-mini-num">I</div>
              <div className="mm-mini-name">Bodyguard</div>
              <div className="mm-mini-role">Protect and make space</div>
            </div>
            <div className="mm-mini-q mm-mini-intern">
              <div className="mm-mini-num">III</div>
              <div className="mm-mini-name">Intern</div>
              <div className="mm-mini-role">Delegate and do</div>
            </div>
            <div className="mm-mini-q mm-mini-partner">
              <div className="mm-mini-num">IV</div>
              <div className="mm-mini-name">Partner</div>
              <div className="mm-mini-role">Lighten the load</div>
            </div>
          </div>
        </div>
      </section>

      <hr className="mm-divider" />

      <section className="mm-matrix-section" id="matrix">
        <div className="mm-section-header">
          <p className="mm-eyebrow">The Framework</p>
          <h2>Four roles. One clear map.</h2>
          <p>
            Place your organization&rsquo;s work across two axes &mdash; the{" "}
            <strong>depth of meaning</strong> required in the work, and the{" "}
            <strong>depth of expertise</strong> you bring to it.
          </p>
        </div>

        <div className="mm-axis-row">
          <div className="mm-axis-label">&larr; Low meaning</div>
          <div className="mm-axis-center">Depth of Meaning</div>
          <div className="mm-axis-label">High meaning &rarr;</div>
        </div>

        <div className="mm-matrix-layout">
          <div className="mm-side-axis">
            <div className="mm-axis-label mm-axis-vertical">
              High expertise &uarr;
            </div>
            <div className="mm-axis-center mm-axis-vertical">
              Depth of Expertise
            </div>
            <div className="mm-axis-label mm-axis-vertical">
              &darr; Low expertise
            </div>
          </div>
          <div>
            <div className="mm-big-matrix">
              {QUADRANTS.map((q) => (
                <article key={q.klass} className={`mm-big-q ${q.klass}`}>
                  <div className="mm-q-header">
                    <span className="mm-q-num">{q.num}</span>
                    <span className="mm-q-ai-role">{q.role}</span>
                  </div>
                  <h3>{q.name}</h3>
                  <p className="mm-q-tagline">{q.tagline}</p>
                  <p className="mm-q-question">{q.question}</p>
                  <div className="mm-q-examples">
                    {q.examples.map((ex) => (
                      <span key={ex} className="mm-q-chip">
                        {ex}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="mm-divider" />

      <section className="mm-dynamics-section">
        <div className="mm-dynamics-inner">
          <div className="mm-section-header">
            <p className="mm-eyebrow">Dynamic movement</p>
            <h2>Work moves. So should your map.</h2>
            <p>
              The Mission Matrix isn&rsquo;t static. As your expertise grows
              and AI learns your context, work naturally migrates &mdash;
              often unlocking entirely new ambitions.
            </p>
          </div>

          <div className="mm-dynamics-grid">
            {DYNAMICS.map((d) => (
              <div key={d.title} className="mm-dynamic-card">
                <div className="mm-dynamic-arrow" aria-hidden>
                  {d.icon}
                </div>
                <h4>{d.title}</h4>
                <p>{d.body}</p>
                <div className="mm-dynamic-from-to">
                  <span className={`mm-pill-from ${d.from.klass}`}>
                    {d.from.label}
                  </span>
                  <span className="mm-pill-arrow">&rarr;</span>
                  <span className={`mm-pill-to ${d.to.klass}`}>
                    {d.to.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mm-impl-section">
        <div className="mm-section-header">
          <p className="mm-eyebrow">How to implement it</p>
          <h2>
            Five steps to putting the
            <br />
            matrix to work
          </h2>
        </div>

        <div className="mm-steps">
          {STEPS.map((s, i) => (
            <div key={s.title} className="mm-step">
              <div className="mm-step-num">{i + 1}</div>
              <h4>{s.title}</h4>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mm-questions-section">
        <div className="mm-questions-inner">
          <p className="mm-eyebrow">Before you begin</p>
          <h2>
            Three questions every
            <br />
            leader must answer
          </h2>
          <div className="mm-questions-grid">
            {QUESTIONS.map((q) => (
              <div key={q.body} className="mm-question-card">
                <div className="mm-q-icon" aria-hidden>
                  {q.icon}
                </div>
                <p>{q.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mm-cta-section">
        <p className="mm-eyebrow">Ready to map your organization?</p>
        <h2>
          Read the full research
          <br />
          in <em>Harvard Business Review</em>
        </h2>
        <p>
          The Mission Matrix is grounded in research on invisible work and
          organizational ambition. Reach out to explore how it applies to
          your org.
        </p>
        <div className="mm-cta-buttons">
          <a
            href="mailto:avni@thisbeautifulchaos.org"
            className="mm-btn-primary"
          >
            Go deeper with your org
            <ArrowIcon />
          </a>
          <a
            href="https://hbr.org"
            target="_blank"
            rel="noopener noreferrer"
            className="mm-btn-secondary"
          >
            Read the HBR article &rarr;
          </a>
        </div>
      </section>

      <footer className="mm-footer">
        <p>
          &copy; 2026 This Beautiful Chaos &middot;{" "}
          <a href="mailto:avni@thisbeautifulchaos.org">
            avni@thisbeautifulchaos.org
          </a>
        </p>
      </footer>
    </div>
  );
}
