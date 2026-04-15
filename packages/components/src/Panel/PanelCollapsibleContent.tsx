import type { ReactNode } from 'react';
import { DisclosurePanel } from 'react-aria-components';
import { cn } from '@marigold/system';
import { usePanelContext } from './Context';

export interface PanelCollapsibleContentProps {
  children: ReactNode;
  /**
   * Render the content edge-to-edge, skipping the Panel's horizontal and
   * vertical padding.
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
        !bleed && 'px-(--panel-px) py-(--panel-py)',
        classNames.collapsibleContent
      )}
    >
      {children}
    </DisclosurePanel>
  );
};
