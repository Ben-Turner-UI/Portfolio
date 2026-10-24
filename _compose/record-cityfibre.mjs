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
const FREEZE_SECS = 2;

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

const HIDE_CHROME_CSS = `
  #onetrust-banner-sdk,
  #onetrust-consent-sdk,
  .onetrust-pc-dark-filter,
  #ot-sdk-btn-floating,
  .ot-sdk-container,
  [id*="onetrust"],
  [class*="onetrust"],
  /* Recite / accessibility / captcha badges (bottom-right) */
  #reciteme,
  #recite-js,
  .recite-button,
  [id*="recite" i],
  [class*="recite" i],
  [id*="Recite"],
  [class*="Recite"],
  iframe[src*="recite" i],
  iframe[title*="accessibility" i],
  iframe[title*="Recite" i],
  [aria-label*="Accessibility" i],
  [aria-label*="Recite" i],
  [class*="accessibility-tool" i],
  [id*="accessibility" i],
  .cm-widget,
  #cm-widget,
  [class*="captivate" i],
  [id*="captivate" i],
  .grecaptcha-badge,
  .grecaptcha-logo,
  iframe[src*="recaptcha" i],
  iframe[title*="reCAPTCHA" i],
  div[style*="z-index: 2147483647"],
  /* Capita / Recite Me launcher (person icon, bottom-right) */
  [id*="capita" i],
  [class*="capita" i],
  [id*="enablebar" i],
  [class*="enablebar" i],
  [id*="accessTool" i],
  [class*="access-tool" i],
  [class*="accessibility" i],
  button[aria-label*="Accessibility" i],
  a[aria-label*="Accessibility" i],
  #reciteMeLauncher,
  .reciteMeLauncher,
  [data-testid*="accessibility" i] {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    pointer-events: none !important;
    width: 0 !important;
    height: 0 !important;
  }

  /* Breathing room so the full header sits with top margin in frame */
  html {
    background: #fff !important;
  }
  body {
    padding-top: 56px !important;
    box-sizing: border-box !important;
  }
`;

const KILL_WIDGETS_JS = `
(() => {
  const kill = () => {
    const sels = [
      '.grecaptcha-badge',
      '[id*="recite" i]',
      '[class*="recite" i]',
      '[id*="capita" i]',
      '[class*="capita" i]',
      '[id*="enablebar" i]',
      '[aria-label*="Accessibility" i]',
      '[aria-label*="Recite" i]',
      'iframe[src*="recaptcha"]',
      'iframe[src*="recite"]',
    ];
    for (const sel of sels) {
      try {
        document.querySelectorAll(sel).forEach((n) => n.remove());
      } catch (_) {}
    }
    // Nuke fixed/sticky chips parked in the bottom-right corner
    document.querySelectorAll('body *').forEach((el) => {
      try {
        const s = getComputedStyle(el);
        if (s.position !== 'fixed' && s.position !== 'sticky') return;
        const r = el.getBoundingClientRect();
        if (r.width < 8 || r.width > 120 || r.height < 8 || r.height > 120) return;
        if (r.bottom < window.innerHeight - 140) return;
        if (r.right < window.innerWidth - 140) return;
        el.remove();
      } catch (_) {}
    });
  };
  kill();
  const mo = new MutationObserver(() => kill());
  mo.observe(document.documentElement, { childList: true, subtree: true });
  setInterval(kill, 400);
})();
`;

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
  await page.addStyleTag({ content: HIDE_CHROME_CSS });
  await page.addScriptTag({ content: KILL_WIDGETS_JS });
}

async function frameFullHeader(page) {
  await page.getByText(/Trusted by millions/i).first().waitFor({
    state: 'visible',
    timeout: 30000,
  });

  // No page zoom — show the full header with natural top/bottom chrome margins.
  await page.evaluate(() => {
    document.documentElement.style.zoom = '';
    window.scrollTo(0, 0);
  });

  // Strip floating widgets again after late injection.
  await page.addStyleTag({ content: HIDE_CHROME_CSS });
  await page.addScriptTag({ content: KILL_WIDGETS_JS });
  await page.waitForTimeout(800);
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

// Pass 2 — record
{
  const browser = await chromium.launch(launchOpts);
  const context = await browser.newContext({
    ...contextOpts,
    storageState: statePath,
  });
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
  });
  const blockNoise = async (ctx) => {
    for (const pat of [
      '**/*onetrust*',
      '**/*recite*',
      '**/*reciteme*',
      '**/*captivate*',
      '**/*capita*',
      '**/*enablebar*',
      '**/*recaptcha*',
      '**/*gstatic.com/recaptcha*',
      '**/*accessibility*',
    ]) {
      await ctx.route(pat, (route) => route.abort());
    }
  };
  await blockNoise(context);

  const prep = await context.newPage();
  await prep.goto('https://cityfibre.com/', { waitUntil: 'networkidle', timeout: 90000 });
  await dismissCookies(prep);
  await frameFullHeader(prep);
  await prep.close();

  const recContext = await browser.newContext({
    ...contextOpts,
    storageState: statePath,
    recordVideo: { dir: outDir, size: { width: CAP_W, height: CAP_H } },
  });
  await recContext.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
  });
  await recContext.addInitScript(KILL_WIDGETS_JS);
  await blockNoise(recContext);

  const page = await recContext.newPage();
  console.log('Record 10s…');
  await page.goto('https://cityfibre.com/', { waitUntil: 'domcontentloaded', timeout: 90000 });
  await dismissCookies(page);
  await frameFullHeader(page);
  await page.screenshot({ path: path.join(outDir, 'verify.png'), fullPage: false });
  console.log('verify.png written');

  await page.waitForTimeout(RECORD_MS);

  await page.evaluate(() => {
    document.querySelectorAll('*').forEach((el) => {
      const s = getComputedStyle(el);
      if (s.animationName !== 'none') el.style.animationPlayState = 'paused';
      if (s.transitionProperty !== 'none') el.style.transition = 'none';
    });
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
const start = Math.max(0, dur - RECORD_MS / 1000);
const tmpMp4 = path.join(outDir, 'clip.mp4');
const lastFrame = path.join(outDir, 'last.png');
const freezeMp4 = path.join(outDir, 'freeze.mp4');

console.log(`Encode from ${start.toFixed(2)}s → 4K 60fps (high quality)`);

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
    // blend interpolate is fast and softens low-fps capture into smoother 60fps
    `scale=${OUT_W}:${OUT_H}:flags=lanczos,minterpolate=fps=60:mi_mode=blend`,
    '-r',
    '60',
    '-c:v',
    'libx264',
    '-pix_fmt',
    'yuv420p',
    '-crf',
    '14',
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
    '16',
    '-preset',
    'medium',
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
  ['-y', '-f', 'concat', '-safe', '0', '-i', listPath, '-c', 'copy', '-movflags', '+faststart', mp4Out],
  { stdio: 'inherit' }
);

execFileSync(
  'ffmpeg',
  ['-y', '-ss', '1', '-i', mp4Out, '-frames:v', '1', '-update', '1', path.join(outDir, 'preview-final.png')],
  { stdio: 'inherit' }
);

console.log('Wrote', mp4Out, fs.statSync(mp4Out).size);
