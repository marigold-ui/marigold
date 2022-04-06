import React from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useCheckbox } from '@react-aria/checkbox';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useToggleState } from '@react-stately/toggle';
import { AriaCheckboxProps } from '@react-types/checkbox';

import { Box } from '@marigold/system';
import { ComponentProps } from '@marigold/types';

// Theme Extension
// ---------------
export interface CheckboxThemeExtension<Value> {
  checkbox?: {
    [key: string]: Value;
  };
}

// SVG Icon
// ---------------
interface IconProps {
  checked?: boolean;
  focused?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
}

const CheckMark = () => (
  <svg viewBox="0 0 12 10">
    <path
      fill="#000"
      stroke="none"
      d="M11.915 1.548 10.367 0 4.045 6.315 1.557 3.827 0 5.373l4.045 4.046 7.87-7.871Z"
    />
  </svg>
);

const IndeterminateMark = () => (
  <svg width="12" height="3" viewBox="0 0 12 3">
    <path
      fill="#000"
      stroke="none"
      d="M11.5 2.04018H0.5V0.46875H11.5V2.04018Z"
    />
  </svg>
);

const Icon = ({ checked, focused, disabled, indeterminate }: IconProps) => {
  const mark = indeterminate ? <IndeterminateMark /> : <CheckMark />;

  return (
    <Box
      aria-hidden="true"
      __baseCSS={{
        width: 16,
        height: 16,
        bg: '#fff',
        border: '1px solid #ccc',
        borderRadius: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: '1px',
      }}
    >
      {checked ? mark : null}
    </Box>
  );
};

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
        userSelect: 'none',
      }}
      __baseCSS={{
        ':hover': { cursor: inputProps.disabled ? 'not-allowed' : 'pointer' },
      }}
    >
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      <Icon
        checked={state.isSelected}
        focused={isFocusVisible}
        disabled={inputProps.disabled}
        indeterminate={indeterminate}
      />
      {/* make error, disabled styles available */}
      <Box>{props.children}</Box>
    </Box>
  );
};
