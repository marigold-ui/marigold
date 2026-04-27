import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { usePanelContext } from './Context';

export interface PanelHeaderProps {
  /**
   * Content of the header. Typically a `Panel.Title`, optional
   * `Panel.Description`, and optional `Panel.HeaderActions`.
   */
  children: ReactNode;
}

export const PanelHeader = ({ children }: PanelHeaderProps) => {
  const { classNames } = usePanelContext();

  return (
    <div
      data-panel-header
      className={cn(
        "grid grid-cols-[1fr_auto] [grid-template-areas:'title_actions'_'description_actions']",
        'px-(--panel-px)',
        classNames.header
      )}
    >
      {children}
    </div>
  );
};
