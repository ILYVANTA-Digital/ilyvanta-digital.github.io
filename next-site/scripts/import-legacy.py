from pathlib import Path
import re,json,shutil,html
root=Path(__file__).resolve().parents[1];old=root.parent/'public';records=[]
for p in sorted(old.rglob('*.html')):
 rel=p.relative_to(old).as_posix()
 if rel.startswith('demo/') or rel=='404.html':continue
 source=p.read_text();route='/' if rel=='index.html' else '/'+rel.removesuffix('index.html')
 body=re.search(r'<body[^>]*>(.*?)</body>',source,re.S).group(1)
 schemas=[json.loads(x) for x in re.findall(r'<script type="application/ld\+json">(.*?)</script>',body,re.S)]
 body=re.sub(r'<script\b.*?</script>','',body,flags=re.S)
 # No-JS enquiry controls must not submit to the page URL by accident.
 body=re.sub(r'<form id="brief-form">.*?</form>','<div class="contact-brief"><h3>A useful first conversation.</h3><p>Tell us about your business, the problem you want to solve and what a better outcome looks like.</p><a class="button dark" href="mailto:ilyvantadigital@gmail.com?subject=Project%20enquiry">Email your project brief</a><p>Direct form delivery is being configured. Email and WhatsApp are available.</p></div>',body,flags=re.S)
 body=re.sub(r'<p class="delivery-state".*?</p>','',body)
 # First useful business answer is rendered in HTML, before any JavaScript runs.
 fallback='<article><span>01</span><h3>Turn interest into an enquiry.</h3><p>Clear room information, location, policies and a direct booking enquiry journey.</p></article><article><span>02</span><h3>Give reception a shared view.</h3><p>Keep reservations, guest requests and room readiness together.</p></article><article><span>03</span><h3>Measure the right things.</h3><p>Track enquiries, booking completion and room turnaround.</p></article>'
 body=body.replace('<div id="business-advice" aria-live="polite"></div>','<div id="business-advice" aria-live="polite">'+fallback+'</div>')
 body=body.replace('<canvas id="market-globe"','<p class="sr-only">Available for remote collaboration. The countries listed are target markets, not completed client engagements.</p><canvas id="market-globe"')
 records.append({'path':route,'title':html.unescape(re.search(r'<title>(.*?)</title>',source).group(1)),'description':html.unescape(re.search(r'<meta name="description" content="([^"]+)"',source).group(1)),'image':re.search(r'<meta property="og:image" content="[^"]+(/assets/[^"]+)"',source).group(1),'body':body,'schemas':schemas})
(root/'content/legacy-pages.json').write_text(json.dumps(records,indent=2))
shutil.copytree(old/'assets',root/'public/assets',dirs_exist_ok=True)
for name in ['app.js','upgrade.js','international.js']:
 shutil.copy2(old/name,root/'public/legacy'/name)
# Collapse navigation only after its controls are attached. Script-load failure
# otherwise leaves mobile visitors without working navigation.
app_path=root/'public/legacy/app.js'
app_source=app_path.read_text().replace("const reduced=window.matchMedia", "if(menu && nav)root.classList.add('navigation-ready');\nconst reduced=window.matchMedia")
app_path.write_text(app_source)
# One compatibility stylesheet preserves source cascade order. Tokens/overrides remain separate.
(root/'app/legacy.css').write_text('\n'.join((old/p).read_text() for p in ['style.css','upgrade.css','international.css']))
(root/'docs/ROUTE_MAP.json').write_text(json.dumps({'preserved':[r['path'] for r in records],'redirectedDemos':{f'/demo/{s}/':f'https://ilyvanta-digital.umarilyas.chatgpt.site/demo/{s}/' for s in ['hotel','clinic','cafe','sports']},'notFound':'unknown routes return custom 404','assets':[str(p.relative_to(old)) for p in (old/'assets').glob('*')]},indent=2))
print('Imported',len(records),'content routes and preserved 4 hosted demo paths')
