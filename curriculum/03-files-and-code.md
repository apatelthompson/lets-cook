# Module 3: Files, Code & Repos

**Goal:** The student understands how code is organized into files and folders, what a repository is, and has a working mental model of Git.
**Time:** ~20 minutes

---

## Concepts to Cover

### What is Code?

At its most basic: code is instructions written in a language a computer can understand. When you write code, you're writing a recipe. The computer follows it exactly.

Unlike a person who can interpret vague instructions, computers do exactly what you say — no more, no less. This is why bugs happen: you told the computer something subtly wrong.

**Analogy:** "Code is like writing IKEA assembly instructions. You have to be precise, or the bookshelf falls apart — but the computer won't just 'figure out what you meant.'"

### Files and Their Extensions

Every piece of code lives in a file. The file extension (the part after the dot) tells the computer and your editor what type of file it is and how to treat it.

Common extensions they'll see:

| Extension | What it is |
|-----------|------------|
| `.html` | Web page structure |
| `.css` | Web page styles |
| `.js` | JavaScript (web page behavior) |
| `.md` | Markdown (text with formatting — like this file) |
| `.json` | Data in a structured format |
| `.txt` | Plain text |

**Key point:** The extension isn't magic decoration — changing `.html` to `.txt` would break things because the computer would no longer know how to interpret it.

### Folders and Project Structure

Code projects are organized into folders (also called "directories"). Folders are used to:
- Group related files together
- Separate different concerns (styles in one folder, images in another)
- Make large projects navigable

A well-organized project feels like a tidy filing cabinet. A disorganized one feels like a drawer you dump everything into.

**Show them this project's structure:**
```
zero-to-builder/
├── CLAUDE.md           ← Instructor guide (for Claude)
├── README.md           ← How to use this program
├── curriculum/         ← All the lesson plans
│   ├── 01-your-ide.md
│   ├── 02-claude-code.md
│   └── ...
└── starter/            ← Where they'll build their app
```

Ask: "Why do you think the lesson files are in a `curriculum` folder instead of just dumped in the root?"

Answer they should arrive at: organization — grouping related things.

### What is a Repository?

A repository ("repo" for short) is just a project folder that Git is tracking.

Git is a tool that:
- **Tracks every change** you make to your code over time
- Lets you **go back in time** if you break something
- Lets multiple people **work on the same project** without overwriting each other

Think of Git like Google Docs version history — except instead of auto-saving every few seconds, you choose when to take a "snapshot" by making a **commit**.

**Analogy:** "Git is like checkpoints in a video game. You can always load your last save if you mess something up."

### Key Git Concepts (Keep It Simple)

Introduce only these three concepts — don't go deeper yet:

**Commit:** A snapshot of your project at a point in time. You give it a short message describing what changed ("Added the header section"). Think of it as pressing Save + leaving a sticky note about what you did.

**Repository:** Your project + its entire history of commits.

**GitHub:** A website where you can store your repository online. It's like Google Drive, but for code. It's also how most teams share code, and how you can share your project with others.

Tell the student: "In this program, we'll touch Git enough to get comfortable with the idea. We'll go deeper in the bonus module."

---

## Hands-On Exercise

**Exercise 1: Look at a file and identify the parts**
Have the student open `starter/hello.html` (if it was created in Module 2, or create it now). Ask:
- "What type of file is this?" (HTML)
- "What do you think the code inside it is telling the browser to do?"

**Exercise 2: Create a new file**
Have the student right-click the `starter` folder in the Explorer → New File → name it `style.css`.

Ask: "What do you think this file will be used for based on its extension?"

Leave it empty for now — they'll fill it in Module 4.

**Exercise 3: Rename a file**
Have them right-click `hello.html` and rename it to `index.html`.

Explain: "The main page of almost every website is called `index.html`. It's a convention — a rule that developers follow by tradition rather than law."

---

## Common Confusion Points

**"What's the difference between saving a file and making a commit?"**
Saving a file writes it to your disk (always do this). A commit is a Git snapshot of the whole project at that moment. Both are important, they're just at different scales.

**"Do I have to use Git?"**
For this program, not right away — but you'll want it for anything real. We'll introduce it properly in the bonus module.

**"What's the difference between a folder and a directory?"**
They're the same thing. "Directory" is the older, more technical term. "Folder" is what your operating system shows you. Use whichever feels natural.

---

## Closing the Module

Ask: "What's the file extension for a web page? What does Git do? What's the difference between a file and a commit?"

If they can answer those (even loosely), they're ready for Module 4.
