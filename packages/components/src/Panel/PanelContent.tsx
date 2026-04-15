import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { usePanelContext } from './Context';

export interface PanelContentProps {
  children: ReactNode;
}

export const PanelContent = ({ children }: PanelContentProps) => {
  const { classNames } = usePanelContext();

  return (
    <div className={cn('px-(--panel-px) py-(--panel-py)', classNames.content)}>
      {children}
    </div>
  );
};
