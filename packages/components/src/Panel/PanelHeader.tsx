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
        "grid grid-cols-[1fr_auto] [grid-template-areas:'title_actions''description_actions']",
        classNames.header
      )}
    >
      {children}
    </div>
  );
};
