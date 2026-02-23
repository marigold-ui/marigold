import type { ReactNode } from 'react';
import { useListContext } from './Context';

export interface ListItemProps {
  /**
   * Children of the component.
   */
  children?: ReactNode;
}

export const ListItem = ({ children, ...props }: ListItemProps) => {
  const { classNames } = useListContext();

  return (
    <li {...props} className={classNames.item}>
      {children}
    </li>
  );
};
