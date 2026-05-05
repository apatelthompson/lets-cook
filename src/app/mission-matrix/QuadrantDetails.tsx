import React from 'react';

type TabKey = 'levers' | 'artefacts' | 'tools' | 'risk' | 'getGood';

const quadrants = [
  {
    num: 'I',
    name: 'Bodyguard',
    tagline: 'Protect & make space',
    cls: 'mm-bodyguard',
    levers: 'Values and human capabilities',
    artefacts: 'Culture, values, apprenticeship, rituals',
    tools: 'Agents designed to filter',
    risk: 'Not protecting this space aggressively enough',
    getGood: 'How to build effective filters the agent will respect and follow',
  },
  {
    num: 'II',
    name: 'Coach',
    tagline: 'Challenge & push',
    cls: 'mm-coach',
    levers: 'Responsible but aggressive experimentation on the frontier',
    artefacts: 'Experimental play with safe sandboxes',
    tools: 'Claude Code/Codex, ChatGPT/Claude/Gemini',
    risk: 'Not experimenting boldly or quickly enough',
    getGood: 'How to build strong and secure sandboxes to enable unconstrained play',
  },
  {
    num: 'III',
    name: 'Intern',
    tagline: 'Automate & remove',
    cls: 'mm-intern',
    levers: 'Accurate workflow mapping',
    artefacts: 'Wikis and workflows',
    tools: 'Simple agents, automations',
    risk: 'Not fully handing off',
    getGood: 'How to see all of the work and describe it at the right level of detail',
  },
  {
    num: 'IV',
    name: 'Partner',
    tagline: 'Partner & lighten',
    cls: 'mm-partner',
    levers: 'Effective context capture and relevant use',
    artefacts: 'Specialized skills and memory combing',
    tools: 'Skills, Projects, AI embedded in existing tools (Canva, Notion etc)',
    risk: 'Not transferring context effectively',
    getGood: 'How to manage memory effectively and switch between you vs. AI',
  },
];

const rows: { key: TabKey; label: string; icon: string }[] = [
  { key: 'levers',    label: 'Key levers',    icon: '⚡' },
  { key: 'artefacts', label: 'Artefacts',     icon: '📄' },
  { key: 'tools',     label: 'Example tools', icon: '🔧' },
  { key: 'risk',      label: 'Risk',          icon: '⚠️' },
  { key: 'getGood',   label: 'Get good at',   icon: '★' },
];

export default function QuadrantDetails() {
  return (
    <section className="mm-deeper-section">
      <div className="mm-inner">
        <div className="mm-deeper-header">
          <div>
            <span className="mm-eyebrow">Going deeper</span>
            <h2 className="mm-h2">Quadrant details</h2>
            <p className="mm-section-body">
              What each role demands of your organization — the levers, artefacts, tools, risks, and skills to develop.
            </p>
          </div>
        </div>

        <div className="mm-deeper-grid">
          <div className="mm-dg-corner" />
          {quadrants.map((q) => (
            <div key={q.num} className={`mm-dg-col-head ${q.cls}`}>
              <span className="mm-dg-num">{q.num}</span>
              <span className="mm-dg-name">{q.name}</span>
              <span className="mm-dg-tag">{q.tagline}</span>
            </div>
          ))}

          {rows.map((r) => (
            <React.Fragment key={r.key}>
              <div className="mm-dg-row-label">
                <span className="mm-dg-row-icon">{r.icon}</span>
                {r.label}
              </div>
              {quadrants.map((q) => (
                <div key={`${r.key}-${q.num}`} className="mm-dg-cell">
                  {q[r.key]}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
