import React from 'react';
import { useStyles, system } from '@marigold/system';

type HeadingProps = {
  variant?: string;
};

export const Heading = system<HeadingProps, 'h2'>(
  ({ variant = 'h2', children, className, ...props }) => {
    const classNames = useStyles(
      {
        variant: `text.${variant}`,
      },
      className
    );
    return (
      <h2 className={classNames} {...props}>
        {children}
      </h2>
    );
  }
);
