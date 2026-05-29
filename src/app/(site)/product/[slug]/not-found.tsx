import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="product">
      <div className="wrap" style={{ textAlign: 'center', padding: '60px 0' }}>
        <h1 className="display txt-cream" style={{ fontSize: 'clamp(40px,8vw,90px)' }}>Lost The Bird</h1>
        <p style={{ color: 'rgba(244,231,196,.7)', margin: '18px 0 28px' }}>
          That item flew off the menu. Let&apos;s get you back.
        </p>
        <Link href="/menu" className="btn btn--red" data-magnetic>
          <span className="lbl">Back to Menu <span className="arrow">→</span></span>
        </Link>
      </div>
    </section>
  );
}
