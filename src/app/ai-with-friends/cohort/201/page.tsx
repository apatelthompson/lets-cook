import LogoutButton from '../LogoutButton';

export const metadata = { title: 'AI 201 · Cohort Dashboard' };

export default function Dashboard201() {
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
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .db-inner { max-width: 860px; width: 100%; margin: 0 auto; }

        .db-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 48px;
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
          background: linear-gradient(135deg, #FF699D 0%, #FAA55A 100%);
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

        .coming-card {
          background: rgba(255,255,255,0.04);
          border: 1.5px dashed rgba(255,255,255,0.12);
          border-radius: 16px;
          padding: 56px 48px;
          text-align: center;
        }

        .coming-icon { font-size: 48px; margin-bottom: 20px; }

        .coming-title {
          font-family: 'Recoleta', Georgia, serif;
          font-size: 28px;
          font-weight: 600;
          color: rgba(255,255,255,0.7);
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .coming-body {
          font-size: 15px;
          color: rgba(255,255,255,0.35);
          line-height: 1.6;
          max-width: 440px;
          margin: 0 auto;
        }
      `}</style>
      <div className="db-root">
        <div className="db-inner">
          <div className="db-top">
            <div>
              <div className="db-eyebrow">aligned ai · ai with friends</div>
              <h1 className="db-title">AI <em>201</em> — going deeper.</h1>
            </div>
            <LogoutButton className="db-logout" />
          </div>
          <div className="coming-card">
            <div className="coming-icon">🚧</div>
            <div className="coming-title">materials coming soon.</div>
            <p className="coming-body">
              Your AI 201 course materials will appear here before your first session.
              Check back closer to your start date.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
