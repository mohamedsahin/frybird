'use client';

import { useState } from 'react';

const LEVELS = [
  { name: 'PLAIN JANE', desc: 'No heat, all crunch. The buttermilk-brined classic — golden, juicy, honest.', bg: '#141217' },
  { name: 'A LIL\u2019 KICK', desc: 'A whisper of cayenne. Warm, friendly, dangerously easy to finish.', bg: '#1b1410' },
  { name: 'MEDIUM RARE-ING', desc: 'Now we\u2019re talking. A proper Nashville glow that lingers on the lips.', bg: '#23140f' },
  { name: 'NASHVILLE HOT', desc: 'The real deal. Cayenne-lacquered, fiery red, sweat-on-your-brow good.', bg: '#2c130d' },
  { name: 'HOTTER THAN EVER', desc: 'Our signature inferno. Order a shake. You\u2019ll need it. No refunds on tears.', bg: '#360f09' },
];

export default function HeatSlider() {
  const [i, setI] = useState(3);
  const L = LEVELS[i];

  return (
    <section className="section heat" id="heat" style={{ background: L.bg }}>
      <div className="heat__flames" style={{ opacity: 0.15 + i * 0.2 }} />
      <div className="heat__peppers" aria-hidden="true">
        <span style={{ top: '12%', left: '6%', transform: 'rotate(-12deg)' }}>HOT</span>
        <span style={{ top: '60%', right: '8%', transform: 'rotate(10deg)' }}>SPICY</span>
        <span style={{ bottom: '8%', left: '14%', transform: 'rotate(-6deg)' }}>FIRE</span>
      </div>
      <div className="wrap">
        <div className="heat__stack" data-reveal>
          <div className="big">Hotter</div>
          <div className="big outline">Than</div>
          <div className="big txt-red">Ever</div>
        </div>
        <div className="heat__panel" data-reveal>
          <p className="kicker" style={{ color: 'rgba(244,231,196,.6)', marginBottom: 14 }}>Drag to set your heat</p>
          <div className="heat__level" style={{ transform: `scale(${1 + i * 0.03})` }}>{L.name}</div>
          <p className="heat__desc">{L.desc}</p>
          <input
            type="range" min="0" max="4" value={i} step="1"
            className="heat__slider" aria-label="Heat level"
            onChange={(e) => setI(parseInt(e.target.value, 10))}
          />
          <div className="heat__scale">
            <span>No Heat</span><span>Mild</span><span>Medium</span><span>Hot</span><span>Inferno</span>
          </div>
        </div>
      </div>
    </section>
  );
}
