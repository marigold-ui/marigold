import type RAC from 'react-aria-components';
import { ListBoxItem } from 'react-aria-components';
import { useListBoxContext } from './Context';

export type ListBoxItemProps = Omit<
  RAC.ListBoxItemProps,
  'style' | 'className'
>;

export const _ListBoxItem = ({ ...props }: ListBoxItemProps) => {
  const { classNames } = useListBoxContext();

  return <ListBoxItem {...props} className={classNames.item} />;
};

export { _ListBoxItem as ListBoxItem };
