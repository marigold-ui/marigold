import { Item } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { useListBoxContext } from './Context';

export interface ItemProps extends RAC.ItemProps {}

export const _Item = (props: ItemProps) => {
  const { classNames } = useListBoxContext();
  return <Item {...props} className={classNames.option} />;
};

export { _Item as Item };
