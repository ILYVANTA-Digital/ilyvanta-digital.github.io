import assert from 'node:assert/strict';import fs from 'node:fs';
const root=process.env.TEST_BASE_URL||'http://localhost:4173';const pages=JSON.parse(fs.readFileSync(new URL('../content/legacy-pages.json',import.meta.url)));
let checks=0;
for(const p of pages){const r=await fetch(root+p.path);assert.equal(r.status,200,p.path);const html=await r.text();assert.ok(html.includes(p.title.replaceAll('&','&amp;'))||html.includes(p.title),`${p.path} title`);assert.match(html,/<link rel="canonical"/);assert.match(html,/<main/);checks+=4;}
for(const slug of ['hotel','clinic','cafe','sports']){const r=await fetch(`${root}/demo/${slug}/`,{redirect:'manual'});assert.equal(r.status,307);assert.equal(r.headers.get('location'),`https://ilyvanta-digital.umarilyas.chatgpt.site/demo/${slug}/`);checks+=2;}
for(const path of ['/sitemap.xml','/robots.txt','/manifest.webmanifest','/icon.svg']){assert.equal((await fetch(root+path)).status,200,path);checks++;}
assert.equal((await fetch(`${root}/does-not-exist/`)).status,404);checks++;
const robots=await (await fetch(`${root}/robots.txt`)).text();assert.match(robots,/Disallow: \//);checks++;
console.log('PASS',checks,'production HTTP route, redirect, metadata and preview-indexing checks.');
