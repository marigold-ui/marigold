import React, { useRef } from 'react';

import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import {
  useTableColumnHeader,
  useTableSelectAllCheckbox,
} from '@react-aria/table';
import { mergeProps } from '@react-aria/utils';
import { GridNode } from '@react-types/grid';

import { Box, useStateProps } from '@marigold/system';

import { tv } from 'tailwind-variants';
import { twMerge } from 'tailwind-merge';

import { Checkbox } from '../Checkbox';
import { useTableContext } from './Context';
import { mapCheckboxProps } from './utils';

// Props
// ---------------
export interface TableSelectAllCell {
  column: GridNode<object>;
}

// Component
// ---------------
export const TableSelectAllCell = ({ column }: TableSelectAllCell) => {
  const ref = useRef(null);
  const { state, classNames } = useTableContext();
  const { columnHeaderProps } = useTableColumnHeader(
    {
      node: column,
    },
    state,
    ref
  );

  const { checkboxProps } = mapCheckboxProps(useTableSelectAllCheckbox(state));

  const { hoverProps, isHovered } = useHover({});
  const { focusProps, isFocusVisible } = useFocusRing();
  const stateProps = useStateProps({
    hover: isHovered,
    focusVisible: isFocusVisible,
  });

  const styledTableHeaderSelectAll = tv({
    base: ['text-center align-middle leading-none'],
  });

  return (
    <Box
      as="th"
      ref={ref}
      className={twMerge(styledTableHeaderSelectAll(), classNames.header())}
      {...mergeProps(columnHeaderProps, hoverProps, focusProps)}
      {...stateProps}
    >
      <Checkbox {...checkboxProps} />
    </Box>
  );
};
