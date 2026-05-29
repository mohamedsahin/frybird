'use client';

import { usePathname } from 'next/navigation';
import { useCart } from './CartContext';
import { useProducts } from './ProductsContext';
import { aed } from '@/data/menu';

export default function OrderBar() {
  const pathname = usePathname();
  const { items, count, openCart } = useCart();
  const { getProduct } = useProducts();

  // Product pages have their own sticky "Add to Order" bar.
  if (pathname.startsWith('/product/')) return null;

  const total = items.reduce((s, i) => {
    const p = getProduct(i.slug);
    return s + (p ? p.price : 0) * i.qty;
  }, 0);

  return (
    <button className={`orderbar${count > 0 ? ' show' : ''}`} aria-label="View your order" onClick={openCart}>
      <span className="orderbar__info">
        <small>{count} {count === 1 ? 'item' : 'items'}</small>
        <b>{aed(total)}</b>
      </span>
      <span className="go">View Order <span className="arrow">→</span></span>
    </button>
  );
}
