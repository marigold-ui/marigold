import type { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { useCardContext } from './CardContext';

export interface CardBodyProps {
  children?: ReactNode;
}

export const CardBody = ({ children }: CardBodyProps) => {
  const { classNames } = useCardContext();
  return (
    <div className={cn('[grid-area:body]', classNames.body)}>{children}</div>
  );
};
