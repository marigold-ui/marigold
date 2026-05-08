import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { useCardContext } from './CardContext';

export interface CardHeaderProps {
  /** Content rendered inside the card header, typically a title and supporting labels. */
  children?: ReactNode;
}

export const CardHeader = ({ children }: CardHeaderProps) => {
  const { classNames } = useCardContext();
  return (
    <div className={cn('[grid-area:header]', classNames.header)}>
      {children}
    </div>
  );
};
