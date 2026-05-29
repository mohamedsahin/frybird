'use client';

import { useEffect, useRef, useState } from 'react';
import { useCart } from './CartContext';
import { useProducts } from './ProductsContext';

export default function Toast() {
  const { toast } = useCart();
  const { getProduct } = useProducts();
  const [msg, setMsg] = useState('');
  const [show, setShow] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!toast) return;
    const slug = toast.split('|')[0];
    const p = getProduct(slug);
    setMsg(p ? `Added — ${p.name}` : 'Added to order');
    setShow(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setShow(false), 1900);
    return () => { if (timer.current) clearTimeout(timer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast]);

  return (
    <div className={`toast${show ? ' show' : ''}`} aria-live="polite">
      <span className="tick">✓</span>
      <span>{msg}</span>
    </div>
  );
}
