export const FLUENCY_PROMPT = `I want to generate my AI Fluency Index — a scorecard that evaluates how effectively I interact with AI across 11 behavioral indicators.

First, use your recent_chats and conversation_search tools to pull messages I've sent across my recent conversations. Aim for 30 days of history, or as many conversations as you can access up to 20. Pull from any surface — chat, Claude Code, Cowork.

Once you've gathered what's available, tell me:
- How many conversations you found
- The date range they cover
- Which surfaces they came from (chat, Claude Code, Cowork)

Then ask me: "Would you like to proceed with this, or do you want to add any messages before I run the assessment?"

Wait for my response before generating the scorecard.

---

When I confirm, do the following in order:

## Step 1: Generate the raw scorecard

Analyze my messages to determine each indicator's status:
- "demonstrated" ([+]) — I clearly and consistently show this skill
- "partial" ([~]) — I sometimes show this skill, or do so imperfectly
- "not-observed" ([-]) — no evidence of this skill in the messages

For every indicator marked [+] or [~], include one supporting quote taken verbatim from my messages. Keep quotes under 150 characters. Do not fabricate quotes — every quote must appear exactly as written. If a quote exceeds the limit, truncate at a word boundary.

For every indicator, include a Surfaces line listing which surfaces ([chat], [cc], [cowork]) the evidence came from, or "Surfaces: none."

Note: a single terse message can demonstrate multiple indicators at once. "ELI5" signals both audience (#2) and format (#3). "Be direct, no preamble" signals interaction style (#7). Credit each indicator a message demonstrates — do not force it into only one.

### The 11 Indicators

#### Delegation
- 0: Clarifies goals — Do I state what I'm trying to accomplish before requesting help?
- 1: Consults on approach — Do I ask which approach to take before requesting execution? (Interrogative: "what's the best way to..." / "how should I structure this?") This is about seeking a recommendation, not yet committed to a direction. Distinct from #7: #1 asks which approach, #7 directs how Claude behaves.

#### Description
- 2: Defines audience — Do I specify who the output is for?
- 3: Specifies format — Do I indicate a desired output format (table, list, email, etc.)?
- 4: Communicates tone — Do I indicate the voice, tone, or style I want?
- 5: Builds iteratively — Do I refine with follow-ups rather than accepting the first result?
- 6: Provides examples — Do I share examples to demonstrate quality expectations?
- 7: Sets interaction — Do I tell Claude how to behave, what role to adopt, or what interaction style to use? (Imperative: "no preamble", "steelman the other side first", "ask me questions before writing") This includes role-setting like "devil's advocate this."

#### Discernment
- 8: Checks facts — Do I question or verify information in AI output?
- 9: Notices reasoning — Do I push back when the AI's logic seems off? Must name a specific flaw, gap, or contradiction ("that doesn't follow," "that feels circular," "you skipped a step"). Acknowledging or praising reasoning does NOT count — that's acceptance, not scrutiny.
- 10: Recognizes context — Do I proactively share context the AI could not know?

### Raw Output Format

Output EXACTLY the three sections below — marker-delimited, nothing before or after, no code block wrapper.

--- AI Fluency Summary ---
[80–110 word summary addressed directly to me. Cover both collaboration behaviors and any product feature observations as one coherent picture. Use sentences, not bullets. Lead with my strongest demonstrated behavior, weave in one evidence quote, note which Claude features I rely on most, then close with one behavior and one feature flagged as opportunities. Encouraging and specific, not generic.]
--- End Summary ---

--- AI Fluency Scorecard ---
Name: [my name if I provided it, otherwise "User"]
Role: [my role if I provided it, otherwise "General"]

[All 11 indicators in order 0 through 10, using this format:]
[Indicator line: <id> [<symbol>] <indicator name>]
[Status symbols: [+] = demonstrated, [~] = partial, [-] = not-observed]
[After each indicator line, one indented Surfaces line: Surfaces: chat, cc — or Surfaces: none]
[For [+] or [~] indicators: one quote on its own line, indented two spaces, wrapped in double quotes]
[For [-] indicators: no quote line]
--- End Scorecard ---

--- Insights ---
Strength-Title: [4–6 word headline naming my strongest demonstrated behavior]
Strength-Body: [One sentence, under 110 chars, explaining why this behavior works well. Address me as "you."]
TryNext-Title: [4–6 word headline for one skill to build next, framed as an action]
TryNext-Body: [One sentence, under 110 chars, describing a concrete next move. Can include a short example prompt in quotes.]
Feature-Id: [One Claude feature I haven't used yet that would complement how I already work. Options: projects, memory, artifacts, research-mode, claude-code, extended-thinking, prompt-caching, batch-api. If I already use all of them, write "none."]
--- End Insights ---

---

## Step 2: Build a visual React artifact

After generating the raw scorecard above, immediately build a React artifact that renders it visually. Parse the raw output to populate the artifact — do not ask me to paste anything.

Design guidelines:
- Use a clean, refined aesthetic with intentional typography and generous spacing
- Organize into three distinct sections: Summary, Indicators, Insights
- For the Indicators section, render each of the 11 indicators as a card or row showing:
  - The indicator name and category (Delegation / Description / Discernment)
  - The status as a styled badge using only these labels: "demonstrated", "partial", or "not observed" — no symbols, no numbers, no percentages, no counts of any kind
  - The supporting quote (if present), displayed as pull-quote text
  - The surfaces, displayed as small tags
- For the Summary section, display the summary text as a featured block
- For the Insights section, display Strength and Try Next as two distinct cards with their titles and body text exactly as written — no modifications
- Do not add any numbers, scores, or metrics anywhere in the visual
- Use only the text provided in the scorecard — do not infer, generate, or embellish any content
- Color-code the status badges: a calm affirming color for "demonstrated", a neutral color for "partial", and a muted color for "not observed"
`;
