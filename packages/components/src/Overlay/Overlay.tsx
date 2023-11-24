import { useRef } from 'react';

import {
  Overlay as ReactAriaOverlay,
  OverlayProps as ReactAriaOverlayProps,
} from '@react-aria/overlays';

import { useTheme } from '@marigold/system';

export interface OverlayProps {
  open: boolean;
  children: ReactAriaOverlayProps['children'];
  container?: ReactAriaOverlayProps['portalContainer'];
}

export const Overlay = ({ children, container, open }: OverlayProps) => {
  const nodeRef = useRef(null);
  const theme = useTheme();

  // Don't un-render the overlay while it's transitioning out.
  let mountOverlay = open;
  if (!mountOverlay) {
    // Don't bother showing anything if we don't have to.
    return null;
  }

  return (
    <ReactAriaOverlay portalContainer={container}>
      <div ref={nodeRef} data-testid="overlay" className="opacity-100">
        {children}
      </div>
    </ReactAriaOverlay>
  );
};
