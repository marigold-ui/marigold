import React, { ReactNode, useRef } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useTableColumnHeader } from '@react-aria/table';
import { mergeProps } from '@react-aria/utils';
import { TableState } from '@react-stately/table';
import { Node } from '@react-types/shared';

import { CSSObject, useStateProps } from '@marigold/system';

import { Box } from '../Box';
import { Text } from '../Text';

// Props
// ----------------------------
export interface TableColumnHeaderProps {
  chilren?: ReactNode;
  item: Node<object>;
  state: TableState<object>;
  css?: CSSObject;
}

// TableColumnHeader Component
// ----------------------------
export const TableColumnHeader = ({
  item: column,
  state,
  css,
}: TableColumnHeaderProps) => {
  const ref = useRef(null);
  const { columnHeaderProps } = useTableColumnHeader(
    { node: column },
    state,
    ref
  );
  const { focusProps, isFocusVisible } = useFocusRing();
  const stateProps = useStateProps({ focus: isFocusVisible });

  return (
    <Box
      as="th"
      ref={ref}
      css={css}
      {...mergeProps(columnHeaderProps, focusProps)}
      {...stateProps}
    >
      <Text size="xxsmall">{column.rendered}</Text>
    </Box>
  );
};
