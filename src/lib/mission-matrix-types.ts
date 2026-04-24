export const PROFESSION_CATEGORIES = [
  "Operator / Exec",
  "IC / Builder",
  "Creative",
  "Consultant",
  "Founder",
  "Researcher",
  "Educator",
  "Healthcare",
  "Legal",
  "Finance",
  "Other",
] as const;
export type ProfessionCategory = (typeof PROFESSION_CATEGORIES)[number];

export const COMPANY_SIZES = [
  "Solo",
  "2–10",
  "11–50",
  "51–200",
  "200+",
] as const;
export type CompanySize = (typeof COMPANY_SIZES)[number];

export const YEARS_EXPERIENCE = ["<2", "2–5", "5–10", "10+"] as const;
export type YearsExperience = (typeof YEARS_EXPERIENCE)[number];

export type Quadrant = "growth" | "craft" | "routine" | "drain";

export const QUADRANT_META: Record<
  Quadrant,
  { title: string; subtitle: string; bg: string; ink: string }
> = {
  growth: {
    title: "Your growth edge",
    subtitle: "High meaning · Low expertise",
    bg: "#e9e4f7",
    ink: "#2e1f5e",
  },
  craft: {
    title: "Your core craft",
    subtitle: "High meaning · High expertise",
    bg: "#d9ebd8",
    ink: "#1e3d1a",
  },
  routine: {
    title: "Routine tasks",
    subtitle: "Low meaning · Low expertise",
    bg: "#ffe3cc",
    ink: "#6b3a10",
  },
  drain: {
    title: "Skilled but draining",
    subtitle: "Low meaning · High expertise",
    bg: "#d7ebf5",
    ink: "#1a3a52",
  },
};

export interface AssessmentItem {
  /** 1-based order */
  order: number;
  text: string;
  meaning: number | null;   // 1–5
  expertise: number | null; // 1–5
}

export interface AssessmentState {
  // profile
  profession_category: ProfessionCategory | "";
  profession_other: string;
  role_title: string;
  company_size: CompanySize | "";
  years_experience: YearsExperience | "";
  company_name: string;
  location: string;
  // items
  items: AssessmentItem[];
  // reflections
  reflection_1: string;
  reflection_2: string;
  reflection_3: string;
  // consent + delivery
  first_name: string;
  email: string;
  consent_research: boolean;
  consent_marketing: boolean;
  // meta
  started_at: number; // Date.now()
}

export function quadrantFor(meaning: number, expertise: number): Quadrant {
  const highM = meaning >= 4;
  const highE = expertise >= 4;
  if (highM && highE) return "craft";
  if (highM && !highE) return "growth";
  if (!highM && highE) return "drain";
  return "routine";
}

export function emptyState(): AssessmentState {
  return {
    profession_category: "",
    profession_other: "",
    role_title: "",
    company_size: "",
    years_experience: "",
    company_name: "",
    location: "",
    items: Array.from({ length: 7 }, (_, i) => ({
      order: i + 1,
      text: "",
      meaning: null,
      expertise: null,
    })),
    reflection_1: "",
    reflection_2: "",
    reflection_3: "",
    first_name: "",
    email: "",
    consent_research: false,
    consent_marketing: false,
    started_at: Date.now(),
  };
}
