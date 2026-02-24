# Module 2: Claude Code & AI Pair Programming

**Goal:** The student understands how Claude Code works, how to use it effectively, and the right mental model for AI-assisted coding.
**Time:** ~20 minutes

---

## Concepts to Cover

### What is Claude Code?

Claude Code is an AI that lives in your editor and can read your code, write code, explain things, fix bugs, and answer questions — all in context. It's not a search engine. It's more like a senior developer sitting next to you.

**Key distinction to make:** Claude Code is different from ChatGPT or Claude.ai in a browser. Claude Code has access to your actual files and project. It can see what you're working on, read the code, make edits, run commands, and keep track of what's been built.

**Analogy:** "Think of me like a very patient tutor who can also type. You tell me what you want to build, I help you figure out how, and we do it together."

### The Right Mental Model

Many beginners either:
- Don't trust AI enough (don't ask, don't copy suggestions)
- Trust AI too much (accept everything without reading or understanding)

The right approach is in the middle: **use AI as a collaborator, not a magic button.**

Teach this mental model:

1. **You decide what to build.** Claude helps you figure out how.
2. **Always read what Claude writes before accepting it.** Understanding it doesn't have to happen immediately — but looking at it is non-negotiable.
3. **Ask "why" constantly.** If Claude writes code, ask "can you explain what this does?" You should understand your own project.
4. **Claude makes mistakes.** It can misunderstand, write something that doesn't work, or do something subtly wrong. You'll catch these better over time.
5. **You're the driver.** Claude is the navigator. The car goes where you steer it.

### How to Ask Good Questions

The quality of what you get from Claude directly depends on how you ask. Teach this pattern:

**Less effective:**
> "Make it look better"

**More effective:**
> "The heading on my page is white text on a white background — I can't read it. Can you make the heading dark blue and add some spacing above and below it?"

The pattern is: **What's the situation + What's the problem + What you want.**

**Other good question patterns:**
- "Why did this code stop working after I changed X?"
- "Can you explain what this block of code does line by line?"
- "What are my options for doing X, and what are the trade-offs?"
- "Is there a simpler way to do this?"

---

## Hands-On Exercise

Do this live with the student:

**Exercise 1: Ask for an explanation**
Have them find the `README.md` file and ask Claude: "Can you read the README file in this project and summarize what this program is about in 2 sentences?"

This demonstrates that Claude can read files in context.

**Exercise 2: Ask Claude to do something, then ask why**
Have the student say: "Create a file called `hello.html` in the starter folder and put a simple 'Hello, world' heading in it."

After Claude does it, have the student ask: "Can you explain each line of the code you just wrote?"

**Exercise 3: Make a mistake on purpose**
Have the student open `hello.html` and delete the closing `</h1>` tag (just that part), then ask Claude: "I changed something in hello.html and now I think I broke it — can you look at it and tell me what's wrong?"

This teaches: Claude can debug. And bugs aren't catastrophes.

---

## Best Practices to Share

**Do these:**
- Be specific about what you want
- Ask follow-up questions when something isn't clear
- Ask Claude to explain code you didn't write
- Tell Claude when something didn't work (paste the error message!)

**Avoid these:**
- Accepting code without glancing at it
- Saying "it's broken" without describing what happened or what you expected
- Asking one giant question that covers five things at once — break it up

---

## Claude Code's Limits

Be honest with the student:

- Claude can't access the internet in real time (unless given specific tools)
- Claude can write code that looks right but has a bug — always test what it produces
- Claude works best when you give it context ("here's what I'm trying to do" + "here's what's happening")
- If Claude does something you didn't want, just say "undo that" or hit Ctrl+Z — nothing is permanent

---

## Closing the Module

Ask: "If Claude writes 10 lines of code you didn't write, what's the first thing you should do?"

Answer they should give: Read it (and maybe ask what it does).

If they get it, move to Module 3.
