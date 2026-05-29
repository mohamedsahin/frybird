'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import type { CartItem } from '@/types';

const CART_KEY = 'frybird_cart_v1';

interface CartContextValue {
  items: CartItem[];
  hydrated: boolean;
  open: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (slug: string, qty?: number) => void;
  changeQty: (slug: string, delta: number) => void;
  clear: () => void;
  count: number;
  toast: string;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState('');

  // load from localStorage once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (raw) setItems(JSON.parse(raw) || []);
    } catch (e) { /* ignore */ }
    setHydrated(true);
  }, []);

  // persist
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch (e) { /* ignore */ }
  }, [items, hydrated]);

  // lock body scroll while drawer open
  useEffect(() => {
    document.body.classList.toggle('no-scroll', open);
    return () => document.body.classList.remove('no-scroll');
  }, [open]);

  const addItem = useCallback((slug: string, qty: number = 1) => {
    setItems((prev) => {
      const next = prev.map((i) => ({ ...i }));
      const found = next.find((i) => i.slug === slug);
      if (found) found.qty += qty; else next.push({ slug, qty });
      return next;
    });
    // fire a toast (re-trigger even if same slug via timestamp suffix)
    setToast(slug + '|' + Date.now());
  }, []);

  const changeQty = useCallback((slug: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.slug === slug ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value: CartContextValue = {
    items, hydrated,
    open, openCart: () => setOpen(true), closeCart: () => setOpen(false),
    addItem, changeQty, clear,
    count: items.reduce((s, i) => s + i.qty, 0),
    toast,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
