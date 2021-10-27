import React from 'react';
import { useStyles } from '@marigold/system';
import { ComponentProps } from '@marigold/types';
import { Exclamation } from '@marigold/icons';

import { Box } from '../Box';
import { Label } from '../Label';
import { ValidationMessage } from '../ValidationMessage';

import { RadioChecked, RadioUnchecked } from './RadioIcons';

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
  const radioIconStyle = useStyles({
    variant: `radio.${variant}`,
  });

  if (checked) {
    return <RadioChecked className={radioIconStyle} disabled={disabled} />;
  }
  return (
    <RadioUnchecked
      className={radioIconStyle}
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
  variant = 'default',
  error,
  ...props
}) => {
  const radioStyle = useStyles({
    css: {
      position: 'absolute',
      opacity: 0,
      zIndex: -1,
      width: 1,
      height: 1,
      overflow: 'hidden',
    },
  });

  return (
    <Box display="inline-block" className={className}>
      <input type="radio" className={radioStyle} {...props} />
      <RadioIcon
        checked={props.checked}
        variant={variant}
        disabled={props.disabled}
        error={error}
      />
    </Box>
  );
};

// Radio
// ---------------
export type RadioProps = {
  id: string;
  label?: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
} & RadioInputProps;

export const Radio: React.FC<RadioProps> = ({
  label,
  required,
  error,
  errorMessage,
  ...props
}) => {
  const labeledRadioStyle = useStyles({
    css: {
      pr: '8px',
    },
  });

  if (label) {
    return (
      <>
        <Label
          htmlFor={props.id}
          required={required}
          variant={props.disabled ? 'disabled' : 'inline'}
        >
          <RadioInput className={labeledRadioStyle} error={error} {...props} />
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
