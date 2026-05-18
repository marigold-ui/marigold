/**
 * Single-slot registry that enforces "one Drawer open at a time".
 *
 * When a Drawer opens, it registers its close handler. If another Drawer was
 * already active, that one is closed first. This applies across the desktop
 * (NonModal) and mobile (ModalOverlay) paths.
 *
 * Module-level state is fine here because Drawer is client-only (no SSR
 * concern) and there is conceptually one drawer scope per app instance —
 * mirroring the pattern used by `ToastQueue` and `LandmarkManager` in
 * react-aria.
 *
 * Concurrent React safety:
 * - `activeClose` is never read during render — only mutated inside effect
 *   callbacks. There is no tearing risk and `useSyncExternalStore` is not
 *   needed.
 * - Under `startTransition`, a deferred drawer-open won't register until the
 *   transition commits; if interrupted, the prior drawer stays open, which is
 *   the desired outcome.
 * - Strict Mode double-invoke is safe: registering the same `close` twice is
 *   a no-op, and the matching cleanup only clears the slot if it still holds
 *   that handler.
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
