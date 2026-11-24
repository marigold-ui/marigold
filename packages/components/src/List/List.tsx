import type { ReactNode } from 'react';
import { useClassNames } from '@marigold/system';
import { ListContext } from './Context';
import { ListItem } from './ListItem';

export interface ListProps {
  /**
   * Visual variant of the component. Which values exist is defined by the theme
   * and listed in the "Appearance" section of the component's documentation.
   */
  variant?: string;
  /**
   * Size of the component. Which values exist is defined by the theme and listed
   * in the "Appearance" section of the component's documentation.
   */
  size?: string;
  /**
   * Displaying a unordered or ordered list for showing Information.
   * @default 'ul'
   */
  as?: 'ul' | 'ol';
  /**
   * Children of the component.
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
      <ListContext value={{ classNames }}>{children}</ListContext>
    </Component>
  );
};

List.Item = ListItem;
