// Small shared presentational helpers (server-safe).
import type { Product } from '@/types';

export function HeatDots({ heat }: { heat: number }) {
  return (
    <div className="heatdots" aria-label={`Heat level ${heat} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <i key={i} className={i <= heat ? 'on' : ''} />
      ))}
    </div>
  );
}

export function DishImage({ item, className = '' }: { item: Product; className?: string }) {
  if (item.img) {
    /* eslint-disable-next-line @next/next/no-img-element */
    return <img className={className} src={item.img} alt={item.name} />;
  }
  return (
    <div className={`ph ${className}`}>
      <span className="ph__tag">PHOTO COMING SOON</span>
      <span className="ph__name">{item.name}</span>
    </div>
  );
}
