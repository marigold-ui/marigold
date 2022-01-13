import React from 'react';
import { ComponentProps } from '@marigold/types';
import { Exclamation } from '@marigold/icons';

import { CheckboxChecked, CheckboxUnchecked } from './CheckboxIcons';

import { Box } from '../Box';
import { Label } from '../Label';
import { ValidationMessage } from '../ValidationMessage';

// Theme Extension
// ---------------
export interface CheckboxThemeExtension<Value> {
  checkbox?: {
    [key: string]: Value;
  };
}

// Checkbox Icon
// ---------------
type CheckboxIconProps = {
  variant?: string;
  checked?: boolean;
  disabled?: boolean;
  children?: never;
  error?: boolean;
};

const CheckboxIcon: React.FC<CheckboxIconProps> = ({
  variant,
  checked,
  disabled,
  error,
}) => {
  if (checked) {
    return (
      <Box
        as={CheckboxChecked}
        variant={`checkbox.${variant}`}
        disabled={disabled}
      />
    );
  }
  return (
    <Box
      as={CheckboxUnchecked}
      variant={`checkbox.${variant}`}
      disabled={disabled}
      error={error}
    />
  );
};

// Checkbox Input
// ---------------
type CheckboxInputProps = {
  variant?: string;
  error?: boolean;
} & ComponentProps<'input'>;

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  className,
  variant = '',
  error,
  ...props
}) => (
  <Box display="inline-block" className={className}>
    <Box
      as="input"
      type="checkbox"
      css={{
        position: 'absolute',
        opacity: 0,
        zIndex: -1,
        width: 1,
        height: 1,
        overflow: 'hidden',
      }}
      {...props}
    />
    <CheckboxIcon
      checked={props.checked}
      variant={variant}
      disabled={props.disabled}
      error={error}
    />
  </Box>
);

// Checkbox
// ---------------
export type CheckboxProps = {
  id: string;
  label?: string;
  required?: boolean;
  labelVariant?: string;
  error?: boolean;
  errorMessage?: string;
} & CheckboxInputProps;

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  required,
  labelVariant = 'inline',
  error,
  errorMessage,
  ...props
}) => {
  if (label) {
    return (
      <>
        <Label
          htmlFor={props.id}
          required={required}
          variant={labelVariant}
          color={props.disabled ? 'disabled' : 'text'}
        >
          <Box as={CheckboxInput} pr="8px" error={error} {...props} />
          {label}
        </Label>
        {error && errorMessage && (
          <ValidationMessage>
            <Exclamation size={16} />
            {errorMessage}
          </ValidationMessage>
        )}
      </>
    );
  }

  return <CheckboxInput {...props} />;
};
