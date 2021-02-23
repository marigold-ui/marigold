import React from 'react';
import { system, useStyles } from '@marigold/system';

export type LabelTextProps = {
  htmlFor: string;
  variant?: string;
};

export const Label = system<LabelTextProps, 'label'>(
  ({ variant = 'label', htmlFor, children, className, ...props }) => {
    const classNames = useStyles(
      {
        variant: `form.${variant}`,
      },
      className
    );
    return (
      <label htmlFor={htmlFor} className={classNames} {...props}>
        {children}
      </label>
    );
  }
);
