/* Check rendered local paths and anchors without contacting external services. */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
assert.ok(process.argv[2], 'Usage: node scripts/check-links.cjs <built-site-directory>');
const root = path.resolve(process.argv[2]);
const pages = [];
const failures = new Map();
let count = 0;
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (file.endsWith('.html')) pages.push(file);
  }
}
walk(root);
for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  const base = new URL('https://xiaoyuguang.com/' + path.relative(root, file));
  for (const match of html.matchAll(/\s(?:href|src)=["']([^"']+)["']/g)) {
    let url;
    try { url = new URL(match[1].replaceAll('&amp;', '&'), base); } catch (_) { continue; }
    if (url.origin !== base.origin) continue;
    count++;
    let target = path.join(root, decodeURIComponent(url.pathname));
    if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, 'index.html');
    let missing = !fs.existsSync(target);
    if (!missing && url.hash && target.endsWith('.html')) {
      const content = fs.readFileSync(target, 'utf8');
      const id = decodeURIComponent(url.hash.slice(1));
      missing = !/http-equiv="refresh"/.test(content) && !content.includes(`id="${id}"`) && !content.includes(`id='${id}'`);
    }
    if (missing) {
      const key = url.pathname + url.hash;
      const refs = failures.get(key) || [];
      refs.push(path.relative(root, file));
      failures.set(key, refs);
    }
  }
}
console.log(`${pages.length} HTML pages; ${count} local links and assets checked.`);
if (failures.size) {
  for (const [target, refs] of failures) console.error(`Missing: ${target} (from ${[...new Set(refs)].join(', ')})`);
  process.exitCode = 1;
} else console.log('PASS: all local paths and anchors resolve.');
