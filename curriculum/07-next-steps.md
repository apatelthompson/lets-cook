# Bonus Module: What's Next

**Goal:** Send the student off with a clear picture of where to go from here and real resources to keep learning.
**Time:** Open-ended

---

## The Context to Set

They've just done something real. They built an app. They deployed it. That puts them ahead of most people who say "I want to learn to code someday."

But they also know enough to know they've just started. That's a healthy place to be.

This module is about giving them a map — not teaching them everything, just pointing at the territory ahead so they can navigate on their own.

---

## Concept 1: Git — For Real This Time

In Module 3, we gave them the idea. Now help them actually set it up.

**Three commands they should know:**

```bash
git init              # Start tracking a project with Git
git add .             # Stage all changes for a commit
git commit -m "message"  # Save a snapshot with a description
```

**And two more for working with GitHub:**
```bash
git push              # Upload your commits to GitHub
git pull              # Download the latest changes
```

**Have them do this:**
1. Open the terminal in Cursor
2. Navigate to their `starter` folder: `cd starter`
3. Run `git init`
4. Run `git add .`
5. Run `git commit -m "First commit — my first app"`

Tell them: "You now have version history. Every future change you commit is saved forever."

**Setting up GitHub:**
1. Go to [github.com](https://github.com) and create an account if they don't have one
2. Create a new repository (the green "New" button)
3. Follow GitHub's instructions to push their local repo up

---

## Concept 2: JavaScript — Going Deeper

They've seen JavaScript work. Here's what's actually in JavaScript that makes it powerful:

**Variables:** storing data
```javascript
let name = "Alex";
const score = 0;
```

**Functions:** reusable blocks of code
```javascript
function greet(name) {
  return "Hello, " + name + "!";
}
```

**If/else:** making decisions
```javascript
if (score > 10) {
  console.log("You win!");
} else {
  console.log("Keep trying.");
}
```

**Loops:** doing things repeatedly
```javascript
for (let i = 0; i < 5; i++) {
  console.log("Number: " + i);
}
```

**Events:** responding to what the user does
```javascript
document.getElementById("myButton").addEventListener("click", function() {
  alert("Clicked!");
});
```

Tell them: "If you practice these five concepts — variables, functions, if/else, loops, events — you'll be able to build almost anything interactive on the web."

---

## Concept 3: Testing

What is a test? It's code that checks other code.

Example: If you have a function that adds two numbers, a test would call that function with `2` and `3` and verify the result is `5`. If someone later breaks that function, the test tells you immediately.

For beginners, the most important thing isn't writing formal tests yet — it's developing the habit of checking your own work:
- Does the thing you added actually work?
- Did adding it break anything else?
- What happens if the user does something unexpected?

Tell them: "The developer reflex you want to build is: 'I changed X — let me check that X works and that Y still works too.'"

When they're ready for formal testing, look into: **Jest** (for JavaScript) and **Playwright** (for testing websites end-to-end).

---

## Concept 4: Debugging

Debugging is finding and fixing bugs. Every developer spends a significant part of their time doing this.

**The debugging mindset:**
- A bug isn't a sign of failure. It's information.
- Read the error message. It usually tells you exactly what went wrong and where.
- Reproduce it first — understand what triggers it before you try to fix it.
- Change one thing at a time. If you change three things and the bug disappears, you don't know which fix worked.
- If you're stuck, explain the problem out loud to someone (or to Claude). Often the act of explaining reveals the answer.

**Tools to use:**
- `console.log()` — print values to the browser console to see what your code is doing
- Browser DevTools (F12 or right-click → Inspect) — see errors in real time, inspect elements, test CSS live
- Claude Code — paste an error message and ask "what does this mean and how do I fix it?"

---

## Learning Resources

Give them these concrete resources to continue:

**Free interactive courses:**
- [freeCodeCamp.org](https://freecodecamp.org) — HTML, CSS, JavaScript, and much more. Very beginner friendly.
- [The Odin Project](https://theodinproject.com) — More structured, project-based curriculum. Excellent.
- [javascript.info](https://javascript.info) — The best JavaScript reference/tutorial on the internet.

**For going further:**
- Learn a framework: **React** is the most popular way to build complex web apps. Once comfortable with HTML/CSS/JS, React is the natural next step.
- Learn backend basics: **Node.js** lets you run JavaScript on a server.
- Learn a database: **Supabase** or **Firebase** are beginner-friendly databases with free tiers.

**Build more things:**
The best way to keep learning is to keep building. When you have an idea — even a small one — try to build it. Every project teaches you something the tutorials can't.

---

## What They Can Say They Know Now

This is worth stating explicitly — they often don't realize what they've learned:

- How to use a professional code editor (Cursor/VS Code)
- How to work with an AI coding assistant effectively
- How code is organized into files and projects
- The basics of HTML structure, CSS styling, and JavaScript behavior
- How to build a complete web page from scratch
- How to deploy to the internet
- The conceptual foundations of Git and version control
- What testing and debugging are and why they matter

That's not nothing. That's a real foundation.

---

## Closing Words

Tell them something like:

> "You came in not knowing what an IDE was and you're leaving with a live app. The distance between 'I want to learn to code' and 'I built something and put it on the internet' — you just crossed it.
>
> Keep building. The second project is easier than the first. The tenth is easier than the second. You've got this."
