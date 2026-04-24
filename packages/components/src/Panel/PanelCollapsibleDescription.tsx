import type { ReactNode } from 'react';
import { useCollapsibleHeaderContext } from './CollapsibleContext';
import { usePanelContext } from './Context';

export interface PanelCollapsibleDescriptionProps {
  /**
   * Supporting copy shown inside the collapsible header below the title.
   * Rendered as a `<span>` inside the trigger button and linked to it via
   * `aria-describedby` so screen readers announce the extra context after
   * the name.
   */
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
