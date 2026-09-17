import { useEffect, useRef } from 'react';
import { usePageContext } from './Context';

/**
 * Move focus to the page's `<h1>` when the route changes, the standard
 * single-page-app technique for announcing a navigation to screen-reader and
 * keyboard users. `<Page>` owns the heading but is router-agnostic, so the
 * caller supplies the route signal.
 *
 * On each change the heading is made focusable (`tabIndex={-1}`) and focused.
 * The initial mount is skipped, so the first paint never steals focus, and the
 * call is a no-op when the page has no `<h1>` (an `aria-label`-only `<Page>`).
 *
 * Call it from a component inside `<Page>` that persists across navigations
 * (the layout / shell level): the skip is per-mount, so one that remounts per
 * route never fires. The `<h1>` has to be mounted when the effect runs, so a
 * `<Title>` behind a `React.lazy` boundary can still be loading, and focus
 * silently stays put. Hoist the title above the boundary in that case.
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
 * // <Page><PageFocus pathname={location.pathname} /><Outlet /></Page>
 * ```
 */
// TODO(follow-up): a `routeKey` prop on <Page> would remove the null-rendering
// wrapper every consumer writes (raised in review, out of scope for DST-1492).
export const usePageFocus = (routeKey: string) => {
  const { titleId } = usePageContext();
  const previousRouteKeyRef = useRef(routeKey);

  useEffect(() => {
    // Track the previous key rather than an "is this the first run" flag: refs
    // survive StrictMode's dev-only setup → cleanup → setup remount, so a
    // boolean flipped on the first setup would read as "not the first run" on
    // the second and steal focus on the initial page load.
    const changed = previousRouteKeyRef.current !== routeKey;
    previousRouteKeyRef.current = routeKey;
    if (!changed) {
      return;
    }

    // Looked up by the id `<Page>` assigns to the heading.
    const heading = document.getElementById(titleId);
    if (!heading) {
      // TODO(follow-up): fall back to focusing <Page>'s <main> (raised in
      // review, out of scope for DST-1492. The no-op is intentional and tested).
      return;
    }

    // Headings are not focusable by default.
    heading.tabIndex = -1;
    heading.focus();
  }, [routeKey, titleId]);
};
