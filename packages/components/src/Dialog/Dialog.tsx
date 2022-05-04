import React, { ReactNode, useRef } from 'react';
import { useDialog } from '@react-aria/dialog';
import type { AriaDialogProps } from '@react-types/dialog';

import { Box, ThemeExtension, useComponentStyles } from '@marigold/system';

import { DialogContextProps, useDialogContext } from './Context';
import { DialogTrigger } from './DialogTrigger';

// Theme Extension
// ---------------
export interface DialogThemeExtension extends ThemeExtension<'Dialog'> {}

// Props
// ---------------
export interface DialogProps extends AriaDialogProps {
  children?:
    | ReactNode
    | ((props: Pick<DialogContextProps, 'close' | 'open'>) => ReactNode);
  variant?: string;
  size?: string;
}

// Component
// ---------------
export const Dialog = ({ children, variant, size, ...props }: DialogProps) => {
  const { close, open } = useDialogContext();

  const ref = useRef(null);
  // FIXME: Where to put the titleProps
  const { dialogProps } = useDialog(props, ref);
  const styles = useComponentStyles('Dialog', { variant, size });
  return (
    <Box __baseCSS={{ bg: '#fff' }} css={styles} {...dialogProps}>
      {typeof children === 'function' ? children({ close, open }) : children}
    </Box>
  );
};

Dialog.Trigger = DialogTrigger;
