import Link from 'next/link';
import { getLocations } from '@/lib/store';
import LocationActions from '@/components/admin/LocationActions';

export const dynamic = 'force-dynamic';

export default async function AdminLocations() {
  const locations = await getLocations();

  return (
    <div>
      <header className="adm__head">
        <h1>Locations</h1>
        <p>{locations.length} branches on the map &amp; locations page.</p>
        <Link href="/admin/locations/new" className="btn btn--red adm__headbtn"><span className="lbl">+ Add Location</span></Link>
      </header>

      <div className="adm__tablewrap">
        <table className="adm__table">
          <thead>
            <tr>
              <th>Branch</th><th>Status</th><th>Coordinates</th><th>Order</th><th></th>
            </tr>
          </thead>
          <tbody>
            {locations.map((l) => (
              <tr key={l.slug}>
                <td>
                  <div className="adm__item">
                    <div className="adm__thumb">
                      {l.img ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={l.img} alt="" />
                      ) : (
                        <span className="adm__thumbph">—</span>
                      )}
                    </div>
                    <div>
                      <b>{l.name}{l.accent ? ' ★' : ''}</b>
                      <span className="adm__muted">{l.descriptor || `/${l.slug}`}</span>
                    </div>
                  </div>
                </td>
                <td>{l.isPlaceholder ? <span className="adm__muted">Teaser · </span> : null}{l.statusLabel}</td>
                <td className="adm__muted">{l.lat != null && l.lng != null ? `${l.lat}, ${l.lng}` : '—'}</td>
                <td>{l.sortOrder}</td>
                <td className="adm__rowactions">
                  <Link href={`/admin/locations/${l.slug}`} className="adm__link">Edit</Link>
                  <LocationActions slug={l.slug} name={l.name} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
