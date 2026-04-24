"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AssessmentState } from "@/lib/mission-matrix-types";
import { emptyState } from "@/lib/mission-matrix-types";

const STORAGE_KEY = "mm-assessment-v1";

interface Ctx {
  state: AssessmentState;
  update: (patch: Partial<AssessmentState>) => void;
  reset: () => void;
}

const AssessmentContext = createContext<Ctx | null>(null);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AssessmentState>(() => emptyState());
  const [hydrated, setHydrated] = useState(false);

  // rehydrate from sessionStorage on mount
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as AssessmentState;
        // basic shape check — items array must exist
        if (parsed && Array.isArray(parsed.items)) {
          setState(parsed);
        }
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  // persist on change (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore (quota / private mode)
    }
  }, [state, hydrated]);

  const value = useMemo<Ctx>(
    () => ({
      state,
      update: (patch) => setState((s) => ({ ...s, ...patch })),
      reset: () => {
        try {
          sessionStorage.removeItem(STORAGE_KEY);
        } catch {}
        setState(emptyState());
      },
    }),
    [state],
  );

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const ctx = useContext(AssessmentContext);
  if (!ctx) throw new Error("useAssessment must be used inside AssessmentProvider");
  return ctx;
}
