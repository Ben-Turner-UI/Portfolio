# Olympus — CRO & Design Critique

**Subject:** `side-projects/olympus.html` (full landing page)  
**Lens:** Visual/structural design + first-time-user friction  
**Tone:** Co-founder direct. No compliments as filler.

---

## PASS 1 — Visual & Structural

### What's broken at a glance
- **No primary CTA in the hero.** Linear, Superhuman, Vercel, Raycast — every one of them puts the money action in the first viewport. Olympus puts a headline, a paragraph, and a pretty watch. That is a brochure, not a product page.
- **The only buy CTA is buried under the fold** in the Creator's Toolkit section — and it sells a secondary product (design toolkit), not the watch faces. Your core product (faces → Facer install) has no hero presence.
- **Brand is weak in the hero.** Nav says "OLYMPUS WATCH FACES." Headline says "Designed to be worn. Engineered to endure." Remove the nav and this could be any premium wearable brand. The report sells *Olympus as a brand*; the hero sells a tagline.
- **Typography hierarchy is flat.** Section titles (`About Olympus`, `Watch Faces`, `The Creator's Toolkit`) are styled like the hero — same weight family, similar scale — so the page reads as three equally loud chapters instead of one conversion path.
- **Card grid is decorative, not decisive.** Three equal kit cards with similar paragraph density. Eye has nowhere to land. No card is the "do this next" card.
- **Green diagonal stripe + neon bottom glow** compete with the product. Atmosphere is fine; right now it reads as the main visual idea. The watch should own the frame.
- **Kit card copy is AI-slop adjacent.** "ultimate presentation," "stunning realism," "streamline your entire design process" — empty intensifiers. Linear would never ship that.

### Spacing / consistency
- Hero content is constrained to 1000px while the panel is full-bleed — good. Internal padding and gap rhythm are mostly coherent.
- About cards and kit cards share radius (good). But about cards are text-only surfaces while kit cards are media+text — same chrome, different jobs. Looks like one system doing two things poorly.
- Buttons (`Install on Facer`, `Buy the Creator's Toolkit`) share style, so primary install and secondary purchase are visually identical. That's a conversion crime.

---

## PASS 2 — Friction & Cognitive Load (First-Time User)

### Mental model failure
User lands. Asks: *What is this? What do I do?*

1. **What is Olympus?** A brand? A face pack? A Facer listing? A student project? The page never commits in one sentence before the fold.
2. **Am I the buyer?** Sports user? Designer? Both? Hero says heritage + battery. Toolkit section suddenly pitches Photoshop/Sketch creators. Two audiences, one funnel, zero segmentation → both bounce.
3. **Where do I get a face?** Scroll past About (process essay), arrive at Watch Faces, pick a dial, click Install → external Facer. Fine — but that path is not announced up top. First CTA they *see* may be "Buy the Creator's Toolkit" if they skim. Wrong product sold first.
4. **Foundations has a disabled Install button.** Dead end in the product grid. Looks broken. Trust dies.
5. **About section is process memoir** ("Sketch's rotate copies tool"). First-time buyers don't care about your toolchain. They care: does it look good on *my* watch, and how do I get it.
6. **No price, no social proof, no "works with [watch]" badge near CTA.** Compatibility is buried in body copy. CRO death: claim without confirmation next to the action.
7. **Nav is a logo that links to itself.** No Watch Faces / Toolkit / Install anchors. On a long page, that's stranding the user.

### Eye path
Hero watch wins visually (good). Then eye drops into a wall of About prose. Then faces. Then toolkit buy. The conversion path is inverted: story → product → upsell, with the upsell having the strongest CTA chrome.

---

## Priority backlog

### 1. Critical — fix immediately (breaks flow or kills conversion)

| # | Issue | Fix |
|---|--------|-----|
| C1 | **Hero has zero CTA** | Add one primary action in the first viewport: `Browse faces` (anchor to `#watch-faces`) or `Install on Facer` for the featured face. Secondary text link for Toolkit is fine; primary must be faces. |
| C2 | **Wrong product is the loudest CTA** | Demote Toolkit buy. Promote face install. Toolkit is upsell for designers; faces are the product for wearers. |
| C3 | **Hero doesn't name the product job** | Rewrite so the first 3 seconds answer: *premium circular watch faces for Wear OS / Facer.* Tagline can stay; product sentence cannot be optional. |
| C4 | **Foundations Install is disabled with no explanation** | Either ship a link, mark "Coming soon" clearly, or remove it from the buyable set until live. A greyed Install button reads as broken. |
| C5 | **Two audiences, one undifferentiated page** | Pick a primary visitor (wearer installing faces). Move creator/toolkit pitch below faces, labeled as such. Or split paths: "For your wrist" / "For designers." |

### 2. High Impact — clarity and polish

| # | Issue | Fix |
|---|--------|-----|
| H1 | **About section is too long and too "making of"** | Cut to 2–3 benefit bullets: battery (AMOLED black), outdoor readability, 20+ circular devices. Move Sketch/Cinema4D lore to a journal / case study page. |
| H2 | **Primary vs secondary button styles are identical** | Primary = Install / Browse faces. Secondary / ghost = Buy Toolkit. Contrast must encode priority. |
| H3 | **No in-page nav** | Add 3 links: Faces, Toolkit, About (or drop About from nav). Logo alone is not navigation. |
| H4 | **Compatibility is buried** | Put a single line under hero CTA: `Works with 20+ circular Wear OS watches via Facer.` Specificity converts; heritage lists don't. |
| H5 | **Kit card copy is fluff** | Rewrite each card to one concrete outcome + one proof (e.g. "10+ mockups · PS + Sketch"). Kill "ultimate / stunning / immersive." |
| H6 | **Featured faces: make the default CTA obvious** | Ensure the featured stage always shows one clear Install button above the fold of that section; thumbnails are secondary. |
| H7 | **Brand missing from hero headline** | Either lead with Olympus or put the wordmark at hero scale. Right now brand lives only in a 16px nav lockup. |
| H8 | **Page title is just "Olympus"** | Use something searchable/clear: `Olympus — Premium watch faces for Wear OS`. |

### 3. Nice to Have — subtle refinements

| # | Issue | Fix |
|---|--------|-----|
| N1 | Green stripe + edge glow fight the product | Soften opacity or confine atmosphere to bottom 20% so the dial remains the hero. |
| N2 | Hero lead still stacks three ideas (heritage + battery + devices) | One supporting sentence. Move heritage to About. |
| N3 | Equal-weight section headings | Reduce About / Toolkit heading scale; keep Faces as the content climax. |
| N4 | Toolkit "car showroom" metaphor | Clever in the report; on-page it's one clause too cute. Prefer "Present faces in studio-grade 3D." |
| N5 | Footer is a dead end | Add Faces + Toolkit + Facer profile links. |
| N6 | `noindex` on the page | Fine for WIP; remove before any real traffic or Gumroad push. |
| N7 | jQuery from Google CDN for almost nothing | Drop if unused; fewer moving parts. |
| N8 | Mobile: confirm Install buttons are full-width and thumb-reachable | Already partially handled — verify featured Install isn't trapped beside the dial on small screens. |

---

## Conversion thesis (one paragraph)

Olympus should convert **wearers** to **Install on Facer**, and secondarily convert **designers** to **Buy the Toolkit**. Today the page converts neither efficiently: the hero is brand poetry without an action, the middle is a process essay, and the only purchase button sells the toolkit. Fix the hero CTA and audience order first. Everything else is polish on a leaking bucket.

---

## Suggested hero rewrite (directional, not sacred)

**Headline:** Olympus. Premium faces for circular watches.  
**Sub:** All-day battery. Outdoor-readable. Install on Facer in seconds.  
**Primary CTA:** Browse faces  
**Secondary:** Creator's Toolkit  

If you want the poetic line, use it as an eyebrow or second line — never as a substitute for the product sentence.
