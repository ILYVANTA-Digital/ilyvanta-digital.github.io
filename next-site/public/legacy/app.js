(()=>{'use strict';
const operationId=()=>crypto.randomUUID?crypto.randomUUID():'10000000-1000-4000-8000-100000000000'.replace(/[018]/g,c=>(c^crypto.getRandomValues(new Uint8Array(1))[0]&15>>c/4).toString(16));
const root=document.documentElement;
const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('#navigation');
function closeMenu(){nav?.classList.remove('open');menu?.setAttribute('aria-expanded','false');}
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('open')){closeMenu();menu.focus();}});
document.addEventListener('click',e=>{if(nav?.classList.contains('open')&&!e.target.closest('.header'))closeMenu();});
if(menu && nav)root.classList.add('navigation-ready');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
let paused=reduced.matches;
try{paused=paused||localStorage.getItem('ilyvanta-motion')==='paused';}catch{}
const motion=document.querySelector('.motion-button');
function applyMotion(){root.classList.toggle('motion-paused',paused);if(motion){motion.textContent=paused?'Enable motion':'Pause motion';motion.setAttribute('aria-pressed',String(paused));}}
applyMotion();
motion?.addEventListener('click',()=>{paused=!paused;applyMotion();try{localStorage.setItem('ilyvanta-motion',paused?'paused':'enabled');}catch{}});
reduced.addEventListener?.('change',e=>{if(e.matches){paused=true;applyMotion();}});
const art=document.querySelector('[data-tilt]');
if(art){art.addEventListener('pointermove',e=>{if(paused||reduced.matches||e.pointerType==='touch')return;const box=art.getBoundingClientRect();art.style.setProperty('--ry',((e.clientX-box.left)/box.width-.5)*8+'deg');art.style.setProperty('--rx',-((e.clientY-box.top)/box.height-.5)*6+'deg');});art.addEventListener('pointerleave',()=>{art.style.setProperty('--rx','0deg');art.style.setProperty('--ry','0deg');});}
const copy=document.querySelector('.copy-email');
copy?.addEventListener('click',async()=>{const status=document.querySelector('.copy-status');try{await navigator.clipboard.writeText('ilyvantadigital@gmail.com');status.textContent='Email address copied.';}catch{status.textContent='Email: ilyvantadigital@gmail.com — select and copy this address.';}});
const form=document.querySelector('#brief-form');
if(form){
 let operation=operationId();let busy=false;
 form.addEventListener('input',()=>{if(!busy)operation=operationId();});
 const submit=form.querySelector('[type="submit"]');submit.disabled=true;
 function deliveryUnavailable(){submit.disabled=true;submit.textContent='Please use email or WhatsApp';const status=document.querySelector('#delivery-state');if(status)status.textContent='Online sending is temporarily unavailable. Please email us directly or use WhatsApp.';}
 fetch('/api/config').then(r=>{if(!r.ok)throw new Error('Unavailable');return r.json();}).then(c=>{if(c.emailReady){submit.disabled=false;submit.textContent='Send enquiry';document.querySelector('#delivery-state').textContent='Send your enquiry directly from this page.';}else deliveryUnavailable();}).catch(deliveryUnavailable);
 form.addEventListener('submit',async e=>{e.preventDefault();if(busy||!form.reportValidity())return;busy=true;const btn=form.querySelector('[type="submit"]'),status=document.querySelector('#form-status');btn.disabled=true;btn.textContent='Sending…';status.textContent='';const data=Object.fromEntries(new FormData(form));
 try{const r=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...data,operation})});const result=await r.json();if(!r.ok)throw new Error(result.error||'Sending failed. Please try again.');status.textContent=result.message;form.reset();operation=operationId();}
 catch(error){status.textContent=error.message||'Your enquiry could not be sent. Please try again or email us directly.';}
 finally{busy=false;btn.disabled=false;btn.textContent='Send enquiry';}
 });
}
})();
