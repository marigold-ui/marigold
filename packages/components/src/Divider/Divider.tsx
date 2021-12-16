import React from 'react';
import { Box } from '../Box';

// Theme Extension
// ---------------
export interface DividerThemeExtension<Value> {
  divider?: {
    [key: string]: Value;
  };
}

// Props
// ---------------
export type DividerProps = {
  className?: string;
  variant?: string;
  title?: string; // Should only be used for testing.
};

// Component
// ---------------
export const Divider: React.FC<DividerProps> = ({
  variant = 'regular',
  ...props
}) => <Box {...props} as="hr" variant={`divider.${variant}`} />;
