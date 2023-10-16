import { Table } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { cn, useClassNames } from '@marigold/system';

import { TableContext } from './Context';
import { TableHeader } from './TableHeader';

type RemovedProps = 'className';
export interface TableProps extends Omit<RAC.TableProps, RemovedProps> {
  variant?: string;
  size?: string;
  stretch?: boolean;
}

const _Table = ({ children, variant, size, stretch, ...props }: TableProps) => {
  const classNames = useClassNames({
    component: 'Table',
    variant,
    size,
  });

  return (
    <TableContext.Provider value={{ classNames, variant, size }}>
      <Table
        {...props}
        className={cn(
          'group/table',
          'border-collapse overflow-auto whitespace-nowrap',
          stretch ? 'table w-full' : 'block',
          classNames.table
        )}
      >
        {children}
      </Table>
    </TableContext.Provider>
  );
};

export { _Table as Table };
