import { useEffect, useRef } from 'react';
import { usePageContext } from './Context';

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
 * The heading lookup happens synchronously when the effect runs, so the `<h1>`
 * must already be mounted at that point. A route's `<Title>` rendered behind a
 * `React.lazy` + `<Suspense>` boundary can still be loading when this fires, in
 * which case focus silently stays put; hoist the title (or the route signal)
 * above the boundary if a route lazy-loads its content.
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
// TODO(follow-up): every consumer writes the same null-rendering wrapper to
// call this hook. A `routeKey` prop directly on <Page> would remove that
// boilerplate (raised in review, out of scope for DST-1492).
export const usePageFocus = (routeKey: string) => {
  const { titleId } = usePageContext();
  const previousRouteKeyRef = useRef(routeKey);

  useEffect(() => {
    // Only act once the route key actually changes. Tracking the previous key
    // (rather than an "is this the first run" flag) keeps the skip resilient to
    // React StrictMode's dev-only setup → cleanup → setup remount: refs survive
    // that remount, so a boolean flipped to `false` on the first setup would
    // read as "not the first run" on the second setup and steal focus on the
    // initial page load.
    const changed = previousRouteKeyRef.current !== routeKey;
    previousRouteKeyRef.current = routeKey;
    if (!changed) {
      return;
    }

    // The heading is looked up by the id `<Page>` assigns to it. When the page
    // has no `<Title>` there is nothing to focus, so this is a no-op.
    const heading = document.getElementById(titleId);
    if (!heading) {
      // TODO(follow-up): fall back to focusing <Page>'s <main> here instead of
      // leaving focus wherever it was (raised in review, deliberately out of
      // scope for DST-1492 — the no-op is intentional and covered by a test).
      return;
    }

    // Headings are not focusable by default. Make it programmatically focusable
    // without adding it to the tab order (`tabIndex={-1}`), then focus it.
    heading.tabIndex = -1;
    heading.focus();
  }, [routeKey, titleId]);
};
