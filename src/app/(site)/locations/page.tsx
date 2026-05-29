import Link from 'next/link';
import LocationsMap from '@/components/LocationsMap';
import { getLocations } from '@/lib/store';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Locations — FRYBIRD | Fried Chicken • Burgers',
  description: 'Find your nearest FRYBIRD across the UAE & Oman — Fujairah, Ajman and more. Open daily, 11am til late.',
};

function countWord(n: number): string {
  const words = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
  return words[n] ?? String(n);
}

export default async function LocationsPage() {
  const locations = await getLocations();
  const branches = locations.filter((l) => !l.isPlaceholder);
  const teaser = locations.find((l) => l.isPlaceholder);

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
          <p data-reveal>{countWord(branches.length)} spot{branches.length === 1 ? '' : 's'} across the UAE &amp; Oman — and more on the way. Hover a branch to light it up on the map.</p>
        </div>
      </section>

      <section className="section loc" style={{ paddingTop: 'clamp(40px,6vw,70px)' }}>
        <div className="wrap">
          <LocationsMap locations={locations} />
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

          {branches.map((b, i) => (
            <div className="branch" data-reveal key={b.slug}>
              <div className="branch__media">
                {b.img ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={b.img} alt={`FRYBIRD ${b.name}`} />
                ) : (
                  <div className="ph"><span className="ph__tag">Photo coming soon</span><span className="ph__name">{b.name}</span></div>
                )}
              </div>
              <div>
                <span className="pill open">● {b.statusLabel}</span>
                <div className="branch__num">{String(i + 1).padStart(2, '0')}</div>
                <h3>{b.name}</h3>
                <div className="branch__meta">
                  {b.address && <div><b>Address</b><span>{b.address}</span></div>}
                  {b.hours && <div><b>Hours</b><span>{b.hours}</span></div>}
                  {b.phone && <div><b>Phone</b><span>{b.phone}</span></div>}
                </div>
                {b.mapUrl && (
                  <a href={b.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn--red" data-magnetic>
                    <span className="lbl">Get Directions <span className="arrow">→</span></span>
                  </a>
                )}
              </div>
            </div>
          ))}

          {teaser && (
            <div className="branch" data-reveal>
              <div className="branch__media">
                <div className="ph"><span className="ph__tag">Opening Soon</span><span className="ph__name">{teaser.name}</span></div>
              </div>
              <div>
                <span className="pill soon">{teaser.statusLabel}</span>
                <div className="branch__num">{String(branches.length + 1).padStart(2, '0')}</div>
                <h3>Next Up</h3>
                <div className="branch__meta">
                  <div><b>Where</b><span>{teaser.address || "We're scouting new neighbourhoods across the GCC."}</span></div>
                  <div><b>Want one?</b><span>Tell us where you want a FRYBIRD next.</span></div>
                </div>
                <Link href="/contact" className="btn btn--ghost" data-magnetic>
                  <span className="lbl">Suggest a Location <span className="arrow">→</span></span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
