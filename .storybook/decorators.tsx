import { Decorator } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  MarigoldProvider,
  OverlayContainerProvider,
} from '../packages/components/src/index.js';
import { theme } from '../themes/theme-rui/src/index.js';

const queryClient = new QueryClient();

// Storybook decorator that provides Marigold theme and overlay container
const withMarigoldProviders: Decorator[] = [
  Story => (
    <QueryClientProvider client={queryClient}>
      <MarigoldProvider theme={theme} className="min-h-screen p-6">
        <OverlayContainerProvider container="storybook-root">
          <Story />
        </OverlayContainerProvider>
      </MarigoldProvider>
    </QueryClientProvider>
  ),
];

export default withMarigoldProviders;
