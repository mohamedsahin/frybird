'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const NAV = [
  { href: '/admin', label: 'Dashboard', exact: true },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/submissions', label: 'Submissions' },
];

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (item) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="adm">
      <aside className="adm__side">
        <div className="adm__brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/logo.png" alt="FRYBIRD" />
          <div><b>FRYBIRD</b><span>Admin</span></div>
        </div>
        <nav className="adm__nav">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className={isActive(item) ? 'active' : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="adm__sidefoot">
          <a href="/" target="_blank" rel="noopener noreferrer" className="adm__viewsite">↗ View site</a>
          <button className="adm__logout" onClick={logout}>Log out</button>
        </div>
      </aside>
      <main className="adm__main">{children}</main>
    </div>
  );
}
