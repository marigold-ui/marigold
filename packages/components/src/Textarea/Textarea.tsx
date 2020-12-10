import React from 'react';
import { useStyles, system } from '@marigold/system';

type TextareaProps = {
  variant?: string;
};

export const Textarea = system<TextareaProps, 'textarea'>(
  ({ variant = 'textarea', children, className, ...props }) => {
    const classNames = useStyles(
      {
        variant: `form.${variant}`,
      },
      className
    );
    return (
      <textarea className={classNames} {...props}>
        {children}
      </textarea>
    );
  }
);
