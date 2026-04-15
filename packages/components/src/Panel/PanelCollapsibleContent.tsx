import type { ReactNode } from 'react';
import { DisclosurePanel } from 'react-aria-components';
import { cn } from '@marigold/system';
import { usePanelContext } from './Context';

export interface PanelCollapsibleContentProps {
  children: ReactNode;
}

export const PanelCollapsibleContent = ({
  children,
}: PanelCollapsibleContentProps) => {
  const { classNames } = usePanelContext();

  return (
    <DisclosurePanel
      className={cn(
        'px-(--panel-px) py-(--panel-py)',
        classNames.collapsibleContent
      )}
    >
      {children}
    </DisclosurePanel>
  );
};
