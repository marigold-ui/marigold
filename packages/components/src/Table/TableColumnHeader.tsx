import React, { RefObject, useRef } from 'react';
import { useCheckbox } from '@react-aria/checkbox';
import { useFocusRing } from '@react-aria/focus';
import {
  useTableSelectAllCheckbox,
  useTableColumnHeader,
} from '@react-aria/table';
import { mergeProps } from '@react-aria/utils';
import { TableState } from '@react-stately/table';
import { useToggleState } from '@react-stately/toggle';
import { Node } from '@react-types/shared';

import { CSSObject } from '@marigold/system';

import { Box } from '../Box';
import { Text } from '../Text';

// Props
// ----------------------------
export interface TableColumnHeaderProps {
  item: Node<object>;
  state: TableState<object>;
  isSelectionColumn?: boolean;
  align?: 'left' | 'center' | 'right';
  styles?: CSSObject;
}

// TableColumnHeader Component
// ----------------------------
export const TableColumnHeader: React.FC<TableColumnHeaderProps> = ({
  item: column,
  state,
  isSelectionColumn,
  align = 'left',
  styles,
}) => {
  const ref = useRef<HTMLElement>();
  const { columnHeaderProps } = useTableColumnHeader(
    { node: column },
    state,
    ref as RefObject<HTMLElement>
  );
  // get isFocusVisible from useFocusRing if we can handle states in useComponentStyles
  const { focusProps } = useFocusRing();

  const { checkboxProps } = useTableSelectAllCheckbox(state);
  const inputRef = useRef(null);
  const { inputProps } = useCheckbox(
    checkboxProps,
    useToggleState(checkboxProps),
    inputRef
  );

  return (
    <Box
      as="th"
      ref={ref as RefObject<HTMLTableCellElement>}
      {...mergeProps(columnHeaderProps, focusProps)}
      __baseCSS={{
        ...{
          textAlign: isSelectionColumn ? 'center' : align,
        },
        ...styles,
      }}
    >
      {isSelectionColumn ? (
        <input {...inputProps} ref={inputRef} />
      ) : (
        <Text size="xxsmall">{column.rendered}</Text>
      )}
    </Box>
  );
};
