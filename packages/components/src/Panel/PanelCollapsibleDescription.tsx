import type { ReactNode } from 'react';
import { useCollapsibleHeaderContext } from './CollapsibleContext';
import { usePanelContext } from './Context';

export interface PanelCollapsibleDescriptionProps {
  /** Supporting copy shown inside the collapsible header. */
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
