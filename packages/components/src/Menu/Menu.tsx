import React from 'react';
import { ComponentProps } from '@marigold/types';

import { Button } from '../Button';
import { Box } from '../Box';

// Theme Extension
// ---------------
export interface MenuThemeExtension<Value> {
  menu?: Value;
}

// Props
// ---------------
export type MenuProps = {
  variant?: string;
  label?: string;
  onClick: ComponentProps<typeof Button>['onClick'];
  show?: boolean;
  className?: string;
  title?: string; // For testing
};

// Component
// ---------------
export const Menu: React.FC<MenuProps> = ({
  variant = 'default',
  label = 'Menu',
  onClick,
  show = false,
  children,
  ...props
}) => {
  return (
    <Box variant={`menu.${variant}`} {...props}>
      <Button onClick={onClick} variant="menu">
        {label}
      </Button>
      {show ? (
        <Box
          display="block"
          position="absolute"
          minWidth="120px"
          borderRadius="2px"
        >
          {children}
        </Box>
      ) : null}
    </Box>
  );
};
