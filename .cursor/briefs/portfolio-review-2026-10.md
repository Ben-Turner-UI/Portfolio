# Portfolio review brief (October 2026)

Brief for Composer 2.5. It covers the homepage (`index.html`), the About page (`about.html`), and the three homepage case studies: `p4-dam.html`, `budibase-automations.html`, `cityfibre-rebrand.html`. Everything else is out of scope unless a step below names it.

The review is based on *State of UX Portfolios 2026* (`C:\Users\reape\Desktop\Job search context for LLMs\UX_Portfolio_Research_Reference_List.txt`). The findings that drive this brief:

- Reviewers spend under four minutes on a first pass and pick one case study from the card alone. Cards need what, who and kind, plus a clear outcome.
- Reviewers cross-check the CV, portfolio and LinkedIn. Mismatched numbers, roles or dates are an early red flag.
- The strongest case studies explain thinking, decisions and trade-offs (64%). The biggest weakness is missing decisions (49%), then missing outcome (43%) and unclear ownership (33%).
- About pages should show career path and tone of voice. Too much personal detail reads as unprofessional.
- Buzzwords and writing with no personal voice are the top AI signals. Low visual quality is the top red flag (55%).
- Disclose AI use by naming the tool and the task, and show what you changed. Do not call Ben an "AI expert".

## How to run this brief

1. Run **one phase per chat**, in order. Phase 1 makes every page true. Later phases make the pages good.
2. At the start of each run, read this file and `C:\Users\reape\My Drive\Career\Applications\_master\claims.md`. If they disagree, `claims.md` wins. Then stop and tell Ben.
3. Preview at `http://127.0.0.1:8765/` (start `file\cv-ai-generation\serve.ps1` if nothing answers). Add `?todo=1` to see TODO markers.
4. End each run with a list of every file changed, every TODO marker left, and any question for Ben.

## Rules

**Facts**

- Use only the facts in the "Confirmed facts" section, `claims.md`, or text already on the page. Do not invent numbers, dates, team members, decisions, alternatives, iterations or quotes.
- When copy needs a fact Ben has not given, do not write a placeholder into visible text. Add a TODO marker in the existing pattern and write around the gap:

```html
<!-- TODO(case-study): What Ben needs to supply -->
<div class="todo-marker" data-todo="What Ben needs to supply"></div>
```

- When you change a claim, change every copy of it: card, `<h1>`, `<title>`, `og:title`, `meta description`, `og:description`, image `alt`, other pages' next-project cards, and `agents-view.js`.

**Voice**

- Ben's voice is P4 DAM's current copy: short sentences, first person, plain words, honest about limits. For example: "I would talk to the developers more." and "Claude gets things wrong: on the lighting feature it used the wrong components, and I rewrote the CSS by hand."
- Use "I" for Ben's work and "we" for the team's. Name who else was involved.
- British English. Sentence case for every heading.
- No em dashes. Use an en dash only in ranges (8–10).
- Job title is always **Product Designer**. Never Senior. "Lead" is a verb. Write **DawsonAndrews** and **Perforce**. No Force UI.
- No sprint jargon: "planning meetings", not "refinement".
- Banned words and phrases: leverage, seamless, empower, robust, comprehensive, cutting-edge, game-changing, elevate, complete transparency, complete control, visually impressive, aptly, ethos, diligent, enriched my skillset, at the heart of.
- Cut any sentence that only restates the one before it.

**Code**

- Reuse existing markup and classes (`project-statistics`, `project-summary-meta`, `project-paragraph`, `compare-slider`, `improvements-table`, `content-image`, `next-project-card`). Do not change CSS, layout, scripts or fonts.
- Leave existing `<!-- was: ... -->` comments alone. Remove a TODO marker only when its fix is done.
- Do not edit the CV here. CV changes go through the `edit-cv` skill (Phase 6).

## Confirmed facts (Ben, 2026-10-11)

| Topic | Use this |
| --- | --- |
| CityFibre 90% | 90% more postcode availability checks (Check availability clicks) than **the month before** the rebrand launched. Postcode checks are the conversion. Do not say "homepage conversions" or "key areas". |
| Agency hires | **Nine**. Already fixed on the CV, Agent view and `claims.md`. |
| Budibase complaints | **8–10 a month** on the community Discord, down to **zero**. Never "near zero". |
| Budibase research | The redesign was **already planned**. The 25-user study **shaped** what it fixed. Ben presented it to the CEO, CMO and Head of Engineering. Never say the research convinced or persuaded the executives. |
| Budibase and AI | AI-first was **not** the goal at the time. Budibase later built its agents feature on the redesigned builder. |
| CityFibre brand | **Another agency** designed the identity (logo, 3D model, business card). Ben, at DawsonAndrews, **implemented** it across the website, portal, campaign landing pages, emails and design system. |
| CityFibre handover | Design tickets bounced back in Jira fell from about 15% to about 5% (95% right first time). The design system matched CraftCMS and Tailwind. |
| Location | Carrickfergus, near Belfast. |

## Phase 1: Make every page true

**Status: done (2026-10-11).** Files: `index.html`, `p4-dam.html`, `budibase-automations.html`, `cityfibre-rebrand.html`, `agents-view.js`, `p4-product.html`.

No restructuring. Fix only what is false, inconsistent or broken.

### Homepage (`index.html`)

- Budibase card `<h2>` and image `alt`: replace "fell from 8-10 to near zero" with the Phase 2 title. Use "Budibase automation complaints fell from 8–10 a month to zero" now.
- Budibase card description: replace "My research convinced the executive team to redesign the automation builder so every step shows the data going in and out." with "I ran a 25-user study that shaped the planned redesign of its automation builder, so every step shows the data going in and out."
- Remove the TODO comment and marker "Check the research-convinced-executives claim against the case study page." It is resolved.
- CityFibre card: `<h2>` and `alt` become "90% more postcode checks after the CityFibre rebrand". Description becomes "At DawsonAndrews I led design on CityFibre's digital rebrand, applying the new brand across the website, portal, campaign landing pages and emails." Remove the TODO "Add the percentage once the 90% definition is confirmed."
- Remove the `<title>` TODO "confirm location wording". Keep the title as is.

### P4 DAM (`p4-dam.html`)

- Stat 2 description: "Shorter planning meetings per feature, about an hour down to 30 minutes".
- Body: "Refinement sessions for a feature now take about 30 minutes." becomes "Planning meetings for a feature now take about 30 minutes." Check for any other "refinement".
- Next-project card: link to `budibase-automations.html`, thumbnail `img/thumbnail/bb-automations-thumbnail.png?v=2026-09-22j`, title "Budibase automation complaints fell from 8–10 a month to zero". The homepage order is P4 DAM, then Budibase, then CityFibre.

### Budibase (`budibase-automations.html`)

- `<h1>`, `<title>`, `og:title`: "Budibase automation complaints fell from 8–10 a month to zero" (`| Ben Turner` suffix on title and og:title as now).
- `meta description` and `og:description`: "How Ben Turner redesigned the Budibase automation builder after a 25-user study so every step shows data in and out, cutting automation complaints from 8–10 a month to zero."
- Stat 3: "Near zero" becomes "Zero". Description: "Automation complaints a month after launch, down from 8–10".
- Context paragraph: delete the last sentence ("The work had to support a wider strategic pivot..."). AI-first came later.
- The Problem: "roughly eight to ten at a time on automations alone" becomes "eight to ten a month on automations alone". Delete "It also left the product unprepared for the planned shift to AI-first automations, which depended on every step showing its data clearly."
- What the Research Said: "That evidence set the roadmap for the redesign and for the longer-term shift towards AI-first automations." becomes "The redesign was already planned. The evidence decided what it had to fix."
- What Happened: "dropped to near zero" becomes "dropped to zero". "eight to ten complaints and feedback requests" becomes "eight to ten complaints and feedback requests a month".
- Next-project card title: "90% more postcode checks after the CityFibre rebrand".

### CityFibre (`cityfibre-rebrand.html`)

- Add `meta description`, `og:type`, `og:title`, `og:description`, `og:image` (`https://benturner.work/img/thumbnail/rebrand-thumbnail.jpg`), `og:url` (`https://benturner.work/cityfibre-rebrand.html`) and `twitter:card`, in the same order as `p4-dam.html`. Description: "How Ben Turner applied CityFibre's new brand across its website, portal and campaigns at DawsonAndrews, with 90% more postcode availability checks than the month before launch."
- `<h1>` and `<title>`: "90% more postcode checks after the CityFibre rebrand". Remove the three "confirm this wording" TODO comments.
- Summary paragraph: "I led design on CityFibre's digital rebrand at DawsonAndrews: the marketing website, portal, campaign landing pages and emails. Postcode availability checks rose 90% on the month before launch, and the work helped the agency win the Hyperoptic account."
- Stat 1 description: "More postcode availability checks than the month before launch".
- Context: "As lead designer at CityFibre, I owned their entire digital rebrand" becomes "At DawsonAndrews I was lead designer for CityFibre's digital rebrand".
- Every other "conversions" mention of the 90% (first caption, Higher Conversion Rate paragraph) becomes postcode availability checks, compared with the month before launch.
- Brand image caption: "The new CityFibre brand, designed by another agency. I applied it across the website, portal and campaigns."
- Typos: "key conversations" to "key conversions", "to standout" to "to stand out", "websites postcode" to "website's postcode", "Impact &amp; Results:" to "Impact and results", "branding or homepage" to "homepage".

### Agent view (`agents-view.js`)

- Line 52 and the "Selected work" headings: use the new titles.
- Budibase entry: "near zero" to "zero" and "8-10" to "8–10 a month". Replace the "My research convinced the executive team..." blurb with the new homepage blurb. Delete "The company was pivoting toward AI-first automations." Replace "Redesign was backed by executives on user evidence" with "The redesign was already planned; the 25-user study shaped what it fixed".
- CityFibre entry: "90% uplift in homepage conversions after the rebrand" becomes "90% more postcode availability checks than the month before launch". Add "The brand identity was designed by another agency; Ben applied it across the website, portal and campaigns."

### Other pages' next-project cards

- `p4-product.html` (link to `budibase-automations.html`): title "Budibase automation complaints fell from 8–10 a month to zero".
- `mwl.html` (link to `p4-dam.html`): already correct.

### Check

From the repo root, search all `.html` and `.js` files, excluding `_compose/` and `file/cv-ai-generation/index-before-writing-whip.html`, for: `near zero`, `convinced`, `AI-first`, `lead designer at CityFibre`, `refinement`, `homepage conversions`, `8-10`, `—`. Each remaining hit must be correct in context: "AI-first" only where it says it came later, and `8-10` only inside `<!-- was: -->` comments.

## Phase 2: Homepage

**Status: done (2026-10-11).** Files: `index.html`, `agents-view.js`. Hero shortened to "Before that: Budibase and DawsonAndrews." after wrapping past three lines at 1024px.

### Hero

Replace the hero paragraph (keep the Perforce link):

> I'm a Product Designer at Perforce. I lead design on P4 DAM and P4 Plan, the asset management and planning tools studios like Electronic Arts and Xbox Game Studios use, and I ship features end-to-end with Claude Code. Before that I designed at Budibase, an open-source low-code startup, and DawsonAndrews, a product design agency.

If it wraps past three lines at 1024px wide, cut "Before that..." to "Before that: Budibase and DawsonAndrews."

### Cards

Every card has the same parts: tags (who, product, kind, year), an outcome headline, one or two sentences of what Ben did, and an outcome line. Keep the "Start here" badge on P4 DAM.

| Card | Headline | Description | Outcome line |
| --- | --- | --- | --- |
| P4 DAM | 25% more features with two front-end developers instead of six (keep) | Front-end capacity fell from six developers to two. I shipped production front end alongside them and set up agents that write the specs and handover for their AI tools. | Best Designed at the company's 2026 AI hackathon (keep) |
| Budibase | Budibase automation complaints fell from 8–10 a month to zero | Budibase is an open-source low-code tool for internal apps. I ran a 25-user study that shaped the planned redesign of its automation builder, so every step shows the data going in and out. | Budibase later built its AI agents feature on this structure (keep) |
| CityFibre | 90% more postcode checks after the CityFibre rebrand | At DawsonAndrews I led design on CityFibre's digital rebrand, applying the new brand across the website, portal, campaign landing pages and emails. | Helped DawsonAndrews win Hyperoptic and hire nine more people |

Then check the three cards at 1024px and 390px wide. If one card is much taller than the others, shorten its description, not its headline.

### Testimonials

Keep all three. In Brian DeVerter's quote, keep the second paragraph and cut the first (it is generic praise; the second names AI-enabled workflows, sharing knowledge and presenting). Do not change any words inside the quote you keep.

### Out of scope here

Thumbnails (Phase 5). The `noindex` tag (Ben's decision, leave the TODO).

## Phase 3: About page

**Status: superseded (2026-10-11).** Ben chose to revert `about.html` to its original personal content (all seven photos) and rename it **Life** (nav label on every page, h1, title, OG, meta description, Agent view). URL stays `about.html`. No career path, How I work or What I'm looking for on the page. DawsonAndrews title is Product Designer everywhere, including the CV.

The page is currently all personal life. Reviewers want career path and voice first, life second. Its meta description already promises a career path.

New order inside `<article class="personal-newsletter">`, reusing `personal-entry` sections:

1. **Header summary** (replace the current `project-summary` paragraph):
   > I'm a Product Designer in Carrickfergus, just up the coast from Belfast. I've spent seven years moving from agency to startup to enterprise software, and the part I like most is where design meets code. At Perforce I ship production front end rather than handing over screens. I organise team socials, lean extraverted, and work best with people who are curious and speak their mind.
2. **"Where I've worked"** section (new `h2`). One short paragraph per role, newest first, dates matching the CV exactly:
   - Perforce, Product Designer, September 2025 to present. Planning and digital asset management for games and media.
   - Budibase, Product Designer, July 2024 to July 2025. Open-source low-code for internal apps, automations and AI agents.
   - DawsonAndrews, July 2024 back to June 2021. Use the title Ben confirms (see open questions). Product design agency; CityFibre, GSMA, SportsWork.
   - Northern Ireland Civil Service, Product Designer, August 2019 to July 2020. Public sector digital services.
   - Ulster University, BDes (Hons) Interaction Design, First Class, 2017 to 2021.

   After the facts in each paragraph, add a TODO marker asking Ben for one sentence on what that role taught him or changed about how he works. Do not write those sentences for him.
3. **"How I work"** section (new `h2`):
   > I'd rather show working software than a stack of screens. I use Claude Code to build production UI and Claude skills to gather context and write specs, and I check everything it produces. On the P4 DAM lighting feature it picked the wrong components, so I rewrote the CSS by hand. Research comes first when the problem is unclear: at Budibase a 25-user study decided what the automations redesign had to fix.
4. **"What I'm looking for"** section: TODO marker only. Ben writes this. (Agent view has an unconfirmed line: "open to senior product design roles, including design systems and AI product work".)
5. **Life outside work**: keep the current "Outside work" paragraph, BJJ and Travel sections and their text as they are. Cut photos to three: `bangor-cafe-portrait.jpg`, `bjj-mats-portrait.jpg`, `lisbon-viewpoint.jpg`. Remove `dog-on-sofa.jpg`, `bjj-sparring.jpg`, `lisbon-alley.jpg` and `lisbon-pena-palace.jpg` from this page only (do not delete the files). Confirm the lightbox still steps through the remaining photos.

Update the About entry in `agents-view.js` to match.

## Phase 4: Case studies

**Status: done (2026-10-11).** Files: `p4-dam.html`, `budibase-automations.html`, `cityfibre-rebrand.html`, `agents-view.js`. TODO markers left for Ben's answers and missing visuals.

### Shared structure

Each case study follows this order. Headings are plain; subheadings (`h4`) are specific claims, like P4 DAM's "I worked in the real product code instead of screens".

1. Header: logo badge, `h1`, `project-summary-meta` line (Company, product · dates), three outcome stats.
2. **The problem**: the problem only, no results.
3. **My role and the team**: one short paragraph or list of who did what. Ben's part first, then the others.
4. **Key decisions**: two to four `h4` decisions. For each: what Ben chose, what he rejected or gave up, and why.
5. **What shipped**: visuals, each with a caption that says why it looks that way, not just what it is.
6. **The result**: outcomes and how they were measured.
7. **How I used AI**: tool, task, what it got wrong, what Ben changed. If no AI was used, say so in one line.
8. **Looking back**: what Ben would do differently.
9. Next-project card.

### P4 DAM (light edit)

- Move "We released 25% more features ... what we shipped." out of The problem and into the top of The result.
- Add **My role and the team**: "I designed features and shipped production front end. My PM set priorities and tracked feature output, using his own agentic system to pull feedback from the repository. The two front-end developers reviewed my code and built the rest. I built the skills and agents that write the specs and handovers."
- Turn Approach into **Key decisions**, keeping the three existing `h4`s. Add a TODO marker under "I worked in the real product code instead of screens" asking what Ben gave up by not working in Figma first.
- Move "Example feature" under **What shipped**. Add a TODO marker asking why he chose curated presets, how many there are, and what the default is.
- Keep Looking back and How I used AI. Move How I used AI above Looking back.
- Keep the existing TODO markers (spec excerpt, hackathon proof, PM quote, Claude CSS before and after).

### Budibase (medium edit)

- Add `<p class="project-summary-meta">Budibase, automation builder · 2025</p>` under the `h1`. Move the stats inside `project-header-stack` like P4 DAM if the markup allows without CSS changes; otherwise leave them where they are.
- Stats: (1) "0" with "Automation complaints a month after launch, down from 8–10"; (2) text stat "Agents" with "Budibase built its AI agents feature on the redesigned builder"; (3) "25" with "Users in the study that shaped the redesign".
- **Context** to **The problem**: rewrite Context in plain words. Keep: Budibase is open-source low-code for internal apps like customer portals and admin panels; customers can self-host; Ben was the in-house Product Designer and led the redesign of the automation builder. Remove "visual automation engine at the heart of the platform" and "enables businesses to rapidly build".
- **My role and the team**: Ben designed and ran the study, presented it to the CEO, CMO and Head of Engineering, and designed the redesign. Add a TODO marker asking who built it and who else was involved.
- **Key decisions**: rework "What the Research Said" and the shipped table into `h4` decisions:
  - "Every step shows the data going in and coming out": from the research finding on data visibility.
  - "A failed step explains itself": from the finding on unclear errors.
  - "Settings moved off the canvas into a sidebar".

  Under each, add a TODO marker asking what alternatives Ben considered and whether the design was tested or iterated.
- **What shipped**: keep the table, but rewrite the Benefit column in concrete terms:
  - Data in / data out: "People can see what a step received and returned, and trace a wrong value back to where it started."
  - Inline error logging: "A failed step says what broke, so people can fix it without asking on Discord."
  - New sidebar panel: "The canvas shows the flow; the selected step's settings live in one place."
  - Enhanced canvas: "Large workflows fit on screen and stay readable."

  Rewrite captions without "complete control and clarity" or "brings data and controls to the forefront".
- **The result**: merge "What Happened", "What It Led To" and "Outcome" into The result (complaints 8–10 a month to zero, with the Discord as the source) and one "What it led to" paragraph (agents built on the same structure, the email to classify to Jira example, failed steps you can inspect). Delete the Outcome section; it repeats the page.
- **How I used AI**: replace "At the time, I worked with ChatGPT and the AI tools available." with a TODO marker asking what ChatGPT was used for. If Ben says it was not used, write "I didn't use AI tools on this project."
- **Looking back**: TODO marker only.
- Keep "Also shipped" with its link.
- Add a TODO marker for the research slide under the research decision.

### CityFibre (rewrite)

Rewrite the body in Ben's voice from the confirmed facts. Delete "Design Process", "Final Solution" and "Conclusion" as they are now; their usable facts move into the new sections.

- Header stats: (1) "90%" with "More postcode availability checks than the month before launch"; (2) "15% to 5%" (text stat) with "Design tickets sent back by developers, before and after the new design system"; (3) text stat "Hyperoptic" with "New agency account the rebrand helped win".
- Add `<p class="project-summary-meta">CityFibre, via DawsonAndrews · 2024</p>`.
- **The problem**: CityFibre is the UK's second-largest fibre broadband infrastructure provider. It had a new brand from another agency and needed it working across every digital surface, standing apart from BT and Virgin Media, while staying accessible. The website's postcode checker is where people find out if they can get fibre.
- **My role and the team**: lead designer for CityFibre at DawsonAndrews. Another agency designed the identity. Ben applied it across the website, portal, campaign landing pages and emails, and built the Figma design system the developers worked from. Add a TODO marker asking who else was on the team.
- **Key decisions**:
  - "The design system matched the developers' CraftCMS and Tailwind setup": what was designed was what got built; design tickets sent back fell from about 15% to about 5%.
  - "The neon palette had to pass AA contrast": add a TODO marker asking how Ben made the neon colours pass (which pairings, what he changed).
  - "The postcode checker got [what changed]": TODO marker asking what changed in the checker. This is where the 90% came from, and the page never shows it.
- **What shipped**: keep the three images. Captions: homepage comparison "The old and new CityFibre homepage."; brand image as set in Phase 1; collage "The new brand across the website and campaign landing pages."
- **The result**: 90% more postcode checks than the month before launch. Design tickets sent back fell from about 15% to 5%. The work helped DawsonAndrews win Hyperoptic, grow from a small to a medium-sized agency, and hire nine more people.
- **How I used AI**: TODO marker asking Ben. Most likely "I didn't use AI tools on this project."
- **Looking back**: TODO marker only.
- Keep the next-project card to the CityFibre workshop.

## Phase 5: Thumbnails and visuals

**Status: done (2026-10-11).** Created `bb-automations-thumbnail-v2.png` and `rebrand-thumbnail-v2.jpg`; wired into homepage, OG, next-project cards. P4 DAM pale thumbnail left unchanged. Old thumbnails kept as backups.

Ben approves every crop before it replaces a file. Save new files beside the old ones, never over them.

- **Budibase thumbnail**: crop the data in / data out area from `img/project-image/bb-automations/builder-after.png` (5650×2600) to 880×511, saved as `img/thumbnail/bb-automations-thumbnail-v2.png`. Use `_compose\ffmpeg\ffmpeg.exe` with `-vf "crop=W:H:X:Y,scale=880:511"`. Look at the source image first and choose a crop where the tabs are readable at card size.
- **CityFibre thumbnail**: crop the new homepage half of `img/project-image/cityfibre-rebrand/cf-rebrand-2.jpg` (2640×1350) to 880×511, saved as `img/thumbnail/rebrand-thumbnail-v2.jpg`.
- **P4 DAM thumbnail**: the homepage TODO says it is the palest. Do not change it without Ben.
- After Ben approves, point the homepage cards, `og:image` tags and next-project cards at the new files. Remove the matching homepage TODO markers.
- Assets only Ben can supply (leave their TODO markers until he does):
  - **P4 DAM spec excerpt**: a screenshot of part of a real spec or handover file his skills generate, with customer names, internal links and unreleased features blurred or replaced.
  - **Hackathon proof**: a photo or screenshot of the Best Designed award.
  - **Budibase research slide**: one page from the findings PDF, ideally the top frustrations from the 25 users.
  - **CityFibre postcode checker**: before and after screens.

## Phase 6: CV, LinkedIn and deploy

**Status: CV copy + PDF export done (2026-10-11).** LinkedIn check and deploy are Ben's.

- Use the `edit-cv` skill. Change the Perforce bullet "cut review times in half" to "halved planning meeting time per feature" so it matches the case study. Then follow the skill's export steps. **Done.**
- Ben checks LinkedIn against the final pages: titles, dates, the nine hires, Budibase "zero", the CityFibre 90% definition.
- Ben deploys. The live site at benturner.work still shows the old five-card homepage.

## Open questions for Ben

**Answered 2026-10-11 and applied**, except: P4 DAM 6 (Figma trade-off) and 7 (lighting presets), and the task ChatGPT helped with on Budibase (10). Those three are still TODO markers. Question 13 (neon AA) was dropped. Confidential items (spec files, Claude CSS, hackathon proof, quotes, research slides) will not be shown, and their TODOs were removed. `noindex` stays on purpose.

**Career and about**

1. Your DawsonAndrews title: the CV says UX Designer, Agent view says Product Designer, and `claims.md` says "UX II/I". Which goes on the About page?
2. Should freelance work (LoyalBe, the Australian law firm) appear in the career path?
3. One sentence per role on what it taught you or changed about how you work.
4. What kind of role you're looking for next.

**P4 DAM**

5. What counts as a "feature" in the 25%, and which quarters were compared?
6. What did you give up by working in code instead of Figma first?
7. Why curated lighting presets, how many, and what's the default?

**Budibase**

8. Who built the redesign, and who else was involved?
9. What alternatives did you consider for showing step data? Was the redesign tested or iterated before launch?
10. What did you use ChatGPT for, if anything?
11. What would you do differently?

**CityFibre**

12. What changed in the postcode checker?
13. How did you make the neon palette pass AA?
14. Who else was on the team?
15. What would you do differently?
