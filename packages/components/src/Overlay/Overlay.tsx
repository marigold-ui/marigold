import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { ComponentProps } from '@marigold/types';

import { Box } from '../Box';

export interface OverlayProps extends ComponentProps<'div'> {
  children: ReactNode;
  open?: boolean;
  container?: Element;
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

  /**
   * Annotate as JSX.Element so we don't have to export
   * ReactDOM typings
   */
  const component = <Box {...props}>{children}</Box>;
  return ReactDOM.createPortal(component, container) as JSX.Element;
};
