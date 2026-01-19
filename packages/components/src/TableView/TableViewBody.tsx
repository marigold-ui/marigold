import type RAC from 'react-aria-components';
import { TableBody } from 'react-aria-components';
import { cn } from '@marigold/system';
import { useTableViewContext } from './Context';

type RemovedProps = 'className' | 'style' | 'renderEmptyState';

export interface TableViewBodyProps<T extends object = object> extends Omit<
  RAC.TableBodyProps<T>,
  RemovedProps
> {
  emptyState?: RAC.TableBodyProps<T>['renderEmptyState'];
}

const TableViewBody = <T extends object = object>({
  emptyState,
  ...props
}: TableViewBodyProps<T>) => {
  const { classNames } = useTableViewContext();
  return (
    <TableBody
      {...props}
      className={cn(classNames?.body)}
      renderEmptyState={emptyState}
    />
  );
};

export { TableViewBody };
