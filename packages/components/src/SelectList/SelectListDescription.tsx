import type { ReactNode } from 'react';
import { useClassNames } from '@marigold/system';

export interface SelectListDescriptionProps {
  children: ReactNode;
}

export const SelectListDescription = ({
  children,
}: SelectListDescriptionProps) => {
  const classNames = useClassNames({ component: 'SelectList' });
  return <div className={classNames.description}>{children}</div>;
};
