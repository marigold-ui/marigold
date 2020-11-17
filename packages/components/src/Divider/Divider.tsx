import React from 'react';
import { createStyles, system } from '@marigold/system';

type DividerProps = {
  variant?: string;
};

const useStyles = createStyles('divider');

export const Divider = system<DividerProps, 'hr'>(
  ({ variant = 'regular', ...props }) => {
    const classNames = useStyles({ variant });

    return <hr className={classNames} {...props} />;
  }
);
