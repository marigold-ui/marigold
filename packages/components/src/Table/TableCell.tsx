import React, { useRef } from 'react';
import { useCheckbox } from '@react-aria/checkbox';
import { useFocusRing } from '@react-aria/focus';
import { useTableCell, useTableSelectionCheckbox } from '@react-aria/table';
import { mergeProps } from '@react-aria/utils';
import { TableState } from '@react-stately/table';
import { useToggleState } from '@react-stately/toggle';
import { Node } from '@react-types/shared';

import { CSSObject, useStateProps } from '@marigold/system';

import { Box } from '../Box';
import { Text } from '../Text';

// Props
// ----------------------------
export interface TableCellProps {
  item: Node<object>;
  state: TableState<object>;
  /**
   * Wheter it is a cell with a checkbox or a regular data cell
   */
  isSelectionCell?: boolean;
  align?: 'left' | 'center' | 'right';
  css?: CSSObject;
}

// TableCell Component
// ----------------------------
export const TableCell = ({
  item: cell,
  state,
  isSelectionCell,
  align = 'left',
  css,
}: TableCellProps) => {
  const cellRef = useRef(null);
  const { gridCellProps } = useTableCell({ node: cell }, state, cellRef);

  const { checkboxProps } = useTableSelectionCheckbox(
    { key: cell.parentKey! },
    state
  );
  const inputRef = useRef(null);
  const { inputProps } = useCheckbox(
    checkboxProps,
    useToggleState(checkboxProps),
    inputRef
  );

  const { focusProps, isFocusVisible } = useFocusRing();
  const stateProps = useStateProps({ focus: isFocusVisible });

  return (
    <Box
      as="td"
      ref={cellRef}
      __baseCSS={{
        textAlign: isSelectionCell ? 'center' : align,
      }}
      css={css}
      {...mergeProps(gridCellProps, focusProps)}
      {...stateProps}
    >
      {isSelectionCell ? <input {...inputProps} /> : <>{cell.rendered}</>}
    </Box>
  );
};
