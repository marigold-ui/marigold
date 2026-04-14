import type { ReactNode } from 'react';
import { Heading } from 'react-aria-components';
import { cn } from '@marigold/system';
import { usePanelContext } from './Context';

export interface PanelTitleProps {
  children: ReactNode;
  /**
   * The heading level (2-6). Defaults to 2.
   * Determines both the rendered heading element and the
   * level used by `Panel.CollapsibleTrigger` (titleLevel + 1).
   */
  level?: 2 | 3 | 4 | 5 | 6;
}

export const PanelTitle = ({ children, level = 2 }: PanelTitleProps) => {
  const { classNames, titleId, titleInfo } = usePanelContext();

  // Shared ref so CollapsibleTrigger can derive its heading level in the same render pass
  titleInfo.current = { hasTitle: true, level };

  return (
    <Heading
      level={level}
      id={titleId}
      className={cn('[grid-area:title]', classNames.title)}
    >
      {children}
    </Heading>
  );
};
