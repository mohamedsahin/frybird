'use client';

import { useState } from 'react';
import { CATEGORIES, CATEGORY_NAMES, CATEGORY_ORDER } from '@/data/menu';
import MenuCard from './MenuCard';

export default function MenuBrowser({ products }) {
  const [cat, setCat] = useState('all');

  const groups = CATEGORY_ORDER
    .map((c) => ({ cat: c, items: products.filter((m) => m.cat === c) }))
    .filter((g) => g.items.length);

  return (
    <>
      <div className="menu-filters">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            className={cat === c.id ? 'active' : undefined}
            onClick={() => setCat(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <section className="menu-list">
        <div className="wrap">
          {groups.map((g) => (
            <div
              className="menu-group"
              data-cat={g.cat}
              key={g.cat}
              style={{ display: cat === 'all' || cat === g.cat ? undefined : 'none' }}
            >
              <div className="menu-group__head" data-reveal>
                <h2>{CATEGORY_NAMES[g.cat]}</h2><span>({g.items.length})</span>
              </div>
              <div className="menu-cards" data-reveal-stagger>
                {g.items.map((it) => <MenuCard key={it.slug} item={it} />)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
