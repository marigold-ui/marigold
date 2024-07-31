import type { ReactNode } from 'react';
import { useListContext } from './Context';

export interface ListItemProps {
  children?: ReactNode;
}

export const ListItem = ({ children, ...props }: ListItemProps) => {
  const { classNames } = useListContext();

  return (
    <li {...props} className={classNames}>
      {children}
    </li>
  );
};
