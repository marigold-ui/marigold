import React from 'react';
import { useStyles, system } from '@marigold/system';

type BadgeProps = {
  variant?: string;
  borderColor?: string;
  backgroundColor?: string;
};

export const Badge = system<BadgeProps, 'div'>(
  ({
    variant = 'badge',
    borderColor = 'inherit',
    backgroundColor = 'inherit',
    className,
    children,
    ...props
  }) => {
    const classNames = useStyles(
      {
        variant: `content.${variant}`,
        border: '1px solid ' + borderColor,
        bg: backgroundColor,
      },
      className
    );

    return (
      <div className={classNames} {...props}>
        {children}
      </div>
    );
  }
);
