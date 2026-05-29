import Link from 'next/link';
import HeatSlider from '@/components/HeatSlider';
import SignatureHits from '@/components/SignatureHits';
import LocationsMap from '@/components/LocationsMap';
import Doodle, { Scribble } from '@/components/Doodle';
import Chicken3D from '@/components/Chicken3D';
import { getLocations } from '@/lib/store';

export const dynamic = 'force-dynamic';

// Spell out small counts ("Three locations") and fall back to digits beyond that.
function countWord(n: number): string {
  const words = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
  return words[n] ?? String(n);
}

export default async function HomePage() {
  const locations = await getLocations();
  const openCount = locations.filter((l) => !l.isPlaceholder).length;
  const cityNames = locations.filter((l) => !l.isPlaceholder).map((l) => l.name).join(', ');

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero" id="top">
        <div className="hero__glow" />
        <div className="hero__bgtext" aria-hidden="true">
          <span>FRYBIRD FRYBIRD</span><span>FRYBIRD FRYBIRD</span><span>FRYBIRD FRYBIRD</span><span>FRYBIRD FRYBIRD</span>
        </div>

        <Doodle shape="sparkle" className="doodle--float doodle--orange doodle--hideSm" data-parallax="0.12" style={{ top: '7%', left: '2.5%', width: 56, height: 56, '--dur': '6s', '--rot': '-8deg' }} />
        <Doodle shape="star" className="doodle--spin doodle--cream doodle--hideSm" style={{ top: '11%', right: '39%', width: 46, height: 46, '--dur': '18s' }} />
        <Doodle shape="chili" className="doodle--float2 doodle--poke" style={{ bottom: '9%', left: '47%', width: 62, height: 62, '--dur': '7s', '--rot': '6deg' }} />
        <Doodle shape="wave" className="doodle--float doodle--cream doodle--hideSm" style={{ bottom: '14%', right: '14%', width: 84, height: 48, '--dur': '8s', '--rot': '-4deg' }} />

        <div className="hero__inner">
          <div className="hero__text">
            <span className="hero__tag kicker"><span className="dot" /> Fried Chicken • Burgers · UAE</span>
            <h1 className="display">
              <span className="l"><span className="txt-cream">FRY.</span></span>
              <span className="l"><span className="txt-red">EAT.</span></span>
              <span className="l"><span className="scribbleword stroke-cream">REPEAT.<Scribble show /></span></span>
            </h1>
            <p className="hero__sub">Nashville-style fried chicken and proper smash burgers, fried fresh to obsession. Born in the UAE — and <strong>hotter than ever.</strong></p>
            <div className="hero__btns">
              <Link href="/menu" className="btn btn--red" data-magnetic><span className="lbl">See the Menu <span className="arrow">→</span></span></Link>
              <Link href="/locations" className="btn btn--ghost" data-magnetic><span className="lbl">Find a FRYBIRD</span></Link>
            </div>
          </div>

          <div className="hero__media">
            <div className="plate">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/burger-fries.png" alt="FRYBIRD chicken burger with crinkle fries" />
            </div>
            <div className="badge"><span>FRY ·</span><span>EAT ·</span><span>REPEAT</span></div>
            <div className="price-tag"><small>FROM</small><b>10</b><small>AED</small></div>
          </div>
        </div>

        <div className="hero__scroll"><span>Scroll</span><span className="line" /></div>
      </section>

      {/* ============ MARQUEE ============ */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {Array.from({ length: 2 }).flatMap((_, k) => [
            <span key={`a${k}`}>Nashville Hot Chicken <i className="star">★</i></span>,
            <span key={`b${k}`}>Smash Burgers <i className="star">★</i></span>,
            <span key={`c${k}`}>Loaded Fries <i className="star">★</i></span>,
            <span key={`d${k}`}>Thick Shakes <i className="star">★</i></span>,
          ])}
        </div>
      </div>

      {/* ============ STORY ============ */}
      <section className="section story" id="story">
        <Doodle shape="star" className="doodle--spin doodle--ink doodle--hideSm" data-parallax="0.1" style={{ top: '12%', right: '7%', width: 58, height: 58, '--dur': '20s' }} />
        <Doodle shape="sparkle" className="doodle--float doodle--poke" data-parallax="0.14" style={{ bottom: '16%', right: '12%', width: 52, height: 52, color: 'var(--orange)', '--dur': '6.5s', '--rot': '10deg' }} />
        <div className="wrap">
          <div className="story__grid">
            <div className="story__copy" data-reveal>
              <span className="kicker txt-red" style={{ display: 'block', marginBottom: 18 }}>/ The Bird</span>
              <h2 className="display">Born in the UAE.<br /><em>Fried to <span className="scribbleword">obsession.<Scribble /></span></em></h2>
              <p>It started with one idea: chicken so crunchy, so juicy, so <strong>shamelessly good</strong> that you&apos;d plan your whole day around it. We brine every cut in buttermilk overnight, hand-bread it to order, and fry it in small batches until it shatters.</p>
              <p>{cityNames ? `Across ${cityNames}, ` : ''}FRYBIRD has become the neighbourhood spot where the diner glows red, the posters cover the walls, and the tray always says one thing — <strong>FRY. EAT. REPEAT.</strong></p>
              <Link href="/menu" className="btn btn--red" style={{ marginTop: 10 }} data-magnetic><span className="lbl">Taste the Hype <span className="arrow">→</span></span></Link>
            </div>
            <div className="story__media" data-reveal>
              <div className="frame" data-parallax="0.05">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/img/fried-chicken.png" alt="FRYBIRD hand-breaded fried chicken" />
              </div>
              <div className="sticker">12-hr<br />brine</div>
            </div>
          </div>

          <div className="stats" data-reveal-stagger>
            <div className="stat"><div className="num"><span data-count="3">0</span></div><div className="lbl">Emirates &amp; Beyond</div></div>
            <div className="stat"><div className="num"><span data-count="12">0</span><span className="txt-red">hr</span></div><div className="lbl">Buttermilk Brine</div></div>
            <div className="stat"><div className="num"><span data-count="100">0</span><span className="txt-red">%</span></div><div className="lbl">Fried To Order</div></div>
            <div className="stat"><div className="num"><span data-count="1">0</span></div><div className="lbl">Serious Obsession</div></div>
          </div>
        </div>
      </section>

      {/* ============ 3D CHICKEN ============ */}
      <section className="section chicken3d" id="closer">
        <div className="wrap chicken3d__grid">
          <div className="chicken3d__copy" data-reveal>
            <span className="kicker txt-red" style={{ display: 'block', marginBottom: 16 }}>/ Get Closer</span>
            <h2>Spin<br /><span className="txt-red scribbleword">The Bird<Scribble variant="b" /></span></h2>
            <p>This is what 12 hours of buttermilk brine and a hand-breaded shatter-crust looks like up close. Grab it, spin it, inspect every crispy ridge — then go order the real thing.</p>
            <span className="chicken3d__hint"><span className="ring" /> Drag to rotate</span>
          </div>
          <Chicken3D />
        </div>
      </section>

      {/* ============ MENU PREVIEW ============ */}
      <section className="section menu" id="menu">
        <Doodle shape="wave" className="doodle--float2 doodle--cream doodle--hideSm" data-parallax="0.12" style={{ top: '18%', right: '5%', width: 66, height: 40, '--dur': '7.5s', '--rot': '-6deg' }} />
        <div className="wrap">
          <div className="section__head">
            <div data-reveal>
              <span className="kicker txt-red" style={{ display: 'block', marginBottom: 16 }}>/ The Line-Up</span>
              <h2 className="display txt-cream">Signature<br /><span className="txt-red scribbleword">Hits<Scribble variant="b" /></span></h2>
            </div>
            <div data-reveal style={{ maxWidth: '38ch' }}>
              <p style={{ color: 'rgba(244,231,196,.7)', fontSize: 'clamp(15px,1.4vw,17px)', marginBottom: 18 }}>Every item is fried, stacked and sauced to order. Heat dots tell you what you&apos;re in for.</p>
              <Link href="/menu" className="btn btn--ghost" data-magnetic><span className="lbl">See Full Menu <span className="arrow">→</span></span></Link>
            </div>
          </div>
          <SignatureHits />
        </div>
      </section>

      {/* ============ MARQUEE 2 ============ */}
      <div className="marquee marquee--cream rev" aria-hidden="true">
        <div className="marquee__track">
          {Array.from({ length: 4 }).map((_, k) => (
            <span key={k}>Fry <i className="star">●</i> Eat <i className="star">●</i> Repeat <i className="star">●</i></span>
          ))}
        </div>
      </div>

      {/* ============ HEAT ============ */}
      <HeatSlider />

      {/* ============ EXPERIENCE ============ */}
      <section className="section exp" id="experience">
        <div className="wrap">
          <div className="section__head">
            <div data-reveal>
              <span className="kicker txt-red" style={{ display: 'block', marginBottom: 16 }}>/ The Spot</span>
              <h2 className="display">The Diner<br />Energy</h2>
            </div>
            <p data-reveal>Red counters, checkerboard trays, posters floor-to-ceiling. FRYBIRD isn&apos;t a drive-thru — it&apos;s the hangout.</p>
          </div>
        </div>

        <div className="exp__row">
          <div className="exp__marqimg" data-parallax="0.04">
            {/* eslint-disable @next/next/no-img-element */}
            <div className="cell"><img src="/img/storefront-night.png" alt="FRYBIRD storefront at night" /></div>
            <div className="cell label">Walk In<br />Hungry</div>
            <div className="cell"><img src="/img/interior-counter.png" alt="FRYBIRD red counter interior" /></div>
            <div className="cell"><img src="/img/tray-share.png" alt="Sharing FRYBIRD trays" /></div>
            <div className="cell label">Leave<br />Happy</div>
            <div className="cell"><img src="/img/queue.png" alt="Customers ordering at FRYBIRD" /></div>
            <div className="cell"><img src="/img/storefront-night.png" alt="" /></div>
            <div className="cell label">Walk In<br />Hungry</div>
            <div className="cell"><img src="/img/interior-counter.png" alt="" /></div>
            {/* eslint-enable @next/next/no-img-element */}
          </div>
        </div>
      </section>

      {/* checkerboard divider */}
      <div className="checker" style={{ height: 26 }} />

      {/* ============ LOCATIONS ============ */}
      <section className="section loc" id="locations">
        <div className="wrap">
          <div className="section__head">
            <div data-reveal>
              <span className="kicker txt-red" style={{ display: 'block', marginBottom: 16 }}>/ Find Your Fix</span>
              <h2 className="display txt-cream">Where The<br /><span className="txt-red">Birds</span> Are</h2>
            </div>
            <p data-reveal>{countWord(openCount)} location{openCount === 1 ? '' : 's'} and counting across the UAE &amp; Oman. Hover a branch to light it up on the map.</p>
          </div>
          <LocationsMap locations={locations} />
        </div>
      </section>

      {/* ============ SOCIAL ============ */}
      <section className="section social" id="social">
        <Doodle shape="sparkle" className="doodle--float doodle--orange doodle--hideSm" data-parallax="0.12" style={{ top: '16%', left: '8%', width: 60, height: 60, '--dur': '6s', '--rot': '-12deg' }} />
        <Doodle shape="star" className="doodle--spin doodle--cream doodle--hideSm" data-parallax="0.1" style={{ bottom: '18%', right: '9%', width: 50, height: 50, '--dur': '17s' }} />
        <div className="wrap">
          <div data-reveal>
            <span className="kicker txt-red" style={{ display: 'block', marginBottom: 16 }}>/ @frybird.ae</span>
            <h2 className="display txt-cream" style={{ fontSize: 'clamp(40px,7vw,96px)' }}>Follow The<br /><span className="txt-red scribbleword">Flavour<Scribble variant="c" /></span></h2>
            <p style={{ maxWidth: '46ch', margin: '22px auto 0', color: 'rgba(244,231,196,.7)' }}>Tag us in your messiest, sauciest, most-shameless FRYBIRD moments. We repost the good ones.</p>
          </div>

          <div className="social__grid" data-reveal-stagger>
            {['/img/original-burger.png', '/img/burger-fries.png', '/img/nashville.png', '/img/tenders-tray.png'].map((src) => (
              <a key={src} className="social__cell" href="https://instagram.com/frybird.ae" target="_blank" rel="noopener noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" />
                <span className="ov">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#F4E7C4" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1.2" fill="#F4E7C4" stroke="none" /></svg>
                </span>
              </a>
            ))}
          </div>

          <a href="https://instagram.com/frybird.ae" target="_blank" rel="noopener noreferrer" className="btn btn--red" style={{ marginTop: 44 }} data-magnetic><span className="lbl">Follow @frybird.ae <span className="arrow">→</span></span></a>
        </div>
      </section>
    </>
  );
}
