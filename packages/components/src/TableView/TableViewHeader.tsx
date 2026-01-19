import type RAC from 'react-aria-components';
import {
  Collection,
  Column,
  TableHeader,
  useTableOptions,
} from 'react-aria-components';
import { cn } from '@marigold/system';
import { Checkbox } from '../Checkbox/Checkbox';
import { useTableViewContext } from './Context';

type RemovedProps = 'className' | 'style';

export type TableViewHeaderProps<T extends object = object> = Omit<
  RAC.TableHeaderProps<T>,
  RemovedProps
>;

const TableViewHeader = <T extends object>({
  columns,
  children,
  ...otherProps
}: TableViewHeaderProps<T>) => {
  const { selectionBehavior, selectionMode, allowsDragging } =
    useTableOptions();
  const { classNames } = useTableViewContext();

  return (
    <TableHeader className={cn(classNames.head)} {...otherProps}>
      {/* Add extra columns for drag and drop and selection. */}
      {allowsDragging && <Column className={classNames.column} />}
      {selectionBehavior === 'toggle' && (
        <Column className={classNames.column}>
          {selectionMode === 'multiple' && <Checkbox slot="selection" />}
        </Column>
      )}
      <Collection items={columns}>{children}</Collection>
    </TableHeader>
  );
};

export { TableViewHeader };
