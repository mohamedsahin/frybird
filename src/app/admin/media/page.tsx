import MediaLibrary from '@/components/admin/MediaLibrary';
import { listMedia } from '@/lib/uploadthing-server';

export const dynamic = 'force-dynamic';

export default async function AdminMedia() {
  let files = [];
  let loadError = '';
  try {
    files = await listMedia();
  } catch (e) {
    loadError = 'Could not load the media library. Check the UploadThing token.';
  }

  return (
    <div>
      <header className="adm__head">
        <h1>Media Library</h1>
        <p>{files.length} file{files.length === 1 ? '' : 's'} uploaded to UploadThing.</p>
      </header>

      {loadError ? (
        <p className="adm-login__err">{loadError}</p>
      ) : (
        <MediaLibrary initial={files} />
      )}
    </div>
  );
}
