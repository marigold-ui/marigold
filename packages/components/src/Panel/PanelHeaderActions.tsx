import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { usePanelContext } from './Context';

export interface PanelHeaderActionsProps {
  children: ReactNode;
}

export const PanelHeaderActions = ({ children }: PanelHeaderActionsProps) => {
  const { classNames } = usePanelContext();

  return (
    <div className={cn('self-center [grid-area:actions]', classNames.actions)}>
      {children}
    </div>
  );
};
