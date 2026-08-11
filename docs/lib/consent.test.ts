import { afterEach, beforeEach, expect, test, vi } from 'vitest';

// `reopened` is module state, so each test needs a fresh copy of the module.
const load = () => import('./consent');

const KEY = 'mg-consent';

let dispatchEvent: ReturnType<typeof vi.fn>;
let addEventListener: ReturnType<typeof vi.fn>;
let removeEventListener: ReturnType<typeof vi.fn>;
let dataset: Record<string, string | undefined>;

/** Stand-ins for the browser globals; this suite runs in a node env. */
const stubBrowser = (localStorage: unknown) => {
  dispatchEvent = vi.fn();
  addEventListener = vi.fn();
  removeEventListener = vi.fn();
  dataset = {};

  vi.stubGlobal('localStorage', localStorage);
  vi.stubGlobal('document', { documentElement: { dataset } });
  vi.stubGlobal('window', {
    dispatchEvent,
    addEventListener,
    removeEventListener,
  });
  vi.stubGlobal('CustomEvent', class CustomEvent {});
};

/** A working store, optionally pre-seeded with a stored choice. */
const workingStorage = (stored?: string) => {
  const values = new Map<string, string>();
  if (stored !== undefined) values.set(KEY, stored);

  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => void values.set(key, value),
    read: () => values.get(KEY) ?? null,
  };
};

beforeEach(() => {
  vi.resetModules();
  stubBrowser(workingStorage());
});

afterEach(() => {
  vi.unstubAllGlobals();
});

test('reads an unanswered visitor as "unset"', async () => {
  const { readConsent, readBannerState } = await load();

  expect(readConsent()).toBe('unset');
  expect(readBannerState()).toBe('unset');
});

test.each(['granted', 'denied'] as const)(
  'reads a stored "%s"',
  async choice => {
    stubBrowser(workingStorage(choice));
    const { readConsent } = await load();

    expect(readConsent()).toBe(choice);
  }
);

test('falls back to "unset" for a stored value that is not a valid choice', async () => {
  stubBrowser(workingStorage('yes-please'));
  const { readConsent } = await load();

  expect(readConsent()).toBe('unset');
});

test('treats a throwing localStorage as "unset" instead of failing the page', async () => {
  stubBrowser({
    // Private mode can throw on access, not just on call.
    get getItem(): never {
      throw new Error('access denied');
    },
  });
  const { readConsent } = await load();

  expect(readConsent()).toBe('unset');
});

test('writeConsent persists the choice, stamps <html> and notifies', async () => {
  const storage = workingStorage();
  stubBrowser(storage);
  const { writeConsent, readConsent } = await load();

  writeConsent('granted');

  expect(storage.read()).toBe('granted');
  expect(dataset.consent).toBe('granted');
  expect(readConsent()).toBe('granted');
  expect(dispatchEvent).toHaveBeenCalledTimes(1);
});

test('writeConsent still applies the choice when it cannot be persisted', async () => {
  stubBrowser({
    getItem: () => null,
    setItem: () => {
      throw new Error('quota exceeded');
    },
  });
  const { writeConsent } = await load();

  expect(() => writeConsent('denied')).not.toThrow();
  expect(dataset.consent).toBe('denied');
  expect(dispatchEvent).toHaveBeenCalledTimes(1);
});

test('reopening surfaces the banner without disturbing the stored choice', async () => {
  const storage = workingStorage('denied');
  stubBrowser(storage);
  const { openConsentSettings, readBannerState, readConsent } = await load();

  openConsentSettings();

  expect(readBannerState()).toBe('reopened');
  expect(readConsent()).toBe('denied');
  expect(storage.read()).toBe('denied');
});

test('closing a reopened banner falls back to the stored choice', async () => {
  const storage = workingStorage('granted');
  stubBrowser(storage);
  const { openConsentSettings, closeConsentSettings, readBannerState } =
    await load();

  openConsentSettings();
  closeConsentSettings();

  expect(readBannerState()).toBe('granted');
  expect(storage.read()).toBe('granted');
});

test('answering again clears the reopened state', async () => {
  stubBrowser(workingStorage('granted'));
  const { openConsentSettings, writeConsent, readBannerState } = await load();

  openConsentSettings();
  writeConsent('denied');

  expect(readBannerState()).toBe('denied');
});

test('subscribing listens for in-page and cross-tab changes, and unsubscribes', async () => {
  const { subscribeConsent } = await load();
  const onChange = vi.fn();

  const unsubscribe = subscribeConsent(onChange);

  expect(addEventListener).toHaveBeenCalledWith('mg-consent-change', onChange);
  expect(addEventListener).toHaveBeenCalledWith('storage', onChange);

  unsubscribe();

  expect(removeEventListener).toHaveBeenCalledWith(
    'mg-consent-change',
    onChange
  );
  expect(removeEventListener).toHaveBeenCalledWith('storage', onChange);
});

test('the server snapshot stays "unset" even with a choice stored', async () => {
  stubBrowser(workingStorage('granted'));
  const { getServerConsent } = await load();

  // Keeps the server markup in agreement with the first client render.
  expect(getServerConsent()).toBe('unset');
});

test('the init script reads the same key writeConsent writes', async () => {
  const { CONSENT_INIT_SCRIPT } = await load();

  expect(CONSENT_INIT_SCRIPT).toContain(`localStorage.getItem('${KEY}')`);
  expect(CONSENT_INIT_SCRIPT).toContain('documentElement.dataset.consent');
});
