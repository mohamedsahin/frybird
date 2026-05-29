'use client';

import Link from 'next/link';
import { useCart } from './CartContext';
import { useProducts } from './ProductsContext';

// Which products to feature on the home bento, and their grid sizing.
const FEATURED = [
  { slug: 'nash-sando', cls: 'wide tall' },
  { slug: 'classic-burger', cls: '' },
  { slug: 'nashville-tenders', cls: '' },
  { slug: 'double-smash', cls: 'wide' },
  { slug: 'loaded-fries', cls: '' },
];

function Heat({ n }) {
  return (
    <div className="dish__heat">
      {[0, 1, 2, 3, 4].map((i) => <i key={i} className={i < n ? 'on' : ''} />)}
    </div>
  );
}

export default function SignatureHits() {
  const { addItem } = useCart();
  const { getProduct } = useProducts();

  const items = FEATURED
    .map((f) => ({ ...f, p: getProduct(f.slug) }))
    .filter((f) => f.p);

  return (
    <div className="menu__grid tilt-wrap" data-reveal-stagger>
      {items.map(({ slug, cls, p }) => (
        <article key={slug} className={`dish ${cls}`.trim()} data-tilt>
          <Link className="dish__link" href={`/product/${slug}`} aria-label={`View ${p.name}`} />
          <Heat n={p.heat} />
          <div className="dish__img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.img || '/img/logo.png'} alt={p.name} />
          </div>
          <div className="dish__body">
            <div className="dish__tag">{p.tag}</div>
            <h3>{p.name}</h3>
            <div className="dish__row">
              <div className="dish__price"><small>AED</small>{p.price}</div>
              <button className="dish__plus" aria-label="Add to order" onClick={() => addItem(slug)}>+</button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
