import { Decorator } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  Card,
  MarigoldProvider,
  OverlayContainerProvider,
} from '../packages/components/src/index.js';
import { theme } from '../themes/theme-rui/src/index.js';

const queryClient = new QueryClient();

// Storybook decorator that provides Marigold theme and overlay container
const withMarigoldProviders: Decorator[] = [
  (Story, context) => (
    <QueryClientProvider client={queryClient}>
      <MarigoldProvider
        theme={theme}
        className={`min-h-screen ${context.parameters.padding === false ? '' : 'p-6'}`}
      >
        <OverlayContainerProvider container="storybook-root">
          {context.parameters.surface !== false ? (
            <Card stretch>
              <Story />
            </Card>
          ) : (
            <Story />
          )}
        </OverlayContainerProvider>
      </MarigoldProvider>
    </QueryClientProvider>
  ),
];

export default withMarigoldProviders;
