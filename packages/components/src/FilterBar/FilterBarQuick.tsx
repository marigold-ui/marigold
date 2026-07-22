import type { ReactNode } from 'react';

// Props
// ---------------
export interface FilterBarQuickProps {
  /**
   * Whether the quick filter currently holds a value. Used for the badge on
   * the panel trigger: when an active quick filter is demoted, the badge
   * counts it so the hidden state stays visible.
   * @default false
   */
  active?: boolean;

  /**
   * The compact filter control, e.g. a `<Select>`. Bind it to the same
   * state as its counterpart in the panel: the panel is canonical, the
   * quick filter is a shortcut, so demotion never loses a value.
   */
  children: ReactNode;
}

// Component
// ---------------

/**
 * Slot component: `<FilterBar>` reads its children in order (highest
 * priority first) and renders each into the measured region. The last
 * quick filters demote first when the bar runs out of space.
 */
export const FilterBarQuick = ({ children }: FilterBarQuickProps) => (
  <>{children}</>
);
