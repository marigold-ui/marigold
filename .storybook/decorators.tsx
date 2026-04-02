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
      <MarigoldProvider theme={theme} className="min-h-screen">
        <OverlayContainerProvider container="storybook-root">
          {context.parameters.surface === 'both' ? (
            <div className="flex flex-col gap-8">
              <section>
                <p className="text-secondary mb-2 text-xs font-medium tracking-wide uppercase">
                  On surface
                </p>
                <Card stretch>
                  <Story />
                </Card>
              </section>
              <section>
                <p className="text-secondary mb-2 text-xs font-medium tracking-wide uppercase">
                  On page
                </p>
                <Story />
              </section>
            </div>
          ) : context.parameters.surface !== false ? (
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
