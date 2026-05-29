'use client';

import { useState } from 'react';
import type { Location } from '@/types';

// Google Maps embed (keyless "q" form) — shows a real map centred on the
// branch. We wrap it in a brand-tinted overlay so it reads dark + red like the
// rest of the site instead of a bright default Google map.
function embedSrc(loc: Location): string {
  if (loc.lat != null && loc.lng != null) {
    return `https://www.google.com/maps?q=${loc.lat},${loc.lng}&z=13&output=embed`;
  }
  return `https://www.google.com/maps?q=${encodeURIComponent('FRYBIRD ' + loc.name)}&z=11&output=embed`;
}

export default function LocationsMap({ locations }: { locations: Location[] }) {
  // Default to the first branch that actually has a map to show.
  const mappable = locations.filter((l) => !l.isPlaceholder);
  const [active, setActive] = useState(mappable[0]?.slug ?? locations[0]?.slug ?? '');

  const activeLoc = locations.find((l) => l.slug === active);
  const showMap = activeLoc && !activeLoc.isPlaceholder;

  return (
    <div className="loc__grid">
      <div className="loc__map" data-reveal>
        {showMap ? (
          <>
            <iframe
              key={activeLoc.slug}
              className="loc__mapframe"
              title={`Map of FRYBIRD ${activeLoc.name}`}
              src={embedSrc(activeLoc)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="loc__maptint" aria-hidden="true" />
            <div className="loc__mapcard">
              <span className="loc__mapcard-name">{activeLoc.name}</span>
              {activeLoc.descriptor && <span className="loc__mapcard-sub">{activeLoc.descriptor}</span>}
              {activeLoc.mapUrl && (
                <a href={activeLoc.mapUrl} target="_blank" rel="noopener noreferrer" className="loc__mapcard-btn">
                  Get Directions →
                </a>
              )}
            </div>
          </>
        ) : (
          // "Your City?" teaser — no real coordinates, so show an inviting panel.
          <div className="loc__mapsoon">
            <div className="grid-bg" />
            <div className="glowmap" />
            <div className="loc__mapsoon-inner">
              <span className="loc__mapsoon-tag">Coming Soon</span>
              <h3>{activeLoc?.name || 'Your City?'}</h3>
              <p>{activeLoc?.descriptor || "We're expanding fast"}</p>
            </div>
          </div>
        )}
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
