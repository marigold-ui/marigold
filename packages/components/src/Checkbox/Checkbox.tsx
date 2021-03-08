import React from 'react';
import { Required, SquareUnchecked, SquareChecked } from '@marigold/icons';
import { useStyles } from '@marigold/system';
import { ComponentProps } from '@marigold/types';

import { Box } from '../Box';
import { Label } from '../Label';

export type CheckboxProps = {
  id: string;
  variant?: string;
  label?: string;
} & Omit<ComponentProps<'input'>, 'type' | 'id'>;

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  variant = 'checkbox',
  label,
  required,
  className,
  ...props
}) => {
  const checkboxStyles = useStyles({
    position: 'absolute',
    opacity: 0,
    zIndex: -1,
    width: 1,
    height: 1,
    overflow: 'hidden',
  });

  const checkboxIconStyles = useStyles(
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

  const checkbox = (
    <Box display="inline-block">
      <input type="checkbox" className={checkboxStyles} {...props} />
      {props.checked ? (
        <SquareChecked className={checkboxIconStyles} />
      ) : (
        <SquareUnchecked className={checkboxIconStyles} />
      )}
    </Box>
  );

  return (
    <>
      {label ? (
        <Label htmlFor={id}>
          {checkbox}
          {label}
          {required ? <Required size={16} /> : ''}
        </Label>
      ) : (
        <>{checkbox}</>
      )}
    </>
  );
};
