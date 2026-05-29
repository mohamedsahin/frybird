import Link from 'next/link';

export default function Footer({ cities = [] }: { cities?: string[] }) {
  const year = new Date().getFullYear();
  const cityLine = cities.length ? cities.join(' · ') : 'UAE & Oman';
  return (
    <footer className="footer">
      <div className="footer__strip" aria-hidden="true">
        <div className="t">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i}>Fry · Eat · Repeat ·</span>
          ))}
        </div>
      </div>

      <div className="wrap footer__cta">
        <h2 data-reveal>Hungry<br />Yet?</h2>
        <p className="sub" data-reveal>Fried Chicken • Burgers · UAE</p>
        <Link href="/menu" className="btn btn--cream" data-magnetic>
          <span className="lbl">See The Menu <span className="arrow">→</span></span>
        </Link>
      </div>

      <div className="wrap">
        <div className="footer__bar">
          <div className="col">
            <b>Visit Us</b>
            <span>{cityLine}</span>
            <span>Open daily · 11am – late</span>
          </div>
          <div className="mid">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/logo.png" alt="FRYBIRD" />
            <div className="footer__social">
              <a href="https://instagram.com/frybird.ae" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" /></svg>
              </a>
              <a href="https://www.tiktok.com/@frybird.ae" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.3 2 1.6 3.6 3.5 3.9v2.6c-1.3.1-2.5-.2-3.6-.8v6.1c0 3.2-2.6 5.7-5.8 5.4-2.7-.3-4.8-2.6-4.6-5.4.2-2.7 2.5-4.8 5.2-4.6v2.7c-.4-.1-.9-.2-1.3-.1-1.2.2-2.1 1.3-1.9 2.5.2 1.1 1.3 1.9 2.4 1.7 1.1-.1 1.9-1.1 1.9-2.2V3h2.6z" /></svg>
              </a>
              <Link href="/contact" aria-label="Contact">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2.5" y="4.5" width="19" height="15" rx="2" /><path d="M3 6l9 6 9-6" /></svg>
              </Link>
            </div>
          </div>
          <div className="col right">
            <b>Say Hi</b>
            <span>hello@frybird.ae</span>
            <span>@frybird.ae</span>
          </div>
        </div>
      </div>

      <div className="footer__legal">
        © {year} FRYBIRD · Fried Chicken &amp; Burgers · United Arab Emirates. All flavour reserved.
      </div>
    </footer>
  );
}
