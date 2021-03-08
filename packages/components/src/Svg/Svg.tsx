import React from 'react';
import { useStyles, system } from '@marigold/system';

export type SvgProps = {
  variant?: string;
  size?: number;
};

export const Svg = system<SvgProps, 'svg'>(
  ({ variant = 'icon', size = 24, className = '', children, ...props }) => {
    const classNames = useStyles(
      {
        variant: `icon.${variant}`,
      },
      className
    );

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
