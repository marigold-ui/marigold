import type { RefCallback } from 'react';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';

/**
 * Detect whether a slot child is present in the component tree without
 * inspecting `React.Children`. Returns a callback ref and a boolean.
 *
 * Attach the returned ref to the slot child's DOM element. When the child
 * mounts the ref fires and the boolean flips to `true`; when it unmounts
 * the boolean returns to `false`. This lets a parent react to the
 * presence or absence of a child without brittle tree traversal.
 *
 * Follows the same pattern as react-aria-components' internal `useSlot`.
 *
 * @param initialState - Set to `true` when the slot is expected to be
 *   present (the common case) so no re-render is needed on mount. Set to
 *   `false` when the slot is not expected (e.g. the parent already has an
 *   explicit label). Choosing the right default avoids a layout-phase
 *   re-render in the happy path.
 *
 * @example
 * ```tsx
 * const [slotRef, hasSlot] = useSlot();
 * // … pass slotRef via context …
 * // In the child: <div ref={slotRef}>…</div>
 * // hasSlot is true once the child mounts
 * ```
 */
export const useSlot = (
  initialState = true
): [RefCallback<Element>, boolean] => {
  const [hasSlot, setHasSlot] = useState(initialState);
  const hasRun = useRef(false);

  const ref = useCallback<RefCallback<Element>>(el => {
    hasRun.current = true;
    setHasSlot(!!el);
  }, []);

  // If the callback ref was never called after mount the slot child is absent
  useLayoutEffect(() => {
    if (!hasRun.current) {
      setHasSlot(false);
    }
  }, []);

  return [ref, hasSlot];
};
