const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { openSite } = require('./browser-utils.cjs');

const copy = {
  zh: {
    heading: '4 加分机制',
    titles: ['第一门通过的合同外课程（若', '每一门额外的合同外课程（', '每一门接近通过的课程（'],
    close: '）', add: '以下成绩各加 1 分：', and: '和', gain: '· 平均分提升：',
    values: ['+0.4 分', '+0.6 分', '+0.2 分'],
  },
  fr: {
    heading: '4 Système de bonus',
    titles: ['1er cours hors contrat validé (si', 'Chaque cours hors contrat supplémentaire (', 'Chaque cours presque validé ('],
    close: ')', add: '+1 point sur', and: 'et', gain: '· Gain sur moyenne :',
    values: ['+0,4 point', '+0,6 point', '+0,2 point'],
  },
  en: {
    heading: '4 Bonus system',
    titles: ['First passed extra-contract course (if', 'Each additional extra-contract course (', 'Each nearly passed course ('],
    close: ')', add: 'Add 1 point to', and: 'and', gain: '· Increase in average:',
    values: ['+0.4 points', '+0.6 points', '+0.2 points'],
  },
};
const colors = ['rgb(5, 150, 105)', 'rgb(37, 99, 235)', 'rgb(217, 119, 6)'];
const backgrounds = ['rgba(5, 150, 105, 0.04)', 'rgba(37, 99, 235, 0.04)', 'rgba(245, 158, 11, 0.04)'];

async function main() {
  assert.ok(process.argv[2], 'Usage: node scripts/check-pma-bonus.cjs <built-site-directory>');
  const site = await openSite(process.argv[2]);
  const shots = path.resolve(__dirname, '../tmp/site-checks');
  fs.mkdirSync(shots, { recursive: true });
  let checks = 0;
  function equal(actual, expected, message) { assert.deepEqual(actual, expected, message); checks++; }

  try {
    for (const scenario of [
      { width: 1440, languages: ['zh', 'fr', 'en', 'zh'], screenshot: 'desktop' },
      { width: 390, languages: ['zh', 'fr', 'en', 'zh'], screenshot: 'mobile' },
      { width: 1440, languages: ['fr', 'zh'] },
    ]) {
      const context = await site.browser.newContext({ viewport: { width: scenario.width, height: 1000 }, colorScheme: 'light', reducedMotion: 'reduce' });
      try {
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.goto(`${site.origin}/PMA/Info/rule2/?lang=${scenario.languages[0]}`, { waitUntil: 'domcontentloaded' });
        await page.waitForFunction(language => window.SiteI18n && SiteI18n.getLanguage() === language, scenario.languages[0]);
        // A missing CDN or failed typesetting is a failure, never an untested pass.
        await page.waitForFunction(() => window.MathJax && MathJax.startup && MathJax.startup.promise, null, { timeout: 30000 });
        await page.evaluate(async () => { await MathJax.startup.promise; await document.fonts.ready; });
        await page.waitForFunction(() => document.querySelectorAll('.rule-bonus-list mjx-container[jax="SVG"] svg').length === 9, null, { timeout: 10000 });
        await page.evaluate(() => {
          window.__bonusMath = [...document.querySelectorAll('.rule-bonus-list mjx-container')];
          window.__bonusMathHTML = window.__bonusMath.map(element => element.outerHTML);
        });

        for (const language of scenario.languages) {
          if (await page.evaluate(() => SiteI18n.getLanguage()) !== language) {
            await page.locator(`[data-lang-option="${language}"]`).click();
            await page.waitForFunction(value => SiteI18n.getLanguage() === value, language);
          }
          const expected = copy[language];
          const fragments = expected.titles.flatMap((title, index) => [title, expected.close, expected.add, ...(index < 2 ? [expected.and] : []), expected.gain, expected.values[index]]);
          const plainBlocks = expected.titles.flatMap((title, index) => [
            title + expected.close,
            expected.add + (index === 1 ? ',' : '') + (index < 2 ? expected.and : '') + expected.gain + expected.values[index] + '/20',
          ]).map(text => text.replace(/\s+/g, ''));
          const text = await page.evaluate(() => {
            const list = document.querySelector('.rule-bonus-list');
            const plain = list.cloneNode(true);
            plain.querySelectorAll('mjx-container').forEach(node => node.remove());
            return {
              heading: document.querySelector('#bonus-system').textContent.replace(/\s+/g, ' ').trim(),
              fragments: [...list.querySelectorAll('.pma-i18n-fragment')].map(element => element.textContent),
              plainBlocks: [...plain.children].flatMap(card => [...card.children[1].children].map(block => block.textContent.replace(/\s+/g, ''))),
              rawTex: /\\[()[\]]/.test(plain.textContent),
            };
          });
          equal(text, { heading: expected.heading, fragments, plainBlocks, rawTex: false }, `${scenario.width}px ${language}: all six text blocks translated, with no raw TeX or duplicated formula text`);

          const math = await page.evaluate(() => {
            const nodes = [...document.querySelectorAll('.rule-bonus-list mjx-container')];
            return {
              count: nodes.length,
              sameNodes: nodes.every((node, index) => node === window.__bonusMath[index] && node.isConnected),
              sameHTML: nodes.every((node, index) => node.outerHTML === window.__bonusMathHTML[index]),
              rendered: nodes.every(node => node.querySelector('svg') && node.getBoundingClientRect().width > 0),
            };
          });
          equal(math, { count: 9, sameNodes: true, sameHTML: true, rendered: true }, `${scenario.width}px ${language}: nine real MathJax formulas retain their DOM`);

          const appearance = await page.locator('.rule-bonus-list > div').evaluateAll(cards => cards.map(card => ({
            number: card.firstElementChild.textContent.trim(),
            numberColor: getComputedStyle(card.firstElementChild).color,
            gainColor: getComputedStyle(card.querySelector('strong[style]')).color,
            background: getComputedStyle(card).backgroundColor,
          })));
          equal(appearance, colors.map((color, index) => ({ number: '+1', numberColor: color, gainColor: color, background: backgrounds[index] })), `${scenario.width}px ${language}: green, blue and orange cards preserved`);

          const overflow = await page.evaluate(() => {
            const problems = [];
            const list = document.querySelector('.rule-bonus-list');
            for (const element of [document.querySelector('#bonus-system'), ...list.children]) {
              const box = element.getBoundingClientRect();
              if (box.left < -1 || box.right > innerWidth + 1 || element.scrollWidth > element.clientWidth + 1) problems.push('box: ' + element.textContent.slice(0, 50));
              const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
              while (walker.nextNode()) {
                const node = walker.currentNode;
                if (!node.textContent.trim() || node.parentElement.closest('mjx-container')) continue;
                const range = document.createRange(); range.selectNodeContents(node);
                for (const rect of range.getClientRects()) if (rect.left < box.left - 1 || rect.right > box.right + 1) problems.push('text: ' + node.textContent);
              }
            }
            for (const formula of list.querySelectorAll('mjx-container')) {
              const rect = formula.getBoundingClientRect();
              if (rect.left < -1 || rect.right > innerWidth + 1) problems.push('formula');
            }
            return problems;
          });
          equal(overflow, [], `${scenario.width}px ${language}: bonus text and formulas fit the viewport`);
        }

        if (!scenario.screenshot) {
          const labels = await page.locator('.pma-i18n-fragment').evaluateAll(elements => elements
            .filter(element => ['Règles S2', 'Cours sous contrat (obligatoires)', 'Cours hors contrat (bonus)'].includes(element.dataset.pmaI18nText))
            .map(element => element.textContent));
          equal(labels, ['第二学期规则', '合同内课程（必算课程）', '合同外课程（加分）'], 'Chinese breadcrumb and course-category headings translate');
        }
        if (scenario.screenshot) {
          await page.evaluate(() => window.scrollTo(0, 0));
          const heading = await page.locator('#bonus-system').boundingBox();
          const list = await page.locator('.rule-bonus-list').boundingBox();
          await page.screenshot({
            path: path.join(shots, `pma-bonus-zh-${scenario.screenshot}.png`), fullPage: true, animations: 'disabled',
            clip: { x: Math.min(heading.x, list.x), y: heading.y, width: Math.max(heading.width, list.width), height: list.y + list.height - heading.y },
          });
        }
        equal(errors, [], `${scenario.width}px initial ${scenario.languages[0]}: no JavaScript errors`);
      } finally { await context.close(); }
    }
    console.log(`Passed ${checks} focused bonus checks (1440px / 390px, initial Chinese and French). Screenshots: ${shots}/pma-bonus-zh-{desktop,mobile}.png`);
  } finally { await site.close(); }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
