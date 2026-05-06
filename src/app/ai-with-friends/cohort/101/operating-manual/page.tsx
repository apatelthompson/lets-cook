'use client';

import { useState } from 'react';

const STEPS = [
  {
    section: '1 of 5',
    title: 'Working Contract',
    desc: 'The highest-leverage section. Durable rules for how you want AI to work with you.',
    fields: [
      { key: 'style', label: 'Communication style', hint: 'How should AI talk to you? e.g. "Be succinct, skip preamble" or "Hold a clear POV, don\'t hedge"', multi: true },
      { key: 'format', label: 'Format preferences', hint: 'e.g. "Default to prose, not bullets" or "No emoji unless I use one first"', multi: true },
      { key: 'antipatterns', label: 'Anti-patterns — what NOT to do', hint: 'e.g. "Don\'t apologize for things that aren\'t mistakes" or "Don\'t reverse positions to match my mood"', multi: true },
    ],
  },
  {
    section: '2 of 5',
    title: 'Identity & Domain',
    desc: 'Only the parts that change the agent\'s reasoning — not your résumé.',
    fields: [
      { key: 'role', label: 'What do you do?', hint: 'One sentence — your role and focus area', multi: false },
      { key: 'domains', label: 'Domains you work in', hint: 'Disciplines, industries, technical stacks — comma-separated', multi: false },
      { key: 'frameworks', label: 'Frameworks or mental models you reference', hint: 'e.g. Jobs-to-be-Done, first-principles — anything you\'ll name-drop and expect understood', multi: false },
      { key: 'tools', label: 'Tools and stack you use daily', hint: 'Languages, platforms, products you\'ll mention without explaining', multi: false },
    ],
  },
  {
    section: '3 of 5',
    title: 'Current Focus',
    desc: 'What\'s active right now. This section rotates — update it often.',
    fields: [
      { key: 'projects', label: 'Active projects or workstreams', hint: 'One line each — what it is and where it stands right now', multi: true },
      { key: 'questions', label: 'What are you trying to figure out?', hint: 'Open questions you\'re chewing on', multi: true },
    ],
  },
  {
    section: '4 of 5',
    title: 'Glossary',
    desc: 'Terms, acronyms, and proper nouns specific to your work. Prevents the agent from guessing.',
    fields: [
      { key: 'glossary', label: 'Your terms (optional)', hint: 'Format: Term — your definition. One per line. e.g. "Milo — the AI for families product I work on"', multi: true },
    ],
  },
  {
    section: '5 of 5',
    title: 'Good vs Bad Examples',
    desc: 'The single highest-impact section. Showing beats telling.',
    fields: [
      { key: 'bad1', label: 'A bad AI response you\'ve received (optional)', hint: 'Paste or describe a response style you hate — over-hedging, wrong tone, missing the point', multi: true },
      { key: 'good1', label: 'What the ideal version would look like', hint: 'How should it have responded instead?', multi: true },
    ],
  },
];

type Answers = Record<string, string>;

function buildMarkdown(answers: Answers, today: string): string {
  const lines: string[] = [];

  lines.push('# How to Work With Me — AI Agent Operating Manual');
  lines.push('');
  lines.push(`> Generated ${today} · Keep this under ~200 lines. Review quarterly.`);
  lines.push('');
  lines.push('---');
  lines.push('');

  // Section 1
  lines.push('## 1. Working Contract');
  lines.push('');
  if (answers.style?.trim()) {
    lines.push('**Communication style**');
    answers.style.trim().split('\n').filter(Boolean).forEach(l => lines.push(`- ${l.replace(/^[-•]\s*/, '')}`));
    lines.push('');
  }
  if (answers.format?.trim()) {
    lines.push('**Format**');
    answers.format.trim().split('\n').filter(Boolean).forEach(l => lines.push(`- ${l.replace(/^[-•]\s*/, '')}`));
    lines.push('');
  }
  if (answers.antipatterns?.trim()) {
    lines.push('**Anti-patterns** (what NOT to do)');
    answers.antipatterns.trim().split('\n').filter(Boolean).forEach(l => lines.push(`- ${l.replace(/^[-•]\s*/, '')}`));
    lines.push('');
  }
  lines.push('---');
  lines.push('');

  // Section 2
  lines.push('## 2. Identity & Domain');
  lines.push('');
  if (answers.role?.trim()) lines.push(`**What I do:** ${answers.role.trim()}`);
  if (answers.domains?.trim()) lines.push(`**Domains:** ${answers.domains.trim()}`);
  if (answers.frameworks?.trim()) lines.push(`**Frameworks I reference:** ${answers.frameworks.trim()}`);
  if (answers.tools?.trim()) lines.push(`**Tools / stack:** ${answers.tools.trim()}`);
  lines.push('');
  lines.push('---');
  lines.push('');

  // Section 3
  lines.push('## 3. Current Focus');
  lines.push('');
  lines.push(`**Last updated:** ${today}`);
  lines.push('');
  if (answers.projects?.trim()) {
    answers.projects.trim().split('\n').filter(Boolean).forEach(l => lines.push(`- ${l.replace(/^[-•]\s*/, '')}`));
  }
  if (answers.questions?.trim()) {
    lines.push('');
    lines.push('**What I\'m trying to figure out:**');
    answers.questions.trim().split('\n').filter(Boolean).forEach(l => lines.push(`- ${l.replace(/^[-•]\s*/, '')}`));
  }
  lines.push('');
  lines.push('---');
  lines.push('');

  // Section 4
  if (answers.glossary?.trim()) {
    lines.push('## 4. Glossary');
    lines.push('');
    answers.glossary.trim().split('\n').filter(Boolean).forEach(l => {
      const clean = l.replace(/^[-•]\s*/, '');
      lines.push(`- **${clean}**`);
    });
    lines.push('');
    lines.push('---');
    lines.push('');
  }

  // Section 5
  if (answers.bad1?.trim() || answers.good1?.trim()) {
    lines.push('## 5. Examples — Good vs Bad');
    lines.push('');
    lines.push('**Example 1**');
    lines.push('');
    if (answers.bad1?.trim()) {
      lines.push('❌ Bad:');
      lines.push(`> ${answers.bad1.trim().replace(/\n/g, '\n> ')}`);
      lines.push('');
    }
    if (answers.good1?.trim()) {
      lines.push('✅ Good:');
      lines.push(`> ${answers.good1.trim().replace(/\n/g, '\n> ')}`);
      lines.push('');
    }
    lines.push('---');
    lines.push('');
  }

  // Maintenance reminder
  lines.push('## Maintenance');
  lines.push('');
  lines.push('- Every time you correct the agent and think "I shouldn\'t have to say this every time" → add a line.');
  lines.push('- Every line that\'s never been violated and never been used → cut a line.');
  lines.push('- Net to zero. Review quarterly.');

  return lines.join('\n');
}

function download(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function OperatingManualWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const today = new Date().toISOString().slice(0, 10);
  const markdown = done ? buildMarkdown(answers, today) : '';

  const set = (key: string, val: string) =>
    setAnswers(prev => ({ ...prev, [key]: val }));

  const next = () => {
    if (isLast) { setDone(true); }
    else setStep(s => s + 1);
  };

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
          background: #435E35;
          font-family: 'Cereal', -apple-system, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .wiz-shell {
          min-height: 100vh;
          background: #435E35;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 40px 24px 80px;
        }

        .wiz-inner { width: 100%; max-width: 680px; }

        .wiz-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          margin-bottom: 28px;
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          padding: 0;
          transition: color 140ms;
        }
        .wiz-back:hover { color: rgba(255,255,255,0.85); }

        /* Progress */
        .progress-track {
          display: flex;
          gap: 6px;
          margin-bottom: 36px;
        }
        .progress-dot {
          height: 4px;
          flex: 1;
          border-radius: 2px;
          background: rgba(255,255,255,0.18);
          transition: background 300ms;
        }
        .progress-dot.active { background: rgba(255,255,255,0.9); }
        .progress-dot.done { background: rgba(255,255,255,0.5); }

        /* Card */
        .wiz-card {
          background: #FCFAF5;
          border-radius: 20px;
          padding: 40px 44px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.25);
        }

        .wiz-section-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #699963;
          margin-bottom: 8px;
        }

        .wiz-title {
          font-family: 'Recoleta', Georgia, serif;
          font-size: 30px;
          font-weight: 600;
          color: #435E35;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
          line-height: 1.1;
        }

        .wiz-desc {
          font-size: 14px;
          color: #99948D;
          line-height: 1.5;
          margin-bottom: 32px;
        }

        .field { margin-bottom: 24px; }

        .field-label {
          display: block;
          font-size: 13px;
          font-weight: 700;
          color: #435E35;
          margin-bottom: 6px;
        }

        .field-hint {
          font-size: 12px;
          color: #99948D;
          margin-bottom: 8px;
          line-height: 1.5;
        }

        .field-input, .field-textarea {
          width: 100%;
          border: 1.5px solid #E5DDD3;
          border-radius: 10px;
          padding: 12px 14px;
          font-size: 14px;
          font-family: inherit;
          color: #1A1815;
          background: #fff;
          outline: none;
          transition: border-color 140ms;
          resize: vertical;
        }
        .field-input:focus, .field-textarea:focus { border-color: #435E35; }
        .field-textarea { min-height: 90px; }

        .wiz-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid #E5DDD3;
        }

        .btn-back {
          appearance: none;
          background: none;
          border: 1.5px solid #E5DDD3;
          color: #99948D;
          padding: 11px 20px;
          border-radius: 10px;
          font-size: 14px;
          font-family: inherit;
          font-weight: 500;
          cursor: pointer;
          transition: border-color 140ms, color 140ms;
        }
        .btn-back:hover { border-color: #D1CAC0; color: #665B54; }

        .btn-next {
          appearance: none;
          background: #435E35;
          border: none;
          color: #fff;
          padding: 12px 28px;
          border-radius: 10px;
          font-size: 14px;
          font-family: inherit;
          font-weight: 600;
          cursor: pointer;
          transition: background 140ms;
        }
        .btn-next:hover { background: #2d4a3e; }
        .btn-next.gradient {
          background: linear-gradient(135deg, #FF699D 0%, #FAA55A 100%);
        }
        .btn-next.gradient:hover {
          background: linear-gradient(135deg, #FF4F8A 0%, #F09040 100%);
        }

        /* Done state */
        .done-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #699963;
          margin-bottom: 8px;
        }

        .done-title {
          font-family: 'Recoleta', Georgia, serif;
          font-size: 30px;
          font-weight: 600;
          color: #435E35;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
        }

        .done-desc {
          font-size: 14px;
          color: #99948D;
          line-height: 1.5;
          margin-bottom: 24px;
        }

        .done-preview {
          background: #F6F3EC;
          border: 1px solid #E5DDD3;
          border-radius: 12px;
          padding: 20px 22px;
          font-family: 'Courier New', monospace;
          font-size: 12px;
          line-height: 1.7;
          color: #524A41;
          white-space: pre-wrap;
          max-height: 320px;
          overflow-y: auto;
          margin-bottom: 24px;
        }

        .done-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn-download {
          appearance: none;
          background: linear-gradient(135deg, #FF699D 0%, #FAA55A 100%);
          border: none;
          color: #fff;
          padding: 13px 28px;
          border-radius: 10px;
          font-size: 15px;
          font-family: inherit;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 140ms;
        }
        .btn-download:hover { opacity: 0.9; }

        .btn-restart {
          appearance: none;
          background: none;
          border: 1.5px solid #E5DDD3;
          color: #99948D;
          padding: 12px 22px;
          border-radius: 10px;
          font-size: 14px;
          font-family: inherit;
          font-weight: 500;
          cursor: pointer;
          transition: border-color 140ms, color 140ms;
        }
        .btn-restart:hover { border-color: #D1CAC0; color: #665B54; }
      `}</style>

      <div className="wiz-shell">
        <div className="wiz-inner">
          <a className="wiz-back" href="/ai-with-friends/cohort/101">← back to dashboard</a>

          {!done ? (
            <>
              <div className="progress-track">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`progress-dot ${i === step ? 'active' : i < step ? 'done' : ''}`}
                  />
                ))}
              </div>

              <div className="wiz-card">
                <div className="wiz-section-label">{current.section}</div>
                <h2 className="wiz-title">{current.title}</h2>
                <p className="wiz-desc">{current.desc}</p>

                {current.fields.map(field => (
                  <div key={field.key} className="field">
                    <label className="field-label" htmlFor={field.key}>{field.label}</label>
                    <div className="field-hint">{field.hint}</div>
                    {field.multi ? (
                      <textarea
                        id={field.key}
                        className="field-textarea"
                        value={answers[field.key] || ''}
                        onChange={e => set(field.key, e.target.value)}
                        placeholder="one item per line…"
                      />
                    ) : (
                      <input
                        id={field.key}
                        type="text"
                        className="field-input"
                        value={answers[field.key] || ''}
                        onChange={e => set(field.key, e.target.value)}
                      />
                    )}
                  </div>
                ))}

                <div className="wiz-footer">
                  {step > 0 ? (
                    <button className="btn-back" onClick={() => setStep(s => s - 1)}>← back</button>
                  ) : <span />}
                  <button
                    className={`btn-next${isLast ? ' gradient' : ''}`}
                    onClick={next}
                  >
                    {isLast ? 'generate my doc →' : 'next →'}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="wiz-card">
              <div className="done-label">done</div>
              <h2 className="done-title">your operating manual.</h2>
              <p className="done-desc">Download it, save it somewhere you'll find it, and paste the relevant sections into each tool. Review it quarterly.</p>

              <div className="done-preview">{markdown}</div>

              <div className="done-actions">
                <button
                  className="btn-download"
                  onClick={() => download(markdown, 'how-to-work-with-me.md')}
                >
                  download .md ↓
                </button>
                <button
                  className="btn-restart"
                  onClick={() => { setStep(0); setAnswers({}); setDone(false); }}
                >
                  start over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
