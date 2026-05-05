'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CohortLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/cohort-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        const { level } = await res.json();
        router.push(`/ai-with-friends/cohort/${level}`);
      } else {
        setError('Wrong password. Try again.');
        setLoading(false);
      }
    } catch {
      setError('Something went wrong. Try again.');
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @font-face { font-family: 'Recoleta'; src: url('/fonts/Recoleta-Regular.otf') format('opentype'); font-weight: 400; }
        @font-face { font-family: 'Recoleta'; src: url('/fonts/Recoleta-SemiBold.otf') format('opentype'); font-weight: 600; }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: #101B0B; }

        .login-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #2d4a3e 0%, #1a2f1f 50%, #101B0B 100%);
          font-family: -apple-system, 'Helvetica Neue', sans-serif;
          -webkit-font-smoothing: antialiased;
          padding: 24px;
        }

        .login-card {
          background: #FCFAF5;
          border-radius: 16px;
          padding: 56px 52px;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.08);
        }

        .login-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #699963;
          margin-bottom: 12px;
        }

        .login-title {
          font-family: 'Recoleta', Georgia, serif;
          font-size: 36px;
          font-weight: 600;
          color: #435E35;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
        }

        .login-sub {
          font-size: 14px;
          color: #99948D;
          line-height: 1.5;
          margin-bottom: 36px;
        }

        .login-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #665B54;
          margin-bottom: 8px;
        }

        .login-input {
          width: 100%;
          padding: 14px 16px;
          border: 1.5px solid #E5DDD3;
          border-radius: 10px;
          font-size: 16px;
          font-family: inherit;
          color: #15231F;
          background: #fff;
          outline: none;
          transition: border-color 140ms ease;
          margin-bottom: 24px;
          -webkit-text-security: disc;
        }
        .login-input:focus { border-color: #435E35; }

        .login-btn {
          width: 100%;
          padding: 14px;
          background: #435E35;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition: background 140ms ease, opacity 140ms ease;
        }
        .login-btn:hover:not(:disabled) { background: #2d4a3e; }
        .login-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .login-error {
          margin-top: 16px;
          font-size: 13px;
          color: #E07C58;
          text-align: center;
        }
      `}</style>
      <div className="login-root">
        <div className="login-card">
          <div className="login-eyebrow">aligned ai · ai with friends</div>
          <h1 className="login-title">cohort access.</h1>
          <p className="login-sub">Enter the password from your welcome email to access your course materials.</p>
          <form onSubmit={submit}>
            <label className="login-label" htmlFor="pw">password</label>
            <input
              id="pw"
              className="login-input"
              type="text"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="········"
              autoFocus
            />
            <button className="login-btn" type="submit" disabled={loading || !password}>
              {loading ? 'checking…' : 'enter →'}
            </button>
          </form>
          {error && <p className="login-error">{error}</p>}
        </div>
      </div>
    </>
  );
}
