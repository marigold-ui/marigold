import React, { useRef } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useTableCell } from '@react-aria/table';
import { mergeProps } from '@react-aria/utils';
import { TableState } from '@react-stately/table';
import { Node } from '@react-types/shared';

import { CSSObject, useStateProps } from '@marigold/system';

import { Box } from '../Box';

// Props
// ----------------------------
export interface TableCellProps {
  item: Node<object>;
  state: TableState<object>;
  css?: CSSObject;
}

// TableCell Component
// ----------------------------
export const TableCell = ({ item: cell, state, css }: TableCellProps) => {
  const cellRef = useRef(null);
  const { gridCellProps } = useTableCell({ node: cell }, state, cellRef);
  const { focusProps, isFocusVisible } = useFocusRing();
  const stateProps = useStateProps({ focus: isFocusVisible });

  return (
    <Box
      as="td"
      ref={cellRef}
      css={css}
      {...mergeProps(gridCellProps, focusProps)}
      {...stateProps}
    >
      {cell.rendered}
    </Box>
  );
};
