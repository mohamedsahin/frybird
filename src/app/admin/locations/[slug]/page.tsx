import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLocationBySlug } from '@/lib/store';
import LocationForm from '@/components/admin/LocationForm';

export const dynamic = 'force-dynamic';

export default async function EditLocationPage({ params }) {
  const location = await getLocationBySlug(params.slug);
  if (!location) notFound();

  return (
    <div>
      <header className="adm__head">
        <Link href="/admin/locations" className="adm__back">← Locations</Link>
        <h1>Edit: {location.name}</h1>
        <p>Changes go live on the site immediately.</p>
      </header>
      <LocationForm initial={location} />
    </div>
  );
}
