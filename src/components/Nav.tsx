'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCart } from './CartContext';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'Our Story' },
  { href: '/locations', label: 'Locations' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // bump the cart icon when count changes
  useEffect(() => {
    if (count === 0) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 500);
    return () => clearTimeout(t);
  }, [count]);

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}${open ? ' open' : ''}`}>
      <Link href="/" className="nav__logo" aria-label="FRYBIRD home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/logo.png" alt="FRYBIRD" />
      </Link>

      <nav className="nav__links">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className={isActive(l.href) ? 'active' : undefined}>
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="nav__cta">
        <button
          className={`nav__cartbtn${bump ? ' bump' : ''}`}
          aria-label="View order"
          onClick={openCart}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 4h2l2.4 12.5a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.2L21 8H6" />
            <circle cx="9.5" cy="20.5" r="1.3" fill="currentColor" stroke="none" />
            <circle cx="18" cy="20.5" r="1.3" fill="currentColor" stroke="none" />
          </svg>
          <span className={`nav__cartcount${count > 0 ? ' show' : ''}`}>{count}</span>
        </button>

        <Link href="/menu" className="btn btn--red nav__order" data-magnetic>
          <span className="lbl">Order Now <span className="arrow">→</span></span>
        </Link>

        <button
          className="nav__burger"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
