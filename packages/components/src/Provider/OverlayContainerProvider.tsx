import { PropsWithChildren } from 'react';
import { UNSAFE_PortalProvider as PortalProvider } from '@react-aria/overlays';

// Helper
// ---------------
// React Aria resolves the container on every overlay render, so a missing id
// would otherwise warn each time. Once per id is enough.
const warnedMissingContainers = new Set<string>();

// Test-only: lets each test assert the warning without racing another.
export const __resetMissingContainerWarnings = () =>
  warnedMissingContainers.clear();

const getContainer = (container?: string) => () => {
  if (container) {
    const element = document.getElementById(container);
    if (!element && !warnedMissingContainers.has(container)) {
      warnedMissingContainers.add(container);
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
