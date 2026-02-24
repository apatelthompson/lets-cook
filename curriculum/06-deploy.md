# Module 6: Deploy & Share

**Goal:** The student deploys their app to the internet and gets a real, shareable URL.
**Time:** ~20 minutes

---

## What is Deployment?

Deployment means moving your code from your computer to a server so anyone with internet access can see it.

Right now, their app exists only on their laptop. When they deploy, it gets uploaded to a computer that's always on and connected to the internet — a server. That's what gives them a public URL.

**Analogy:** "Your app is like a painting you made in your bedroom. It exists, it's real — but right now only you can see it. Deployment is like hanging it in a gallery where anyone can walk in."

---

## Why Netlify?

Netlify is a hosting platform that makes deploying static websites (HTML, CSS, JavaScript with no backend server) extremely easy.

Key reasons to use it here:
- Free tier is generous and requires no credit card
- Drag-and-drop deployment — literally drag a folder
- Gives an instant public URL
- Supports custom domains if they want one later

---

## Deployment Steps

### Before Starting: Check the Files

Make sure their `starter/` folder has everything:
- `index.html` (required — the main page)
- `style.css` (if they have styles)
- `script.js` (if they have JavaScript)
- `images/` folder (if they have images)

Open `index.html` in the browser one last time. Make sure it looks right. This is the last chance to catch something before it goes live.

### Step 1: Create a Netlify Account

1. Go to [netlify.com](https://netlify.com)
2. Click "Sign up" — use their GitHub account if they have one, otherwise email works fine
3. No credit card required

### Step 2: Deploy via Drag and Drop

This is the fastest method — no CLI, no GitHub needed.

1. On the Netlify dashboard, scroll down to the **"Deploy manually"** section (or look for a drag and drop zone that says "drag and drop your site folder here")
2. In Cursor's Explorer panel, find the `starter` folder
3. Right-click it → "Reveal in Finder" (Mac) or "Reveal in File Explorer" (Windows)
4. Drag that folder directly onto the Netlify drop zone in the browser

Wait a few seconds. Netlify will process and deploy it.

### Step 3: Get the URL

After deployment, Netlify shows a URL like:
`https://wonderful-johnson-abc123.netlify.app`

Have the student click it. Their app is now live on the internet.

**This is the moment.** Make it feel real:

> "That URL works for anyone on earth with internet right now. You built that. You shipped it. You're officially a builder."

### Step 4: Share It

Have them:
1. Copy the URL
2. Open it on their phone — seeing your own work on mobile for the first time is a moment
3. Share it with someone they know

---

## Optional: Rename the URL

Netlify lets you change the random subdomain to something more memorable:
1. On the Netlify dashboard, find the site
2. Click "Site settings" → "Change site name"
3. Enter something like `yourname-portfolio` or `my-quiz-game`
4. The new URL becomes `https://yourname-portfolio.netlify.app`

Walk them through this if they want.

---

## Optional: Set Up Continuous Deployment (if they have GitHub)

If the student has a GitHub account and wants future edits to deploy automatically:

1. Push their `starter` folder to a GitHub repo
2. In Netlify: "New site" → "Import from Git" → connect GitHub → select the repo
3. Set the publish directory to `starter` (or whatever their folder is called)
4. Every time they push to GitHub, Netlify rebuilds and redeploys automatically

This is a bonus — don't make it required. The drag-and-drop is enough.

---

## Making Updates

Explain that if they want to change something after deploying:
1. Edit the files in Cursor
2. Save
3. Go back to Netlify
4. Either: drag the folder again (Netlify will update the same site), or if they set up GitHub integration, just push to GitHub

**Reassure them:** Nothing about deployment is permanent in a bad way. You can always update, fix, or change things.

---

## If Something Goes Wrong

**The page is blank:**
Check that `index.html` is at the root of the folder they dragged, not inside a subfolder.

**CSS or JavaScript isn't loading:**
Make sure the `<link>` and `<script>` tags in `index.html` reference the correct file names (case-sensitive on the web — `Style.css` ≠ `style.css`).

**Images aren't showing:**
Image paths need to be relative and case-sensitive. If an image is in `images/photo.jpg`, the `src` attribute must say exactly that.

**The wrong page is showing:**
Netlify requires the main file to be named `index.html`. If it's named something else, rename it.

---

## Closing the Module

Once the URL is live and they've seen it on their phone:

"That's it. You did the whole thing — you built it and you shipped it. How do you feel?"

Let them answer. Then move to the bonus module if they want to keep going.
