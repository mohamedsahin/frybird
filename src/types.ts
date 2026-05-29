// ============================================================
// FRYBIRD — shared domain types
// ============================================================

export type CategoryId = 'chicken' | 'burgers' | 'sides' | 'shakes';

export interface Product {
  slug: string;
  cat: CategoryId | string;
  name: string;
  tag: string;
  price: number;
  /** Heat level 0–5 */
  heat: number;
  /** Public path under /public, or null for a "coming soon" placeholder */
  img: string | null;
  blurb: string;
  desc: string;
  facts: string[];
}

export interface Category {
  id: string;
  label: string;
}

export interface CartItem {
  slug: string;
  qty: number;
}

export interface Submission {
  id: string;
  createdAt: string;
  read: boolean;
  name: string;
  email: string;
  topic: string;
  message: string;
}
