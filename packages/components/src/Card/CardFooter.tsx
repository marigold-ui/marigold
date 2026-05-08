import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { useCardContext } from './CardContext';

export interface CardFooterProps {
  /** Content rendered in the card footer, typically actions like buttons or metadata. */
  children?: ReactNode;
}

export const CardFooter = ({ children }: CardFooterProps) => {
  const { classNames } = useCardContext();
  return (
    <div className={cn('[grid-area:footer]', classNames.footer)}>
      {children}
    </div>
  );
};
