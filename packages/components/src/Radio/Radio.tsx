import React from 'react';
import { CircleUnchecked, CircleChecked, Required } from '@marigold/icons';
import { useStyles } from '@marigold/system';
import { ComponentProps } from '@marigold/types';
import { Label } from '../Label';

type RadioIconProps = {
  className?: string;
  variant?: string;
  checked?: boolean;
  children?: never;
};

// Radio Icon
// ---------------
const RadioIcon: React.FC<RadioIconProps> = ({
  className,
  variant,
  checked,
}) => {
  const radioIconStyle = useStyles(
    {
      variant: `form.${variant}`,
      ariaHidden: 'true',
      mr: 2,
      verticalAlign: 'middle',
      ':hover': { cursor: 'pointer' },
      'input:disabled ~ &': {
        color: 'muted',
        cursor: 'not-allowed',
      },
    },
    className
  );

  if (checked) {
    return <CircleChecked className={radioIconStyle} />;
  }
  return <CircleUnchecked className={radioIconStyle} />;
};

// Radio
// ---------------
export type RadioProps = {
  id: string;
  variant?: string;
  label?: string;
  required?: boolean;
} & ComponentProps<'input'>;

export const Radio: React.FC<RadioProps> = ({
  id,
  variant = 'radio',
  label,
  required,
  className,
  ...props
}) => {
  const radioStyle = useStyles({
    position: 'absolute',
    opacity: 0,
    zIndex: -1,
    width: 1,
    height: 1,
    overflow: 'hidden',
  });

  const radio = (
    <div className={useStyles({ display: 'inline-block' })}>
      <input type="radio" id={id} className={radioStyle} {...props} />
      <RadioIcon
        checked={props.checked}
        className={className}
        variant={variant}
      />
    </div>
  );

  if (label) {
    return (
      <Label htmlFor={id}>
        {radio}
        {label}
        {required && <Required size={16} />}
      </Label>
    );
  }

  return <>{radio}</>;
};
