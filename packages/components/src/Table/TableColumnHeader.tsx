import React, { useRef } from 'react';

import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { useTableColumnHeader } from '@react-aria/table';
import { mergeProps } from '@react-aria/utils';
import { GridNode } from '@react-types/grid';

import { useStateProps } from '@marigold/system';

import { tv } from 'tailwind-variants';
import { twMerge } from 'tailwind-merge';

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
  const styledSpan = tv({
    base: ['ps-[0.5ch] text-current', visible ? 'visible' : 'invisible'],
  });

  return (
    <span role="presentation" aria-hidden="true" className={styledSpan()}>
      {direction === 'ascending' ? '▲' : '▼'}
    </span>
  );
};

// Props
// ---------------
interface TableColumnHeaderProps {
  column: GridNode<object>;
}

// Component
// ---------------
export const TableColumnHeader = ({ column }: TableColumnHeaderProps) => {
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

  const styledTableHeader = tv({
    base: ['cursor-default'],
  });
  return (
    <th
      colSpan={column.colspan}
      ref={ref}
      className={twMerge(styledTableHeader(), classNames.header())}
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
