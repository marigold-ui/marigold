import { Decorator } from '@storybook/react-vite';
import {
  MarigoldProvider,
  OverlayContainerProvider,
} from '../../packages/components/src';
import theme from '../../themes/theme-rui/src';

// Storybook decorator that provides Marigold theme and overlay container
export const withMarigoldProviders: Decorator[] = [
  Story => (
    <MarigoldProvider theme={theme} className="min-h-screen p-6">
      <OverlayContainerProvider container="storybook-root">
        <Story />
      </OverlayContainerProvider>
    </MarigoldProvider>
  ),
];

export default withMarigoldProviders;
