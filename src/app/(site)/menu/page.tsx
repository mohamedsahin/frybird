import MenuBrowser from '@/components/MenuBrowser';
import { getProducts } from '@/lib/store';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Menu — FRYBIRD | Fried Chicken • Burgers',
  description: 'The full FRYBIRD menu — Nashville hot chicken, smash burgers, loaded fries, shakes and more. Fry. Eat. Repeat.',
};

export default async function MenuPage() {
  const products = await getProducts();
  return (
    <>
      <section className="page-hero">
        <div className="hero__glow" />
        <div className="hero__bgtext" aria-hidden="true">
          <span>MENU MENU</span><span>MENU MENU</span><span>MENU MENU</span><span>MENU MENU</span>
        </div>
        <div className="wrap page-hero__inner">
          <div className="crumb" data-reveal><a href="/">Home</a> / Menu</div>
          <h1 className="display" data-reveal>The Whole<br /><span className="txt-red">Flock</span></h1>
          <p data-reveal>Hand-breaded chicken, smashed burgers, loaded sides and thick shakes. Tap any item for the full story — or just add it to your tray.</p>
        </div>
      </section>

      <MenuBrowser products={products} />

      <div className="marquee marquee--cream" aria-hidden="true">
        <div className="marquee__track">
          {Array.from({ length: 4 }).map((_, k) => (
            <span key={k}>Fry <i className="star">●</i> Eat <i className="star">●</i> Repeat <i className="star">●</i></span>
          ))}
        </div>
      </div>
    </>
  );
}
