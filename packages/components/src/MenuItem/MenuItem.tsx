import React from 'react';
import { ComponentProps } from '@marigold/types';
import { Link } from '../Link';
import { Box } from '../Box';

// Theme Extension
// ---------------
export interface MenuItemThemeExtension<Value> {
  menuItem?: {
    [key: string]: Value;
  };
}

// Props
// ---------------
export interface MenuItemProps extends ComponentProps<typeof Link> {
  variant?: string;
}

// Component
// ---------------
export const MenuItem: React.FC<MenuItemProps> = ({
  variant = 'default',
  children,
  ...props
}) => {
  return (
    <Box variant={`menuItem.${variant}`}>
      <Link variant="menuItemLink" {...props}>
        {children}
      </Link>
    </Box>
  );
};
