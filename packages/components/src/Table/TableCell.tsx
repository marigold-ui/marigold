import { Cell } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { cn } from '@marigold/system';

import { useTableContext } from './Context';

type RemovedProps = 'className';

export interface TableCellProps extends Omit<RAC.CellProps, RemovedProps> {}

const _TableCell = ({ children, ...props }: RAC.CellProps) => {
  const { classNames } = useTableContext();
  return (
    <Cell {...props} className={cn(classNames?.cell)}>
      {children}
    </Cell>
  );
};

export { _TableCell as TableCell };
