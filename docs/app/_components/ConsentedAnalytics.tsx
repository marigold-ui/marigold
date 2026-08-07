'use client';

import { getServerConsent, readConsent, subscribeConsent } from '@/lib/consent';
import { Analytics } from '@vercel/analytics/next';
import { useSyncExternalStore } from 'react';

/**
 * Mounts Vercel Web Analytics only once consent is granted.
 *
 * The script cannot be rendered-and-hidden the way the banner is, because a
 * `<script>` in the markup executes regardless of CSS. The server snapshot is
 * always "unset", so the server and the first client render agree on rendering
 * nothing; the script is mounted only after hydration, and only if accepted.
 */
export const ConsentedAnalytics = () => {
  const consent = useSyncExternalStore(
    subscribeConsent,
    readConsent,
    getServerConsent
  );

  if (consent !== 'granted') return null;

  // `@vercel/analytics` has no effect cleanup, so unmounting leaves its script
  // in place until the next page load. `beforeSend` reads the live choice per
  // event, so it is what actually enforces a withdrawal.
  return (
    <Analytics
      beforeSend={event => (readConsent() === 'granted' ? event : null)}
    />
  );
};
