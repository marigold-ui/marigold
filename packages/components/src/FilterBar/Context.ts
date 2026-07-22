import { createContext, use } from 'react';

export interface FilterBarContextValue {
  /**
   * Number of quick filters that are currently demoted (not visible in the
   * bar) while their filter is active. Shown as a badge on the panel
   * trigger so hidden state stays communicated.
   */
  demotedActiveCount: number;
}

export const FilterBarContext = createContext<FilterBarContextValue | null>(
  null
);

export const useFilterBarContext = (): FilterBarContextValue => {
  const context = use(FilterBarContext);
  if (!context) {
    throw new Error(
      'FilterBar subcomponents must be used within a <FilterBar>.'
    );
  }
  return context;
};
