import type { ReactNode } from 'react';
import { DisclosurePanel } from 'react-aria-components';
import { cn } from '@marigold/system';
import { usePanelContext } from './Context';

export interface PanelCollapsibleContentProps {
  children: ReactNode;
  /**
   * Render the content edge-to-edge horizontally, skipping the Panel's
   * horizontal padding. Vertical padding is preserved to maintain spacing
   * between sections.
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
      className={cn(
        'py-(--panel-py)',
        !bleed && 'px-(--panel-px)',
        classNames.collapsibleContent
      )}
    >
      {children}
    </DisclosurePanel>
  );
};
