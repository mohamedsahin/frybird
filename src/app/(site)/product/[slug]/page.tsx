import Link from 'next/link';
import { notFound } from 'next/navigation';
import { heatWord } from '@/data/menu';
import { getProducts, getProductBySlug } from '@/lib/store';
import { HeatDots, DishImage } from '@/components/Media';
import ProductBuy from '@/components/ProductBuy';
import MenuCard from '@/components/MenuCard';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const item = await getProductBySlug(params.slug);
  if (!item) return { title: 'Not found — FRYBIRD' };
  return {
    title: `${item.name} — FRYBIRD`,
    description: item.desc,
  };
}

export default async function ProductPage({ params }) {
  const item = await getProductBySlug(params.slug);
  if (!item) notFound();

  const related = (await getProducts()).filter((m) => m.cat === item.cat && m.slug !== item.slug).slice(0, 3);

  return (
    <section className="product">
      <div className="wrap">
        <Link className="product__back" href="/menu">← All menu</Link>

        <div className="product__grid">
          <div className="product__media" data-reveal>
            <DishImage item={item} />
            <div className="pricebadge"><small>AED</small><b>{item.price}</b></div>
          </div>

          <div className="product__info" data-reveal>
            <span className="ptag">{item.tag}</span>
            <h1>{item.name}</h1>
            <div className="product__heatline">
              <span className="lbl">Heat</span>
              <HeatDots heat={item.heat} />
              <span className="lbl">{heatWord(item.heat)}</span>
            </div>
            <p className="product__desc">{item.desc}</p>
            <ul className="product__facts">
              {item.facts.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
            <ProductBuy slug={item.slug} price={item.price} />
          </div>
        </div>

        {related.length > 0 && (
          <div className="related" data-reveal>
            <h2>You Might Also Crave</h2>
            <div className="menu-cards" data-reveal-stagger>
              {related.map((it) => <MenuCard key={it.slug} item={it} />)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
