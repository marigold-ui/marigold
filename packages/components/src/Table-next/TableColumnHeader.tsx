import React, { useRef } from 'react';

import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { useTableColumnHeader } from '@react-aria/table';
import { mergeProps } from '@react-aria/utils';
import { GridNode } from '@react-types/grid';

import { Box, useStateProps } from '@marigold/system';

import { useTableContext } from './Context';

interface TableColumnHeaderProps {
  column: GridNode<object>;
}

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
      ref={ref}
      __baseCSS={{ fontWeight: 'normal', textAlign: 'center' }}
      css={styles.header}
      {...mergeProps(columnHeaderProps, hoverProps, focusProps)}
      {...stateProps}
    >
      {column.rendered}
    </Box>
  );
};
