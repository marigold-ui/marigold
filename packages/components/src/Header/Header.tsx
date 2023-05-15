import React, { ReactNode } from 'react';
import { useClassNames } from '@marigold/system';
import { Box } from '../Box';
import { HtmlProps } from '@marigold/types';

// Props
// ---------------
export interface HeaderProps extends HtmlProps<'header'> {
  children?: ReactNode;
  variant?: string;
  size?: string;
}

// Component
// ---------------
export const Header = ({ children, variant, size, ...props }: HeaderProps) => {
  const classNames = useClassNames({ component: 'Header', variant, size });
  return (
    <Box as="header" {...props} className={classNames}>
      {children}
    </Box>
  );
};
