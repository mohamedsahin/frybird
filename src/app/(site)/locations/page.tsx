import Link from 'next/link';
import LocationsMap from '@/components/LocationsMap';

export const metadata = {
  title: 'Locations — FRYBIRD | Fried Chicken • Burgers',
  description: 'Find your nearest FRYBIRD across the UAE & Oman — Fujairah, Ajman and more. Open daily, 11am til late.',
};

const BRANCHES = [
  {
    num: '01', name: 'Fujairah', img: '/img/storefront-night.png', status: 'open', pill: '● Open Now',
    meta: [['Address', 'Main Street, Fujairah · الفجيرة, UAE'], ['Hours', 'Daily · 11:00am – 2:00am'], ['Phone', '+971 50 000 0000']],
    maps: 'https://www.google.com/maps/search/FRYBIRD+Fujairah',
  },
  {
    num: '02', name: 'Ajman', img: '/img/interior-counter.png', status: 'open', pill: '● Open Now',
    meta: [['Address', 'City Centre area, Ajman · عجمان, UAE'], ['Hours', 'Daily · 11:00am – 2:00am'], ['Phone', '+971 55 774 0687']],
    maps: 'https://www.google.com/maps/search/FRYBIRD+Ajman',
  },
  {
    num: '03', name: 'Oman', img: '/img/queue.png', status: 'open', pill: '● Open Now',
    meta: [['Address', 'Now serving · عُمان, Oman'], ['Hours', 'Daily · 11:00am – 1:00am'], ['Phone', '+968 0000 0000']],
    maps: 'https://www.google.com/maps/search/FRYBIRD+Oman',
  },
];

export default function LocationsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero__glow" />
        <div className="hero__bgtext" aria-hidden="true">
          <span>FIND US</span><span>FIND US</span><span>FIND US</span><span>FIND US</span>
        </div>
        <div className="wrap page-hero__inner">
          <div className="crumb" data-reveal><a href="/">Home</a> / Locations</div>
          <h1 className="display" data-reveal>Where The<br /><span className="txt-red">Birds Are</span></h1>
          <p data-reveal>Three spots across the UAE &amp; Oman — and more on the way. Hover a branch to light it up on the map.</p>
        </div>
      </section>

      <section className="section loc" style={{ paddingTop: 'clamp(40px,6vw,70px)' }}>
        <div className="wrap">
          <LocationsMap />
        </div>
      </section>

      <section className="branches">
        <div className="wrap">
          <div className="section__head">
            <div data-reveal>
              <span className="kicker txt-red" style={{ display: 'block', marginBottom: 16 }}>/ The Branches</span>
              <h2 className="display txt-cream">Come<br />Hungry</h2>
            </div>
            <p data-reveal>Every FRYBIRD runs the same playbook — fried to order, open late, loud as ever.</p>
          </div>

          {BRANCHES.map((b) => (
            <div className="branch" data-reveal key={b.num}>
              <div className="branch__media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.img} alt={`FRYBIRD ${b.name}`} />
              </div>
              <div>
                <span className={`pill ${b.status}`}>{b.pill}</span>
                <div className="branch__num">{b.num}</div>
                <h3>{b.name}</h3>
                <div className="branch__meta">
                  {b.meta.map(([k, v]) => (
                    <div key={k}><b>{k}</b><span>{v}</span></div>
                  ))}
                </div>
                <a href={b.maps} target="_blank" rel="noopener noreferrer" className="btn btn--red" data-magnetic>
                  <span className="lbl">Get Directions <span className="arrow">→</span></span>
                </a>
              </div>
            </div>
          ))}

          <div className="branch" data-reveal>
            <div className="branch__media">
              <div className="ph"><span className="ph__tag">Opening Soon</span><span className="ph__name">Your City</span></div>
            </div>
            <div>
              <span className="pill soon">Coming Soon</span>
              <div className="branch__num">04</div>
              <h3>Next Up</h3>
              <div className="branch__meta">
                <div><b>Where</b><span>We&apos;re scouting new neighbourhoods across the GCC.</span></div>
                <div><b>Want one?</b><span>Tell us where you want a FRYBIRD next.</span></div>
              </div>
              <Link href="/contact" className="btn btn--ghost" data-magnetic>
                <span className="lbl">Suggest a Location <span className="arrow">→</span></span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
