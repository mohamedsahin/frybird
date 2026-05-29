'use client';

import { useState } from 'react';

const PINS = [
  { id: 'fujairah', name: 'Fujairah', x: '72%', y: '34%' },
  { id: 'ajman', name: 'Ajman', x: '40%', y: '24%' },
  { id: 'oman', name: 'Oman', x: '60%', y: '78%' },
];

const ITEMS = [
  { id: 'fujairah', idx: '01', name: 'Fujairah', sub: 'الفجيرة · East Coast flagship', status: 'Open Now' },
  { id: 'ajman', idx: '02', name: 'Ajman', sub: 'عجمان · City centre', status: 'Open Now' },
  { id: 'oman', idx: '03', name: 'Oman', sub: 'عُمان · Now serving', status: 'Open Now', soon: true },
  { id: 'next', idx: '04', name: 'Your City?', sub: "We're expanding fast", status: 'Coming Soon', soon: true },
];

export default function LocationsMap({ heading = true }) {
  const [active, setActive] = useState('fujairah');

  return (
    <div className="loc__grid">
      <div className="loc__map" data-reveal>
        <div className="grid-bg" />
        <div className="glowmap" />
        {PINS.map((p) => (
          <div
            key={p.id}
            className={`pin${active === p.id ? ' active' : ''}`}
            style={{ left: p.x, top: p.y }}
            data-loc={p.id}
            onMouseEnter={() => setActive(p.id)}
            onClick={() => setActive(p.id)}
          >
            <span className="pin__name">{p.name}</span>
            <span className="pin__dot" />
          </div>
        ))}
      </div>

      <div className="loc__list" data-reveal-stagger>
        {ITEMS.map((it) => (
          <button
            key={it.id}
            className={`loc__item${it.soon ? ' soon' : ''}${active === it.id ? ' active' : ''}`}
            data-loc={it.id}
            onMouseEnter={() => setActive(it.id)}
            onClick={() => setActive(it.id)}
          >
            <span className="idx">{it.idx}</span>
            <span><h4>{it.name}</h4><p>{it.sub}</p></span>
            <span className="status">{it.status}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
