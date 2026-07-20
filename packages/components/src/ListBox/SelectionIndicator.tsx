import type { ReactNode } from 'react';
import { Check } from '../icons/Check';

/**
 * The markup contract behind the ListBox theme's `.selection-indicator`
 * check-visibility selectors (see `ListBox.styles.ts` in theme-rui). Shared
 * by `ListBoxItem` and the calendar's preset rows so every listbox-styled
 * row shows the same check on its selected state.
 */
export const SelectionIndicator = ({ children }: { children: ReactNode }) => (
  <div className="selection-indicator contents">
    <Check size={16} strokeWidth="3" className="hidden" />
    {children}
  </div>
);
