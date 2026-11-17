import { type RefObject, useEffect, useRef } from 'react';

/**
 * Replaces a native `autoFocus`, which scrolls the page behind a `Sheet`.
 * Focusing in an effect is RAC's workaround and still opens the keyboard:
 * https://github.com/adobe/react-spectrum/issues/10878#issuecomment-6482173390
 * It focuses at most once, the first time it is enabled, not again when `ref`
 * changes. In a sheet it waits for the slide-in, and skips focusing when the
 * user moved focus before that.
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

    if (!sheet) {
      focus();
      return;
    }

    let observer: MutationObserver | undefined;
    const onSheetFocused = () => {
      const overlay = sheet.closest('[data-entering]');
      if (!overlay) {
        focus();
        return;
      }
      // A tap on the sheet's text mid slide-in focuses the sheet too, so wait.
      observer = new MutationObserver(() => {
        if (overlay.hasAttribute('data-entering')) return;
        observer?.disconnect();
        if (document.activeElement === sheet) focus();
        // Focus moved during the slide-in, leave it.
        else focusedRef.current = true;
      });
      observer.observe(overlay, {
        attributes: true,
        attributeFilter: ['data-entering'],
      });
    };

    if (document.activeElement === sheet) {
      onSheetFocused();
      return () => observer?.disconnect();
    }
    if (sheet.contains(document.activeElement)) {
      focus();
      return;
    }

    // RAC focuses the sheet once it has slid in. Earlier, the field is below the
    // screen, and on a phone the keyboard it opens scrolls the page down to it.
    // Focus on anything else is a tap during the slide-in, so leave it there.
    const onFocusIn = (event: FocusEvent) => {
      sheet.removeEventListener('focusin', onFocusIn);
      if (event.target === sheet) {
        onSheetFocused();
      } else {
        focusedRef.current = true;
      }
    };
    sheet.addEventListener('focusin', onFocusIn);

    return () => {
      sheet.removeEventListener('focusin', onFocusIn);
      observer?.disconnect();
    };
  }, [enabled, ref]);
};
