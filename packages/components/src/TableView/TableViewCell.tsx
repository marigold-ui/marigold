import type { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { Cell } from 'react-aria-components';
import { cn, textAlign } from '@marigold/system';
import { useTableViewContext } from './Context';

type RemovedProps = 'className' | 'style' | 'children';

export interface TableViewCellProps extends Omit<RAC.CellProps, RemovedProps> {
  children?: ReactNode;
  align?: keyof typeof textAlign;
}

const TableViewCell = ({
  children,
  align = 'left',
  ...props
}: TableViewCellProps) => {
  const { classNames } = useTableViewContext();

  return (
    <Cell className={cn(classNames?.cell, textAlign[align])} {...props}>
      {children}
    </Cell>
  );
};

export { TableViewCell };
