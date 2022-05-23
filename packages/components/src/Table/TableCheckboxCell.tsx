import React, { useRef } from 'react';
import { useTableCell, useTableSelectionCheckbox } from '@react-aria/table';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { GridNode } from '@react-types/grid';

import { Box, useStateProps } from '@marigold/system';

import { Checkbox } from '../Checkbox';
import { useTableContext } from './Context';
import { mapCheckboxProps } from './utils';

export interface TableCheckboxCellProps {
  cell: GridNode<object>;
}

export const TableCheckboxCell = ({ cell }: TableCheckboxCellProps) => {
  const ref = useRef(null);
  const { state, styles } = useTableContext();
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

  return (
    <Box
      as="td"
      ref={ref}
      __baseCSS={{
        textAlign: 'center',
        verticalAlign: 'middle',
        lineHeight: 1,
      }}
      css={styles.cell}
      {...mergeProps(gridCellProps, focusProps)}
      {...stateProps}
    >
      <Checkbox {...checkboxProps} />
    </Box>
  );
};
