export const metadata = {
  title: "AI with Friends – AI Learning Labs",
  description:
    "Small group AI learning sessions with Avni Patel Thompson. AI 101 and AI 201, Fridays in May over Zoom.",
};

export default function Page() {
  return (
    <>
      <style>{`
        @font-face { font-family: 'Recoleta'; src: url('/fonts/Recoleta-Regular.otf') format('opentype'); font-weight: 400; }
        @font-face { font-family: 'Recoleta'; src: url('/fonts/Recoleta-SemiBold.otf') format('opentype'); font-weight: 600; }
        @font-face { font-family: 'Airbnb Cereal App'; src: url('/fonts/AirbnbCerealBook.ttf') format('truetype'); font-weight: 400; }
        @font-face { font-family: 'Airbnb Cereal App'; src: url('/fonts/AirbnbCerealMedium.ttf') format('truetype'); font-weight: 500; }
        @font-face { font-family: 'Airbnb Cereal App'; src: url('/fonts/AirbnbCerealBold.ttf') format('truetype'); font-weight: 700; }

        .awf-root *, .awf-root *::before, .awf-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .awf-root {
          --pebble-50:  #FCFAF5;
          --pebble-100: #F6F3EC;
          --pebble-200: #F4ECE0;
          --pebble-300: #E5DDD3;
          --pebble-400: #D1CAC0;
          --pebble-500: #99948D;
          --forest:     #435E35;
          --forest-dark:#101B0B;
          --moss:       #699963;
          --moss-light: #D9EBD8;
          --coral:      #EE7B6E;
          --coral-light:#FADCD7;
          --peach:      #FAA55A;
          --peach-light:#FFE3CC;
          --sun:        #EBC959;
          --sun-light:  #F7EECB;
          --text-dark:  #464D4B;
          --text-mid:   #665B54;
          --text-light: #99948D;
          width: 100%; height: 100vh; overflow: hidden;
          background: #1e1e1e;
          font-family: -apple-system, 'Helvetica Neue', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .awf-desktop {
          width: 100vw; height: 100vh;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #2d4a3e 0%, #1a2f1f 50%, #101B0B 100%);
        }

        .awf-window {
          width: min(1100px, 96vw);
          height: min(680px, 92vh);
          border-radius: 12px;
          overflow: hidden;
          display: flex; flex-direction: column;
          box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.08);
          background: #f5f5f0;
        }

        .awf-titlebar {
          height: 40px;
          background: rgba(240,238,232,0.98);
          border-bottom: 1px solid rgba(0,0,0,0.12);
          display: flex; align-items: center;
          padding: 0 16px; gap: 8px; flex-shrink: 0;
        }
        .awf-traffic { display: flex; gap: 8px; }
        .awf-dot { width: 13px; height: 13px; border-radius: 50%; }
        .awf-dot-red    { background: #FF5F57; border: 0.5px solid rgba(0,0,0,0.1); }
        .awf-dot-yellow { background: #FEBC2E; border: 0.5px solid rgba(0,0,0,0.1); }
        .awf-dot-green  { background: #28C840; border: 0.5px solid rgba(0,0,0,0.1); }
        .awf-titlebar-title {
          flex: 1; text-align: center;
          font-size: 13px; font-weight: 600;
          color: rgba(0,0,0,0.55); letter-spacing: -0.01em;
        }
        .awf-titlebar-icons { display: flex; gap: 16px; }
        .awf-titlebar-icons svg { width: 16px; height: 16px; color: rgba(0,0,0,0.4); }

        .awf-body { display: flex; flex: 1; overflow: hidden; }

        .awf-sidebar {
          width: 200px; flex-shrink: 0;
          background: rgba(230,227,220,0.9);
          border-right: 1px solid rgba(0,0,0,0.1);
          display: flex; flex-direction: column;
          overflow-y: auto; padding: 12px 0;
        }
        .awf-sidebar-label {
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase;
          background: linear-gradient(90deg, #FF699D 0%, #F48457 50%, #FAA55A 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent; color: transparent;
          padding: 8px 16px 4px; display: inline-block;
        }
        .awf-sidebar-item {
          display: flex; align-items: center;
          padding: 5px 12px 5px 16px;
          font-size: 13px; color: rgba(0,0,0,0.75);
          cursor: pointer; border-radius: 7px; margin: 0 6px; gap: 8px;
        }
        .awf-sidebar-item:hover { background: rgba(0,0,0,0.06); }
        .awf-sidebar-item.active { background: #FADCD7; color: #6b2e26; font-weight: 600; }
        .awf-sidebar-item .count { margin-left: auto; font-size: 12px; color: rgba(0,0,0,0.35); }
        .awf-sidebar-item.active .count { color: rgba(0,0,0,0.5); }
        .awf-sidebar-icon { font-size: 14px; flex-shrink: 0; }
        .awf-sidebar-divider { height: 1px; background: rgba(0,0,0,0.08); margin: 8px 12px; }

        .awf-note-list {
          width: 260px; flex-shrink: 0;
          background: #f0ede6;
          border-right: 1px solid rgba(0,0,0,0.1);
          display: flex; flex-direction: column; overflow: hidden;
        }
        .awf-list-header { padding: 14px 16px 10px; border-bottom: 1px solid rgba(0,0,0,0.08); flex-shrink: 0; }
        .awf-list-title { font-size: 20px; font-weight: 700; color: rgba(0,0,0,0.82); letter-spacing: -0.02em; margin-bottom: 2px; }
        .awf-list-count { font-size: 12px; color: rgba(0,0,0,0.4); }
        .awf-list-items { overflow-y: auto; flex: 1; }
        .awf-note-item { padding: 10px 16px; border-bottom: 1px solid rgba(0,0,0,0.07); cursor: pointer; }
        .awf-note-item:hover { background: rgba(0,0,0,0.04); }
        .awf-note-item.active { background: #FADCD7; }
        .awf-item-title { font-size: 14px; font-weight: 600; color: rgba(0,0,0,0.82); margin-bottom: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .awf-note-item.active .awf-item-title { color: #6b2e26; }
        .awf-item-preview { font-size: 12px; color: rgba(0,0,0,0.45); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1.4; }
        .awf-item-date { font-size: 11px; color: rgba(0,0,0,0.35); margin-bottom: 3px; }
        .awf-note-item.active .awf-item-preview,
        .awf-note-item.active .awf-item-date { color: rgba(107,46,38,0.7); }
        .awf-group-label { font-size: 12px; font-weight: 600; color: rgba(0,0,0,0.4); padding: 12px 16px 4px; letter-spacing: -0.01em; }
        .awf-item-lock { display: inline-block; font-size: 11px; background: rgba(0,0,0,0.08); border-radius: 4px; padding: 1px 5px; margin-left: 4px; color: rgba(0,0,0,0.4); }

        .awf-content { flex: 1; overflow-y: auto; background: #FFFDF7; display: flex; flex-direction: column; }
        .awf-toolbar {
          height: 44px; flex-shrink: 0;
          background: rgba(252,250,245,0.95);
          border-bottom: 1px solid rgba(0,0,0,0.08);
          display: flex; align-items: center;
          padding: 0 20px; gap: 20px;
        }
        .awf-toolbar svg { width: 18px; height: 18px; color: rgba(0,0,0,0.4); }
        .awf-spacer { flex: 1; }
        .awf-search {
          display: flex; align-items: center; gap: 6px;
          background: rgba(0,0,0,0.07); border-radius: 6px;
          padding: 4px 10px; font-size: 12px; color: rgba(0,0,0,0.4);
        }
        .awf-search svg { width: 12px; height: 12px; }

        .awf-inner { max-width: 640px; margin: 0 auto; padding: 32px 40px 80px; width: 100%; font-family: 'Airbnb Cereal App', sans-serif; }
        .awf-meta { font-size: 12px; color: var(--text-light); text-align: center; margin-bottom: 24px; }
        .awf-heading { font-family: 'Recoleta', serif; font-size: 28px; font-weight: 600; line-height: 1.15; letter-spacing: -0.02em; color: var(--forest-dark); margin-bottom: 8px; }
        .awf-intro { font-size: 16px; color: var(--text-mid); line-height: 1.6; margin-bottom: 22px; }
        .awf-tldr { background: #E3EBB2; border-left: 3px solid #88C24A; border-radius: 10px; padding: 13px 16px; margin-bottom: 24px; font-size: 14px; line-height: 1.6; color: var(--text-mid); }
        .awf-tldr strong { color: var(--text-dark); }
        .awf-divider { border: none; border-top: 1px solid var(--pebble-300); margin: 20px 0; }
        .awf-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
          background: linear-gradient(90deg, #FF699D 0%, #F48457 50%, #FAA55A 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent; color: transparent;
          margin-bottom: 8px; display: inline-block;
        }
        .awf-logistics { background: var(--pebble-50); border: 1px solid var(--pebble-300); border-radius: 12px; overflow: hidden; margin-bottom: 20px; }
        .awf-log-row { display: flex; align-items: flex-start; gap: 10px; padding: 10px 14px; border-bottom: 1px solid var(--pebble-300); font-size: 14px; }
        .awf-log-row:last-child { border-bottom: none; }
        .awf-log-icon { font-size: 16px; flex-shrink: 0; width: 24px; text-align: center; margin-top: 1px; }
        .awf-log-text { color: var(--text-mid); line-height: 1.45; }
        .awf-log-text strong { color: var(--text-dark); font-weight: 700; }

        .awf-tracks { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 8px; }
        .awf-card { border-radius: 12px; padding: 16px; }
        .awf-card.warm  { background: #F7EECB; border: 1px solid rgba(235,201,89,0.45); }
        .awf-card.peach { background: #FADCD7; border: 1px solid rgba(238,123,110,0.3); }
        .awf-card-head { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
        .awf-tag { font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 100px; letter-spacing: 0.03em; }
        .warm  .awf-tag { background: var(--moss); color: #fff; }
        .peach .awf-tag { background: var(--peach); color: var(--forest-dark); }
        .awf-dates { font-size: 12px; color: var(--text-mid); font-weight: 500; }
        .awf-card h3 { font-family: 'Recoleta', serif; font-size: 16px; font-weight: 600; color: var(--forest-dark); margin-bottom: 3px; }
        .awf-who { font-size: 12px; color: var(--text-mid); margin-bottom: 10px; }
        .awf-bullets { list-style: none; display: flex; flex-direction: column; gap: 6px; }
        .awf-bullets li { font-size: 13px; line-height: 1.45; color: var(--text-mid); display: flex; gap: 6px; align-items: baseline; }
        .awf-b { flex-shrink: 0; font-weight: 700; }
        .warm  .awf-b { color: var(--moss); }
        .peach .awf-b { color: var(--coral); }

        .awf-price-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
        .awf-price-list li { font-size: 15px; line-height: 1.5; color: var(--text-mid); display: flex; gap: 8px; align-items: baseline; }
        .awf-price-list .awf-b { color: var(--text-light); }
        .awf-price-list strong { color: var(--text-dark); font-weight: 700; }

        .awf-ld { margin-top: 14px; background: #E3EBB2; border: 1px solid rgba(238,123,110,0.25); border-radius: 10px; padding: 12px 14px; font-size: 14px; line-height: 1.6; color: var(--text-mid); }
        .awf-ld strong { color: #5a8a30; font-weight: 700; }

        .awf-host { display: flex; align-items: center; gap: 12px; padding: 12px 14px; background: var(--pebble-50); border: 1px solid var(--pebble-300); border-radius: 12px; }
        .awf-host-pic { width: 48px; height: 48px; border-radius: 50%; background: var(--pebble-300); flex-shrink: 0; overflow: hidden; }
        .awf-host-pic img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
        .awf-host-name { font-family: 'Recoleta', serif; font-size: 16px; font-weight: 600; color: var(--forest-dark); margin-bottom: 2px; }
        .awf-host-bio { font-size: 13px; color: var(--text-mid); line-height: 1.4; }

        .awf-cta { display: block; text-align: center; background: var(--forest); color: #fff; font-size: 16px; font-weight: 700; padding: 14px; border-radius: 12px; text-decoration: none; margin-bottom: 8px; transition: background 0.15s; }
        .awf-cta:hover { background: var(--moss); }
        .awf-cta-note { font-size: 12px; color: var(--text-light); text-align: center; line-height: 1.6; }

        /* ── RESPONSIVE ── */
        @media (max-width: 860px) {
          .awf-root { height: auto; overflow: auto; }
          .awf-desktop { align-items: flex-start; padding: 20px; min-height: 100vh; }
          .awf-window { width: 100%; height: auto; }
          .awf-sidebar, .awf-note-list { display: none; }
          .awf-content { overflow: visible; }
          .awf-toolbar { position: sticky; top: 0; z-index: 10; }
        }
        @media (max-width: 540px) {
          .awf-desktop { padding: 0; }
          .awf-window { border-radius: 0; box-shadow: none; width: 100vw; }
          .awf-inner { padding: 24px 20px 60px; }
          .awf-tracks { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="awf-root">
        <div className="awf-desktop">
          <div className="awf-window">

            {/* Title bar */}
            <div className="awf-titlebar">
              <div className="awf-traffic">
                <div className="awf-dot awf-dot-red" />
                <div className="awf-dot awf-dot-yellow" />
                <div className="awf-dot awf-dot-green" />
              </div>
              <div className="awf-titlebar-title">Notes</div>
              <div className="awf-titlebar-icons">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
              </div>
            </div>

            {/* Body */}
            <div className="awf-body">

              {/* Sidebar */}
              <div className="awf-sidebar">
                <div className="awf-sidebar-label">Aligned AI</div>
                <div className="awf-sidebar-item"><span className="awf-sidebar-icon">📝</span> Notes <span className="count">8</span></div>
                <div className="awf-sidebar-divider" />
                <div className="awf-sidebar-item active"><span className="awf-sidebar-icon">👯‍♀️</span> ai with friends <span className="count">5</span></div>
                <div className="awf-sidebar-item"><span className="awf-sidebar-icon">🥬</span> groceries <span className="count">3</span></div>
                <div className="awf-sidebar-item"><span className="awf-sidebar-icon">📚</span> reading list <span className="count">7</span></div>
                <div className="awf-sidebar-item"><span className="awf-sidebar-icon">✅</span> to-dos <span className="count">12</span></div>
                <div className="awf-sidebar-item"><span className="awf-sidebar-icon">🕺🏽</span> adventure time <span className="count">4</span></div>
                <div className="awf-sidebar-divider" />
                <div className="awf-sidebar-item"><span className="awf-sidebar-icon">🗑</span> Recently Deleted <span className="count">2</span></div>
              </div>

              {/* Note list */}
              <div className="awf-note-list">
                <div className="awf-list-header">
                  <div className="awf-list-title">👯‍♀️ ai with friends</div>
                  <div className="awf-list-count">5 notes</div>
                </div>
                <div className="awf-list-items">
                  <div className="awf-group-label">Pinned</div>
                  <div className="awf-note-item active">
                    <div className="awf-item-date">Today</div>
                    <div className="awf-item-title">Sign up ✍️</div>
                    <div className="awf-item-preview">I&apos;ve spent 4 years figuring out AI — what&apos;s real, what&apos;s noise...</div>
                  </div>
                  <div className="awf-group-label">Session notes</div>
                  <div className="awf-note-item">
                    <div className="awf-item-date">May 8</div>
                    <div className="awf-item-title">Session 1: AI foundations 🌱 <span className="awf-item-lock">🔒</span></div>
                    <div className="awf-item-preview">What AI is, how it works, your values assessment...</div>
                  </div>
                  <div className="awf-note-item">
                    <div className="awf-item-date">May 15</div>
                    <div className="awf-item-title">Session 2: Working with AI 🧰 <span className="awf-item-lock">🔒</span></div>
                    <div className="awf-item-preview">Prompts, memory, tools, best practices...</div>
                  </div>
                  <div className="awf-note-item">
                    <div className="awf-item-date">May 22</div>
                    <div className="awf-item-title">Session 3: Going deeper 🌊 <span className="awf-item-lock">🔒</span></div>
                    <div className="awf-item-preview">How models work, agents and workflows...</div>
                  </div>
                  <div className="awf-note-item">
                    <div className="awf-item-date">May 29</div>
                    <div className="awf-item-title">Session 4: Build time 🛠 <span className="awf-item-lock">🔒</span></div>
                    <div className="awf-item-preview">Building your personal page or WhatsApp agent...</div>
                  </div>
                </div>
              </div>

              {/* Note content */}
              <div className="awf-content">
                <div className="awf-toolbar">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12h14"/></svg>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 6h16M4 10h16M4 14h10"/></svg>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>
                  <div className="awf-spacer" />
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                  <div className="awf-search">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                    Search
                  </div>
                </div>

                <div className="awf-inner">
                  <div className="awf-meta">Today at 9:41 AM</div>
                  <div className="awf-heading">👯‍♀️ AI with friends</div>
                  <p className="awf-intro">I&apos;ve spent 4 years figuring out how to make AI useful and reliable as a non-technical builder, learning everything from the ground up. I&apos;m distilling those 4 years into 4 sessions so you walk away feeling capable and confident — both as a savvy citizen and a capable builder.</p>

                  <div className="awf-tldr">
                    💡 <strong>The idea:</strong>{" "}small peer group learning over Zoom, Fridays in May. You pick 101 if you want a solid foundation, 201 if you want to put AI to work on your problems, or both. Either way, you&apos;ll leave knowing how to navigate this stuff, on your terms, as it keeps evolving.
                  </div>

                  <div className="awf-label">When</div>
                  <div className="awf-logistics">
                    <div className="awf-log-row">
                      <span className="awf-log-icon">📅</span>
                      <div className="awf-log-text"><strong>May 8, 15, 22 &amp; 29</strong> — Fridays</div>
                    </div>
                    <div className="awf-log-row">
                      <span className="awf-log-icon">🕘</span>
                      <div className="awf-log-text">
                        <strong>Group 1:</strong> 9:00–10:30am PT &nbsp;·&nbsp; <strong>Group 2:</strong> 12:00–1:30pm PT
                      </div>
                    </div>
                    <div className="awf-log-row">
                      <span className="awf-log-icon">💻</span>
                      <div className="awf-log-text">Virtual over <strong>Zoom</strong></div>
                    </div>
                  </div>

                  <hr className="awf-divider" />
                  <div className="awf-label">Two tracks</div>

                  <div className="awf-tracks">
                    <div className="awf-card warm">
                      <div className="awf-card-head">
                        <span className="awf-tag">May 8 &amp; 15</span>
                      </div>
                      <h3>🌴 AI 101: The foundations</h3>
                      <div className="awf-who">Newer to AI or want to build a solid foundation by understanding core concepts</div>
                      <ul className="awf-bullets">
                        <li><span className="awf-b">→</span> What AI actually is and isn&apos;t</li>
                        <li><span className="awf-b">→</span> Learn mental models to guide decision making</li>
                        <li><span className="awf-b">→</span> Evaluate new developments/news to figure out what&apos;s important</li>
                        <li><span className="awf-b">→</span> Learn base tools — prompts, memory, tools, skills</li>
                        <li><span className="awf-b">→</span> Learn the mission matrix to know what kind of AI to use for what purpose</li>
                      </ul>
                    </div>
                    <div className="awf-card peach">
                      <div className="awf-card-head">
                        <span className="awf-tag">May 22 &amp; 29</span>
                      </div>
                      <h3>🌺 AI 201: Build to solve</h3>
                      <div className="awf-who">Already comfortable with basic AI, now wanting to go deeper with problem solving via agents/code in a safe, supported way</div>
                      <ul className="awf-bullets">
                        <li><span className="awf-b">→</span> Agents, code and workflow automations</li>
                        <li><span className="awf-b">→</span> Use the mission matrix to identify what to build an agent for</li>
                        <li><span className="awf-b">→</span> Learning how to learn + art and skill of debugging</li>
                        <li><span className="awf-b">→</span> Build your own: professional page, work agent or family agent</li>
                      </ul>
                    </div>
                  </div>

                  <hr className="awf-divider" />
                  <div className="awf-label">Cost</div>
                  <ul className="awf-price-list">
                    <li><span className="awf-b">→</span> 🌴 AI 101 only (May 8 &amp; 15) — <strong>$450</strong></li>
                    <li><span className="awf-b">→</span> 🌺 AI 201 only (May 22 &amp; 29) — <strong>$450</strong></li>
                    <li><span className="awf-b">→</span> 🍍 Full series, all 4 sessions — <strong>$800</strong></li>
                  </ul>
                  <div className="awf-ld">
                    🤓 <strong>Expensing this?</strong>{" "}This qualifies for Learning &amp; Development. Lmk if you need an invoice and documentation.
                  </div>

                  <hr className="awf-divider" />
                  <div className="awf-label">Your guide</div>
                  <div className="awf-host">
                    <div className="awf-host-pic"><img src="/avni.jpg" alt="Avni Patel Thompson" /></div>
                    <div>
                      <div className="awf-host-name">Avni Patel Thompson</div>
                      <div className="awf-host-bio">Founder, scientist, mama. 4 years of building thoughtful and responsible AI. <a href="#" target="_blank" rel="noopener noreferrer">Watch TED talk</a> to learn more about my POV.</div>
                    </div>
                  </div>

                  <hr className="awf-divider" />
                  <a href="https://form.typeform.com/to/Fn6FDiGv" target="_blank" rel="noopener noreferrer" className="awf-cta">Sign me up →</a>
                  <p className="awf-cta-note">You&apos;ll pick your time group when you sign up. Questions? Just <a href="sms:+14153435537" style={{color: "inherit", textDecoration: "underline"}}>reach out to Avni directly</a>.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
