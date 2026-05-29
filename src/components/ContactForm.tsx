'use client';

import { useState } from 'react';

type ContactErrors = {
  name: boolean;
  email: boolean;
  message: boolean;
};

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<ContactErrors>({ name: false, email: false, message: false });
  const [busy, setBusy] = useState(false);
  const [serverError, setServerError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: (fd.get('name') || '').toString().trim(),
      email: (fd.get('email') || '').toString().trim(),
      topic: (fd.get('topic') || 'General').toString(),
      message: (fd.get('message') || '').toString().trim(),
    };
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email);
    const next = { name: !payload.name, email: !emailOk, message: !payload.message };
    setErrors(next);
    if (next.name || next.email || next.message) return;

    setBusy(true);
    setServerError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Request failed');
      setSent(true);
    } catch (err) {
      setServerError('Something went wrong — please try again or email us directly.');
    } finally {
      setBusy(false);
    }
  };

  const clearErr = (key: keyof ContactErrors) => setErrors((e) => ({ ...e, [key]: false }));

  return (
    <form className={`form${sent ? ' sent' : ''}`} noValidate onSubmit={onSubmit}>
      <div className={`field${errors.name ? ' invalid' : ''}`}>
        <label htmlFor="cf-name">Your Name</label>
        <input type="text" id="cf-name" name="name" placeholder="e.g. Sara" onInput={() => clearErr('name')} />
        <div className="err">Please tell us your name.</div>
      </div>
      <div className={`field${errors.email ? ' invalid' : ''}`}>
        <label htmlFor="cf-email">Email</label>
        <input type="email" id="cf-email" name="email" placeholder="you@email.com" onInput={() => clearErr('email')} />
        <div className="err">Enter a valid email address.</div>
      </div>
      <div className="field">
        <label htmlFor="cf-topic">What&apos;s it about?</label>
        <select id="cf-topic" name="topic" defaultValue="General">
          <option value="General">General question</option>
          <option value="Catering">Catering / big order</option>
          <option value="Franchise">Franchise enquiry</option>
          <option value="Feedback">Feedback</option>
          <option value="New location">Suggest a location</option>
        </select>
        <div className="err" />
      </div>
      <div className={`field${errors.message ? ' invalid' : ''}`}>
        <label htmlFor="cf-msg">Message</label>
        <textarea id="cf-msg" name="message" placeholder="Tell us everything…" onInput={() => clearErr('message')} />
        <div className="err">Don&apos;t leave us hanging — add a message.</div>
      </div>

      {serverError && (
        <p style={{ color: 'var(--red-bright)', fontWeight: 700, fontSize: 13, marginBottom: 14 }}>{serverError}</p>
      )}

      <button type="submit" className="btn btn--red form__submit" data-magnetic disabled={busy}>
        <span className="lbl">{busy ? 'Sending…' : 'Send It'} <span className="arrow">→</span></span>
      </button>

      <div className={`form__success${sent ? ' show' : ''}`}>
        <div className="big">Message Sent!</div>
        <p style={{ color: 'rgba(244,231,196,.75)', marginTop: 14 }}>
          Thanks for reaching out — we&apos;ll get back to you faster than we fry. 🍗
        </p>
      </div>
    </form>
  );
}
