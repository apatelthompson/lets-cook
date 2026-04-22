'use client';

import React, { useState } from 'react';

type View = 'grid' | 'cards' | 'tabs';
type TabKey = 'levers' | 'artefacts' | 'tools' | 'risk' | 'getGood';

const quadrants = [
  {
    num: 'I',
    name: 'Bodyguard',
    tagline: 'Protect & make space',
    cls: 'mm-bodyguard',
    levers: 'Values and human capabilities',
    artefacts: 'Culture, values, apprenticeship, rituals',
    tools: 'Agents (Milo)',
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
    tools: 'Claude Code, agents',
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
    tools: 'Agents, workflows, Granola',
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
    tools: 'Wisperflow, Claude/ChatGPT, Canva',
    risk: 'Not transferring context effectively',
    getGood: 'How to manage memory effectively and switch between you vs. AI',
  },
];

const tabs: { key: TabKey; label: string; icon: string }[] = [
  { key: 'levers',    label: 'Key levers',    icon: '⚡' },
  { key: 'artefacts', label: 'Artefacts',     icon: '📄' },
  { key: 'tools',     label: 'Example tools', icon: '🔧' },
  { key: 'risk',      label: 'Risk',          icon: '⚠️' },
  { key: 'getGood',   label: 'Get good at',   icon: '★' },
];

export default function QuadrantDetails() {
  const [view, setView] = useState<View>('grid');
  const [activeTab, setActiveTab] = useState<TabKey>('levers');

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
          <div className="mm-view-switcher">
            <button
              className={`mm-view-btn${view === 'grid' ? ' mm-view-btn--active' : ''}`}
              onClick={() => setView('grid')}
              title="Grid view"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity={view === 'grid' ? 1 : 0.4}/>
                <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity={view === 'grid' ? 1 : 0.4}/>
                <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity={view === 'grid' ? 1 : 0.4}/>
                <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity={view === 'grid' ? 1 : 0.4}/>
              </svg>
              Grid
            </button>
            <button
              className={`mm-view-btn${view === 'cards' ? ' mm-view-btn--active' : ''}`}
              onClick={() => setView('cards')}
              title="Card view"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="14" height="4" rx="1.5" fill="currentColor" opacity={view === 'cards' ? 1 : 0.4}/>
                <rect x="1" y="6.5" width="14" height="4" rx="1.5" fill="currentColor" opacity={view === 'cards' ? 1 : 0.4}/>
                <rect x="1" y="12" width="14" height="3" rx="1.5" fill="currentColor" opacity={view === 'cards' ? 1 : 0.4}/>
              </svg>
              Cards
            </button>
            <button
              className={`mm-view-btn${view === 'tabs' ? ' mm-view-btn--active' : ''}`}
              onClick={() => setView('tabs')}
              title="Tab view"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="4" height="14" rx="1.5" fill="currentColor" opacity={view === 'tabs' ? 1 : 0.4}/>
                <rect x="6" y="1" width="9" height="6" rx="1.5" fill="currentColor" opacity={view === 'tabs' ? 1 : 0.4}/>
                <rect x="6" y="8.5" width="9" height="6.5" rx="1.5" fill="currentColor" opacity={view === 'tabs' ? 0.4 : 0.2}/>
              </svg>
              Tabs
            </button>
          </div>
        </div>

        {/* Grid view */}
        {view === 'grid' && (
          <div className="mm-deeper-grid">
            {/* Header row */}
            <div className="mm-dg-corner" />
            {quadrants.map((q) => (
              <div key={q.num} className={`mm-dg-col-head ${q.cls}`}>
                <span className="mm-dg-num">{q.num}</span>
                <span className="mm-dg-name">{q.name}</span>
                <span className="mm-dg-tag">{q.tagline}</span>
              </div>
            ))}

            {/* Rows */}
            {tabs.map((t) => (
              <React.Fragment key={t.key}>
                <div className="mm-dg-row-label">
                  <span className="mm-dg-row-icon">{t.icon}</span>
                  {t.label}
                </div>
                {quadrants.map((q) => (
                  <div key={`${t.key}-${q.num}`} className="mm-dg-cell">
                    {q[t.key]}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Card view */}
        {view === 'cards' && (
          <div className="mm-deeper-cards">
            {quadrants.map((q) => (
              <div key={q.num} className={`mm-dc-card ${q.cls}`}>
                <div className="mm-dc-head">
                  <span className="mm-quad-num">Quadrant {q.num}</span>
                  <h3 className="mm-quad-name">{q.name}</h3>
                  <p className="mm-quad-tagline">{q.tagline}</p>
                </div>
                <div className="mm-dc-body">
                  {tabs.map((t) => (
                    <div key={t.key} className="mm-dc-row">
                      <span className="mm-dc-label">
                        <span>{t.icon}</span> {t.label}
                      </span>
                      <span className="mm-dc-value">{q[t.key]}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab view */}
        {view === 'tabs' && (
          <div className="mm-deeper-tabs">
            <div className="mm-tab-bar">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  className={`mm-tab-btn${activeTab === t.key ? ' mm-tab-btn--active' : ''}`}
                  onClick={() => setActiveTab(t.key)}
                >
                  {t.icon} {t.label}
                </button>
              ))}
            </div>
            <div className="mm-tab-panel">
              {quadrants.map((q) => (
                <div key={q.num} className={`mm-tp-card ${q.cls}`}>
                  <div className="mm-tp-head">
                    <span className="mm-quad-num">{q.num}</span>
                    <span className="mm-quad-name" style={{ fontSize: '20px' }}>{q.name}</span>
                  </div>
                  <p className="mm-tp-value">{q[activeTab]}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
