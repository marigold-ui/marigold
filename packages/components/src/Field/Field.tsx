import React, { useRef } from 'react';
import { useTextField } from '@react-aria/textfield';
import { AriaTextFieldProps } from '@react-types/textfield';

import { Exclamation } from '@marigold/icons';
import { ComponentProps } from '@marigold/types';

import { Box } from '../Box';
import { Label } from '../Label';
import { ValidationMessage } from '../ValidationMessage';

// Props
// ---------------
export type FieldProps = {
  variant?: string;
  labelVariant?: string;
  htmlFor: string;
  required?: boolean;
  error?: boolean;
} & AriaTextFieldProps &
  ComponentProps<'input'>;

// Component
// ---------------
export const Field: React.FC<FieldProps> = ({
  type = 'text',
  variant = '',
  labelVariant = 'above',
  htmlFor,
  required,
  error,
  errorMessage,
  ...props
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const { labelProps, inputProps, errorMessageProps } = useTextField(
    props,
    ref
  );
  return (
    <>
      <Label
        variant={labelVariant}
        htmlFor={htmlFor}
        required={required}
        {...labelProps}
      >
        {props.label}
      </Label>
      <Box
        as="input"
        type={type}
        id={htmlFor}
        variant={`input.${variant}`}
        {...inputProps}
        ref={ref}
        {...props}
      />
      {error && errorMessage && (
        <ValidationMessage {...errorMessageProps}>
          <Exclamation size={16} />
          {errorMessage}
        </ValidationMessage>
      )}
    </>
  );
};
