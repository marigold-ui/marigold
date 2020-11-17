import React from 'react';
import { createStyles, system } from '@marigold/system';

type TextareaProps = {
  variant?: string;
};

const useStyles = createStyles('form');

export const Textarea = system<TextareaProps, 'textarea'>(
  ({ variant = 'textarea', children, ...props }) => {
    const classNames = useStyles({ variant });

    return (
      <textarea className={classNames} {...props}>
        {children}
      </textarea>
    );
  }
);
