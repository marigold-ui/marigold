import type RAC from 'react-aria-components';
import { Collection } from 'react-aria-components/Collection';
import {
  Column,
  TableHeader as RACTableHeader,
  useTableOptions,
} from 'react-aria-components/Table';
import { cn } from '@marigold/system';
import { Checkbox } from '../Checkbox/Checkbox';
import { useTableContext } from './Context';
import { renderStickyColumn } from './TableStickyCell';

// Keys of the columns injected ahead of the consumer's, so the table can tell them apart.
const dragColumnKey = '__marigold-table-drag';
const selectionColumnKey = '__marigold-table-selection';
const injectedColumnWidth = 36;
export const injectedColumnKeys: ReadonlySet<RAC.Key> = new Set([
  dragColumnKey,
  selectionColumnKey,
]);

// Props
// ---------------
type RemovedProps = 'className' | 'style';

export interface TableHeaderProps<T extends object = object> extends Omit<
  RAC.TableHeaderProps<T>,
  RemovedProps
> {
  /**
   * Makes the header stick to the top of the viewport when scrolling.
   */
  sticky?: boolean;
}

// Component
// ---------------
const TableHeader = <T extends object>({
  sticky,
  columns,
  children,
  ...props
}: TableHeaderProps<T>) => {
  const { selectionBehavior, selectionMode, allowsDragging } =
    useTableOptions();
  const { classNames } = useTableContext();

  return (
    <RACTableHeader
      className={cn(
        classNames.head,
        // Above the sticky cells in the body, which pass under it.
        sticky && 'sticky top-0 z-10'
      )}
      {...props}
    >
      {allowsDragging && (
        <Column
          id={dragColumnKey}
          render={renderStickyColumn}
          className={classNames.column}
          minWidth={injectedColumnWidth}
          width={injectedColumnWidth}
        />
      )}
      {selectionBehavior === 'toggle' && (
        <Column
          id={selectionColumnKey}
          render={renderStickyColumn}
          minWidth={injectedColumnWidth}
          width={injectedColumnWidth}
          className={classNames.column}
        >
          {selectionMode === 'multiple' && <Checkbox slot="selection" />}
        </Column>
      )}
      <Collection items={columns}>{children}</Collection>
    </RACTableHeader>
  );
};

export { TableHeader };
