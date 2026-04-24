import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { usePanelContext } from './Context';

export interface PanelDescriptionProps {
  /** Supporting copy shown beneath the `Panel.Title`. */
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
