import React, { useRef } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { useTableColumnHeader } from '@react-aria/table';
import { mergeProps } from '@react-aria/utils';
import { Box, useStateProps } from '@marigold/system';
import { useTableContext } from './Context';
const SortIndicator = ({ direction = 'ascending', visible }) =>
  React.createElement(
    Box,
    {
      as: 'span',
      role: 'presentation',
      'aria-hidden': 'true',
      css: {
        color: 'currentColor',
        paddingInlineStart: '0.5ch',
        visibility: visible ? 'visible' : 'hidden',
      },
    },
    direction === 'ascending' ? '▲' : '▼'
  );
// Component
// ---------------
export const TableColumnHeader = ({ column }) => {
  var _a, _b;
  const ref = useRef(null);
  const { state, styles } = useTableContext();
  const { columnHeaderProps } = useTableColumnHeader(
    {
      node: column,
    },
    state,
    ref
  );
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
      colSpan: column.colspan,
      ref: ref,
      css: styles.header,
      ...mergeProps(columnHeaderProps, hoverProps, focusProps),
      ...stateProps,
    },
    column.rendered,
    column.props.allowsSorting &&
      React.createElement(SortIndicator, {
        direction:
          (_a = state.sortDescriptor) === null || _a === void 0
            ? void 0
            : _a.direction,
        visible:
          ((_b = state.sortDescriptor) === null || _b === void 0
            ? void 0
            : _b.column) === column.key,
      })
  );
};
//# sourceMappingURL=TableColumnHeader.js.map
