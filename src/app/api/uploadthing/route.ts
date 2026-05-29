import { createRouteHandler } from 'uploadthing/next';
import { ourFileRouter } from './core';

// Serves the UploadThing presign + callback endpoints at /api/uploadthing.
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
