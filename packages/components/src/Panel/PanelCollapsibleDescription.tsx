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
  const { descriptionId, descriptionSlotRef } = useCollapsibleHeaderContext();

  return (
    <span
      ref={descriptionSlotRef}
      id={descriptionId}
      className={classNames.collapsibleDescription}
    >
      {children}
    </span>
  );
};
