import React, { useRef } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { useTableRow } from '@react-aria/table';
import { mergeProps } from '@react-aria/utils';
import { Box, useStateProps } from '@marigold/system';
import { useTableContext } from './Context';
// Component
// ---------------
export const TableRow = ({ children, row }) => {
  const ref = useRef(null);
  const { state, styles } = useTableContext();
  const { rowProps, isPressed } = useTableRow(
    {
      node: row,
    },
    state,
    ref
  );
  const disabled = state.disabledKeys.has(row.key);
  const selected = state.selectionManager.isSelected(row.key);
  // Rows are focused if any cell inside it is focused
  const { focusProps, isFocusVisible } = useFocusRing({ within: true });
  const { hoverProps, isHovered } = useHover({ isDisabled: disabled });
  const stateProps = useStateProps({
    disabled,
    selected,
    hover: isHovered,
    focusVisible: isFocusVisible,
    active: isPressed,
  });
  return React.createElement(
    Box,
    {
      as: 'tr',
      ref: ref,
      css: styles.row,
      ...mergeProps(rowProps, focusProps, hoverProps),
      ...stateProps,
    },
    children
  );
};
//# sourceMappingURL=TableRow.js.map
