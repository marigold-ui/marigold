import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';

/**
 * Log a development-only `console.warn` at most once per component instance.
 * The check runs in an effect rather than the render body, so re-renders (a
 * controlled field on every keystroke, a form dialog) do not repeat it. A
 * condition that only becomes true later still warns, once.
 *
 * Pass the component's `ref` to skip elements assistive technology never
 * reaches (`aria-hidden="true"` or `inert` on the element or an ancestor),
 * and to log the element so devtools can point at it.
 *
 * @example
 * ```tsx
 * useDevWarning(!hasAccessibleName, '[CloseButton] Renders without …');
 * ```
 */
export const useDevWarning = (
  shouldWarn: boolean,
  message: string,
  ref?: RefObject<Element | null>
) => {
  const hasWarnedRef = useRef(false);

  useEffect(() => {
    if (
      process.env.NODE_ENV === 'production' ||
      hasWarnedRef.current ||
      !shouldWarn
    ) {
      return;
    }

    const element = ref?.current;
    if (element?.closest('[aria-hidden="true"], [inert]')) {
      return;
    }

    hasWarnedRef.current = true;
    if (element) {
      console.warn(message, element);
    } else {
      console.warn(message);
    }
  }, [shouldWarn, message, ref]);
};
