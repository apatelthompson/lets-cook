import "./diagram.css";

export const metadata = {
  title: "Meaning × Expertise — a framework for AI roles",
};

export default function DiagramPage() {
  return (
    <main className="diagram-page">
      <header className="diagram-header">
        <p className="eyebrow">FRAMEWORK</p>
        <h1>Meaning × Expertise</h1>
        <p className="lede">
          A 2×2 for deciding how AI should show up in your work — based on
          how meaningful the task is and how much context or capability it
          demands.
        </p>
      </header>

      <section className="matrix-wrap" aria-label="Meaning by Expertise matrix">
        <div className="matrix">
          <span className="axis-name axis-name-y">meaning</span>
          <span className="axis-name-x-wrap">
            <span className="axis-name">expertise</span>
            <span className="axis-subtitle">(context / capability)</span>
          </span>
          <span className="axis-end axis-end-top">high</span>
          <span className="axis-end axis-end-bottom">low</span>
          <span className="axis-end axis-end-left">low</span>
          <span className="axis-end axis-end-right">high</span>

          <article className="quad quad-tl">
            <span className="tag">coach</span>
            <p className="role">
              <strong>role:</strong> make harder
            </p>
            <p className="prompt">
              → What could I not do before but want to?
            </p>
            <p className="codified">
              Codified in buildathons &amp; experimental play with safe
              sandboxes.
            </p>
          </article>

          <article className="quad quad-tr">
            <span className="tag">protect / make space</span>
            <p className="role">
              <strong>role:</strong> forcefield
            </p>
            <p className="prompt">
              → What is deeply meaningful? Where do I find purpose in the
              presence of the hard / frictionful?
            </p>
            <p className="codified">
              Codified in culture — values, wikis &amp; rituals
              (apprenticeship).
            </p>
          </article>

          <article className="quad quad-bl">
            <span className="tag">automate / remove</span>
            <p className="role">
              <strong>role:</strong> remove / do
            </p>
            <p className="prompt">
              → What is straightforward to hand off, but resource
              constraints have prevented from doing?
            </p>
            <p className="codified">Codified in wikis &amp; workflows.</p>
          </article>

          <article className="quad quad-br">
            <span className="tag">partner / delegate</span>
            <p className="role">
              <strong>role:</strong> lighten load
            </p>
            <p className="prompt">
              → What requires deep expertise but isn&rsquo;t where my
              meaning lives?
            </p>
            <p className="codified">
              Codified in specialized skills designed to support.
            </p>
          </article>
        </div>
      </section>

      <section className="steps">
        <h2>Steps</h2>
        <ol>
          <li>
            <span className="step-num">1</span>
            <span>
              <strong>Values</strong> → meaning <em>or</em> cultural
              values
            </span>
          </li>
          <li>
            <span className="step-num">2</span>
            <span>
              <strong>Expertise</strong> → competitive advantage
            </span>
          </li>
        </ol>
      </section>
    </main>
  );
}
