import { useRef } from 'react';

import { useFocusRing } from '@react-aria/focus';
import { useTableCell } from '@react-aria/table';
import { mergeProps } from '@react-aria/utils';

import { GridNode } from '@react-types/grid';

import { cn, useStateProps } from '@marigold/system';

import { useTableContext } from './Context';

export interface TableCellProps
  extends Pick<JSX.IntrinsicElements['td'], 'align'> {
  cell: GridNode<object>;
  equalDigitWidth?: boolean;
}

export const TableCell = ({ cell, align, equalDigitWidth }: TableCellProps) => {
  const ref = useRef(null);
  const { interactive, state, classNames } = useTableContext();
  const disabled = state.disabledKeys.has(cell.parentKey!);
  const { gridCellProps } = useTableCell(
    {
      node: cell,
    },
    state,
    ref
  );
  const cellProps = interactive
    ? gridCellProps
    : {
        /**
         * Override `react-aria` handler so users can select text.
         * Solution from https://github.com/adobe/react-spectrum/issues/2585
         */
        ...gridCellProps,
        onMouseDown: (e: MouseEvent) => e.stopPropagation(),
        onPointerDown: (e: MouseEvent) => e.stopPropagation(),
      };

  const { focusProps, isFocusVisible } = useFocusRing();
  const stateProps = useStateProps({ disabled, focusVisible: isFocusVisible });
  console.log('tableCell:', equalDigitWidth);
  return (
    <td
      ref={ref}
      className={cn(`${equalDigitWidth && 'tabular-nums'}`, classNames?.cell)}
      {...mergeProps(cellProps, focusProps)}
      {...stateProps}
      align={align}
    >
      {cell.rendered}
    </td>
  );
};
