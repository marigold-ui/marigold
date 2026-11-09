import { useEffect, useEffectEvent } from 'react';
import { isMac } from '@react-aria/utils';

// ⌘K on macOS, Ctrl+K elsewhere. Deliberately fires inside plain inputs and
// textareas: a modifier combo types nothing there, and GitHub, Linear, Slack
// and Vercel behave the same. It yields when another handler has already
// claimed the key (`defaultPrevented`), so a rich-text editor binding ⌘K to
// "insert link" wins. The listener sits on `document` in the bubble phase so
// such element-level handlers run first.
export const isCommandPaletteShortcut = (
  event: Pick<
    KeyboardEvent,
    'key' | 'metaKey' | 'ctrlKey' | 'altKey' | 'shiftKey' | 'defaultPrevented'
  >,
  key: string,
  mac: boolean
) => {
  if (event.defaultPrevented) return false;
  if (event.altKey || event.shiftKey) return false;
  if (event.key.toLowerCase() !== key.toLowerCase()) return false;
  return mac
    ? event.metaKey && !event.ctrlKey
    : event.ctrlKey && !event.metaKey;
};

export const useCommandPaletteShortcut = (
  key: string | false,
  onTrigger: () => void
) => {
  const trigger = useEffectEvent(onTrigger);

  useEffect(() => {
    if (!key) return;
    const mac = isMac();
    const handler = (event: KeyboardEvent) => {
      if (!isCommandPaletteShortcut(event, key, mac)) return;
      // Ctrl+K focuses the browser's search bar on Windows and Linux.
      event.preventDefault();
      trigger();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [key]);
};
