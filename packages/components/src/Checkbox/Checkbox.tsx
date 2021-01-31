import React from 'react';
import { useStyles, system } from '@marigold/system';
import { Required, SquareUnchecked, SquareChecked } from '@marigold/icons';
import { Label } from '@marigold/components';

type CheckboxProps = {
  id: string;
  variant?: string;
  label?: string;
  required?: boolean;
};

export const Checkbox = system<CheckboxProps, 'input'>(
  ({ id, variant = 'checkbox', label, required, className, ...props }) => {
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
      <div className={useStyles({ display: 'inline-block' })}>
        <input type="checkbox" id={id} className={checkboxStyles} {...props} />
        {props.checked ? (
          <SquareChecked className={checkboxIconStyles} />
        ) : (
          <SquareUnchecked className={checkboxIconStyles} />
        )}
      </div>
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
  }
);
