import { useRef } from 'react';

import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { useTableColumnHeader } from '@react-aria/table';
import { mergeProps } from '@react-aria/utils';

import { GridNode } from '@react-types/grid';

import { SortDown, SortUp } from '@marigold/icons';
import { cn, useStateProps } from '@marigold/system';
import { WidthProp, width as twWidth } from '@marigold/system';

import { useTableContext } from './Context';

// Sort Icon
// ---------------

// Props
// ---------------
interface TableColumnHeaderProps extends WidthProp {
  align?: Exclude<JSX.IntrinsicElements['td']['align'], 'char'>;
  column: GridNode<object>;
  equalDigitWidth?: boolean;
}

// Component
// ---------------
export const TableColumnHeader = ({
  column,
  width = 'auto',
  align,
  equalDigitWidth,
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
        'cursor-default',
        { 'tabular-nums': equalDigitWidth },
        twWidth[width],
        classNames?.header,
        align ? `text-${align}` : ''
      )}
      {...mergeProps(columnHeaderProps, hoverProps, focusProps)}
      {...stateProps}
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
          <SortDown className="inline-block" />
        ))}
    </th>
  );
};
