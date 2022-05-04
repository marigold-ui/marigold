import React, { ReactNode } from 'react';

import { Box, ThemeExtension, useComponentStyles } from '@marigold/system';

import { DialogTrigger } from './DialogTrigger';

// Theme Extension
// ---------------
export interface DialogThemeExtension extends ThemeExtension<'Dialog'> {}

// Props
// ---------------
export interface DialogProps {
  children?: ReactNode;
  variant?: string;
  size?: string;
}

// Component
// ---------------
export const Dialog = ({ children, variant, size }: DialogProps) => {
  const styles = useComponentStyles('Dialog', { variant, size });
  return (
    <Box __baseCSS={{ bg: '#fff' }} css={styles}>
      {children}
    </Box>
  );
};

Dialog.Trigger = DialogTrigger;
