import { getSubmissions } from '@/lib/store';
import SubmissionActions from '@/components/admin/SubmissionActions';

export const dynamic = 'force-dynamic';

function fmt(iso) {
  try {
    return new Date(iso).toLocaleString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  } catch (e) {
    return iso;
  }
}

export default async function AdminSubmissions() {
  const subs = await getSubmissions();
  const unread = subs.filter((s) => !s.read).length;

  return (
    <div>
      <header className="adm__head">
        <h1>Submissions</h1>
        <p>{subs.length} message{subs.length === 1 ? '' : 's'} · {unread} unread.</p>
      </header>

      {subs.length === 0 ? (
        <p className="adm__empty">No messages yet. They&apos;ll appear here when customers use the contact form.</p>
      ) : (
        <ul className="adm__subs">
          {subs.map((s) => (
            <li key={s.id} className={`adm__sub${s.read ? '' : ' unread'}`}>
              <div className="adm__subhead">
                <div className="adm__subwho">
                  <span className={`adm__dot${s.read ? '' : ' on'}`} />
                  <b>{s.name}</b>
                  <a href={`mailto:${s.email}`} className="adm__muted">{s.email}</a>
                  <span className="adm__chip">{s.topic}</span>
                </div>
                <div className="adm__submeta">
                  <span className="adm__muted">{fmt(s.createdAt)}</span>
                  <SubmissionActions id={s.id} read={s.read} />
                </div>
              </div>
              <p className="adm__submsg">{s.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
