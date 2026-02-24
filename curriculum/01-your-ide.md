# Module 1: Your Kitchen

**Goal:** The student feels at home in Cursor — they've personalized it, they know the key areas, and they're not intimidated.
**Time:** ~25 minutes
**Kitchen analogy:** Every chef sets up their kitchen before they start cooking. You don't walk into someone else's kitchen and just start — you arrange things so it feels like yours.

---

## First Thing: Make It Yours

Before explaining anything, before touching any code — have them personalize the editor.

This is intentional. It signals: this is your workspace. You have agency here. You're not just using someone else's tool, you're setting up your kitchen.

### Change Your Theme

A theme controls the colors of everything in the editor. It sounds cosmetic, but it genuinely affects how you feel while you work. Let them pick something they actually like.

**How to open the theme picker:**
- Press `Cmd+K Cmd+T` (Mac) or `Ctrl+K Ctrl+T` (Windows)
- Or: go to the gear icon (bottom left) → Color Theme

A list of themes will appear. They can arrow through them and see a live preview.

**Some themes to suggest trying:**
- `One Dark Pro` — dark background, popular for a reason, easy on the eyes
- `Dracula` — purple-tinted dark theme, very aesthetic
- `Catppuccin` — soft pastel tones, calm and readable
- `GitHub Light` — clean light theme if they prefer light mode
- `Tokyo Night` — dark and vivid, feels like working in a cyberpunk kitchen
- `Solarized Light/Dark` — warm tones, muted and comfortable for long sessions

Tell them: "There's no right answer. Pick the one that makes you feel like you want to open this app."

Give them 2–3 minutes to actually explore. Don't rush this.

### Optional: Change the Font

If they're curious, Cursor lets you change the editor font too:
- Open Settings: `Cmd+,` (Mac) or `Ctrl+,` (Windows)
- Search "font family"
- Popular choices: `Fira Code`, `JetBrains Mono`, `Cascadia Code` — these are fonts designed for code, with ligatures (little design touches where `=>` looks like an arrow)

Don't spend too long here. If they're into it, mention it. If not, move on.

---

## What is an IDE?

After they've picked their theme and the kitchen feels a bit like theirs, explain what they're actually looking at.

An IDE (Integrated Development Environment) is a code editor with superpowers. It's the difference between writing in Notepad and writing in Google Docs — both work, but one is built for the job.

Cursor is an IDE built for writing code. It has:
- Color-coding that makes code readable at a glance
- An AI assistant built right in (that's me)
- A file explorer so you can see your whole project
- A terminal — a command-line interface inside the editor
- Error detection that catches problems before you even run anything

**The kitchen analogy:**
"You could technically write code in Notepad and run it. Like you could technically cook on a camping stove. But a kitchen has everything organized, everything within reach, and tools designed for the job. That's what an IDE is."

---

## The 5 Key Areas

Walk through each area. Have them click around as you explain — don't just narrate.

**1. The Explorer Panel (left sidebar)**
- Shows all your project files and folders — your pantry
- Click a file to open it
- Right-click to create new files/folders
- Shortcut: `Cmd+B` (Mac) or `Ctrl+B` (Windows) to show/hide it

**2. The Editor (center)**
- Where you write code — the cutting board, the main workspace
- Tabs across the top show open files
- Line numbers on the left side are crucial for debugging ("the error is on line 42")

**3. The Terminal (bottom panel)**
- A command line built into the editor
- This is how you talk to your computer in text — run code, install things, deploy your app
- Open it: `Ctrl+~` (backtick) or View → Terminal
- "Scary" is a normal first reaction. It'll feel normal fast.

**4. The Chat Panel (right side)**
- This is where you talk to me (Claude Code) — your sous chef
- Open it: `Cmd+L` (Mac) or `Ctrl+L` (Windows)
- This is where most of the collaboration will happen throughout the workshop

**5. The Status Bar (very bottom)**
- Shows what type of file you're in, any errors, git status
- Mostly informational — glance at it, don't stress about it

---

## Hands-On Exercise

1. Have them open the `lets-cook` folder in Cursor if they haven't (File → Open Folder)
2. Click through the Explorer — find the `curriculum/` folder, the `starter/` folder
3. Click on `README.md` to open it in the editor
4. Open the terminal (`Ctrl+~`)
5. In the terminal, type `ls` (Mac/Linux) or `dir` (Windows) and press Enter
6. Ask: "What files do you see? Where are you in the project?"

**Check-in question:** "Can you find the terminal and tell me what three things are in the root of this project?"

---

## Key Shortcuts — Just Three for Now

Don't overwhelm. Just these, and emphasize why each one matters:

- `Cmd/Ctrl + S` — **Save.** Do this constantly. Make it a reflex. Unsaved files are the #1 source of "why isn't this working" moments.
- `Cmd/Ctrl + Z` — **Undo.** Your safety net. Nothing is permanent. Use it freely.
- `Cmd/Ctrl + P` — **Quick open.** Search for any file by name. Faster than clicking through folders.

"Save constantly. Undo liberally. Quick-open everything."

---

## Common Confusion Points

**"The terminal is scary."**
"It's just a way to talk to your computer in text instead of clicking. Like a very literal text conversation. We'll use it a lot and it'll start to feel normal by the end of today."

**"I accidentally closed a panel."**
Walk them through View menu → reopening whatever disappeared. Or the keyboard shortcuts above.

**"My layout looks different from the screenshots/demo."**
This is fine. Cursor is customizable. Different computers can have different defaults. The panels are the same, just maybe in slightly different spots.

**"I can't decide on a theme."**
"Pick whatever you'd keep open for hours without it bothering you. You can always change it later — this isn't a tattoo."

---

## Closing the Module

Ask: "What are the three main panels and what does each one do?"

If they can answer: Editor (write code), Explorer (see files), Terminal (run commands). They're ready.

Tell them: "Your kitchen is set up. Now let's meet your sous chef."

Move to Module 2.
