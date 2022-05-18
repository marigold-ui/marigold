import React, { useRef } from 'react';

import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import {
  useTableColumnHeader,
  useTableSelectAllCheckbox,
} from '@react-aria/table';
import { mergeProps } from '@react-aria/utils';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { GridNode } from '@react-types/grid';

import { Box, useStateProps } from '@marigold/system';

import { Checkbox } from '../Checkbox';
import { useTableContext } from './Context';

// Props
// ---------------
export interface TableSelectAllCell {
  column: GridNode<object>;
}

// Component
// ---------------
export const TableSelectAllCell = ({ column }: TableSelectAllCell) => {
  const ref = useRef(null);
  const { state, styles } = useTableContext();
  const { columnHeaderProps } = useTableColumnHeader(
    {
      node: column,
    },
    state,
    ref
  );

  const singleSelectionMode = state.selectionManager.selectionMode === 'single';
  const {
    checkboxProps: { isIndeterminate, isSelected, defaultSelected, ...rest },
  } = useTableSelectAllCheckbox(state);
  const checkboxProps = {
    disabled: singleSelectionMode,
    style: singleSelectionMode ? { visibility: 'hidden' } : undefined,
    checked: isSelected,
    defaultChecked: defaultSelected,
    indeterminate: isIndeterminate,
    ...rest,
  };

  const { hoverProps, isHovered } = useHover({});
  const { focusProps, isFocusVisible } = useFocusRing();
  const stateProps = useStateProps({
    hover: isHovered,
    focusVisible: isFocusVisible,
    indeterminate: isIndeterminate,
  });

  return (
    <Box
      as="th"
      ref={ref}
      __baseCSS={{
        textAlign: 'center',
        verticalAlign: 'middle',
        lineHeight: 1,
      }}
      css={styles.header}
      {...mergeProps(columnHeaderProps, hoverProps, focusProps)}
      {...stateProps}
    >
      {
        /*
        Single selection mode hides the checkbox. In order to leave the column
        with accessible content, we use a hidden aria-label (from the checkbocProps).
      */
        singleSelectionMode && (
          <VisuallyHidden>{checkboxProps['aria-label']}</VisuallyHidden>
        )
      }
      <Checkbox {...checkboxProps} />
    </Box>
  );
};
