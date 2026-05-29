import Link from 'next/link';
import { getProducts, getSubmissions } from '@/lib/store';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const products = await getProducts();
  const subs = await getSubmissions();
  const unread = subs.filter((s) => !s.read).length;

  const stats = [
    { label: 'Products', value: products.length, href: '/admin/products' },
    { label: 'Total Messages', value: subs.length, href: '/admin/submissions' },
    { label: 'Unread', value: unread, href: '/admin/submissions' },
  ];

  return (
    <div>
      <header className="adm__head">
        <h1>Dashboard</h1>
        <p>Welcome back. Here&apos;s what&apos;s cooking.</p>
      </header>

      <div className="adm__stats">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="adm__stat">
            <div className="adm__statnum">{s.value}</div>
            <div className="adm__statlbl">{s.label}</div>
          </Link>
        ))}
      </div>

      <section className="adm__panel">
        <div className="adm__panelhead">
          <h2>Recent messages</h2>
          <Link href="/admin/submissions" className="adm__link">View all →</Link>
        </div>
        {subs.length === 0 ? (
          <p className="adm__empty">No messages yet.</p>
        ) : (
          <ul className="adm__recent">
            {subs.slice(0, 5).map((s) => (
              <li key={s.id}>
                <span className={`adm__dot${s.read ? '' : ' on'}`} />
                <b>{s.name}</b>
                <span className="adm__muted">{s.topic}</span>
                <span className="adm__msgprev">{s.message}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="adm__panel">
        <div className="adm__panelhead">
          <h2>Quick actions</h2>
        </div>
        <div className="adm__actions">
          <Link href="/admin/products/new" className="btn btn--red"><span className="lbl">+ Add Product</span></Link>
          <Link href="/admin/products" className="btn btn--ghost adm__ghost"><span className="lbl">Manage Menu</span></Link>
        </div>
      </section>
    </div>
  );
}
