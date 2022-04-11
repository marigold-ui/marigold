import React, { RefObject, useRef } from 'react';
import { useCheckbox } from '@react-aria/checkbox';
import { useFocusRing } from '@react-aria/focus';
import { useTableCell, useTableSelectionCheckbox } from '@react-aria/table';
import { mergeProps } from '@react-aria/utils';
import { TableState } from '@react-stately/table';
import { useToggleState } from '@react-stately/toggle';
import { Node } from '@react-types/shared';

import { CSSObject } from '@marigold/system';

import { Box } from '../Box';
import { Text } from '../Text';

// Props
// ----------------------------
export interface TableCellProps {
  item: Node<object>;
  state: TableState<object>;
  isSelectionCell?: boolean;
  align?: 'left' | 'center' | 'right';
  styles?: CSSObject;
}

// TableCell Component
// ----------------------------
export const TableCell: React.FC<TableCellProps> = ({
  item: cell,
  state,
  isSelectionCell,
  align = 'left',
  styles,
}) => {
  const ref = useRef<HTMLElement>();
  const { gridCellProps } = useTableCell(
    { node: cell },
    state,
    ref as RefObject<HTMLElement>
  );
  // get isFocusVisible from useFocusRing if we can handle states in useComponentStyles
  const { focusProps } = useFocusRing();

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

  return (
    <Box
      as="td"
      {...mergeProps(gridCellProps, focusProps)}
      ref={ref as RefObject<HTMLTableCellElement>}
      __baseCSS={{
        ...{
          textAlign: isSelectionCell ? 'center' : align,
        },
        ...styles,
      }}
    >
      {isSelectionCell ? (
        <input {...inputProps} />
      ) : (
        <Text size="xxsmall" color="secondary">
          {cell.rendered}
        </Text>
      )}
    </Box>
  );
};
