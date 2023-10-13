import { Column } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { GridNode } from '@react-types/grid';

import { SortDown, SortUp } from '@marigold/icons';
import { WidthProp } from '@marigold/system';

type RemovedProps = 'className' | 'width';

export interface TableColumnHeaderProps
  extends Omit<RAC.ColumnProps, RemovedProps>,
    WidthProp {
  column: GridNode<object>;
}

const _TableColumnHeader = ({
  column,
  childColumns,
  width = 'auto',
  ...props
}: TableColumnHeaderProps) => {
  return <Column>{column.rendered}</Column>;
};

export { _TableColumnHeader as TableColumnHeader };
