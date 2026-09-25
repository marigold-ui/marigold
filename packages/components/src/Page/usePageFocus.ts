import { useEffect, useRef } from 'react';
import { usePageContext } from './Context';

/**
 * Move focus to the top of the page when the route changes, the standard
 * single-page-app technique for announcing a navigation to screen-reader and
 * keyboard users. The target is the page's `<h1>`, or its `<main>` landmark on
 * a page that has none. `<Page>` owns the heading but is router-agnostic, so the
 * caller supplies the route signal.
 *
 * On each change the target is made focusable (`tabIndex={-1}`) and focused.
 * The initial mount is skipped, so the first paint never steals focus. When
 * there is no `<h1>` to find (an `aria-label`-only `<Page>`), the target is the
 * page's `<main>` landmark, which `<Page>` always renders. A `tabIndex` passed
 * to `<Page>` is left as it is.
 *
 * Call it from a component inside `<Page>` that persists across navigations
 * (the layout / shell level): the skip is per-mount, so one that remounts per
 * route never fires. The heading has to be mounted when the effect runs, so a
 * `<Title>` behind a `React.lazy` boundary can still be loading. That route
 * falls back to its `<main>`, which is unnamed unless the page also carries an
 * `aria-label`, so hoist the title above the boundary for lazy routes.
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
 * <Page>
 *   <PageFocus pathname={location.pathname} />
 *   <Outlet />
 * </Page>
 * ```
 */
// TODO(follow-up): a `routeKey` prop on <Page> would remove the null-rendering
// wrapper every consumer writes (raised in review, out of scope for DST-1492).
export const usePageFocus = (routeKey: string) => {
  const { titleId, mainRef } = usePageContext();
  const previousRouteKeyRef = useRef(routeKey);
  const addedTabIndexRef = useRef(false);

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

    const heading = document.getElementById(titleId);
    if (heading) {
      if (addedTabIndexRef.current) {
        mainRef.current?.removeAttribute('tabindex');
        addedTabIndexRef.current = false;
      }
      // Headings are not focusable by default.
      heading.tabIndex = -1;
      heading.focus();
      return;
    }

    const main = mainRef.current;
    if (!main) {
      return;
    }
    if (!main.hasAttribute('tabindex')) {
      main.tabIndex = -1;
      addedTabIndexRef.current = true;
    }
    main.focus();
  }, [routeKey, titleId, mainRef]);
};
