import React from 'react';
import { createStyles, system } from '@marigold/system';

type ValidationMessageProps = {
  variant?: string;
};

const useStyles = createStyles('validation');

export const ValidationMessage = system<ValidationMessageProps, 'span'>(
  ({ variant = 'negative', children, ...props }) => {
    const classNames = useStyles({
      variant,
      display: 'flex',
      alignItems: 'center',
    });

    return (
      <span className={classNames} {...props}>
        {children}
      </span>
    );
  }
);
