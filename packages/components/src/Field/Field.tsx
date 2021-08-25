import React from 'react';
import { Exclamation } from '@marigold/icons';
import { ComponentProps } from '@marigold/types';

import { Input } from '../Input';
import { Label } from '../Label';
import { ValidationMessage } from '../ValidationMessage';

export type FieldProps = {
  htmlFor: string;
  label: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
} & ComponentProps<'input'>;

export const Field: React.FC<FieldProps> = ({
  type = 'text',
  className,
  htmlFor,
  label,
  required,
  error,
  disabled,
  ...props
}) => {
  return (
    <>
      <Label
        variant={disabled ? 'disabled' : 'above'}
        htmlFor={htmlFor}
        required={required || error ? true : false}
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
      {error && (
        <ValidationMessage>
          <Exclamation size={16} />
          {error}
        </ValidationMessage>
      )}
    </>
  );
};
