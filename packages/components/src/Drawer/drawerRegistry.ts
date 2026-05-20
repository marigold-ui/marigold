/**
 * Single-slot registry enforcing "one Drawer open at a time" across the
 * desktop (NonModal) and mobile (ModalOverlay) paths. Nested drawers don't
 * register — see `useDrawerCoordination`.
 *
 * Concurrent React safety:
 * - `activeClose` is never read during render — only mutated inside effect
 *   callbacks. No tearing risk; `useSyncExternalStore` is not needed.
 * - Under `startTransition`, a deferred drawer-open won't register until the
 *   transition commits; if interrupted, the prior drawer stays open.
 * - Strict Mode double-invoke is safe: re-registering the same `close` is a
 *   no-op, and cleanup only clears the slot if it still holds that handler.
 */

let activeClose: (() => void) | null = null;

export const registerActiveDrawer = (close: () => void): (() => void) => {
  if (activeClose !== close) {
    // Set the new slot before invoking the previous close, so re-entrant
    // registrations from the close handler see the new active drawer.
    const previous = activeClose;
    activeClose = close;
    previous?.();
  }
  return () => {
    if (activeClose === close) activeClose = null;
  };
};
