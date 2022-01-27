import React from 'react';
import { SeparatorProps, useSeparator } from '@react-aria/separator';

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
  variant?: string;
} & SeparatorProps;

// Component
// ---------------
export const Divider: React.FC<DividerProps> = ({ variant = '', ...props }) => {
  const { separatorProps } = useSeparator(props);

  return (
    <Box
      __baseCSS={{ width: '100%', height: '1px', m: 'none', bg: 'text' }}
      variant={`divider.${variant}`}
      {...props}
      {...separatorProps}
    />
  );
};
