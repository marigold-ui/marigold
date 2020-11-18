import React from 'react';
import { createStyles, system } from '@marigold/system';

type HeadingProps = {
  variant?: string;
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
