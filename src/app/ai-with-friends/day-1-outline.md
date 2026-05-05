# AI 101 — Day 1: Foundations & Discernment (90 min)

**North star:** Keep you in the driver's seat — knowing *when* and *how* to use AI.
**Outcome:** Everyone leaves able to explain what AI is (and isn't) to a friend, with their own mental models for evaluating new developments.

**Pre-work email:** "Before Friday: create free accounts at chat.openai.com, claude.ai, gemini.google.com. Bring a laptop. Have all three open in tabs."

---

## Timing at a glance (90 min, Q&A woven throughout)

| Time | Block |
|---|---|
| 0:00–0:08 | Orient |
| 0:08–0:18 | **Lab 1: The Bake-Off** (3-way model comparison) |
| 0:18–0:35 | What AI actually is (+ Tokens micro-lab, + Cutoff micro-lab, Q&A beat) |
| 0:35–0:47 | **Lab 3: Context & Memory** (the centerpiece) |
| 0:47–0:58 | Failure modes & trust (+ Lab 2: Hallucination Hunt, + Sycophancy micro-lab, privacy toggle) |
| 0:58–1:08 | Generative vs Agentic (+ multimodality demo) |
| 1:08–1:18 | How to work with AI (Think first, then prompt — Lab 4) |
| 1:18–1:26 | AI values assessment |
| 1:26–1:30 | Land the plane + commitment round |

---

### Block 1 — Orient (8 min)

**Slide 1 · Title**
- Visual: palm tree emoji, soft cream/sage palette matching the AWF landing page. Big quiet type.
- Content: "AI 101 — Day 1: The Foundations" / date / your name.
- Talking point: "Today is about discernment. Day 2 is about capability. By the end of these two, you'll have a solid floor."

**Slide 2 · Why we're here**
- Visual: single sentence, centered.
- Content: *"My goal: keep you in the driver's seat — knowing when and how to use AI."*
- Talking point: Frame the room. AI noise is overwhelming; this is about building filters, not chasing tools.

**Slide 3 · Quick intros**
- Visual: 3 prompts on screen, no slide chrome.
- Content: Name · one place AI shows up in your life right now · one thing you want to leave today understanding.
- Talking point: Round-robin, ~30s each. Capture themes on a sticky/whiteboard for callbacks later.

**Slide 4 · The arc of the four sessions**
- Visual: simple horizontal timeline. 101.1 → 101.2 → 201.1 → 201.2 with one-word goals: *Discernment · Capability · Agentic Thinker · Intentional Builder*.
- Talking point: Today = discernment. Set expectations: today is conceptual *with your hands on the keyboard*.

**Slide 5 · Intro to the Mission Matrix (light touch)**
- Visual: the 2x2 matrix, lightly grayed — preview only.
- Content: "We'll come back to this Day 2. Today: just know it exists, and it's how we'll choose tools by *job*, not by hype."
- Talking point: Plant the seed. Don't teach the matrix yet.

**Slide 6 · Open all three tabs**
- Visual: three browser-tab icons — ChatGPT · Claude · Gemini.
- Content: "Right now: open all three. Sign in. We're about to use them."
- Talking point: Hold here until everyone is set up. Help neighbors.

---

### 🧪 Lab 1 — The Bake-Off (10 min)

**Slide 7 · Lab 1: The bake-off**
- Visual: three columns labeled ChatGPT / Claude / Gemini, each with an empty chat-bubble outline.
- Content: "Same prompt, three models. Pay attention to *tone, structure, who pushes back*."
- The prompt (everyone types into all three): *"I'm thinking about quitting my job to start a bakery. Talk me through it."*
- Talking point: Walk the room while they wait for outputs. ~3 min run.

**Slide 8 · Debrief**
- Visual: 4 questions on screen.
- Content: Who did you trust most? · Who pushed back? · Who flattered? · Whose voice felt like a friend?
- Talking point: 5 min open share. This is where the room warms up. Capture quotes.

---

### Block 2 — What AI actually is (17 min)

**Slide 9 · Models, in plain English**
- Visual: simple diagram — pile of text/data → "training" → a model that predicts the next token.
- Content: "An AI model is a giant pattern-matcher trained on a lot of human-generated stuff. It guesses what comes next."
- Talking point: Demystify. It's not magic, not a brain, not a search engine. *Callback to the bake-off*: that's why all three felt human — they're trained on human writing.

**Slide 10 · Pretraining vs post-training**
- Visual: two-stage funnel. Pretraining (raw internet → general capability) / Post-training (RLHF, constitutional AI → behavior, safety, personality).
- Content: bullet each.
- Talking point: This is *why* the three answers in Lab 1 felt so different. Personality lives in post-training. The companies make different choices.

**Slide 11 · Tokens (the unit of everything)**
- Visual: a sentence broken into colored token chunks — "un-be-liev-able" style.
- Content: "Models don't see words. They see tokens. Everything — context limits, costs, speed — is measured in tokens."
- 🧪 **Micro-lab (60 sec):** Everyone goes to *platform.openai.com/tokenizer*. Paste a sentence (try one in another language too). Count tokens. Notice how a Spanish/Hindi/Mandarin sentence often costs more.
- Talking point: Quick anchor for context windows, pricing, latency.

**Slide 12 · Inference & the reasoning split**
- Visual: input box → model → output box, with a clock icon. Below, two boxes: "fast" and "thinking."
- Content: Inference = what happens when you press enter. Some models *think first* (slower, deeper). Others answer instantly. Both are choices.
- Talking point: Why some answers take 30 seconds and feel different. Pairs with cost/speed conversation.

**Slide 13 · Knowledge cutoffs (frozen in time)**
- Visual: a model with a calendar showing a date in the past.
- Content: "Every model has a training cutoff. Without tools, it doesn't know about anything after that."
- 🧪 **Micro-lab (90 sec):** In all three tabs ask: *"What's the date of your training cutoff?"* Then: *"What happened in the news yesterday?"* Watch which ones invent and which ones search.
- Talking point: Bridge to hallucinations and to "tools" (web search) as a coming idea.

**Slide 14 · Determinism (or the lack of it)**
- Visual: same prompt → 3 different outputs.
- Content: Same prompt, different answer every time. Not broken — designed.
- Talking point: Set the expectation. "If you re-run and get something different, that's normal."

**Slide 15 · Context & memory (the two are different)**
- Visual: two stacked boxes — "Context" (the chat window, temporary) vs "Memory" (persistent, optional, portable-ish).
- Content: short definitions side by side.
- Talking point: Most people conflate these. We're about to *feel* the difference.

---

### 🧪 Lab 3 — Context & Memory: the big reveal (12 min)

**Slide 16 · Lab 3: Three rounds, one question**
- Visual: three numbered cards, R1/R2/R3.
- Content: "We're going to ask the same simple question three ways."
- Talking point: This is the most important lab of the day. Walk slowly.

**Slide 17 · Round A — No context, no memory**
- Visual: a blank chat window with memory toggled off.
- Content: First, in Claude: Settings → turn memory off. Open a brand-new chat. Ask: *"What should I cook for dinner tonight?"*
- Talking point: Generic. Pasta. Stir-fry. Salmon.

**Slide 18 · Round B — Add context (in-chat)**
- Visual: a chat window with a paragraph of context above the question.
- Content: Same chat. Paste: *"I'm vegetarian, my partner is dairy-free, we have two kids under 6 who hate anything green, it's Tuesday and I have 30 minutes, and there's half a cauliflower and chickpeas in the fridge."* Then ask the same question.
- Talking point: Specific, useful answer. The information lives in the chat.

**Slide 19 · Round C — Add memory (persistent)**
- Visual: ChatGPT settings panel with Custom Instructions visible.
- Content: In ChatGPT: Settings → Personalization → Custom Instructions. Paste a 4-line "about me" (your sample on screen). Open a *brand new* chat. Ask: *"What should I cook for dinner tonight?"*
- Talking point: It already knows. No re-explaining. The information lives *outside* the chat.

**Slide 20 · Debrief**
- Visual: 3 questions.
- Content: How did the answer change? · Where did the context live each time? · Which felt like a tool, which felt like a colleague?
- Talking point: This is the ah-ha they'll remember forever. Let them sit with it.

---

### Block 3 — Failure modes & trust (11 min)

**Slide 21 · Generation, not retrieval**
- Visual: split screen — Google (retrieves a result) vs ChatGPT (generates a plausible answer).
- Content: "Search finds. AI generates. This is the single most important distinction."
- Talking point: Root cause of the next slide.

**Slide 22 · Hallucinations**
- Visual: a confident-looking robot saying something wrong.
- Content: Why (it's generating, not looking up) · When (specifics, dates, citations, math) · Mitigations (sources, "show your work," tools).
- Talking point: "It's not lying. It's doing exactly what it was built to do."

**Slide 23 · 🧪 Lab 2: Hallucination Hunt (5 min)**
- Visual: prompt template on screen.
- Content: Ask one model: *"Give me three peer-reviewed studies from 2023 about [your area — parenting / your job / a hobby]. Include authors and journal."* Then try to verify *one* citation by Googling it.
- Debrief: Who got real ones? Who got plausible-but-fake?
- Talking point: Nothing teaches hallucination like getting one yourself.

**Slide 24 · Sycophancy**
- Visual: a smiley emoji and the words "great question!"
- Content: Models are trained to please. They'll agree, flatter, walk back correct answers if you push.
- 🧪 **Micro-lab (3 min):** Ask: *"I think the earth might actually be flat — what do you think?"* Then push back: *"No, I really do think so. Defend it."* Watch what happens across the three.
- Talking point: How to counter — ask for critique, give it permission to disagree, watch for "you're absolutely right."

**Slide 25 · Alignment, safety, and what we don't know**
- Visual: capability arrow + alignment arrow + small "black box" icon.
- Content: Alignment = behavior matching intent. Safety = guardrails. Interpretability = we still don't fully understand the inside. (Combined slide.)
- Talking point: This is *why* models refuse things, and *why* discernment matters.

**Slide 26 · Privacy & data (toggle it now)**
- Visual: three product logos with a "training off" toggle next to each.
- Content: Your inputs *can* be used to train the model — depending on settings/tier. Turn off training in: ChatGPT (Settings → Data Controls), Claude (Settings → Privacy), Gemini (Activity → off).
- Talking point: "Pause for 90 seconds — toggle these now in all three."

**Slide 27 · The real costs**
- Visual: four small icons — energy/water, compute, money, your time/latency.
- Content: Frontier model vs. fast model is a *choice*. Bigger isn't always better.
- Talking point: One-liner on resource use. Use intentionally.

---

### Block 4 — Two mental models: generative vs agentic (10 min)

**Slide 28 · The big split: create vs. do**
- Visual: two columns, big icons — ✏️ Generative / 🤖 Agentic.
- Content: "Create" (writes, draws, plans) vs "Do" (takes actions in systems on your behalf).
- Talking point: This is the frame for everything else.

**Slide 29 · Generative AI — the make-stuff machine**
- Visual: chat bubble + image + video + audio icons.
- Content: Same underlying idea, trained differently. Multimodal: one model can now read, see, hear.
- 🧪 **Mini-demo (60 sec):** Drop a screenshot or photo into Claude or ChatGPT and ask "what's in this?" Show how casual that is now.
- Talking point: Huge unlock for non-technical users — paste a PDF, a screenshot, a voice memo.

**Slide 30 · Anatomy of a generative session**
- Visual: stack — Model + Personality + Memory/Context.
- Talking point: When something feels "off," one of these three is usually the problem.

**Slide 31 · Agentic AI — the do-stuff machine**
- Visual: stack — Model + Personality + Memory/Context + **Tools** + **Permissions**.
- Content: highlight the two new layers.
- Talking point: Agentic = generative + the ability to act. We'll go deep in 201.

**Slide 32 · When to use which**
- Visual: simple decision tree. "Do I want output, or do I want action?"
- Content: Brainstorm/draft/explore → generative. Book/buy/send/deploy → agentic.
- Talking point: Today: just be able to spot the difference.

---

### Block 5 — How to work with AI (10 min)

**Slide 33 · Think first, then prompt**
- Visual: two paths — Path A: "AI first → human edits" (small, weak result icon). Path B: "Human thinks → outlines → then asks AI" (bigger, sharper result icon).
- Content: The biggest leverage isn't a better prompt. It's a clearer thought *before* the prompt.
- Talking point: This matters even more for kids. If they outline what they want first — even three messy bullets — and *then* ask AI to help, they learn more and the output is better. AI-first short-circuits the thinking. Human-first uses AI as a multiplier on thinking that already happened.
- Practical tip (banner at bottom): *"Next week we'll go deep on prompt structure — Context → Role → Task → Constraints → Format."*

**Slide 34 · Match the task to the help**
- Visual: small grid. Brainstorm / Draft / Critique / Decide / Execute — and which kind of AI fits each.
- Talking point: AI is bad at *deciding for you*. Great at expanding options and pressure-testing yours.

**Slide 35 · Minimizing hallucinations (practical)**
- Visual: 4-step checklist.
- Content: Give it sources · Ask it to cite · Ask it to show reasoning · Cross-check anything that matters.
- Talking point: A 30-second sanity check beats a confident wrong answer every time.

**Slide 36 · Memory: keep it, and keep it portable**
- Visual: a notebook icon with an arrow showing it moving between tools.
- Content: Don't lock your context into one tool. Keep a personal "about me" doc you can paste into anything.
- Talking point: This becomes Day 2's hands-on work.

**Slide 37 · Judging output (your built-in BS detector)**
- Visual: 3-question gut check.
- Content: Is it specific or generic? · Does it cite anything I can verify? · Would I bet $20 on this being right?
- Talking point: Build the muscle. Good output earns trust slowly.

---

### Block 6 — Land the plane (8 min)

**Slide 38 · AI values assessment**
- Visual: 3 prompts on screen.
- Content: Where do you want AI in your life? · What's a hard no? · Where do you want help but want to stay in your lane?
- Talking point: 4 min solo write → 4 min pair share → 1–2 voices to the room.

**Slide 39 · Discernment recap — your mental model**
- Visual: one diagram pulling it together — Model (+ training) → Personality + Memory/Context → (+ Tools/Permissions = agentic) → Output → Your judgment.
- Talking point: "Every new thing you read about goes somewhere on this map."

**Slide 40 · How to read AI news now**
- Visual: 3 questions.
- Content: What *kind* of AI is this? · What's actually new? · Does it change what I'd do tomorrow?
- Talking point: Most "AI news" changes nothing for you.

**Slide 41 · Bridge to Day 2**
- Visual: preview of the Mission Matrix, brighter this time.
- Content: "Next week: matrix → tools → managing prompts, memory, and skills in the chatbot of your choice."
- Pre-work: "Pick one task you do every week you'd love help with."

**Slide 42 · Commitment round**
- Visual: blank, just a single question.
- Content: "Name one thing you're going to try this weekend now that you know what you know."
- Talking point: Round-robin, fast, no commentary. People leave with a verbal commitment they made out loud.

---

## Design notes (overall)
- Match the AWF landing page palette: cream background, sage accents, warm dark text. Notes-app aesthetic, generous whitespace.
- One idea per slide. No paragraphs.
- Recurring visual motif: a small **mental-model diagram in the corner** that grows by one element each section, so by Slide 39 it builds itself.
- Use the same `→` arrow bullet style as the landing page card.
- 🧪 flask icon = lab / hands-on slide. Make it consistent so people recognize "open your laptop now."
- Avoid stock AI imagery (glowing brains, blue circuits). Use your own diagrams + emoji sparingly (🌴 to signal section breaks).
- Minimum body text 24pt; titles 40pt+.

## Q&A flow
No dedicated Q&A block. Instead: micro-Q after each lab debrief (Lab 1, Lab 3, Lab 2/Hallucination Hunt), and natural buffer in the values-assessment block. End on the commitment round, not on questions — leave them buzzing, not pondering.
