'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { UploadButton } from '@/lib/uploadthing';
import { isUploadThingUrl } from '@/lib/media';
import type { Location } from '@/types';

function slugify(s) {
  return s.toString().toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function LocationForm({ initial }: { initial?: Location }) {
  const router = useRouter();
  const editing = !!initial;
  const [f, setF] = useState<Location>(
    initial || {
      slug: '', name: '', nameAr: '', descriptor: '', statusLabel: 'Open Now',
      accent: false, isPlaceholder: false, address: '', hours: '', phone: '',
      mapUrl: '', img: null, lat: null, lng: null, sortOrder: 0,
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

    const img = (f.img || '').trim();
    if (img && !isUploadThingUrl(img)) {
      setError('Location images must come from UploadThing. Use the Upload button, or paste a URL from the Media library.');
      return;
    }

    const payload = {
      slug: slugify(f.slug),
      name: f.name.trim(),
      nameAr: f.nameAr.trim(),
      descriptor: f.descriptor.trim(),
      statusLabel: f.statusLabel.trim() || 'Open Now',
      accent: f.accent,
      isPlaceholder: f.isPlaceholder,
      address: f.address.trim(),
      hours: f.hours.trim(),
      phone: f.phone.trim(),
      mapUrl: f.mapUrl.trim(),
      img: img || null,
      lat: f.lat === null || f.lat === ('' as unknown) ? null : Number(f.lat),
      lng: f.lng === null || f.lng === ('' as unknown) ? null : Number(f.lng),
      sortOrder: Number(f.sortOrder) || 0,
    };

    setBusy(true);
    try {
      const url = editing ? `/api/admin/locations/${initial.slug}` : '/api/admin/locations';
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
      router.push('/admin/locations');
      router.refresh();
    } catch (err) {
      setError(err.message || 'Save failed');
      setBusy(false);
    }
  };

  return (
    <form className="adm-form" onSubmit={submit}>
      <div className="adm-form__row">
        <div className="adm-form__field">
          <label>Name *</label>
          <input value={f.name} onChange={(e) => onName(e.target.value)} placeholder="Fujairah" />
        </div>
        <div className="adm-form__field">
          <label>Slug * <span className="adm__muted">(URL id)</span></label>
          <input
            value={f.slug}
            onChange={(e) => { set('slug', e.target.value); setAutoSlug(false); }}
            placeholder="fujairah"
          />
        </div>
      </div>

      <div className="adm-form__row">
        <div className="adm-form__field">
          <label>Arabic name <span className="adm__muted">(optional)</span></label>
          <input value={f.nameAr} onChange={(e) => set('nameAr', e.target.value)} placeholder="الفجيرة" dir="rtl" />
        </div>
        <div className="adm-form__field">
          <label>Descriptor</label>
          <input value={f.descriptor} onChange={(e) => set('descriptor', e.target.value)} placeholder="East Coast flagship" />
        </div>
      </div>

      <div className="adm-form__row">
        <div className="adm-form__field">
          <label>Status label</label>
          <input value={f.statusLabel} onChange={(e) => set('statusLabel', e.target.value)} placeholder="Open Now" />
        </div>
        <div className="adm-form__field">
          <label>Sort order <span className="adm__muted">(low = first)</span></label>
          <input type="number" value={f.sortOrder} onChange={(e) => set('sortOrder', e.target.value)} />
        </div>
      </div>

      <div className="adm-form__row">
        <div className="adm-form__field adm-form__check">
          <label>
            <input type="checkbox" checked={f.accent} onChange={(e) => set('accent', e.target.checked)} />
            <span>Featured (highlighted in red)</span>
          </label>
        </div>
        <div className="adm-form__field adm-form__check">
          <label>
            <input type="checkbox" checked={f.isPlaceholder} onChange={(e) => set('isPlaceholder', e.target.checked)} />
            <span>“Coming soon” teaser (no address / directions)</span>
          </label>
        </div>
      </div>

      {!f.isPlaceholder && (
        <>
          <div className="adm-form__field">
            <label>Address</label>
            <input value={f.address} onChange={(e) => set('address', e.target.value)} placeholder="Main Street, Fujairah · UAE" />
          </div>
          <div className="adm-form__row">
            <div className="adm-form__field">
              <label>Hours</label>
              <input value={f.hours} onChange={(e) => set('hours', e.target.value)} placeholder="Daily · 11:00am – 2:00am" />
            </div>
            <div className="adm-form__field">
              <label>Phone</label>
              <input value={f.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+971 50 000 0000" />
            </div>
          </div>
          <div className="adm-form__field">
            <label>Google Maps link <span className="adm__muted">(directions button)</span></label>
            <input value={f.mapUrl} onChange={(e) => set('mapUrl', e.target.value)} placeholder="https://maps.app.goo.gl/…" />
          </div>
        </>
      )}

      {!f.isPlaceholder && (
        <div className="adm-form__row">
          <div className="adm-form__field">
            <label>Latitude <span className="adm__muted">(map preview centre)</span></label>
            <input type="number" step="any" value={f.lat ?? ''} onChange={(e) => set('lat', e.target.value)} placeholder="25.1288" />
          </div>
          <div className="adm-form__field">
            <label>Longitude</label>
            <input type="number" step="any" value={f.lng ?? ''} onChange={(e) => set('lng', e.target.value)} placeholder="56.3265" />
          </div>
        </div>
      )}
      {!f.isPlaceholder && (
        <p className="adm__muted" style={{ marginTop: -6 }}>
          Tip: open the spot in Google Maps, right-click the pin → the first row is “lat, lng”. Paste each number above.
        </p>
      )}

      <div className="adm-form__field">
        <label>Photo <span className="adm__muted">(upload to UploadThing — used on the Locations page)</span></label>
        <div className="adm-form__image">
          <div className="adm-form__imgthumb">
            {f.img ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={f.img} alt="" />
            ) : (
              <span className="adm__thumbph">—</span>
            )}
          </div>
          <div className="adm-form__imgcontrols">
            <input value={f.img || ''} onChange={(e) => set('img', e.target.value)} placeholder="https://….ufs.sh/f/…" />
            <div className="adm-form__imgrow">
              <UploadButton
                endpoint="productImage"
                onClientUploadComplete={(res) => {
                  const uploaded = res?.[0];
                  const url = uploaded?.serverData?.url || uploaded?.ufsUrl;
                  if (url) set('img', url);
                }}
                onUploadError={(e) => setError(e.message || 'Upload failed')}
              />
              {f.img && (
                <button type="button" className="adm__link" onClick={() => set('img', null)}>
                  Remove image
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {error && <p className="adm-login__err">{error}</p>}

      <div className="adm-form__actions">
        <button type="submit" className="btn btn--red" disabled={busy}>
          <span className="lbl">{busy ? 'Saving…' : editing ? 'Save Changes' : 'Create Location'}</span>
        </button>
        <button type="button" className="btn btn--ghost adm__ghost" onClick={() => router.push('/admin/locations')}>
          <span className="lbl">Cancel</span>
        </button>
      </div>
    </form>
  );
}
