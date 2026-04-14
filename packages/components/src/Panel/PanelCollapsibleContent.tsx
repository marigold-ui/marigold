import type { ReactNode } from 'react';
import { DisclosurePanel } from 'react-aria-components';
import type { InsetSpacingTokens } from '@marigold/system';
import { cn, createSpacingVar } from '@marigold/system';
import { usePanelContext } from './Context';

export interface PanelCollapsibleContentProps {
  children: ReactNode;
  /**
   * Inset padding for the collapsible content area.
   * Use `'none'` for edge-to-edge content like tables.
   * @default 'square-regular'
   */
  inset?: InsetSpacingTokens;
}

export const PanelCollapsibleContent = ({
  children,
  inset = 'square-regular',
}: PanelCollapsibleContentProps) => {
  const { classNames } = usePanelContext();

  return (
    <DisclosurePanel
      className={cn('p-(--inset)', classNames.collapsibleContent)}
      style={createSpacingVar('inset', `${inset}`)}
    >
      {children}
    </DisclosurePanel>
  );
};
