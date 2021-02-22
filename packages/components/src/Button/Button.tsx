import React from 'react';
import { ComponentPropsWithRef } from '@marigold/types';
import { Box } from '../Box';

type ButtonProps = {
  variant?: string;
} & ComponentPropsWithRef<'button'>;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary.large',
  children,
  ...props
}) => {
  return (
    <Box as="button" {...props} variant={`button.${variant}`}>
      <Box as="span" display="inline-flex" alignItems="center">
        {children}
      </Box>
    </Box>
  );
};
