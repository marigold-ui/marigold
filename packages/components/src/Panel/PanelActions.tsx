import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { usePanelContext } from './Context';

export interface PanelActionsProps {
  children: ReactNode;
}

export const PanelActions = ({ children }: PanelActionsProps) => {
  const { classNames } = usePanelContext();

  return (
    <div className={cn('self-center [grid-area:actions]', classNames.actions)}>
      {children}
    </div>
  );
};
