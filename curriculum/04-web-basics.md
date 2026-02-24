# Module 4: Web Basics

**Goal:** The student understands the three layers of a web page — HTML, CSS, and JavaScript — and how browsers turn code into what they see on screen.
**Time:** ~30 minutes

---

## The Big Picture First

Before going into each language, give the student the 30-second overview:

Every web page is made of three layers that work together:

1. **HTML** — The structure. What's on the page and in what order.
2. **CSS** — The style. What everything looks like (colors, fonts, layout, spacing).
3. **JavaScript** — The behavior. What happens when you interact with it (clicks, animations, forms, games).

**Analogy:** "Think of building a room. HTML is the walls, floor, and furniture — the structure. CSS is the paint, carpet, and cushions — how it looks. JavaScript is the lights, TV, and thermostat — what it does when you interact with it."

You can build a webpage with just HTML. Adding CSS makes it look good. Adding JavaScript makes it do things.

---

## HTML

HTML stands for HyperText Markup Language. It uses "tags" to mark up content.

A tag looks like this: `<tagname>content</tagname>`

Walk through these core tags by having Claude build a sample page in `starter/index.html` as you explain each one:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My First Page</title>
  </head>
  <body>

    <h1>This is a big heading</h1>
    <h2>This is a smaller heading</h2>

    <p>This is a paragraph. Text lives in paragraphs.</p>

    <a href="https://example.com">This is a link</a>

    <img src="cat.jpg" alt="A photo of a cat">

    <ul>
      <li>Item one</li>
      <li>Item two</li>
      <li>Item three</li>
    </ul>

  </body>
</html>
```

Explain as you go:
- `<html>` wraps everything
- `<head>` contains info about the page (not visible to users)
- `<title>` is what shows in the browser tab
- `<body>` is everything the user actually sees
- Tags come in pairs: `<h1>` opens, `</h1>` closes (the `/` means "end")
- Indentation is just for humans to read — the browser doesn't care about it

**Have them open the file in a browser:** Right-click `index.html` in the Explorer → Reveal in Finder/Explorer → double-click the file. Their browser will open it.

Ask: "What happened? How did the browser know what to show?"

### Key HTML Insight

HTML is forgiving — if you mess up a tag, the browser often tries to render it anyway instead of crashing. This is helpful but also means bugs can be subtle.

---

## CSS

CSS stands for Cascading Style Sheets. It describes how HTML elements should look.

CSS lives in a separate `.css` file (or can be inside HTML, but separate files are better practice).

Link the CSS file inside the HTML `<head>`:
```html
<link rel="stylesheet" href="style.css">
```

Then in `style.css`, rules look like this:
```css
selector {
  property: value;
}
```

Walk through a few examples:
```css
/* This makes all h1 tags blue and centered */
h1 {
  color: blue;
  text-align: center;
}

/* This makes the body have a light gray background */
body {
  background-color: #f5f5f5;
  font-family: Arial, sans-serif;
}

/* This styles paragraphs */
p {
  font-size: 18px;
  line-height: 1.6;
  color: #333;
}
```

Have them copy this into `style.css`, save it, and refresh the browser. Watch the page transform.

**Key CSS concepts to explain:**
- The selector targets what to style (`h1`, `body`, `p`)
- Properties and values come in pairs: `color: blue`
- Hex colors like `#333` are a way of specifying exact colors (there are color pickers online)
- Pixels (`px`) and relative units (`em`, `%`) control size

**Point them to:** developer tools in Chrome (right-click anything on the page → Inspect). Show them how they can click an element and see the CSS rules applied to it. This is a superpower for debugging.

---

## JavaScript (Conceptual Only — Don't Worry About Syntax Yet)

JavaScript is the programming language of the web. It can:
- React to what the user does (clicks, typing, scrolling)
- Change the page after it loads (add/remove elements, update text)
- Talk to servers and fetch data
- Power games, animations, calculators — basically anything interactive

For this module, just help them understand *what JavaScript is for*. Syntax comes when they need it in their project.

**Show a tiny example:**
```html
<button onclick="alert('Hello! You clicked me.')">Click me</button>
```

Add this to their `index.html`, save, and refresh. Have them click the button.

Ask: "What do you think `onclick` does? What about `alert`?"

Talk through: the `onclick` attribute tells the browser "when this button is clicked, run this code." The `alert()` is a function that shows a popup.

They've just written their first JavaScript.

---

## Hands-On Exercise

**Build a simple about page:**

Have the student build a mini "about me" page in `index.html`. Guide them through:
1. A heading with their name
2. A paragraph introducing themselves
3. A short list (hobbies, favorite things, etc.)
4. A link to something (their favorite website, social profile, etc.)
5. At least 3 CSS rules styling it (color, font, background)

Let them make design choices: "Do you want the background dark or light? What color do you like for headings?"

This is a preview of what they'll build properly in Module 5.

---

## Common Confusion Points

**"Why two languages? Why not just one?"**
HTML and CSS handle different concerns. HTML is for content and structure, CSS is for appearance. Separating them means you can restyle a whole website by editing just the CSS, without touching the content.

**"The colors look off from what I expected."**
Use a [color picker](https://colorpicker.me) to find the exact hex code you want. Or ask Claude: "What's a nice shade of teal in hex?"

**"I changed the file but nothing changed in the browser."**
Remind them to save (`Cmd/Ctrl+S`) and refresh the browser (`Cmd/Ctrl+R`). This is the most common beginner mistake.

**"What is `px`?"**
Pixels. The unit of measurement for digital screens. 16px is a common default font size.

---

## Closing the Module

Ask: "What does HTML do? What does CSS do? What does JavaScript do?"

Bonus: "If you wanted to change the font color of all your headings, would you edit the HTML or the CSS?"

Once they can answer those, they're ready for the main event: Module 5.
