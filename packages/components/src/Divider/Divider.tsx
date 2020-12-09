import React from 'react';
import { useStyles, system } from '@marigold/system';

type DividerProps = {
  variant?: string;
};

export const Divider = system<DividerProps, 'hr'>(
  ({ variant = 'regular', className, ...props }) => {
    const classNames = useStyles(
      {
        variant: `divider.${variant}`,
      },
      className
    );
    return <hr className={classNames} {...props} />;
  }
);
