import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { usePanelContext } from './Context';

export interface PanelContentProps {
  /**
   * Main body of the Panel. Inherits the Panel's horizontal padding unless
   * `bleed` is set.
   */
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
    <div
      className={cn(
        // When bled, drop the horizontal padding and publish `--bleed-px` so
        // edge-aware children (Table, Accordion) can inset their own content
        // to stay aligned with the Panel title while backgrounds/dividers
        // reach the Panel border. Non-bled content clears it so an outer bled
        // container's value cannot inherit past it — `initial` is the
        // guaranteed-invalid value, so `var(--bleed-px, …)` falls back.
        bleed
          ? '[--bleed-px:var(--panel-px)]'
          : 'px-(--panel-px) [--bleed-px:initial]',
        classNames.content
      )}
    >
      {children}
    </div>
  );
};
