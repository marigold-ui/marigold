import { ListBoxItem } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { useListBoxContext } from './Context';

export interface ListboxItemProps
  extends Omit<RAC.ListBoxItemProps, 'style' | 'className'> {}

export const _ListboxItem = (props: ListboxItemProps) => {
  const { classNames } = useListBoxContext();
  return <ListBoxItem {...props} className={classNames.option} />;
};

export { _ListboxItem as ListboxItem };
