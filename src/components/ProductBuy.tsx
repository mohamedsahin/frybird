'use client';

import { useState } from 'react';
import { useCart } from './CartContext';

export default function ProductBuy({ slug, price }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <div className="product__buy">
      <div className="qtybox">
        <button aria-label="Less" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
        <span>{qty}</span>
        <button aria-label="More" onClick={() => setQty((q) => q + 1)}>+</button>
      </div>
      <button className="btn btn--red" data-magnetic onClick={() => addItem(slug, qty)}>
        <span className="lbl">Add to Order · <span>AED {price * qty}</span></span>
      </button>
    </div>
  );
}
