// `await connection()` opts out of Next.js's static prerender pass to avoid
// the Node 22+ undici × prerender Proxy bug (nodejs/undici#4290).
import manifest from '@/.registry/manifest.json';
import { connection } from 'next/server';

export const GET = async () => {
  await connection();
  return Response.json(manifest, {
    headers: {
      'Cache-Control':
        'public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400',
    },
  });
};
