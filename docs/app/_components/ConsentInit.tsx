import { CONSENT_BANNER_ID, CONSENT_INIT_SCRIPT } from '@/lib/consent';

/**
 * Server-rendered so the script runs once during HTML parse, before the banner
 * paints. It must not live inside the banner component: React re-renders that
 * on the client, and a `<script>` re-rendered client-side never executes and
 * logs an error.
 *
 * `:not([data-reopened])` limits the rule to the pre-hydration paint, so the
 * footer link can still reopen the banner while a choice is stored.
 */
const HIDE_WHEN_ANSWERED = `html[data-consent="granted"] #${CONSENT_BANNER_ID}:not([data-reopened]),html[data-consent="denied"] #${CONSENT_BANNER_ID}:not([data-reopened]){display:none}`;

export const ConsentInit = () => (
  <>
    <style>{HIDE_WHEN_ANSWERED}</style>
    <script dangerouslySetInnerHTML={{ __html: CONSENT_INIT_SCRIPT }} />
  </>
);
