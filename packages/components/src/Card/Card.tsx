import React from 'react';
import { ResponsiveStyleValue } from '@marigold/system';
import { ComponentProps } from '@marigold/types';

import { Box } from '../Box';

export type CardProps = {
  title?: string;
  width?: ResponsiveStyleValue<string>;
  variant?: string;
} & ComponentProps<'div'>;

export const Card: React.FC<CardProps> = ({
  variant = 'default',
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
