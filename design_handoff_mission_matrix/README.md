# Handoff: Mission Matrix Landing Page

## Overview
A single-page marketing/explainer site for "The Mission Matrix" — a framework helping audacious leaders leverage four AI roles (Bodyguard, Coach, Intern, Partner) to achieve organizational ambitions. The page explains the 2×2 framework, how work moves between quadrants over time, a 5-step implementation process, and a CTA to contact Avni at This Beautiful Chaos.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing intended look and behavior, not production code to copy directly. The task is to **recreate these designs in your target codebase's existing environment** (React, Next.js, etc.) using its established patterns and libraries.

## Fidelity
**High-fidelity**: Pixel-accurate colors, typography (using real brand fonts — Recoleta + Airbnb Cereal App), spacing, and interactions. Recreate as closely as possible.

---

## Screens / Views

### 1. Nav Bar
- Sticky, `height: 64px`, `background: #FCFAF5`, `border-bottom: 1px solid #E5DDD3`
- Left: Milo logo (SVG mask with gradient `#FAA55A → #FF699D`), hidden via `visibility: hidden` (no Milo branding on page)
- Right: "Read the HBR article →" pill link — `border: 1.5px solid #699963`, `color: #435E35`, `border-radius: 100px`, `padding: 8px 20px`, font 14px/700. Hover: `background: #699963; color: #fff`
- Link target: `https://hbr.org` (placeholder — update with real URL)

---

### 2. Hero Section
**Layout:** Two-column grid (`1fr 1fr`), `gap: 72px`, `padding: 96px 48px 80px`, max-width 1160px centered.

**Left column — text:**
- Eyebrow: `"Unlocking organizational ambition"` — 12px, 700, `letter-spacing: 1.8px`, uppercase, color `#699963`
- H1: `"The Mission Matrix"` — Recoleta Bold, `clamp(40px, 4.5vw, 60px)`, `line-height: 1.1`, color `#101B0B`. "Matrix" in italic, color `#435E35`
- Body: `"How audacious leaders can leverage four different AI roles..."` — Airbnb Cereal 18px/400, `line-height: 1.75`, color `#665B54`
- CTA button: "Explore the framework →" — `background: #435E35`, white text, 16px/700, `padding: 16px 32px`, `border-radius: 100px`, `box-shadow: 0 2px 16px rgba(67,94,53,0.22)`. Hover: `background: #101B0B`, `translateY(-2px)`
- Sub-text: `"Work in progress · Shifting the conversation from how to why"` — italic, 14px, `#99948D`

**Right column — mini matrix:**
- 2×2 grid, `gap: 10px`, `border-radius: 24px`, `overflow: hidden`, `box-shadow: 0 12px 48px rgba(0,0,0,0.11)`
- Top-left: Coach (II) — `background: #D7EBF5`, `color: #1A3A52`
- Top-right: Bodyguard (I) — `background: #D9EBD8`, `color: #1E3D1A`
- Bottom-left: Intern (III) — `background: #FFE3CC`, `color: #6B3A10`
- Bottom-right: Partner (IV) — `background: #E9E4F7`, `color: #2E1F5E`
- Each mini-card: `padding: 26px 22px`, `min-height: 150px`; shows quadrant number (11px/700/uppercase/0.5 opacity), name (Recoleta 22px/700), role tagline (12px/0.65 opacity)

---

### 3. The Matrix Section (Full 2×2)
**Layout:** Max-width 1160px, `padding: 96px 48px`

**Section header** (centered):
- Eyebrow: "The Framework"
- H2: "Four roles. One clear map." — Recoleta, `clamp(30px, 3.5vw, 44px)`, color `#101B0B`
- Body text below

**Axes:**
- X-axis row above matrix: `← Low meaning` | `Depth of Meaning` (center, light) | `High meaning →`
- Y-axis column left of matrix: `High expertise ↑` | `Depth of Expertise` (center, light) | `↓ Low expertise`
- Axis labels: 11px/700/uppercase/`#99948D`; center labels: 12px/`#D1CAC0`

**Matrix grid:** `grid-template-columns: 1fr 1fr`, `gap: 12px`

**Quadrant layout (left=low meaning, right=high meaning, top=high expertise, bottom=low expertise):**
- Top-left: **Coach (II)** — `background: #D7EBF5`, `color: #1A3A52`
- Top-right: **Bodyguard (I)** — `background: #D9EBD8`, `color: #1E3D1A`
- Bottom-left: **Intern (III)** — `background: #FFE3CC`, `color: #6B3A10`
- Bottom-right: **Partner (IV)** — `background: #E9E4F7`, `color: #2E1F5E`

**Each quadrant card:** `border-radius: 22px`, `padding: 36px`, `min-height: 280px`. Hover: `translateY(-4px)`, `box-shadow: 0 16px 48px rgba(0,0,0,0.10)`

Each card contains:
- Quadrant number tag (11px/700/uppercase/0.45 opacity) + AI role pill (11px/700, `background: rgba(0,0,0,0.09)`, `border-radius: 100px`)
- H3: quadrant name — Recoleta 30px/700
- Tagline: 13px/700/uppercase/0.55 opacity
- Italic question quote: 15px/italic, `border-left: 2px solid rgba(0,0,0,0.12)`, `padding-left: 14px`
- Example chips: 12px/700, `background: rgba(0,0,0,0.08)`, `border-radius: 100px`, `padding: 5px 12px`

**Quadrant content:**

| Quadrant | Name | AI Role | Question | Examples |
|---|---|---|---|---|
| I | Bodyguard | Filter noise + create a forcefield | "What is deeply meaningful and I find purpose in being present and in the friction?" | Client debriefs, Weekly team lunches, High-stakes decisions |
| II | Coach | Enable doing the previously impossible | "What could I not do before but have always wanted to?" | Building your own prototype, Public speaking practice, New strategic capabilities |
| III | Intern | Automate with transparency | "What routine work could I fully hand off if I trusted the output?" | Performance review drafts, Sprint retro summaries, Meeting notes |
| IV | Partner | Assist and learn | "What do I have deep expertise in, but not meaning — and would be happy to teach and hand off?" | Weekly metrics pulls, Research synthesis, Draft generation |

---

### 4. How Work Moves (Dynamics Section)
**Layout:** `background: #FCFAF5`, `padding: 96px 48px`, max-width 1160px inner

**Section header:**
- Eyebrow: "Dynamic movement"
- H2: "Work moves. So should your map."

**4-card grid:** `grid-template-columns: repeat(2, 1fr)`, `gap: 20px`

Each card: `background: #fff`, `border: 1px solid #E5DDD3`, `border-radius: 20px`, `padding: 32px`

Cards + from→to pills (each pill uses its quadrant's color):

| Card | From | To |
|---|---|---|
| Map well enough to hand off | Partner (IV) `#E9E4F7 / #2E1F5E` | Intern (III) `#FFE3CC / #6B3A10` |
| Discover meaning in the detail | Partner (IV) | Bodyguard (I) `#D9EBD8 / #1E3D1A` |
| Own what you've mastered | Coach (II) `#D7EBF5 / #1A3A52` | Bodyguard (I) |
| Automate as expertise matures | Coach (II) | Intern (III) |

---

### 5. Implementation Section (5 Steps)
**Layout:** Max-width 1160px, `padding: 96px 48px`

**Section header:**
- Eyebrow: "How to implement it"
- H2: "Five steps to putting the matrix to work"

**Steps grid:** `grid-template-columns: repeat(5, 1fr)`, `gap: 16px`

Each step card: `background: #fff`, `border: 1px solid #E5DDD3`, `border-radius: 20px`, `padding: 28px 24px`
- Step number circle: `width/height: 36px`, `background: #435E35`, white, 15px/700
- H4: Recoleta 17px/700, `color: #101B0B`
- Body: 13px, `color: #665B54`

Steps: Values mapping → Expertise mapping → Work mapping → Tool selection → Rituals & boundaries

---

### 6. Key Questions Section
**Layout:** `background: #101B0B`, `padding: 96px 48px`

**Eyebrow:** "Before you begin" — `color: #699963`
**H2:** "Three questions every leader must answer" — Recoleta, white

**3-card grid:** `grid-template-columns: repeat(3, 1fr)`, `gap: 20px`

Each card: `background: rgba(255,255,255,0.06)`, `border: 1px solid rgba(255,255,255,0.10)`, `border-radius: 20px`, `padding: 32px`
- Icon emoji (28px, margin-bottom 16px)
- Question text: 17px/500, `color: rgba(255,255,255,0.88)`, `line-height: 1.6`

Questions:
1. ⚖️ Who owns decisions — and what does accountability look like when AI is involved?
2. 💰 How are costs managed? What's the budget model for AI tools across quadrants?
3. 🎯 What does good look like? Are your goals clearly defined before AI enters the picture?

---

### 7. CTA Section
**Layout:** Max-width 1160px, `padding: 96px 48px`, text-centered

- Eyebrow: "Ready to map your organization?"
- H2: "Read the full research in *Harvard Business Review*" (italic via Recoleta)
- Body: "The Mission Matrix is grounded in research on invisible work and organizational ambition. Reach out to explore how it applies to your org."
- Primary CTA: "Go deeper with your org →" — `mailto:avni@thisbeautifulchaos.org`
- Secondary link: "Read the HBR article →" — `https://hbr.org` (update with real URL)

---

### 8. Footer
- `background: #101B0B`, centered, 14px, `color: rgba(255,255,255,0.45)`
- "© 2024 This Beautiful Chaos · avni@thisbeautifulchaos.org"

---

## Design Tokens

### Colors
```
--pebble-50:   #FCFAF5  (nav bg, card bg)
--pebble-100:  #F6F3EC  (page bg)
--pebble-200:  #F4ECE0
--pebble-300:  #E5DDD3  (borders)
--pebble-400:  #D1CAC0
--pebble-500:  #99948D  (axis labels, muted text)
--pebble-600:  #665B54  (body text)
--forest:      #435E35  (primary buttons, step numbers)
--forest-dark: #101B0B  (headings, dark sections)
--moss:        #699963  (eyebrows, nav link border)
--moss-light:  #D9EBD8  (Bodyguard quadrant bg)
--ocean-light: #D7EBF5  (Coach quadrant bg)
--lav-light:   #E9E4F7  (Partner quadrant bg)
--peach-light: #FFE3CC  (Intern quadrant bg)
--gradient:    linear-gradient(135deg, #FAA55A 0%, #FF699D 100%)
```

### Typography
- **Display/headings:** Recoleta (Bold 700, SemiBold 600) — files in `fonts/`
- **Body/UI:** Airbnb Cereal App (Book 400, Medium 500, Bold 700, ExtraBold 800) — files in `fonts/`

### Spacing
- Section padding: `96px 48px` (desktop), `64px 24px` (mobile)
- Card border-radius: `20–22px`
- Button border-radius: `100px` (pill)

### Shadows
- Hero mini-matrix: `0 12px 48px rgba(0,0,0,0.11)`
- Nav: `none` (border-bottom only)
- Primary button: `0 2px 16px rgba(67,94,53,0.22)`

---

## Interactions & Behavior
- **Nav:** Sticky top, `z-index: 100`
- **"Explore the framework" CTA:** Smooth-scrolls to `#matrix`
- **Quadrant cards:** `transform: translateY(-4px)` + shadow on hover, `transition: 0.2s`
- **Nav link hover:** Background fills to `#699963`, text goes white
- **Primary button hover:** Darkens to `#101B0B`, lifts `translateY(-2px)`
- **Responsive:** At `≤900px`: single-column hero, single-column matrix, hide Y-axis label

---

## Assets
- `assets/milo-logo.svg` — Milo wordmark SVG (used as CSS mask with gradient; currently hidden)
- `fonts/Recoleta-*.otf` — Recoleta font family (Regular, Medium, SemiBold, Bold, Black)
- `fonts/AirbnbCereal*.ttf` — Airbnb Cereal App font family (Book, Medium, Bold, ExtraBold, Black)

---

## Files
- `Mission Matrix.html` — Complete single-file reference implementation (HTML + inline CSS)
