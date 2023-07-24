import React, { useRef } from 'react';
import { Transition } from 'react-transition-group';

import {
  Overlay as ReactAriaOverlay,
  OverlayProps as ReactAriaOverlayProps,
} from '@react-aria/overlays';
import { useTheme } from '@marigold/system';

export interface OverlayProps {
  open: boolean;
  children: ReactAriaOverlayProps['children'];
  container?: any;
}

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
  unmounted: { opacity: 0 },
};

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
      <Transition nodeRef={nodeRef} timeout={duration} in={open} appear>
        {state => (
          <div
            ref={nodeRef}
            data-testid="overlay"
            data-theme={theme.name}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            {children}
          </div>
        )}
      </Transition>
    </ReactAriaOverlay>
  );
};
