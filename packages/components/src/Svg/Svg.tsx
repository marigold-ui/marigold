import React from 'react';
import { createStyles, system } from '@marigold/system';

type SvgProps = {
  as?: 'svg';
  variant?: string;
  size?: number;
};

const useStyles = createStyles('icon');

export const Svg = system<SvgProps, 'svg'>(
  ({ as = 'svg', variant = 'icon', size = 24, children, ...props }) => {
    const classNames = useStyles({ variant });
    const Cmp = as;

    return (
      <Cmp
        className={classNames}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentcolor"
        {...props}
      >
        {children}
      </Cmp>
    );
  }
);
