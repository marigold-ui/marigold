import React, { ReactNode } from 'react';
import { useClassNames } from '@marigold/system';
import { Box } from '../Box';
import { HtmlProps } from '@marigold/types';

// Props
// ---------------
export interface FooterProps extends HtmlProps<'footer'> {
  children?: ReactNode;
  variant?: string;
  size?: string;
}

// Component
// ---------------
export const Footer = ({ children, variant, size, ...props }: FooterProps) => {
  const classNames = useClassNames({ component: 'Footer', variant, size });
  return (
    <Box as="footer" {...props} className={classNames}>
      {children}
    </Box>
  );
};
