import { useRef } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { useTableColumnHeader } from '@react-aria/table';
import { mergeProps } from '@react-aria/utils';
import { GridNode } from '@react-types/grid';
import { cn, width as twWidth, useStateProps } from '@marigold/system';
import { SortDown } from '../../icons/SortDown';
import { SortUp } from '../../icons/SortUp';
import { useTableContext } from './Context';
import { ColumnProps } from './Table';

// Props
// ---------------
export interface TableColumnHeaderProps extends Omit<ColumnProps, 'children'> {
  column: GridNode<object>;
}

// Component
// ---------------
export const TableColumnHeader = ({
  column,
  width = 'auto',
  align = 'left',
}: TableColumnHeaderProps) => {
  const ref = useRef(null);
  const { state, classNames } = useTableContext();
  const { columnHeaderProps } = useTableColumnHeader(
    {
      node: column,
    },
    state,
    ref
  );

  const { hoverProps, isHovered } = useHover({});
  const { focusProps, isFocusVisible } = useFocusRing();
  const stateProps = useStateProps({
    hover: isHovered,
    focusVisible: isFocusVisible,
  });
  return (
    <th
      colSpan={column.colspan}
      ref={ref}
      className={cn(
        'whitespace-nowrap data-[react-aria-pressable="true"]:cursor-pointer',
        twWidth[width],
        classNames?.header
      )}
      {...mergeProps(columnHeaderProps, hoverProps, focusProps)}
      {...stateProps}
      align={align}
      data-rac
    >
      {column.rendered}
      {column.props.allowsSorting &&
        (state.sortDescriptor?.column === column.key ? (
          state.sortDescriptor?.direction === 'ascending' ? (
            <SortUp className="inline-block" />
          ) : (
            <SortDown className="inline-block" />
          )
        ) : (
          <span className="hidden">
            <SortDown className="inline-block" />
          </span>
        ))}
    </th>
  );
};
