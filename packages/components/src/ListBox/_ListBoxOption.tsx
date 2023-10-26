import { Key } from 'react';
import { Item } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { useListBoxContext } from './Context';

export interface ItemProps extends Omit<RAC.ItemProps, 'id'> {
  key?: Key;
}

export const _Item = ({ key, ...rest }: ItemProps) => {
  const props: RAC.ItemProps = {
    id: key,
    ...rest,
  };
  const { classNames } = useListBoxContext();
  return <Item {...props} className={classNames.option} />;
};

export { _Item as Item };
