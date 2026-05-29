'use client';

import { useState } from 'react';
import type { Location } from '@/types';

export default function LocationsMap({ locations }: { locations: Location[] }) {
  const [active, setActive] = useState(locations[0]?.slug ?? '');

  // Only real branches get a pin on the map; teasers ("Your City?") show in the
  // list but have no fixed point on the map.
  const pins = locations.filter((l) => !l.isPlaceholder);

  return (
    <div className="loc__grid">
      <div className="loc__map" data-reveal>
        <div className="grid-bg" />
        <div className="glowmap" />
        {pins.map((l) => (
          <div
            key={l.slug}
            className={`pin${active === l.slug ? ' active' : ''}`}
            style={{ left: `${l.mapX}%`, top: `${l.mapY}%` }}
            data-loc={l.slug}
            onMouseEnter={() => setActive(l.slug)}
            onClick={() => setActive(l.slug)}
          >
            <span className="pin__name">{l.name}</span>
            <span className="pin__dot" />
          </div>
        ))}
      </div>

      <div className="loc__list" data-reveal-stagger>
        {locations.map((l, i) => (
          <button
            key={l.slug}
            className={`loc__item${l.isPlaceholder ? ' soon' : ''}${active === l.slug ? ' active' : ''}`}
            data-loc={l.slug}
            onMouseEnter={() => setActive(l.slug)}
            onClick={() => setActive(l.slug)}
          >
            <span className="idx">{String(i + 1).padStart(2, '0')}</span>
            <span>
              <h4>{l.name}</h4>
              <p>{[l.nameAr, l.descriptor].filter(Boolean).join(' · ')}</p>
            </span>
            <span className="status">{l.statusLabel}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
