import type { ReactNode } from 'react';
import { useCollapsibleHeaderContext } from './CollapsibleContext';
import { usePanelContext } from './Context';

export interface PanelCollapsibleTitleProps {
  /**
   * Title of the collapsible section. Rendered as a `<span>` inside the
   * trigger button so the entire header is a single click target. Provides
   * the button's accessible name via `aria-labelledby`.
   */
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
