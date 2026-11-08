const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const blogDir = path.join(root, 'blog');
const base = 'https://myg-1107.github.io/Head-Exercise-Application/';

test('editorial hub contains at least 20 complete, individually addressable articles', () => {
  const files = fs.readdirSync(blogDir).filter(name => name.endsWith('.html') && name !== 'index.html');
  assert.ok(files.length >= 20, \`expected 20+ articles, found \${files.length}\`);
  const titles = new Set();
  const canonicals = new Set();
  for (const file of files) {
    const html = fs.readFileSync(path.join(blogDir, file), 'utf8');
    const title = html.match(/<title>(.*?)<\/title>/is)?.[1];
    const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1];
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
    assert.ok(title && title.length > 15, \`\${file}: title missing\`);
    assert.ok(description && description.length >= 90, \`\${file}: description missing or too short\`);
    assert.equal(canonical, base + 'blog/' + file, \`\${file}: canonical mismatch\`);
    assert.ok(!titles.has(title), \`\${file}: duplicate title\`);
    assert.ok(!canonicals.has(canonical), \`\${file}: duplicate canonical\`);
    titles.add(title); canonicals.add(canonical);
    const schema = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i)?.[1];
    assert.ok(schema, \`\${file}: JSON-LD missing\`);
    const data = JSON.parse(schema);
    assert.equal(data['@type'], 'BlogPosting', \`\${file}: wrong schema type\`);
    assert.equal(data.url, canonical, \`\${file}: schema URL mismatch\`);
    assert.ok(data.datePublished && data.dateModified, \`\${file}: article dates missing\`);
    assert.match(html, /<h1>/i, \`\${file}: visible heading missing\`);
    assert.match(html, /Scope note/i, \`\${file}: editorial scope note missing\`);
    assert.match(html, /grapecrux\.com/i, \`\${file}: business enquiry route missing\`);
    const visibleText = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ');
    assert.ok(visibleText.split(' ').filter(Boolean).length > 180, \`\${file}: article content is too short\`);
  }
});

test('article collection page links to every article and has valid collection metadata', () => {
  const html = fs.readFileSync(path.join(blogDir, 'index.html'), 'utf8');
  const schema = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i)?.[1];
  assert.ok(schema, 'blog index JSON-LD missing');
  const data = JSON.parse(schema);
  assert.equal(data['@type'], 'CollectionPage');
  const files = fs.readdirSync(blogDir).filter(name => name.endsWith('.html') && name !== 'index.html');
  for (const file of files) assert.ok(html.includes(\`href="\${file}"\`), \`blog index missing \${file}\`);
  assert.equal(data.mainEntity.numberOfItems, files.length);
});
