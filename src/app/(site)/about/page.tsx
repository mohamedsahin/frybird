import Link from 'next/link';

export const metadata = {
  title: 'Our Story — FRYBIRD | Fried Chicken • Burgers',
  description: "How FRYBIRD became the UAE's loudest fried chicken & burger spot. Born local, fried to obsession.",
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero__glow" />
        <div className="hero__bgtext" aria-hidden="true">
          <span>THE BIRD</span><span>THE BIRD</span><span>THE BIRD</span><span>THE BIRD</span>
        </div>
        <div className="wrap page-hero__inner">
          <div className="crumb" data-reveal><a href="/">Home</a> / Our Story</div>
          <h1 className="display" data-reveal>Born Local.<br /><span className="txt-red">Fried To<br />Obsession.</span></h1>
          <p data-reveal>FRYBIRD started with a stubborn idea — that fried chicken in the UAE could be louder, crunchier and more shameless than anywhere else. So we made it.</p>
        </div>
      </section>

      <section className="section story">
        <div className="wrap">
          <div className="story__grid">
            <div className="story__copy" data-reveal>
              <span className="kicker txt-red" style={{ display: 'block', marginBottom: 18 }}>/ The Beginning</span>
              <h2 className="display">One Recipe.<br /><em>One Obsession.</em></h2>
              <p>We brine every cut in buttermilk for twelve hours, hand-bread it to order, and drop it in small batches so it hits the tray screaming hot. No heat lamps. No shortcuts. No apologies.</p>
              <p>The diner came next — red counters, checkerboard trays, posters from floor to ceiling. A place that felt like a hangout, not a queue. People came for the chicken and stayed for the vibe.</p>
              <p>Today FRYBIRD is the neighbourhood spot from <strong>Fujairah to Ajman to Oman</strong> — and the tray still says the same thing it always has.</p>
            </div>
            <div className="story__media" data-reveal>
              <div className="frame" data-parallax="0.05">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/img/original-burger.png" alt="A FRYBIRD chicken burger" />
              </div>
              <div className="sticker">Fry · Eat<br />Repeat</div>
            </div>
          </div>
        </div>
      </section>

      <section className="values">
        <div className="wrap">
          <div className="section__head">
            <div data-reveal>
              <span className="kicker txt-red" style={{ display: 'block', marginBottom: 16 }}>/ What We Stand For</span>
              <h2 className="display txt-cream">No<br />Shortcuts</h2>
            </div>
            <p data-reveal>Three rules we refuse to break — no matter how busy the diner gets.</p>
          </div>
          <div className="values__grid" data-reveal-stagger>
            <div className="value">
              <div className="vnum">01</div>
              <h3>Fried To Order</h3>
              <p>Nothing sits under a lamp. Every piece is dropped the moment you order it, so the crunch is real and the steam is rising when it hits your tray.</p>
            </div>
            <div className="value">
              <div className="vnum">02</div>
              <h3>12-Hour Brine</h3>
              <p>Patience is the secret ingredient. A full overnight buttermilk soak is why the inside stays absurdly juicy under all that crackle.</p>
            </div>
            <div className="value">
              <div className="vnum">03</div>
              <h3>The Hangout</h3>
              <p>We built a diner, not a drive-thru. Red counters, loud walls, good music — somewhere you actually want to hang around.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section story" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="stats" data-reveal-stagger style={{ borderTop: 'none', paddingTop: 0 }}>
            <div className="stat"><div className="num"><span data-count="3">0</span></div><div className="lbl">Locations &amp; Counting</div></div>
            <div className="stat"><div className="num"><span data-count="12">0</span><span className="txt-red">hr</span></div><div className="lbl">Buttermilk Brine</div></div>
            <div className="stat"><div className="num"><span data-count="5">0</span></div><div className="lbl">Levels Of Heat</div></div>
            <div className="stat"><div className="num"><span data-count="100">0</span><span className="txt-red">%</span></div><div className="lbl">Fried To Order</div></div>
          </div>
        </div>
      </section>

      <section className="timeline">
        <div className="wrap">
          <div className="section__head">
            <div data-reveal>
              <span className="kicker txt-red" style={{ display: 'block', marginBottom: 16 }}>/ The Journey</span>
              <h2 className="display">How It<br />Happened</h2>
            </div>
          </div>
          <div className="tline" data-reveal-stagger>
            <div className="tstep"><div className="yr">01</div><h3>The Idea</h3><p>A recipe perfected at home, fried again and again until the crunch was undeniable. The first batch never stood a chance.</p></div>
            <div className="tstep"><div className="yr">02</div><h3>First Fry</h3><p>The first FRYBIRD opened its doors — red counter, checkerboard trays, and a line out the door before the week was out.</p></div>
            <div className="tstep"><div className="yr">03</div><h3>The Flock Grows</h3><p>From one branch to three across the Emirates and into Oman, each one bringing the same loud, crispy energy.</p></div>
            <div className="tstep"><div className="yr">04</div><h3>Hotter Than Ever</h3><p>New heat levels, new burgers, a growing community tagging us in their messiest moments. And we&apos;re only getting started.</p></div>
          </div>
        </div>
      </section>

      <section className="heat" style={{ textAlign: 'center', background: 'var(--ink)' }}>
        <div className="wrap">
          <div data-reveal>
            <p className="kicker" style={{ color: 'rgba(244,231,196,.6)', marginBottom: 18 }}>Our Whole Philosophy</p>
            <div className="heat__stack">
              <div className="big txt-cream">Fry.</div>
              <div className="big txt-red">Eat.</div>
              <div className="big outline">Repeat.</div>
            </div>
            <Link href="/menu" className="btn btn--red" style={{ marginTop: 40 }} data-magnetic><span className="lbl">Taste It Yourself <span className="arrow">→</span></span></Link>
          </div>
        </div>
      </section>
    </>
  );
}
