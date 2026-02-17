import type RAC from 'react-aria-components';
import { TableBody as RACTableBody } from 'react-aria-components';
import { cn } from '@marigold/system';
import { useTableContext } from './Context';

type RemovedProps = 'className' | 'style' | 'renderEmptyState';

export interface TableBodyProps<T extends object = object> extends Omit<
  RAC.TableBodyProps<T>,
  RemovedProps
> {
  /**
   * Render function called when the table body has no items to display.
   */
  emptyState?: RAC.TableBodyProps<T>['renderEmptyState'];
}

const TableBody = <T extends object = object>({
  emptyState,
  ...props
}: TableBodyProps<T>) => {
  const { classNames } = useTableContext();
  return (
    <RACTableBody
      {...props}
      className={cn(classNames.body)}
      renderEmptyState={emptyState}
    />
  );
};

export { TableBody };
