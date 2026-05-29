// ============================================================
// FRYBIRD — Menu data (default seed catalogue)
// ============================================================
import type { Product, Category } from '@/types';

// Default seed catalogue. The live catalogue is stored in /data/products.json
// (see src/lib/store.ts) and seeded from this on first run.
export const DEFAULT_PRODUCTS: Product[] = [
  /* ---------- CHICKEN ---------- */
  {
    slug: 'nashville-tenders', cat: 'chicken', name: 'Nashville Tenders', tag: 'Signature · 2 pc',
    price: 16, heat: 5, img: 'https://4j995en9ra.ufs.sh/f/xtcJqAlsLd7ECAhMAok9VmRI85QhoXnlwaEcKxWv6bkBs17q',
    blurb: 'Cayenne-lacquered, fiery red, sweat-on-your-brow good.',
    desc: 'Two hand-breaded tenders brined for 12 hours, fried to a shatter, then dredged through our house Nashville oil. Comes with pickles and a slice of milk bread to cool the burn.',
    facts: ['12-hour buttermilk brine', 'House Nashville oil', 'Served with pickles + milk bread']
  },
  {
    slug: 'classic-tenders', cat: 'chicken', name: 'Classic Tenders', tag: '2 pc',
    price: 14, heat: 1, img: 'https://4j995en9ra.ufs.sh/f/xtcJqAlsLd7EueD55mKArJjUHxcdRWF9Yqe1VSt6syNT72i5',
    blurb: 'No heat, all crunch. The honest original.',
    desc: 'The OG. Buttermilk-brined, hand-breaded and fried in small batches until golden. Crunchy on the outside, ridiculously juicy on the inside.',
    facts: ['12-hour buttermilk brine', 'Small-batch fried', 'Choice of dip']
  },
  {
    slug: 'flock-bucket', cat: 'chicken', name: 'The Flock Bucket', tag: 'Sharing · 8 pc',
    price: 49, heat: 3, img: null,
    blurb: 'Eight pieces. One very happy table.',
    desc: 'Eight pieces of our famous fried chicken in your choice of heat, piled high in the bucket. Built for the group order — or an extremely committed solo mission.',
    facts: ['Mix any heat levels', 'Feeds 3–4', 'Add fries for AED 9']
  },
  {
    slug: 'buffalo-wings', cat: 'chicken', name: 'Buffalo Wings', tag: '6 pc',
    price: 19, heat: 4, img: null,
    blurb: 'Sticky, saucy, napkin-destroying wings.',
    desc: 'Six crispy wings tossed in our buffalo glaze and finished with a cooling ranch drizzle. Order extra napkins. You will need them.',
    facts: ['Tossed to order', 'Ranch or blue cheese', 'Bone-in']
  },

  /* ---------- BURGERS ---------- */
  {
    slug: 'nash-sando', cat: 'burgers', name: 'The Nash Sando', tag: 'Fan Favourite',
    price: 15, heat: 3, img: 'https://4j995en9ra.ufs.sh/f/xtcJqAlsLd7EZ62KfUugDxIvRsqWJEoHVawhSAX0d4mk15QB',
    blurb: 'The one everyone comes back for.',
    desc: 'A whole Nashville-spiced chicken thigh, melted cheese, pickles and slaw on a butter-toasted brioche bun. The sandwich that built FRYBIRD.',
    facts: ['Whole thigh fillet', 'Butter-toasted brioche', 'House slaw + pickles']
  },
  {
    slug: 'classic-burger', cat: 'burgers', name: 'Classic Chicken Burger', tag: 'The Original',
    price: 10, heat: 1, img: 'https://4j995en9ra.ufs.sh/f/xtcJqAlsLd7EkMKCJUSncKq37ZOXWB1thYEf9mRPdoUGJpM2',
    blurb: 'Where it all started — AED 10, every day.',
    desc: 'Crispy chicken fillet, American cheese, lettuce and our signature sauce on a soft toasted bun. Simple, perfect, unbeatable value.',
    facts: ['Crispy fillet', 'Signature sauce', 'Everyday AED 10']
  },
  {
    slug: 'double-smash', cat: 'burgers', name: 'Double Smash', tag: 'Stack It Up',
    price: 22, heat: 2, img: 'https://4j995en9ra.ufs.sh/f/xtcJqAlsLd7EDMNy9Jsvu4NX9h0bAKYtTpzakE6ZlPxjMQLB',
    blurb: 'Two smashed patties. Cheese in every layer.',
    desc: 'Two thin beef patties smashed crispy on the flat-top, double American cheese, pickles, onions and burger sauce. A proper tower.',
    facts: ['Double smashed patties', 'Double cheese', 'Add bacon for AED 4']
  },
  {
    slug: 'og-beef', cat: 'burgers', name: 'The OG Beef', tag: 'Single & Mighty',
    price: 18, heat: 1, img: 'https://4j995en9ra.ufs.sh/f/xtcJqAlsLd7EP3GitXesBcFVutJ5OzQyG7lmjv2aAd4fxUWe',
    blurb: 'A single smash done right.',
    desc: 'One generous smashed patty, melted cheese, crisp lettuce and pickles, all hugged by a toasted brioche bun. The everyday hero.',
    facts: ['Single smash patty', 'Brioche bun', 'Make it a meal for AED 9']
  },

  /* ---------- SIDES ---------- */
  {
    slug: 'loaded-fries', cat: 'sides', name: 'Loaded Fries', tag: "Share (Or Don't)",
    price: 18, heat: 2, img: 'https://4j995en9ra.ufs.sh/f/xtcJqAlsLd7EuX95tPKArJjUHxcdRWF9Yqe1VSt6syNT72i5',
    blurb: 'Crinkle fries buried in cheese & chicken.',
    desc: 'A mountain of crinkle-cut fries loaded with melted cheese, crispy chicken bits and a drizzle of our spicy sauce. Fork strongly recommended.',
    facts: ['Crinkle-cut', 'Cheese + chicken bits', 'Spicy sauce drizzle']
  },
  {
    slug: 'the-big-tray', cat: 'sides', name: 'The Big Tray', tag: 'Combo',
    price: 29, heat: 3, img: 'https://4j995en9ra.ufs.sh/f/xtcJqAlsLd7EYpgCD9SiCahQpoXIBrH9tS4Ny2JzO5GjTk0x',
    blurb: 'Sando, fries and a dip. The full set.',
    desc: 'Our diner-style combo: a Nash Sando, a heap of crinkle fries and a dipping sauce, all served on the checkerboard tray. The full FRYBIRD experience.',
    facts: ['Sando + fries + dip', 'Served on the tray', 'The full experience']
  },
  {
    slug: 'crinkle-fries', cat: 'sides', name: 'Crinkle Fries', tag: 'Classic',
    price: 9, heat: 0, img: null,
    blurb: 'Golden, crispy, dangerously snackable.',
    desc: 'Classic crinkle-cut fries, fried golden and seasoned with our signature blend. The perfect sidekick to anything on the menu.',
    facts: ['Crinkle-cut', 'Signature seasoning', 'Add cheese for AED 4']
  },
  {
    slug: 'mac-cheese', cat: 'sides', name: 'Mac & Cheese', tag: 'Comfort',
    price: 14, heat: 1, img: null,
    blurb: 'Creamy, cheesy, straight from the box.',
    desc: 'Elbow macaroni in a rich three-cheese sauce, baked till bubbling. Add crispy chicken on top to turn it into a meal.',
    facts: ['Three-cheese sauce', 'Baked to order', 'Top with chicken +AED 6']
  },

  /* ---------- SHAKES & DRINKS ---------- */
  {
    slug: 'thick-shake', cat: 'shakes', name: 'Thick Shakes', tag: 'Cool Down',
    price: 13, heat: 0, img: null,
    blurb: 'The only thing that beats the heat.',
    desc: 'Hand-spun thick shakes in chocolate, vanilla, strawberry or Lotus. The official antidote to a Nashville Hot order.',
    facts: ['Choc · Vanilla · Strawberry · Lotus', 'Hand-spun', 'Real ice cream']
  },
  {
    slug: 'iced-coffee', cat: 'shakes', name: 'Iced Coffee', tag: 'Pick-Me-Up',
    price: 12, heat: 0, img: null,
    blurb: 'Cold, smooth, and very necessary.',
    desc: 'Double-shot iced coffee over plenty of ice. Add caramel or vanilla to make it your own.',
    facts: ['Double shot', 'Over ice', 'Flavour shots available']
  },
  {
    slug: 'soft-drinks', cat: 'shakes', name: 'Soft Drinks', tag: 'Fizz',
    price: 5, heat: 0, img: null,
    blurb: 'The classics, ice cold.',
    desc: 'All your favourites, served ice cold. Cola, lemon-lime, orange and more.',
    facts: ['Ice cold', 'Free refills in-store', 'Cans or fountain']
  }
];

export const CATEGORIES: Category[] = [
  { id: 'all', label: 'Everything' },
  { id: 'chicken', label: 'Fried Chicken' },
  { id: 'burgers', label: 'Burgers' },
  { id: 'sides', label: 'Sides' },
  { id: 'shakes', label: 'Shakes & Drinks' }
];

export const CATEGORY_NAMES: Record<string, string> = {
  chicken: 'Fried Chicken',
  burgers: 'Burgers',
  sides: 'Sides',
  shakes: 'Shakes & Drinks'
};

export const CATEGORY_ORDER: string[] = ['chicken', 'burgers', 'sides', 'shakes'];

// Kept for any static fallback usage.
export const MENU: Product[] = DEFAULT_PRODUCTS;

export function aed(n: number): string {
  return 'AED ' + n;
}

export function heatWord(h: number): string {
  return ['No Heat', 'Mild', 'A Lil\u2019 Kick', 'Nashville', 'Hot', 'Inferno'][h] || '';
}
