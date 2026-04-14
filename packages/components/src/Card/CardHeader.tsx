import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { useCardContext } from './CardContext';

export interface CardHeaderProps {
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
