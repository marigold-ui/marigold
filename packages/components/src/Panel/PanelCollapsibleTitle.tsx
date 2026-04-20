import type { ReactNode } from 'react';
import { useCollapsibleHeaderContext } from './CollapsibleContext';
import { usePanelContext } from './Context';

export interface PanelCollapsibleTitleProps {
  /** Title text of the collapsible section. */
  children: ReactNode;
}

export const PanelCollapsibleTitle = ({
  children,
}: PanelCollapsibleTitleProps) => {
  const { classNames } = usePanelContext();
  const { titleId } = useCollapsibleHeaderContext();

  return (
    <span id={titleId} className={classNames.collapsibleTitle}>
      {children}
    </span>
  );
};
