import React, { ReactNode, useRef } from 'react';
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
  children?: ReactNode;
  item: Node<object>;
  state: TableState<object>;
  css?: CSSObject;
}

// TableRow Component
// ----------------------------
export const TableRow = ({ item, state, children, css }: TableRowProps) => {
  const ref = useRef(null);
  const isSelected = state.selectionManager.isSelected(item.key);
  const { rowProps } = useTableRow(
    {
      node: item,
    },
    state,
    ref
  );
  const { focusProps, isFocusVisible } = useFocusRing();
  const stateProps = useStateProps({
    focus: isFocusVisible,
    checked: isSelected,
  });

  return (
    <Box
      as="tr"
      ref={ref}
      css={css}
      {...mergeProps(rowProps, focusProps)}
      {...stateProps}
    >
      {children}
    </Box>
  );
};
