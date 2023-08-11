import React, { useRef } from 'react';

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
  useStateProps,
  width as twWidth,
} from '@marigold/system';

import { Checkbox } from '../Checkbox';
import { useTableContext } from './Context';
import { mapCheckboxProps } from './utils';

// Props
// ---------------
export interface TableSelectAllCell extends WidthProp {
  column: GridNode<object>;
}

// Component
// ---------------
export const TableSelectAllCell = ({
  column,
  width = 'auto',
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
      className={cn(
        twWidth[width],
        ['text-center align-middle leading-none'],
        classNames?.header
      )}
      {...mergeProps(columnHeaderProps, hoverProps, focusProps)}
      {...stateProps}
    >
      <Checkbox {...checkboxProps} />
    </th>
  );
};
