import React from 'react';
import { Exclamation } from '@marigold/icons';

import { Box } from '../Box';

// Theme Extension
// ---------------
export interface HelperTextThemeExtension<Value> {
  helperText?: {
    description: Value;
    error: Value;
    icon: {
      size: number | string;
    };
  };
}

// Props
// ---------------
export interface HelperTextProps {
  variant?: 'description' | 'error';
}

// Component
// ---------------
export const HelperText: React.FC<HelperTextProps> = ({
  variant = 'description',
  children,
}) => (
  <Box
    variant={`helperText.${variant}`}
    __baseCSS={{ display: 'flex', alignItems: 'center', gap: 4 }}
  >
    {variant === 'error' ? <Exclamation role="presentation" /> : null}
    {children}
  </Box>
);
