const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const baseUrl = 'https://myg-1107.github.io/Head-Exercise-Application/';
const pages = ['index.html', 'guide.html', 'privacy.html', 'safety.html'];

test('only four user-facing pages remain and each has unique SEO metadata', () => {
  const titles = new Set();
  for (const page of pages) {
    const html = read(page);
    const title = html.match(/<title>(.*?)<\/title>/is)?.[1];
    const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1];
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
    assert.ok(title, page + ' title missing');
    assert.ok(description && description.length > 45, page + ' description missing');
    assert.equal(canonical, page === 'index.html' ? baseUrl : baseUrl + page);
    assert.ok(!titles.has(title), 'duplicate title: ' + title);
    titles.add(title);
  }
  assert.equal(titles.size, 4);
});

test('homepage focuses on the tracker and essential navigation only', () => {
  const html = read('index.html');
  assert.match(html, /id="tracker"/);
  assert.match(html, /id="start-session-btn"/);
  assert.match(html, /id="manual-panel"/);
  assert.match(html, /id="large-text-btn"/);
  assert.match(html, /id="high-contrast-btn"/);
  assert.doesNotMatch(html, /blog\//i);
  assert.doesNotMatch(html, /walkthrough|demo-3d|MediaRecorder/i);
  assert.equal((html.match(/class="plain-link" href="(?:guide|privacy|safety)\.html"/g) || []).length, 3);
});

test('sitemap contains exactly the four remaining canonical URLs', () => {
  const xml = read('sitemap.xml');
  assert.match(xml, /^<\?xml/);
  assert.equal((xml.match(/<url>/g) || []).length, 4);
  for (const page of pages) {
    const url = page === 'index.html' ? baseUrl : baseUrl + page;
    assert.ok(xml.includes('<loc>' + url + '</loc>'), page + ' missing from sitemap');
  }
  assert.doesNotMatch(xml, /\/blog\//);
});

test('all remaining local links resolve', () => {
  for (const page of pages) {
    const html = read(page);
    for (const match of html.matchAll(/href="([^"#]+)"/g)) {
      const href = match[1];
      if (/^(https?:|mailto:|data:|javascript:|\/\/)/i.test(href)) continue;
      assert.ok(fs.existsSync(path.join(root, href.split('?')[0])), page + ' broken link ' + href);
    }
  }
});

test('navigation exposes only Home, Quick guide, Privacy and Safety', () => {
  for (const page of pages) {
    const html = read(page);
    assert.doesNotMatch(html, /blog\//i, page + ' still links to the removed article archive');
    assert.match(html, /href="privacy\.html"/, page + ' missing privacy link');
    assert.match(html, /href="safety\.html"/, page + ' missing safety link');
  }
  const guide = read('guide.html');
  assert.match(guide, /href="\./, 'guide should link back to the homepage');
  assert.doesNotMatch(guide, /help centre|walkthrough/i);
});

test('manifest and service worker identify the smaller application shell', () => {
  const manifest = JSON.parse(read('manifest.webmanifest'));
  assert.equal(manifest.name, 'Head Exercise Application');
  assert.equal(manifest.start_url, './');
  const sw = read('sw.js');
  for (const file of ['./index.html', './guide.html', './privacy.html', './safety.html', './tracker-core.js']) {
    assert.ok(sw.includes(file), file + ' missing from offline cache');
  }
  assert.doesNotMatch(sw, /blog\/|demo-3d/);
  assert.match(sw, /v2\.8\.0/);
});

test('remaining pages have parseable structured data', () => {
  for (const page of pages) {
    const html = read(page);
    const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
    assert.ok(match, page + ' missing JSON-LD');
    assert.ok(JSON.parse(match[1]));
  }
});

test('camera lifecycle and accessibility controls remain in the application', () => {
  const app = read('script.js');
  const html = read('index.html');
  const css = read('style.css');
  assert.ok(app.includes('function watchCameraStream(stream)'));
  assert.ok(app.includes("addEventListener('ended'"));
  assert.ok(app.includes('visibilitychange'));
  assert.ok(app.includes("classList.toggle('large-text')"));
  assert.ok(app.includes("classList.toggle('high-contrast')"));
  assert.ok(html.includes('id="large-text-btn"') && html.includes('id="high-contrast-btn"'));
  assert.ok(css.includes('body.large-text') && css.includes('body.high-contrast'));
});
