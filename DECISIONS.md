# Decisions

Running log of structural decisions and the reasoning behind them. Read this on session start along with `CLAUDE.md`. Append a new entry whenever a decision was made by weighing alternatives. Never delete entries — if a decision gets reversed, write a new entry that supersedes it. The point is preserving *why*, so future sessions inherit intuition, not just code.

Format per entry: **Decided** (one sentence), **Why** (the trade-off that mattered), **Considered and rejected** (with reasons), **Reversal cost** (rough estimate).

---

## 2026-04-22 — Reimplement AI with Friends from Vite/HTML to Next.js inside Mission Matrix

**Decided:** AWF was rebuilt as `src/app/ai-with-friends/page.tsx` inside this Next.js repo, replacing the original standalone Vite/HTML version that had been living in `~/letscook/`.

**Why:** Bringing AWF into the Mission Matrix repo enabled shared layout, type safety, and a single deployment target. AWF is conceptually a downstream of Mission Matrix (the framework page links into AWF), so colocating made navigation, styling, and metadata easier to keep consistent.

**Considered and rejected:**
- *Keep AWF as standalone Vite project, link to it from Mission Matrix.* Rejected: extra deployment to manage, no shared layout/typography, harder to keep visual consistency with the Mission Matrix page. Two URLs for users to bookmark.
- *Skip Next.js, just keep the static HTML.* Rejected: AWF needs a server-side webhook (Typeform → Google Calendar), which a static-only deploy can't host without bolt-on serverless functions. Already had Next.js for SMS.

**Reversal cost:** Medium. Reimplementing again would mean redoing the React/CSS work. Several days of effort.

**What went wrong (in retrospect):** The decision was correct, but the *execution* missed the deletion-and-parity step. The Vite version was not deleted, not marked deprecated, and continued to receive edits. By 2026-04-30 the two versions had drifted — the Vite version had a Tuesday cohort that was never ported into the Next.js version. This is what motivated the "framework migrations need an explicit deprecation plan" rule (saved to memory).

---

## 2026-04-29 — Rename `lets-cook` → `mission-matrix` everywhere

**Decided:** The local folder, the GitHub repo, and the Vercel project were all renamed to `mission-matrix`. Local: `~/Projects/lets-cook/` → `~/Projects/mission-matrix/` (re-cloned after GitHub rename). GitHub: `apatelthompson/lets-cook` → `apatelthompson/mission-matrix` (GitHub keeps the old name as a redirect). Vercel project name was already `mission-matrix`, so it stayed; only the connected GitHub repo had to be re-pointed.

**Why:** Folder/repo/project naming drift was the root cause of a near-disaster: a `~/letscook/` folder had `.vercel/project.json` linked to the `mission-matrix` Vercel project, which silently caused the AI-with-Friends Vite content to deploy *over* Mission Matrix in production. Forcing all three names to match makes that class of mis-link impossible.

**Considered and rejected:**
- *Keep "lets-cook" everywhere — it's the historical umbrella name.* Rejected: the repo's primary purpose has been Mission Matrix for over a month; the "lets-cook" name was a legacy artifact and didn't reflect what the project is.
- *Rename only the Vercel project, leave the repo alone.* Rejected: doesn't fix the root cause. Folder name and repo name still disagree, the same class of bug remains possible.

**Reversal cost:** Low. GitHub keeps the old repo name as an automatic redirect, so old URLs and clone commands still work. Reverting would just mean another rename.

---

## 2026-04-30 — AI with Friends stays nested in Mission Matrix (do not split out)

**Decided:** AWF will continue to live at `mission-matrix.vercel.app/ai-with-friends` as a route inside this repo. We are NOT carving it out as a standalone `ai-with-friends` repo and Vercel project, despite an in-progress attempt to do so.

**Why:** During the carve-out attempt, it became clear that the AWF code being carved (the Vite version in `~/letscook/`) was the *deprecated* version, not the canonical one. The canonical AWF (the actively-edited Next.js page) was already inside Mission Matrix. Splitting would have meant duplicating the canonical Next.js code into a new repo, creating a fresh opportunity for the same drift problem we'd just suffered. The simpler answer was: AWF *is* a Mission Matrix page, treat it as such, don't introduce a second repo.

**Considered and rejected:**
- *Split AWF into a standalone repo + Vercel project + redirect from `mission-matrix.vercel.app/ai-with-friends` → new URL.* Rejected: more moving parts, more places for drift, no clear benefit. The original goal — "AWF can stand alone, links off of Mission Matrix" — is satisfied just as well by AWF being a route on Mission Matrix.
- *Keep both versions running in parallel forever.* Rejected: this is what caused the problem. Two versions = drift.

**Reversal cost:** Low. AWF can be carved out later if it ever needs an independent deployment cadence or its own domain. Until then, nesting is simpler and safer.

**Supersedes:** the in-progress carve-out work in `~/Projects/ai-with-friends/` (a half-finished local-only project). That folder is dead and slated for cleanup.

---

## 2026-04-30 — Restore Tuesday cohort to AWF webhook and page

**Decided:** Both [src/app/api/typeform-webhook/route.ts](src/app/api/typeform-webhook/route.ts) and [src/app/ai-with-friends/page.tsx](src/app/ai-with-friends/page.tsx) now carry both Tuesday and Friday cohorts. Webhook detects cohort via day name in the Typeform choice label (`/\btues/` or `/\bfri/`); page schedule lists both groups explicitly.

**Why:** A real signup (Bess Yount, AI 101 + 201, Tuesday noon) got Friday calendar invites because the deployed webhook had only Friday dates hardcoded. Root cause: the webhook had been rewritten JS→TS in a prior session, and the Tuesday cohort dates were silently dropped during that rewrite. Restoring them — and restructuring so dates *and* time both come from a cohort lookup, not separate vars — closes the immediate bug and makes future drift harder.

**Considered and rejected:**
- *Just patch the webhook, leave the page alone (it shows Friday-only with two times).* Rejected: the page was lying to users — there was no Friday-noon cohort, that was a Tuesday-noon cohort being mislabeled. The page also had to be fixed to match reality.
- *Detect cohort by time string instead of day name.* Rejected: less reliable. Multiple time formats could appear in labels; day names ("Tuesdays", "Fridays") are unambiguous.

**Reversal cost:** Low. Behavior change is purely additive — Tuesday signups now work; Friday signups continue working.

---

## 2026-04-30 — Adopt CLAUDE.md + DECISIONS.md as living per-repo docs

**Decided:** Every active repo gets a `CLAUDE.md` (current state, gotchas, key files) and a `DECISIONS.md` (this file). Both are updated *in the same commit* as any structural change they document, so the docs and the code can never drift relative to each other. Reading both is the first action in any new Claude Code session that enters the repo.

**Why:** Each Claude Code session starts amnesiac. The duplication mess that this whole retrospective was about — "someone reimplemented AWF in Next.js without a deletion plan" — happened because there was no per-repo state file for a fresh session to read. Memory files (in `~/.claude/...`) are good for cross-project rules ("always preview before deploy"), but bad for per-project state ("AWF is canonical here, the Vite version is dead"). Repo-scoped, version-controlled docs are the right home for that.

**Considered and rejected:**
- *Just rely on global memory files for everything.* Rejected: memory isn't scoped per repo, doesn't survive `cd` into the repo cleanly, can't be diffed in git, and tends to age. Repo files solve all of those.
- *Decisions log as a separate Notion/Airtable/etc.* Rejected: would live outside the repo, could drift from the code, requires extra tools to read. The doc and the code should ship together.
- *Don't bother with a decisions log; just rely on git commit messages.* Rejected: commit messages capture *what* changed, not *why* a decision was made nor what alternatives were rejected. The user explicitly wants the trade-off reasoning preserved, not just the diffs.

**Reversal cost:** Trivial. Worst case, the docs become stale and we ignore them. Best case, they become the on-ramp for every future session.

---

## 2026-05-04 — Retire `lets-cook-rho.vercel.app` and `~/Projects/aligned-ai/`

**Decided:** The `lets-cook-rho` Vercel project was deleted (now serves a 404). The local `~/Projects/aligned-ai/` folder — a stale clone of the pre-rename `lets-cook` repo, still wired to the dead Vercel project and missing the 2026-04-30 Tuesday cohort fixes — was moved to `~/.Trash/aligned-ai-2026-05-04`. A scaffolded but never-deployed sub-project, `the-cc-club/` (a separate Next.js/Supabase landing page that AWF evolved past), went with it. The GitHub Actions secret `VERCEL_APP_URL` was updated to `https://mission-matrix.vercel.app`.

**Why:** Finishing the deprecation that the 2026-04-29 rename started. Two folders (`mission-matrix` and `aligned-ai`) both thinking they were the canonical umbrella was exactly the drift class the rename was supposed to eliminate. Keeping `lets-cook-rho.vercel.app` live meant a public URL was serving stale Mission Matrix content with no way to push fixes to it. Trashing the local clone + deleting the Vercel project closes both holes.

**Considered and rejected:**
- *Pause the Vercel project instead of deleting.* Rejected: leaves a half-state to forget about. The site has no users — clean removal is simpler.
- *Keep aligned-ai locally as a backup.* Rejected: the canonical history is on GitHub at `apatelthompson/mission-matrix`. A local stale clone is anti-backup — it tempts future edits in the wrong place.
- *Delete the GitHub repo `apatelthompson/lets-cook` too.* Not done: GitHub keeps it as an automatic redirect to `mission-matrix`, which is harmless and useful. No reason to remove.

**Reversal cost:** Low. Trash is recoverable for 30 days. The Vercel project can be re-created and re-linked from `mission-matrix`'s git remote if ever needed.

---

<!-- Append new entries above this line. Never delete. If a decision is reversed, write a new entry referencing the prior one. -->
