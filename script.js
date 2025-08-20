 /* ===== Typewriter ===== */
    const roles = [
      "Hi, I'm Sumit Tiwari.",
      "Java Developer.",
      "Web Developer.",
      "Problem Solver."
    ];
    const twEl = document.getElementById('typewriter');
    let idx = 0, char = 0, dir = 1;
    function tick(){
      const word = roles[idx];
      char += dir;
      twEl.textContent = word.slice(0, char);
      if (char === word.length + 6) dir = -1; // pause at end
      if (char === 0) { dir = 1; idx = (idx + 1) % roles.length; }
      const delay = dir === 1 ? 80 : 36; // typing vs deleting
      setTimeout(tick, delay);
    }
    tick();

    /* ===== Reveal on Scroll ===== */
    const revealEls = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: .12 });
    revealEls.forEach(el => io.observe(el));

    /* ===== Mobile Nav ===== */
    const burger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    burger?.addEventListener('click', ()=>{
      const open = navLinks.style.display === 'flex';
      navLinks.style.display = open ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.gap = '10px';
      navLinks.style.padding = '10px 0 14px';
    });

    /* ===== Year ===== */
    document.getElementById('year').textContent = new Date().getFullYear();

    /* ===== Theme Toggle ===== */
    const root = document.documentElement;
    const themeBtn = document.getElementById('themeBtn');
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) root.setAttribute('data-theme', savedTheme);
    function toggleTheme(){
      const cur = root.getAttribute('data-theme');
      const next = cur === 'light' ? 'dark' : 'light';
      if (!cur && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        // defaulted to dark, switch to light
      }
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    }
    themeBtn.addEventListener('click', toggleTheme);

    /* ===== Fake Contact Form (no backend) ===== */
    const form = document.getElementById('contactForm');
    const formMsg = document.getElementById('formMsg');
    document.getElementById('sendBtn').addEventListener('click', ()=>{
      formMsg.textContent = 'Thanks! Your message has been staged locally (demo). Feel free to email me directly.';
    });

    /* ===== Particles Background (Hero) ===== */
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let W, H, particles;
    function resize(){ W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
    window.addEventListener('resize', ()=>{ resize(); initParticles(); });

    function initParticles(){
      const count = Math.floor((W * H) / 15000); // density-based
      particles = Array.from({length: count}, ()=>({
        x: Math.random()*W,
        y: Math.random()*H,
        vx: (Math.random()-.5)*.4,
        vy: (Math.random()-.5)*.4,
        r: Math.random()*2 + .6
      }));
    }
    function step(){
      ctx.clearRect(0,0,W,H);
      // draw links
      for (let i=0;i<particles.length;i++){
        const p = particles[i];
        for (let j=i+1;j<particles.length;j++){
          const q = particles[j];
          const dx = p.x-q.x, dy = p.y-q.y, d = Math.hypot(dx,dy);
          if (d < 120){
            ctx.globalAlpha = 1 - d/120;
            ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.strokeStyle = 'rgba(130,170,255,.35)'; ctx.lineWidth = .6; ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
      // draw dots
      particles.forEach(p=>{
        p.x += p.vx; p.y += p.vy;
        if (p.x<0||p.x>W) p.vx*=-1; if (p.y<0||p.y>H) p.vy*=-1;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle = 'rgba(160,200,255,.9)'; ctx.fill();
      });
      requestAnimationFrame(step);
    }
    resize(); initParticles(); step();