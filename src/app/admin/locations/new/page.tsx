import Link from 'next/link';
import LocationForm from '@/components/admin/LocationForm';

export default function NewLocationPage() {
  return (
    <div>
      <header className="adm__head">
        <Link href="/admin/locations" className="adm__back">← Locations</Link>
        <h1>Add Location</h1>
        <p>Create a new branch. It appears on the map, the locations page and the footer immediately.</p>
      </header>
      <LocationForm />
    </div>
  );
}
