import React from 'react';
import { createStyles, system } from '@marigold/system';
import { SquareUnchecked, SquareChecked } from '@marigold/icons';

type CheckboxProps = {
  variant?: string;
};

const useStyles = createStyles('form');

export const Checkbox = system<CheckboxProps, 'input'>(
  ({ variant = 'checkbox', ...props }) => {
    const checkboxStyle = useStyles({
      position: 'absolute',
      opacity: 0,
      zIndex: -1,
      width: 1,
      height: 1,
      overflow: 'hidden',
    });
    const checkboxIconStyle = useStyles({
      variant,
      ariaHidden: 'true',
      mr: 2,
      verticalAlign: 'middle',
      ':hover': { cursor: 'pointer' },
      'input:disabled ~ &': {
        color: 'muted',
        cursor: 'not-allowed',
      },
    });

    return (
      <div className={useStyles({ display: 'inline-block' })}>
        <input type="checkbox" className={checkboxStyle} {...props} />
        {props.checked ? (
          <SquareChecked className={checkboxIconStyle} />
        ) : (
          <SquareUnchecked className={checkboxIconStyle} />
        )}
      </div>
    );
  }
);
