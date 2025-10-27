import type { ReactNode } from 'react';
import { useClassNames } from '@marigold/system';

export interface SelectListLabelProps {
  children: ReactNode;
}

export const SelectListLabel = ({ children }: SelectListLabelProps) => {
  const classNames = useClassNames({ component: 'SelectList' });
  return <div className={classNames.label}>{children}</div>;
};
