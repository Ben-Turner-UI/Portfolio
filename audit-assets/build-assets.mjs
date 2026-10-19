#!/usr/bin/env node
/**
 * build-assets.mjs - builds the proposed assets for benturner.work.
 *
 *   npm install            (sharp is the only dependency)
 *   node build-assets.mjs                    build everything and write manifest.json
 *   node build-assets.mjs optimise <in> <out>  make AVIF/WebP + srcset snippets from your original images
 *
 * Everything on screen comes from facts already on the site (read 2026-10-17). Items the site does not state are
 * marked [CONFIRM]. The brand font and colours could not be extracted from the site CSS (the page reader could not
 * see it), so the tokens below are neutral placeholders: change CFG.font and CFG.colours and rebuild.
 */
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SITE = 'https://benturner.work';

// ---------------------------------------------------------------- tokens (edit these)
const CFG = {
  name: 'Ben Turner',
  title: 'Product Designer', // matches your formal title; "I lead design on P4 DAM and P4 Plan" carries the leadership
  font: "Inter, 'Helvetica Neue', Arial, sans-serif", // placeholder: site font not extractable
  c: { surface: '#fcfcfb', ink: '#0b0b0b', ink2: '#52514e', accent: '#104281', soft: '#e4effc', rule: '#d9d8d1', warn: '#8a4b00' },
  availability: 'Open to senior product design roles', // confirmed by Ben 18 Oct 2026: actively looking, hybrid or remote, 37 days' notice
};
const C = CFG.c;

// ---------------------------------------------------------------- helpers
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const mk = (d) => fs.mkdir(path.join(HERE, d), { recursive: true });

/** Greedy word wrap using an average glyph width factor (Inter bold is about 0.58em, regular about 0.54em). */
function wrap(str, maxPx, size, factor = 0.56) {
  const maxChars = Math.max(4, Math.floor(maxPx / (size * factor)));
  const lines = [];
  let line = '';
  for (const w of String(str).split(/\s+/)) {
    if (!line) line = w;
    else if ((line + ' ' + w).length <= maxChars) line += ' ' + w;
    else { lines.push(line); line = w; }
  }
  if (line) lines.push(line);
  return lines;
}
const tspans = (lines, x, lh) => lines.map((l, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : lh}">${esc(l)}</tspan>`).join('');
const T = (x, y, s, { size = 24, weight = 400, fill = C.ink, anchor = 'start', ls = 0 } = {}) =>
  `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}"${ls ? ` letter-spacing="${ls}"` : ''}>${esc(s)}</text>`;
const para = (x, y, lines, { size, weight = 400, fill = C.ink, lh, anchor = 'start', ls = 0 }) =>
  `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}"${ls ? ` letter-spacing="${ls}"` : ''}>${tspans(lines, x, lh)}</text>`;
const doc = (w, h, title, desc, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-labelledby="t d" font-family="${esc(CFG.font)}"><title id="t">${esc(title)}</title><desc id="d">${esc(desc)}</desc><rect width="${w}" height="${h}" fill="${C.surface}"/>${body}</svg>\n`;
const metricSize = (s) => (s.length <= 5 ? 240 : s.length <= 9 ? 170 : 128);

const manifest = [];
async function write(rel, data) {
  const p = path.join(HERE, rel);
  await fs.mkdir(path.dirname(p), { recursive: true });
  await fs.writeFile(p, data);
  return (await fs.stat(p)).size;
}
async function record(rel, { w, h, format, alt, fills, snippet, notes = '', confirm = false }) {
  const bytes = (await fs.stat(path.join(HERE, rel))).size;
  manifest.push({ path: rel, width: w, height: h, format, bytes, alt, fills, snippet, notes, confirm_before_use: confirm });
}

// ---------------------------------------------------------------- Open Graph images (1200x630)
const OG = [
  { id: 'home', page: '/', kicker: '', headline: CFG.name, sub: `${CFG.title}`, line3: 'I lead design on P4 DAM and P4 Plan at Perforce.', alt: `${CFG.name}, ${CFG.title}. I lead design on P4 DAM and P4 Plan at Perforce.`, confirm: false,
    title: `${CFG.name} | ${CFG.title}, enterprise software`, note: 'Uses the hero sentence from the home page.' },
  { id: 'about', page: '/about', kicker: 'About', headline: `About ${CFG.name}`, sub: `${CFG.title} based in Carrickfergus, Northern Ireland`, line3: '', alt: `About ${CFG.name}, ${CFG.title}, based in Carrickfergus, Northern Ireland.`, confirm: false, note: 'Assumes the About page is rebuilt with career history (POS-05).' },
  { id: 'p4-dam', page: '/p4-dam', kicker: 'Perforce, 2026', headline: '25% more features with a third of the front-end team', metric: '+25%', metricLabel: 'more features than six months earlier, a rough count per my PM\'s tracking', alt: 'Perforce, 2026. 25% more features with a third of the front-end team. +25% more features than six months earlier, a rough count per my PM\'s tracking.', confirm: false, note: 'Headcount in the headline has not been confirmed with your manager (CS-02). Your call.' },
  { id: 'budibase-automations', page: '/budibase-automations', kicker: 'Budibase, 2025', headline: 'Automation complaints from 8 to 10 a month to zero', metric: '8-10 to 0', metricLabel: 'complaints a month on the community Discord, still zero three months on', alt: 'Budibase, 2025. Automation complaints from 8 to 10 a month to zero on the community Discord, still zero three months later.', confirm: false, note: 'Window now stated: zero within a month, still zero after three.' },
  { id: 'cityfibre', page: '/cityfibre', kicker: 'DawsonAndrews, 2024', headline: 'Portal satisfaction doubled and postcode checks rose 90%', metric: '+90%', metricLabel: 'more postcode checks than the month before launch', alt: 'DawsonAndrews, 2024. Portal satisfaction doubled and postcode checks rose 90% compared with the month before launch.', confirm: false, note: 'Uses the home-page card headline. The 90% is a before-and-after comparison, counted with a Google Analytics flag.' },
  { id: 'olympus', page: '/side-projects/olympus', kicker: 'Side project', headline: 'Olympus: watch faces and creator tools', sub: 'Watch faces for Galaxy Gear and other smartwatches, plus assets for other watch UI creators', alt: 'Olympus, a side project by Ben Turner: watch faces and creator tools for Galaxy Gear and other smartwatches.', confirm: false, note: 'Page currently has no social tags at all (SEO-04).' },
];

function ogSvg(o) {
  const pad = 72;
  let b = '';
  if (o.kicker) b += T(pad, 112, o.kicker, { size: 26, weight: 600, fill: C.accent });
  const hasMetric = !!o.metric;
  const hw = hasMetric ? 640 : 1056;
  const hs = o.id === 'home' ? 104 : hasMetric ? 54 : 62;
  const lines = wrap(o.headline, hw, hs, 0.585);
  const lh = Math.round(hs * 1.14);
  const top = o.kicker ? 196 : 210;
  b += para(pad, top, lines, { size: hs, weight: 700, lh, ls: -hs * 0.02 });
  let y = top + lh * (lines.length - 1) + 64;
  if (o.sub) {
    const sl = wrap(o.sub, hw, 34, 0.54);
    b += para(pad, y, sl, { size: 34, weight: 500, fill: C.ink2, lh: 44 });
    y += 44 * sl.length + 6;
  }
  if (o.line3) {
    const l3 = wrap(o.line3, hw, 28, 0.54);
    b += para(pad, y + 12, l3, { size: 28, fill: C.ink2, lh: 38 });
  }
  if (hasMetric) {
    const ms = metricSize(o.metric) * (o.metric.length <= 5 ? 0.62 : 0.5);
    b += T(1200 - pad, 330, o.metric, { size: Math.round(ms), weight: 700, fill: C.accent, anchor: 'end', ls: -ms * 0.03 });
    b += para(1200 - pad, 330 + 46, wrap(o.metricLabel, 380, 26, 0.54), { size: 26, fill: C.ink2, lh: 34, anchor: 'end' });
  }
  b += `<line x1="${pad}" y1="532" x2="${1200 - pad}" y2="532" stroke="${C.rule}" stroke-width="2"/>`;
  b += T(pad, 580, `${CFG.name}, ${CFG.title}`, { size: 26, weight: 600, fill: C.ink2 });
  b += T(1200 - pad, 580, 'benturner.work', { size: 26, fill: C.ink2, anchor: 'end' });
  return doc(1200, 630, `${o.id} social card`, o.alt, b);
}

async function buildOg() {
  for (const o of OG) {
    const svg = ogSvg(o);
    const base = `og/${o.id}`;
    await write(`og/_src/${o.id}.svg`, svg);
    let buf = await sharp(Buffer.from(svg)).png({ compressionLevel: 9, palette: true }).toBuffer();
    let ext = 'png';
    if (buf.length > 300 * 1024) { buf = await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toBuffer(); ext = 'jpg'; }
    await write(`${base}.${ext}`, buf);
    const url = `${SITE}/img/og/${o.id}.${ext}`;
    const snippet = [
      `<meta property="og:image" content="${url}">`,
      `<meta property="og:image:width" content="1200">`,
      `<meta property="og:image:height" content="630">`,
      `<meta property="og:image:alt" content="${esc(o.alt)}">`,
      `<meta name="twitter:card" content="summary_large_image">`,
      `<meta name="twitter:image" content="${url}">`,
    ].join('\n');
    await record(`${base}.${ext}`, { w: 1200, h: 630, format: ext.toUpperCase(), alt: o.alt, fills: `Open Graph and Twitter image for ${o.page}${o.id === 'home' ? ' (replaces og:image /img/thumbnail/p4-dam.jpg)' : ''}. Copy to /img/og/.`, snippet, notes: o.note, confirm: o.confirm });
  }
}

// ---------------------------------------------------------------- case study covers (1600x900, typographic)
const COVERS = [
  { id: 'p4-dam', kicker: 'Perforce, 2026', headline: '25% more features with a third of the front-end team', metric: '+25%', label: 'more features than six months earlier, roughly', alt: 'Typographic cover for the P4 DAM case study: 25% more features with a third of the front-end team.' },
  { id: 'budibase-automations', kicker: 'Budibase, 2025', headline: 'Automation complaints from 8 to 10 a month to zero', metric: '8-10 to 0', label: 'complaints a month on the community Discord', alt: 'Typographic cover for the Budibase case study: automation complaints from 8 to 10 a month to zero.' },
  { id: 'cityfibre', kicker: 'DawsonAndrews, 2024', headline: 'Portal satisfaction doubled and postcode checks rose 90%', metric: '4/10 to 8/10', label: 'B2B portal satisfaction, across every section', alt: 'Typographic cover for the CityFibre case study: portal satisfaction doubled and postcode checks rose 90%.' },
];
function coverSvg(c) {
  const pad = 96;
  let b = T(pad, 130, c.kicker, { size: 32, weight: 600, fill: C.accent });
  const lines = wrap(c.headline, 980, 84, 0.585);
  b += para(pad, 250, lines, { size: 84, weight: 700, lh: 96, ls: -2 });
  const ms = metricSize(c.metric) * 0.95;
  b += `<line x1="${pad}" y1="640" x2="${1600 - pad}" y2="640" stroke="${C.rule}" stroke-width="2"/>`;
  b += T(pad, 780, c.metric, { size: Math.round(ms * 0.62), weight: 700, fill: C.accent, ls: -3 });
  b += para(1600 - pad, 735, wrap(c.label, 520, 34, 0.54), { size: 34, fill: C.ink2, lh: 44, anchor: 'end' });
  return doc(1600, 900, `${c.id} cover`, c.alt, b);
}
async function buildCovers() {
  for (const c of COVERS) {
    const svg = coverSvg(c);
    await write(`covers/_src/${c.id}-cover-typographic.svg`, svg);
    for (const w of [1600, 800, 400]) {
      const h = Math.round((w * 9) / 16);
      for (const [ext, fn] of [['webp', (s) => s.webp({ quality: 86 })], ['jpg', (s) => s.jpeg({ quality: 88, mozjpeg: true })]]) {
        const rel = `covers/${c.id}-cover-typographic-${w}.${ext}`;
        await write(rel, await fn(sharp(Buffer.from(svg)).resize(w, h)).toBuffer());
        const snippet = w === 1600 && ext === 'webp'
          ? `<picture>\n  <source type="image/webp" srcset="/img/covers/${c.id}-cover-typographic-400.webp 400w, /img/covers/${c.id}-cover-typographic-800.webp 800w, /img/covers/${c.id}-cover-typographic-1600.webp 1600w" sizes="(min-width: 1100px) 1056px, 100vw">\n  <img src="/img/covers/${c.id}-cover-typographic-1600.jpg" srcset="/img/covers/${c.id}-cover-typographic-400.jpg 400w, /img/covers/${c.id}-cover-typographic-800.jpg 800w, /img/covers/${c.id}-cover-typographic-1600.jpg 1600w" sizes="(min-width: 1100px) 1056px, 100vw" width="1600" height="900" alt="${esc(c.alt)}" fetchpriority="high" decoding="async">\n</picture>`
          : 'See the 1600 WebP entry for the full <picture> snippet.';
        await record(rel, { w, h, format: ext.toUpperCase(), alt: c.alt, fills: `Hero cover for /${c.id}. Typographic: REPLACE with a real product screenshot when one is cleared for publication. Copy to /img/covers/.`, snippet, notes: 'Typographic stand-in. No product screenshots were available.', confirm: true });
      }
    }
  }
}

// ---------------------------------------------------------------- metric cards (1200x675, SVG + PNG)
const METRICS = [
  { id: 'p4-front-end-capacity', src: 'Perforce, 2026. P4 DAM', n: '6 to 2', label: 'Front-end developers on the product', note: 'As stated on the case study. Not yet confirmed with your manager.', alt: 'Front-end developers on P4 DAM: from 6 to 2.', cs: 'CS-02' },
  { id: 'p4-features-vs-six-months-earlier', src: 'Perforce, 2026. P4 DAM', n: '+25%', label: 'More features: about 10 before, about 12 to 13 since', note: "A rough count per my PM's tracking. Feature size varies.", alt: "About 25% more features: about 10 before, about 12 to 13 since, a rough count per the PM's tracking.", cs: '' },
  { id: 'p4-planning-meeting', src: 'Perforce, 2026. P4 DAM', n: '30 min', label: 'Planning meeting per feature, down from about 1 hr', note: 'My estimate from experience, not a timed measure', alt: 'Planning meeting per feature: about 30 minutes, down from about 1 hour, by my own estimate.', cs: '' },
  { id: 'p4-hackathon', src: 'Perforce, 2026. P4 DAM', n: 'Best Designed', label: 'Won among eight UK teams at the 2026 AI hackathon', note: 'At least three product teams use the skill or its systems', alt: 'Won Best Designed among eight UK teams at the 2026 AI hackathon. At least three product teams use the skill or the systems from it.', cs: '' },
  { id: 'budibase-complaints', src: 'Budibase, 2025. Automations', n: '8-10 to 0', label: 'Complaints a month on the community Discord', note: 'Zero within a month, still zero after three. No post-launch test.', alt: 'Complaints a month on the Budibase community Discord: from 8 to 10 to zero within a month, and still zero three months later.', cs: '' },
  { id: 'budibase-study-size', src: 'Budibase, 2025. Automations', n: '25', label: 'Active users in the paid research study that shaped the redesign', note: 'Paid Maze study', alt: 'A paid research study with 25 active Budibase users shaped the redesign.', cs: '' },
  { id: 'cityfibre-postcode-checks', src: 'DawsonAndrews, 2024. CityFibre', n: '+90%', label: 'More postcode checks than the month before launch', note: 'Google Analytics flag. The launch also shipped the new brand.', alt: '90% more postcode checks than the month before launch, counted with a Google Analytics flag.', cs: '' },
  { id: 'cityfibre-portal-satisfaction', src: 'DawsonAndrews, 2024. CityFibre', n: '4/10 to 8/10', label: 'B2B portal satisfaction, re-tested with the same 40 users', note: 'As stated on the case study', alt: 'B2B portal satisfaction rose from 4 out of 10 to 8 out of 10 when the same 40 users re-tested.', cs: '' },
  { id: 'cityfibre-design-send-backs', src: 'DawsonAndrews, 2024. CityFibre', n: '15% to 5%', label: 'Design tickets sent back by developers', note: 'As stated on the case study', alt: 'Design tickets sent back by developers fell from 15% to 5%.', cs: '' },
  { id: 'cityfibre-referral', src: 'DawsonAndrews, 2024. CityFibre', n: 'Hyperoptic', label: 'A new client for the agency, referred by a senior CityFibre contact', note: 'Built through the relationship, as stated on the case study', alt: 'A senior CityFibre contact referred Hyperoptic to DawsonAndrews, built through the working relationship.', cs: '' },
];
function metricSvg(m) {
  const pad = 72;
  let b = T(pad, 104, m.src, { size: 26, weight: 600, fill: C.accent });
  const s = metricSize(m.n);
  b += T(pad, 130 + s * 0.78, m.n, { size: s, weight: 700, fill: C.accent, ls: -s * 0.03 });
  const ll = wrap(m.label, 1000, 40, 0.54);
  b += para(pad, 130 + s * 0.78 + 78, ll, { size: 40, weight: 500, lh: 52 });
  b += `<line x1="${pad}" y1="590" x2="${1200 - pad}" y2="590" stroke="${C.rule}" stroke-width="2"/>`;
  b += T(pad, 634, m.note, { size: 24, fill: C.ink2 });
  b += T(1200 - pad, 634, 'benturner.work', { size: 24, fill: C.ink2, anchor: 'end' });
  return doc(1200, 675, `${m.id} metric card`, m.alt, b);
}
async function buildMetrics() {
  for (const m of METRICS) {
    const svg = metricSvg(m);
    await write(`metric-cards/${m.id}.svg`, svg);
    await write(`metric-cards/${m.id}.png`, await sharp(Buffer.from(svg)).png({ compressionLevel: 9, palette: true }).toBuffer());
    for (const ext of ['svg', 'png']) {
      await record(`metric-cards/${m.id}.${ext}`, { w: 1200, h: 675, format: ext.toUpperCase(), alt: m.alt,
        fills: `Optional stat image for the metric on ${m.src}. Shows only what the site states.`,
        snippet: `<img src="/img/metrics/${m.id}.${ext}" width="1200" height="675" alt="${esc(m.alt)}" loading="lazy" decoding="async">`,
        notes: m.cs ? `Definition incomplete on the page: see ${m.cs}. Do not publish until baseline, period and method are added.` : 'Figure and label as on the case study.', confirm: !!m.cs });
    }
  }
}

// ---------------------------------------------------------------- diagrams
// Boxes size themselves from the wrapped text, so nothing can overflow. Wrap factors are deliberately generous.
const BOX_PAD = 16, TITLE_LH = 27, BODY_LH = 25;
function layoutBox(w, title, body) {
  const tl = wrap(title, w - 2 * BOX_PAD, 22, 0.6);
  const bl = body ? wrap(body, w - 2 * BOX_PAD, 19, 0.56) : [];
  const h = 34 + TITLE_LH * (tl.length - 1) + (bl.length ? 28 + BODY_LH * (bl.length - 1) : 0) + 18;
  return { tl, bl, h };
}
const boxH = (w, title, body) => layoutBox(w, title, body).h;
function box(x, y, w, h, title, body, { fill = '#f4f4f1', stroke = C.rule, titleFill = C.ink } = {}) {
  const { tl, bl } = layoutBox(w, title, body);
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
  s += para(x + BOX_PAD, y + 34, tl, { size: 22, weight: 700, fill: titleFill, lh: TITLE_LH });
  if (bl.length) s += para(x + BOX_PAD, y + 34 + TITLE_LH * (tl.length - 1) + 28, bl, { size: 19, fill: C.ink2, lh: BODY_LH });
  return s;
}
/** Stack boxes vertically in one column. Returns the svg and the y of the bottom edge. */
function stack(x, y0, w, items, gap = 14, opts = () => ({})) {
  let y = y0, s = '';
  items.forEach(([t, d], i) => { const h = boxH(w, t, d); s += box(x, y, w, h, t, d, opts(i)); y += h + gap; });
  return { svg: s, bottom: y - gap };
}
const arrow = (x1, y1, x2, y2) => {
  const a = Math.atan2(y2 - y1, x2 - x1), h = 10;
  const p = (ang) => `${x2 - h * Math.cos(a - ang)},${y2 - h * Math.sin(a - ang)}`;
  return `<line x1="${x1}" y1="${y1}" x2="${x2 - 2 * Math.cos(a)}" y2="${y2 - 2 * Math.sin(a)}" stroke="${C.ink2}" stroke-width="2.5"/><polygon points="${x2},${y2} ${p(0.45)} ${p(-0.45)}" fill="${C.ink2}"/>`;
};
const CONFIRM_H = 28;
const confirmTag = (x, y, s) => `<rect x="${x}" y="${y}" width="${Math.round(s.length * 9.6 + 20)}" height="${CONFIRM_H}" rx="5" fill="#fff4e0" stroke="${C.warn}" stroke-width="1.5"/>${T(x + 10, y + 20, s, { size: 17, weight: 700, fill: C.warn })}`;
const head = (x, y, s) => T(x, y, s, { size: 22, weight: 700, fill: C.accent });

function diagramP4() {
  const W = 1200;
  let b = T(48, 56, 'What changed on P4 DAM, as stated on the case study', { size: 28, weight: 700 });
  b += T(48, 88, 'Facts only. The page does not claim the response alone caused each result. Headcount not yet confirmed with your manager.', { size: 18, fill: C.ink2 });
  const cols = [
    ['Constraint', [['Front-end capacity fell', 'From 6 developers to 2 on the product.'], ['No way to add people', 'We could not hire or bring in other teams.']]],
    ['Response', [['Shipped production front end', 'Pushed to branches, took code review, matched the senior developers\' standards.'], ['Built Claude skills and agents', 'They write spec files, handover documents and a UI snapshot file.']]],
    ['Results, as stated', [['+25% more features', 'About 10 before, about 12 to 13 since, per my PM\'s tracking.'], ['Planning meeting 1 hr to 30 min', 'Per feature, by my estimate.'], ['Best Designed, 2026 AI hackathon', 'Among eight UK teams. At least three product teams use it.']]],
  ];
  const cw = 336, gap = 48, x0 = 48;
  let bottom = 0;
  cols.forEach(([hd, items], i) => {
    const x = x0 + i * (cw + gap);
    b += head(x, 142, hd);
    const st = stack(x, 164, cw, items, 14, () => (i === 2 ? { fill: C.soft } : {}));
    b += st.svg; bottom = Math.max(bottom, st.bottom);
    if (i < 2) b += arrow(x + cw + 8, 164 + boxH(cw, items[0][0], items[0][1]) / 2, x + cw + gap - 8, 164 + boxH(cw, items[0][0], items[0][1]) / 2);
  });
  return doc(W, bottom + 40, 'P4 DAM: capacity change, response and results', 'Three columns: the front-end capacity constraint, what was done in response, and the results stated on the case study.', b);
}

function diagramWorkflow() {
  const steps = [
    ['Gather context with my PM', 'A fixed set of questions on a live call. My PM\'s agentic system pulls feedback from the repository.', ''],
    ['Capture the answers', 'Notes go into note-taking apps. A Claude skill turns the call transcript into structured data.', ''],
    ['Write a spec file an AI can use', 'More context up front means features are delivered faster.', ''],
    ['Build in the real product code', 'Push to branches, take code review, match the standards of the senior developers.', '[CONFIRM] how Claude Code is used in this step: what you ask it to do and how you check its output'],
    ['Generate the handover', 'Skills and agents write spec files, handover documents and a snapshot file that captures the UI in every state.', '[CONFIRM] how the snapshot file is generated'],
    ['Developers build from it', 'The developers\' own AI tools can build from those files. The two front-end developers review my code and build the rest.', ''],
    ['Plan in about 30 minutes', 'Planning meeting per feature, down from about an hour.', ''],
  ];
  const W = 1200, GAP = 26;
  let b = T(48, 56, 'How I ship design to production', { size: 30, weight: 700 });
  b += T(48, 88, 'Built only from what the P4 DAM case study says. Items marked [CONFIRM] are not described on the site.', { size: 18, fill: C.ink2 });
  let y = 120;
  steps.forEach(([t, d, c], i) => {
    const dl = wrap(d, 960, 20, 0.58);
    const h = 54 + 26 * (dl.length - 1) + 8 + (c ? CONFIRM_H + 12 : 0);
    if (i < steps.length - 1) b += `<line x1="76" y1="${y + 50}" x2="76" y2="${y + h + GAP - 2}" stroke="${C.rule}" stroke-width="3"/>`;
    b += `<circle cx="76" cy="${y + 26}" r="22" fill="${C.accent}"/>` + T(76, y + 34, i + 1, { size: 22, weight: 700, fill: '#ffffff', anchor: 'middle' });
    b += T(124, y + 24, t, { size: 26, weight: 700 });
    b += para(124, y + 54, dl, { size: 20, fill: C.ink2, lh: 26 });
    if (c) b += confirmTag(124, y + 54 + 26 * (dl.length - 1) + 14, c);
    y += h + GAP;
  });
  return doc(W, y + 4, 'Workflow for shipping design to production with Claude', 'Seven numbered steps from gathering context with the PM to a 30 minute planning meeting, based only on the P4 DAM case study.', b);
}

function diagramBudibase() {
  const W = 1200;
  let b = T(48, 56, 'From user pain to design change, as stated on the Budibase case study', { size: 28, weight: 700 });
  b += T(48, 88, 'The page says all four changes address the biggest concern, testing and debugging. It also says no post-launch test was run.', { size: 18, fill: C.ink2 });
  const x = [48, 322, 596, 898], w = [226, 226, 262, 254];
  ['Research', 'Biggest pain', 'Design changes', 'Outcome'].forEach((s, i) => { b += head(x[i], 142, s); });
  const c0 = stack(x[0], 164, w[0], [['Paid Maze study', '25 active users. Findings presented to the CEO, CMO and Head of Engineering.']]);
  const c1 = stack(x[1], 164, w[1], [['Testing and debugging', '10 users raised it. 68% picked debugging as most disliked (n=25).']]);
  const c2 = stack(x[2], 164, w[2], [['Data In / Data Out', 'Inline tabs for each step'], ['Inline error logging', 'A tab with clear error messages'], ['New sidebar panel', 'Selected step\'s settings in one place'], ['Enhanced canvas and UI', 'Zoom, pan, more compact']], 12);
  const c3 = stack(x[3], 164, w[3], [['Complaints on Discord', '8 to 10 a month before. Zero within a month, still zero after three. No post-launch test.'], ['Context: AI agents, 2026', 'Agents can run inside automations, and automations can be tools for agents.']], 14, (i) => (i === 0 ? { fill: C.soft } : {}));
  b += c0.svg + c1.svg + c2.svg + c3.svg;
  const ay = 164 + boxH(w[0], 'Paid Maze study', '25 active users. Findings presented to the CEO, CMO and Head of Engineering.') / 2;
  b += arrow(x[0] + w[0] + 6, ay, x[1] - 6, ay) + arrow(x[1] + w[1] + 6, ay, x[2] - 6, ay) + arrow(x[2] + w[2] + 6, ay, x[3] - 6, ay);
  const bottom = Math.max(c0.bottom, c1.bottom, c2.bottom, c3.bottom);
  b += T(48, bottom + 44, 'Sources: benturner.work/budibase-automations; Budibase, AI agents beta post, 12 March 2026.', { size: 17, fill: C.ink2 });
  return doc(W, bottom + 70, 'Budibase: from research to design change to outcome', 'Four columns: research, biggest pain, four design changes and the outcome, with the later agents feature.', b);
}

function diagramCityFibre() {
  const W = 1200;
  const rows = [
    ['Homepage', ['Mouseflow recordings', 'Visitors scrolled past the postcode checker.'], ['Cause found', 'Animated imagery below the header pulled them away.'], ['First screen redesigned', 'Full height, postcode field only.'], ['Result', '90% more postcode checks than the month before launch.']],
    ['B2B portal', ['Feedback day', '40 portal users: surveys, usability tests, card sorting, interviews.'], ['Evidence', '1,400+ data points.'], ['Overhaul', 'Complete portal UX redesign in the new brand.'], ['Result', 'Satisfaction 4/10 to 8/10 when the same 40 users re-tested.']],
    ['Design system', ['Figma system', 'Built to match the developers\' CraftCMS and Tailwind setup.'], ['Handoff built around it', ''], ['Easier to check', 'Developers understood the designs; QA could check builds.'], ['Result', 'Design tickets sent back fell from 15% to 5%.']],
  ];
  let b = T(48, 56, 'Evidence chains, as stated on the CityFibre case study', { size: 28, weight: 700 });
  b += T(48, 88, 'The 90% is a comparison with the month before launch, counted with a Google Analytics flag, not a controlled test.', { size: 18, fill: C.ink2 });
  const gap = 40, x0 = 48, cw = Math.floor((W - 2 * x0 - 3 * gap) / 4);
  let y = 126;
  rows.forEach((r) => {
    b += head(x0, y + 22, r[0]);
    const by = y + 36;
    const rh = Math.max(...[1, 2, 3, 4].map((j) => boxH(cw, r[j][0], r[j][1])));
    for (let j = 1; j <= 4; j++) {
      const x = x0 + (j - 1) * (cw + gap);
      b += box(x, by, cw, rh, r[j][0], r[j][1], j === 4 ? { fill: C.soft } : {});
      if (j < 4) b += arrow(x + cw + 4, by + rh / 2, x + cw + gap - 4, by + rh / 2);
    }
    y = by + rh + 28;
  });
  return doc(W, y, 'CityFibre: three evidence chains', 'Three rows of four steps: homepage, B2B portal and design system, each ending in the stated result.', b);
}

async function buildDiagrams() {
  const list = [
    ['p4-dam-capacity-change', diagramP4(), 'Diagram of the P4 DAM case study: front-end capacity fell from six developers to two, the response was shipping production front end and building Claude skills for specs and handovers, and the stated results were about 25% more features, planning meetings roughly halved and a hackathon award among eight UK teams.', '/p4-dam, after "The problem"', 'Headcount not confirmed with your manager (CS-02). Your call.'],
    ['workflow-claude-code', diagramWorkflow(), 'Seven-step workflow: gather context with the PM, capture answers, write a spec file, build in real product code, generate the handover with skills and agents, developers build from it, and a 30 minute planning meeting. Two steps are marked as needing confirmation.', '/p4-dam, under "Key decisions" or "How I used AI"', 'Two [CONFIRM] steps: how Claude Code is used, how the snapshot is generated. Remove tags once answered.'],
    ['budibase-evidence-chain', diagramBudibase(), 'Diagram of the Budibase case study: a paid study with 25 users found testing and debugging was the biggest pain, four design changes addressed it, and Discord complaints fell from 8 to 10 a month to zero within a month and stayed there three months later, with no post-launch test. Budibase later launched agents that work with automations.', '/budibase-automations, before "Design changes"', 'States that no post-launch test was run. Does not claim agents are built on the redesign.'],
    ['cityfibre-evidence-chains', diagramCityFibre(), 'Three evidence chains from the CityFibre case study: the homepage first screen led to 90% more postcode checks, the portal research led to satisfaction rising from 4 out of 10 to 8 out of 10, and the design system led to send-backs falling from 15% to 5%.', '/cityfibre, after "Role and team"', 'Absolute postcode counts are not on the page; the diagram says so only through the Google Analytics caption.'],
  ];
  for (const [id, svg, alt, where, notes] of list) {
    await write(`diagrams/${id}.svg`, svg);
    const m = svg.match(/viewBox="0 0 (\d+) (\d+)"/);
    await record(`diagrams/${id}.svg`, { w: +m[1], h: +m[2], format: 'SVG', alt, fills: `Diagram for ${where}.`, snippet: `<img src="/img/diagrams/${id}.svg" width="${m[1]}" height="${m[2]}" alt="${esc(alt)}" loading="lazy" decoding="async">`, notes, confirm: true });
  }
}

// ---------------------------------------------------------------- availability badge
async function buildBadge() {
  const s = CFG.availability;
  const w = Math.round(s.length * 9.3 + 56), h = 40;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(s)}" font-family="${esc(CFG.font)}"><title>${esc(s)}</title><rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="${(h - 2) / 2}" fill="${C.soft}" stroke="${C.accent}" stroke-width="2"/><circle cx="22" cy="${h / 2}" r="6" fill="${C.accent}"/><text x="38" y="${h / 2 + 5}" font-size="16" font-weight="600" fill="${C.accent}">${esc(s)}</text></svg>\n`;
  await write('badge/availability-badge.svg', svg);
  await record('badge/availability-badge.svg', { w, h, format: 'SVG', alt: s, fills: 'Homepage hero, under the sub-headline. Edit the text in the SVG or CFG.availability and rebuild. Remove it when you stop looking: a stale badge hurts trust.',
    snippet: `<img src="/img/badge/availability-badge.svg" width="${w}" height="${h}" alt="${esc(s)}">`, notes: 'Wording and truth of the statement are yours to confirm (DECISIONS-NEEDED D3). An HTML text element is better for accessibility and search than an image; use this only if you want the pill look.', confirm: true });
}

// ---------------------------------------------------------------- favicons
function icoFromPng(png, size) {
  const head = Buffer.alloc(6); head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(1, 4);
  const e = Buffer.alloc(16); e.writeUInt8(size, 0); e.writeUInt8(size, 1); e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); e.writeUInt32LE(png.length, 8); e.writeUInt32LE(22, 12);
  return Buffer.concat([head, e, png]);
}
async function buildIcons() {
  const mark = (r) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" font-family="${esc(CFG.font)}"><rect width="64" height="64" rx="${r}" fill="${C.accent}"/><text x="32" y="43" font-size="29" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="-1">BT</text></svg>\n`;
  await write('icons/icon.svg', mark(14));
  const sq = mark(0);
  const png = (n) => sharp(Buffer.from(mark(14)), { density: 384 }).resize(n, n).png({ compressionLevel: 9 }).toBuffer();
  await write('icons/favicon.ico', icoFromPng(await png(32), 32));
  await write('icons/apple-touch-icon.png', await sharp(Buffer.from(sq), { density: 384 }).resize(180, 180).png({ compressionLevel: 9 }).toBuffer());
  await write('icons/icon-192.png', await png(192));
  await write('icons/icon-512.png', await png(512));
  await write('icons/site.webmanifest', JSON.stringify({ name: `${CFG.name}, ${CFG.title}`, short_name: CFG.name, icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }], theme_color: '#FFFFFF', background_color: '#FFFFFF', display: 'browser' }, null, 2) + '\n');
  const links = [
    '<link rel="icon" href="/favicon.ico" sizes="32x32">',
    '<link rel="icon" href="/icon.svg" type="image/svg+xml">',
    '<link rel="apple-touch-icon" href="/apple-touch-icon.png">',
    '<link rel="manifest" href="/site.webmanifest">',
  ].join('\n');
  await write('icons/head-snippet.html', links + '\n');
  const note = 'Initials mark on the placeholder accent colour. Copy the files in icons/ to the site root. Existing favicon set could not be inspected (page reader cannot see head links).';
  const defs = [
    ['icons/icon.svg', 64, 64, 'SVG', 'Initials BT on a dark blue rounded square', 'Site root /icon.svg'],
    ['icons/favicon.ico', 32, 32, 'ICO', 'Initials BT favicon', 'Site root /favicon.ico'],
    ['icons/apple-touch-icon.png', 180, 180, 'PNG', 'Initials BT on a dark blue square', 'Site root /apple-touch-icon.png'],
    ['icons/icon-192.png', 192, 192, 'PNG', 'Initials BT on a dark blue rounded square', 'Site root /icon-192.png, listed in site.webmanifest'],
    ['icons/icon-512.png', 512, 512, 'PNG', 'Initials BT on a dark blue rounded square', 'Site root /icon-512.png, listed in site.webmanifest'],
    ['icons/site.webmanifest', null, null, 'JSON', '', 'Site root /site.webmanifest'],
  ];
  for (const [p, w, h, f, alt, fills] of defs) await record(p, { w, h, format: f, alt, fills, snippet: links, notes: note, confirm: true });
}

// ---------------------------------------------------------------- optimise mode (needs your original images)
async function optimise(inDir, outDir) {
  const widths = [400, 800, 1200, 1600];
  await fs.mkdir(outDir, { recursive: true });
  const files = (await fs.readdir(inDir)).filter((f) => /\.(jpe?g|png)$/i.test(f));
  const report = [];
  for (const f of files) {
    const src = path.join(inDir, f);
    const meta = await sharp(src).metadata();
    const origBytes = (await fs.stat(src)).size;
    const stem = f.replace(/\.[^.]+$/, '');
    const ws = [...new Set(widths.filter((w) => w < meta.width).concat([meta.width]))].sort((a, b) => a - b);
    const out = [];
    for (const w of ws) {
      for (const [ext, fn] of [['avif', (s) => s.avif({ quality: 50 })], ['webp', (s) => s.webp({ quality: 80 })]]) {
        const name = `${stem}-${w}.${ext}`;
        const buf = await fn(sharp(src).resize({ width: w, withoutEnlargement: true })).toBuffer();
        await fs.writeFile(path.join(outDir, name), buf);
        out.push({ name, width: w, ext, bytes: buf.length });
      }
    }
    const widest = (ext) => out.filter((o) => o.ext === ext).pop();
    const srcset = (ext) => out.filter((o) => o.ext === ext).map((o) => `/img/${o.name} ${o.width}w`).join(', ');
    const snippet = `<picture>\n  <source type="image/avif" srcset="${srcset('avif')}" sizes="(min-width: 900px) 800px, 100vw">\n  <source type="image/webp" srcset="${srcset('webp')}" sizes="(min-width: 900px) 800px, 100vw">\n  <img src="/img/${f}" width="${meta.width}" height="${meta.height}" alt="[ADD alt text]" loading="lazy" decoding="async">\n</picture>`;
    report.push({ file: f, width: meta.width, height: meta.height, original_bytes: origBytes, avif_widest_bytes: widest('avif').bytes, webp_widest_bytes: widest('webp').bytes,
      saved_vs_original_avif: origBytes - widest('avif').bytes, saved_vs_original_webp: origBytes - widest('webp').bytes, outputs: out, snippet });
  }
  await fs.writeFile(path.join(outDir, 'optimise-report.json'), JSON.stringify(report, null, 2));
  for (const r of report) console.log(`${r.file}: ${r.original_bytes} B -> avif ${r.avif_widest_bytes} B, webp ${r.webp_widest_bytes} B (saved ${r.saved_vs_original_avif} B with AVIF)`);
}

// ---------------------------------------------------------------- main
async function main() {
  if (process.argv[2] === 'optimise') {
    if (!process.argv[3] || !process.argv[4]) { console.error('usage: node build-assets.mjs optimise <inDir> <outDir>'); process.exit(1); }
    return optimise(process.argv[3], process.argv[4]);
  }
  for (const d of ['og/_src', 'covers/_src', 'metric-cards', 'diagrams', 'badge', 'icons']) await mk(d);
  await buildOg(); await buildCovers(); await buildMetrics(); await buildDiagrams(); await buildBadge(); await buildIcons();
  manifest.push({ path: '(optimised existing images)', width: null, height: null, format: 'AVIF and WebP', bytes: null, alt: '', fills: 'Portrait and thumbnails: NOT PRODUCED. The originals could not be downloaded (the workspace network blocks benturner.work).', snippet: 'Run: node build-assets.mjs optimise ./originals ./optimised. It writes AVIF and WebP at 400, 800, 1200 and 1600 wide, a ready <picture> snippet with width, height, srcset, sizes and lazy loading, and optimise-report.json with bytes saved per file.', notes: 'Originals to supply: /img/portrait.jpg, /img/thumbnail/*.jpg|png, /img/project-image/**, /img/life/*.jpg.', confirm_before_use: true });
  await fs.writeFile(path.join(HERE, 'manifest.json'), JSON.stringify({ generated: new Date().toISOString().slice(0, 10), tokens: { font: CFG.font, colours: C, note: 'Placeholders: the site CSS could not be read. Change CFG and rebuild.' }, assets: manifest }, null, 2) + '\n');
  console.log(`built ${manifest.length} manifest entries`);
}
main().catch((e) => { console.error(e); process.exit(1); });
