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
  const { classNames, overflow = 'wrap' } = useTableViewContext();

  return (
    <Cell
      className={cn(
        classNames.cell,
        textAlign[align],
        overflow === 'truncate' ? 'max-w-0 truncate' : 'wrap-break-word'
      )}
      {...props}
    >
      {children}
    </Cell>
  );
};

export { TableViewCell };
