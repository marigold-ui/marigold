import React, { ReactNode, useRef } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { useTableRow } from '@react-aria/table';
import { mergeProps } from '@react-aria/utils';
import { GridNode } from '@react-types/grid';

import { Box, useStateProps } from '@marigold/system';

import { useTableContext } from './Context';

// Props
// ---------------
export interface TableRowProps {
  children?: ReactNode;
  interactive?: boolean;
  row: GridNode<object>;
}

// Component
// ---------------
export const TableRow = ({ children, interactive, row }: TableRowProps) => {
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
  const { hoverProps, isHovered } = useHover({
    isDisabled: disabled || !interactive,
  });

  const stateProps = useStateProps({
    disabled,
    selected,
    hover: isHovered,
    focusVisible: isFocusVisible,
    active: isPressed,
  });

  return (
    <Box
      as="tr"
      ref={ref}
      __baseCSS={{
        cursor: !interactive ? 'text' : disabled ? 'default' : 'pointer',
      }}
      css={styles.row}
      {...mergeProps(rowProps, focusProps, hoverProps)}
      {...stateProps}
    >
      {children}
    </Box>
  );
};
