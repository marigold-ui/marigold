import React, { useRef } from 'react';
import { useTableCell } from '@react-aria/table';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { Box, useStateProps } from '@marigold/system';
import { useTableContext } from './Context';
export const TableCell = ({ cell }) => {
  const ref = useRef(null);
  const { state, styles } = useTableContext();
  const disabled = state.disabledKeys.has(cell.parentKey);
  const { gridCellProps } = useTableCell(
    {
      node: cell,
    },
    state,
    ref
  );
  const { focusProps, isFocusVisible } = useFocusRing();
  const stateProps = useStateProps({ disabled, focusVisible: isFocusVisible });
  return React.createElement(
    Box,
    {
      as: 'td',
      ref: ref,
      css: styles.cell,
      ...mergeProps(gridCellProps, focusProps),
      ...stateProps,
    },
    cell.rendered
  );
};
//# sourceMappingURL=TableCell.js.map
