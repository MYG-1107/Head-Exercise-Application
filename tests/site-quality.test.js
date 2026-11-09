const test=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const path=require('node:path');const root=path.resolve(__dirname,'..');const read=f=>fs.readFileSync(path.join(root,f),'utf8');const pages=['index.html','guide.html','privacy.html','safety.html'];
test('public pages have unique titles, descriptions and canonicals',()=>{const titles=[];for(const page of pages){const html=read(page),title=html.match(/<title>(.*?)<\/title>/is)?.[1],desc=html.match(/<meta name="description" content="([^"]+)"/i)?.[1],canonical=html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];assert.ok(title,page+' title missing');assert.ok(desc&&desc.length>70,page+' description missing');assert.ok(canonical,page+' canonical missing');titles.push(title)}assert.equal(new Set(titles).size,titles.length)});
test('home page has clear no-login onboarding and a walkthrough',()=>{const html=read('index.html');assert.match(html,/No account or login required/i);assert.match(html,/id="walkthrough"/);assert.match(html,/demo-3d\.js/);assert.match(html,/id="demo-canvas"/);assert.match(html,/walkthrough transcript/i)});
test('sitemap lists 25 canonical URLs',()=>{const xml=read('sitemap.xml');assert.match(xml,/^<\?xml/);assert.equal((xml.match(/<url>/g)||[]).length,25);for(const p of pages){const url=p==='index.html'?'https://myg-1107.github.io/Head-Exercise-Application/':'https://myg-1107.github.io/Head-Exercise-Application/'+p;assert.ok(xml.includes('<loc>'+url+'</loc>'),p+' missing from sitemap')}});
test('internal links in static pages resolve',()=>{for(const p of pages){const html=read(p);for(const m of html.matchAll(/href="([^"#]+)"/g)){const href=m[1];if(/^(https?:|mailto:|data:|javascript:|\/\/)/i.test(href))continue;assert.ok(fs.existsSync(path.join(root,href.split('?')[0])),p+' broken link '+href)}}});
test('manifest and service worker identify the current app shell',()=>{const m=JSON.parse(read('manifest.webmanifest'));assert.equal(m.name,'Head Exercise Application');assert.equal(m.start_url,'./');const sw=read('sw.js');for(const f of ['index.html','demo-3d.js','blog/index.html','tracker-core.js'])assert.ok(sw.includes(f))});
test('structured data is parseable',()=>{for(const p of pages){const html=read(p),m=html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);assert.ok(m,p+' missing JSON-LD');assert.ok(JSON.parse(m[1]))}});
test('walkthrough includes recording support and an accessible transcript',()=>{assert.match(read('demo-3d.js'),/MediaRecorder/);assert.match(read('demo-3d.js'),/captureStream/);assert.match(read('index.html'),/aria-live="polite"/);assert.match(read('index.html'),/walkthrough-transcript/)});

test('walkthrough script is loaded exactly once', () => {
  const html = read('index.html');
  assert.equal(html.split('src="demo-3d.js"').length - 1, 1);
});
test('camera lifecycle handles interrupted streams and hidden pages', () => {
  const app = read('script.js');
  assert.ok(app.includes('function watchCameraStream(stream)'));
  assert.ok(app.includes("addEventListener('ended'"));
  assert.ok(app.includes('visibilitychange'));
  assert.ok(app.includes("addEventListener('pagehide'"));
});
test('homepage provides accessible display preferences', () => {
  const html = read('index.html');
  const css = read('style.css');
  const app = read('script.js');
  assert.ok(html.includes('id="large-text-btn"') && html.includes('id="high-contrast-btn"'));
  assert.ok(css.includes('body.large-text') && css.includes('body.high-contrast'));
  assert.ok(app.includes("classList.toggle('large-text')"));
  assert.ok(app.includes("classList.toggle('high-contrast')"));
});
test('service worker includes the application help pages for offline reading', () => {
  const sw = read('sw.js');
  for (const file of ['blog/camera-mode-explained.html', 'blog/manual-mode-guide.html', 'blog/safety-and-limitations-of-the-application.html']) {
    assert.ok(sw.includes(file), file + ' not included in offline shell');
  }
  assert.ok(sw.includes('503'));
});
