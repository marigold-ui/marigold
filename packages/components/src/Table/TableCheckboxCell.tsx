import React, { useRef } from 'react';
import { useCheckbox } from '@react-aria/checkbox';
import { useTableCell, useTableSelectionCheckbox } from '@react-aria/table';
import { TableState } from '@react-stately/table';
import { useToggleState } from '@react-stately/toggle';
import { Node } from '@react-types/shared';

import { CSSObject } from '@marigold/system';

import { Box } from '../Box';

// Props
// ----------------------------
export interface TableCheckboxCellProps {
  item: Node<object>;
  state: TableState<object>;
  css?: CSSObject;
}

// TableCheckboxCell Component
// ----------------------------
export const TableCheckboxCell = ({
  item: cell,
  state,
  css,
}: TableCheckboxCellProps) => {
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

  return (
    <Box as="td" ref={cellRef} css={css} {...gridCellProps}>
      <input {...inputProps} />
    </Box>
  );
};
