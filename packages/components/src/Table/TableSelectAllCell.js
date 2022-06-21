import React, { useRef } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import {
  useTableColumnHeader,
  useTableSelectAllCheckbox,
} from '@react-aria/table';
import { mergeProps } from '@react-aria/utils';
import { Box, useStateProps } from '@marigold/system';
import { Checkbox } from '../Checkbox';
import { useTableContext } from './Context';
import { mapCheckboxProps } from './utils';
// Component
// ---------------
export const TableSelectAllCell = ({ column }) => {
  const ref = useRef(null);
  const { state, styles } = useTableContext();
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
  return React.createElement(
    Box,
    {
      as: 'th',
      ref: ref,
      __baseCSS: {
        textAlign: 'center',
        verticalAlign: 'middle',
        lineHeight: 1,
      },
      css: styles.header,
      ...mergeProps(columnHeaderProps, hoverProps, focusProps),
      ...stateProps,
    },
    React.createElement(Checkbox, { ...checkboxProps })
  );
};
//# sourceMappingURL=TableSelectAllCell.js.map
