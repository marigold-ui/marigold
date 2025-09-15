import { ReactNode, useRef } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { useTableRow } from '@react-aria/table';
import { mergeProps } from '@react-aria/utils';
import { GridNode } from '@react-types/grid';
import { cn, useClassNames, useStateProps } from '@marigold/system';
import { useTableContext } from './Context';
import { RowProps } from './Table';

// Props
// ---------------
export interface TableRowProps extends RowProps {
  row: GridNode<object>;
}

// Component
// ---------------
export const TableRow = ({ children, row }: TableRowProps) => {
  const ref = useRef(null);
  const { interactive, state, ...ctx } = useTableContext();

  const { variant, size } = row.props;

  const classNames = useClassNames({
    component: 'Table',
    variant: variant || ctx.variant,
    size: size || ctx.size,
  });

  const { rowProps, isPressed } = useTableRow(
    {
      node: row,
    },
    state,
    ref
  );

  const disabled = state.disabledKeys.has(row.key);
  const selected = state.selectionManager.isSelected(row.key);

  const { focusProps, isFocusVisible } = useFocusRing();
  const { hoverProps, isHovered } = useHover({
    isDisabled: disabled || !interactive,
  });

  const stateProps = useStateProps({
    disabled,
    selected,
    hover: isHovered,
    focusVisible: isFocusVisible,
    active: isPressed,
  });

  return (
    <tr
      ref={ref}
      className={cn(
        [
          !interactive
            ? 'cursor-text'
            : disabled
              ? 'cursor-default'
              : 'cursor-pointer',
        ],
        classNames?.row
      )}
      {...mergeProps(rowProps, focusProps, hoverProps)}
      {...stateProps}
      data-rac
    >
      {children as ReactNode}
    </tr>
  );
};
