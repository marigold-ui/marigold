import React from 'react';
import { useStyles, system } from '@marigold/system';
import { SquareUnchecked, SquareChecked } from '@marigold/icons';

type CheckboxProps = {
  variant?: string;
};

export const Checkbox = system<CheckboxProps, 'input'>(
  ({ variant = 'checkbox', className, ...props }) => {
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

    return (
      <div className={useStyles({ display: 'inline-block' })}>
        <input type="checkbox" className={checkboxStyles} {...props} />
        {props.checked ? (
          <SquareChecked className={checkboxIconStyles} />
        ) : (
          <SquareUnchecked className={checkboxIconStyles} />
        )}
      </div>
    );
  }
);
