import type { ReactNode } from 'react';

// Props
// ---------------
export interface FilterBarSearchProps {
  /**
   * The search control, e.g. a `<SearchField>`. Rendered pinned at the
   * start of the bar: it stays visible no matter how narrow the bar gets.
   */
  children: ReactNode;
}

// Component
// ---------------

/**
 * Slot component: `<FilterBar>` reads it from its children and renders the
 * content outside the demotable region, so it never gets hidden.
 */
export const FilterBarSearch = ({ children }: FilterBarSearchProps) => (
  <>{children}</>
);
