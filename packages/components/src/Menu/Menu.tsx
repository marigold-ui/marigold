import React from 'react';
import { ComponentProps } from '@marigold/types';

import { Button } from '../Button';
import { Box } from '../Box';

export type MenuProps = {
  variant?: string;
  label?: string;
  onClick: ComponentProps<typeof Button>['onClick'];
  show?: boolean;
  className?: string;
  title?: string; // For testing
};

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
          css={{
            textAlign: 'left',
          }}
        >
          {children}
        </Box>
      ) : null}
    </Box>
  );
};
