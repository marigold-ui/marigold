import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { useSectionMessageContext } from './Context';

export interface SectionMessageTitleProps {
  /**
   * The children of the component.
   */
  children?: ReactNode;
}

export const SectionMessageTitle = ({ children }: SectionMessageTitleProps) => {
  const { classNames } = useSectionMessageContext();
  return (
    <div className={cn('[grid-area:title]', classNames.title)}>{children}</div>
  );
};
