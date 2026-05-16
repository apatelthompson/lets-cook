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

const DEFAULT_STORAGE_KEY = "mm-assessment-v1";

interface Ctx {
  state: AssessmentState;
  update: (patch: Partial<AssessmentState>) => void;
  reset: () => void;
  /** True after the first read from storage finishes (or no-op on SSR). */
  hydrated: boolean;
}

const AssessmentContext = createContext<Ctx | null>(null);

export function AssessmentProvider({
  children,
  storageKey = DEFAULT_STORAGE_KEY,
}: {
  children: ReactNode;
  storageKey?: string;
}) {
  const [state, setState] = useState<AssessmentState>(() => emptyState());
  const [hydrated, setHydrated] = useState(false);

  // Pick the storage backend per provider instance. localStorage persists
  // across tab close (for /playground-v2 + /audition deep-link); the live
  // /assessment flow keeps sessionStorage (single-sitting completion).
  const storage =
    typeof window === "undefined"
      ? null
      : storageKey.includes("playground")
        ? window.localStorage
        : window.sessionStorage;

  // rehydrate from storage on mount
  useEffect(() => {
    try {
      const raw = storage?.getItem(storageKey);
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
      storage?.setItem(storageKey, JSON.stringify(state));
    } catch {
      // ignore (quota / private mode)
    }
  }, [state, hydrated]);

  const value = useMemo<Ctx>(
    () => ({
      state,
      hydrated,
      update: (patch) => setState((s) => ({ ...s, ...patch })),
      reset: () => {
        try {
          storage?.removeItem(storageKey);
        } catch {}
        setState(emptyState());
      },
    }),
    [state, hydrated],
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
