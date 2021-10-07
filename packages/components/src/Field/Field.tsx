import React from 'react';
import { Exclamation } from '@marigold/icons';
import { ComponentProps } from '@marigold/types';

import { Input } from '../Input';
import { Label } from '../Label';
import { ValidationMessage } from '../ValidationMessage';

export type ErrorProps =
  | { error?: false; errorMessage?: never }
  | { error: true; errorMessage?: string };

export type FieldProps = {
  htmlFor: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
} & ErrorProps &
  ComponentProps<'input'>;

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
        required={error || required}
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
