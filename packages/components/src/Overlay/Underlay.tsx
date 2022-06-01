import React, { HTMLAttributes } from 'react';
import { Box, ThemeExtension, useComponentStyles } from '@marigold/system';

// Theme Extension
// ---------------
export interface UnderlayThemeExtension extends ThemeExtension<'Underlay'> {}

// Props
// ---------------
export interface UnderlayProps extends HTMLAttributes<HTMLElement> {
  variant?: string;
  size?: string;
}

// Component
// ---------------
export const Underlay = ({ size, variant, ...props }: UnderlayProps) => {
  const styles = useComponentStyles('Underlay', { size, variant });
  return (
    <Box
      __baseCSS={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
      }}
      css={styles}
      {...props}
    />
  );
};
