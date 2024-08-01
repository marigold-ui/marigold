import { ReactNode } from 'react';
import { ListBoxItem, Text } from 'react-aria-components';
import type RAC from 'react-aria-components';
import { useListBoxContext } from './Context';

export interface ListBoxItemProps
  extends Omit<RAC.ListBoxItemProps, 'style' | 'className'> {
  /**
   * To set a short description below the item.
   */
  description?: ReactNode;
  children?: ReactNode;
}

export const _ListBoxItem = ({
  description,
  children,
  ...props
}: ListBoxItemProps) => {
  const { classNames } = useListBoxContext();

  return (
    <ListBoxItem {...props} className={classNames.option}>
      {children}
    </ListBoxItem>
  );
};

export { _ListBoxItem as ListBoxItem };
