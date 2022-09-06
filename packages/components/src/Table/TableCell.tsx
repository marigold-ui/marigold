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
  const { interactive, state, styles } = useTableContext();
  const disabled = state.disabledKeys.has(cell.parentKey!);
  const { gridCellProps } = useTableCell(
    {
      node: cell,
    },
    state,
    ref
  );

  const cellProps = interactive
    ? gridCellProps
    : {
        /**
         * Override `react-aria` handler so users can select text.
         * Solution from https://github.com/adobe/react-spectrum/issues/2585
         */
        ...gridCellProps,
        onMouseDown: (e: MouseEvent) => e.stopPropagation(),
        onPointerDown: (e: MouseEvent) => e.stopPropagation(),
      };

  const { focusProps, isFocusVisible } = useFocusRing();
  const stateProps = useStateProps({ disabled, focusVisible: isFocusVisible });

  return (
    <Box
      as="td"
      ref={ref}
      css={styles.cell}
      {...mergeProps(cellProps, focusProps)}
      {...stateProps}
    >
      {cell.rendered}
    </Box>
  );
};
