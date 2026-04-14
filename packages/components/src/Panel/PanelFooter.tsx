import type { ReactNode } from 'react';
import { usePanelContext } from './Context';

export interface PanelFooterProps {
  children: ReactNode;
}

export const PanelFooter = ({ children }: PanelFooterProps) => {
  const { classNames } = usePanelContext();

  return <div className={classNames.footer}>{children}</div>;
};
