# Changelog

## [1.17.2]
- A paper's own report now ends with the ideas you jotted down while reading that paper, with their tags and page numbers. Project reports already list all ideas grouped by tag.

## [1.17.1]
- **Name your concepts, themes, methods and gaps.** When you tick Theme, Concept, Method or Gap on an idea, the pop-up asks which one, e.g. "Which concept? Risk compensation". Names you have used before, and the themes, concepts and methods you tagged in your notes, appear as buttons to pick with one click.
- On the Ideas page, choosing a type (e.g. Concept) shows its names as a second row of filters, so you can see every idea about "Risk compensation" together. Reports and the Write panel group ideas the same way.
- Fixed: pressing the space bar right after opening the idea pop-up could open it a second time.

## [1.17.0]
- **Ideas.** An **Idea** button on the note page (and on the PDF selection bar) opens a small pop-up. Type the thought, tick tags (Theme, Concept, Method, Gap, Doubt, Curious, Question, To do, or your own), and Save. The pop-up closes and the idea is stored with a citation to the paper you are reading, including the page shown in the reader. Next time it opens empty. Tick "no source" for your own ideas.
- **Ideas page** in the side menu: every idea from every paper in one place. Filter by tag or project, search, click a citation to open the paper, or edit and delete ideas.
- **Write → Your notes → Ideas** inserts an idea with its citation; the paper is added to the reference list.
- Project reports include your ideas grouped by tag.

## [1.16.4]
- **Toolbars stay at the top.** In notes, the formatting toolbar stays fixed just under the question bar while a long note scrolls beneath it. This also works in Focus mode.
- In Write, the document ribbon (Home, Format, Insert) now stays fixed under the page toolbar instead of slipping behind it.

## [1.16.3]
- **Hints open on click.** Each question now shows three small buttons: 📍 Where to look, ✎ How to answer and 💡 Example. A card opens only when you click its button and closes when you click again, so the note box gets the space.
- **Less padding around the note box.** The current question no longer sits inside an extra padded box; that came from a style clash with the side menu's project card.

## [1.16.2]
- **Fold the reference card.** The arrow at the top left of the reference card folds it to a single line showing the reference (and a PDF tag), with Edit details still at hand. Click the arrow again to unfold it. The app remembers your choice.

## [1.16.1]
- **Saving no longer shakes the screen.** Saving used to redraw the side menu, and on some pages the whole page, after every keystroke. Now only what actually changed is redrawn, and nothing is redrawn while you are typing in a field.
- The save indicator keeps a fixed size: only its dot turns amber briefly while saving. The toolbar buttons next to it no longer move.
- Typing in project settings no longer loses your cursor when a save comes back.

## [1.16.0]
- **One question at a time.** The notes pane has a question picker at the top: choose a question from the drop-down (✓ marks answered ones) or step with ‹ and ›, and only that question is shown. Next unanswered and the question list on the left jump straight to a question. The app remembers which question you were on for each paper. **Show all** switches back to the full list.
- **Hide the formatting toolbar.** Click the ▴ at the end of a note's toolbar, or **Aa Toolbar** in the picker bar, to hide or show the formatting toolbars. Ctrl+B, Ctrl+I and Ctrl+U still work while it is hidden.
- **Hide the hints.** The 💡 **Hints** button hides or shows the "Where to look", "How to answer" and example cards.

## [1.15.0]
- **Example answers.** Every reading question now shows a third hint, 💡 Example answer, next to "Where to look" and "How to answer". The examples are short model answers drawn from different social-science topics (health, education, transport, labour, governance).
- You can write your own example for any question in Settings → Reading questions → Customise questions.
- Existing projects get the examples automatically for questions you have not reworded.

## [1.14.2]
- Finished making the reading questions topic-neutral. The hints for Q2 (unit of analysis), Q17, Q21 and Q24 and the Pass 2 description no longer assume one kind of study ("grid cell", "equation", "results tables", "our sessions").
- Existing projects are updated automatically; your own rewording is kept.

## [1.14.1]
- **Topic-neutral reading questions.** Questions 6–12, 14, 18 and 20 were worded for one topic (minerals and violence), copied from the original spreadsheet. They now suit any social-science study, quantitative or qualitative. For example, "Theory: what mechanism or framework explains the relationship?" and "Outcome: what is being explained, and how is it measured?"
- Existing projects are updated automatically. Any question you reworded yourself is left as you wrote it.
- The example causal chain about mineral prices is removed. The project field is now "My conceptual framework / causal chain".

## [1.14.0]
- **Quotes from scanned PDFs.** A new **Area tool** in the reader: draw a box around a passage on a scanned page and the app reads the text. Check and correct it, then **Add quote** (with citation and page) or **Highlight** the area, as with normal PDFs.
- When a PDF has no selectable text, the reader says so and offers the Area tool.
- Text recognition runs on your own computer (Tesseract, English and French), with no internet or API key. This update is a larger download than usual (about 30–40 MB), once, because it adds the text-recognition engine.

## [1.13.0]
- **Settings in tabs:** Appearance, Writing, Backups & data, and App & updates. A dot on the App & updates tab shows when an update is waiting.
- **Project settings in tabs:** Details (with Delete project), Reading questions, Themes & dimensions, and Abbreviations.
- **Less repetition:**
  - The theme switcher has moved from the top bar to Settings → Appearance.
  - Compare and Reports are no longer in the side menu; they remain as tabs inside each project.
  - The side menu's project card is now a single compact button that opens the project. The list of papers in progress stays on the Home page.
  - Duplicate "Add paper" buttons are gone. Use the one in the top bar, which adds to the project you are in.
  - On the Home page, the four count cards are replaced by a short line in the welcome banner.
- **Tidier paper toolbar:** Expand all, Collapse all, Swap sides and Delete paper are now in the ⋯ menu.

## [1.12.1]
- The highlight and quote controls now sit in a bar inside the reader, away from the selected text, so browser add-ons that pop up next to a selection (such as Sider) no longer cover them.
- The bar appears once, when you finish selecting, instead of redrawing while you drag.
- Stronger highlight colours and larger colour buttons. A preview of the selected text and a close (×) button are shown in the bar.

## [1.12.0]
- **Quotes and highlights from the PDF.** With the Text tool (I) in the reader, select text and a small pop-up offers:
  - **Highlight** in yellow, green, blue or pink. Click a highlight later to change its colour, quote it, or remove it.
  - **Add quote** to the question you choose. The quote goes into your notes as “…” (Author, Year, p. 5). The page number is filled in from the PDF and can be corrected before adding.
- **Save highlights into the PDF.** After highlighting, a bar asks whether to save a highlighted copy of the PDF, so the highlights show when you open the file in any PDF reader. The original is kept, so highlights can still be changed and saved again.
- **Write → Your notes → Quotes** lists every quote by paper. Insert puts the quote in your document with its citation and page, and the paper is added to the reference list. Notes that already end with a citation and page are no longer given a second citation.

## [1.11.0]
- **Abbreviations and acronyms** for each project.
  - In any note or document, select an abbreviation (for example WHO) and click **Abbr.** to give its full form.
  - Writing "World Health Organization (WHO)" or "WHO (World Health Organization)" is spotted automatically and offered for one-click adding. Plurals such as "RTIs" are listed in the singular.
  - The **Abbreviations** window (Write tab, Settings, or Insert → Edit list) shows the defined list, abbreviations found in your writing, and capitals used but not yet defined, which you can fill in or ignore.
- **Insert → Abbreviations** adds an alphabetical "List of abbreviations" table with those used in the document.
- Project reports (HTML and Markdown) include an Abbreviations section.

## [1.10.0]
- **Document ribbon** in Write with **Home**, **Format** and **Insert** tabs. Hide it with the arrow on the right and bring it back with any tab.
- **Format**: font, size and colour for selected text; left, centre, right and justified paragraphs; and a font, size and line spacing for the whole document (for example Times New Roman, 12 pt, double-spaced).
- **Insert**:
  - **Pictures** (PNG, JPG, GIF, WebP), with an optional caption and Small / Medium / Large / Full-width sizes; click a picture to resize or remove it.
  - **Tables** with a header row and caption; Tab moves between cells and adds a row at the end; click a table for + Row, + Column, − Row, − Column or Delete.
  - **Charts** (columns, bars, line, pie) from data you type or paste from Excel, with a live preview.
  - **Shapes**: boxes, circles, diamonds, arrows, callouts and simple A → B → C flow diagrams, with text and colours.
  - **Lines** and **page breaks**.
- Figures and tables are numbered automatically ("Figure 1.", "Table 1."). Double-click a chart or shape to edit it.
- Word/PDF exports include your pictures, fonts, sizes, colours, alignment, line spacing and page breaks; Markdown exports include tables.
- The self-hosted server now also stores pictures, checking each file's content.
- Fixed: selected options in some dialogs were invisible.

## [1.9.0]
- **Tag your notes for synthesis**: under every answer (or with the Tag button in the note toolbar) tag the whole answer, or select a passage and tag just that, with **themes**, **debates**, **methods**, **context**, **concepts & variables** or **gaps** — or add your own dimensions in Project settings.
- **Debates with sides**: each note tagged with a debate records whether it **supports**, **challenges** or is **mixed**.
- **Synthesis reports**: Report → *Organise by* now includes any dimension (debates grouped by side) and **matrices** of papers × themes and papers × debates, where empty cells reveal possible gaps. Exports include them.
- **Write**: a new project tab for your papers and chapters — several documents per project, with headings, formatting, lists and the spelling & grammar check. Your notes sit beside the document and can be browsed by question, paper, theme, debate or any dimension, or searched. **Insert** adds a note with its APA in-text citation; **Cite** adds just the citation. The **reference list builds itself** from the papers you cite, and documents export to Word/PDF and Markdown.
- Start a document from a blank page, a standard paper outline, or **an outline generated from your themes and debates**.
- Ask across the project now also knows your tags.

## [1.8.0]
- **Automatic backups**: a snapshot of all your notes is saved every 6 hours when something changed (in `data/backups`, newest 30 kept). Settings → Backups shows the last one, has a **Back up now** button, and lets you **Restore** any recent snapshot in one click.
- **Google Drive**: Settings → Backups explains how to let Google Drive for desktop keep a live copy of your `data` folder — notes, PDFs and snapshots — so nothing is lost if your computer breaks.

## [1.7.0]
- **Install as a desktop app**: Literature Notes can now be installed from Edge or Chrome as its own window, with an icon in the Start menu and taskbar and no browser tabs. Settings → Desktop app has an **Install app** button (or step-by-step instructions).
- New app icon.

## [1.6.0]
- **Spelling and grammar check**: a **Check** button above every note proposes corrections (spelling, grammar, punctuation, capitalisation). Each one shows the old and new text and a short reason, and nothing changes until you click **Accept**; **Ignore** leaves your text as it is. Formatting such as bold and highlights is kept. Uses Claude, or your local model on a self-hosted server.
- **Automatic capitals**: the first letter of a sentence is capitalised as you type — at the start of a note, line or list item and after . ! ? — but not after abbreviations such as e.g., i.e., et al., p. or Fig., or after initials.
- **Keep a small letter**: press Backspace right after a letter was capitalised to change it back (for terms like mRNA or iPhone).
- **Spell-check language**: choose English (UK), English (US), French or off in Settings → Writing; misspelled words are underlined, with suggestions on right-click.
- Fixed: the plain-text and Markdown versions of a note could join its first two lines together.

## [1.5.0]
- **Zoom by percentage** in the PDF reader: − and + step through 25%–500%, or pick Fit width, Fit page or a level from the menu. The current percentage is always shown.
- Zooming keeps your place: the part of the page you are looking at stays in view instead of jumping to the top.
- **Hand tool**: click and drag to move around a zoomed page. Switch to the **text tool** to select and copy text.
- **Touch screens**: pinch with two fingers to zoom, swipe with one finger to scroll. Trackpad pinch and Ctrl + mouse wheel zoom too.
- Fixed: when a page was zoomed wider than the panel, its left side could not be reached.
- Pages re-render sharply at every zoom level.

## [1.4.0]
- **Lists in notes**: bulleted and numbered lists from the toolbar, with Ctrl+Shift+8 / Ctrl+Shift+7, or by typing "- " or "1. " at the start of a line.
- Press Tab inside a list to indent a point (nested list) and Shift+Tab to move it back out.
- Lists appear in reports, Compare and exports (Markdown uses "-" and "1.").

## [1.3.0]
- **Formatted notes**: make text **bold**, *italic* or underlined, and highlight it in yellow, green, blue, pink or orange. A small toolbar sits above every note; Ctrl+B, Ctrl+I and Ctrl+U work too.
- Formatting appears in paper and project reports, in Compare, and in exported Word/PDF files; Markdown exports keep bold and italics.
- Pasted text is cleaned automatically, so notes stay tidy and safe.
- The PDF size limit shown in the app now matches your server's setting.
- Smaller updates: after this version, updates download only the changed app files instead of the whole app.

## [1.2.0]
- **Focus mode** for reading: hides the sidebar, top bar and headers so only the PDF and your notes fill the screen (uses full screen where the browser allows). Leave with "Exit focus" or Esc.
- **Resizable panes**: drag the handle between the PDF and your notes to set their widths; double-click it to reset. Your choice is remembered, and the PDF re-fits to the new width.
- **Swap sides**: put your notes on the left or the right of the PDF.
- In focus mode the PDF and the notes scroll separately.
- Auto-fill no longer copies placeholder author names such as "anonymous" from a PDF's built-in information.

## [1.1.0]
- **Auto-fill from PDF**: upload a paper and its authors, year, title, journal, volume, issue, pages and DOI are filled in — from CrossRef when the PDF has a DOI, otherwise read from the first page by the Ask model.
- **In-app updates**: Settings → Updates shows new versions and installs them with one click.
- Fill in the details of papers you added earlier with "Fill details from the attached PDF".

## [1.0.0]
- First self-hosted release: projects, guided reading questions, APA 7 references, PDF reader side by side, Ask (Claude API or Ollama), compare, search, reports, three themes.
