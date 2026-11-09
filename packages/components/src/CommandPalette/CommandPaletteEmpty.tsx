import type { ReactNode } from 'react';
import { useCommandPaletteEmptyState, useEmptyStatePortal } from './Context';

// Props
// ---------------
export interface CommandPaletteEmptyProps {
  /**
   * Content shown when nothing matches the query.
   */
  children: ReactNode;
}

// Component
// ---------------
// Place inside `CommandPalette.Content`, next to the list. It renders into the
// list's empty state, so it only shows when nothing matches.
export const CommandPaletteEmpty = ({ children }: CommandPaletteEmptyProps) => {
  const { loading } = useCommandPaletteEmptyState();
  return useEmptyStatePortal('empty', children, loading);
};
