import type { ReactNode } from 'react';
import { cn, useClassNames } from '@marigold/system';

export interface DialogActions {
  /**
   * Children of the component.
   */
  children?: ReactNode;
  variant?: string;
  size?: string;
}

export const DialogActions = ({ variant, size, children }: DialogActions) => {
  const classNames = useClassNames({ component: 'Dialog', variant, size });
  return (
    <div className={cn('[grid-area:actions]', classNames.actions)}>
      {children}
    </div>
  );
};
