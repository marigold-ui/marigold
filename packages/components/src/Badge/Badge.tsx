import React from 'react';
import { createStyles, system } from '@marigold/system';

type BadgeProps = {
  variant?: string;
  borderColor?: string;
  backgroundColor?: string;
};

const useStyles = createStyles('content');

export const Badge = system<BadgeProps, 'div'>(
  ({
    variant = 'badge',
    borderColor = 'inherit',
    backgroundColor = 'inherit',
    children,
    ...props
  }) => {
    const classNames = useStyles({
      variant,
      border: '1px solid ' + borderColor,
      bg: backgroundColor,
    });

    return (
      <div className={classNames} {...props}>
        {children}
      </div>
    );
  }
);
