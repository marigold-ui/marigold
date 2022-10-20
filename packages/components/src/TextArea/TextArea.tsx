import React, { forwardRef } from 'react';
import { useHover } from '@react-aria/interactions';
import { useFocusRing } from '@react-aria/focus';
import { useTextField } from '@react-aria/textfield';
import { useObjectRef } from '@react-aria/utils';
import { AriaTextFieldProps } from '@react-types/textfield';

import {
  Box,
  ThemeExtension,
  useComponentStyles,
  useStateProps,
} from '@marigold/system';
import { ComponentProps } from '@marigold/types';

import { FieldBase, FieldBaseProps } from '../FieldBase';

// Theme Extension
// ---------------
export interface TextAreaThemeExtension extends ThemeExtension<'TextArea'> {}

// Props
// ---------------
/**
 * `react-aria` has a slightly different API for the above events.
 * Thus, we adjust our regular props to match them.
 */
export type CustomTextAreaEvents =
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
  | 'onInput'
  | 'onKeyDown'
  | 'onKeyUp';

export interface TextAreaProps
  extends Omit<
      ComponentProps<'textarea'>,
      'value' | 'defaultValue' | 'size' | CustomTextAreaEvents
    >,
    Pick<AriaTextFieldProps, CustomTextAreaEvents>,
    Pick<
      FieldBaseProps,
      'label' | 'description' | 'error' | 'errorMessage' | 'side'
    > {
  variant?: string;
  size?: string;
  width?: string;
  value?: string;
  defaultValue?: string;
}

// Component
// ---------------
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      variant,
      size,
      width,
      disabled,
      required,
      readOnly,
      error,
      rows,
      side,
      ...props
    },
    ref
  ) => {
    const { label, description, errorMessage } = props;
    const textAreaRef = useObjectRef(ref);

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
        textAreaRef
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
        width={width}
        side={side}
      >
        <Box
          as="textarea"
          css={styles}
          ref={textAreaRef}
          rows={rows}
          {...inputProps}
          {...focusProps}
          {...hoverProps}
          {...stateProps}
        />
      </FieldBase>
    );
  }
);
