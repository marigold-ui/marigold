import React from 'react';
import { Required, SquareUnchecked, SquareChecked } from '@marigold/icons';
import { useStyles } from '@marigold/system';
import { ComponentProps } from '@marigold/types';

import { Box } from '../Box';
import { Label } from '../Label';

// Checkbox Icon
// ---------------
type CheckboxIconProps = {
  className?: string;
  variant?: string;
  checked?: boolean;
  children?: never;
};

const CheckboxIcon: React.FC<CheckboxIconProps> = ({
  className,
  variant,
  checked,
}) => {
  const checkboxIconStyle = useStyles({
    variant: variant,
    css: {
      ariaHidden: 'true',
      mr: 2,
      verticalAlign: 'middle',
      ':hover': { cursor: 'pointer' },
      'input:disabled ~ &': {
        color: 'disabled',
        cursor: 'not-allowed',
      },
    },
    className,
  });

  if (checked) {
    return <SquareChecked className={checkboxIconStyle} />;
  }
  return <SquareUnchecked className={checkboxIconStyle} />;
};

// Checkbox Input
// ---------------
type CheckboxInputProps = {
  variant?: string;
} & ComponentProps<'input'>;

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  className,
  variant = 'default',
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
    <Box display="inline-block">
      <input type="checkbox" className={checkboxStyle} {...props} />
      <CheckboxIcon
        checked={props.checked}
        className={className}
        variant={variant}
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
} & CheckboxInputProps;

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  required,
  ...props
}) => {
  if (label) {
    return (
      <Label htmlFor={props.id}>
        <CheckboxInput {...props} />
        {label}
        {required && <Required size={16} />}
      </Label>
    );
  }

  return <CheckboxInput {...props} />;
};
