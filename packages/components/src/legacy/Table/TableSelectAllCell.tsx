import { type JSX, useRef } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import {
  useTableColumnHeader,
  useTableSelectAllCheckbox,
} from '@react-aria/table';
import { mergeProps } from '@react-aria/utils';
import { GridNode } from '@react-types/grid';
import {
  WidthProp,
  cn,
  width as twWidth,
  useStateProps,
} from '@marigold/system';
import { Checkbox } from '../../Checkbox/Checkbox';
import { useTableContext } from './Context';
import { mapCheckboxProps } from './utils';

// Props
// ---------------
export interface TableSelectAllCell
  extends WidthProp, Pick<JSX.IntrinsicElements['td'], 'align'> {
  column: GridNode<object>;
}

// Component
// ---------------
export const TableSelectAllCell = ({
  column,
  width = 'auto',
  align = 'left',
}: TableSelectAllCell) => {
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

  return (
    <th
      ref={ref}
      className={cn(twWidth[width], ['leading-none'], classNames?.header)}
      {...mergeProps(columnHeaderProps, hoverProps, focusProps)}
      {...stateProps}
      align={align}
      data-rac
    >
      <Checkbox {...checkboxProps} />
    </th>
  );
};
