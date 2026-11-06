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
  const doctoralFunder = /MSTIC|\bED[\s-]*532\b|ed-mstic/i;
  const personalFunding = /\b(?:funded|funding|fellowships?|scholarships?|financement|bourses?)\b|\bfinanc[ée]|资助|奖学金/i;
  const workshopDetails = {
    en: { date: '8–9 October 2026', attendance: 'I attended the workshop as an audience member and did not give a talk.' },
    fr: { date: '8–9 octobre 2026', attendance: 'J’ai assisté à cet atelier en tant qu’auditeur, sans y donner d’exposé.' },
    zh: { date: '2026 年 10 月 8–9 日', attendance: '我作为听众参加了这次研讨会，未作报告。' },
  };
  try {
    check(!doctoralFunder.test(fs.readFileSync(path.join(path.resolve(process.argv[2]), 'assets/js/site-i18n.js'), 'utf8')), 'Built translation bundle contains no personal doctoral funder');
    for (const lang of ['en', 'fr', 'zh']) {
      for (const route of ['/', '/research/', '/pub/', '/talks/', '/teaching/', '/misc/', '/misc/essays/', '/cv/', '/misc/translations/']) {
        const response = await page.goto(site.origin + route + '?lang=' + lang, { waitUntil: 'networkidle' });
        check(response.ok() && new URL(page.url()).pathname === route, 'Original page remains available: ' + route);
        check(await page.evaluate(value => SiteI18n.getLanguage() === value, lang), 'Language: ' + lang);
        check(await page.locator('script[type="application/ld+json"]').evaluateAll(elements => elements.some(el => JSON.parse(el.textContent).email === 'mailto:yuguang.xiao2@univ-eiffel.fr')), 'Current email in page metadata');
        for (const region of ['head', 'body']) {
          const markup = await page.locator(region).evaluate(element => element.outerHTML);
          check(!doctoralFunder.test(markup) && !personalFunding.test(markup), 'No personal doctoral funding information in ' + region + ': ' + route + ' (' + lang + ')');
        }
        if (route === '/research/') {
          check(await page.locator('#m2 .research-project-institution').textContent() === 'LAMA - Université Paris-Est Créteil, Créteil', 'M2 internship institution is in Créteil');
        }
        if (route === '/' || route === '/cv/') {
          check(await page.locator('.education-status-complete, .cv-status-complete').count() === 0, 'Completed badges removed');
        }
        if (route === '/') {
          check(await page.locator('#home-email').textContent() === 'yuguang.xiao2 [at] univ-eiffel.fr', 'Current email displayed');
          check(await page.locator('#materials .material-link').count() === 4, 'Historical Selected Materials section restored');
          check(await page.locator('.nav-left a[href="/misc/translations/"], .nav-left a[href="/mathreader/"], .nav-left a[href="/PMA/"]').count() === 3, 'Materials pages remain accessible from navigation');
          check(await page.locator('#experience .experience-item').count() === 3, 'Historical three research experiences restored');
          check(await page.locator('#experience .action-links a').count() === 6, 'Three reports and three slide links remain');
          check(await page.locator('#experience .experience-item').first().locator('.exp-title').textContent().then(text => text.includes('LAMA') && text.includes('Créteil')), 'Historical M2 experience names the correct institution');
          check(await page.locator('.home-hero-actions a[href="/cv/"], .home-hero-actions a[href="/pub/"]').count() === 2, 'Historical hero shortcuts restored');
          check(await page.locator('.nav-left > a[href="/cv/"], .nav-left > a[href="/PMA/"]').count() === 2, 'CV and M2-PMA are primary navigation items');
          const about = await page.locator('[data-i18n-html="home.about.p1"]').textContent();
          const doctoralStart = { en: 'Since 1 October 2026', fr: 'Depuis le 1er octobre 2026', zh: '自 2026 年 10 月 1 日起' }[lang];
          check(about.includes(doctoralStart) && about.includes('Université Gustave Eiffel'), 'Homepage describes doctoral study already underway in ' + lang);
          check(!/\bincoming\b|will (?:start|begin|join)|commencerai|rejoindrai|即将|将于/i.test(about), 'Homepage has no future doctoral status');
          check(await page.locator('#education .experience-item').count() === 3, 'Historical homepage education structure restored');
          check(!(await page.locator('#main-content').textContent()).includes('Marne-la-Vallée'), 'Previous location label removed');
          check((await page.locator('#about-me .home-office-upec').textContent()).includes('2P 244'), 'Separate UPEC office line preserved');
          check(await page.locator('#about-me .home-office').count() === 2, 'UPEC and UGE offices shown on separate lines');
          const ugeOfficeLabel = { en: 'UGE office:', fr: 'Bureau à l’UGE :', zh: 'UGE 办公室：' }[lang];
          check(await page.locator('#about-me .home-office-uge').textContent() === ugeOfficeLabel + ' 4B 090', 'UGE office shown in ' + lang);
          check(await page.locator('#about-me .section-body').evaluate(element => [...element.children].slice(-2).every(child => child.classList.contains('home-office'))), 'Office lines stay at the end of About Me');
          if (lang === 'zh') await page.locator('#about-me').screenshot({ path: path.join(shots, 'about-zh-detail.png') });
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
          check(await page.locator('.cv-document-header .cv-lede, .cv-document-header .cv-profile-line').count() === 2, 'Historical CV introduction restored');
          const currentStatus = { en: 'Current', fr: 'En cours', zh: '在读' }[lang];
          check(await page.locator('[data-i18n="cv.doctoral.status"]').textContent() === currentStatus, 'CV explicitly shows ongoing doctoral study in ' + lang);
          check(await page.locator('.cv-entry').first().locator('time').getAttribute('datetime') === '2026', 'CV doctoral date displays the start year');
          const doctoralPeriod = { en: '2026 – Present', fr: '2026 – aujourd’hui', zh: '2026 – 至今' }[lang];
          check(await page.locator('[data-i18n="cv.doctoral.period"]').textContent() === doctoralPeriod, 'CV doctoral date is open-ended in ' + lang);
          check(await page.locator('[data-i18n="cv.doctoral.institution"]').textContent() === 'Université Gustave Eiffel', 'Full doctoral institution name in plain text');
          check(await page.locator('.cv-entry a').count() === 0, 'Education schools and supervisors have no hyperlinks');
          const logoPaths = await page.locator('.cv-entry img.cv-school-logo').evaluateAll(logos => logos.map(logo => logo.getAttribute('src')));
          check(JSON.stringify(logoPaths) === JSON.stringify(['/assets/img/uge-mark.svg', ...Array(4).fill('/assets/img/sorbonne-universite-logo.jpg')]), 'All five entries show the correct school logo');
          check(await page.locator('.cv-entry img.cv-school-logo').evaluateAll(async logos => (await Promise.all(logos.map(async logo => { logo.loading = 'eager'; try { await logo.decode(); } catch (_) {} return logo.complete && logo.naturalWidth > 0; }))).every(Boolean)), 'All school logos load');
          check(!/\bincoming\b|will (?:start|begin|join)|commencerai|rejoindrai|即将|将于/i.test(await page.locator('.cv-entry').first().textContent()), 'CV has no future doctoral status');
          check(await page.locator('.cv-download, .cv-contact-line, .cv-print-contact').count() === 0, 'CV download and contact blocks removed');
          check(await page.locator('.cv-document a[href*=".pdf"]').count() === 0, 'No CV PDF links');
          check(await page.locator('.cv-document').innerText().then(text => !/(?:P2|2P) 244|1 45 17 16 42|univ-eiffel\.fr/.test(text)), 'CV contact details absent');
          if (lang === 'zh') await page.locator('.cv-entry').first().screenshot({ path: path.join(shots, 'cv-doctoral-zh-detail.png') });
        }
        if (route === '/research/' || route === '/cv/') {
          const name = route === '/research/' ? 'research' : 'cv';
          await page.screenshot({ path: path.join(shots, name + '-' + lang + '-desktop.png'), fullPage: true });
          await page.setViewportSize({ width: 390, height: 844 });
          check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), name + ' mobile width in ' + lang);
          await page.screenshot({ path: path.join(shots, name + '-' + lang + '-mobile.png'), fullPage: true });
          await page.setViewportSize({ width: 1440, height: 1000 });
        }
      }
    }
    await page.goto(site.origin + '/?lang=en', { waitUntil: 'networkidle' });
    check(JSON.stringify((await page.locator('.nav-left > a, .nav-more > summary').allTextContents()).map(text => text.trim())) === JSON.stringify(['Home', 'Publications', 'Teaching', 'CV', 'M2-PMA', 'More']), 'Requested top navigation order');
    check(await page.locator('.nav-more a[href="/misc/translations/"]').count() === 1, 'Translations remains available in More');
    check(await page.locator('.nav-left a[href="/#interests"], .nav-left a[href="/research/"], .nav-more a[href="/PMA/"]').count() === 0, 'Research navigation removed and M2-PMA moved out of More');
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
    console.log('PASS: ' + checks + ' checks; September layout, current doctoral status, no personal funding disclosures, 9 routes, 3 languages, mobile menu, email and theme.');
  } finally { await site.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
