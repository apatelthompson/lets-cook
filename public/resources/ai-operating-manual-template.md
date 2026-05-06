# How to Work With Me — AI Agent Operating Manual

> A portable template for telling any AI agent (Claude, ChatGPT, Cursor, etc.) how to work with you. Treat this as an **operating manual**, not a memory dump. Every line should change the agent's behavior — if it doesn't, cut it.

---

## How to use this template

1. Fill in the sections below. Keep total length under ~200 lines.
2. Save as a single `.md` file in version control (your dotfiles repo, a personal git repo, wherever).
3. Paste the relevant chunks into each tool's settings (see "Where this lives" at the bottom).
4. Review quarterly. Cut aggressively.

Sections are ordered by leverage. If you only fill in one, fill in the **Working Contract**.

---

## 1. Working Contract

> Durable behavioral rules. How you want to be communicated with. Written as imperatives. This is the highest-leverage section.

**Communication style**
- [e.g. Be succinct. Skip preamble. Don't restate my question back to me.]
- [e.g. Hold a clear POV rooted in evidence — don't hedge or reverse to match my mood.]
- [e.g. If I'm wrong, say so directly. Don't soften.]

**Format**
- [e.g. Default to prose, not bullet points, unless I ask for a list.]
- [e.g. Code blocks only for actual code or commands.]
- [e.g. No emoji unless I use one first.]

**Anti-patterns** (what NOT to do)
- [e.g. Don't qualify or sell ideas back to me.]
- [e.g. Don't apologize for things that aren't mistakes.]
- [e.g. Don't ask permission before searching when the answer needs current info — just do it.]

---

## 2. Identity & Domain

> Only the parts that change the agent's reasoning. Not your résumé.

**What I do:** [one sentence — role, focus area]

**Domains I work in:** [comma-separated list — relevant disciplines, industries, technical stacks]

**Frameworks / mental models I reference:** [e.g. Jobs-to-be-Done, first-principles, OODA, etc. — anything you'll cite by name and expect understood]

**Tools / stack I use daily:** [languages, platforms, products you'll mention without explaining]

---

## 3. Current Focus

> Active work. Rotates often. Date it.

**Last updated:** YYYY-MM-DD

- **[Project / workstream 1]:** [one-line description, current state]
- **[Project / workstream 2]:** [one-line description, current state]
- **What I'm trying to figure out:** [open questions you're chewing on]

---

## 4. Glossary

> Proper nouns and terms specific to your work. Prevents the agent from guessing.

- **[Term]:** [your specific definition]
- **[Acronym]:** [expansion + what you mean by it]
- **[Project codename]:** [what it actually refers to]

---

## 5. Examples — Good vs Bad Responses

> The single highest-impact section. Two or three pairs beats ten paragraphs of description.

**Example 1 — [topic / situation]**

❌ Bad:
> [paste an actual response style you don't want — hedging, over-explaining, missing the point, etc.]

✅ Good:
> [paste the response style you do want — concrete, in your voice]

**Example 2 — [topic / situation]**

❌ Bad:
> [...]

✅ Good:
> [...]

---

## Maintenance

**Date time-bound sections.** Current focus and project state need a "last updated" line. Working contract usually doesn't.

**Version it in git.** Diffs tell you what changed and why. Lets you roll back when an "improvement" actually made things worse.

**Quarterly prune.** Walk every line: did the agent need this last quarter? Would removing it cause a regression? Most docs grow monotonically and degrade. Fewer rules, well-followed, beat more rules, half-followed.

**One-rule rhythm:**
- Every time you correct the agent and think "I shouldn't have to say this every time" → add a line.
- Every line that's never been violated and never been used → cut a line.
- Net to zero.

---

## Where this lives (per system)

**Claude Code (CLI):**
- `~/.claude/CLAUDE.md` — global, every project. Working Contract goes here.
- `<project-root>/CLAUDE.md` — committed, team-shared. Project-specific rules.
- `<project-root>/CLAUDE.local.md` — gitignored, personal.

Claude Code walks up the directory tree and merges every `CLAUDE.md` it finds at session start.

**Claude.ai (chat app):**
- Settings → Profile → User Preferences = Working Contract.
- Projects = Domain + Current Focus per workstream.
- Styles = Format presets.

**ChatGPT:**
- Custom Instructions = Working Contract.
- Projects = Current Focus.
- Memory = slow-rotating facts.

**Cursor / Windsurf:**
- `.cursorrules` or `.cursor/rules/*.mdc` at project root.

**Generic / API:**
- Load the relevant sections as the system prompt.

---

## Common failure modes

- **Treating it as autobiography.** History and credentials don't change agent behavior. Cut them.
- **Aspirational rules.** "Be creative and thoughtful" does nothing. Concrete imperatives or anti-patterns only.
- **Set-and-forget.** A doc that hasn't been touched in a year is almost certainly wrong about your current focus and probably wrong about your style.
- **Over-modularization.** If you have to remember which file to load when, you won't. Default to one file; split only when length forces it.
- **Tool-specific syntax in the portable doc.** Keep `@imports`, YAML frontmatter, and tool conventions out of the master file. Add them when pasting into specific tools.
