'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/*
  Ports the vanilla interactions from the original site.js into React.
  Mounted once in the (site) layout; re-runs its setup on every route change
  so freshly-rendered DOM (data-reveal, data-parallax, data-tilt, data-magnetic,
  data-count) gets wired up.
*/
export default function Effects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups: Array<() => void> = [];

    document.documentElement.classList.add('js');

    /* ---------- REVEAL ---------- */
    const revealStagger = (el: HTMLElement) => {
      if (el.hasAttribute('data-reveal-stagger')) {
        const kids = el.children;
        for (let i = 0; i < kids.length; i++) (kids[i] as HTMLElement).style.transitionDelay = i * 90 + 'ms';
      }
    };
    const revealInView = () => {
      const els = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.in),[data-reveal-stagger]:not(.in)');
      const vh = window.innerHeight || document.documentElement.clientHeight;
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > -50) { revealStagger(el); el.classList.add('in'); }
      });
    };
    let revealQueued = false;
    const onScrollReveal = () => {
      if (revealQueued) return;
      revealQueued = true;
      requestAnimationFrame(() => { revealQueued = false; revealInView(); });
    };
    requestAnimationFrame(() => requestAnimationFrame(revealInView));
    window.addEventListener('scroll', onScrollReveal, { passive: true });
    window.addEventListener('resize', onScrollReveal, { passive: true });
    cleanups.push(() => window.removeEventListener('scroll', onScrollReveal));
    cleanups.push(() => window.removeEventListener('resize', onScrollReveal));
    const forceReveal = () => {
      document.querySelectorAll<HTMLElement>('[data-reveal]:not(.in),[data-reveal-stagger]:not(.in)')
        .forEach((el) => { revealStagger(el); el.classList.add('in'); });
    };
    const safety = setTimeout(forceReveal, 3000);
    cleanups.push(() => clearTimeout(safety));

    /* ---------- COUNTERS ---------- */
    const counted = new WeakSet<Element>();
    const animateCount = (el: HTMLElement) => {
      if (counted.has(el)) return;
      counted.add(el);
      const target = parseFloat(el.getAttribute('data-count') || '0');
      const suffix = el.getAttribute('data-suffix') || '';
      const dur = 1600, start = performance.now();
      const dec = target % 1 !== 0 ? 1 : 0;
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = target * eased;
        el.textContent = (dec ? val.toFixed(1) : Math.round(val)) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const countsInView = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (!counted.has(el) && r.top < vh * 0.85 && r.bottom > 0) animateCount(el);
      });
    };
    window.addEventListener('scroll', countsInView, { passive: true });
    countsInView();
    cleanups.push(() => window.removeEventListener('scroll', countsInView));

    /* ---------- PARALLAX ---------- */
    const parallaxEls = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
    const onScrollParallax = () => {
      const vh = window.innerHeight;
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-parallax') || '0.1') || 0.1;
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const offset = (center - vh / 2) * speed;
        el.style.transform = `translate3d(0,${-offset}px,0)`;
      });
    };
    if (!reduce && parallaxEls.length) {
      const handler = () => requestAnimationFrame(onScrollParallax);
      window.addEventListener('scroll', handler, { passive: true });
      onScrollParallax();
      cleanups.push(() => window.removeEventListener('scroll', handler));
    }

    /* ---------- 3D TILT ---------- */
    if (!reduce) {
      document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
        let rx = 0, ry = 0, raf = 0;
        const apply = () => { card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`; raf = 0; };
        const move = (e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          ry = px * 11; rx = -py * 11;
          if (!raf) raf = requestAnimationFrame(apply);
        };
        const leave = () => { card.style.transform = 'rotateX(0) rotateY(0)'; };
        card.addEventListener('mousemove', move);
        card.addEventListener('mouseleave', leave);
        cleanups.push(() => { card.removeEventListener('mousemove', move); card.removeEventListener('mouseleave', leave); });
      });
    }

    /* ---------- HERO PLATE pointer parallax ---------- */
    const plate = document.querySelector<HTMLElement>('.hero__media');
    if (plate && !reduce) {
      const onMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 18;
        const y = (e.clientY / window.innerHeight - 0.5) * 18;
        plate.style.transform = `translate3d(${x}px,${y}px,0)`;
      };
      window.addEventListener('mousemove', onMove);
      cleanups.push(() => window.removeEventListener('mousemove', onMove));
    }

    /* ---------- MAGNETIC BUTTONS ---------- */
    if (!reduce && window.matchMedia('(pointer:fine)').matches) {
      document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((btn) => {
        const move = (e: MouseEvent) => {
          const r = btn.getBoundingClientRect();
          const x = (e.clientX - r.left - r.width / 2) * 0.35;
          const y = (e.clientY - r.top - r.height / 2) * 0.4;
          btn.style.transform = `translate(${x}px,${y}px)`;
        };
        const leave = () => { btn.style.transform = ''; };
        btn.addEventListener('mousemove', move);
        btn.addEventListener('mouseleave', leave);
        cleanups.push(() => { btn.removeEventListener('mousemove', move); btn.removeEventListener('mouseleave', leave); });
      });
    }

    /* ---------- CURSOR SPARK FOLLOWER ---------- */
    const spark = document.getElementById('sparkCursor');
    if (spark && !reduce && window.matchMedia('(pointer:fine)').matches) {
      let sx = window.innerWidth / 2, sy = window.innerHeight / 2, tx = sx, ty = sy, on = false, raf = 0;
      const onMove = (e: MouseEvent) => {
        tx = e.clientX; ty = e.clientY;
        if (!on) { on = true; spark.classList.add('on'); }
      };
      const onOut = (e: MouseEvent) => { if (!e.relatedTarget) { on = false; spark.classList.remove('on'); } };
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseout', onOut);
      const follow = () => {
        sx += (tx - sx) * 0.18; sy += (ty - sy) * 0.18;
        spark.style.transform = `translate(${sx}px,${sy}px)`;
        raf = requestAnimationFrame(follow);
      };
      raf = requestAnimationFrame(follow);
      cleanups.push(() => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseout', onOut);
        cancelAnimationFrame(raf);
        spark.classList.remove('on');
      });
    }

    /* ---------- SCROLL-VELOCITY MARQUEE SKEW ---------- */
    const tracks = Array.from(document.querySelectorAll<HTMLElement>('.marquee__track'));
    if (tracks.length && !reduce) {
      let lastY = window.scrollY, vel = 0, raf2 = 0;
      const tickSkew = () => {
        vel *= 0.86;
        const sk = Math.max(-10, Math.min(10, vel * 0.35));
        tracks.forEach((t) => t.style.setProperty('--skew', sk.toFixed(2) + 'deg'));
        if (Math.abs(vel) > 0.05) { raf2 = requestAnimationFrame(tickSkew); }
        else { raf2 = 0; tracks.forEach((t) => t.style.setProperty('--skew', '0deg')); }
      };
      const onScroll = () => {
        const nowY = window.scrollY;
        vel = nowY - lastY; lastY = nowY;
        if (!raf2) raf2 = requestAnimationFrame(tickSkew);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      cleanups.push(() => { window.removeEventListener('scroll', onScroll); if (raf2) cancelAnimationFrame(raf2); });
    }

    return () => { cleanups.forEach((fn) => fn()); };
  }, [pathname]);

  return null;
}
