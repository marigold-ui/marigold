import React from 'react';
import { createStyles, system } from '@marigold/system';

type SvgProps = {
  variant?: string;
  size?: number;
};

const useStyles = createStyles('icon');

export const Svg = system<SvgProps, 'svg'>(
  ({ variant = 'icon', size = 24, children, ...props }) => {
    const classNames = useStyles({ variant });

    return (
      <svg
        className={classNames}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentcolor"
        {...props}
      >
        {children}
      </svg>
    );
  }
);
