import type { ReactNode } from 'react';
import { DisclosurePanel } from 'react-aria-components';
import { cn } from '@marigold/system';
import { usePanelContext } from './Context';

export interface PanelCollapsibleContentProps {
  children: ReactNode;
  /**
   * Render the content edge-to-edge horizontally, skipping the Panel's
   * horizontal padding. Useful for tables or media that should span the
   * full width of the Panel.
   * @default false
   */
  bleed?: boolean;
}

export const PanelCollapsibleContent = ({
  children,
  bleed,
}: PanelCollapsibleContentProps) => {
  const { classNames } = usePanelContext();

  return (
    <DisclosurePanel
      className={cn(!bleed && 'px-(--panel-px)', classNames.collapsibleContent)}
    >
      {children}
    </DisclosurePanel>
  );
};
