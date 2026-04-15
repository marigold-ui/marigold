import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { usePanelContext } from './Context';

export interface PanelHeaderProps {
  children: ReactNode;
}

export const PanelHeader = ({ children }: PanelHeaderProps) => {
  const { classNames } = usePanelContext();

  return (
    <div
      className={cn(
        "grid grid-cols-[1fr_auto] [grid-template-areas:'title_actions'_'description_actions']",
        'px-(--panel-px) py-(--panel-py)',
        classNames.header
      )}
    >
      {children}
    </div>
  );
};
