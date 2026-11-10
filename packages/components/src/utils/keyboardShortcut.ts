import { useEffect, useEffectEvent, useSyncExternalStore } from 'react';
import { isAppleDevice } from '@react-aria/utils';

// Global ⌘/Ctrl + key shortcuts (CommandPalette ⌘K, Sidebar ⌘B).
//
// Apple devices use ⌘, everything else Ctrl, never both: Ctrl+B on a Mac is
// "cursor back" in text fields and must not be stolen. iPads count as Apple,
// their hardware keyboards have ⌘.
//
// Shortcuts deliberately fire inside plain inputs and textareas: a modifier
// combo types nothing there, and GitHub, Linear, Slack and Vercel behave the
// same. They yield when another handler has already claimed the key
// (`defaultPrevented`), so a rich-text editor binding ⌘K to "insert link" or
// ⌘B to "bold" wins. The listener sits on `document` in the bubble phase so
// such element-level handlers run first.

export type ShortcutEvent = Pick<
  KeyboardEvent,
  'key' | 'metaKey' | 'ctrlKey' | 'altKey' | 'shiftKey' | 'defaultPrevented'
>;

export const matchesShortcut = (
  event: ShortcutEvent,
  key: string,
  apple: boolean
) => {
  if (event.defaultPrevented) return false;
  if (event.altKey || event.shiftKey) return false;
  if (event.key.toLowerCase() !== key.toLowerCase()) return false;
  return apple
    ? event.metaKey && !event.ctrlKey
    : event.ctrlKey && !event.metaKey;
};

export const useKeyboardShortcut = (
  key: string | false,
  onTrigger: () => void
) => {
  const trigger = useEffectEvent(onTrigger);

  useEffect(() => {
    if (!key) return;
    const apple = isAppleDevice();
    const handler = (event: KeyboardEvent) => {
      if (!matchesShortcut(event, key, apple)) return;
      // Browsers bind some of these (Ctrl+K focuses the search bar on
      // Windows and Linux, ⌘B toggles bookmarks in Firefox).
      event.preventDefault();
      trigger();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [key]);
};

// `isAppleDevice()` reads the user agent, which the server does not have.
// Render the non-Apple hint there and correct it on the client without a
// hydration mismatch.
const subscribe = () => () => {};
export const useIsAppleDevice = () =>
  useSyncExternalStore(subscribe, isAppleDevice, () => false);

/**
 * The visible hint (`⌘K` / `Ctrl+K`) and the `aria-keyshortcuts` value
 * (`Meta+K` / `Control+K`) for a shortcut key.
 */
export const formatShortcut = (key: string, apple: boolean) => {
  const upper = key.toUpperCase();
  return {
    label: apple ? `⌘${upper}` : `Ctrl+${upper}`,
    ariaKeyShortcuts: `${apple ? 'Meta' : 'Control'}+${upper}`,
  };
};
