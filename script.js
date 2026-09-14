const header=document.querySelector('[data-header]');
const toggle=document.querySelector('.menu-toggle');
const navigation=document.querySelector('.navigation');
const setMenu=open=>{
  navigation.classList.toggle('open',open);
  toggle.setAttribute('aria-expanded',String(open));
  toggle.setAttribute('aria-label',open?'Menü schließen':'Menü öffnen');
  document.body.classList.toggle('menu-open',open);
};
toggle?.addEventListener('click',()=>setMenu(toggle.getAttribute('aria-expanded')!=='true'));
navigation?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',event=>{if(event.key==='Escape')setMenu(false)});
window.addEventListener('scroll',()=>header?.classList.toggle('scrolled',window.scrollY>24),{passive:true});

const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals=document.querySelectorAll('.reveal');
if(reduced||!('IntersectionObserver'in window)){reveals.forEach(el=>el.classList.add('is-visible'))}
else{
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}
  }),{threshold:.14,rootMargin:'0px 0px -5% 0px'});
  reveals.forEach(el=>observer.observe(el));
}

document.querySelectorAll('[data-optional-image]').forEach(img=>{
  const holder=img.parentElement;
  const show=()=>holder?.classList.add('has-image');
  const hide=()=>{img.hidden=true;holder?.classList.remove('has-image')};
  img.addEventListener('load',show,{once:true});
  img.addEventListener('error',hide,{once:true});
  if(img.complete){img.naturalWidth?show():hide()}
});

if(!reduced&&matchMedia('(min-width: 901px)').matches){
  const layer=document.querySelector('[data-parallax]');
  let ticking=false;
  const paint=()=>{
    if(layer){const rect=layer.parentElement.getBoundingClientRect();layer.style.transform=`translate3d(0,${Math.max(-32,Math.min(32,-rect.top*.045))}px,0)`}
    ticking=false;
  };
  addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(paint);ticking=true}},{passive:true});
}

document.querySelector('[data-contact-button]')?.addEventListener('click',()=>{
  const status=document.querySelector('[data-contact-status]');
  status.hidden=false;
  status.focus?.();
});
document.querySelector('[data-year]').textContent=new Date().getFullYear();