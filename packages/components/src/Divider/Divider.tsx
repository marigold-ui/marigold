import React from 'react';
import { Box } from '../Box';

export type DividerProps = {
  className?: string;
  variant?: string;
  title?: string; // Should only be used for testing.
};

export const Divider: React.FC<DividerProps> = ({
  variant = 'regular',
  ...props
}) => <Box {...props} as="hr" variant={`divider.${variant}`} />;
