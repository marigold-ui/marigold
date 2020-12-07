import React from 'react';
import { useStyles, system } from '@marigold/system';

type AlertProps = {
  variant?: string;
};

export const Alert = system<AlertProps, 'div'>(
  ({ variant = 'info', className, children, ...props }) => {
    const classNames = useStyles(
      {
        variant: `alerts.${variant}`,
        display: 'flex',
        alignItems: 'center',
        px: 3,
        py: 2,
        borderRadius: 4,
      },
      className
    );

    return (
      <div className={classNames} {...props}>
        {children}
      </div>
    );
  }
);
