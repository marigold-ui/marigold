import React from 'react';
import {
  Overlay as ReactAriaOverlay,
  OverlayProps as ReactAriaOverlayProps,
} from '@react-aria/overlays';

export interface OverlayProps {
  children: ReactAriaOverlayProps['children'];
  container?: ReactAriaOverlayProps['portalContainer'];
}

export const Overlay = ({ children, container }: OverlayProps) => (
  <ReactAriaOverlay portalContainer={container}>{children}</ReactAriaOverlay>
);
