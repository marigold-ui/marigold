import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { usePanelContext } from './Context';

export interface PanelContentProps {
  /** Main body of the panel. */
  children: ReactNode;
  /**
   * Render the content edge-to-edge horizontally, skipping the Panel's
   * horizontal padding. Useful for tables or media that should span the
   * full width of the Panel.
   * @default false
   */
  bleed?: boolean;
}

export const PanelContent = ({ children, bleed }: PanelContentProps) => {
  const { classNames } = usePanelContext();

  return (
    <div className={cn(!bleed && 'px-(--panel-px)', classNames.content)}>
      {children}
    </div>
  );
};
