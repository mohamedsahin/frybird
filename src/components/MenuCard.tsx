'use client';

import Link from 'next/link';
import { useCart } from './CartContext';
import { HeatDots, DishImage } from './Media';

export default function MenuCard({ item }) {
  const { addItem } = useCart();
  return (
    <article className="mcard" data-cat={item.cat}>
      <Link className="mcard__img" href={`/product/${item.slug}`} aria-label={`View ${item.name}`}>
        <DishImage item={item} />
        <span className="mcard__heat"><HeatDots heat={item.heat} /></span>
      </Link>
      <div className="mcard__body">
        <div className="mcard__tag">{item.tag}</div>
        <h3><Link href={`/product/${item.slug}`} style={{ color: 'inherit' }}>{item.name}</Link></h3>
        <p className="mcard__blurb">{item.blurb}</p>
        <div className="mcard__row">
          <div className="mcard__price"><small>AED</small>{item.price}</div>
          <button className="mcard__add" onClick={() => addItem(item.slug)}>Add +</button>
        </div>
      </div>
    </article>
  );
}
