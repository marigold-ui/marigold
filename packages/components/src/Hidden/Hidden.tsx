import React from 'react';
import { createStyles, system } from '@marigold/system';

type HiddenProps = {
  as?: 'span';
  variant?: string;
  show?: boolean;
};

const useStyles = createStyles('layout');

export const Hidden = system<HiddenProps, 'span'>(
  ({ as = 'span', variant = 'hidden', show = false, children, ...props }) => {
    const classNames = useStyles({
      variant,
      display: show ? 'display' : 'none',
    });
    const Cmp = as;

    return (
      <Cmp className={classNames} {...props}>
        {children}
      </Cmp>
    );
  }
);
