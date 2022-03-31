import React, { useRef } from 'react';
import { useTextField } from '@react-aria/textfield';
import { AriaTextFieldProps } from '@react-types/textfield';

import { Box } from '@marigold/system';
import { ComponentProps } from '@marigold/types';

import { Field, FieldProps } from './Field';

export interface TextFieldProps
  extends Omit<
      ComponentProps<'input'>,
      'value' | 'defaultValue' | 'onChange' | 'onFocus' | 'onBlur'
    >,
    /**
     * `react-aria` has a slightly different API for `onChange`, `onFocus`
     * and `onBlur` events. Thus, we adjust our regular props to match them.
     */
    Pick<AriaTextFieldProps, 'onChange' | 'onFocus' | 'onBlur'>,
    Pick<FieldProps, 'label' | 'description' | 'error' | 'errorMessage'> {
  value?: string;
  defaultValue?: string;
}

export const TextField = ({
  disabled,
  required,
  readOnly,
  error,
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

  return (
    <Field
      label={label}
      labelProps={labelProps}
      description={description}
      descriptionProps={descriptionProps}
      error={error}
      errorMessage={errorMessage}
      errorMessageProps={errorMessageProps}
    >
      <Box as="input" variant="input" ref={ref} {...inputProps} />
    </Field>
  );
};
