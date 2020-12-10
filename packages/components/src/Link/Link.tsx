import React from 'react';
import { useStyles, system } from '@marigold/system';

type LinkProps = {
  variant?: string;
};

export const Link = system<LinkProps, 'a'>(
  ({ variant = 'normal', children, className, ...props }) => {
    const classNames = useStyles(
      {
        variant: `link.${variant}`,
      },
      className
    );
    return (
      <a className={classNames} {...props}>
        {children}
      </a>
    );
  }
);
