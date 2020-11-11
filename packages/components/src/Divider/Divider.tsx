import React from 'react';
import { createStyles, system } from '@marigold/system';

type DividerProps = {
  as?: 'hr';
  variant?: string;
};

const useStyles = createStyles('divider');

export const Divider = system<DividerProps, 'hr'>(
  ({ as = 'hr', variant = 'regular', ...props }) => {
    const classNames = useStyles({ variant });
    const Cmp = as;

    return <Cmp className={classNames} {...props} />;
  }
);
