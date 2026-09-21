import type { RefCallback } from 'react';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';

/**
 * Detect whether a slot child is present without inspecting `React.Children`.
 * Attach the returned callback ref to the slot child's DOM element: the boolean
 * flips on mount and unmount, so a parent can react to the child's presence
 * without brittle tree traversal. Same pattern as RAC's internal `useSlot`.
 *
 * @param initialState - `true` when the slot is expected (the common case), so
 *   no re-render is needed on mount. `false` when it is not (e.g. the parent
 *   already has an explicit label). The right default avoids a layout-phase
 *   re-render in the happy path.
 *
 * @example
 * ```tsx
 * const [slotRef, hasSlot] = useSlot();
 * // pass slotRef via context, then in the child: <div ref={slotRef}>…</div>
 * ```
 */
export const useSlot = (
  initialState = true
): [RefCallback<Element>, boolean] => {
  const [hasSlot, setHasSlot] = useState(initialState);
  const hasRunRef = useRef(false);

  const slotRef = useCallback<RefCallback<Element>>(el => {
    hasRunRef.current = true;
    setHasSlot(!!el);
  }, []);

  // Correct the initial assumption: no ref call after mount means no slot
  // child. The setState has to happen before paint (as in react-aria's useSlot).
  useLayoutEffect(() => {
    if (!hasRunRef.current) {
      // eslint-disable-next-line
      setHasSlot(false);
    }
  }, []);

  return [slotRef, hasSlot];
};
