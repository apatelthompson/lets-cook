'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type DeckStageProps = {
  slides: ReactNode[];
};

export default function DeckStage({ slides }: DeckStageProps) {
  const [index, setIndex] = useState(0);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = slides.length;

  const flashOverlay = () => {
    setOverlayVisible(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setOverlayVisible(false), 1800);
  };

  const go = (next: number) => {
    const clamped = Math.max(0, Math.min(total - 1, next));
    setIndex(clamped);
    flashOverlay();
    try {
      history.replaceState(null, '', '#' + (clamped + 1));
    } catch {}
  };

  // Restore from hash after mount
  useEffect(() => {
    const m = (location.hash || '').match(/^#(\d+)$/);
    if (m) {
      const n = parseInt(m[1], 10) - 1;
      if (n >= 0 && n < total) setIndex(n);
    }
  }, [total]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key;
      let handled = true;
      if (k === 'ArrowRight' || k === 'PageDown' || k === ' ' || k === 'Spacebar') {
        go(index + 1);
      } else if (k === 'ArrowLeft' || k === 'PageUp') {
        go(index - 1);
      } else if (k === 'Home') {
        go(0);
      } else if (k === 'End') {
        go(total - 1);
      } else if (k === 'r' || k === 'R') {
        go(0);
      } else {
        handled = false;
      }
      if (handled) e.preventDefault();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, total]);

  // Auto-fit canvas to viewport
  useEffect(() => {
    const fit = () => {
      const el = canvasRef.current;
      if (!el) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const s = Math.min(vw / 1920, vh / 1080);
      el.style.transform = `scale(${s})`;
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  // Show overlay on mouse move
  useEffect(() => {
    const onMove = () => flashOverlay();
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Render only the active slide. Avoids any hydration-time className diffing
  // across the full deck. Slides are stateless, so unmounting is fine.
  return (
    <div className="deck-root">
      <div className="stage">
        <div className="canvas" ref={canvasRef}>
          {slides[index]}
        </div>
      </div>
      <div className={'deck-overlay' + (overlayVisible ? ' visible' : '')}>
        <button onClick={() => go(index - 1)} aria-label="Previous">‹</button>
        <span className="count">
          <span>{index + 1}</span>
          <span className="sep">/</span>
          <span className="total">{total}</span>
        </span>
        <button onClick={() => go(index + 1)} aria-label="Next">›</button>
        <span className="divider" />
        <button onClick={() => go(0)} aria-label="Reset">Reset</button>
      </div>
    </div>
  );
}
