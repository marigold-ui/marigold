import type { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { Column, ColumnResizer, Group } from 'react-aria-components';
import { cn, textAlign } from '@marigold/system';
import { SortAscending } from '../icons/SortAscending';
import { SortDescending } from '../icons/SortDescending';
import { useTableViewContext } from './Context';

// Helper
// ---------------
const isStaticWidth = (
  width: RAC.ColumnProps['width']
): width is RAC.ColumnProps['minWidth'] => !`${width}`.endsWith('fr');

const ensureWidth = (
  width: RAC.ColumnProps['width'],
  minWdith: RAC.ColumnProps['minWidth']
) => {
  if (minWdith) return minWdith;
  return isStaticWidth(width) ? width : minWdith;
};

// Props
// ---------------
type RemovedProps = 'className' | 'style' | 'children';

export interface TableViewColumnProps extends Omit<
  RAC.ColumnProps,
  RemovedProps
> {
  children?: ReactNode;
  allowsResizing?: boolean;
  /* Text alignment of the column's content. */
  align?: keyof typeof textAlign;
  /** The width of the column. */
  width?: RAC.ColumnProps['width'];
  /** The default width of the column. */
  defaultWidth?: RAC.ColumnProps['defaultWidth'];
  /** The minimum width of the column. */
  minWidth?: RAC.ColumnProps['minWidth'];
  /** The maximum width of the column. */
  maxWidth?: RAC.ColumnProps['maxWidth'];
}

// Component
// ---------------
const TableViewColumn = ({
  align = 'left',
  width,
  minWidth,
  ...props
}: TableViewColumnProps) => {
  const { classNames } = useTableViewContext();

  return (
    <Column
      className={cn(classNames.column, textAlign[align])}
      width={width}
      // Enforces width to be applied if its static (non-fraction)
      minWidth={ensureWidth(width, minWidth)}
      {...props}
    >
      {({ allowsSorting, sortDirection }) => (
        <div className="flex items-center gap-1">
          {allowsSorting && sortDirection != null && (
            <span aria-hidden="true">
              {sortDirection === 'ascending' ? (
                <SortAscending size={14} />
              ) : (
                <SortDescending size={14} />
              )}
            </span>
          )}
          <Group role="presentation" tabIndex={-1}>
            {props.children}
          </Group>
          {props.allowsResizing && <ColumnResizer />}
        </div>
      )}
    </Column>
  );
};

export { TableViewColumn };
