import React from 'react';
import { Exclamation } from '@marigold/icons';
import { ComponentProps } from '@marigold/types';

import { Input } from '../Input';
import { Label } from '../Label';
import { ValidationMessage } from '../ValidationMessage';

// Props
// ---------------
export type FieldProps = {
  htmlFor: string;
  label: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
} & ComponentProps<'input'>;

// Component
// ---------------
export const Field: React.FC<FieldProps> = ({
  type = 'text',
  className,
  htmlFor,
  label,
  required,
  error,
  errorMessage,
  disabled,
  ...props
}) => {
  return (
    <>
      <Label
        variant={disabled ? 'disabled' : 'above'}
        htmlFor={htmlFor}
        required={required}
      >
        {label}
      </Label>
      <Input
        {...props}
        type={type}
        id={htmlFor}
        disabled={disabled}
        variant={error ? 'error' : 'default'}
        className={className}
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
