import { ListBoxItem } from 'react-aria-components';
import type RAC from 'react-aria-components';
import { useListBoxContext } from './Context';

export interface ListBoxItemProps
  extends Omit<RAC.ListBoxItemProps, 'style' | 'className'> {}

export const _ListBoxItem = ({ ...props }: ListBoxItemProps) => {
  const { classNames } = useListBoxContext();

  return <ListBoxItem {...props} className={classNames.item} />;
};

export { _ListBoxItem as ListBoxItem };
