import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { useCollapsibleHeaderContext } from './CollapsibleContext';
import { usePanelContext } from './Context';

export interface PanelCollapsibleDescriptionProps {
  children: ReactNode;
}

export const PanelCollapsibleDescription = ({
  children,
}: PanelCollapsibleDescriptionProps) => {
  const { classNames } = usePanelContext();
  const headerCtx = useCollapsibleHeaderContext();

  if (!headerCtx) {
    throw new Error(
      'Panel.CollapsibleDescription must be used within a <Panel.CollapsibleHeader> component.'
    );
  }

  return (
    <span
      ref={headerCtx.descriptionSlotRef}
      id={headerCtx.descriptionId}
      className={cn(classNames.collapsibleDescription)}
    >
      {children}
    </span>
  );
};
