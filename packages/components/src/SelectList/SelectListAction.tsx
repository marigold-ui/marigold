import type { ReactNode } from 'react';
import { useClassNames } from '@marigold/system';

export interface SelectListActionProps {
  children: ReactNode;
}

export const SelectListAction = ({ children }: SelectListActionProps) => {
  const classNames = useClassNames({ component: 'SelectList' });
  return <div className={classNames.action}>{children}</div>;
};
