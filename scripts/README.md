# Website checks and CV downloads

The CV webpage is the source for all three PDF downloads. Contact information is
shared by `_config.yml` (`author.email`) and `_data/profile.yml`; translations are
in `assets/js/site-i18n.js`. After updating the CV, rebuild the PDFs before pushing.

Requirements: Jekyll, Node.js and Chrome (or Playwright Chromium).

```sh
npm install --prefix scripts
# Only if Chrome is not installed:
npx --prefix scripts playwright install chromium

# Do not build over the historical, tracked _site directory.
jekyll build --destination tmp/site
node scripts/render-cv.cjs tmp/site
node scripts/check-site.cjs tmp/site
node scripts/check-links.cjs tmp/site
```

`CHROME_PATH` can select another Chrome/Chromium executable. The PDF renderer
always selects light mode, waits for fonts, and converts internal links to the
public domain. Review the PDFs visually after significant content changes.

Checks use a temporary local HTTP server and never change or publish the website.
Screenshots go in `tmp/site-checks` (excluded from both Git and Jekyll).
