import React, { ReactNode } from 'react';
import { OverlayContainer } from '@react-aria/overlays';

import { ComponentProps } from '@marigold/types';

import { Box } from '../Box';

export interface OverlayProps extends ComponentProps<'div'> {
  children: ReactNode;
  open?: boolean;
  container?: HTMLElement;
}

export const Overlay = ({
  children,
  open = false,
  container = document.body,
  ...props
}: OverlayProps) => {
  if (!open) {
    return null;
  }

  return (
    <OverlayContainer portalContainer={container}>
      <Box {...props}>{children}</Box>
    </OverlayContainer>
  );
};
