import { useEffect, useRef } from 'react';
import { usePageContext } from './Context';

export interface UsePageFocusOptions {
  /**
   * When `false`, the hook is inert: route changes do not move focus. Lets a
   * consumer keep the hook mounted while gating the behaviour (e.g. respecting a
   * "reduce motion / reduce focus jumps" preference) without conditionally
   * calling the hook.
   * @default true
   */
  enabled?: boolean;
}

/**
 * Move focus to the page's `<h1>` when the route changes, the standard
 * single-page-app technique for announcing a navigation to screen-reader and
 * keyboard users. `<Page>` owns the heading and the plumbing to target it
 * (`titleId`), but it is router-agnostic and cannot observe navigation on its
 * own, so the route signal is supplied by the caller.
 *
 * Pass the current route key (typically the pathname) from the app router.
 * On each change the page heading is made programmatically focusable
 * (`tabIndex={-1}`) and focused. The **initial mount is skipped**, so the first
 * paint of the app never steals focus, and the call is a **no-op when the page
 * has no `<h1>`** (an `aria-label`-only `<Page>`).
 *
 * Must be called from a component rendered inside a `<Page>`. Because the skip
 * is per-mount, call it from a component that persists across navigations (the
 * layout / shell level), not one that remounts on every route.
 *
 * @param routeKey - A value that changes on navigation, usually the pathname.
 *
 * @example
 * ```tsx
 * // At the shell level, where <Page> stays mounted across routes:
 * const PageFocus = ({ pathname }: { pathname: string }) => {
 *   usePageFocus(pathname);
 *   return null;
 * };
 *
 * <RouterProvider navigate={navigate}>
 *   <Page>
 *     <PageFocus pathname={location.pathname} />
 *     <Outlet />
 *   </Page>
 * </RouterProvider>
 * ```
 */
export const usePageFocus = (
  routeKey: string,
  { enabled = true }: UsePageFocusOptions = {}
) => {
  const { titleId } = usePageContext();
  const isInitialMountRef = useRef(true);

  useEffect(() => {
    // Skip the first run so the initial page load is left untouched; only a
    // subsequent route change should move focus.
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
      return;
    }

    if (!enabled) {
      return;
    }

    // The heading is looked up by the id `<Page>` assigns to it. When the page
    // has no `<Title>` there is nothing to focus, so this is a no-op.
    const heading = document.getElementById(titleId);
    if (!heading) {
      return;
    }

    // Headings are not focusable by default. Make it programmatically focusable
    // without adding it to the tab order (`tabIndex={-1}`), then focus it.
    heading.tabIndex = -1;
    heading.focus();
  }, [routeKey, titleId, enabled]);
};
