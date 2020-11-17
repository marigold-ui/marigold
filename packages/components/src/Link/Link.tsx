import React from 'react';
import { createStyles, system } from '@marigold/system';

type LinkProps = {
  variant?: string;
};

const useStyles = createStyles('link');

export const Link = system<LinkProps, 'a'>(
  ({ variant = 'link', children, ...props }) => {
    const classNames = useStyles({ variant });

    return (
      <a className={classNames} {...props}>
        {children}
      </a>
    );
  }
);
