import React from 'react';
import { system, useStyles } from '@marigold/system';
import { ArrowDown } from '@marigold/icons';

export type SelectProps = {};

export const Select = system<SelectProps, 'select'>(
  ({ variant = 'select', className, ref, ...props }) => {
    const selectStyles = useStyles(
      {
        variant: `form.${variant}`,
      },
      className
    );
    const iconStyles = useStyles({
      alignSelf: 'center',
      pointerEvents: 'none',
      ml: '-28px',
    });

    return (
      <div className={useStyles({ display: 'flex' })}>
        <select ref={ref} {...props} className={selectStyles} />
        <ArrowDown className={iconStyles} />
      </div>
    );
  }
);
