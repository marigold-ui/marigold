import type { ReactNode } from 'react';
import { Heading } from 'react-aria-components';
import { cn } from '@marigold/system';
import { usePanelContext } from './Context';

export interface PanelTitleProps {
  /**
   * Title of the Panel. Rendered as a heading at the `headingLevel`
   * configured on the root `Panel` (defaults to `h2`) and provides the
   * Panel's accessible name via `aria-labelledby`.
   */
  children: ReactNode;
}

export const PanelTitle = ({ children }: PanelTitleProps) => {
  const { classNames, titleId, headingLevel, titleSlotRef } = usePanelContext();

  return (
    <Heading
      ref={titleSlotRef}
      level={headingLevel}
      id={titleId}
      className={cn(
        '[grid-area:title]',
        'not-in-data-panel-header:px-(--panel-px)',
        classNames.title
      )}
    >
      {children}
    </Heading>
  );
};
