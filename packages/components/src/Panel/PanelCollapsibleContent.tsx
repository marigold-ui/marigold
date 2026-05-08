import type { ReactNode } from 'react';
import { DisclosurePanel } from 'react-aria-components';
import { cn } from '@marigold/system';
import { usePanelContext } from './Context';

export interface PanelCollapsibleContentProps {
  /** Body revealed when the collapsible section is expanded. */
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
    <DisclosurePanel className={classNames.collapsibleContent}>
      <div
        className={cn(
          !bleed && 'px-(--panel-px)',
          'pt-(--panel-py) pb-(--panel-py)'
        )}
      >
        {children}
      </div>
    </DisclosurePanel>
  );
};
