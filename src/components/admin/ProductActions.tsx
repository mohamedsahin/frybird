'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProductActions({ slug, name }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const remove = async () => {
    if (!confirm(`Delete “${name}”? This can’t be undone.`)) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/products/${slug}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch (e) {
      alert('Could not delete. Try again.');
      setBusy(false);
    }
  };

  return (
    <button className="adm__del" onClick={remove} disabled={busy}>
      {busy ? '…' : 'Delete'}
    </button>
  );
}
