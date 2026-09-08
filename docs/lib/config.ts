// Env
// ---------------
export const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL ??
  (process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000');

/**
 * Where the site actually lives, independent of the deployment it was built on.
 * `baseUrl` falls back to the per-deployment Vercel URL, which is fine for
 * fetching assets but not for anything a third party stores — an RSS `guid`
 * that changes between deploys makes every reader re-notify every item.
 */
export const canonicalUrl = 'https://www.marigold-ui.io';
