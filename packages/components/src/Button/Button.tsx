import React from 'react';
import { useStyles, system } from '@marigold/system';

type ButtonProps = {
  variant?: string;
};

export const Button = system<ButtonProps, 'button'>(
  ({ variant = 'primary.large', className, children, ...props }) => {
    const classNames = useStyles(
      {
        variant: `button.${variant}`,
      },
      className
    );
    return (
      <button className={classNames} {...props}>
        <span
          className={useStyles({
            display: 'inline-flex',
            alignItems: 'center',
          })}
        >
          {children}
        </span>
      </button>
    );
  }
);
