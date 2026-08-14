import { CONSENT_INIT_SCRIPT } from '@/lib/consent';

/**
 * Server-rendered so it runs during HTML parse, before the banner paints. It
 * must not live inside the banner: a `<script>` re-rendered on the client
 * never executes. The rule acting on what it stamps is in `app/global.css`.
 */
export const ConsentInit = () => (
  <script dangerouslySetInnerHTML={{ __html: CONSENT_INIT_SCRIPT }} />
);
