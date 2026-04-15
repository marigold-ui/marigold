import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { usePanelContext } from './Context';

export interface PanelContentProps {
  children: ReactNode;
  /**
   * Render the content edge-to-edge, skipping the Panel's horizontal and
   * vertical padding. Useful for tables or media that should touch the Panel's
   * borders while the Header and Footer keep their gutters.
   * @default false
   */
  bleed?: boolean;
}

export const PanelContent = ({ children, bleed }: PanelContentProps) => {
  const { classNames } = usePanelContext();

  return (
    <div
      className={cn(
        !bleed && 'px-(--panel-px) py-(--panel-py)',
        classNames.content
      )}
    >
      {children}
    </div>
  );
};
