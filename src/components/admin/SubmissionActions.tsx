'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SubmissionActions({ id, read }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const patch = async (body) => {
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch (e) {
      alert('Action failed. Try again.');
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!confirm('Delete this message?')) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch (e) {
      alert('Could not delete. Try again.');
      setBusy(false);
    }
  };

  return (
    <span className="adm__subactions">
      <button className="adm__link" disabled={busy} onClick={() => patch({ read: !read })}>
        {read ? 'Mark unread' : 'Mark read'}
      </button>
      <button className="adm__del" disabled={busy} onClick={remove}>Delete</button>
    </span>
  );
}
