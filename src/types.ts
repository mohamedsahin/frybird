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

export interface Location {
  slug: string;
  /** City / branch name, e.g. "Fujairah" */
  name: string;
  /** Arabic name, e.g. "الفجيرة" */
  nameAr: string;
  /** Short tagline, e.g. "East Coast flagship" */
  descriptor: string;
  /** Status pill text, e.g. "Open Now" / "Coming Soon" */
  statusLabel: string;
  /** Highlight the row in brand red (the featured branch) */
  accent: boolean;
  /** "Your City?" style aspirational entry — no detail card / directions */
  isPlaceholder: boolean;
  address: string;
  hours: string;
  phone: string;
  /** Google Maps share/directions link */
  mapUrl: string;
  /** Photo URL (UploadThing) or null for a placeholder tile */
  img: string | null;
  /** Real geo coordinates — drive the live map preview. null = no pin yet. */
  lat: number | null;
  lng: number | null;
  sortOrder: number;
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
