import React from 'react';
import { useStyles } from '@marigold/system';
import { ComponentProps } from '@marigold/types';
import { Link } from '../Link';

export type MenuItemProps = {
  variant?: string;
} & ComponentProps<typeof Link>;

export const MenuItem: React.FC<MenuItemProps> = ({
  variant = 'menuItem',
  className,
  children,
  ...props
}) => {
  const classNames = useStyles({
    variant: `menu.${variant}`,
    className,
  });

  return (
    <Link {...props} variant="menu" className={classNames}>
      {children}
    </Link>
  );
};
