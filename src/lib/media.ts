// Shared (client + server safe) check that a product image URL points to
// UploadThing. Product images are restricted to UploadThing only.
export function isUploadThingUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  try {
    const u = new URL(url);
    return u.protocol === 'https:' && (u.hostname.endsWith('.ufs.sh') || u.hostname === 'utfs.io');
  } catch {
    return false;
  }
}
