import type { ReactNode } from 'react';
import { cn, useClassNames } from '@marigold/system';

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
  const classNames = useClassNames({
    component: 'Tray',
  });

  return (
    <div className={cn('[grid-area:actions]', classNames.actions)}>
      {children}
    </div>
  );
};
