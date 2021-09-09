import React from 'react';
import { useStyles } from '@marigold/system';
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
  const itemStyles = useStyles({
    css: {
      position: 'absolute',
      minWidth: '120px',
      display: 'block',
      textAlign: 'left',
      borderRadius: '2px',
    },
  });

  return (
    <Box variant={`menu.${variant}`} {...props}>
      <Button onClick={onClick} variant="menu">
        {label}
      </Button>
      {show ? <div className={itemStyles}>{children}</div> : null}
    </Box>
  );
};
