import React, { ReactNode, useRef } from 'react';
import { useCheckbox } from '@react-aria/checkbox';
import {
  useTableSelectAllCheckbox,
  useTableColumnHeader,
} from '@react-aria/table';
import { TableState } from '@react-stately/table';
import { useToggleState } from '@react-stately/toggle';
import { Node } from '@react-types/shared';

import { CSSObject } from '@marigold/system';

import { Box } from '../Box';

// Props
// ----------------------------
export interface TableSelectAllCellProps {
  chilren?: ReactNode;
  item: Node<object>;
  state: TableState<object>;
  css?: CSSObject;
}

// TableSelectAllCell Component
// ----------------------------
export const TableSelectAllCell = ({
  item: column,
  state,
  css,
}: TableSelectAllCellProps) => {
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

  return (
    <Box
      as="th"
      ref={ref}
      __baseCSS={{ textAlign: 'center' }}
      css={css}
      {...columnHeaderProps}
    >
      <input {...inputProps} ref={inputRef} />
    </Box>
  );
};
