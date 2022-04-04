import React from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useCheckbox } from '@react-aria/checkbox';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useToggleState } from '@react-stately/toggle';
import { AriaCheckboxProps } from '@react-types/checkbox';

import { Box } from '@marigold/system';
import { ComponentProps } from '@marigold/types';

// Props
// ---------------
/**
 * `react-aria` has a slightly different API for the above events.
 * Thus, we adjust our regular props to match them.
 */
export type CustomCheckboxProps = 'value' | 'onChange' | 'onFocus' | 'onBlur';

export interface CheckboxProps
  extends Omit<
      ComponentProps<'input'>,
      'type' | 'defaultValue' | CustomCheckboxProps
    >,
    Pick<AriaCheckboxProps, CustomCheckboxProps> {
  indeterminate?: boolean;
}

// Component
// ---------------
export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  defaultChecked,
  indeterminate,
  ...props
}) => {
  const state = useToggleState({
    isSelected: checked,
    defaultSelected: defaultChecked,
    ...props,
  });
  const ref = React.useRef<HTMLInputElement>(null);
  const { inputProps } = useCheckbox(props, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <Box
      as="label"
      variant="checkbox"
      css={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
      }}
      __baseCSS={{
        ':hover': { cursor: props.disabled ? 'not-allowed' : 'pointer' },
      }}
    >
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      <svg width={24} height={24} aria-hidden="true">
        <rect
          x={state.isSelected ? 4 : 5}
          y={state.isSelected ? 4 : 5}
          width={state.isSelected ? 16 : 14}
          height={state.isSelected ? 16 : 14}
          fill={state.isSelected ? 'orange' : 'none'}
          stroke={state.isSelected ? 'none' : 'gray'}
          strokeWidth={2}
        />
        {state.isSelected && (
          <path
            transform="translate(7 7)"
            d={`M3.788 9A.999.999 0 0 1 3 8.615l-2.288-3a1 1 0 1 1
            1.576-1.23l1.5 1.991 3.924-4.991a1 1 0 1 1 1.576 1.23l-4.712
            6A.999.999 0 0 1 3.788 9z`}
          />
        )}
        {isFocusVisible && (
          <rect
            x={1}
            y={1}
            width={22}
            height={22}
            fill="none"
            stroke="orange"
            strokeWidth={2}
          />
        )}
      </svg>
      {props.children}
    </Box>
  );
};
