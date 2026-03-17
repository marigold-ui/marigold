import type { ReactNode } from 'react';
import { useClassNames } from '@marigold/system';
import { ListContext } from './Context';
import { ListItem } from './ListItem';

export interface ListProps {
  variant?: string;
  size?: string;
  /**
   * Displaying a unordered or ordered list for showing Information.
   * @default 'ul'
   */
  as?: 'ul' | 'ol';
  /**
   * The children of the component.
   */
  children?: ReactNode;
}

export const List = ({
  as = 'ul',
  children,
  variant,
  size,
  ...props
}: ListProps) => {
  const Component = as;
  const classNames = useClassNames({ component: 'List', variant, size });

  return (
    <Component {...props} className={classNames[as]}>
      <ListContext.Provider value={{ classNames }}>
        {children}
      </ListContext.Provider>
    </Component>
  );
};

List.Item = ListItem;
