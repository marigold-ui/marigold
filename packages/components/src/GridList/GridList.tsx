import type RAC from 'react-aria-components';
import { GridList } from 'react-aria-components';

import { GridListItem } from './GridListItem';

export interface GridListProps
  extends Omit<RAC.GridListProps<object>, 'className' | 'style'> {}

const _GridList = ({ children, ...props }: GridListProps) => {
  return <GridList {...props}>{children}</GridList>;
};

_GridList.Item = GridListItem;

export { _GridList as GridList };
