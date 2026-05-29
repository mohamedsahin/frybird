// ============================================================
// FRYBIRD — Location data (default seed)
// ============================================================
import type { Location } from '@/types';

// Seeded into the DB on first run (see src/lib/store.ts). After that the live
// list lives in the `locations` table and is managed from the admin panel.
export const DEFAULT_LOCATIONS: Location[] = [
  {
    slug: 'fujairah', name: 'Fujairah', nameAr: 'الفجيرة', descriptor: 'East Coast flagship',
    statusLabel: 'Open Now', accent: true, isPlaceholder: false,
    address: 'Main Street, Fujairah · الفجيرة, UAE',
    hours: 'Daily · 11:00am – 2:00am',
    phone: '+971 50 000 0000',
    mapUrl: 'https://maps.app.goo.gl/QDCMjTTMcfCWEsyp6',
    img: '/img/storefront-night.png', lat: 25.1288, lng: 56.3265, sortOrder: 1,
  },
  {
    slug: 'ajman', name: 'Ajman', nameAr: 'عجمان', descriptor: 'City centre',
    statusLabel: 'Open Now', accent: false, isPlaceholder: false,
    address: 'City Centre area, Ajman · عجمان, UAE',
    hours: 'Daily · 11:00am – 2:00am',
    phone: '+971 55 774 0687',
    mapUrl: 'https://maps.app.goo.gl/9FJvRLjQnoxey63E6',
    img: '/img/interior-counter.png', lat: 25.4052, lng: 55.5136, sortOrder: 2,
  },
  {
    slug: 'oman', name: 'Oman', nameAr: 'عُمان', descriptor: 'Now serving',
    statusLabel: 'Open Now', accent: false, isPlaceholder: false,
    address: 'Now serving · عُمان, Oman',
    hours: 'Daily · 11:00am – 1:00am',
    phone: '+968 0000 0000',
    mapUrl: 'https://www.google.com/maps/search/FRYBIRD+Oman',
    img: '/img/queue.png', lat: 23.5880, lng: 58.3829, sortOrder: 3,
  },
  {
    slug: 'your-city', name: 'Your City?', nameAr: '', descriptor: "We're expanding fast",
    statusLabel: 'Coming Soon', accent: false, isPlaceholder: true,
    address: "We're scouting new neighbourhoods across the GCC.",
    hours: '',
    phone: '',
    mapUrl: '',
    img: null, lat: null, lng: null, sortOrder: 4,
  },
];
