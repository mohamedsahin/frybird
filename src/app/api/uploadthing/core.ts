import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { cookies } from 'next/headers';

const f = createUploadthing();

const SESSION_TOKEN = process.env.ADMIN_SESSION_TOKEN || 'frybird-dev-session-change-me';

// Only a signed-in admin may upload. Mirrors the cookie check in middleware.ts.
function requireAdmin() {
  const token = cookies().get('frybird_admin')?.value;
  if (token !== SESSION_TOKEN) {
    throw new UploadThingError('Unauthorized — please sign in to the admin panel.');
  }
  return { admin: true as const };
}

export const ourFileRouter = {
  // Product / media-library image uploads.
  productImage: f({ image: { maxFileSize: '8MB', maxFileCount: 1 } })
    .middleware(() => requireAdmin())
    .onUploadComplete(({ file }) => {
      // Returned data is forwarded to the client's onClientUploadComplete.
      return { url: file.ufsUrl, key: file.key, name: file.name };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
