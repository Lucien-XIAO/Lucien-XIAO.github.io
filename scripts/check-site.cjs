const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { openSite } = require('./browser-utils.cjs');

async function main() {
  assert.ok(process.argv[2], 'Usage: node scripts/check-site.cjs <built-site-directory>');
  const site = await openSite(process.argv[2]);
  const shots = path.resolve(__dirname, '../tmp/site-checks');
  fs.mkdirSync(shots, { recursive: true });
  const page = await site.browser.newPage({ viewport: { width: 1440, height: 1000 }, colorScheme: 'light', reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  let checks = 0;
  function check(value, message) { assert.ok(value, message); checks++; }
  try {
    for (const lang of ['en', 'fr', 'zh']) {
      for (const route of ['/', '/research/', '/pub/', '/teaching/', '/misc/', '/misc/essays/', '/cv/', '/misc/translations/']) {
        const response = await page.goto(site.origin + route + '?lang=' + lang, { waitUntil: 'networkidle' });
        check(response.ok() && new URL(page.url()).pathname === route, 'Original page remains available: ' + route);
        check(await page.evaluate(value => SiteI18n.getLanguage() === value, lang), 'Language: ' + lang);
      }
    }
    await page.goto(site.origin + '/?lang=en', { waitUntil: 'networkidle' });
    check(await page.locator('.home-hero #homeResearchCanvas').count() === 1, 'Original hero restored');
    check(await page.locator('#education').count() === 1, 'Original education section restored');
    check(await page.locator('.nav-left a[href="/writing/"]').count() === 0, 'Redesigned Writing navigation removed');
    await page.screenshot({ path: path.join(shots, 'restored-desktop.png'), fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(400);
    check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Homepage mobile width');
    await page.screenshot({ path: path.join(shots, 'restored-mobile.png'), fullPage: true });
    await page.locator('#hamburgerBtn').click();
    check(await page.locator('#hamburgerBtn').getAttribute('aria-expanded') === 'true', 'Menu opens');
    await page.keyboard.press('Escape');
    check(await page.locator('#hamburgerBtn').getAttribute('aria-expanded') === 'false', 'Escape closes menu');
    await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async value => { window.copiedEmail = value; } } }));
    await page.locator('#home-email').click();
    await page.waitForFunction(() => document.querySelector('.contact-toast')?.textContent.includes('copied'));
    check(await page.evaluate(() => window.copiedEmail) === 'yuguang.xiao@univ-eiffel.fr', 'School email copied');
    await page.evaluate(() => { Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw Error('Denied'); } } }); document.execCommand = () => false; });
    await page.locator('#home-email').click();
    await page.waitForFunction(() => document.querySelector('.contact-toast')?.textContent.includes('Could not copy'));
    checks++;
    await page.locator('#themeToggle').click();
    check(await page.locator('html').getAttribute('data-theme') === 'dark', 'Theme toggle');
    check(errors.length === 0, errors.join('; '));
    console.log('PASS: ' + checks + ' checks; original layout, 8 routes, 3 languages, mobile menu, email and theme.');
  } finally { await site.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
