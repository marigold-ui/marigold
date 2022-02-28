import React from 'react';
import { ComponentProps } from '@marigold/types';

import { Box } from '../Box';

// Theme Extension
// ---------------
export interface ValidationMessageThemeExtension<Value> {
  validation?: {
    [key: string]: Value;
  };
}

// Props
// ---------------
export interface ValidationMessageProps extends ComponentProps<'span'> {
  variant?: string;
}

// Component
// ---------------
export const ValidationMessage: React.FC<ValidationMessageProps> = ({
  variant = 'error',
  children,
  className,
  ...props
}) => {
  return (
    <Box
      as="span"
      display="flex"
      alignItems="center"
      variant={`validation.${variant}`}
      className={className}
      {...props}
    >
      {children}
    </Box>
  );
};
