import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import { getLocations } from '@/lib/store';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Contact — FRYBIRD | Fried Chicken • Burgers',
  description: 'Get in touch with FRYBIRD — catering, feedback, franchise enquiries or just to say hi. @frybird.ae',
};

export default async function ContactPage() {
  const locations = await getLocations();
  const cityLine = locations.filter((l) => !l.isPlaceholder).map((l) => l.name).join(' · ') || 'UAE & Oman';
  return (
    <>
      <section className="page-hero">
        <div className="hero__glow" />
        <div className="hero__bgtext" aria-hidden="true">
          <span>SAY HI</span><span>SAY HI</span><span>SAY HI</span><span>SAY HI</span>
        </div>
        <div className="wrap page-hero__inner">
          <div className="crumb" data-reveal><a href="/">Home</a> / Contact</div>
          <h1 className="display" data-reveal>Talk To<br /><span className="txt-red">The Bird</span></h1>
          <p data-reveal>Catering, feedback, franchise enquiries, or just to tell us your order was elite — we read everything.</p>
        </div>
      </section>

      <section className="contact">
        <div className="wrap">
          <div className="contact__grid">
            <div className="contact__info" data-reveal>
              <div className="ci">
                <b>Order &amp; Enquiries</b>
                <a href="https://wa.me/97100000000" target="_blank" rel="noopener noreferrer">WhatsApp · +971 50 000 0000</a>
                <a href="mailto:hello@frybird.ae">hello@frybird.ae</a>
              </div>
              <div className="ci">
                <b>Follow</b>
                <a href="https://instagram.com/frybird.ae" target="_blank" rel="noopener noreferrer">Instagram · @frybird.ae</a>
                <a href="https://www.tiktok.com/@frybird.ae" target="_blank" rel="noopener noreferrer">TikTok · @frybird.ae</a>
              </div>
              <div className="ci">
                <b>Visit</b>
                <span>{cityLine}</span>
                <span>Open daily · 11:00am – late</span>
              </div>
              <div className="ci">
                <b>Hungry Now?</b>
                <Link href="/menu">Browse the full menu →</Link>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
