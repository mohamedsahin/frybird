# FRYBIRD — Next.js + TypeScript

The FRYBIRD brand & product site, built on **Next.js 14 (App Router) in TypeScript** — fully responsive from desktop down to mobile, with an **app-like mobile experience** (bottom tab bar, sticky order bar, add-to-cart toast), a working cart, a contact form that saves messages, and a password-protected **admin panel** for managing products and reading submissions.

Fried Chicken • Burgers — UAE. *Fry. Eat. Repeat.*

## Responsive & mobile UX

- Fluid layouts and type from large desktop → tablet → phone (tested at 1440 / 768 / 390px).
- **Mobile app chrome:** fixed bottom **tab bar** (Home / Menu / Find / Order), a slide-up **order bar** showing item count + total, and an **add-to-cart toast** — so the phone build feels like a native ordering app.
- Menu category filters become a horizontal **chip scroller**; product pages get a sticky **“Add to Order”** bar.
- Respects `prefers-reduced-motion`; safe-area insets handled for notched devices.

## Interactive 3D

The home page has a **“Spin The Bird”** section with a real-time **WebGL 3D fried-chicken drumstick** you can drag to rotate (auto-spins when idle). It's built procedurally with **three.js** (`src/components/Chicken3D.tsx`) — no model file needed — and three.js is dynamically imported so it never touches the server bundle.

---

## Run it locally

You need **Node.js 18.17+** (or 20+).

```bash
cd frybird-next
cp .env.local.example .env.local   # then edit the credentials
npm install
npm run dev
```

Open **http://localhost:3000** (storefront) and **http://localhost:3000/admin** (admin).

### Commands
```bash
npm run dev     # development
npm run build   # production build
npm run start   # serve the production build
```

### Database (Prisma ORM)
```bash
npm run db:generate   # generate Prisma Client
npm run db:push       # sync schema to PostgreSQL
npm run db:migrate    # create/apply SQL migrations in development
npm run db:studio     # open Prisma Studio (visual data manager)
npm run db:seed       # seed products from data/products.json
```

---

## Admin panel

- **URL:** `/admin` → redirects to `/admin/login` until you sign in.
- **Default login:** `admin` / `frybird123` — **change these** in `.env.local`.
- **Dashboard** — counts + recent messages + quick actions.
- **Products** — full CRUD. Add / edit / delete menu items. Changes appear on the public site immediately (name, price, heat, photo, description, facts, category).
- **Submissions** — every contact-form message, newest first; mark read/unread and delete.

### Authentication
A lightweight cookie session:
- `src/middleware.js` guards `/admin/*` and `/api/admin/*`.
- `POST /api/admin/login` checks `ADMIN_USERNAME` / `ADMIN_PASSWORD` and sets an httpOnly cookie equal to `ADMIN_SESSION_TOKEN`.
- This is intentionally simple. For production with multiple users, swap in NextAuth/Auth.js or Clerk.

---

## Where data lives

Products and submissions now persist in **PostgreSQL** via **Prisma ORM**.

- Prisma schema: `prisma/schema.prisma`
- Prisma seed script: `prisma/seed.mjs`
- App data layer: `src/lib/store.ts`

`data/products.json` is still used as an initial seed source (first-run bootstrap) when the database is empty.

### Prisma workflow

```bash
npm run db:format     # format schema.prisma
npm run db:generate   # generate Prisma Client
npm run db:push       # sync schema to DB (no SQL migration files)
npm run db:migrate    # create/apply SQL migrations in development
npm run db:deploy     # apply committed migrations in production
npm run db:reset      # reset DB and re-run migrations/seeds (dev only)
npm run db:studio     # browse/edit data visually
npm run db:seed       # seed products from data/products.json
```

---

## Project structure

```
src/
├─ middleware.ts              # admin auth guard
├─ app/
│  ├─ layout.tsx             # root <html>/<body> + global CSS
│  ├─ globals.css            # full design system + admin styles
│  ├─ (site)/                # public storefront (own layout: Nav/Footer/Cart)
│  │  ├─ layout.tsx          # loads live products → ProductsProvider + CartProvider
│  │  ├─ page.tsx            # Home
│  │  ├─ menu/ · product/[slug]/ · about/ · locations/ · contact/
│  ├─ admin/                 # admin panel (own layout, no storefront chrome)
│  │  ├─ layout.tsx · login/ · page.tsx (dashboard)
│  │  ├─ products/ · products/new/ · products/[slug]/ (edit)
│  │  └─ submissions/
│  └─ api/
│     ├─ contact/                    # public: save a submission
│     └─ admin/                      # protected
│        ├─ login/ · logout/
│        ├─ products/ · products/[slug]/
│        └─ submissions/[id]/
├─ components/                # Nav, Footer, CartDrawer, Effects, MenuCard,
│  │                         #  HeatSlider, LocationsMap, ContactForm, …
│  └─ admin/                  # AdminShell, ProductForm, ProductActions, SubmissionActions
├─ data/menu.ts              # default seed catalogue + categories + helpers
└─ lib/store.ts              # Prisma-backed data store (products + submissions)
```

---

## ⚠️ Placeholders to replace before launch

- **Admin credentials** → `.env.local`.
- **WhatsApp number** for cart checkout → `src/components/CartDrawer.tsx` (`WHATSAPP_NUMBER`).
- **Phone numbers / addresses** → `src/app/(site)/locations/page.tsx`.
- **Prices / photos** → manage in the **admin panel** (or edit the seed in `src/data/menu.ts`).
- Optionally email yourself on new submissions: add an email send (Resend/SendGrid) inside `src/app/api/contact/route.ts`.

---

## Notes

- **TypeScript** throughout (`tsconfig.json`, shared domain types in `src/types.ts`). Config is pragmatic (non-strict null checks) so the build is forgiving; tighten `strict` in `tsconfig.json` when you want.
- Public pages read the live catalogue per request (`dynamic = 'force-dynamic'`) so admin edits show instantly.
- Plain `<img>` tags keep the original CSS intact; switch to `next/image` per component if desired.
- Google Fonts (Anton, Archivo) load via `@import` at the top of `globals.css`.
- Animations respect `prefers-reduced-motion`.
