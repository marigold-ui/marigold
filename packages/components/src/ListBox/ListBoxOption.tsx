import { Key } from 'react';
import { ListBoxItem } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { useListBoxContext } from './Context';

export interface ItemProps extends Omit<RAC.ListBoxItemProps, 'id'> {
  key?: Key;
}

export const _Item = ({ key, ...rest }: ItemProps) => {
  const props: RAC.ListBoxItemProps = {
    id: key,
    ...rest,
  };
  const { classNames } = useListBoxContext();
  return <ListBoxItem {...props} className={classNames.option} />;
};

export { _Item as Item };
