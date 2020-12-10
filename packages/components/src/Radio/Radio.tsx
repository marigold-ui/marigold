import React from 'react';
import { useStyles, system } from '@marigold/system';
import { CircleUnchecked, CircleChecked } from '@marigold/icons';

type RadioProps = {
  variant?: string;
};

export const Radio = system<RadioProps, 'input'>(
  ({ variant = 'radio', className, ...props }) => {
    const radioStyle = useStyles({
      position: 'absolute',
      opacity: 0,
      zIndex: -1,
      width: 1,
      height: 1,
      overflow: 'hidden',
    });
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

    return (
      <div className={useStyles({ display: 'inline-block' })}>
        <input type="radio" className={radioStyle} {...props} />
        {props.checked ? (
          <CircleChecked className={radioIconStyle} />
        ) : (
          <CircleUnchecked className={radioIconStyle} />
        )}
      </div>
    );
  }
);
