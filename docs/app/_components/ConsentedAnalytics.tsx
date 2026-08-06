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

  // Second layer: even if this were mounted by mistake, a revoked choice still
  // stops every event at the source.
  return (
    <Analytics
      beforeSend={event => (readConsent() === 'granted' ? event : null)}
    />
  );
};
