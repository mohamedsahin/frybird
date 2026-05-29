import 'server-only';
import { UTApi } from 'uploadthing/server';

// Reads UPLOADTHING_TOKEN from the environment automatically.
export const utapi = new UTApi();

export interface MediaFile {
  key: string;
  name: string;
  size: number;
  uploadedAt: number;
  status: 'Deletion Pending' | 'Failed' | 'Uploaded' | 'Uploading';
  url: string;
}

// The app id is encoded in the (base64 JSON) UploadThing token. Public file
// URLs are served from `https://<appId>.ufs.sh/f/<key>`.
function getAppId(): string | null {
  const token = process.env.UPLOADTHING_TOKEN;
  if (!token) return null;
  try {
    const json = JSON.parse(Buffer.from(token, 'base64').toString('utf8'));
    return typeof json.appId === 'string' ? json.appId : null;
  } catch {
    return null;
  }
}

const APP_ID = getAppId();

export function fileUrl(key: string): string {
  // Fall back to the app-agnostic legacy host if the token can't be decoded.
  return APP_ID ? `https://${APP_ID}.ufs.sh/f/${key}` : `https://utfs.io/f/${key}`;
}

/** Lists uploaded files, newest first, with public URLs attached. */
export async function listMedia(): Promise<MediaFile[]> {
  const { files } = await utapi.listFiles({ limit: 500 });
  return files
    .map((file) => ({
      key: file.key,
      name: file.name,
      size: file.size,
      uploadedAt: file.uploadedAt,
      status: file.status,
      url: fileUrl(file.key),
    }))
    .sort((a, b) => b.uploadedAt - a.uploadedAt);
}
