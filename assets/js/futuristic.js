// Landing-page futuristic interactions. Loaded only on index.html.
// Everything checks prefers-reduced-motion and bails out gracefully.
(function(){
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none)").matches;

  // 1) Scroll progress bar
  const bar = document.querySelector(".scroll-bar");
  if(bar){
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight);
      bar.style.width = (p*100) + "%";
    };
    document.addEventListener("scroll", onScroll, {passive:true});
    onScroll();
  }

  // 2) Floating particles (skip on reduced motion / small screens)
  const dots = document.querySelector(".fx-dots");
  if(dots && !reduced && window.innerWidth > 640){
    const N = Math.min(26, Math.round(window.innerWidth/55));
    for(let i=0;i<N;i++){
      const d = document.createElement("i");
      const dur = 9 + Math.random()*12;
      d.style.left = (Math.random()*100) + "vw";
      d.style.animationDuration = dur + "s";
      d.style.animationDelay = (-Math.random()*dur) + "s";
      const s = 2 + Math.random()*2.5;
      d.style.width = d.style.height = s + "px";
      d.style.opacity = (0.3 + Math.random()*0.4).toFixed(2);
      dots.appendChild(d);
    }
  }

  // 3) Cursor-follow glow in hero (desktop only)
  const hero = document.querySelector(".hero.futuristic");
  const spot = document.querySelector(".hero-spot");
  if(hero && spot && !isTouch && !reduced){
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      spot.style.setProperty("--mx", (e.clientX - r.left) + "px");
      spot.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  }

  // 4) Magnetic buttons (desktop only)
  if(!isTouch && !reduced){
    document.querySelectorAll(".mag").forEach(el => {
      const strength = 18;
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width/2)/r.width;
        const y = (e.clientY - r.top - r.height/2)/r.height;
        el.style.transform = `translate(${x*strength}px, ${y*strength}px)`;
      });
      el.addEventListener("pointerleave", () => { el.style.transform = "translate(0,0)"; });
    });
  }

  // 5) Portal radial-glow follows cursor
  if(!isTouch){
    document.querySelectorAll(".portal").forEach(p => {
      p.addEventListener("pointermove", (e) => {
        const r = p.getBoundingClientRect();
        p.style.setProperty("--px", (e.clientX - r.left) + "px");
        p.style.setProperty("--py", (e.clientY - r.top) + "px");
      });
    });
  }

  // 6) Subtle 3D tilt on hero mock cards (desktop only)
  if(!isTouch && !reduced){
    document.querySelectorAll(".tilt").forEach(card => {
      const stage = card.closest(".stage") || card;
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top)/r.height - .5) * -10;
        const ry = ((e.clientX - r.left)/r.width - .5) * 10;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });
  }

  // 7) Typewriter for the eyebrow phrase
  const tw = document.querySelector("[data-typewriter]");
  if(tw && !reduced){
    const phrases = JSON.parse(tw.getAttribute("data-typewriter"));
    let pi=0, ci=0, deleting=false;
    const tick = () => {
      const word = phrases[pi];
      tw.textContent = word.slice(0, ci);
      if(!deleting && ci < word.length){ ci++; }
      else if(deleting && ci > 0){ ci--; }
      else if(!deleting && ci === word.length){ deleting=true; setTimeout(tick, 1600); return; }
      else { deleting=false; pi=(pi+1)%phrases.length; }
      setTimeout(tick, deleting ? 40 : 70);
    };
    tick();
  } else if (tw) {
    tw.textContent = JSON.parse(tw.getAttribute("data-typewriter"))[0];
  }
})();
