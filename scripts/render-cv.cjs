/* Rebuild all CV downloads from the same Jekyll page and translation data. */
const fs = require('node:fs');
const path = require('node:path');
const { openSite } = require('./browser-utils.cjs');

async function main() {
  const build = process.argv[2];
  if (!build) throw new Error('Usage: node scripts/render-cv.cjs <built-site-directory> [output-directory]');
  const output = path.resolve(process.argv[3] || path.join(__dirname, '../assets/docs'));
  fs.mkdirSync(output, { recursive: true });
  const site = await openSite(build);
  try {
    const page = await site.browser.newPage({ viewport: { width: 1200, height: 900 }, colorScheme: 'light' });
    await page.emulateMedia({ media: 'print' });
    for (const lang of ['en', 'fr', 'zh']) {
      await page.goto(`${site.origin}/cv/?lang=${lang}`, { waitUntil: 'networkidle' });
      await page.waitForFunction(value => window.SiteI18n && window.SiteI18n.getLanguage() === value, lang);
      await page.evaluate(async () => {
        document.documentElement.setAttribute('data-theme', 'light');
        await document.fonts.ready;
        // Preserve working absolute links in downloaded PDFs, not localhost URLs.
        document.querySelectorAll('a[href]').forEach(link => {
          const url = new URL(link.href);
          if (url.origin === location.origin) link.href = 'https://xiaoyuguang.com' + url.pathname + url.search + url.hash;
        });
      });
      const file = path.join(output, `yuguang-xiao-cv-${lang}.pdf`);
      await page.pdf({ path: file, format: 'A4', preferCSSPageSize: true, printBackground: true, tagged: true });
      console.log(`Rendered ${lang}: ${file}`);
    }
  } finally { await site.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
