'use client';

import { useState } from 'react';

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1400);
        });
      }}
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
        {copied ? 'Copied ✓' : 'Copy'}
      </span>
    </button>
  );
}
