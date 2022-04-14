import React from 'react';
import { SeparatorProps, useSeparator } from '@react-aria/separator';

import { Box } from '../Box';
import { ThemeExtension, useComponentStyles } from '@marigold/system';

// Theme Extension
// ---------------
export interface DividerThemeExtension extends ThemeExtension<'Divider'> {}

// Props
// ---------------
export interface DividerProps extends SeparatorProps {
  variant?: string;
}

// Component
// ---------------
export const Divider = ({ variant, ...props }: DividerProps) => {
  const { separatorProps } = useSeparator(props);
  const styles = useComponentStyles('Divider', { variant });
  return (
    <Box
      __baseCSS={{ width: '100%', height: '1px', m: 'none', bg: 'text' }}
      css={styles}
      {...props}
      {...separatorProps}
    />
  );
};
