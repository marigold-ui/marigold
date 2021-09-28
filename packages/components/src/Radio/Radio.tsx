import React from 'react';
import { useStyles } from '@marigold/system';
import { ComponentProps } from '@marigold/types';
import { Box } from '../Box';
import { Label } from '../Label';

import { RadioChecked, RadioUnchecked } from './RadioIcons';

// Radio Icon
// ---------------
type RadioIconProps = {
  className?: string;
  variant?: string;
  checked?: boolean;
  disabled?: boolean;
  children?: never;
};

const RadioIcon: React.FC<RadioIconProps> = ({
  className,
  variant,
  checked,
  disabled,
}) => {
  const radioIconStyle = useStyles({
    variant: `radio.${variant}`,
    className,
  });

  if (checked) {
    return <RadioChecked className={radioIconStyle} disabled={disabled} />;
  }
  return <RadioUnchecked className={radioIconStyle} disabled={disabled} />;
};

// Radio Input
// ---------------
type RadioInputProps = {
  variant?: string;
} & ComponentProps<'input'>;

const RadioInput: React.FC<RadioInputProps> = ({
  className,
  variant = 'default',
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
      <RadioIcon checked={props.checked} variant={variant} />
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
  const labeledRadioStyle = useStyles({
    css: {
      pr: '8px',
    },
  });

  if (label) {
    return (
      <Label htmlFor={props.id} required={required} variant="inline">
        <RadioInput className={labeledRadioStyle} {...props} />
        {label}
      </Label>
    );
  }

  return <RadioInput {...props} />;
};
