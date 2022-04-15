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
  return <Box css={styles} {...props} {...separatorProps} />;
};
