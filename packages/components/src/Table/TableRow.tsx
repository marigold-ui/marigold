import React, { RefObject, useRef } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useTableRow } from '@react-aria/table';
import { mergeProps } from '@react-aria/utils';
import { TableState } from '@react-stately/table';
import { Node } from '@react-types/shared';

import { CSSObject, useStateProps } from '@marigold/system';

import { Box } from '../Box';

// Props
// ----------------------------
export interface TableRowProps {
  item: Node<object>;
  state: TableState<object>;
  styles?: CSSObject;
}

// TableRow Component
// ----------------------------
export const TableRow: React.FC<TableRowProps> = ({
  item,
  state,
  children,
  styles,
}) => {
  const ref = useRef<HTMLElement>();
  const isSelected = state.selectionManager.isSelected(item.key);
  const { rowProps } = useTableRow(
    {
      node: item,
    },
    state,
    ref as RefObject<HTMLElement>
  );
  const { focusProps, isFocusVisible } = useFocusRing();
  const stateProps = useStateProps({
    focus: isFocusVisible,
    checked: isSelected,
  });

  return (
    <Box
      as="tr"
      ref={ref as RefObject<HTMLTableRowElement>}
      {...mergeProps(rowProps, focusProps)}
      __baseCSS={{ ...styles }}
      {...stateProps}
    >
      {children}
    </Box>
  );
};
