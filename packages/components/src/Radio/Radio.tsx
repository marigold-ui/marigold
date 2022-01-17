import React from 'react';
import { ComponentProps } from '@marigold/types';
import { Exclamation } from '@marigold/icons';

import { Box } from '../Box';
import { Label } from '../Label';
import { ValidationMessage } from '../ValidationMessage';

import { RadioChecked, RadioUnchecked } from './RadioIcons';

// Theme Extension
// ---------------
export interface RadioThemeExtension<Value> {
  radio?: {
    [key: string]: Value;
  };
}

// Radio Icon
// ---------------
type RadioIconProps = {
  variant?: string;
  checked?: boolean;
  disabled?: boolean;
  error?: boolean;
  children?: never;
};

const RadioIcon: React.FC<RadioIconProps> = ({
  variant,
  checked,
  disabled,
  error,
}) => {
  if (checked) {
    return (
      <Box as={RadioChecked} variant={`radio.${variant}`} disabled={disabled} />
    );
  }
  return (
    <Box
      as={RadioUnchecked}
      variant={`radio.${variant}`}
      disabled={disabled}
      error={error}
    />
  );
};

// Radio Input
// ---------------
type RadioInputProps = {
  variant?: string;
  error?: boolean;
} & ComponentProps<'input'>;

const RadioInput: React.FC<RadioInputProps> = ({
  className,
  variant = '',
  error,
  ...props
}) => (
  <Box display="inline-block" className={className}>
    <Box
      as="input"
      type="radio"
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
    <RadioIcon
      checked={props.checked}
      variant={variant}
      disabled={props.disabled}
      error={error}
    />
  </Box>
);

// Radio
// ---------------
export type RadioProps = {
  id: string;
  label?: string;
  required?: boolean;
  labelVariant?: string;
  error?: boolean;
  errorMessage?: string;
} & RadioInputProps;

export const Radio: React.FC<RadioProps> = ({
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
          <Box as={RadioInput} pr="8px" error={error} {...props} />
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

  return <RadioInput {...props} />;
};
