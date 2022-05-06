import React, { useRef } from 'react';
import { useHover } from '@react-aria/interactions';
import { useFocusRing } from '@react-aria/focus';
import { useTextField } from '@react-aria/textfield';
import { AriaTextFieldProps } from '@react-types/textfield';

import { useStateProps } from '@marigold/system';
import { ComponentProps } from '@marigold/types';

import { FieldBase, FieldBaseProps } from '../FieldBase';
import { Input } from '../Input';

// Props
// ---------------
export interface TextFieldProps
  extends Omit<
      ComponentProps<'input'>,
      'value' | 'defaultValue' | 'onChange' | 'onFocus' | 'onBlur' | 'size'
    >,
    /**
     * `react-aria` has a slightly different API for `onChange`, `onFocus`
     * and `onBlur` events. Thus, we adjust our regular props to match them.
     */
    Pick<AriaTextFieldProps, 'onChange' | 'onFocus' | 'onBlur'>,
    Pick<FieldBaseProps, 'label' | 'description' | 'error' | 'errorMessage'> {
  variant?: string;
  size?: string;
  value?: string;
  defaultValue?: string;
}

// Component
// ---------------
export const TextField = ({
  disabled,
  required,
  readOnly,
  error,
  variant,
  size,
  ...props
}: TextFieldProps) => {
  const { label, description, errorMessage } = props;

  const ref = useRef<HTMLInputElement>(null);
  const { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(
      {
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
      <Input
        ref={ref}
        variant={variant}
        size={size}
        /**
         * We use `size` for styles which is a string, not like
         * the regular HTML attribute, which is a number
         */
        {...(inputProps as any)}
        {...focusProps}
        {...hoverProps}
        {...stateProps}
      />
    </FieldBase>
  );
};
