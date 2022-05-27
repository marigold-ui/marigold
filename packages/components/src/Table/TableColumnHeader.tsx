import React, { useRef } from 'react';

import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { useTableColumnHeader } from '@react-aria/table';
import { mergeProps } from '@react-aria/utils';
import { GridNode } from '@react-types/grid';

import { Box, useStateProps } from '@marigold/system';

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
}: SortIndicatorProps) => (
  <Box
    aria-hidden="true"
    css={{
      color: 'currentColor',
      transform: `rotate(${direction === 'ascending' ? 0 : 180}deg)`,
      visibility: visible ? 'visible' : 'hidden',
    }}
  >
    ▲
  </Box>
);

// Props
// ---------------
interface TableColumnHeaderProps {
  column: GridNode<object>;
}

// Component
// ---------------
export const TableColumnHeader = ({ column }: TableColumnHeaderProps) => {
  const ref = useRef(null);
  const { state, styles } = useTableContext();
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
    <Box
      as="th"
      colSpan={column.colspan}
      ref={ref}
      css={styles.header}
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
    </Box>
  );
};
