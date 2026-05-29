'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CATEGORIES } from '@/data/menu';
import type { Product } from '@/types';

const CATS = CATEGORIES.filter((c) => c.id !== 'all');

function slugify(s) {
  return s.toString().toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function ProductForm({ initial }: { initial?: Product }) {
  const router = useRouter();
  const editing = !!initial;
  const [f, setF] = useState(
    initial || {
      slug: '', name: '', cat: 'chicken', tag: '', price: 0, heat: 0,
      img: '', blurb: '', desc: '', facts: [],
    }
  );
  const [autoSlug, setAutoSlug] = useState(!editing);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const set = (key, val) => setF((p) => ({ ...p, [key]: val }));

  const onName = (val) => {
    setF((p) => ({ ...p, name: val, slug: autoSlug ? slugify(val) : p.slug }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!f.name.trim() || !f.slug.trim()) { setError('Name and slug are required.'); return; }

    const factsValue = (f as { facts: unknown }).facts;

    const payload = {
      slug: slugify(f.slug),
      name: f.name.trim(),
      cat: f.cat,
      tag: f.tag.trim(),
      price: Number(f.price) || 0,
      heat: Math.max(0, Math.min(5, Number(f.heat) || 0)),
      img: f.img.trim() || null,
      blurb: f.blurb.trim(),
      desc: f.desc.trim(),
      facts: Array.isArray(factsValue)
        ? factsValue
        : String(factsValue || '').split('\n').map((s) => s.trim()).filter(Boolean),
    };

    setBusy(true);
    try {
      const url = editing ? `/api/admin/products/${initial.slug}` : '/api/admin/products';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Save failed');
      }
      router.push('/admin/products');
      router.refresh();
    } catch (err) {
      setError(err.message || 'Save failed');
      setBusy(false);
    }
  };

  const currentFacts = (f as { facts: unknown }).facts;
  const factsText = Array.isArray(currentFacts) ? currentFacts.join('\n') : String(currentFacts || '');

  return (
    <form className="adm-form" onSubmit={submit}>
      <div className="adm-form__row">
        <div className="adm-form__field">
          <label>Name *</label>
          <input value={f.name} onChange={(e) => onName(e.target.value)} placeholder="The Nash Sando" />
        </div>
        <div className="adm-form__field">
          <label>Slug * <span className="adm__muted">(URL)</span></label>
          <input
            value={f.slug}
            onChange={(e) => { set('slug', e.target.value); setAutoSlug(false); }}
            placeholder="nash-sando"
          />
        </div>
      </div>

      <div className="adm-form__row">
        <div className="adm-form__field">
          <label>Category</label>
          <select value={f.cat} onChange={(e) => set('cat', e.target.value)}>
            {CATS.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </div>
        <div className="adm-form__field">
          <label>Tag</label>
          <input value={f.tag} onChange={(e) => set('tag', e.target.value)} placeholder="Fan Favourite" />
        </div>
      </div>

      <div className="adm-form__row">
        <div className="adm-form__field">
          <label>Price (AED)</label>
          <input type="number" min="0" value={f.price} onChange={(e) => set('price', e.target.value)} />
        </div>
        <div className="adm-form__field">
          <label>Heat: {f.heat}/5</label>
          <input type="range" min="0" max="5" step="1" value={f.heat} onChange={(e) => set('heat', e.target.value)} />
        </div>
      </div>

      <div className="adm-form__field">
        <label>Image path <span className="adm__muted">(in /public, e.g. /img/nashville.png — leave blank for placeholder)</span></label>
        <input value={f.img || ''} onChange={(e) => set('img', e.target.value)} placeholder="/img/nashville.png" />
      </div>

      <div className="adm-form__field">
        <label>Short blurb</label>
        <input value={f.blurb} onChange={(e) => set('blurb', e.target.value)} placeholder="The one everyone comes back for." />
      </div>

      <div className="adm-form__field">
        <label>Description</label>
        <textarea value={f.desc} onChange={(e) => set('desc', e.target.value)} rows={3} />
      </div>

      <div className="adm-form__field">
        <label>Facts <span className="adm__muted">(one per line)</span></label>
        <textarea value={factsText} onChange={(e) => set('facts', e.target.value)} rows={3} placeholder={'12-hour buttermilk brine\nButter-toasted brioche'} />
      </div>

      {error && <p className="adm-login__err">{error}</p>}

      <div className="adm-form__actions">
        <button type="submit" className="btn btn--red" disabled={busy}>
          <span className="lbl">{busy ? 'Saving…' : editing ? 'Save Changes' : 'Create Product'}</span>
        </button>
        <button type="button" className="btn btn--ghost adm__ghost" onClick={() => router.push('/admin/products')}>
          <span className="lbl">Cancel</span>
        </button>
      </div>
    </form>
  );
}
