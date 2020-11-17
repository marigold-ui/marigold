import React from 'react';
import { createStyles, system } from '@marigold/system';

type InputProps = {
  variant?: string;
};

const useStyles = createStyles('form');

export const Input = system<InputProps, 'input'>(
  ({ variant = 'input', type = 'text', children, ...props }) => {
    const classNames = useStyles({ variant, border: 0 });

    return (
      <input type={type} className={classNames} {...props}>
        {children}
      </input>
    );
  }
);
