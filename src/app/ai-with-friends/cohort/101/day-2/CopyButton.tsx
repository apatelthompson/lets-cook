'use client';

import { useState } from 'react';

type Props = {
  text: string;
  variant?: 'inline' | 'pill';
  label?: string;
};

export default function CopyButton({ text, variant = 'inline', label }: Props) {
  const [copied, setCopied] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };

  if (variant === 'pill') {
    return (
      <button type="button" onClick={handleClick} className="copy-pill">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        <span>{copied ? 'Copied ✓' : (label ?? 'Copy the prompt')}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{
        appearance: 'none',
        border: '1px solid currentColor',
        background: copied ? 'currentColor' : '#fff',
        color: 'inherit',
        font: 'inherit',
        fontSize: 11,
        fontWeight: 700,
        padding: '4px 10px',
        borderRadius: 100,
        cursor: 'pointer',
        letterSpacing: '0.04em',
        transition: 'all 140ms',
      }}
    >
      <span style={{ color: copied ? '#fff' : 'inherit', mixBlendMode: copied ? 'difference' : 'normal' }}>
        {copied ? 'Copied ✓' : (label ?? 'Copy')}
      </span>
    </button>
  );
}
