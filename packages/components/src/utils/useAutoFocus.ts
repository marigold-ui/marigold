import { type RefObject, useEffect } from 'react';

/**
 * Replaces a native `autoFocus`, which scrolls the page behind a `Sheet`.
 * Focusing in an effect is RAC's workaround and still opens the keyboard:
 * https://github.com/adobe/react-spectrum/issues/10878#issuecomment-6482173390
 */
export const useAutoFocus = (
  ref: RefObject<HTMLElement | null>,
  enabled = true
) => {
  useEffect(() => {
    const element = ref.current;
    if (!enabled || !element) return;

    // In a sheet, RAC would scroll the content mid slide-in to reveal it.
    const inSheet = element.closest('[data-sheet-content]') !== null;
    element.focus({ preventScroll: inSheet });
  }, [enabled, ref]);
};
