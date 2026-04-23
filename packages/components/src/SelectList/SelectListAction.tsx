import { ReactNode } from 'react';
import { cn } from '@marigold/system';
import { useSelectListContext } from './Context';

interface SelectListActionProps {
  children: ReactNode;
}

export const SelectListAction = ({ children }: SelectListActionProps) => {
  const { classNames } = useSelectListContext();
  return <div className={cn('order-last', classNames?.action)}>{children}</div>;
};
