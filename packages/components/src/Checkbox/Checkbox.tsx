import React, { ReactNode } from 'react';
import { useCheckbox, useCheckboxGroupItem } from '@react-aria/checkbox';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
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

import { useCheckboxGroupContext } from './CheckboxGroup';

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
  // Adjust props to the react-aria API
  const checkboxProps = {
    isIndeterminate: indeterminate,
    isDisabled: disabled,
    isReadOnly: readOnly,
    isRequired: required,
    validationState: error ? 'invalid' : 'valid',
  } as const;

  /**
   * Use hook depending if the checkbox is used inside a group or standalone.
   * This is unusual, but since the checkboxs is not moving out of the group,
   * it should be safe.
   */
  const groupState = useCheckboxGroupContext();

  /* eslint-disable react-hooks/rules-of-hooks */
  const { inputProps } = groupState
    ? useCheckboxGroupItem(
        {
          ...props,
          ...checkboxProps,
          /**
           * value is optional for standalone checkboxes, but required when
           * used inside a group.
           */
          value: props.value as string,
        },
        groupState,
        ref
      )
    : useCheckbox(
        {
          isSelected: checked,
          defaultSelected: defaultChecked,
          ...checkboxProps,
          ...props,
        },
        useToggleState({
          isSelected: checked,
          defaultSelected: defaultChecked,
          ...props,
        }),
        ref
      );
  /* eslint-enable react-hooks/rules-of-hooks */

  const styles = useComponentStyles(
    'Checkbox',
    { variant: groupState?.variant || variant, size: groupState?.size || size },
    { parts: ['container', 'label', 'checkbox'] }
  );

  const { hoverProps, isHovered } = useHover({});
  const { isFocusVisible, focusProps } = useFocusRing();
  const stateProps = useStateProps({
    hover: isHovered,
    focus: isFocusVisible,
    checked: inputProps.checked,
    disabled: inputProps.disabled,
    error: groupState?.error || error,
    readOnly,
    indeterminate,
  });

  return (
    <Box
      as="label"
      variant="checkbox"
      __baseCSS={{
        display: 'flex',
        alignItems: 'center',
        gap: '1ch',
        position: 'relative',
      }}
      css={styles.container}
      {...hoverProps}
      {...stateProps}
    >
      <Box
        as="input"
        type="checkbox"
        css={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: 1,
          opacity: 0.0001,
          '&:hover': {
            cursor: inputProps.disabled ? 'not-allowed' : 'pointer',
          },
        }}
        {...inputProps}
        {...focusProps}
      />
      <Icon
        checked={inputProps.checked}
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
