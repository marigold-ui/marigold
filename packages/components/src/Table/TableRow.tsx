import React, { ReactNode, useRef } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { useTableRow } from '@react-aria/table';
import { mergeProps } from '@react-aria/utils';
import { GridNode } from '@react-types/grid';

import { useComponentStylesFromTV, useStateProps } from '@marigold/system';

import { tv } from 'tailwind-variants';
import { twMerge } from 'tailwind-merge';

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
  const { interactive, state, ...ctx } = useTableContext();

  const { variant, size } = row.props;

  // question: why we need this?
  const classNames = useComponentStylesFromTV('Table', {
    variant: variant || ctx.variant,
    size: size || ctx.size,
    slots: ['row'],
  });

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

  const styledTableRow = tv({
    base: [
      !interactive
        ? 'cursor-text'
        : disabled
        ? 'cursor-default'
        : 'cursor-pointer',
    ],
  });

  return (
    <tr
      ref={ref}
      className={twMerge(styledTableRow(), classNames.row())}
      {...mergeProps(rowProps, focusProps, hoverProps)}
      {...stateProps}
    >
      {children}
    </tr>
  );
};
