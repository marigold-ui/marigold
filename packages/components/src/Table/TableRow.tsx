import React, { ReactNode, useRef } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { useTableRow } from '@react-aria/table';
import { mergeProps } from '@react-aria/utils';
import { GridNode } from '@react-types/grid';

import {
  Box,
  useComponentStyles,
  useComponentStylesFromTV,
  useStateProps,
} from '@marigold/system';

import { useTableContext } from './Context';

// Props
// ---------------
export interface TableRowProps {
  children?: ReactNode;
  row: GridNode<object>;
}

// Component
// ---------------
export const TableRow = ({ children, row }: TableRowProps) => {
  const ref = useRef(null);
  const { interactive, state, classNames, ...ctx } = useTableContext();

  // TODO: handle this
  //const { variant, size } = row.props;

  // const { row: classNames } = useComponentStylesFromTV('Table', {
  //   variant: variant || ctx.variant,
  //   size: size || ctx.size,
  //   slots: ['row'],
  // });

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

  console.log('####', classNames);
  return (
    <Box
      as="tr"
      ref={ref}
      __baseCSS={{
        cursor: !interactive ? 'text' : disabled ? 'default' : 'pointer',
      }}
      className={classNames.row()}
      {...mergeProps(rowProps, focusProps, hoverProps)}
      {...stateProps}
    >
      {children}
    </Box>
  );
};
