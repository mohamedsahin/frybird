'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { UploadButton } from '@/lib/uploadthing';
import type { MediaFile } from '@/lib/uploadthing-server';

function formatSize(bytes: number) {
  if (!bytes) return '—';
  const kb = bytes / 1024;
  if (kb < 1024) return `${Math.round(kb)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

export default function MediaLibrary({ initial }: { initial: MediaFile[] }) {
  const router = useRouter();
  const [error, setError] = useState('');
  const [copiedKey, setCopiedKey] = useState('');
  const [deleting, setDeleting] = useState('');

  const copy = async (file: MediaFile) => {
    try {
      await navigator.clipboard.writeText(file.url);
      setCopiedKey(file.key);
      setTimeout(() => setCopiedKey(''), 1500);
    } catch {
      setError('Could not copy to clipboard.');
    }
  };

  const remove = async (file: MediaFile) => {
    if (!confirm(`Delete "${file.name}"? This can't be undone.`)) return;
    setDeleting(file.key);
    setError('');
    try {
      const res = await fetch('/api/admin/media', {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ key: file.key }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Delete failed');
      }
      router.refresh();
    } catch (err) {
      setError(err.message || 'Delete failed');
    } finally {
      setDeleting('');
    }
  };

  return (
    <div>
      <div className="adm-media__upload">
        <UploadButton
          endpoint="productImage"
          onClientUploadComplete={() => {
            setError('');
            router.refresh();
          }}
          onUploadError={(e) => setError(e.message || 'Upload failed')}
        />
        <span className="adm__muted">Drag &amp; drop or click — images up to 8MB.</span>
      </div>

      {error && <p className="adm-login__err" style={{ marginTop: 14 }}>{error}</p>}

      {initial.length === 0 ? (
        <p className="adm__empty" style={{ marginTop: 24 }}>No uploads yet. Add your first image above.</p>
      ) : (
        <div className="adm-media__grid">
          {initial.map((file) => (
            <figure key={file.key} className="adm-media__card">
              <div className="adm-media__thumb">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={file.url} alt={file.name} loading="lazy" />
              </div>
              <figcaption className="adm-media__meta">
                <span className="adm-media__name" title={file.name}>{file.name}</span>
                <span className="adm__muted">{formatSize(file.size)}</span>
              </figcaption>
              <div className="adm-media__actions">
                <button type="button" className="adm__link" onClick={() => copy(file)}>
                  {copiedKey === file.key ? 'Copied!' : 'Copy URL'}
                </button>
                <button
                  type="button"
                  className="adm__link adm-media__del"
                  onClick={() => remove(file)}
                  disabled={deleting === file.key}
                >
                  {deleting === file.key ? 'Deleting…' : 'Delete'}
                </button>
              </div>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
