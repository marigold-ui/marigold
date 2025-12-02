import { Decorator } from '@storybook/react';
import {
  MarigoldProvider,
  OverlayContainerProvider,
} from '@marigold/components';
import theme from '@marigold/theme-rui';

// Storybook decorator that provides Marigold theme and overlay container
export const withMarigoldProviders: Decorator[] = [
  // Wrapper to provide an overlay container
  Story => (
    <div id="overlay-container">
      <Story />
    </div>
  ),
  Story => (
    <MarigoldProvider theme={theme} className="min-h-screen p-6">
      <OverlayContainerProvider container="overlay-container">
        <Story />
      </OverlayContainerProvider>
    </MarigoldProvider>
  ),
];

export default withMarigoldProviders;
