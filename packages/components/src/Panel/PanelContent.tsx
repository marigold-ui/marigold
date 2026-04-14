import type { ReactNode } from 'react';
import type { InsetSpacingTokens } from '@marigold/system';
import { cn, createSpacingVar } from '@marigold/system';
import { usePanelContext } from './Context';

export interface PanelContentProps {
  children: ReactNode;
  /**
   * Inset padding for the content area.
   * Use `'none'` for edge-to-edge content like tables.
   * @default 'square-regular'
   */
  inset?: InsetSpacingTokens;
}

export const PanelContent = ({
  children,
  inset = 'square-regular',
}: PanelContentProps) => {
  const { classNames } = usePanelContext();

  return (
    <div
      className={cn('p-(--inset)', classNames.content)}
      style={createSpacingVar('inset', `${inset}`)}
    >
      {children}
    </div>
  );
};
