import React from 'react';
import { ResponsiveStyleValue } from '@marigold/system';
import { ComponentProps } from '@marigold/types';

import { Box } from '../Box';

// Theme Extension
// ---------------
export interface CardThemeExtension<Value> {
  card?: {
    [key: string]: Value;
  };
}

// Props
// ---------------
export interface CardProps extends ComponentProps<'div'> {
  title?: string;
  width?: ResponsiveStyleValue<string>;
  variant?: string;
}

// Component
// ---------------
export const Card: React.FC<CardProps> = ({
  variant = '',
  title,
  width,
  className,
  children,
  ...props
}) => {
  return (
    <Box
      {...props}
      variant={`card.${variant}`}
      maxWidth={width}
      className={className}
    >
      {title && (
        <Box as="h2" variant="text.h2" pb="small">
          {title}
        </Box>
      )}
      {children}
    </Box>
  );
};
