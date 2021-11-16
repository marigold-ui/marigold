import React from 'react';
import { ComponentProps } from '@marigold/types';

import { Box } from '../Box';

export type ValidationMessageProps = {
  variant?: string;
} & ComponentProps<'span'>;

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
