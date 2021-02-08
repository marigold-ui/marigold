import React from 'react';
import { useStyles, system } from '@marigold/system';

type HiddenProps = {
  show?: boolean;
};

export const Hidden = system<HiddenProps, 'span'>(
  ({ show = false, className, children, ...props }) => {
    const classNames = useStyles(
      {
        display: show ? 'display' : 'none',
      },
      className
    );

    return (
      <span className={classNames} {...props}>
        {children}
      </span>
    );
  }
);
