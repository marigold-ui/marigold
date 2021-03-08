import React from 'react';
import { useStyles, system } from '@marigold/system';

export type ValidationMessageProps = {
  variant?: string;
};

export const ValidationMessage = system<ValidationMessageProps, 'span'>(
  ({ variant = 'negative', children, className, ...props }) => {
    const classNames = useStyles(
      {
        variant: `validation.${variant}`,
        display: 'flex',
        alignItems: 'center',
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
