import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { useCollapsibleHeaderContext } from './CollapsibleContext';
import { usePanelContext } from './Context';

export interface PanelCollapsibleTitleProps {
  children: ReactNode;
}

export const PanelCollapsibleTitle = ({
  children,
}: PanelCollapsibleTitleProps) => {
  const { classNames } = usePanelContext();
  const headerCtx = useCollapsibleHeaderContext();

  if (!headerCtx) {
    throw new Error(
      'Panel.CollapsibleTitle must be used within a <Panel.CollapsibleHeader> component.'
    );
  }

  return (
    <span id={headerCtx.titleId} className={cn(classNames.collapsibleTitle)}>
      {children}
    </span>
  );
};
