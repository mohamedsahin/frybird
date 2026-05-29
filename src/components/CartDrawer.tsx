'use client';

import Link from 'next/link';
import { useCart } from './CartContext';
import { useProducts } from './ProductsContext';
import { aed } from '@/data/menu';

// FRYBIRD WhatsApp number (international format, digits only).
const WHATSAPP_NUMBER = '971544270544';

export default function CartDrawer() {
  const { items, open, closeCart, changeQty, clear } = useCart();
  const { getProduct } = useProducts();

  const lines = items.map((i) => ({ ...i, product: getProduct(i.slug) })).filter((i) => i.product);
  const total = lines.reduce((s, i) => s + i.product.price * i.qty, 0);

  const waText = encodeURIComponent(
    ['Hi FRYBIRD! I\'d like to order:']
      .concat(lines.map((i) => `• ${i.qty}× ${i.product.name} (${aed(i.product.price)})`))
      .concat([`Total: ${aed(total)}`])
      .join('\n')
  );
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;

  return (
    <>
      <div className={`cart-overlay${open ? ' show' : ''}`} onClick={closeCart} />
      <aside className={`cart${open ? ' open' : ''}`} aria-label="Your order">
        <div className="cart__head">
          <h3 className="display">Your Order</h3>
          <button className="cart__close" aria-label="Close" onClick={closeCart}>✕</button>
        </div>

        <div className="cart__body">
          {lines.length === 0 ? (
            <div className="cart__empty">
              <div className="cart__emptyicon">🍗</div>
              <p>Your tray is empty.</p>
              <Link href="/menu" className="btn btn--red" data-magnetic onClick={closeCart}>
                <span className="lbl">Start an Order</span>
              </Link>
            </div>
          ) : (
            lines.map((i) => (
              <div className="cart__item" key={i.slug}>
                <div className="cart__thumb">
                  {i.product.img ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={i.product.img} alt="" />
                  ) : (
                    <div className="ph ph--sm" />
                  )}
                </div>
                <div className="cart__info">
                  <b>{i.product.name}</b>
                  <span>{aed(i.product.price)}</span>
                </div>
                <div className="cart__qty">
                  <button aria-label="Less" onClick={() => changeQty(i.slug, -1)}>−</button>
                  <span>{i.qty}</span>
                  <button aria-label="More" onClick={() => changeQty(i.slug, 1)}>+</button>
                </div>
              </div>
            ))
          )}
        </div>

        {lines.length > 0 && (
          <div className="cart__foot">
            <div className="cart__total"><span>Total</span><b>{aed(total)}</b></div>
            <a className="btn btn--red cart__checkout" href={waHref} target="_blank" rel="noopener noreferrer">
              <span className="lbl">Checkout on WhatsApp <span className="arrow">→</span></span>
            </a>
            <button className="cart__clear" onClick={clear}>Clear order</button>
          </div>
        )}
      </aside>
    </>
  );
}
