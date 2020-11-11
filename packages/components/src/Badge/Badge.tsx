import React from 'react';
import { createStyles, system } from '@marigold/system';

type BadgeProps = {
  as?: 'div';
  variant?: string;
  borderColor?: string;
  backgroundColor?: string;
};

const useStyles = createStyles('content');

export const Badge = system<BadgeProps, 'div'>(
  ({
    as = 'div',
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
    const Cmp = as;

    return (
      <Cmp className={classNames} {...props}>
        {children}
      </Cmp>
    );
  }
);
