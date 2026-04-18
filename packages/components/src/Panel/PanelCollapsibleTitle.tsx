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
  const { titleId } = useCollapsibleHeaderContext();

  return (
    <span id={titleId} className={cn(classNames.collapsibleTitle)}>
      {children}
    </span>
  );
};
