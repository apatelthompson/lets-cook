import LogoutButton from '../LogoutButton';

export const metadata = { title: 'AI 101 · Cohort Dashboard' };

const EXERCISES = [
  {
    tag: '🧪 lab 01',
    time: '~7 min',
    title: 'the bake-off.',
    desc: 'Open Claude, ChatGPT, and Gemini. Same prompt — three very different answers.',
    slide: 9,
    color: 'pebble',
  },
  {
    tag: '🧪 lab 02',
    time: '~12 min',
    title: 'three rounds, one question.',
    desc: 'Ask the same question with no context, then context, then memory. Watch the answer transform.',
    slide: 20,
    color: 'lime',
  },
  {
    tag: '🧪 lab 03',
    time: '~5 min',
    title: 'the hallucination hunt.',
    desc: 'Ask for peer-reviewed citations in your field. Google one. Notice what you find — or don\'t.',
    slide: 27,
    color: 'peach',
  },
  {
    tag: '⚡ try it',
    time: '~60 sec',
    title: 'tokenizer.',
    desc: 'Paste a sentence — try one in another language too. See how models actually see your words.',
    slide: 15,
    color: 'lavender',
  },
  {
    tag: '⚡ try it',
    time: '~90 sec',
    title: 'knowledge cutoffs.',
    desc: 'Ask all three models their training cutoff, then ask what happened in the news yesterday.',
    slide: 17,
    color: 'ocean',
  },
  {
    tag: '⚡ try it',
    time: '~3 min',
    title: 'sycophancy test.',
    desc: 'Tell each model the earth might be flat, then push. Watch who holds their ground.',
    slide: 28,
    color: 'coral',
  },
  {
    tag: '⚡ try it',
    time: '~60 sec',
    title: 'multimodal drop.',
    desc: 'Drop a screenshot or photo into Claude or ChatGPT. Ask what\'s in it.',
    slide: 34,
    color: 'sun',
  },
  {
    tag: '📍 assessment',
    time: '~15 min',
    title: 'your mission matrix.',
    desc: 'A values-first assessment to find where AI fits your life — and where it doesn\'t.',
    slide: 44,
    color: 'moss',
  },
];

const COLOR_MAP: Record<string, { bg: string; border: string; tag: string }> = {
  pebble:   { bg: '#FCFAF5', border: '#E5DDD3', tag: '#99948D' },
  lime:     { bg: '#F4F7D9', border: '#DBD676', tag: '#6B7A1E' },
  peach:    { bg: '#FFF3E5', border: '#FFCB8F', tag: '#B8622A' },
  lavender: { bg: '#F0EDF9', border: '#C8BCE8', tag: '#6B559E' },
  ocean:    { bg: '#E8F4FB', border: '#A8D0E8', tag: '#2E5F80' },
  coral:    { bg: '#FDE8E4', border: '#F4B8B0', tag: '#B8402E' },
  sun:      { bg: '#FDF5DC', border: '#E8D090', tag: '#8A6B14' },
  moss:     { bg: '#E5F2E4', border: '#A8CFA6', tag: '#3A6B38' },
};

export default function Dashboard101() {
  return (
    <>
      <style>{`
        @font-face { font-family: 'Recoleta'; src: url('/fonts/Recoleta-Regular.otf') format('opentype'); font-weight: 400; }
        @font-face { font-family: 'Recoleta'; src: url('/fonts/Recoleta-SemiBold.otf') format('opentype'); font-weight: 600; }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #101B0B; }

        .db-root {
          min-height: 100vh;
          background: linear-gradient(135deg, #2d4a3e 0%, #1a2f1f 50%, #101B0B 100%);
          font-family: -apple-system, 'Helvetica Neue', sans-serif;
          -webkit-font-smoothing: antialiased;
          padding: 40px 24px 80px;
        }

        .db-inner {
          max-width: 860px;
          margin: 0 auto;
        }

        .db-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 40px;
          gap: 16px;
          flex-wrap: wrap;
        }

        .db-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #8BBE86;
          margin-bottom: 10px;
        }

        .db-title {
          font-family: 'Recoleta', Georgia, serif;
          font-size: 48px;
          font-weight: 600;
          color: #FCFAF5;
          line-height: 1.05;
          letter-spacing: -0.02em;
        }

        .db-title em {
          font-style: normal;
          background: linear-gradient(135deg, #B8C24A 0%, #8BBE86 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .db-logout {
          appearance: none;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.5);
          font-size: 12px;
          font-family: inherit;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 999px;
          cursor: pointer;
          transition: background 140ms, color 140ms;
          white-space: nowrap;
          flex-shrink: 0;
          margin-top: 6px;
        }
        .db-logout:hover { background: rgba(255,255,255,0.14); color: rgba(255,255,255,0.8); }

        /* Day card */
        .day-card {
          background: #FCFAF5;
          border-radius: 16px;
          padding: 36px 36px 28px;
          margin-bottom: 32px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }

        .day-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .day-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #699963;
          margin-bottom: 6px;
        }

        .day-title {
          font-family: 'Recoleta', Georgia, serif;
          font-size: 28px;
          font-weight: 600;
          color: #435E35;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .day-meta {
          font-size: 13px;
          color: #99948D;
          margin-top: 4px;
        }

        .day-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 22px;
          background: #435E35;
          color: #FCFAF5;
          text-decoration: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          white-space: nowrap;
          transition: background 140ms;
          flex-shrink: 0;
        }
        .day-cta:hover { background: #2d4a3e; }

        .day-divider {
          height: 1px;
          background: #E5DDD3;
          margin-bottom: 24px;
        }

        .day-exercises-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #99948D;
          margin-bottom: 16px;
        }

        .exercises-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 12px;
        }

        .ex-card {
          border-radius: 12px;
          padding: 18px 20px;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
          border: 1.5px solid;
          transition: transform 120ms ease, box-shadow 120ms ease;
        }
        .ex-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.1);
        }

        .ex-tag {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .ex-title {
          font-family: 'Recoleta', Georgia, serif;
          font-size: 18px;
          font-weight: 600;
          color: #15231F;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }

        .ex-desc {
          font-size: 12px;
          color: #665B54;
          line-height: 1.5;
        }

        .ex-time {
          font-size: 11px;
          font-weight: 600;
          color: #99948D;
          margin-top: 4px;
        }

        /* Placeholder day */
        .day-card-placeholder {
          background: rgba(255,255,255,0.04);
          border: 1.5px dashed rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 32px 36px;
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .placeholder-pill {
          background: rgba(255,255,255,0.06);
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          white-space: nowrap;
        }

        .placeholder-text {
          font-size: 14px;
          color: rgba(255,255,255,0.25);
        }
      `}</style>
      <div className="db-root">
        <div className="db-inner">

          <div className="db-top">
            <div>
              <div className="db-eyebrow">aligned ai · ai with friends</div>
              <h1 className="db-title">AI <em>101</em> — the foundations.</h1>
            </div>
            <LogoutButton className="db-logout" />
          </div>

          {/* Day 1 */}
          <div className="day-card">
            <div className="day-header">
              <div>
                <div className="day-label">101 · day 1</div>
                <div className="day-title">AI Foundations</div>
                <div className="day-meta">48 slides · 90 min · 3 labs</div>
              </div>
              <a className="day-cta" href="/ai-with-friends/day-1" target="_blank" rel="noopener noreferrer">
                open slides ↗
              </a>
            </div>

            <div className="day-divider" />

            <div className="day-exercises-label">exercises &amp; labs</div>
            <div className="exercises-grid">
              {EXERCISES.map(ex => {
                const c = COLOR_MAP[ex.color];
                return (
                  <a
                    key={ex.slide}
                    className="ex-card"
                    href={`/ai-with-friends/day-1#${ex.slide}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ background: c.bg, borderColor: c.border }}
                  >
                    <span className="ex-tag" style={{ color: c.tag }}>{ex.tag}</span>
                    <span className="ex-title">{ex.title}</span>
                    <span className="ex-desc">{ex.desc}</span>
                    <span className="ex-time">{ex.time}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Day 2 — coming soon */}
          <div className="day-card-placeholder">
            <span className="placeholder-pill">101 · day 2</span>
            <span className="placeholder-text">Capability — prompts, memory, and skills. Coming this week.</span>
          </div>

        </div>
      </div>
    </>
  );
}
