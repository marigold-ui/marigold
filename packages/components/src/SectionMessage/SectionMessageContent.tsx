import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { useSectionMessageContext } from './Context';

export interface SectionMessageContentProps {
  /**
   * The children of the component.
   */
  children?: ReactNode;
}

export const SectionMessageContent = ({
  children,
}: SectionMessageContentProps) => {
  const { classNames } = useSectionMessageContext();
  return (
    <div className={cn('[grid-area:content]', classNames.content)}>
      {children}
    </div>
  );
};
