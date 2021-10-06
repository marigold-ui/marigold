import React from 'react';
import { useStyles } from '@marigold/system';
import { ComponentProps } from '@marigold/types';
import { Exclamation } from '@marigold/icons';

import { CheckboxChecked, CheckboxUnchecked } from './CheckboxIcons';

import { Box } from '../Box';
import { Label } from '../Label';
import { ValidationMessage } from '../ValidationMessage';

// Checkbox Icon
// ---------------
type CheckboxIconProps = {
  variant?: string;
  checked?: boolean;
  disabled?: boolean;
  children?: never;
  error?: string;
};

const CheckboxIcon: React.FC<CheckboxIconProps> = ({
  variant,
  checked,
  disabled,
  error,
}) => {
  const checkboxIconStyle = useStyles({
    variant: `checkbox.${variant}`,
  });

  if (checked) {
    return (
      <CheckboxChecked className={checkboxIconStyle} disabled={disabled} />
    );
  }
  return (
    <CheckboxUnchecked
      className={checkboxIconStyle}
      disabled={disabled}
      error={error}
    />
  );
};

// Checkbox Input
// ---------------
type CheckboxInputProps = {
  variant?: string;
  error?: string;
} & ComponentProps<'input'>;

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  className,
  variant = 'default',
  error,
  ...props
}) => {
  const checkboxStyle = useStyles({
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
      <input type="checkbox" className={checkboxStyle} {...props} />
      <CheckboxIcon
        checked={props.checked}
        variant={variant}
        disabled={props.disabled}
        error={error}
      />
    </Box>
  );
};

// Checkbox
// ---------------
export type CheckboxProps = {
  id: string;
  label?: string;
  required?: boolean;
  error?: string;
} & CheckboxInputProps;

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  required,
  error,
  ...props
}) => {
  const labeledCheckboxStyle = useStyles({
    css: {
      pr: '8px',
    },
  });

  if (label) {
    return (
      <>
        <Label
          htmlFor={props.id}
          required={(error && true) || required}
          variant={props.disabled ? 'disabled' : 'inline'}
        >
          <CheckboxInput
            className={labeledCheckboxStyle}
            error={error}
            {...props}
          />
          {label}
        </Label>
        {error && (
          <ValidationMessage>
            <Exclamation size={16} />
            {error}
          </ValidationMessage>
        )}
      </>
    );
  }

  return <CheckboxInput {...props} />;
};
