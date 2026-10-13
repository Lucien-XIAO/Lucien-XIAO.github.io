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
  const workshopDetails = {
    en: { date: '8–9 October 2026', attendance: 'I attended the workshop as an audience member and did not give a talk.' },
    fr: { date: '8–9 octobre 2026', attendance: 'J’ai assisté à cet atelier en tant qu’auditeur, sans y donner d’exposé.' },
    zh: { date: '2026 年 10 月 8–9 日', attendance: '我作为听众参加了这次研讨会，未作报告。' },
  };
  try {
    for (const lang of ['en', 'fr', 'zh']) {
      for (const route of ['/', '/research/', '/pub/', '/talks/', '/teaching/', '/misc/', '/misc/essays/', '/cv/', '/misc/translations/']) {
        const response = await page.goto(site.origin + route + '?lang=' + lang, { waitUntil: 'networkidle' });
        check(response.ok() && new URL(page.url()).pathname === route, 'Original page remains available: ' + route);
        check(await page.evaluate(value => SiteI18n.getLanguage() === value, lang), 'Language: ' + lang);
        check(await page.locator('script[type="application/ld+json"]').evaluateAll(elements => elements.some(el => JSON.parse(el.textContent).email === 'mailto:yuguang.xiao2@univ-eiffel.fr')), 'Current email in page metadata');
        if (route === '/' || route === '/research/') {
          check(await page.locator('#m2 .research-project-institution').textContent() === 'LAMA - Université Paris-Est Créteil, Créteil', 'M2 internship institution is in Créteil');
        }
        if (route === '/' || route === '/cv/') {
          check(await page.locator('.education-status-complete, .cv-status-complete').count() === 0, 'Completed badges removed');
        }
        if (route === '/') {
          check(await page.locator('#home-email').textContent() === 'yuguang.xiao2 [at] univ-eiffel.fr', 'Current email displayed');
          check(await page.locator('#materials, .home-materials').count() === 0, 'Homepage Selected Materials section removed');
          check(await page.locator('.nav-left a[href="/misc/translations/"], .nav-left a[href="/mathreader/"], .nav-left a[href="/PMA/"]').count() === 3, 'Materials pages remain accessible from navigation');
          check(await page.locator('#selected-research [data-i18n="research.all"], #selected-research a[href="/research/#reports"]').count() === 0, 'All research projects shortcut removed');
          check(await page.locator('#selected-research .action-links a').count() === 2, 'Research report and slides links remain');
          check(await page.locator('.home-hero-actions, .home-hero .home-action').count() === 0, 'Hero shortcut buttons removed');
          check(await page.locator('.nav-left a[href="/cv/"], .nav-left a[href="/research/"]').count() === 2, 'CV and Research navigation remains');
          const about = await page.locator('[data-i18n-html="home.about.p1"]').textContent();
          check(about.includes('Créteil') && about.includes('Champs-sur-Marne'), 'Both LAMA locations shown');
          check(await page.locator('.education-item-current .education-institution').textContent() === 'LAMA - Université Gustave Eiffel, Champs-sur-Marne', 'Education institution city is correct');
          check(!(await page.locator('#main-content').textContent()).includes('Marne-la-Vallée'), 'Previous location label removed');
          check((await page.locator('#about-me .home-office-upec').textContent()).includes('2P 244'), 'Separate UPEC office line preserved');
          check(await page.locator('#about-me .home-office').count() === 2, 'UPEC and UGE offices shown on separate lines');
          const ugeOfficeLabel = { en: 'UGE office:', fr: 'Bureau à l’UGE :', zh: 'UGE 办公室：' }[lang];
          check(await page.locator('#about-me .home-office-uge').textContent() === ugeOfficeLabel + ' 4B 090', 'UGE office shown in ' + lang);
        }
        check(await page.locator('.footer-links').count() === 0, 'Duplicate footer navigation removed');
        check(await page.locator('.site-footer, .site-footer p').evaluateAll(elements => elements.every(el => getComputedStyle(el).borderTopWidth === '0px')), 'Footer divider removed');
        if (route === '/talks/') {
          check(await page.locator('.talks-page .exp-card').count() === 1, 'Only confirmed workshop attendance is listed');
          check(await page.locator('.exp-role a').textContent() === 'Stat-Mech in Créteil 2026', 'Correct workshop title');
          check(await page.locator('.exp-role a').getAttribute('href') === 'https://statmechcreteil.sciencesconf.org/?lang=en', 'Official workshop link');
          check(await page.locator('.exp-date').textContent() === workshopDetails[lang].date, 'Workshop dates in ' + lang);
          check(await page.locator('[data-i18n="activities.statmech.attendance"]').textContent() === workshopDetails[lang].attendance, 'Audience participation, not a speaker, in ' + lang);
          check(!/CHALHOUB|Joseph CHEN|2B111|matrices aléatoires/i.test(await page.locator('.talks-page').textContent()), 'Incorrect seminar records removed');
          await page.screenshot({ path: path.join(shots, 'attendance-' + lang + '-desktop.png'), fullPage: true });
          await page.setViewportSize({ width: 390, height: 844 });
          check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Attendance page mobile width in ' + lang);
          await page.screenshot({ path: path.join(shots, 'attendance-' + lang + '-mobile.png'), fullPage: true });
          await page.setViewportSize({ width: 1440, height: 1000 });
        }
        if (route === '/cv/') {
          check(await page.locator('.cv-document-section').count() === 1, 'CV contains only Education');
          check(await page.locator('.cv-entry').count() === 5, 'All five education entries remain');
          check(await page.locator('.cv-download, .cv-contact-line, .cv-print-contact').count() === 0, 'CV download and contact blocks removed');
          check(await page.locator('.cv-document a[href*=".pdf"]').count() === 0, 'No CV PDF links');
          check(await page.locator('.cv-document').innerText().then(text => !/(?:P2|2P) 244|1 45 17 16 42|univ-eiffel\.fr/.test(text)), 'CV contact details absent');
        }
      }
    }
    await page.goto(site.origin + '/?lang=en', { waitUntil: 'networkidle' });
    check(JSON.stringify((await page.locator('.nav-left > a, .nav-more > summary').allTextContents()).map(text => text.trim())) === JSON.stringify(['Home', 'Publications', 'Talks', 'Teaching', 'CV', 'M2-PMA', 'More']), 'Requested top navigation order');
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
    check(await page.evaluate(() => window.copiedEmail) === 'yuguang.xiao2@univ-eiffel.fr', 'School email copied');
    await page.evaluate(() => { Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw Error('Denied'); } } }); document.execCommand = () => false; });
    await page.locator('#home-email').click();
    await page.waitForFunction(() => document.querySelector('.contact-toast')?.textContent.includes('Could not copy'));
    check(await page.locator('#home-email').textContent() === 'yuguang [dot] xiao2 [at] univ-eiffel [dot] fr', 'Current email displayed on copy failure');
    await page.locator('#themeToggle').click();
    check(await page.locator('html').getAttribute('data-theme') === 'dark', 'Theme toggle');
    check(errors.length === 0, errors.join('; '));
    console.log('PASS: ' + checks + ' checks; original layout, 9 routes, 3 languages, mobile menu, email and theme.');
  } finally { await site.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
