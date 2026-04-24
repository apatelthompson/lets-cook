"""
Build the 'Map the meaning' booklet — Step 1 of the Mission Matrix.

Output: /Users/avnipatelthompson/Projects/lets-cook/public/downloads/map-the-meaning.pdf

Booklet is both printable (visible lines / spaces for handwriting) AND fillable
(AcroForm text fields overlaid on the same lines, so Preview / Acrobat / Reader
all let you type directly in).
"""

from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.colors import HexColor, Color
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

PAGE_W, PAGE_H = LETTER  # 612 x 792 pts

# ─── palette (matches the site) ────────────────────────────────────────
CREAM       = HexColor("#f6f3ec")
CARD        = HexColor("#fcfaf5")
INK         = HexColor("#101b0b")
MUTED       = HexColor("#6b6558")
RULE        = HexColor("#e5ddd3")
GREEN       = HexColor("#435e35")
GREEN_SOFT  = HexColor("#699963")

# quadrant colors (match mission-matrix.css + user's provided image)
GROWTH_BG   = HexColor("#e9e4f7")  # purple, high meaning / low expertise
GROWTH_INK  = HexColor("#2e1f5e")
CRAFT_BG    = HexColor("#d9ebd8")  # green,  high meaning / high expertise
CRAFT_INK   = HexColor("#1e3d1a")
ROUTINE_BG  = HexColor("#ffe3cc")  # orange, low meaning / low expertise
ROUTINE_INK = HexColor("#6b3a10")
DRAIN_BG    = HexColor("#d7ebf5")  # blue,   low meaning / high expertise
DRAIN_INK   = HexColor("#1a3a52")

# ─── fonts ────────────────────────────────────────────────────────────
# Try Recoleta + AirbnbCereal from the repo; fall back to Times / Helvetica.
FONTS_DIR = "/Users/avnipatelthompson/Projects/lets-cook/public/fonts"
import os

def _try_register(name, filename):
    path = os.path.join(FONTS_DIR, filename)
    if os.path.exists(path):
        try:
            pdfmetrics.registerFont(TTFont(name, path))
            return True
        except Exception:
            return False
    return False

SERIF_BOLD = "Times-Bold"
SERIF_REG  = "Times-Roman"
SANS_REG   = "Helvetica"
SANS_MED   = "Helvetica"
SANS_BOLD  = "Helvetica-Bold"

if _try_register("Recoleta-Bold", "Recoleta-Bold.otf"):
    SERIF_BOLD = "Recoleta-Bold"
if _try_register("Recoleta-SemiBold", "Recoleta-SemiBold.otf"):
    SERIF_REG = "Recoleta-SemiBold"
if _try_register("AirbnbCereal", "AirbnbCerealBook.ttf"):
    SANS_REG = "AirbnbCereal"
if _try_register("AirbnbCereal-Medium", "AirbnbCerealMedium.ttf"):
    SANS_MED = "AirbnbCereal-Medium"
if _try_register("AirbnbCereal-Bold", "AirbnbCerealBold.ttf"):
    SANS_BOLD = "AirbnbCereal-Bold"

# AcroForm fields only accept the standard 14 PDF fonts, so we lock form-field
# rendering to Helvetica regardless of what display fonts we registered above.
FORM_FONT       = "Helvetica"
FORM_FONT_BOLD  = "Helvetica-Bold"

# ─── helpers ──────────────────────────────────────────────────────────

def fill_page_bg(c):
    c.setFillColor(CREAM)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)

def page_header(c, page_num, total, title_small=None):
    """Small brand mark + page counter in the top margin."""
    c.setFillColor(MUTED)
    c.setFont(SANS_MED, 9)
    c.drawString(54, PAGE_H - 42, "THIS BEAUTIFUL CHAOS")
    c.drawRightString(PAGE_W - 54, PAGE_H - 42, f"{page_num} / {total}")
    if title_small:
        c.setFillColor(MUTED)
        c.setFont(SANS_MED, 9)
        c.drawCentredString(PAGE_W / 2, PAGE_H - 42, title_small.upper())

def page_footer(c, label):
    c.setFillColor(MUTED)
    c.setFont(SANS_REG, 8.5)
    c.drawCentredString(PAGE_W / 2, 30, label)

def section_eyebrow(c, x, y, text, color=GREEN):
    c.setFillColor(color)
    c.setFont(SANS_BOLD, 10)
    # letter-spaced uppercase via manual spacing
    c.drawString(x, y, text.upper())

def draw_text_field(c, name, x, y, w, h, font=None, font_size=11, value=""):
    """A fillable AcroForm text field that sits ON a printed line.
    Field is transparent so the printed line still shows through."""
    c.acroForm.textfield(
        name=name,
        tooltip=name.replace("_", " "),
        x=x, y=y, width=w, height=h,
        borderStyle="underlined",
        borderWidth=0,
        borderColor=Color(0, 0, 0, 0),
        fillColor=Color(0, 0, 0, 0),
        textColor=INK,
        forceBorder=False,
        fontName=FORM_FONT,
        fontSize=font_size,
        value=value,
        maxlen=0,
    )

def draw_textarea_field(c, name, x, y, w, h, font=None, font_size=10):
    """Multi-line fillable text area for the quadrants + reflection."""
    c.acroForm.textfield(
        name=name,
        tooltip=name.replace("_", " "),
        x=x, y=y, width=w, height=h,
        borderStyle="solid",
        borderWidth=0,
        borderColor=Color(0, 0, 0, 0),
        fillColor=Color(0, 0, 0, 0),
        textColor=INK,
        forceBorder=False,
        fontName=FORM_FONT,
        fontSize=font_size,
        fieldFlags="multiline",
        maxlen=0,
    )

def writing_line(c, x, y, w, color=None):
    c.setStrokeColor(color or HexColor("#c9c2b3"))
    c.setLineWidth(0.5)
    c.line(x, y, x + w, y)

def draw_wrapped(c, text, x, y, max_w, font, size, leading, color=INK):
    """Very simple word-wrap for body paragraphs."""
    c.setFillColor(color)
    c.setFont(font, size)
    words = text.split()
    line = ""
    for w in words:
        test = (line + " " + w).strip()
        if c.stringWidth(test, font, size) <= max_w:
            line = test
        else:
            c.drawString(x, y, line)
            y -= leading
            line = w
    if line:
        c.drawString(x, y, line)
        y -= leading
    return y

# ─── page 1: cover ─────────────────────────────────────────────────────

TOTAL_PAGES = 6

def page_cover(c):
    fill_page_bg(c)
    page_header(c, 1, TOTAL_PAGES)

    # eyebrow
    c.setFillColor(GREEN)
    c.setFont(SANS_BOLD, 11)
    c.drawString(54, PAGE_H - 130, "THE MISSION MATRIX · STEP 1")

    # huge title
    c.setFillColor(GREEN)
    c.setFont(SERIF_BOLD, 62)
    c.drawString(54, PAGE_H - 200, "Map the")
    c.drawString(54, PAGE_H - 260, "meaning.")

    # subtitle
    c.setFillColor(INK)
    c.setFont(SANS_REG, 14)
    y = PAGE_H - 310
    y = draw_wrapped(
        c,
        "Start where the work actually lives. Before any conversation about "
        "AI tools, spend a gentle twenty minutes with the things on your "
        "plate — where meaning shows up, and where your real expertise lives.",
        54, y, PAGE_W - 108, SANS_REG, 14, 20, INK,
    )

    # two ways card
    card_y = 200
    card_h = 210
    c.setFillColor(CARD)
    c.setStrokeColor(RULE)
    c.setLineWidth(1)
    c.roundRect(54, card_y, PAGE_W - 108, card_h, 14, stroke=1, fill=1)

    c.setFillColor(GREEN)
    c.setFont(SANS_BOLD, 10)
    c.drawString(74, card_y + card_h - 28, "TWO WAYS TO USE THIS")

    # col 1 — print
    c.setFillColor(INK)
    c.setFont(SERIF_BOLD, 18)
    c.drawString(74, card_y + card_h - 64, "1 · Print it")
    c.setFillColor(INK)
    c.setFont(SANS_REG, 11)
    draw_wrapped(
        c,
        "Print this booklet, grab a pen, and work through it slowly. "
        "The lines and boxes are sized for handwriting.",
        74, card_y + card_h - 88, (PAGE_W - 108) / 2 - 24,
        SANS_REG, 11, 15, INK,
    )

    # divider
    c.setStrokeColor(RULE)
    c.line(PAGE_W / 2, card_y + 24, PAGE_W / 2, card_y + card_h - 24)

    # col 2 — fill
    c.setFillColor(INK)
    c.setFont(SERIF_BOLD, 18)
    c.drawString(PAGE_W / 2 + 20, card_y + card_h - 64, "2 · Fill it")
    c.setFillColor(INK)
    c.setFont(SANS_REG, 11)
    draw_wrapped(
        c,
        "Open in Preview, Acrobat, or any PDF reader. Every line and box is "
        "a typeable field — tab through and download when done.",
        PAGE_W / 2 + 20, card_y + card_h - 88, (PAGE_W - 108) / 2 - 24,
        SANS_REG, 11, 15, INK,
    )

    # bottom tag
    c.setFillColor(MUTED)
    c.setFont(SANS_REG, 10)
    c.drawString(54, 100, "~20 minutes · pen or keyboard · just for you, first")

    c.setFillColor(INK)
    c.setFont(SANS_BOLD, 11)
    c.drawString(54, 64, "Your name")
    writing_line(c, 140, 60, 220)
    draw_text_field(c, "your_name", 140, 56, 220, 16, SANS_REG, 11)

    c.setFillColor(INK)
    c.setFont(SANS_BOLD, 11)
    c.drawString(380, 64, "Date")
    writing_line(c, 420, 60, 130)
    draw_text_field(c, "date", 420, 56, 130, 16, SANS_REG, 11)

    c.showPage()


# ─── page 2: how it works ──────────────────────────────────────────────

def page_how_it_works(c):
    fill_page_bg(c)
    page_header(c, 2, TOTAL_PAGES, "how it works")

    c.setFillColor(GREEN)
    c.setFont(SANS_BOLD, 11)
    c.drawString(54, PAGE_H - 100, "HOW IT WORKS")

    c.setFillColor(GREEN)
    c.setFont(SERIF_BOLD, 34)
    c.drawString(54, PAGE_H - 150, "Define and engage")
    c.drawString(54, PAGE_H - 186, "with your lines.")

    c.setFillColor(INK)
    c.setFont(SANS_REG, 13)
    draw_wrapped(
        c,
        "The uncertainty around AI won't resolve itself from the outside, "
        "or by waiting for \u201Cthings to settle.\u201D But we can learn to "
        "navigate it with intention and purpose. This exercise was designed "
        "to help you build your intuition and draw your boundaries, rooted "
        "in your values and expertise.",
        54, PAGE_H - 220, PAGE_W - 108, SANS_REG, 13, 18, INK,
    )

    steps = [
        ("A", "Brain dump",
         "List the work that's actually on your plate — meetings, projects, "
         "recurring tasks, the things that keep showing up. Start with 7; "
         "add more if you feel it."),
        ("B", "Rate each item",
         "Two honest scores per item: how meaningful the work is to you or "
         "your org (1–5), and how much expertise it requires (1–5) — often "
         "from lived experience."),
        ("C", "Plot onto the 2×2",
         "Place each item into one of four quadrants: Your growth edge, "
         "Your core craft, Routine tasks, or Skilled but draining."),
    ]

    y = PAGE_H - 360
    for letter, title, body in steps:
        # letter badge
        c.setFillColor(GREEN)
        c.circle(74, y + 10, 20, stroke=0, fill=1)
        c.setFillColor(CARD)
        c.setFont(SERIF_BOLD, 20)
        c.drawCentredString(74, y + 3, letter)

        c.setFillColor(INK)
        c.setFont(SERIF_BOLD, 22)
        c.drawString(112, y + 12, title)

        c.setFillColor(INK)
        c.setFont(SANS_REG, 12)
        draw_wrapped(c, body, 112, y - 10, PAGE_W - 112 - 54, SANS_REG, 12, 16, INK)

        y -= 90

    # tip box
    c.setFillColor(CARD)
    c.setStrokeColor(RULE)
    c.roundRect(54, 90, PAGE_W - 108, 90, 10, stroke=1, fill=1)
    c.setFillColor(GREEN)
    c.setFont(SANS_BOLD, 10)
    c.drawString(72, 152, "ONE TIP BEFORE YOU START")
    c.setFillColor(INK)
    c.setFont(SANS_REG, 11)
    draw_wrapped(
        c,
        "Answer for how the work actually feels right now — not how you think "
        "it should feel, or how it felt when you first took it on. The whole "
        "point is to see clearly, with grace.",
        72, 134, PAGE_W - 144, SANS_REG, 11, 15, INK,
    )

    c.showPage()


# ─── page 3: brain dump ────────────────────────────────────────────────

PRIMARY_ITEMS  = 7
OVERFLOW_ITEMS = 8
N_ITEMS        = PRIMARY_ITEMS + OVERFLOW_ITEMS  # 15 total

def page_brain_dump(c):
    fill_page_bg(c)
    page_header(c, 3, TOTAL_PAGES, "step a · brain dump")

    c.setFillColor(GREEN)
    c.setFont(SANS_BOLD, 11)
    c.drawString(54, PAGE_H - 100, "STEP A")

    c.setFillColor(GREEN)
    c.setFont(SERIF_BOLD, 36)
    c.drawString(54, PAGE_H - 140, "What's on your plate?")

    c.setFillColor(INK)
    c.setFont(SANS_REG, 12)
    draw_wrapped(
        c,
        "Brain-dump the work you actually spend time on in a typical week or "
        "month. Projects, meetings, recurring tasks, the things that keep "
        "showing up. Start with 7. Messy is welcome — you'll rate them next.",
        54, PAGE_H - 170, PAGE_W - 108, SANS_REG, 12, 16, INK,
    )

    # — primary slots (1–7) —
    primary_top = PAGE_H - 235
    primary_h   = 34
    label_x = 54
    line_x  = 86
    line_w  = PAGE_W - 108 - 32

    for i in range(PRIMARY_ITEMS):
        y = primary_top - i * primary_h
        c.setFillColor(MUTED)
        c.setFont(SANS_BOLD, 13)
        c.drawString(label_x, y, f"{i+1:02d}")
        writing_line(c, line_x, y - 4, line_w)
        draw_text_field(
            c, f"item_{i+1}",
            line_x, y - 7, line_w, 20,
            SANS_REG, 12,
        )

    # — overflow label —
    overflow_label_y = primary_top - (PRIMARY_ITEMS - 1) * primary_h - 40
    c.setFillColor(MUTED)
    c.setFont(SANS_BOLD, 9)
    c.drawString(54, overflow_label_y, "MORE IF YOU WANT THEM")
    c.setFillColor(MUTED)
    c.setFont(SANS_REG, 10)
    c.drawString(200, overflow_label_y, "· keep going up to 15")

    # — overflow slots (8–15) —
    overflow_top = overflow_label_y - 22
    overflow_h   = 24

    for i in range(OVERFLOW_ITEMS):
        idx = PRIMARY_ITEMS + i
        y = overflow_top - i * overflow_h
        c.setFillColor(MUTED)
        c.setFont(SANS_REG, 10)
        c.drawString(label_x, y, f"{idx+1:02d}")
        writing_line(c, line_x, y - 4, line_w, color=HexColor("#d7d0c0"))
        draw_text_field(
            c, f"item_{idx+1}",
            line_x, y - 6, line_w, 16,
            SANS_REG, 10,
        )

    c.showPage()


# ─── page 4: rate each item ────────────────────────────────────────────

def page_rate(c):
    fill_page_bg(c)
    page_header(c, 4, TOTAL_PAGES, "step b · rate each item")

    c.setFillColor(GREEN)
    c.setFont(SANS_BOLD, 11)
    c.drawString(54, PAGE_H - 100, "STEP B")

    c.setFillColor(GREEN)
    c.setFont(SERIF_BOLD, 32)
    c.drawString(54, PAGE_H - 140, "Rate each item.")

    c.setFillColor(INK)
    c.setFont(SANS_REG, 12)
    draw_wrapped(
        c,
        "Two honest scores for each item. Go with your gut — this isn't a test, "
        "and there aren't right answers.",
        54, PAGE_H - 170, PAGE_W - 108, SANS_REG, 12, 16, INK,
    )

    # legend chips
    chip_y = PAGE_H - 210
    c.setFillColor(GROWTH_BG)
    c.roundRect(54, chip_y, 260, 52, 8, stroke=0, fill=1)
    c.setFillColor(GROWTH_INK)
    c.setFont(SANS_BOLD, 10)
    c.drawString(66, chip_y + 36, "MEANING (1–5)")
    c.setFont(SANS_REG, 10)
    c.drawString(66, chip_y + 20, "1 = drains me / feels empty")
    c.drawString(66, chip_y + 8, "5 = lights me up / deeply matters")

    c.setFillColor(DRAIN_BG)
    c.roundRect(PAGE_W - 54 - 260, chip_y, 260, 52, 8, stroke=0, fill=1)
    c.setFillColor(DRAIN_INK)
    c.setFont(SANS_BOLD, 10)
    c.drawString(PAGE_W - 54 - 248, chip_y + 36, "EXPERTISE (1–5)")
    c.setFont(SANS_REG, 10)
    c.drawString(PAGE_W - 54 - 248, chip_y + 20, "1 = easily teachable")
    c.drawString(PAGE_W - 54 - 248, chip_y + 8, "5 = deep invisible context and skill")

    # table
    top = PAGE_H - 290
    row_h = 22

    # col layout
    col_num_x = 54
    col_item_x = 88
    col_item_w = 320
    col_m_x = 420
    col_m_w = 60
    col_e_x = 490
    col_e_w = 60

    # header
    c.setFillColor(MUTED)
    c.setFont(SANS_BOLD, 9)
    c.drawString(col_num_x, top, "#")
    c.drawString(col_item_x, top, "ITEM")
    c.drawCentredString(col_m_x + col_m_w / 2, top, "MEANING")
    c.drawCentredString(col_e_x + col_e_w / 2, top, "EXPERTISE")

    c.setStrokeColor(RULE)
    c.line(54, top - 6, PAGE_W - 54, top - 6)

    for i in range(N_ITEMS):
        y = top - 20 - i * row_h

        c.setFillColor(MUTED)
        c.setFont(SANS_BOLD, 11)
        c.drawString(col_num_x, y, f"{i+1:02d}")

        # item line
        writing_line(c, col_item_x, y - 4, col_item_w - 10)
        draw_text_field(
            c, f"rate_item_{i+1}",
            col_item_x, y - 7, col_item_w - 10, 18,
            SANS_REG, 11,
        )

        # meaning box
        c.setStrokeColor(RULE)
        c.setLineWidth(0.7)
        c.roundRect(col_m_x + 8, y - 8, col_m_w - 16, 20, 4, stroke=1, fill=0)
        draw_text_field(
            c, f"meaning_{i+1}",
            col_m_x + 8, y - 8, col_m_w - 16, 20,
            SANS_BOLD, 12,
        )

        # expertise box
        c.roundRect(col_e_x + 8, y - 8, col_e_w - 16, 20, 4, stroke=1, fill=0)
        draw_text_field(
            c, f"expertise_{i+1}",
            col_e_x + 8, y - 8, col_e_w - 16, 20,
            SANS_BOLD, 12,
        )

    c.showPage()


# ─── page 5: plot onto the 2×2 ─────────────────────────────────────────

def page_plot(c):
    fill_page_bg(c)
    page_header(c, 5, TOTAL_PAGES, "step c · plot onto the 2×2")

    c.setFillColor(GREEN)
    c.setFont(SANS_BOLD, 11)
    c.drawString(54, PAGE_H - 100, "STEP C")

    c.setFillColor(GREEN)
    c.setFont(SERIF_BOLD, 28)
    c.drawString(54, PAGE_H - 135, "Plot onto the 2×2.")

    c.setFillColor(INK)
    c.setFont(SANS_REG, 11)
    draw_wrapped(
        c,
        "Using your ratings from Step B, place each item where it belongs. "
        "Score 4–5 = high, 1–3 = low. Trust the numbers you gave yourself.",
        54, PAGE_H - 160, PAGE_W - 108, SANS_REG, 11, 15, INK,
    )

    # 2×2 layout
    grid_x = 110
    grid_y = 150
    grid_w = PAGE_W - 110 - 54
    grid_h = PAGE_H - 150 - 220
    cell_w = grid_w / 2
    cell_h = grid_h / 2
    gap = 6

    # axis labels
    c.setFillColor(MUTED)
    c.setFont(SANS_BOLD, 9)
    # top (expertise)
    c.drawString(grid_x, grid_y + grid_h + 14, "LOW EXPERTISE")
    c.drawCentredString(grid_x + grid_w / 2, grid_y + grid_h + 14, "EXPERTISE →")
    c.drawRightString(grid_x + grid_w, grid_y + grid_h + 14, "HIGH EXPERTISE")
    # left (meaning) — rotated
    c.saveState()
    c.translate(grid_x - 20, grid_y)
    c.rotate(90)
    c.drawString(0, 0, "LOW MEANING")
    c.drawCentredString(grid_h / 2, 0, "MEANING →")
    c.drawRightString(grid_h, 0, "HIGH MEANING")
    c.restoreState()

    # quadrant cells (image layout: top-left=growth(purple), top-right=craft(green),
    # bottom-left=routine(orange), bottom-right=drain(blue))
    quads = [
        # (x, y, bg, ink, title, sub, field_name)
        (grid_x,            grid_y + cell_h + gap/2, GROWTH_BG,  GROWTH_INK,
            "Your growth edge",   "High meaning · Low expertise",  "q_growth"),
        (grid_x + cell_w + gap/2, grid_y + cell_h + gap/2, CRAFT_BG, CRAFT_INK,
            "Your core craft",    "High meaning · High expertise", "q_craft"),
        (grid_x,            grid_y, ROUTINE_BG, ROUTINE_INK,
            "Routine tasks",      "Low meaning · Low expertise",   "q_routine"),
        (grid_x + cell_w + gap/2, grid_y, DRAIN_BG, DRAIN_INK,
            "Skilled but draining","Low meaning · High expertise", "q_drain"),
    ]

    for (x, y, bg, ink, title, sub, fname) in quads:
        cw = cell_w - gap/2
        ch = cell_h - gap/2
        c.setFillColor(bg)
        # round only the outer corner of each quadrant
        c.roundRect(x, y, cw, ch, 10, stroke=0, fill=1)

        c.setFillColor(ink)
        c.setFont(SERIF_BOLD, 16)
        c.drawString(x + 14, y + ch - 26, title)
        c.setFont(SANS_REG, 9)
        c.drawString(x + 14, y + ch - 42, sub)

        # fillable text area for items in this quadrant
        pad = 14
        ta_y = y + 14
        ta_h = ch - 58
        draw_textarea_field(c, fname, x + pad, ta_y, cw - pad * 2, ta_h,
                            font=SANS_REG, font_size=10)

        # subtle writing lines inside each quadrant for the print version
        c.setStrokeColor(Color(ink.red, ink.green, ink.blue, alpha=0.22))
        c.setLineWidth(0.4)
        lines = max(3, int(ta_h / 20))
        for i in range(lines):
            ly = ta_y + ta_h - 14 - i * 20
            if ly < ta_y + 6:
                break
            c.line(x + pad, ly, x + cw - pad, ly)

    # footer hint
    c.setFillColor(MUTED)
    c.setFont(SANS_REG, 10)
    c.drawCentredString(PAGE_W / 2, 110,
        "Tip: if an item feels like it straddles two quadrants, put it where it "
        "mostly lives today — you can revisit after Step 2.")

    c.showPage()


# ─── page 6: reflect ───────────────────────────────────────────────────

def page_reflect(c):
    fill_page_bg(c)
    page_header(c, 6, TOTAL_PAGES, "reflect")

    c.setFillColor(GREEN)
    c.setFont(SANS_BOLD, 11)
    c.drawString(54, PAGE_H - 100, "NOW THAT IT'S ON THE PAGE")

    c.setFillColor(GREEN)
    c.setFont(SERIF_BOLD, 32)
    c.drawString(54, PAGE_H - 140, "What do you see?")

    prompts = [
        ("Which quadrant is most crowded — and is that a surprise?", "refl_1"),
        ("What's one item that jumped quadrants between your gut and your rating?", "refl_2"),
        ("What's something you'd love to do more of — but don't yet have the expertise for?", "refl_3"),
    ]

    y = PAGE_H - 200
    for i, (q, fname) in enumerate(prompts, start=1):
        # number
        c.setFillColor(GREEN)
        c.setFont(SANS_BOLD, 11)
        c.drawString(54, y, f"0{i}")

        # question
        c.setFillColor(INK)
        c.setFont(SERIF_BOLD, 16)
        draw_wrapped(c, q, 80, y, PAGE_W - 80 - 54, SERIF_BOLD, 16, 20, INK)

        # answer box + lines
        box_y = y - 110
        box_h = 90
        c.setFillColor(CARD)
        c.setStrokeColor(RULE)
        c.roundRect(80, box_y, PAGE_W - 80 - 54, box_h, 8, stroke=1, fill=1)
        # print lines
        for j in range(3):
            ly = box_y + box_h - 22 - j * 22
            writing_line(c, 94, ly, PAGE_W - 80 - 54 - 28)
        # fillable area
        draw_textarea_field(c, fname, 90, box_y + 8, PAGE_W - 80 - 54 - 20, box_h - 16,
                            font=SANS_REG, font_size=10)

        y -= 160

    # quiet closing line
    close_y = 90
    c.setStrokeColor(RULE)
    c.setLineWidth(0.5)
    c.line(PAGE_W / 2 - 28, close_y + 46, PAGE_W / 2 + 28, close_y + 46)

    c.setFillColor(GREEN)
    c.setFont(SANS_MED, 12)
    draw_wrapped(
        c,
        "Now you're ready to explore how AI can enable this work using "
        "different roles for each quadrant.",
        80, close_y + 28, PAGE_W - 160, SANS_MED, 12, 17, GREEN,
    )

    c.setFillColor(MUTED)
    c.setFont(SANS_REG, 9)
    c.drawCentredString(PAGE_W / 2, 38, "mission-matrix.vercel.app")

    c.showPage()


# ─── build ────────────────────────────────────────────────────────────

def build(out_path):
    c = canvas.Canvas(out_path, pagesize=LETTER)
    c.setTitle("Map the meaning — Step 1 of the Mission Matrix")
    c.setAuthor("This Beautiful Chaos")
    c.setSubject("A worksheet for plotting work by meaning and expertise.")

    page_cover(c)
    page_how_it_works(c)
    page_brain_dump(c)
    page_rate(c)
    page_plot(c)
    page_reflect(c)

    c.save()
    print(f"wrote {out_path}")


if __name__ == "__main__":
    out = "/Users/avnipatelthompson/Projects/lets-cook/public/downloads/map-the-meaning.pdf"
    build(out)
