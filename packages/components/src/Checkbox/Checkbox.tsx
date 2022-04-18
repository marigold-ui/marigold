import React, { ReactNode } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useCheckbox } from '@react-aria/checkbox';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useToggleState } from '@react-stately/toggle';
import { AriaCheckboxProps } from '@react-types/checkbox';

import {
  Box,
  CSSObject,
  StateAttrProps,
  ThemeComponentProps,
  ThemeExtensionsWithParts,
  useComponentStyles,
  useStateProps,
} from '@marigold/system';
import { ComponentProps } from '@marigold/types';

// Theme Extension
// ---------------
export interface CheckboxThemeExtension
  extends ThemeExtensionsWithParts<
    'Checkbox',
    ['container', 'label', 'checkbox']
  > {}

// SVG Icon
// ---------------
interface IconProps extends StateAttrProps {
  css?: CSSObject;
  checked?: boolean;
  indeterminate?: boolean;
}

const CheckMark = () => (
  <svg viewBox="0 0 12 10">
    <path
      fill="currentColor"
      stroke="none"
      d="M11.915 1.548 10.367 0 4.045 6.315 1.557 3.827 0 5.373l4.045 4.046 7.87-7.871Z"
    />
  </svg>
);

const IndeterminateMark = () => (
  <svg width="12" height="3" viewBox="0 0 12 3">
    <path
      fill="currentColor"
      stroke="none"
      d="M11.5 2.04018H0.5V0.46875H11.5V2.04018Z"
    />
  </svg>
);

const Icon = ({ css, checked, indeterminate, ...props }: IconProps) => {
  const icon = indeterminate ? <IndeterminateMark /> : <CheckMark />;
  return (
    <Box
      aria-hidden="true"
      __baseCSS={{
        width: 16,
        height: 16,
        bg: '#fff',
        border: '1px solid #000',
        borderRadius: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: '1px',
      }}
      css={css}
      {...props}
    >
      {checked ? icon : null}
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
  extends ThemeComponentProps,
    Omit<
      ComponentProps<'input'>,
      'size' | 'type' | 'defaultValue' | CustomCheckboxProps
    >,
    Pick<AriaCheckboxProps, CustomCheckboxProps> {
  children?: ReactNode;
  indeterminate?: boolean;
  error?: boolean;
}

// Component
// ---------------
export const Checkbox = ({
  size,
  variant,
  disabled,
  checked,
  defaultChecked,
  indeterminate,
  readOnly,
  required,
  error,
  ...props
}: CheckboxProps) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const styles = useComponentStyles(
    'Checkbox',
    { variant, size },
    { parts: ['container', 'label', 'checkbox'] }
  );

  const state = useToggleState({
    isSelected: checked,
    defaultSelected: defaultChecked,
    ...props,
  });
  const { inputProps } = useCheckbox(
    {
      isSelected: checked,
      defaultSelected: defaultChecked,
      isIndeterminate: indeterminate,
      isDisabled: disabled,
      isReadOnly: readOnly,
      isRequired: required,
      validationState: error ? 'invalid' : 'valid',
      ...props,
    },
    state,
    ref
  );
  const { isFocusVisible, focusProps } = useFocusRing();

  const stateProps = useStateProps({
    checked: state.isSelected,
    focus: isFocusVisible,
    disabled: inputProps.disabled,
    readOnly,
    indeterminate,
    error,
  });

  return (
    <Box
      as="label"
      variant="checkbox"
      __baseCSS={{
        display: 'flex',
        alignItems: 'center',
        gap: '1ch',
        userSelect: 'none',
        '&:hover': { cursor: inputProps.disabled ? 'not-allowed' : 'pointer' },
      }}
      css={styles.container}
      {...stateProps}
    >
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      <Icon
        checked={state.isSelected}
        indeterminate={indeterminate}
        css={styles.checkbox}
        {...stateProps}
      />
      <Box css={styles.label} {...stateProps}>
        {props.children}
      </Box>
    </Box>
  );
};
