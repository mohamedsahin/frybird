'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCart } from './CartContext';

const ICONS: Record<string, JSX.Element> = {
  home: (
    <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></svg>
  ),
  menu: (
    <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M4 12h16M4 17h10" /></svg>
  ),
  pin: (
    <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s7-6.4 7-11a7 7 0 1 0-14 0c0 4.6 7 11 7 11z" /><circle cx="12" cy="10" r="2.4" /></svg>
  ),
  bag: (
    <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8h12l-1 12H7L6 8z" /><path d="M9 8a3 3 0 0 1 6 0" /></svg>
  ),
};

const TABS = [
  { href: '/', icon: 'home', label: 'Home', exact: true },
  { href: '/menu', icon: 'menu', label: 'Menu' },
  { href: '/locations', icon: 'pin', label: 'Find' },
];

export default function MobileTabBar() {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const [bump, setBump] = useState(false);

  useEffect(() => {
    if (count === 0) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 500);
    return () => clearTimeout(t);
  }, [count]);

  const isActive = (t: { href: string; exact?: boolean }) =>
    t.exact ? pathname === t.href : pathname.startsWith(t.href);

  return (
    <nav className="tabbar" aria-label="Mobile navigation">
      {TABS.map((t) => (
        <Link key={t.href} href={t.href} className={isActive(t) ? 'active' : undefined}>
          {ICONS[t.icon]}
          <span>{t.label}</span>
        </Link>
      ))}
      <button className={`tabbar__cart${bump ? ' bump' : ''}`} aria-label="Your order" onClick={openCart}>
        {ICONS.bag}
        <span>Order</span>
        <span className={`tabbar__count${count > 0 ? ' show' : ''}`}>{count}</span>
      </button>
    </nav>
  );
}
