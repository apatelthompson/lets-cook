import LogoutButton from '../LogoutButton';

export const metadata = { title: 'AI 101 · Cohort Dashboard' };

const LABS = [
  { kind: 'lab',  num: '01', title: 'the bake-off.',            desc: 'Open Claude, ChatGPT, and Gemini. Same prompt — three very different answers.',                              time: '~7 min',  hue: 'pebble', slide: 9  },
  { kind: 'lab',  num: '02', title: 'three rounds, one question.', desc: 'Ask the same question with no context, then context, then memory. Watch the answer transform.',            time: '~12 min', hue: 'sun',    slide: 20 },
  { kind: 'lab',  num: '03', title: 'the hallucination hunt.',   desc: "Ask for peer-reviewed citations in your field. Google one. Notice what you find — or don't.",               time: '~5 min',  hue: 'peach',  slide: 27 },
];

const TRYITS = [
  { kind: 'try', num: '', title: 'tokenizer.',         desc: 'Paste a sentence — try one in another language too. See how models actually see your words.',    time: '~60 sec', hue: 'lav',   slide: 15 },
  { kind: 'try', num: '', title: 'knowledge cutoffs.', desc: 'Ask all three models their training cutoff, then ask what happened in the news yesterday.',       time: '~90 sec', hue: 'ocean', slide: 17 },
  { kind: 'try', num: '', title: 'sycophancy test.',   desc: 'Tell each model the earth might be flat, then push. Watch who holds their ground.',               time: '~3 min',  hue: 'coral', slide: 28 },
  { kind: 'try', num: '', title: 'multimodal drop.',   desc: "Drop a screenshot or photo into Claude or ChatGPT. Ask what's in it.",                            time: '~60 sec', hue: 'sand',  slide: 34 },
];

const ASSESSMENT = [
  { kind: 'asmt', num: '', title: 'your mission matrix.', desc: "A values-first assessment to find where AI fits your life — and where it doesn't.", time: '~15 min', hue: 'moss', slide: 44 },
];

const HUE: Record<string, { bg: string; bd: string; tx: string }> = {
  pebble: { bg: '#FCFAF5', bd: '#E5DDD3', tx: '#665B54' },
  sun:    { bg: '#F7EECB', bd: '#EBC959', tx: '#7A5A1F' },
  peach:  { bg: '#FFE3CC', bd: '#FAA55A', tx: '#7A4012' },
  lav:    { bg: '#E9E4F7', bd: '#9E8BC7', tx: '#4D3F7A' },
  ocean:  { bg: '#D7EBF5', bd: '#467CA3', tx: '#1F4A6B' },
  coral:  { bg: '#FADCD7', bd: '#EE7B6E', tx: '#7A2A1F' },
  sand:   { bg: '#FAF1DC', bd: '#E8C97A', tx: '#7A5A1F' },
  moss:   { bg: '#D9EBD8', bd: '#699963', tx: '#2F4D2A' },
};

const KIND_ICON: Record<string, string> = { lab: '🧪', try: '⚡', asmt: '📍' };

const GROUPS = [
  { name: 'Labs',        blurb: 'longer hands-on sessions — we work through them together.', items: LABS },
  { name: 'Try-its',    blurb: 'quick prompts to run on your own between concepts.',         items: TRYITS },
  { name: 'Assessment', blurb: 'a values check-in to anchor what you learned.',              items: ASSESSMENT },
];

export default function Dashboard101() {
  return (
    <>
      <style>{`
        @font-face { font-family: 'Recoleta'; src: url('/fonts/Recoleta-Regular.otf') format('opentype'); font-weight: 400; }
        @font-face { font-family: 'Recoleta'; src: url('/fonts/Recoleta-SemiBold.otf') format('opentype'); font-weight: 600; }
        @font-face { font-family: 'Cereal'; src: url('/fonts/AirbnbCerealBook.ttf') format('truetype'); font-weight: 400; }
        @font-face { font-family: 'Cereal'; src: url('/fonts/AirbnbCerealMedium.ttf') format('truetype'); font-weight: 500; }
        @font-face { font-family: 'Cereal'; src: url('/fonts/AirbnbCerealBold.ttf') format('truetype'); font-weight: 700; }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #101B0B;
          font-family: 'Cereal', -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
          color: #1A1815;
        }

        .db-shell {
          min-height: 100vh;
          background: #435E35;
          padding: 36px 40px 56px;
        }

        .db-inner { max-width: 1100px; margin: 0 auto; font-size: 140%; }

        .db-topbar {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 28px;
        }

        .db-brand {
          font-size: 12px;
          letter-spacing: 0.12em;
          color: #699963;
          font-weight: 700;
          margin-bottom: 14px;
        }

        .db-wordmark {
          font-family: 'Recoleta', Georgia, serif;
          font-size: 42px;
          line-height: 1;
          color: #fff;
          letter-spacing: -0.02em;
        }

        .db-wordmark-accent { color: #699963; }
        .db-wordmark-em { font-style: italic; font-weight: 400; }

        .db-logout {
          appearance: none;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.55);
          padding: 8px 18px;
          border-radius: 100px;
          font-size: 13px;
          font-family: inherit;
          cursor: pointer;
          transition: background 140ms, color 140ms;
        }
        .db-logout:hover { background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.85); }

        .db-card {
          background: #FCFAF5;
          border-radius: 22px;
          padding: 36px;
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 44px;
        }

        /* Left rail */
        .rail {
          border-right: 1px dashed #D1CAC0;
          padding-right: 32px;
        }

        .rail-eyebrow {
          font-size: 12px;
          letter-spacing: 0.1em;
          color: #699963;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .rail-title {
          font-family: 'Recoleta', Georgia, serif;
          font-size: 36px;
          line-height: 1.05;
          color: #435E35;
          letter-spacing: -0.02em;
          margin-bottom: 10px;
        }

        .rail-meta {
          font-size: 14px;
          color: #99948D;
          margin-bottom: 24px;
        }

        .rail-btn {
          width: 100%;
          background: linear-gradient(135deg, #FF699D 0%, #FAA55A 100%);
          color: #fff;
          border: none;
          padding: 15px 18px;
          border-radius: 12px;
          font-size: 15px;
          font-family: inherit;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-decoration: none;
          transition: background 140ms;
        }
        .rail-btn:hover { background: linear-gradient(135deg, #FF4F8A 0%, #F09040 100%); }

        .glance-label {
          font-size: 11px;
          letter-spacing: 0.1em;
          color: #99948D;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .glance-list {
          display: flex;
          flex-direction: column;
          gap: 11px;
          font-size: 14px;
          line-height: 1.5;
          color: #524A41;
        }

        /* Right stream */
        .group { margin-bottom: 28px; }

        .group-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 6px;
          padding-bottom: 8px;
          border-bottom: 1px solid #E5DDD3;
          gap: 16px;
        }

        .group-header-left {
          display: flex;
          align-items: baseline;
          gap: 12px;
          flex: 1;
          min-width: 0;
        }

        .group-name {
          font-family: 'Recoleta', Georgia, serif;
          font-size: 21px;
          color: #101B0B;
          font-weight: 600;
          white-space: nowrap;
        }

        .group-blurb {
          font-size: 13px;
          color: #99948D;
          font-style: italic;
          line-height: 1.4;
        }

        .group-count {
          font-size: 12px;
          color: #99948D;
          font-variant-numeric: tabular-nums;
          white-space: nowrap;
        }

        .group-items {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 14px;
        }

        .ex-row {
          display: grid;
          grid-template-columns: 50px 1fr 76px;
          gap: 16px;
          align-items: center;
          padding: 15px 18px;
          background: #fff;
          border: 1px solid #E5DDD3;
          border-radius: 10px;
          text-decoration: none;
          transition: box-shadow 140ms, transform 140ms;
        }
        .ex-row:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); transform: translateY(-1px); }

        .ex-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          font-size: 18px;
          flex-shrink: 0;
        }

        .ex-title {
          font-family: 'Recoleta', Georgia, serif;
          font-size: 17px;
          color: #101B0B;
          font-weight: 600;
          margin-bottom: 4px;
          letter-spacing: -0.01em;
        }

        .ex-desc {
          font-size: 13.5px;
          color: #524A41;
          line-height: 1.5;
        }

        .ex-time {
          font-size: 12px;
          color: #99948D;
          text-align: right;
          font-variant-numeric: tabular-nums;
          white-space: nowrap;
        }

        /* Best practices section */
        .bp-section { margin-top: 24px; }

        .bp-label {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 12px;
        }

        .bp-card {
          background: #FCFAF5;
          border-radius: 16px;
          padding: 24px 28px;
          display: flex;
          align-items: flex-start;
          gap: 24px;
        }

        .bp-card-icon {
          font-size: 28px;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .bp-card-body { flex: 1; min-width: 0; }

        .bp-card-title {
          font-family: 'Recoleta', Georgia, serif;
          font-size: 20px;
          font-weight: 600;
          color: #435E35;
          letter-spacing: -0.01em;
          margin-bottom: 4px;
        }

        .bp-card-desc {
          font-size: 14px;
          color: #99948D;
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .bp-card-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .bp-card-cta {
          font-size: 13px;
          font-weight: 600;
          color: #fff;
          background: linear-gradient(135deg, #FF699D 0%, #FAA55A 100%);
          padding: 10px 18px;
          border-radius: 100px;
          white-space: nowrap;
          text-decoration: none;
          transition: opacity 140ms;
        }
        .bp-card-cta:hover { opacity: 0.9; }

        .bp-card-secondary {
          font-size: 13px;
          font-weight: 500;
          color: #99948D;
          text-decoration: none;
          white-space: nowrap;
          transition: color 140ms;
        }
        .bp-card-secondary:hover { color: #524A41; }

        .coming-card {
          margin-top: 24px;
          background: rgba(255,255,255,0.04);
          border: 1.5px dashed rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 24px 28px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .coming-pill {
          background: rgba(255,255,255,0.06);
          border-radius: 8px;
          padding: 6px 14px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          white-space: nowrap;
        }

        .coming-text {
          font-size: 14px;
          color: rgba(255,255,255,0.3);
        }

        .day-tabs {
          display: flex; gap: 6px; margin-bottom: 18px;
          background: rgba(0,0,0,0.18); padding: 6px; border-radius: 100px; width: fit-content;
        }
        .day-tab {
          background: transparent; border: none; color: rgba(255,255,255,0.55);
          font-family: inherit; font-size: 13px; font-weight: 600;
          padding: 9px 18px; border-radius: 100px; cursor: pointer;
          transition: background 160ms, color 160ms; letter-spacing: 0.02em;
          text-decoration: none; display: inline-block;
        }
        .day-tab:hover { color: rgba(255,255,255,0.9); }
        .day-tab.is-active { background: #FCFAF5; color: #435E35; }
      `}</style>

      <div className="db-shell">
        <div className="db-inner">
          <div className="db-topbar">
            <div>
              <div className="db-brand">ALIGNED AI · AI WITH FRIENDS</div>
              <div className="db-wordmark">
                AI<span className="db-wordmark-accent">101</span>{' '}
                <span className="db-wordmark-em">— the foundations.</span>
              </div>
            </div>
            <LogoutButton className="db-logout" />
          </div>

          <div className="day-tabs">
            <a className="day-tab is-active" href="/ai-with-friends/cohort/101">Day 1 · Foundations</a>
            <a className="day-tab" href="/ai-with-friends/cohort/101/day-2">Day 2 · Capability</a>
          </div>

          <div className="db-card">
            {/* Left rail */}
            <aside className="rail">
              <div className="rail-eyebrow">101 · DAY 1</div>
              <h2 className="rail-title">AI Foundations</h2>
              <div className="rail-meta">48 slides · 90 min</div>
              <a className="rail-btn" href="/ai-with-friends/day-1" target="_blank" rel="noopener noreferrer">
                <span>open slides</span><span>↗</span>
              </a>
              <div className="glance-label">AT A GLANCE</div>
              <div className="glance-list">
                <div>→ what a model actually is</div>
                <div>→ tokens, context, memory</div>
                <div>→ hallucinations + sycophancy</div>
                <div>→ privacy / security / compute</div>
                <div>→ your first values check-in</div>
              </div>
            </aside>

            {/* Right stream */}
            <div>
              {GROUPS.map(group => (
                <section key={group.name} className="group">
                  <div className="group-header">
                    <div className="group-header-left">
                      <span className="group-name">{group.name}</span>
                      <span className="group-blurb">{group.blurb}</span>
                    </div>
                    <span className="group-count">{group.items.length} {group.items.length === 1 ? 'item' : 'items'}</span>
                  </div>
                  <div className="group-items">
                    {group.items.map(ex => {
                      const c = HUE[ex.hue];
                      return (
                        <a
                          key={ex.slide}
                          className="ex-row"
                          href={`/ai-with-friends/day-1#${ex.slide}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ borderLeft: `4px solid ${c.bd}` }}
                        >
                          <div className="ex-icon" style={{ background: c.bg, color: c.tx }}>
                            {KIND_ICON[ex.kind]}
                          </div>
                          <div>
                            <div className="ex-title">{ex.title}</div>
                            <div className="ex-desc">{ex.desc}</div>
                          </div>
                          <div className="ex-time">{ex.time}</div>
                        </a>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </div>

          {/* Best Practices */}
          <div className="bp-section">
            <div className="bp-label">Best Practices</div>
            <div className="bp-card">
              <div className="bp-card-icon">📋</div>
              <div className="bp-card-body">
                <div className="bp-card-title">How to build an operating manual for your AI</div>
                <div className="bp-card-desc">Tell any AI agent how to work with you — working contract, glossary, good vs bad examples. Works across Claude, ChatGPT, Cursor, and more.</div>
                <div className="bp-card-actions">
                  <a
                    className="bp-card-cta"
                    href="/ai-with-friends/cohort/101/operating-manual"
                  >
                    build yours →
                  </a>
                  <a
                    className="bp-card-secondary"
                    href="/resources/ai-operating-manual-template.md"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    download blank template ↓
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Day 2 link */}
          <a className="coming-card" href="/ai-with-friends/cohort/101/day-2" style={{ textDecoration: 'none', cursor: 'pointer' }}>
            <span className="coming-pill" style={{ color: '#FAA55A' }}>101 · day 2</span>
            <span className="coming-text" style={{ color: 'rgba(255,255,255,0.7)' }}>Capability — six Claude Code drills. Open Day 2 →</span>
          </a>
        </div>
      </div>
    </>
  );
}
