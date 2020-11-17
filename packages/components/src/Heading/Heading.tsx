import React from 'react';
import { createStyles, system } from '@marigold/system';

type HeadingProps = {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

const useStyles = createStyles('text');

export const Heading = system<HeadingProps, 'h2'>(
  ({ variant = 'h2', children, ...props }) => {
    const classNames = useStyles({ variant });

    return (
      <h2 className={classNames} {...props}>
        {children}
      </h2>
    );
  }
);
