import LogoutButton from '../../LogoutButton';
import CopyButton from './CopyButton';

export const metadata = { title: 'AI 101 · Day 2 · Cohort Dashboard' };

type Step =
  | { kind: 'step'; text: string }
  | { kind: 'prompt'; label: string; text: string }
  | { kind: 'say'; label: string; text: string }
  | { kind: 'sub'; text: string };

type Exercise = {
  num: string;
  icon: string;
  title: string;
  sub: string;
  time: string;
  steps: Step[];
  footnote?: string;
};

const EXERCISES: Exercise[] = [
  {
    num: '01',
    icon: '⚡',
    title: 'From Chat to Action',
    sub: 'Point Claude Code at your Desktop and watch it create files from a single sentence.',
    time: '~10 min',
    steps: [
      { kind: 'step', text: 'In the Claude desktop app, click **Code** in the top-left sidebar (next to Cowork). Click **Select folder…** at the bottom and choose **Desktop**.' },
      { kind: 'step', text: 'In the bottom-right, confirm **Opus 4.7** (not Opus 4.7 1M) with **Medium** effort.' },
      { kind: 'step', text: 'Paste this prompt and hit Enter:' },
      {
        kind: 'prompt',
        label: 'Copy this',
        text: `Create a folder on my Desktop called context-directory. Inside it, create a file called day-7.md. Write a short summary of what Claude Code is and why someone would use it instead of just chatting with AI in a browser. Write it like you're explaining it to a smart friend who's skeptical.`,
      },
      { kind: 'step', text: 'Click **Allow** when Claude asks for permission.' },
      { kind: 'step', text: 'Type `what does it say?` and press Enter to hear Claude\'s summary.' },
      { kind: 'step', text: 'Click the arrow next to the file name to expand and read it yourself.' },
      { kind: 'step', text: 'Fill in your job title in the prompt below, then paste it:' },
      {
        kind: 'prompt',
        label: 'Copy this',
        text: `Rewrite that file, but assume the reader isn't a developer. They're a [your job title] who wants to use Claude Code (which is now available in the desktop app) to manage their work, not write code.`,
      },
      { kind: 'step', text: 'Expand the file again to see how it changed.' },
    ],
  },
  {
    num: '02',
    icon: '🗂️',
    title: 'Teach AI Who You Are',
    sub: 'Set up a context directory Claude can grow over time.',
    time: '~10 min',
    steps: [
      { kind: 'step', text: 'Switch your folder to **context-directory** (click the folder switcher at the top → select it). Stay in this folder for the rest of the exercises — it\'s how Claude finds your CLAUDE.md and notes on every conversation.' },
      { kind: 'step', text: 'Paste this prompt:' },
      {
        kind: 'prompt',
        label: 'Paste this prompt',
        text: `Set up my context directory on the Desktop with the following folders:

- me/
- team/
- my-manager/
- projects/
- company-context/
- daily-notes/

Ask me three questions that will help you fill in the most important context in this folder. Save the answers in the right folders.`,
      },
      { kind: 'step', text: 'Click **Allow** for each permission request.' },
      { kind: 'step', text: 'Answer the three questions.' },
      { kind: 'step', text: 'Paste:' },
      {
        kind: 'prompt',
        label: 'Paste this prompt',
        text: `Look through my Documents and Downloads folders and find one file that might be useful context about me or my work. Tell me what it is and ask if you should move it to the context directory.`,
      },
      { kind: 'step', text: 'Say yes/no on the suggested file.' },
    ],
  },
  {
    num: '03',
    icon: '🎙️',
    title: 'Set Up Voice Input',
    sub: 'Switch from typing to talking.',
    time: '~5 min',
    steps: [
      { kind: 'step', text: 'Click the caret next to the microphone button → toggle **Hold to record OFF**. Allow microphone access if prompted.' },
      { kind: 'step', text: 'Click the microphone, then say (out loud):' },
      {
        kind: 'say',
        label: 'Say this',
        text: `I'm going to tell you about my goals for the next year. Please add any useful information into a markdown file in the Me folder in my context directory.`,
      },
      { kind: 'step', text: 'Keep talking about your goals for ~2 minutes. Click the mic to stop, then hit Enter.' },
      { kind: 'step', text: 'If Claude doesn\'t tell you what it changed, ask: *what did you change in my context directory?*' },
    ],
    footnote: 'Optional: [Wispr Flow](https://wisprflow.ai/) for system-wide dictation.',
  },
  {
    num: '04',
    icon: '✅',
    title: 'Track Your To-Dos',
    sub: 'Make Claude your running task list.',
    time: '~10 min',
    steps: [
      { kind: 'step', text: 'Paste this prompt:' },
      {
        kind: 'prompt',
        label: 'Paste this prompt',
        text: `I want you to help me keep track of what I need to get done. Create a file called reminders.md in my context directory. Organize it by category — whatever categories make sense based on what I tell you. I'm going to dictate everything that's on my plate right now.`,
      },
      { kind: 'step', text: 'Hit the mic and brain-dump everything on your plate (work, life, errands, nagging stuff). Stop → Enter.' },
      { kind: 'step', text: 'Paste this so Claude keeps the list updated automatically going forward:' },
      {
        kind: 'prompt',
        label: 'Paste this prompt',
        text: `Add an instruction to my CLAUDE.md file (and create this file if you haven't already): whenever I mention something I need to do, a task, a reminder, or a to-do, add it to reminders.md in my context directory. Keep the file organized by category and urgency.`,
      },
    ],
  },
  {
    num: '05',
    icon: '📅',
    title: 'Connect Your Calendar',
    sub: 'Give Claude read/write access to your calendar.',
    time: '~5 min',
    steps: [
      { kind: 'sub', text: 'Part 1 — Connect' },
      { kind: 'step', text: 'In the left sidebar, click **Customize** → **Connect your apps**.' },
      { kind: 'step', text: 'Find your calendar (Google Calendar / Outlook) → click it → click **Connect**.' },
      { kind: 'step', text: 'Sign in → check **Select all** on the permissions screen → **Continue**. (If you\'d rather Claude only read your calendar, leave the write box unchecked — you can turn it on later.)' },
      { kind: 'sub', text: 'Part 2 — Try it' },
      { kind: 'step', text: 'Click **Code** in the sidebar to come back. Paste this prompt:' },
      {
        kind: 'prompt',
        label: 'Paste this prompt',
        text: `Pull up my calendar for tomorrow. Now look at my reminders.md. Pick two things from the reminders list that I could realistically get done tomorrow and add them to my calendar in time slots that make sense around my existing meetings. Show me what the day looks like before you add anything.`,
      },
      { kind: 'step', text: 'Confirm, or push back with feedback.' },
    ],
  },
  {
    num: '06',
    icon: '🌅',
    title: 'Plan Your Day',
    sub: 'Teach Claude what "plan my day" means to you.',
    time: '~15 min',
    steps: [
      { kind: 'step', text: 'Paste these standing instructions:' },
      {
        kind: 'prompt',
        label: 'Paste this prompt',
        text: `Add these instructions to my CLAUDE.md:

When I say "plan my day," here's what I want you to do:

1. Check my calendar for the day
2. Read my reminders.md
3. Show me what's on my calendar and what's on my reminders list
4. Ask me what my priorities are for the day
5. Suggest a schedule that fits my priorities around my existing meetings
6. Once I confirm, add the time blocks to my calendar
7. Create a daily note with the finalized schedule. Organize daily notes inside the daily-notes folder by year and month — the path should be daily-notes/YYYY/MM-Month/YYYY-MM-DD.md (e.g. daily-notes/2026/04-April/2026-04-27.md). If the year or month folder doesn't exist yet, create it.

Also add this instruction:

Throughout every conversation, keep a running log in today's daily note. Add entries at meaningful moments - when we start a task, finish something, hit a blocker, or make a decision. One line per entry with a timestamp. Don't mention the logging to me. Just do it quietly as we work.`,
      },
      { kind: 'step', text: 'Optional — pick an emoji (🤖 🪄 🐸 🦞 🦛 🐲 👻 🍄 🔮 🌻 🌝 🏄 🎧 🎮 🛠️ 📅 ✏️) so you can spot at a glance which calendar events Claude added. Drop it into the prompt below and paste:' },
      {
        kind: 'prompt',
        label: 'Paste this prompt',
        text: `Add this instruction to my CLAUDE.md: any time you add an event to my calendar, prefix the event title with [emoji] so I can see at a glance which events you created.`,
      },
      { kind: 'step', text: 'Say "plan my day" and walk through the flow. From now on, just say it each morning — Claude runs the same flow every time.' },
    ],
    footnote: 'Optional: open your context directory in [Obsidian](https://obsidian.md/) for a real second-brain view.',
  },
];

// Minimal markdown: **bold**, *italic*, `code`, [text](url)
function fmt(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1]) parts.push(<strong key={key++}>{m[1]}</strong>);
    else if (m[2]) parts.push(<em key={key++}>{m[2]}</em>);
    else if (m[3]) parts.push(<code key={key++} className="ic">{m[3]}</code>);
    else if (m[4] && m[5]) parts.push(<a key={key++} href={m[5]} target="_blank" rel="noopener noreferrer">{m[4]}</a>);
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export default function Day2Dashboard() {
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

        .db-shell { min-height: 100vh; background: #435E35; padding: 36px 40px 56px; }
        .db-inner { max-width: 1100px; margin: 0 auto; font-size: 140%; }

        .db-topbar { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 28px; }
        .db-brand { font-size: 12px; letter-spacing: 0.12em; color: #699963; font-weight: 700; margin-bottom: 14px; }
        .db-wordmark { font-family: 'Recoleta', Georgia, serif; font-size: 42px; line-height: 1; color: #fff; letter-spacing: -0.02em; }
        .db-wordmark-accent { color: #699963; }
        .db-wordmark-em { font-style: italic; font-weight: 400; }
        .db-logout {
          appearance: none; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.55); padding: 8px 18px; border-radius: 100px;
          font-size: 13px; font-family: inherit; cursor: pointer; transition: background 140ms, color 140ms;
        }
        .db-logout:hover { background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.85); }

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

        .db-card {
          background: #FCFAF5; border-radius: 22px; padding: 36px;
          display: grid; grid-template-columns: 300px 1fr; gap: 44px;
        }

        .rail { border-right: 1px dashed #D1CAC0; padding-right: 32px; }
        .rail-eyebrow { font-size: 12px; letter-spacing: 0.1em; color: #699963; font-weight: 700; margin-bottom: 8px; }
        .rail-title { font-family: 'Recoleta', Georgia, serif; font-size: 36px; line-height: 1.05; color: #435E35; letter-spacing: -0.02em; margin-bottom: 10px; }
        .rail-meta { font-size: 14px; color: #99948D; margin-bottom: 24px; }
        .rail-btn {
          width: 100%; background: linear-gradient(135deg, #FF699D 0%, #FAA55A 100%);
          color: #fff; border: none; padding: 15px 18px; border-radius: 12px;
          font-size: 15px; font-family: inherit; font-weight: 600; cursor: pointer;
          margin-bottom: 28px; display: flex; justify-content: space-between; align-items: center;
          text-decoration: none; transition: opacity 140ms;
        }
        .rail-btn:hover { opacity: 0.92; }
        .glance-label { font-size: 11px; letter-spacing: 0.1em; color: #99948D; font-weight: 700; margin-bottom: 12px; }
        .glance-list { display: flex; flex-direction: column; gap: 11px; font-size: 14px; line-height: 1.5; color: #524A41; }

        .section-row {
          display: flex; align-items: baseline; justify-content: space-between;
          padding-bottom: 10px; border-bottom: 1px solid #E5DDD3; margin-bottom: 14px; gap: 16px;
        }
        .section-row .left { display: flex; align-items: baseline; gap: 12px; flex: 1; min-width: 0; }
        .section-row .name { font-family: 'Recoleta', Georgia, serif; font-size: 21px; color: #101B0B; font-weight: 600; white-space: nowrap; }
        .section-row .blurb { font-size: 13px; color: #99948D; font-style: italic; line-height: 1.4; }
        .section-row .count { font-size: 12px; color: #99948D; font-variant-numeric: tabular-nums; white-space: nowrap; }

        .run-note {
          background: #EFF4E8; border: 1px solid #D6E2C5; border-radius: 10px;
          padding: 12px 16px; font-size: 13px; line-height: 1.55; color: #2F4D2A;
          margin-bottom: 14px;
        }
        .run-note strong { font-weight: 700; color: #1F3A19; }

        .acc { border: 1px solid #E5DDD3; border-radius: 14px; background: #fff; overflow: hidden; }
        .acc + .acc { margin-top: 10px; }

        .acc-summary {
          display: grid; grid-template-columns: 36px 28px 1fr 90px 24px;
          align-items: center; gap: 14px;
          padding: 16px 20px; cursor: pointer; user-select: none;
          transition: background 140ms;
          list-style: none;
        }
        .acc-summary::-webkit-details-marker { display: none; }
        .acc-summary:hover { background: #FBF7EE; }

        .acc-num { font-family: 'Recoleta', Georgia, serif; font-size: 20px; color: #699963; font-weight: 600; font-variant-numeric: tabular-nums; }
        .acc-icon { width: 28px; height: 28px; border-radius: 8px; display: grid; place-items: center; background: #F2EBDC; font-size: 15px; }
        .acc-title { font-family: 'Recoleta', Georgia, serif; font-size: 17px; color: #101B0B; font-weight: 600; letter-spacing: -0.01em; line-height: 1.2; }
        .acc-sub { font-size: 13px; color: #99948D; margin-top: 2px; line-height: 1.4; }
        .acc-time { font-size: 12px; color: #99948D; text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
        .acc-chev { width: 20px; height: 20px; display: grid; place-items: center; color: #99948D; transition: transform 200ms ease; }
        details[open] .acc-chev { transform: rotate(180deg); }

        .acc-body {
          padding: 4px 24px 24px 78px;
          border-top: 1px dashed #ECE3D2;
          background: linear-gradient(180deg, #FDFAF1 0%, #fff 60px);
        }

        .steps { list-style: none; counter-reset: step; display: flex; flex-direction: column; gap: 12px; padding-top: 18px; }
        .steps > li.step {
          counter-increment: step; position: relative; padding-left: 30px;
          font-size: 14px; line-height: 1.55; color: #524A41;
        }
        .steps > li.step::before {
          content: counter(step); position: absolute; left: 0; top: 1px;
          width: 22px; height: 22px; border-radius: 50%;
          background: #F2EBDC; color: #101B0B;
          font-family: 'Recoleta', Georgia, serif; font-size: 12px; font-weight: 600;
          display: grid; place-items: center;
        }
        .steps > li.sub {
          font-family: 'Recoleta', Georgia, serif; font-size: 14px; color: #435E35;
          font-weight: 600; margin-top: 6px; letter-spacing: 0.02em;
        }
        .steps > li.bare { padding-left: 30px; }

        .ic { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12.5px; background: #F2EBDC; padding: 2px 6px; border-radius: 4px; color: #524A41; }

        .prompt {
          margin-left: 30px; margin-top: 4px;
          background: #FFF8E6; border: 1px solid #F1E2B3; border-left: 4px solid #EBC959;
          border-radius: 10px; padding: 14px 16px 12px; position: relative;
        }
        .prompt.say { background: #EFF4FF; border-color: #C9D6F1; border-left-color: #6B8FD6; }
        .prompt-label {
          font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase;
          font-weight: 700; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;
          color: #7A5A1F;
        }
        .prompt.say .prompt-label { color: #2C4A85; }
        .prompt-body { font-size: 13.5px; line-height: 1.6; color: #3A2E10; white-space: pre-wrap; font-family: inherit; }
        .prompt.say .prompt-body { color: #1F3766; }

        .acc-foot { margin-top: 18px; padding: 12px 14px; border-radius: 8px; background: #F7F2E6; font-size: 12.5px; color: #7A6A4A; line-height: 1.5; }
        .acc-foot a { color: #435E35; }

        .acc-body p, .acc-body li { font-family: inherit; }
        .acc-body a { color: #435E35; }

        .source-note { margin-top: 22px; font-size: 12px; color: #99948D; font-style: italic; line-height: 1.5; }
        .source-note a { color: #435E35; text-decoration: none; }
        .source-note a:hover { text-decoration: underline; }

        .coming-card {
          margin-top: 24px; background: rgba(255,255,255,0.04);
          border: 1.5px dashed rgba(255,255,255,0.1); border-radius: 16px;
          padding: 24px 28px; display: flex; align-items: center; gap: 16px;
        }
        .coming-pill {
          background: rgba(255,255,255,0.06); border-radius: 8px; padding: 6px 14px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(255,255,255,0.25); white-space: nowrap;
        }
        .coming-text { font-size: 14px; color: rgba(255,255,255,0.3); }
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
            <a className="day-tab" href="/ai-with-friends/cohort/101">Day 1 · Foundations</a>
            <a className="day-tab is-active" href="/ai-with-friends/cohort/101/day-2">Day 2 · Capability</a>
          </div>

          <div className="db-card">
            <aside className="rail">
              <div className="rail-eyebrow">101 · DAY 2</div>
              <h2 className="rail-title">Capability</h2>
              <div className="rail-meta">6 exercises · ~60 min</div>
              <a className="rail-btn" href="#exercises">
                <span>jump to exercises</span><span>↓</span>
              </a>
              <div className="glance-label">AT A GLANCE</div>
              <div className="glance-list">
                <div>→ chat → action with Claude Code</div>
                <div>→ build a context directory</div>
                <div>→ talk instead of type</div>
                <div>→ to-dos that track themselves</div>
                <div>→ calendar + daily planning</div>
              </div>
            </aside>

            <div id="exercises">
              <div className="section-row">
                <div className="left">
                  <span className="name">Exercises</span>
                  <span className="blurb">six short drills — do them in order, in one sitting if you can.</span>
                </div>
                <span className="count">6 items</span>
              </div>

              <div className="run-note">
                <strong>How to run these.</strong> Do them in order, in the same Claude Code chat. Exercise 1 sets up your context-directory; from Exercise 2 on, you stay in that folder and just paste the next prompt. No new sessions, no re-opening the app.
              </div>

              {EXERCISES.map((ex, i) => (
                <details key={ex.num} className="acc" open={i === 0}>
                  <summary className="acc-summary">
                    <span className="acc-num">{ex.num}</span>
                    <span className="acc-icon">{ex.icon}</span>
                    <span>
                      <div className="acc-title">{ex.title}</div>
                      <div className="acc-sub">{ex.sub}</div>
                    </span>
                    <span className="acc-time">{ex.time}</span>
                    <span className="acc-chev">▾</span>
                  </summary>
                  <div className="acc-body">
                    <ol className="steps">
                      {ex.steps.map((s, idx) => {
                        if (s.kind === 'step') return <li key={idx} className="step">{fmt(s.text)}</li>;
                        if (s.kind === 'sub') return <li key={idx} className="sub">{s.text}</li>;
                        const isSay = s.kind === 'say';
                        return (
                          <li key={idx} className="bare" style={{ listStyle: 'none' }}>
                            <div className={isSay ? 'prompt say' : 'prompt'}>
                              <div className="prompt-label">
                                <span>{s.label}</span>
                                <CopyButton text={s.text} />
                              </div>
                              <div className="prompt-body">{s.text}</div>
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                    {ex.footnote && <div className="acc-foot">{fmt(ex.footnote)}</div>}
                  </div>
                </details>
              ))}

              <div className="source-note">
                Adapted from <a href="https://couchto5k.ai/" target="_blank" rel="noopener noreferrer">couchto5k.ai</a> — Hilary Gridley's free 30-day program (Days 7–12). Used with attribution.
              </div>
            </div>
          </div>

          <div className="coming-card">
            <span className="coming-pill">101 · day 3</span>
            <span className="coming-text">Workflows — building skills, agents, and your own commands. Coming next week.</span>
          </div>
        </div>
      </div>
    </>
  );
}
