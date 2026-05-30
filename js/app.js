/* ============================================================
   PORTFOLIO ENGINE — boot, matrix, typing, reveals, nav
   ============================================================ */
(function(){
  'use strict';

  /* ---------- MATRIX RAIN ---------- */
  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d');
  let cols, drops, fontSize = 15;
  const glyphs = 'アイウエオカキ01ABCDEF</>{}[];#$%&*+=ﾊﾐﾋﾆﾑﾒｺｿ01XSSSQLi'.split('');
  function sizeCanvas(){
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / fontSize);
    drops = new Array(cols).fill(0).map(()=> Math.random()*-50);
  }
  sizeCanvas();
  window.addEventListener('resize', sizeCanvas);
  function drawMatrix(){
    ctx.fillStyle = 'rgba(6,10,7,0.10)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.font = fontSize + 'px monospace';
    for(let i=0;i<cols;i++){
      const ch = glyphs[Math.floor(Math.random()*glyphs.length)];
      const x = i*fontSize, y = drops[i]*fontSize;
      ctx.fillStyle = Math.random() > .975 ? '#b6ffce' : '#1d7a1a';
      ctx.fillText(ch, x, y);
      if(y > canvas.height && Math.random() > .975) drops[i] = 0;
      drops[i] += 0.5;
    }
    requestAnimationFrame(drawMatrix);
  }
  drawMatrix();

  /* ---------- BOOT SEQUENCE ---------- */
  const boot = document.getElementById('boot');
  const bootInner = boot.querySelector('.boot-inner');
  const bar = boot.querySelector('.bar i');
  const lines = [
    ['SYSTEM','> initializing secure shell ......... ', 'ok','[ OK ]'],
    ['','> mounting /dev/portfolio .............. ', 'ok','[ OK ]'],
    ['','> loading kernel modules .............. ', 'ok','[ OK ]'],
    ['','> verifying certificates .............. ', 'ok','[ 8 VALID ]'],
    ['','> establishing encrypted tunnel ...... ', 'ok','[ AES-256 ]'],
    ['','> scanning operator profile .......... ', 'warn','[ AUTHORIZED ]'],
    ['','',''],
    ['hd','  USER ........ Durgesh Waingankar  [ @EternalSec ]',''],
    ['hd','  ROLE ........ Offensive Security / VAPT / Red Team',''],
    ['hd','  STATUS ...... ONLINE',''],
  ];
  let li = 0;
  function bootLine(){
    if(li >= lines.length){ finishBoot(); return; }
    const [cls, text, tagcls, tag] = lines[li];
    const div = document.createElement('div');
    div.className = 'bl';
    if(cls==='hd') div.classList.add('hd');
    div.innerHTML = text + (tag ? ` <span class="${tagcls}">${tag}</span>` : '');
    bootInner.appendChild(div);
    li++;
    setTimeout(bootLine, cls==='hd' ? 130 : 95);
  }
  // progress bar
  setTimeout(()=>{ if(bar) bar.style.transition='width 1.5s ease'; if(bar) bar.style.width='100%'; }, 150);
  function finishBoot(){
    setTimeout(()=>{
      boot.classList.add('done');
      document.body.style.overflow='';
      startHero();
      setTimeout(()=> boot.remove(), 700);
    }, 480);
  }
  document.body.style.overflow='hidden';
  // allow skip
  boot.addEventListener('click', ()=>{ li = lines.length; if(bar) bar.style.width='100%'; finishBoot(); });
  setTimeout(bootLine, 400);

  /* ---------- HERO TYPED ROLES ---------- */
  const roles = [
    'Offensive Security',
    'VAPT & Red Team Operator',
    'Digital Forensics Investigator',
    'CEH v13 · CRTS v2 · CRTA',
    'Bug Bounty / Responsible Disclosure'
  ];
  const roleEl = document.getElementById('role');
  let rI=0, cI=0, deleting=false, started=false;
  function startHero(){
    if(started) return; started=true;
    typeRole();
    revealObserve();
  }
  function typeRole(){
    if(!roleEl) return;
    const cur = roles[rI];
    roleEl.textContent = cur.slice(0, cI);
    if(!deleting){
      if(cI < cur.length){ cI++; setTimeout(typeRole, 55 + Math.random()*40); }
      else { deleting=true; setTimeout(typeRole, 1700); }
    } else {
      if(cI > 0){ cI--; setTimeout(typeRole, 28); }
      else { deleting=false; rI=(rI+1)%roles.length; setTimeout(typeRole, 320); }
    }
  }

  /* ---------- SCROLL REVEAL ---------- */
  function revealObserve(){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
    }, { threshold:.12, rootMargin:'0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(el=> io.observe(el));
  }

  /* ---------- NAV: shrink + scroll progress + active ---------- */
  const nav = document.querySelector('header.nav');
  const sbar = document.getElementById('scrollbar');
  const navLinks = [...document.querySelectorAll('nav.links a[data-sec]')];
  const secs = navLinks.map(a=> document.getElementById(a.dataset.sec)).filter(Boolean);
  function onScroll(){
    const y = window.scrollY;
    nav.classList.toggle('shrink', y > 40);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    sbar.style.width = (y/h*100) + '%';
    // active link
    let act = null;
    secs.forEach(s=>{ if(s.getBoundingClientRect().top < window.innerHeight*0.4) act = s.id; });
    navLinks.forEach(a=> a.style.color = a.dataset.sec===act ? 'var(--phos)' : '');
  }
  window.addEventListener('scroll', onScroll, {passive:true});

  /* ---------- MOBILE MENU ---------- */
  const burger = document.querySelector('.burger');
  const linksWrap = document.querySelector('nav.links');
  if(burger){
    burger.addEventListener('click', ()=> linksWrap.classList.toggle('open'));
    linksWrap.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> linksWrap.classList.remove('open')));
  }

  /* ---------- GLITCH ON HOVER ---------- */
  document.querySelectorAll('.glitch').forEach(el=>{
    el.addEventListener('mouseenter', ()=>{ el.classList.add('go'); setTimeout(()=> el.classList.remove('go'), 360); });
  });
  // periodic glitch on hero name
  const heroName = document.querySelector('h1 .glitch');
  if(heroName){ setInterval(()=>{ heroName.classList.add('go'); setTimeout(()=> heroName.classList.remove('go'), 360); }, 5200); }

  /* ---------- PROJECT CARD SPOTLIGHT ---------- */
  document.querySelectorAll('.card').forEach(card=>{
    card.addEventListener('mousemove', e=>{
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX-r.left)+'px');
      card.style.setProperty('--my', (e.clientY-r.top)+'px');
    });
  });

  /* ---------- COUNT-UP STATS ---------- */
  function countUp(el){
    const target = +el.dataset.count; const suf = el.dataset.suf||'';
    let n=0; const step = Math.max(1, Math.round(target/40));
    const t = setInterval(()=>{ n+=step; if(n>=target){n=target; clearInterval(t);} el.textContent = n+suf; }, 28);
  }
  const statIO = new IntersectionObserver((es)=>{ es.forEach(e=>{ if(e.isIntersecting){ countUp(e.target); statIO.unobserve(e.target);} }); }, {threshold:.6});
  document.querySelectorAll('[data-count]').forEach(el=> statIO.observe(el));

  /* ---------- CUSTOM TARGETING-RETICLE CURSOR ---------- */
  (function cursorEngine(){
    if(window.matchMedia('(pointer:coarse)').matches) return; // skip touch
    const ret = document.getElementById('reticle');
    const dot = document.getElementById('cur-dot');
    const label = document.getElementById('cur-label');
    if(!ret||!dot||!label) return;
    document.documentElement.classList.add('has-cursor');
    let mx=window.innerWidth/2, my=window.innerHeight/2, rx=mx, ry=my, vis=false;
    const hot = 'a, button, .btn, .card, .clink, .cert, .chip, .skill-block .tags span, .edu, .totop, .nav-cta, [data-sec]';
    window.addEventListener('mousemove', e=>{
      mx=e.clientX; my=e.clientY;
      if(!vis){ vis=true; ret.style.opacity=1; dot.style.opacity=1; label.style.opacity=1; }
      dot.style.transform = `translate(${mx}px,${my}px)`;
      label.style.transform = `translate(${mx+16}px,${my+14}px)`;
      const t = (e.target && e.target.closest) ? e.target.closest(hot) : null;
      if(t){
        ret.classList.add('hot'); label.classList.add('hot');
        label.textContent = t.dataset.cur || (t.tagName==='A' ? 'OPEN ↗' : 'ACCESS');
      } else {
        ret.classList.remove('hot'); label.classList.remove('hot');
        const hx = mx.toString(16).toUpperCase().padStart(3,'0');
        const hy = my.toString(16).toUpperCase().padStart(3,'0');
        label.textContent = `0x${hx}:${hy}`;
      }
    });
    window.addEventListener('mousedown', ()=> ret.classList.add('down'));
    window.addEventListener('mouseup', ()=> ret.classList.remove('down'));
    window.addEventListener('mouseleave', ()=>{ ret.style.opacity=0; dot.style.opacity=0; label.style.opacity=0; vis=false; });
    (function loop(){
      rx += (mx-rx)*0.22; ry += (my-ry)*0.22;
      ret.style.transform = `translate(${rx}px,${ry}px)`;
      requestAnimationFrame(loop);
    })();
  })();

  /* ---------- SCROLL PARALLAX + TELEMETRY HUD ---------- */
  (function scrollMotion(){
    const pars = [...document.querySelectorAll('[data-par]')];
    const hud = document.getElementById('hud');
    const pct = hud && hud.querySelector('.pct');
    const fill = hud && hud.querySelector('.track i');
    const dots = hud ? [...hud.querySelectorAll('.dots b')] : [];
    const dsecs = dots.map(d=> document.getElementById(d.dataset.d));
    let ticking=false;
    function frame(){
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = Math.min(100, Math.max(0, y/h*100));
      pars.forEach(el=>{
        const f = parseFloat(el.dataset.par);
        const r = el.getBoundingClientRect();
        if(r.bottom > -200 && r.top < window.innerHeight + 200){
          el.style.transform = `translate3d(0, ${ (window.innerHeight*0.5 - (r.top + r.height/2)) * f }px, 0)`;
        }
      });
      if(hud){
        if(p>2 && p<98) hud.classList.add('show'); else hud.classList.remove('show');
        pct.textContent = String(Math.round(p)).padStart(2,'0') + '%';
        fill.style.height = p + '%';
        let act = 0;
        dsecs.forEach((s,i)=>{ if(s && s.getBoundingClientRect().top < window.innerHeight*0.45) act = i; });
        dots.forEach((d,i)=> d.classList.toggle('on', i===act));
      }
      ticking=false;
    }
    window.addEventListener('scroll', ()=>{ if(!ticking){ requestAnimationFrame(frame); ticking=true; } }, {passive:true});
    window.addEventListener('resize', frame);
    frame();
  })();

  /* ---------- 3D TILT ON ID CARD (follows mouse) ---------- */
  (function tilt(){
    if(window.matchMedia('(pointer:coarse)').matches) return;
    const card = document.querySelector('[data-tilt]');
    const stage = document.querySelector('.hero-right');
    if(!card||!stage) return;
    stage.addEventListener('mousemove', e=>{
      const r = stage.getBoundingClientRect();
      const px = (e.clientX - r.left)/r.width - 0.5;
      const py = (e.clientY - r.top)/r.height - 0.5;
      card.style.transform = `rotateY(${px*9}deg) rotateX(${-py*9}deg)`;
      card.style.boxShadow = `${-px*30}px ${ -py*30 + 30}px 80px rgba(0,0,0,.6), 0 0 0 1px rgba(57,255,20,.06)`;
    });
    stage.addEventListener('mouseleave', ()=>{ card.style.transform=''; card.style.boxShadow=''; });
  })();

  /* ---------- MAGNETIC BUTTONS ---------- */
  (function magnetic(){
    if(window.matchMedia('(pointer:coarse)').matches) return;
    document.querySelectorAll('.btn, .nav-cta, .totop, .cert .seal').forEach(el=>{
      el.classList.add('magnetic');
      const strength = el.classList.contains('seal') ? 6 : 14;
      el.addEventListener('mousemove', e=>{
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width/2;
        const y = e.clientY - r.top - r.height/2;
        el.style.transform = `translate(${x/r.width*strength}px, ${y/r.height*strength}px)`;
      });
      el.addEventListener('mouseleave', ()=> el.style.transform='');
    });
  })();

})();
