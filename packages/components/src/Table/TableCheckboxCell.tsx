import { JSX, useRef } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useTableCell, useTableSelectionCheckbox } from '@react-aria/table';
import { mergeProps } from '@react-aria/utils';
import { GridNode } from '@react-types/grid';
import { cn, useStateProps } from '@marigold/system';
import { Checkbox } from '../Checkbox';
import { useTableContext } from './Context';
import { mapCheckboxProps } from './utils';

export interface TableCheckboxCellProps {
  cell: GridNode<object>;
  alignY?: Exclude<
    JSX.IntrinsicElements['td']['valign'],
    'baseline' | 'sub' | 'super' | 'bottom'
  >;
}

export const TableCheckboxCell = ({ cell, alignY }: TableCheckboxCellProps) => {
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

  console.log(alignY, 'alignY');
  return (
    <td
      ref={ref}
      className={cn('leading-none', classNames?.cell)}
      {...mergeProps(gridCellProps, focusProps)}
      {...stateProps}
      valign={alignY}
    >
      <Checkbox {...checkboxProps} />
    </td>
  );
};
