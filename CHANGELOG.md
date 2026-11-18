# Changelog

## [3.12.0] - 2026-11-18
### Added
- **Chapters of a book as separate readings.** A reading with a PDF has a **Split into chapters** button, in the reading list and in its reading notes.
  - **Finding the chapters:** the app reads the book's contents list and finds each chapter's title and authors. It works out where each chapter starts in the PDF and its printed page numbers. You tick the chapters your lecture asks you to read, and can correct any title, author or page, or add a chapter by hand.
  - **Each chapter becomes its own reading,** listed under its book. It has its own notes, insight-map node, report section and APA chapter reference, built from the book's details. For example: "Baitenmann, H. (2005). Counting on State Subjects… In C. Krohn-Hansen & K. G. Nustad (Eds.), *State Formation: Anthropological Perspectives* (pp. 171–194). Pluto Press." Quotes are cited (Baitenmann, 2005, p. 175).
  - **One PDF:** the chapters share the book's PDF, and each opens at its own first page. Page numbers in quotes use the book's printed numbers.

### Fixed
- Removing a reading no longer deletes a PDF that another reading (a chapter, or its book) still uses.

## [3.11.1] - 2026-11-17
### Fixed
- **Book references are found.** A book without a DOI, such as *State Formation: Anthropological Perspectives* (2005), got no reference details. The app now reads up to four first pages and recognises:
  - the title page: "Edited by …" or "by …";
  - the copyright page: "First published 2005 by Pluto Press", or the © year.
  When that is not enough, the self-hosted app looks the book's ISBN up in Open Library (new `/api/isbn` endpoint). This only works with internet access.
- **Edited books follow APA 7:** the editors take the author position, for example "Krohn-Hansen, C., & Nustad, K. G. (Eds.). (2005). *State Formation: Anthropological Perspectives*. Pluto Press." The in-text citation is (Krohn-Hansen & Nustad, 2005). The *Book* reference form now has an Editors field.
- **Reading names:** a reading whose reference is found is renamed to its title instead of the file name.

## [3.11.0] - 2026-11-17
### Added
- **Write assignments from your reading notes.** The notes panel beside an assignment now has a **Readings** source, next to Lectures and Project.
  - **What you can browse:** your notes on the course's readings, by unit or for the whole course. Pick one reading or all of them, use the tabs (Everything, Notes, Questions, Claims, Concepts, Insights, Gaps) or search.
  - **Insert** puts a claim, concept, insight, question or note into your document with its APA in-text citation. A claim keeps its support, for example "Development is a political process (case study: Botswana, Korea) (Leftwich, 2011, p. 225)." **Cite** inserts only the citation.
  - **Reference list:** every reading you insert, quote from or cite is added to the APA reference list automatically. This includes text pasted with its citation. A cited reading without reference details is flagged, with a link to add them.
  - **Open this reading** shows the reading's PDF beside your document. Quotes taken from it carry their citation.
- **Build it as the course goes.** The assignment page lists the lectures so far (and coming ones) for its unit or course, showing how many readings have notes and whether you took class notes. Lectures with new notes since you last worked on the assignment are marked **new**. In the document, readings with new notes are marked ● in the reading list.

## [3.10.1] - 2026-11-17
### Changed
- The reading notes panel is easier to find:
  - The class-notes toolbar button now always shows its label, **Readings**. Sticky and Record become icon-only on smaller screens, so the toolbar stays on one line.
  - The *From the readings* side panel has an **Open all my reading notes** button.

## [3.10.0] - 2026-11-17
### Added
- **Organise course reports** like research project reports. *Organise by* has four options:
  - **Lecture:** as before.
  - **Reading:** each reading with everything you noted on it and what the lectures added.
  - **Theme:** all readings together, section by section. It covers questions, claims and their support, a concept glossary showing which readings use each concept, how the readings relate, questions taken to class, insights, gaps, and what the lectures added.
  - **Grid:** one table of readings against their questions, claims, support, concepts, insights and gaps.
- **Course report buttons:** *Full screen* shows only the report (Esc to leave). *Copy text* copies the report.
- **Reading notes panel in class notes, redesigned** (*From your readings*):
  - **Reading switcher:** *All readings* or one reading at a time. With all readings, each item is labelled with its reading.
  - **Tabs:** Everything, Notes, Questions, Claims, Concepts, Insights, Gaps, Links. For example, Insights with all readings shows the insights from every reading.
  - **Search** across all your reading notes.
  - **This lecture or Whole course:** bring in the readings of earlier lectures too.
  - **Matches what you are writing:** as you type a paragraph, matching claims and concepts from the readings appear, ready to *Relate* or *Insert*.
  - **PDF:** opens a reading's PDF in the same pane. The *Reading notes* button brings the notes back.

### Changed
- **Insight map rebuilt to give the overview first:**
  - **Overview:** readings around the middle, with the concepts they share between them and arrows for how the readings relate. Each reading card shows its counts, its gaps and its main insights. Click **+** on a reading to open its questions, claims and support, class links, insights and gaps; *Open all* and *Close all* do this for every reading.
  - **Moving around:** drag the background to move; scroll to pan; Ctrl + scroll or pinch to zoom; *Fit* shows the whole map.
  - **Laptop screens:** the map fills the window. Gaps and the key open in panels over the map instead of taking space beside it.
  - **Filters:** show or hide questions, claims, concepts, class links, insights and gaps. *Only gaps* dims everything that is not a gap.

### Fixed
- When the window was narrow (for example in split screen), the course report's side bar stayed fixed and the report scrolled underneath it. It now flows above the report.

## [3.9.0] - 2026-11-16
### Added
- **Reading notes beside class notes.** A new *Reading notes* button in the class-notes toolbar opens a report of your reading notes on the right, while you take notes on the left. You can drag the divider to resize the two sides.
  - **Customise** (settings button): choose which readings to show and which sections. The sections are general notes, reading questions, claims (with their support), concepts, needed first, other readings, questions for class, insights and gaps. Your choice is remembered.
  - **Relate:** select words in your class notes, then click *Relate* on a claim, concept or question. The words are linked to that item, and the item shows *Related in class* with how it was related.
  - **Insert:** puts an item into your class notes where your cursor is, with its APA citation, for example "**Concept (reading):** developmental state *(Leftwich, 2011)*".
  - Copying text from the report keeps its reference.

### Fixed
- The *From the readings* section of the questions panel showed nothing.
- The class-notes toolbar fits on one line again on smaller screens: Capture and Reading notes show their icon only.

## [3.8.1] - 2026-11-16
### Fixed
- Text typed in an *add* box in reading notes (a claim, a concept, a question…) or in the class-notes question box was lost when you clicked elsewhere. It is now kept until you press Enter, even when you switch sections or reload the page.
- Clicking outside a dialog (Capture, Relate, Answer…) after typing in it no longer closes the dialog. The dialog nudges instead; use Cancel to close it.
- The PDF jumped back to the first page when the page was redrawn, for example when entering or leaving focus mode. Each PDF now remembers the exact place you were reading: the page and how far down it. This holds through redraws, closing and reopening a reading, and reloading the app.
- The notes cursor now goes back to where you left it when you return to a reading's general notes or to your class notes.

## [3.8.0] - 2026-11-16
### Added
- **Insight map full screen.** *Full screen* shows only the map. The side panel, the menu and the rest of the page are hidden, and only Add box, Connect, zoom and *Exit full screen* stay visible. Press Esc to leave full screen.

### Changed
- **Insight map PDF.** *PDF* now puts the whole map on one landscape page, scaled to fit A4 and US Letter, with the map's title and the date.
- **One section open at a time.** Only one reading-notes section button is open at a time: opening Concepts closes Claims.

## [3.7.1] - 2026-11-16
### Added
- Highlights in a reading's General notes and the section buttons above are now linked both ways:
  - Hovering a section button lights up that section's highlights in your notes.
  - A section item that is highlighted in your notes shows **in notes ↓**. Click it to jump to the words.

## [3.7.0] - 2026-11-16
### Added
- **Turn selected words in general notes into an item.** Select words in a reading's General notes and a small bar appears. Choose *Claim*, *Concept*, *Reading question*, *For class*, *Needed first*, *Insight* or *Gap*.
  - The words are added to that section. In the text they stay highlighted in the section's colour, with a small sign: C, K, ?, ←, ★ or ∅.
  - **Link to…** links the words to something you already noted instead of adding a new item.
- **Using the highlights.** Point at a highlight to see what it is linked to, for example a claim and how it is supported. Click it to open that section at the item. *Unmark* removes a highlight; the item stays in its section.

## [3.6.2] - 2026-11-16
### Changed
- The bar of section buttons in reading notes now stays fixed at the top while you scroll, both normally and in focus mode.

## [3.6.1] - 2026-11-16
### Changed
- In focus mode, reading notes start at the section buttons. The reading/class tabs, the toolbar and the reading's reference header are hidden. Exit focus mode with the *Exit focus* button at the top right, or press Esc.

## [3.6.0] - 2026-11-16
### Changed
- **Reading notes have a General notes editor.** Each reading now has a full note editor with the same toolbar as class notes, for the general ideas of the reading. The guided sections are now buttons above the editor:
  - Reading questions, Claims, Concepts, Needed first, Other readings, For class, Insights, Gaps.
  - Open a section only when you need it, then minimise it. What you added stays saved.
  - An orange number on a button shows what is still to finish: claims without their support, reading questions not answered yet, concepts not understood yet, and questions for class still open.
- **Selected words go into a section.** Select words in your general notes and click a section button: the words are put in that section's box, ready to add.
- **Quotes from the PDF go into General notes by default.**
- **Reports include the general notes of each reading.**

## [3.5.1] - 2026-11-16
### Fixed
- Scanned books and chapters, for example Internet Archive scans, showed black or blank pages. These PDFs store their pages as JPEG 2000 or JBIG2 images. PDF.js now loads its image decoders, and also its character maps and standard fonts. The server serves these from `/vendor/pdfjs-extra/`.

### Added
- Upload several PDFs at once: select multiple files in Materials or in Course resources.
- A reading's reference is read from its file name when the name follows the APA pattern. For example, `Leftwich_A._2011._Theorizing_the_State._In_P._Burnell_V._Randall_eds._Politics_in_the_Developing_World._Oxford_..._pp._223-240.pdf` becomes a full APA book-chapter reference. The reading is also named after its title.

## [3.5.0] - 2026-11-16
### Added
- **Reading notes and class notes.** Each lecture has two tabs: *Reading notes* for before class and *Class notes* for the lecture itself. Lectures planned for later open on Reading notes.
- **Guided reading notes**, one set per reading, beside the open PDF:
  - questions the reading wants to answer, and how it answers them;
  - claims, and how each claim is supported (data, case study, theory and so on);
  - key concepts, marked *Understood* or *Not yet*;
  - concepts you need first;
  - how the reading relates to the other readings;
  - questions to take to class;
  - key insights;
  - gaps and limits;
  - other notes.
- **Quotes go into reading notes.** A quote taken from the PDF in Reading notes can go straight into a section.
- **Reading references.** When you upload a reading, the app tries to fill in its reference details. You can edit them with *Add reference*.
- **Citations on quotes and copies.** Quoting or copying from a reading, or from your notes on it, now adds the APA citation, for example (Leftwich, 2000, p. 12).
- **Relate in class notes.** Select words and link them to a claim, concept or question from the readings. If the link answers a question, the question is marked answered. If it explains a concept you marked *Not yet*, you can mark it understood.
- **From the readings panel.** While you take class notes, a panel shows each reading's claims, the concepts you don't understand yet and your insights.
- **Capture.** Saves an assignment with its due date, an exam or other deadline, or information about the course, heard during the lecture. Captured items are listed in the lecture and in the report.
- **Insight map** in Reports, beside *Report*, for a lecture, a unit or the whole course.
  - It is built from your reading and class notes, in columns: foundations, concepts, readings, questions and claims, in class, and takeaways.
  - Each kind of box has its own shape, and arrows show how the readings relate.
  - Gaps are marked on the map and listed beside it:
    - concepts not understood yet, open questions and claims whose support is not noted;
    - claims not discussed in class;
    - readings not related to the others;
    - weakly supported claims and gaps in the literature.
  - You can drag boxes, double-click to edit (your notes change too), mark gaps, hide boxes, add your own boxes and arrows, and print it.
- **Lecture reports** now include the reading notes, what the lecture added to the readings, and what you captured in class.

## [3.4.2] - 2026-11-16
### Changed
- Focus mode on a lecture now starts at the toolbar: the breadcrumbs, date and topic header are hidden. The lecture title stays at the left of the toolbar.
- An empty subtopic line is hidden. It appears when you point at or edit the header.
- In focus mode the Sketch and Materials buttons no longer cover End lecture and the ⋯ menu.

## [3.4.1]
- **No more leaking at the top while you scroll.** The toolbar above your notes and writing, and the top search bar, now have solid backgrounds, so lines of text no longer show through as they scroll underneath. Sticky notes also slide under the toolbars instead of over them.

## [3.4.0]
- **Two sides while reading in a lecture.** Opening a slide deck or reading puts your notes on the left and the document on the right, with the questions panel out of the way. Drag the divider to resize. **Close** (or Esc) shrinks the document back into the Materials button, macOS-style, and the panel slides back.
- **Sticky notes.** **Sticky** in the lecture toolbar (or Insert → Sticky note) pins a note on top of your notes. Each note is a flat square of paper with its bottom-right corner lifting, held by a black push-pin or a strip of tape (switch on the note). Drag it anywhere in the notes column, resize it from the bottom-right corner, and set its colour: yellow, blue, green, pink, orange or purple. Hide it with the eye button; **N hidden** in the toolbar brings hidden notes back. Sticky notes appear in course reports with your notes.
- **Insert a sketch.** Insert → **Sketch** puts one of your saved sketches into your notes or writing. Sketches from this lecture come first, then this course, then the rest; **New sketch** is there too.

## [3.3.0]
- **Your lecture notes beside your assignment.** When you write an assignment, the notes panel shows your **Lectures**: just the assignment's unit or the whole course, by lecture, reflection questions, important ideas, flashcards, or a search. Each piece has an **Insert** button. Switch to **Research project** for your reading notes from a linked project.
- **Open a document while you write.** **Library** (research writing) or **Resources** (assignments) sits at the top right. It lists this project's papers, or the course's slides and readings (your assignment's unit first), with a search box. The document opens where the notes were, with its title and a **Close** button.
  - Select text in it and choose **Quote into my writing**: the quote goes into your text with its citation and page.
  - **Close** (or Esc) shrinks it back into the button, macOS-style, and your notes slide back into place. ↗ still opens it in its own window.

## [3.2.0]
- **Project badges in the side menu.** Each project has a small coloured badge with its initials; courses get one in their own colour with their code letters.
- **A structured project page.** The header shows the project's badge, name and review question (with a link to add one if missing), followed by a summary strip: papers, reading now, up next, finished, % of notes done and drafts. Literature is grouped into **Reading now**, **Up next** and **Finished**. It opens as a tidy list (title, authors, year and journal, where you are, verdict and progress); switch to **Cards** if you prefer. Cards no longer repeat the project name.
- **A tidier Report page.** Choices sit in a column on the left: course and what to report on, an **Include** checklist, export buttons and your **Saved reports**. The report reads like a document on the right, with contents at the top, a date badge for each lecture, the summary set apart, questions with their answers as Q1, Q2…, and flashcards as small cards. PDF and Word exports use the same structure.

## [3.1.0]
- **A flat side menu.** Under Courses you now see only your course names, with no unfolding units and lectures. Units live inside the course page as a list on the left; click one to see its lectures in date order. **Add unit** is there too.
- **One New lecture button** replaces Plan a lecture and Start lecture note. Pick a date: today opens the notes straight away; a later date plans the lecture so you can add its slides and readings first. The date fills in from your class times. On a day when a lecture is already planned, the button becomes **Open today's lecture**. On a course page the button works for that course.
- **Move between lectures** on the lecture page with the **‹ ›** arrows (previous and next lecture of the course) or the lecture menu beside them.

## [3.0.0]
**A calmer, tidier app.**
- **Two workspaces.** A switch at the top of the side menu moves between **Research** (Home, Projects, Library, Ideas) and **Study** (Today, Courses, Review, Resources). Each workspace has its own menu, search and main button: **Add paper** in Research, **Start lecture note** in Study. Each remembers where you were. Settings is pinned at the bottom.
- **Today** is the new Study home: your next class and what's coming up, recent and planned lectures, quick actions, and open reflection questions. The Courses page no longer repeats it.
- **The calm look** is the new default, in light and **Calm dark** (it follows your computer's setting the first time). It has soft neutral pages, one blue accent and a single main button per screen. What is selected gets a highlighter mark. Titles are in a clean sans-serif; reports keep a serif for reading. The older themes are still in Settings → Appearance.
- **Consistent line icons** replace the emojis in toolbars, panels, badges and the sketch pad. Marks in your notes use small coloured symbols.
- **A quieter lecture page.** Focus and the questions panel are icon buttons, End lecture is a normal button, and the date and time line is tidier. Sketch and Materials sit neatly in the top bar.
- **Command bar: Ctrl+K** (⌘K on Mac). Type what you want, such as "plan lecture", "new sketch", "dark theme", "switch to research" or a course, lecture, project or paper name, and press Enter.
- **Study search.** In Study, the search bar finds courses, lectures (including words in your notes), slides and readings, sketches and assignments.
- **Gentle motion.** Pages, dialogs, menus and panels ease in when you open them. Motion is switched off when your computer asks for reduced motion.
- The research "current project" card and the repeated Resources and Report entries inside each course in the side menu are gone. **Plan a lecture** asks which course if none is open.

## [2.6.0]
- **Course resources, separate from your research Library.** Library (under Research) holds research papers only again. Your study material has its own home under Study: **Course resources**, with **Readings & slides**, **Sketches** and **Reports**. Reports, including saved copies, now live there instead of in a separate Report item in the side menu.
- In the course tree, each course has **Resources** and **Report** entries that open Course resources for that course.
- The research **Current project** card is hidden while you work in Courses, Review or Course resources.

## [2.5.1]
- **Research and study ideas are kept apart.** The Ideas page has two tabs: **Research** (ideas from papers and projects) and **Lectures** (ideas from your lecture notes, filtered by course). When you write a research paper in Write, only research ideas are offered. An assignment draft offers its course's lecture ideas, plus the research ideas of a project you deliberately linked to it. The suggested theme and concept names are also kept separate.
- Library → Reports is now called **Course reports**. Research reports stay inside each project.

## [2.5.0]
- **Shapes behave like in Word.** An inserted shape floats over the page: drag it anywhere, resize it from the corners (Shift for free proportions) or sides, and rotate it with the round handle (Shift for 15° steps). Its small toolbar can rotate it, restore its proportions, bring it to the front or send it back, copy, edit, delete, or put it back in line with the text. Arrow keys nudge a selected shape. Any picture or chart can also be made **Free**. In exports and reports, free objects appear as centred pictures.
- **Sketch pad.** A **✏️ Sketch** button sits at the top right of your lecture notes, beside Materials.
  - Tools: pen (pressure-sensitive with a stylus), highlighter, eraser (rub out part of a stroke), stroke eraser (remove whole strokes), select and move, line, arrow, rectangle, ellipse and text.
  - Also: colours with a custom picker, thickness, filled shapes, and blank, lined, grid or dotted paper.
  - Undo and redo work, and there are keyboard shortcuts for every tool.
  - Save it with a name; it can go straight into your notes. Sketches stay editable later.
- **Library holds your study material too.** It now has four sections, also in the side menu: **Research papers**, **Readings & slides** (by course and unit, with upload buttons for each lecture), **Sketches**, and **Reports**. On the Report page, **Save to Library** keeps a copy under Library → Reports.
- In the side menu, each lecture is now a single entry: readings and slides live in Library and in the **Materials** card, which also lists the lecture's sketches.

## [2.4.2]
- **Resize both sides of the reader.** With a reading or slides open beside your lecture notes, drag the divider on the left of the document to resize your notes, and the one on the right to resize the questions panel. Double-click a divider to reset it. The app remembers your sizes.

## [2.4.1]
- In the side menu, **Settings** now sits below a divider line, so it no longer looks like part of Study.

## [2.4.0]
- **Unit lecturers come from the course.** When you add or edit a unit, tick which of the course's lecturers teach it. If you rename a lecturer in the course settings, the units follow. A lecturer who isn't in the course list can still be typed in, and a unit with no lecturer ticked uses all the course's lecturers.
- **Plan a lecture lives under the units.** In the side menu, a course with units shows its units and **Add unit**; **Plan a lecture** sits inside each unit. A course without units shows **Plan a lecture** and **Add unit**. When planning a lecture in a course with units, you always choose a unit.
- **Report is its own page,** under Study after Review. Choose the course, then the whole course, one unit or one lecture.

## [2.3.0]
- **Reflection questions** (right of your lecture notes). Type a question, or select words in your notes and click **❓ Ask** to write a question that leads to them. The words stay marked, and the question remembers them. When you tick a question, a small pop-up asks what answer you got; filling it in is optional. Click an answer to change it.
- **Important** comes next: words marked ⭐ in your notes, plus important ideas and reflections you type in. **Flashcards** follow: type `term :: meaning`, or write it in your notes as before. The summary stays under the notes.
- **Materials button** (top right, also in focus mode). It opens a card with this lecture's Slides, Compulsory readings, Additional readings and Links, where you can upload, open, move or delete them.
- **Reading beside your notes.** When you open a reading or slides, your notes move to a narrow column on the left, the document opens large in the centre, and the questions panel stays on the right. Drag the divider to resize. **Open in its own window** (↗) moves the document into a separate window.
- **Course reports.** A new **Report** tab in each course, also in the side menu, shows the whole course, one unit or one lecture. Choose what to include: lecture notes, summaries, reflection questions and answers, important ideas and reflections, flashcards, and the slides and readings list. Read it in the app or export it as PDF or Word.
- **On the lecture page,** the search bar searches the course's slides and readings, including the text inside the PDFs, and opens the document at the right page. The **Add paper** button is hidden there.

## [2.2.0]
- **Plan lectures ahead.** **Plan a lecture** (on the course page, or under a course or unit in the side menu) creates the lecture before it happens: the date and time come from your next class date, and you add the topic. Then attach the slides and readings. On the day, **Start lecture note** offers the lecture planned for today, and your notes go into it.
- **Readings sorted into Compulsory, Additional and Links.** The lecture panel has four groups: Slides, Compulsory readings, Additional readings and Links, each with its own Upload or Add button. Use **⇄** to move a reading between compulsory and additional.
- **Courses as a tree in the side menu.** Courses → course → unit → lecture → **Notes**, **Readings** (Compulsory, Additional, Links) and **Slides**. Click a name to open it; click the arrow to fold or unfold it. You can upload files and plan lectures straight from the tree, and clicking a file opens it beside the lecture notes.
- **The full Write toolbar in lecture notes.** Lecture notes now have the same Home, Format and Insert tabs as Write: fonts, sizes, text colours, alignment, line spacing, pictures, charts, shapes, tables, lines, and the abbreviations list. In the Cornell layout, the toolbar formats whichever side you are typing in. Abbreviations in lecture notes are kept per course.

## [2.1.0]
- **Class dates instead of weekdays.** Each class is now set as a date and time. Tick **Repeats every week** only for classes that really meet weekly; you can also set when the repeats end. **+ Add a class date** copies the last class's times and room one week later, so entering an irregular timetable is quick. Class times from earlier versions are kept as weekly repeats.
- **Timetable by real week.** The timetable shows one week at a time with the dates, plus buttons for the previous and next week. If a week has no classes, it tells you when the next one is.
- The course page shows your next three classes, and attendance and the calendar file (.ics) follow the class dates.
- **Folding side menu.** Click **Projects** or **Courses** to list them in the side menu and open one directly. Click again, or use the arrow, to fold the list.

## [2.0.0]
**Courses: a lecture companion.** A new Study area in the side menu, with Courses and Review.

- **Courses and units.** Each course has a code, colour, term dates, lecturers (with email and office hours) and class times. A course can be split into units, each with its own lecturers and times, or have no units. All settings can be changed at any time.
- **Timetable and Today.** Your week is built from the class times, and clashing classes are flagged. The Home and Courses pages show the class happening now or next, with **Start today's note**.
- **Lecture notes.**
  - The date, time, course, unit and lecturer are filled in for you; you type the topic and subtopic. You can also continue a previous note, which adds a dated "Continued" heading inside it.
  - Select words and mark them ❓ Ask (added to your questions), ⭐ Key, 🔁 Review, or 💡 Idea.
  - Write `term :: meaning` on a line to make a flashcard.
  - A side panel holds the lecture's slides and readings, your questions, and the important and review points.
  - Optional **Cornell layout**: key words and questions on the left, notes on the right, summary below.
  - **End lecture** asks for a three-sentence summary.
  - Export a lecture to Word or PDF.
- **Slides and readings** open in the reader beside your notes, with highlights. Selected text goes into your notes cited by slide or page, and Ask works on them too.
- **Record the lecture.** While recording, every new paragraph gets a time stamp; click it to hear that moment again. Recordings are stored with your notes.
- **Assignments.** Set the brief (text or PDF), due date, weight, word limit and a marking checklist. Write the assignment in the full document editor, with optional notes and citations from a literature project and a word count against the limit. Track its status (not started → graded) and export it to **Word or PDF**.
- **Calendar.** Assignment deadlines, exams and tests with countdowns. **Export to your phone's calendar (.ics)**, including weekly classes and reminders before deadlines.
- **Questions tracker.** Every question from every lecture, marked open or answered, with space for the answer.
- **Grades.** Weighted assessments, your current average, and "what do I need on the rest?".
- **Revision.**
  - A topic checklist for each unit (not yet / getting there / confident).
  - A one-click **revision pack** (summaries, key points, questions, flashcards) as Word or PDF.
  - AI **practice questions** from your own notes, when Ask is available.
- **Review.** 🔁 points and flashcards come back after 1 day, 3 days, a week, two weeks and a month. The side menu shows how many are due.
- **Study timer** (25-minute focus sessions or open timing) with a weekly chart per course.
- **Attendance.** Counted from your notes against the class times, with placeholders for missed classes ("get notes from a classmate").
- **Also:**
  - Documents in Write now export to **Word (.doc)** and **PDF** (via Save as PDF).
  - Ideas can come from lectures.
  - Fixed Ask's "New chat" losing track of the document.

## [1.19.0]
- **Fill details from a DOI or a link.** "Add paper" has a new box at the top: paste a DOI (e.g. 10.1016/…) or any web link and click **Fill details** (or just paste). This works with or without a PDF.
  - A DOI gets the details from CrossRef.
  - A link to an article page reads the page's own citation details, uses its DOI if it has one, and attaches the PDF if the page offers it.
  - A direct link to a PDF attaches the PDF.
  - A link to an ordinary web page fills in a Webpage reference: author, date, title and website name.
- **Read web sources in the app.** For a web source, **Read side by side** opens the page next to your notes:
  - **Reader** shows a clean, saved copy of the text (menus, adverts and cookie banners removed), with numbered paragraphs.
  - **Live page** shows the website itself. Some sites refuse to be shown inside other apps; you can then open them in your browser instead.
  - Select text in Reader to **Add quote** or make an **Idea**. Web pages have no page numbers, so the citation uses the paragraph, as APA requires: "…" (Ndip, 2023, para. 2).
  - **Ask** works on web sources too.
- A DOI found inside a PDF is now looked up in CrossRef in the online version as well.
- New server setting `WEB_FETCH=off` turns off fetching links. Links to your own computer or local network are never fetched.

## [1.18.0]
- **More guiding hints for all 24 questions**, written to help you learn note-taking:
  - 📍 **Where to look** gives the parts of the paper in order, plus the words to scan for (e.g. "This paper…", "We find…").
  - ✎ **How to answer** gives numbered steps and a sentence starter.
  - 💡 **Example** gives a fuller model answer, sometimes with a note on why it is good.
  - New ⚠ **Avoid** shows the most common beginner mistake for that question.
- Existing projects get the new guidance automatically; hints you rewrote yourself are kept.
- The question editor (Settings → Reading questions → Customise) now has larger boxes, keeps line breaks, and lets you write your own "Avoid" tip.

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
