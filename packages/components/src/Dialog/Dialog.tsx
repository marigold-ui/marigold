import React, { ReactNode, useRef } from 'react';
import { useButton } from '@react-aria/button';
import { useDialog } from '@react-aria/dialog';
import type { AriaDialogProps } from '@react-types/dialog';

import { Box, ThemeExtension, useComponentStyles } from '@marigold/system';

import { DialogContextProps, useDialogContext } from './Context';
import { DialogTrigger } from './DialogTrigger';

// Close Button
// ---------------
const CloseButton = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const { close } = useDialogContext();

  const { buttonProps } = useButton(
    {
      onPress: () => close?.(),
    },
    ref
  );

  return (
    <Box css={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Box
        as="button"
        __baseCSS={{
          outline: 'none',
          border: 'none',
          cursor: 'pointer',
          height: 16,
          width: 16,
          lineHeight: 1,
          p: 0,
        }}
        ref={ref}
        {...buttonProps}
      >
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          />
        </svg>
      </Box>
    </Box>
  );
};

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
  closeButton?: boolean;
}

// Component
// ---------------
export const Dialog = ({
  children,
  variant,
  size,
  closeButton,
  ...props
}: DialogProps) => {
  const { close, open } = useDialogContext();

  const ref = useRef(null);
  // FIXME: Where to put the titleProps
  const { dialogProps } = useDialog(props, ref);
  const styles = useComponentStyles('Dialog', { variant, size });
  return (
    <Box __baseCSS={{ bg: '#fff' }} css={styles} {...dialogProps}>
      {closeButton && <CloseButton />}
      {typeof children === 'function' ? children({ close, open }) : children}
    </Box>
  );
};

Dialog.Trigger = DialogTrigger;
