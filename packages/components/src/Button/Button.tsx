import React from 'react';
import { createStyles, system } from '@marigold/system';

type ButtonProps = {
  variant?: string;
};

const useStyles = createStyles('button');

export const Button = system<ButtonProps, 'button'>(
  ({ variant = 'primary.large', children, ...props }) => {
    const classNames = useStyles({ variant });

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
