import React, { ReactNode, useRef } from 'react';
import { useDialog } from '@react-aria/dialog';
import type { AriaDialogProps } from '@react-types/dialog';

import { Box, ThemeExtension, useComponentStyles } from '@marigold/system';

import { DialogTrigger } from './DialogTrigger';

// Theme Extension
// ---------------
export interface DialogThemeExtension extends ThemeExtension<'Dialog'> {}

// Props
// ---------------
export interface DialogProps extends AriaDialogProps {
  children?: ReactNode;
  variant?: string;
  size?: string;
}

// Component
// ---------------
export const Dialog = ({ children, variant, size, ...props }: DialogProps) => {
  const ref = useRef(null);
  // FIXME: Where to put the titleProps
  const { dialogProps } = useDialog(props, ref);
  const styles = useComponentStyles('Dialog', { variant, size });
  return (
    <Box __baseCSS={{ bg: '#fff' }} css={styles} {...dialogProps}>
      {children}
    </Box>
  );
};

Dialog.Trigger = DialogTrigger;

/**
 * TODO:
 *
 * - dismiss button
 * - pass down close when children is a function
 */
