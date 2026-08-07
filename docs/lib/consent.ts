export type ConsentState = 'unset' | 'granted' | 'denied';
export type ConsentChoice = Exclude<ConsentState, 'unset'>;
/** The stored choice, or `reopened` when the visitor asked to change it again. */
export type BannerState = ConsentState | 'reopened';

const CONSENT_KEY = 'mg-consent';
const CONSENT_CHANGE_EVENT = 'mg-consent-change';

export const CONSENT_BANNER_ID = 'mg-consent-banner';

const VERCEL_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV;

/**
 * On the live site always; anywhere else only via
 * `NEXT_PUBLIC_CONSENT_BANNER=1` — `docs/.env.local` while working on it, or a
 * preview env so Legal and the DPO can review it without cloning the repo.
 * Previews that do not set it are unaffected.
 *
 * Where the banner is off, analytics stays off too.
 */
export const CONSENT_BANNER_ENABLED =
  VERCEL_ENV === 'production' || process.env.NEXT_PUBLIC_CONSENT_BANNER === '1';

/**
 * Runs before paint to stamp the stored choice onto the root element, so the
 * banner can be hidden by CSS instead of by React state. Without this the
 * banner would flash on every page load for visitors who already answered.
 */
export const CONSENT_INIT_SCRIPT = `try{document.documentElement.dataset.consent=localStorage.getItem('${CONSENT_KEY}')||'unset'}catch(e){document.documentElement.dataset.consent='unset'}`;

/** Set while the visitor is revisiting their choice via the footer link. */
let reopened = false;

const notify = () =>
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT));

export const readConsent = (): ConsentState => {
  if (typeof window === 'undefined') return 'unset';

  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === 'granted' || value === 'denied' ? value : 'unset';
  } catch {
    // Storage can throw in private mode or with cookies blocked. Treat that as
    // "no consent given" rather than failing the page.
    return 'unset';
  }
};

export const readBannerState = (): BannerState =>
  reopened ? 'reopened' : readConsent();

export const writeConsent = (choice: ConsentChoice) => {
  try {
    localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // Choice can't be persisted, but it still applies for this page view.
  }

  reopened = false;
  document.documentElement.dataset.consent = choice;
  notify();
};

export const openConsentSettings = () => {
  reopened = true;
  notify();
};

/** Leaves without answering again; the stored choice is untouched. */
export const closeConsentSettings = () => {
  reopened = false;
  notify();
};

/** Subscription for `useSyncExternalStore`; also picks up changes from other tabs. */
export const subscribeConsent = (onChange: () => void) => {
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  window.addEventListener('storage', onChange);

  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
};

/**
 * Server snapshot for `useSyncExternalStore`. Always "unset" so the markup
 * rendered on the server matches the first client render; the real choice is
 * applied right after hydration.
 */
export const getServerConsent = (): ConsentState => 'unset';
