import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
const pages=JSON.parse(fs.readFileSync(new URL('../content/legacy-pages.json',import.meta.url)));
test('all seven legacy content routes remain crawlable with unique metadata',()=>{
 assert.equal(pages.length,7);assert.equal(new Set(pages.map(p=>p.path)).size,7);assert.equal(new Set(pages.map(p=>p.description)).size,7);
 for(const p of pages){assert.ok(p.description.length<155);assert.match(p.body,/<main/);assert.ok(p.schemas.every(s=>s['@context']==='https://schema.org'));}
});
test('home has useful business advice without JS and no accidental no-JS form submission',()=>{const home=pages.find(p=>p.path==='/');assert.match(home.body,/Give reception a shared view/);assert.doesNotMatch(home.body,/<form/);assert.match(home.body,/mailto:ilyvantadigital@gmail.com/);});
test('project-specific social images are distinct',()=>{const work=pages.filter(p=>p.path.startsWith('/work/'));assert.equal(work.length,4);assert.equal(new Set(work.map(p=>p.image)).size,4);});
test('content adapter has no executable embedded scripts or event attributes',()=>{for(const p of pages){assert.doesNotMatch(p.body,/<script\b/i);assert.doesNotMatch(p.body,/\son(?:click|load|error)\s*=/i);}});
