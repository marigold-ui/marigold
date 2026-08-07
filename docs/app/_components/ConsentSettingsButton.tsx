'use client';

import { openConsentSettings } from '@/lib/consent';

/**
 * Reopens the consent banner. GDPR requires withdrawing consent to be as easy
 * as giving it, so this has to be reachable from every page.
 */
export const ConsentSettingsButton = () => (
  <button
    type="button"
    onClick={openConsentSettings}
    className="hover:text-fd-foreground cursor-pointer transition-colors"
  >
    Cookie settings
  </button>
);
