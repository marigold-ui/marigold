import React from 'react';
import { ComponentProps } from '@marigold/types';
import { Link } from '../Link';
import { Box } from '../Box';

export type MenuItemProps = {
  variant?: string;
} & ComponentProps<typeof Link>;

export const MenuItem: React.FC<MenuItemProps> = ({
  variant = 'default',
  className,
  children,
  ...props
}) => {
  return (
    <Box variant={`menuItem.${variant}`} className={className}>
      <Link variant="menuItemLink" {...props}>
        {children}
      </Link>
    </Box>
  );
};
