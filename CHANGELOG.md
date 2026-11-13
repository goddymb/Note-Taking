# Changelog

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
