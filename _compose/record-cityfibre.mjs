import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, 'cityfibre-capture');
const statePath = path.join(outDir, 'storage.json');
const mp4Out = path.join(
  __dirname,
  '..',
  'img',
  'project-image',
  'cityfibre-rebrand',
  'cf-homepage-hero.mp4'
);

const CAP_W = 1920;
const CAP_H = 1080;
const OUT_W = 3840;
const OUT_H = 2160;
const RECORD_MS = 10000;
const ZOOM = 1.25; // light zoom — keep most of the header in frame
const FREEZE_SECS = 2; // hold final frame so motion stops

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const launchOpts = {
  headless: true,
  args: ['--disable-blink-features=AutomationControlled'],
};

const contextOpts = {
  viewport: { width: CAP_W, height: CAP_H },
  deviceScaleFactor: 1,
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  locale: 'en-GB',
  timezoneId: 'Europe/London',
};

async function dismissCookies(page) {
  const selectors = [
    '#onetrust-accept-btn-handler',
    'button:has-text("Accept all cookies")',
    'button:has-text("Accept All Cookies")',
    'button:has-text("Accept all")',
    'button:has-text("Accept All")',
  ];
  for (const sel of selectors) {
    try {
      const el = page.locator(sel).first();
      if (await el.isVisible({ timeout: 2500 })) {
        await el.click({ timeout: 3000 });
        await page.waitForTimeout(800);
        break;
      }
    } catch {
      // ignore
    }
  }

  await page.addStyleTag({
    content: `
      #onetrust-banner-sdk,
      #onetrust-consent-sdk,
      .onetrust-pc-dark-filter,
      #ot-sdk-btn-floating,
      .ot-sdk-container,
      [id*="onetrust"],
      [class*="onetrust"] {
        display: none !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }
    `,
  });
  await page.evaluate(() => {
    document
      .querySelectorAll('#onetrust-banner-sdk, #onetrust-consent-sdk, .onetrust-pc-dark-filter')
      .forEach((n) => n.remove());
  });
}

async function lightZoomKeepHeader(page) {
  await page.getByText(/Trusted by millions/i).first().waitFor({
    state: 'visible',
    timeout: 30000,
  });

  await page.evaluate((zoom) => {
    document.documentElement.style.zoom = String(zoom);
    window.scrollTo(0, 0);
  }, ZOOM);

  await page.waitForTimeout(400);
}

// Pass 1 — cookies
{
  const browser = await chromium.launch(launchOpts);
  const context = await browser.newContext(contextOpts);
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
  });
  const page = await context.newPage();
  console.log('Pass 1: accept cookies…');
  await page.goto('https://cityfibre.com/', { waitUntil: 'domcontentloaded', timeout: 90000 });
  await dismissCookies(page);
  await context.storageState({ path: statePath });
  await context.close();
  await browser.close();
}

// Pass 2 — record first 10s after page is ready (no cookie UI)
{
  const browser = await chromium.launch(launchOpts);
  const context = await browser.newContext({
    ...contextOpts,
    storageState: statePath,
    // Don't start video until page is ready — use a fresh page after setup
  });
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
  });
  await context.route('**/*onetrust*', (route) => route.abort());

  const prep = await context.newPage();
  console.log('Prep: load + dismiss…');
  await prep.goto('https://cityfibre.com/', { waitUntil: 'networkidle', timeout: 90000 });
  await dismissCookies(prep);
  await lightZoomKeepHeader(prep);
  await prep.close();

  // New page in a recording context so the file starts on the live hero
  const recContext = await browser.newContext({
    ...contextOpts,
    storageState: statePath,
    recordVideo: { dir: outDir, size: { width: CAP_W, height: CAP_H } },
  });
  await recContext.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
  });
  await recContext.route('**/*onetrust*', (route) => route.abort());

  const page = await recContext.newPage();
  console.log('Record: first 10s…');
  await page.goto('https://cityfibre.com/', { waitUntil: 'domcontentloaded', timeout: 90000 });
  await dismissCookies(page);
  await lightZoomKeepHeader(page);
  await page.screenshot({ path: path.join(outDir, 'verify.png'), fullPage: false });
  console.log('verify.png written');

  await page.waitForTimeout(RECORD_MS);

  // Freeze site motion before stopping the recorder
  await page.evaluate(() => {
    document.querySelectorAll('*').forEach((el) => {
      const s = getComputedStyle(el);
      if (s.animationName !== 'none') {
        el.style.animationPlayState = 'paused';
      }
      if (s.transitionProperty !== 'none') {
        el.style.transition = 'none';
      }
    });
    document.documentElement.style.setProperty('scroll-behavior', 'auto');
  });
  await page.waitForTimeout(400);

  await recContext.close();
  await context.close();
  await browser.close();
}

const webm = fs.readdirSync(outDir).find((f) => f.endsWith('.webm'));
if (!webm) {
  console.error('No webm');
  process.exit(1);
}
const webmPath = path.join(outDir, webm);
const dur = Number(
  execFileSync(
    'ffprobe',
    ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', webmPath],
    { encoding: 'utf8' }
  ).trim()
);

// Prefer the last RECORD_MS of the capture (post-load), then hold final frame.
const start = Math.max(0, dur - RECORD_MS / 1000);
const tmpMp4 = path.join(outDir, 'clip.mp4');
const lastFrame = path.join(outDir, 'last.png');

console.log(`Clip ${start.toFixed(2)}s→end (${dur.toFixed(2)}s), freeze ${FREEZE_SECS}s, 4K 60fps`);

execFileSync(
  'ffmpeg',
  [
    '-y',
    '-ss',
    String(start),
    '-i',
    webmPath,
    '-t',
    '10',
    '-vf',
    `scale=${OUT_W}:${OUT_H}:flags=lanczos,fps=60`,
    '-r',
    '60',
    '-c:v',
    'libx264',
    '-pix_fmt',
    'yuv420p',
    '-crf',
    '17',
    '-preset',
    'fast',
    '-an',
    tmpMp4,
  ],
  { stdio: 'inherit' }
);

execFileSync(
  'ffmpeg',
  ['-y', '-sseof', '-0.05', '-i', tmpMp4, '-frames:v', '1', '-update', '1', lastFrame],
  { stdio: 'inherit' }
);

// Concat motion clip + frozen last frame
const freezeMp4 = path.join(outDir, 'freeze.mp4');
execFileSync(
  'ffmpeg',
  [
    '-y',
    '-loop',
    '1',
    '-i',
    lastFrame,
    '-t',
    String(FREEZE_SECS),
    '-vf',
    `scale=${OUT_W}:${OUT_H}:flags=lanczos,fps=60`,
    '-r',
    '60',
    '-c:v',
    'libx264',
    '-pix_fmt',
    'yuv420p',
    '-crf',
    '17',
    '-preset',
    'fast',
    '-an',
    freezeMp4,
  ],
  { stdio: 'inherit' }
);

const listPath = path.join(outDir, 'concat.txt');
fs.writeFileSync(
  listPath,
  `file '${tmpMp4.replace(/\\/g, '/')}'\nfile '${freezeMp4.replace(/\\/g, '/')}'\n`
);

execFileSync(
  'ffmpeg',
  [
    '-y',
    '-f',
    'concat',
    '-safe',
    '0',
    '-i',
    listPath,
    '-c',
    'copy',
    '-movflags',
    '+faststart',
    mp4Out,
  ],
  { stdio: 'inherit' }
);

execFileSync(
  'ffmpeg',
  ['-y', '-ss', '1', '-i', mp4Out, '-frames:v', '1', '-update', '1', path.join(outDir, 'preview-final.png')],
  { stdio: 'inherit' }
);

console.log('Wrote', mp4Out, fs.statSync(mp4Out).size);
