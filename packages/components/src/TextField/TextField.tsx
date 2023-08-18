import React, { forwardRef } from 'react';

import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { useTextField } from '@react-aria/textfield';
import { mergeProps, useObjectRef } from '@react-aria/utils';

import { AriaTextFieldProps } from '@react-types/textfield';

import { WidthProp, useStateProps } from '@marigold/system';
import { HtmlProps } from '@marigold/types';

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
      HtmlProps<'input'>,
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
  width?: WidthProp['width'];
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
    const { focusProps, isFocused } = useFocusRing({
      isTextInput: true,
      autoFocus,
    });
    const stateProps = useStateProps({
      hover: isHovered,
      focus: isFocused,
      disabled,
      error,
      readOnly,
      required,
    });

    return (
      <FieldBase
        label={label}
        labelProps={labelProps}
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
          {...mergeProps(focusProps, inputProps as any, hoverProps)}
        />
      </FieldBase>
    );
  }
);
