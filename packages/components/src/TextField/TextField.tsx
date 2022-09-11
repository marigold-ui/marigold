import React, { forwardRef } from 'react';
import { useHover } from '@react-aria/interactions';
import { useFocusRing } from '@react-aria/focus';
import { useTextField } from '@react-aria/textfield';
import { useObjectRef } from '@react-aria/utils';
import { AriaTextFieldProps } from '@react-types/textfield';

import { useStateProps } from '@marigold/system';
import { ComponentProps } from '@marigold/types';

import { FieldBase, FieldBaseProps } from '../FieldBase';
import { Input } from '../Input';

// Props
// ---------------
/**
 * `react-aria` has a slightly different API for the above events.
 * Thus, we adjust our regular props to match them.
 */
export type CustomTextFieldEvents =
  | 'onChange'
  | 'onFocus'
  | 'onBlur'
  | 'onKeyDown'
  | 'onKeyUp';

export interface TextFieldProps
  extends Omit<
      ComponentProps<'input'>,
      'value' | 'defaultValue' | 'size' | 'width' | CustomTextFieldEvents
    >,
    /**
     * `react-aria` has a slightly different API for `onChange`, `onFocus`
     * and `onBlur` events. Thus, we adjust our regular props to match them.
     */
    Pick<AriaTextFieldProps, CustomTextFieldEvents>,
    Pick<FieldBaseProps, 'label' | 'description' | 'error' | 'errorMessage'> {
  variant?: string;
  size?: string;
  width?: string;
  value?: string;
  defaultValue?: string;
}

// Component
// ---------------
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    { variant, size, width, disabled, required, readOnly, error, ...props },
    ref
  ) => {
    const { label, description, errorMessage, autoFocus } = props;

    const inputRef = useObjectRef(ref);
    const { labelProps, inputProps, descriptionProps, errorMessageProps } =
      useTextField(
        {
          isDisabled: disabled,
          isRequired: required,
          isReadOnly: readOnly,
          validationState: error ? 'invalid' : 'valid',
          ...props,
        },
        inputRef
      );

    const { hoverProps, isHovered } = useHover({});
    const { focusProps, isFocusVisible } = useFocusRing({
      isTextInput: true,
      autoFocus,
    });
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
        width={width}
      >
        <Input
          ref={inputRef}
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
  }
);
