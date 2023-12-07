import { ListBoxItem } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { useListBoxContext } from './Context';

export interface ItemProps
  extends Omit<RAC.ListBoxItemProps, 'style' | 'className'> {}

export const _Item = (props: ItemProps) => {
  const { classNames } = useListBoxContext();
  return <ListBoxItem {...props} className={classNames.option} />;
};

export { _Item as Item };
