import React, { useRef } from 'react';
import { useTableCell, useTableSelectionCheckbox } from '@react-aria/table';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { GridNode } from '@react-types/grid';

import { useStateProps } from '@marigold/system';

import { tv } from 'tailwind-variants';
import { twMerge } from 'tailwind-merge';

import { Checkbox } from '../Checkbox';
import { useTableContext } from './Context';
import { mapCheckboxProps } from './utils';

export interface TableCheckboxCellProps {
  cell: GridNode<object>;
}

export const TableCheckboxCell = ({ cell }: TableCheckboxCellProps) => {
  const ref = useRef(null);
  const { state, classNames } = useTableContext();
  const disabled = state.disabledKeys.has(cell.parentKey!);
  const { gridCellProps } = useTableCell(
    {
      node: cell,
    },
    state,
    ref
  );

  const { checkboxProps } = mapCheckboxProps(
    useTableSelectionCheckbox({ key: cell.parentKey! }, state)
  );

  const { focusProps, isFocusVisible } = useFocusRing();
  const stateProps = useStateProps({ disabled, focusVisible: isFocusVisible });

  const styledTableCheckboxCell = tv({
    base: ['text-center align-middle leading-none'],
  });

  return (
    <td
      ref={ref}
      className={twMerge(styledTableCheckboxCell(), classNames.cell())}
      {...mergeProps(gridCellProps, focusProps)}
      {...stateProps}
    >
      <Checkbox {...checkboxProps} />
    </td>
  );
};
