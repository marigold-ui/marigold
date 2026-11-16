import { type RefObject, useEffect, useRef } from 'react';

/**
 * Replaces a native `autoFocus`, which scrolls the page behind a `Sheet`.
 * Focusing in an effect is RAC's workaround and still opens the keyboard:
 * https://github.com/adobe/react-spectrum/issues/10878#issuecomment-6482173390
 * Like `autoFocus` it focuses once per mount, not again when `ref` changes.
 */
export const useAutoFocus = (
  ref: RefObject<HTMLElement | null>,
  enabled = true
) => {
  const focusedRef = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (focusedRef.current || !enabled || !element) return;
    focusedRef.current = true;

    // In a sheet, RAC would scroll the content mid slide-in to reveal it.
    const inSheet = element.closest('[data-sheet-content]') !== null;
    element.focus({ preventScroll: inSheet });
  }, [enabled, ref]);
};
