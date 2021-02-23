import React from 'react';
import { useStyles, system } from '@marigold/system';
import { Link } from '../Link';

export type MenuItemProps = {
  variant?: string;
};

export const MenuItem = system<MenuItemProps, 'a'>(
  ({ variant = 'menuItem', className, children, ...props }) => {
    const classNames = useStyles(
      {
        variant: `content.${variant}`,
      },
      className
    );

    return (
      <Link variant="menu" className={classNames} {...props}>
        {children}
      </Link>
    );
  }
);
