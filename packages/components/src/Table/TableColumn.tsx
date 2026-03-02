import type { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { Column, Group } from 'react-aria-components';
import { alignment, cn, textAlign } from '@marigold/system';
import { SortAscending } from '../icons/SortAscending';
import { SortDescending } from '../icons/SortDescending';
import { useTableContext } from './Context';

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
type RemovedProps =
  | 'className'
  | 'style'
  | 'children'
  | 'isRowHeader'
  | 'render';

export interface TableColumnProps extends Omit<RAC.ColumnProps, RemovedProps> {
  /**
   * Whether the column is a row header and should be announced by assistive technology during navigation.
   * At least one column needs to be set as row header.
   */
  rowHeader?: RAC.ColumnProps['isRowHeader'];
  /**
   * The column header label.
   */
  children?: ReactNode;
  /**
   * Horizontal text alignment of the column's content.
   * @default 'left'
   */
  alignX?: keyof typeof textAlign;
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
const TableColumn = ({
  alignX = 'left',
  width,
  minWidth,
  rowHeader,
  ...props
}: TableColumnProps) => {
  const { classNames } = useTableContext();

  return (
    <Column
      className={classNames.column}
      width={width}
      // Enforces width to be applied if its static (non-fraction)
      minWidth={ensureWidth(width, minWidth)}
      isRowHeader={rowHeader}
      // @ts-expect-error will be passed down
      alignX={alignX}
      {...props}
    >
      {({ allowsSorting, sortDirection }) => (
        <div
          className={cn(
            'flex items-center gap-1',
            alignment.horizontal.alignmentX[alignX]
          )}
        >
          {allowsSorting && sortDirection != null && (
            <span aria-hidden="true">
              {sortDirection === 'ascending' ? (
                <SortAscending size={14} />
              ) : (
                <SortDescending size={14} />
              )}
            </span>
          )}
          <Group
            className="cursor-default outline-none"
            role="presentation"
            tabIndex={-1}
          >
            {props.children}
          </Group>
        </div>
      )}
    </Column>
  );
};

export { TableColumn };
