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

import { CSSObject, useStateProps } from '@marigold/system';

import { Box } from '../Box';
import { Text } from '../Text';

// Props
// ----------------------------
export interface TableColumnHeaderProps {
  item: Node<object>;
  state: TableState<object>;
  isSelectionColumn?: boolean;
  align?: 'left' | 'center' | 'right';
  css?: CSSObject;
}

// TableColumnHeader Component
// ----------------------------
export const TableColumnHeader: React.FC<TableColumnHeaderProps> = ({
  item: column,
  state,
  isSelectionColumn,
  align = 'left',
  css,
}) => {
  const ref = useRef(null);
  const { columnHeaderProps } = useTableColumnHeader(
    { node: column },
    state,
    ref
  );

  const { checkboxProps } = useTableSelectAllCheckbox(state);
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
      as="th"
      ref={ref}
      __baseCSS={{ textAlign: isSelectionColumn ? 'center' : align }}
      css={css}
      {...mergeProps(columnHeaderProps, focusProps)}
      {...stateProps}
    >
      {isSelectionColumn ? (
        <input {...inputProps} ref={inputRef} />
      ) : (
        <Text size="xxsmall">{column.rendered}</Text>
      )}
    </Box>
  );
};
