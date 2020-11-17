import React from 'react';
import { system, createStyles } from '@marigold/system';

type TextProps = {
  variant?: string;
  htmlFor: string;
};

const useStyles = createStyles('form');

export const Label = system<TextProps, 'label'>(
  ({ variant = 'label', htmlFor, children, ...props }) => {
    const classNames = useStyles({ variant });

    return (
      <label htmlFor={htmlFor} className={classNames} {...props}>
        {children}
      </label>
    );
  }
);
