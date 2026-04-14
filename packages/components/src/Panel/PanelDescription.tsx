import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { usePanelContext } from './Context';

export interface PanelDescriptionProps {
  children: ReactNode;
}

export const PanelDescription = ({ children }: PanelDescriptionProps) => {
  const { classNames } = usePanelContext();

  return (
    <p className={cn('[grid-area:description]', classNames.description)}>
      {children}
    </p>
  );
};
