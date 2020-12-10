import React from 'react';
import { useStyles, system } from '@marigold/system';

type HiddenProps = {
  variant?: string;
  show?: boolean;
};

export const Hidden = system<HiddenProps, 'span'>(
  ({ variant = 'hidden', show = false, className, children, ...props }) => {
    const classNames = useStyles(
      {
        variant: `layout.${variant}`,
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
