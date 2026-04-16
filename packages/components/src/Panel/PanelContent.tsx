import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { usePanelContext } from './Context';

export interface PanelContentProps {
  children: ReactNode;
  /**
   * Render the content edge-to-edge horizontally, skipping the Panel's
   * horizontal padding. Vertical padding is preserved to maintain spacing
   * between sections. Useful for tables or media that should span the
   * full width of the Panel.
   * @default false
   */
  bleed?: boolean;
}

export const PanelContent = ({ children, bleed }: PanelContentProps) => {
  const { classNames } = usePanelContext();

  return (
    <div
      className={cn(
        'py-(--panel-py)',
        !bleed && 'px-(--panel-px)',
        classNames.content
      )}
    >
      {children}
    </div>
  );
};
