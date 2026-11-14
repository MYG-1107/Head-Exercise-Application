const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const base = 'https://myg-1107.github.io/Head-Exercise-Application/';
const publicPages = ['index.html', 'guide.html', 'privacy.html', 'safety.html'];

test('robots.txt permits crawling and advertises the sitemap', () => {
  const robots = read('robots.txt');
  assert.match(robots, /^User-agent:\s*\*\s*$/m);
  assert.match(robots, /^Allow:\s*\/\s*$/m);
  assert.match(robots, new RegExp('^Sitemap: ' + base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + 'sitemap\\.xml$', 'm'));
  assert.doesNotMatch(robots, /^Disallow:\s*\/$/m);
});

test('every indexable page has a unique title, description and self-canonical URL', () => {
  const titles = new Set();
  for (const file of publicPages) {
    const html = read(file);
    const title = html.match(/<title>([^<]+)<\/title>/i)?.[1];
    const description = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i)?.[1];
    const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
    assert.ok(title, file + ': title missing');
    assert.ok(description && description.length >= 50, file + ': meta description missing or too short');
    assert.equal(canonical, file === 'index.html' ? base : base + file);
    assert.ok(!titles.has(title), 'duplicate title: ' + title);
    titles.add(title);
    assert.match(html, /<meta\s+name="robots"\s+content="index, follow/i, file + ': index/follow directive missing');
  }
});

test('sitemap contains only canonical public pages and valid location entries', () => {
  const sitemap = read('sitemap.xml');
  assert.match(sitemap, /^<\?xml version="1\.0"/);
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
  assert.equal(locations.length, publicPages.length);
  assert.equal(new Set(locations).size, locations.length, 'duplicate sitemap URL');
  for (const file of publicPages) {
    assert.ok(locations.includes(file === 'index.html' ? base : base + file), file + ' missing from sitemap');
  }
  assert.ok(!locations.some(url => /404|\?/i.test(url)), 'non-canonical or error URL in sitemap');
});

test('public navigation uses real crawlable anchors and all local destinations exist', () => {
  for (const file of publicPages) {
    const html = read(file);
    const anchors = [...html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/gi)];
    assert.ok(anchors.length > 0, file + ': no crawlable anchors');
    for (const [, href] of anchors) {
      if (/^(?:https?:|mailto:|tel:|#|\/\/)/i.test(href)) continue;
      const target = href.split(/[?#]/)[0] || file;
      assert.ok(fs.existsSync(path.join(root, target)), file + ': broken local link ' + href);
    }
  }
});

test('custom 404 is excluded from indexing and sitemap but links visitors to valid pages', () => {
  const html = read('404.html');
  assert.match(html, /<title>Page Not Found \| Head Exercise Application<\/title>/);
  assert.match(html, /<meta name="robots" content="noindex, follow">/);
  assert.doesNotMatch(html, /rel="canonical"/i);
  for (const destination of ['/Head-Exercise-Application/', '/Head-Exercise-Application/guide.html', '/Head-Exercise-Application/privacy.html', '/Head-Exercise-Application/safety.html']) {
    assert.match(html, new RegExp('href="' + destination.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"'));
  }
  assert.doesNotMatch(read('sitemap.xml'), /404\.html/);
});
