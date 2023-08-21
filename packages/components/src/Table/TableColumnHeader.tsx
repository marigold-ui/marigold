import { useRef } from 'react';

import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { useTableColumnHeader } from '@react-aria/table';
import { mergeProps } from '@react-aria/utils';

import { GridNode } from '@react-types/grid';

import { cn, useStateProps } from '@marigold/system';
import { WidthProp, width as twWidth } from '@marigold/system';

import { useTableContext } from './Context';

// Sort Icon
// ---------------
interface SortIndicatorProps {
  direction?: 'ascending' | 'descending';
  visible: boolean;
}

const SortIndicator = ({
  direction = 'ascending',
  visible,
}: SortIndicatorProps) => {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn(
        'ps-[0.5ch] text-current',
        visible ? 'visible' : 'invisible'
      )}
    >
      {direction === 'ascending' ? '▲' : '▼'}
    </span>
  );
};

// Props
// ---------------
interface TableColumnHeaderProps extends WidthProp {
  column: GridNode<object>;
}

// Component
// ---------------
export const TableColumnHeader = ({
  column,
  width = 'auto',
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
      className={cn('cursor-default', twWidth[width], classNames?.header)}
      {...mergeProps(columnHeaderProps, hoverProps, focusProps)}
      {...stateProps}
    >
      {column.rendered}
      {column.props.allowsSorting && (
        <SortIndicator
          direction={state.sortDescriptor?.direction}
          visible={state.sortDescriptor?.column === column.key}
        />
      )}
    </th>
  );
};
