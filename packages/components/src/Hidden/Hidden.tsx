import React from 'react';
import { createStyles, system } from '@marigold/system';

type HiddenProps = {
  variant?: string;
  show?: boolean;
};

const useStyles = createStyles('layout');

export const Hidden = system<HiddenProps, 'span'>(
  ({ variant = 'hidden', show = false, children, ...props }) => {
    const classNames = useStyles({
      variant,
      display: show ? 'display' : 'none',
    });

    return (
      <span className={classNames} {...props}>
        {children}
      </span>
    );
  }
);
