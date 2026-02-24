# Module 5: Cook your dish

**Kitchen analogy:** Most recipes you cook once and forget. Some you write down, refine, and keep coming back to. Today you're writing that recipe — a personal AI assistant that knows who you are, what you're working on, and how you think. It gets better every time you use it.

**Goal:** Students build a personal OS (personal AI assistant) from scratch, and along the way experience RAG, memory, context engineering, and context rot firsthand — the concepts that underpin every AI product.

**Time:** ~60 minutes

---

## Before you start: warm up with a song

Before building, we're going to do a quick exercise that teaches exactly how agents work with files. This is important — it's the foundation for everything in the personal OS.

### The setup

1. Open a new Agent chat in Cursor. Make sure the dropdown in the chat box says **Agent** (not Ask).
2. In the file explorer, hover and click the "New File" button. Name it `lyrics.txt`.
3. Search the web for the lyrics to any song you love — Google "[song title] lyrics" usually prints the full lyrics. Copy them.
4. Back in Cursor, paste the lyrics into `lyrics.txt` and save (Cmd+S / Ctrl+S).

### The exercise

Send this prompt:

> `Change one line in the first verse and one line in the chorus of lyrics.txt to be about learning to code.`

Watch what happens. You'll see red (removed) and green (added) lines appear in the file. That's the agent modifying your file directly — not just chatting, but *taking action*. Click "Accept" if you like it, "Undo" if you don't.

### What just happened

Now ask the agent: `Walk me through every single step you took to accomplish that — every tool, every decision.`

In our test, the agent reported something like:
1. Used `read_file` to see what was in the file — it read the pantry before it started cooking
2. Thought about which lines to change
3. Used `search_replace` to modify the text — the sous chef made the edit

Don't let these tool names feel foreign. You've done "search and replace" in Microsoft Word. You've "read a file" before. The sous chef just has different names for things.

**Teaching note:** This is the black box, opened. Keep this mental model — it applies to every AI product the students will ever encounter. The magic is always: read context, reason, call a tool, get a result, reason again.

---

## Part 1: Build the structure

Now we're building the real thing.

Make sure you're in **Agent** mode. Paste this prompt:

```
Create a minimal personal productivity system with this structure:

├── Knowledge/        # Notes, research, thinking
├── Tasks/            # Action items as Markdown files
├── GOALS.md          # Goals and priorities
└── AGENTS.md         # AI assistant instructions

AGENTS.md should instruct the AI to:
- Be a productivity and thinking partner
- Never write code — only Markdown
- Keep tasks tied to goals
- Suggest max 3 daily priorities when asked
- Be direct and concise
- Ask clarifying questions before giving advice

After creating, say "Created your workspace" and then ask:
1. "What are your current goals? I'll add them to GOALS.md"
2. "What tasks are you working on? I'll create initial task files in Tasks/"
```

**Before they click "Accept":** Pause. Ask: "What do you think is about to happen?" Let them predict. The agent is about to create files and folders on their computer — this is a real action, not just a chat response.

After the agent creates the structure, ask: "What do you think AGENTS.md is going to do?" (Let them guess before you explain.)

Let the student answer the agent's follow-up questions honestly. The more real context they put in, the more useful the tool will be after today.

**Celebrate:** They just became the PM of their own AI product.

---

## Part 2: Experience RAG

Once the structure is built and GOALS.md has some content, ask the agent:

> `What's in this project? Explain it to me like I'm a non-technical person.`

Watch it work.

**What's happening (explain this):**

The agent didn't answer from memory. It *read the files first* — scanned the pantry before cooking. That's RAG.

RAG stands for Retrieval Augmented Generation, which sounds intimidating but just means: "Before I start talking, let me go look things up." You do this every day. Before answering a hard question, you Google it, check your notes, re-read the brief. Agents do the same.

Every AI product that gives answers based on *your* data — Claude Projects, Notion AI, a company's customer support bot, Perplexity — is using some form of RAG. Whether it's searching your files, querying a database, or hitting the internet, it's always the same thing: pull relevant content, then respond.

**Check-in before continuing:**

> "Before I explain what RAG stands for — can you tell me in your own words what the agent just did, and why it matters for AI products?"

Hold a high bar. If they say "it searched," ask: *what* did it search? What did it find? What did it do with that? Don't move on until they can explain the concept clearly.

---

## Part 3: Add memory with AGENTS.md

Open `AGENTS.md` in the file explorer. Read it together.

Ask the student: "This file gets added to the top of every single chat you open in Cursor. What does that mean?"

Let them sit with it. Then explain:

**Memory is just a text file.** There's no magic here. AGENTS.md is a sticky note stuck to the fridge — always visible, no matter who's cooking. Every time you open a new chat, the AI reads this note first, before anything else.

That means:
- What you put here is always in context (useful for persistent facts: who you are, how you like to work, what to never do)
- What you put here takes up space (every token in AGENTS.md is a token *not* available for your actual question)

This is why you want to be intentional. Memory isn't free.

### Customize it together

Have the student add at least one thing to AGENTS.md that's genuinely true about them. Examples:

- Who they are professionally: *"I'm a product manager at a healthcare startup"*
- How they like to work: *"Challenge my assumptions before agreeing with me"*
- A value they hold: *"Be direct — I'd rather have the hard truth than a soft answer"*
- An output preference: *"Keep everything in plain language, no bullet points"*

Ask the agent: `Update AGENTS.md to include these things about me: [their additions]`

Now open a **new** agent thread and ask something related to their goals. Notice how it behaves differently — it already knows who they are.

**Check-in:**

> "What's the difference between memory and RAG? When would you use each one?"

Good answer: Memory (AGENTS.md) is for things that are *always* relevant — who you are, how you want to work. RAG is for things that are *task-specific* — look it up when you need it, not all the time.

---

## Part 4: Context engineering

Ask the student to find a real document they're working on right now — a Google Doc, a PDF, a Notion page, meeting notes. Have them export or copy it as a `.md` or `.txt` file and drag it into the `Knowledge/` folder in Cursor.

Then ask the agent:

> `I want you to expand on the document I just added to Knowledge/. Be a thinking partner — ask me one question at a time before we get into it. Search for anything else that's relevant. Afterwards, create a task file in Tasks/ based on what we decide.`

Watch what happens. Point out:

1. The agent reads the file — RAG again
2. It searches for external context — pulling in ingredients from outside the pantry
3. It creates a task file — the output lives in the project, not just in the chat

### The countertop analogy

Now find the **token counter**. In Cursor, look for a small pie-chart or token indicator near the bottom of the chat panel. Hover over it.

This is how full the context window is. The context window is your countertop — finite space. Files, conversation history, AGENTS.md, tool results — it all takes up room. When it fills up, things start falling off the edge. The AI starts forgetting. Making mistakes. Getting confused.

That's **context rot**. Not a bug. Not a bad model. Just a full countertop. The fix: start a new chat. Don't try to cook a five-course meal on one crowded surface.

**Check-in:**

> "Imagine you're building an AI customer support bot. Name three things that might go into the context window — and for each one, would you make it memory, RAG, or something you add manually each time?"

Hold a high bar. This is synthesis — they're thinking like a PM now. If they're stuck: *customer profile, product FAQ, current conversation, company values* are all fair game. Push them to reason through the tradeoffs.

---

## Part 5: Model selection (if time allows)

Try the same prompt in two different models. Look for the model selector in the chat panel dropdown.

Ask them to run the same question — something they actually care about — in Claude Sonnet, then Gemini, then GPT-4o. Notice what's different. Not just the quality — the *approach*, the *format*, the *caveats*, the *confidence*.

The lesson: **there are only a handful of frontier models, and they're available to every team.** The model isn't the moat. How intelligently you fill the context window — and what you build on top — is.

---

## Part 6: Generate the companion page

Now we connect everything back to HTML and CSS — what they built in Module 4.

Ask the agent:

> `Based on my GOALS.md and anything relevant in my Knowledge/ folder, generate a clean, simple index.html page that represents me. Nothing fancy — a headline, a short about me, my current goals or focus, and a link or two. Something I'd be proud to share.`

Watch it write HTML. Have the student open the file in a browser.

**Point out:** The agent used their actual goals and context to write the page. It's not a generic template — it's built from the ingredients they put in. The personal OS gave the sous chef something to cook with.

This is the page they'll deploy in Module 6.

---

## Closing check-in

Before moving to deploy, run through these questions. Don't accept vague answers — this is the high-bar moment.

1. **"Explain RAG without using the acronym, like you're explaining it to a colleague."**
2. **"What's AGENTS.md actually doing? What happens if you put too much in it?"**
3. **"Context window — what fills it up, and what happens when it's full?"**
4. **"You've been using your AI as a tool today. How is that different from just using ChatGPT?"**

Then celebrate. They just:
- Built a real AI product using their own data
- Experienced the core mechanics of modern AI applications firsthand — not by reading, but by *feeling* them
- Generated a web page from it that's ready to ship

Move to Module 6.
