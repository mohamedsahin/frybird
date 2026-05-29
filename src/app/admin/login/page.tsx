'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Login failed');
      }
      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err.message || 'Login failed');
      setBusy(false);
    }
  };

  return (
    <div className="adm-login">
      <form className="adm-login__card" onSubmit={onSubmit}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/logo.png" alt="FRYBIRD" className="adm-login__logo" />
        <h1>FRYBIRD Admin</h1>
        <p className="adm-login__sub">Sign in to manage products &amp; messages.</p>

        <label>Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin" autoComplete="username" />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" />

        {error && <p className="adm-login__err">{error}</p>}

        <button type="submit" className="btn btn--red" disabled={busy} style={{ justifyContent: 'center', marginTop: 8 }}>
          <span className="lbl">{busy ? 'Signing in…' : 'Sign In'}</span>
        </button>

        <p className="adm-login__hint">Default: <b>admin</b> / <b>frybird123</b> — change in <code>.env.local</code></p>
      </form>
    </div>
  );
}
