import React from 'react';
import { useStyles, system } from '@marigold/system';

export type InputProps = {
  variant?: string;
};

export const Input = system<InputProps, 'input'>(
  ({ variant = 'input', type = 'text', className, ...props }) => {
    const classNames = useStyles(
      {
        variant: `form.${variant}`,
        border: 0,
      },
      className
    );

    return <input type={type} className={classNames} {...props} />;
  }
);
