# Website checks

The CV is an education-only webpage; no downloadable CV PDFs are maintained.
Site contact information is shared by `_config.yml` (`author.email`) and
`_data/profile.yml`; translations are in `assets/js/site-i18n.js`.

Requirements: Jekyll, Node.js and Chrome (or Playwright Chromium).

```sh
npm install --prefix scripts
# Only if Chrome is not installed:
npx --prefix scripts playwright install chromium

# Do not build over the historical, tracked _site directory.
jekyll build --destination tmp/site
node scripts/check-site.cjs tmp/site
node scripts/check-links.cjs tmp/site
```

`CHROME_PATH` can select another Chrome/Chromium executable.

Checks use a temporary local HTTP server and never change or publish the website.
Screenshots go in `tmp/site-checks` (excluded from both Git and Jekyll).
