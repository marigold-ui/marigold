import React from 'react';
import { CircleUnchecked, CircleChecked } from '@marigold/icons';
import { useStyles } from '@marigold/system';
import { ComponentProps } from '@marigold/types';
import { Box } from '../Box';
import { Label } from '../Label';

// Radio Icon
// ---------------
type RadioIconProps = {
  className?: string;
  variant?: string;
  checked?: boolean;
  children?: never;
};

const RadioIcon: React.FC<RadioIconProps> = ({
  className,
  variant,
  checked,
}) => {
  const radioIconStyle = useStyles({
    variant: `form.${variant}`,
    css: {
      ariaHidden: 'true',
      mr: 2,
      verticalAlign: 'middle',
      ':hover': { cursor: 'pointer' },
      'input:disabled ~ &': {
        color: 'muted',
        cursor: 'not-allowed',
      },
    },
    className,
  });

  if (checked) {
    return <CircleChecked className={radioIconStyle} />;
  }
  return <CircleUnchecked className={radioIconStyle} />;
};

// Radio Input
// ---------------
type RadioInputProps = {
  variant?: string;
} & ComponentProps<'input'>;

const RadioInput: React.FC<RadioInputProps> = ({
  className,
  variant = 'radio',
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
    <Box display="inline-block">
      <input type="radio" className={radioStyle} {...props} />
      <RadioIcon
        checked={props.checked}
        className={className}
        variant={variant}
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
} & RadioInputProps;

export const Radio: React.FC<RadioProps> = ({ label, required, ...props }) => {
  if (label) {
    return (
      <Label htmlFor={props.id} required={required}>
        <RadioInput {...props} />
        {label}
      </Label>
    );
  }

  return <RadioInput {...props} />;
};
