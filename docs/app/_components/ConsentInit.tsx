import { CONSENT_INIT_SCRIPT } from '@/lib/consent';

/**
 * Server-rendered so it runs during HTML parse, before the banner paints. It
 * must not live inside the banner: a `<script>` re-rendered on the client
 * never executes. The rule acting on what it stamps is in `app/global.css`.
 */
export const ConsentInit = () => (
  // eslint-disable-next-line @eslint-react/dom-no-dangerously-set-innerhtml -- an inline script is the point: it must run during HTML parse, and the source is a build-time constant, never user input
  <script dangerouslySetInnerHTML={{ __html: CONSENT_INIT_SCRIPT }} />
);
