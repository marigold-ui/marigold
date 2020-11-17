import React from 'react';
import { createStyles, system } from '@marigold/system';

type AlertProps = {
  variant?: 'info' | 'danger' | 'warning' | 'success';
};

const useStyles = createStyles('alerts');

export const Alert = system<AlertProps, 'div'>(
  ({ variant = 'info', ref, children, ...props }) => {
    const classNames = useStyles({
      variant,
      display: 'flex',
      alignItems: 'center',
      px: 3,
      py: 2,
      borderRadius: 4,
    });

    return (
      <div className={classNames} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);
