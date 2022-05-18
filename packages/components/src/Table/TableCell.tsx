import React, { useRef } from 'react';
import { useTableCell } from '@react-aria/table';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { GridNode } from '@react-types/grid';

import { Box, useStateProps } from '@marigold/system';

import { useTableContext } from './Context';

export interface TableCellProps {
  cell: GridNode<object>;
}

export const TableCell = ({ cell }: TableCellProps) => {
  const ref = useRef(null);
  const { state, styles } = useTableContext();
  const disabled = state.disabledKeys.has(cell.parentKey!);
  const { gridCellProps } = useTableCell(
    {
      node: cell,
    },
    state,
    ref
  );

  const { focusProps, isFocusVisible } = useFocusRing();
  const stateProps = useStateProps({ disabled, focusVisible: isFocusVisible });

  return (
    <Box
      as="td"
      ref={ref}
      css={styles.cell}
      {...mergeProps(gridCellProps, focusProps)}
      {...stateProps}
    >
      {cell.rendered}
    </Box>
  );
};
