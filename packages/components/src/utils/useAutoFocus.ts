import { type RefObject, useEffect, useRef } from 'react';

/**
 * Replaces a native `autoFocus`, which scrolls the page behind a `Sheet`.
 * Focusing in an effect is RAC's workaround and still opens the keyboard:
 * https://github.com/adobe/react-spectrum/issues/10878#issuecomment-6482173390
 * It focuses once, the first time it is enabled, not again when `ref` changes.
 */
export const useAutoFocus = (
  ref: RefObject<HTMLElement | null>,
  enabled = true
) => {
  const focusedRef = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (focusedRef.current || !enabled || !element) return;

    const sheet = element.closest<HTMLElement>('[data-sheet-content]');
    const focus = () => {
      focusedRef.current = true;
      // In a sheet, RAC would scroll the content mid slide-in to reveal it.
      element.focus({ preventScroll: sheet !== null });
    };

    if (!sheet || sheet.contains(document.activeElement)) {
      focus();
      return;
    }

    // RAC focuses the sheet once it has slid in. Earlier, the field is below the
    // screen, and on a phone the keyboard it opens scrolls the page down to it.
    sheet.addEventListener('focusin', focus, { once: true });

    return () => sheet.removeEventListener('focusin', focus);
  }, [enabled, ref]);
};
