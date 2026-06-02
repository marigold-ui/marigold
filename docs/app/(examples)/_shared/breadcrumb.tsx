'use client';

import { createContext, use, useEffect } from 'react';

/**
 * Lets a drill-in page (e.g. a member detail at `/examples/users/[id]`) feed its
 * own trailing breadcrumb label up to the shared `ShellLayout`. The shell derives
 * the rest of the trail from the sidebar nav config; the label for a dynamic
 * segment can only be known by the page itself, so it is published through this
 * context.
 */
export const PageBreadcrumbContext = createContext<{
  setLabel: (label?: string) => void;
}>({ setLabel: () => {} });

/**
 * Register a trailing breadcrumb label for the current page. The label is set on
 * mount and cleared on unmount, so navigating away from a detail page restores
 * the nav-derived trail.
 */
export const usePageBreadcrumb = (label?: string) => {
  const { setLabel } = use(PageBreadcrumbContext);
  useEffect(() => {
    setLabel(label);
    return () => setLabel(undefined);
  }, [label, setLabel]);
};
