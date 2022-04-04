import React, { useRef } from 'react';
import { useTextField } from '@react-aria/textfield';
import { AriaTextFieldProps } from '@react-types/textfield';

import { Box } from '@marigold/system';
import { ComponentProps } from '@marigold/types';

import { Field, FieldProps } from '../Field';

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
      'value' | 'defaultValue' | CustomTextAreEvents
    >,
    Pick<AriaTextFieldProps, CustomTextAreEvents>,
    Pick<FieldProps, 'label' | 'description' | 'error' | 'errorMessage'> {
  value?: string;
  defaultValue?: string;
}

export const TextArea = ({
  disabled,
  required,
  readOnly,
  error,
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

  return (
    <Field
      label={label}
      labelProps={labelProps}
      required={required}
      description={description}
      descriptionProps={descriptionProps}
      error={error}
      errorMessage={errorMessage}
      errorMessageProps={errorMessageProps}
    >
      <Box as="textarea" variant="input" ref={ref} {...inputProps} />
    </Field>
  );
};
