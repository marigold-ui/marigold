import type { ReactNode } from 'react';
import { Heading } from 'react-aria-components';
import { cn } from '@marigold/system';
import { usePanelContext } from './Context';

export interface PanelTitleProps {
  /** Title text for the panel. */
  children: ReactNode;
}

export const PanelTitle = ({ children }: PanelTitleProps) => {
  const { classNames, titleId, headingLevel, titleSlotRef } = usePanelContext();

  return (
    <Heading
      ref={titleSlotRef}
      level={headingLevel}
      id={titleId}
      className={cn('[grid-area:title]', classNames.title)}
    >
      {children}
    </Heading>
  );
};
