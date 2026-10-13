import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { useTrayContext } from './Context';

// Props
// ---------------
export interface TrayActionsProps {
  /**
   * Children of the component.
   */
  children?: ReactNode;
}

// Component
// ---------------
export const TrayActions = ({ children }: TrayActionsProps) => {
  const { classNames } = useTrayContext();

  return (
    <div
      data-slot="actions"
      className={cn(
        'touch-none select-none [grid-area:actions]',
        classNames.actions
      )}
    >
      {children}
    </div>
  );
};
