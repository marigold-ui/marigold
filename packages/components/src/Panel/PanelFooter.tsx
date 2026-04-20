import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { usePanelContext } from './Context';

export interface PanelFooterProps {
  /** Content of the footer. Typically one or more actions. */
  children: ReactNode;
}

export const PanelFooter = ({ children }: PanelFooterProps) => {
  const { classNames } = usePanelContext();

  return (
    <div className={cn('px-(--panel-px)', classNames.footer)}>{children}</div>
  );
};
