import React, { useRef } from 'react';
import { useTableCell, useTableSelectionCheckbox } from '@react-aria/table';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { Box, useStateProps } from '@marigold/system';
import { Checkbox } from '../Checkbox';
import { useTableContext } from './Context';
import { mapCheckboxProps } from './utils';
export const TableCheckboxCell = ({ cell }) => {
  const ref = useRef(null);
  const { state, styles } = useTableContext();
  const disabled = state.disabledKeys.has(cell.parentKey);
  const { gridCellProps } = useTableCell(
    {
      node: cell,
    },
    state,
    ref
  );
  const { checkboxProps } = mapCheckboxProps(
    useTableSelectionCheckbox({ key: cell.parentKey }, state)
  );
  const { focusProps, isFocusVisible } = useFocusRing();
  const stateProps = useStateProps({ disabled, focusVisible: isFocusVisible });
  return React.createElement(
    Box,
    {
      as: 'td',
      ref: ref,
      __baseCSS: {
        textAlign: 'center',
        verticalAlign: 'middle',
        lineHeight: 1,
      },
      css: styles.cell,
      ...mergeProps(gridCellProps, focusProps),
      ...stateProps,
    },
    React.createElement(Checkbox, { ...checkboxProps })
  );
};
//# sourceMappingURL=TableCheckboxCell.js.map
