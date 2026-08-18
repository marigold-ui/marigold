import { isMarkdownPreferred } from 'fumadocs-core/negotiation';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Every docs page has a generated Markdown twin in `public/` (see
// scripts/build-md.ts). Hand it to clients that ask for Markdown so an agent
// doesn't need to know about the `.md` suffix to get the good version. Proxy
// runs ahead of filesystem routes, so the rewrite resolves to the static file.

export const proxy = (request: NextRequest) => {
  if (!isMarkdownPreferred(request)) return NextResponse.next();

  // Only reachable when Next's trailing-slash redirect hasn't run first: on
  // Vercel `/foo/` 308s to `/foo` before the proxy sees it, so this is for
  // `next start` and self-hosting.
  const pathname = request.nextUrl.pathname.replace(/\/$/, '');

  // `__internal__` is a live route that build-md deliberately skips, and a path
  // that already carries an extension would rewrite to `<name>.md.md`.
  if (pathname.includes('/__internal__') || /\.[^/]*$/.test(pathname)) {
    return NextResponse.next();
  }

  // A plain `URL` rather than `nextUrl.clone()`: `NextURL` re-appends the
  // trailing slash it was built with, which would ask for `<name>.md/`.
  const url = new URL(request.url);
  url.pathname = `${pathname}.md`;

  const response = NextResponse.rewrite(url);
  // Vercel's CDN keys on `Accept` by default; this is for any other cache in
  // front of these URLs. Only the markdown response can carry it — Next.js
  // replaces `Vary` on a rendered page with its own router values.
  response.headers.set('Vary', 'Accept');

  return response;
};

export const config = {
  matcher: [
    '/components/:path*',
    '/foundations/:path*',
    '/getting-started/:path*',
    '/patterns/:path*',
    '/releases/:path*',
  ],
};
