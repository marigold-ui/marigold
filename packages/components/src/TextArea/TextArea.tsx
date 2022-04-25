import React, { useRef } from 'react';
import { useTextField } from '@react-aria/textfield';
import { AriaTextFieldProps } from '@react-types/textfield';

import {
  Box,
  ThemeExtension,
  useComponentStyles,
  useStateProps,
} from '@marigold/system';
import { ComponentProps } from '@marigold/types';

import { FieldBase, FieldBaseProps } from '../Field';
import { useHover } from '@react-aria/interactions';
import { useFocusRing } from '@react-aria/focus';

// Theme Extension
// ---------------
export interface TextAreaThemeExtension extends ThemeExtension<'TextArea'> {}

// Props
// ---------------
/**
 * `react-aria` has a slightly different API for the above events.
 * Thus, we adjust our regular props to match them.
 */
export type CustomTextAreEvents =
  | 'onChange'
  | 'onFocus'
  | 'onBlur'
  | 'onCopy'
  | 'onSelect'
  | 'onPaste'
  | 'onCut'
  | 'onCompositionStart'
  | 'onCompositionUpdate'
  | 'onCompositionEnd'
  | 'onBeforeInput'
  | 'onInput';

export interface TextAreaProps
  extends Omit<
      ComponentProps<'textarea'>,
      'value' | 'defaultValue' | CustomTextAreEvents | 'size'
    >,
    Pick<AriaTextFieldProps, CustomTextAreEvents>,
    Pick<FieldBaseProps, 'label' | 'description' | 'error' | 'errorMessage'> {
  variant?: string;
  size?: string;
  value?: string;
  defaultValue?: string;
}

// Component
// ---------------
export const TextArea = ({
  disabled,
  required,
  readOnly,
  error,
  variant,
  size,
  ...props
}: TextAreaProps) => {
  const { label, description, errorMessage } = props;
  const ref = useRef<HTMLTextAreaElement>(null);

  const { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(
      {
        inputElementType: 'textarea',
        isDisabled: disabled,
        isRequired: required,
        isReadOnly: readOnly,
        validationState: error ? 'invalid' : 'valid',
        ...props,
      },
      ref
    );

  const { hoverProps, isHovered } = useHover({});
  const { focusProps, isFocusVisible } = useFocusRing();
  const stateProps = useStateProps({
    hover: isHovered,
    focus: isFocusVisible,
    disabled,
    readOnly,
    error,
  });

  const styles = useComponentStyles('TextArea', { variant, size });
  return (
    <FieldBase
      label={label}
      labelProps={labelProps}
      required={required}
      description={description}
      descriptionProps={descriptionProps}
      error={error}
      errorMessage={errorMessage}
      errorMessageProps={errorMessageProps}
      stateProps={stateProps}
      variant={variant}
      size={size}
    >
      <Box
        as="textarea"
        css={styles}
        ref={ref}
        {...inputProps}
        {...focusProps}
        {...hoverProps}
        {...stateProps}
      />
    </FieldBase>
  );
};
