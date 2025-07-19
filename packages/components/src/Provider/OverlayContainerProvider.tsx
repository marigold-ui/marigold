import { PropsWithChildren } from 'react';
import { UNSAFE_PortalProvider as PortalProvider } from '@react-aria/overlays';

// Helper
// ---------------
const getContainer = (container?: string) => () => {
  if (container) {
    const element = document.getElementById(container);
    if (!element) {
      console.warn(
        `OverlayContainerProvider: Container with id "${container}" not found.`
      );
    }
    return element;
  }
  return null;
};

// Props
// ---------------
export interface OverlayContainerProps extends PropsWithChildren {
  /**
   * The id of the container element where the overlay should be rendered.
   * If not provided, the overlay will be rendered in the body.
   *
   * Note that the container must be present in the DOM before the overlay is rendered.
   */
  container?: string;
}

// Component
// ---------------
export const OverlayContainerProvider = ({
  container,
  children,
}: OverlayContainerProps) => (
  <PortalProvider getContainer={getContainer(container)}>
    {children}
  </PortalProvider>
);
