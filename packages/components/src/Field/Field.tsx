import React, { useRef } from 'react';
import { useTextField } from '@react-aria/textfield';
import { AriaTextFieldProps } from '@react-types/textfield';

import { Exclamation } from '@marigold/icons';
import { ComponentProps } from '@marigold/types';

import { Input } from '../Input';
import { Label } from '../Label';
import { ValidationMessage } from '../ValidationMessage';

// Props
// ---------------
export type FieldProps = {
  variant?: string;
  labelVariant?: string;
  htmlFor: string;
  label: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
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
  disabled,
  ...props
}) => {
  const { label } = props;
  const ref = useRef<HTMLInputElement>(null);
  const { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(props, ref);
  return (
    <>
      <Label
        variant={labelVariant}
        htmlFor={htmlFor}
        required={required}
        {...labelProps}
      >
        {label}
      </Label>
      <Input
        {...props}
        {...inputProps}
        type={type}
        id={htmlFor}
        disabled={disabled}
        variant={variant}
      />
      {error && errorMessage && (
        <ValidationMessage>
          <Exclamation size={16} />
          {errorMessage}
        </ValidationMessage>
      )}
    </>
  );
};
