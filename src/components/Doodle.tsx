// Decorative hand-drawn doodles (server-safe, no hooks).
import type { CSSProperties, ReactNode } from 'react';

type ShapeName = 'sparkle' | 'star' | 'chili' | 'wave';

const SHAPES: Record<ShapeName, ReactNode> = {
  sparkle: (
    <svg viewBox="0 0 100 100"><path d="M50 4C55 38 62 45 96 50C62 55 55 62 50 96C45 62 38 55 4 50C38 45 45 38 50 4Z" fill="currentColor" /></svg>
  ),
  star: (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round"><path d="M50 8 L58 42 L92 50 L58 58 L50 92 L42 58 L8 50 L42 42 Z" /></svg>
  ),
  chili: (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"><path d="M34 18C40 27 44 27 50 24" /><path d="M48 24C78 30 84 70 50 86C20 80 22 46 48 24Z" /></svg>
  ),
  wave: (
    <svg viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round"><path d="M4 40C18 8 30 8 38 36C45 60 58 60 68 34C75 14 90 14 96 36" /></svg>
  ),
};

type DoodleProps = {
  shape?: ShapeName;
  className?: string;
  /** allows CSS custom properties like --dur / --rot alongside standard styles */
  style?: CSSProperties & Record<string, string | number>;
  [key: string]: unknown;
};

export default function Doodle({ shape = 'sparkle', className = '', style, ...rest }: DoodleProps) {
  return (
    <div className={`doodle ${className}`} style={style} aria-hidden="true" {...rest}>
      {SHAPES[shape] || SHAPES.sparkle}
    </div>
  );
}

export function Scribble({ variant = 'line', show = false }: { variant?: 'line' | 'b' | 'c'; show?: boolean }) {
  const d =
    variant === 'b'
      ? 'M8 18C60 6 150 6 210 12C255 16 285 16 292 10'
      : variant === 'c'
      ? 'M6 18C70 6 150 6 214 12C254 16 286 16 294 10'
      : 'M6 20C70 8 150 8 210 14C250 18 280 16 294 12';
  return (
    <svg className={`scribble${show ? ' in' : ''}`} viewBox="0 0 300 30" preserveAspectRatio="none" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export function SparkCursor() {
  return (
    <div className="spark-cursor" id="sparkCursor" aria-hidden="true">
      <svg viewBox="0 0 100 100"><path d="M50 4C55 38 62 45 96 50C62 55 55 62 50 96C45 62 38 55 4 50C38 45 45 38 50 4Z" fill="currentColor" /></svg>
    </div>
  );
}
