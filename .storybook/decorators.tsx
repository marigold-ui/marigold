import { Decorator } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  MarigoldProvider,
  OverlayContainerProvider,
  Panel,
} from '../packages/components/src/index.js';
import { theme } from '../themes/theme-rui/src/index.js';

const queryClient = new QueryClient();

const deriveLabel = (context: Parameters<Decorator>[1]) =>
  (context.parameters.panelLabel as string | undefined) ??
  context.title ??
  context.name ??
  'Story';

// Storybook decorator that provides Marigold theme and overlay container
const withMarigoldProviders: Decorator[] = [
  (Story, context) => {
    const label = deriveLabel(context);
    const bleed = context.parameters.bleed === true;

    const wrapped = (
      <Panel aria-label={label}>
        <Panel.Content bleed={bleed}>
          <Story />
        </Panel.Content>
      </Panel>
    );

    return (
      <QueryClientProvider client={queryClient}>
        <MarigoldProvider theme={theme} className="min-h-screen">
          <OverlayContainerProvider container="storybook-root">
            {context.parameters.surface === 'both' ? (
              <div className="flex flex-col gap-8">
                <div>
                  <p className="text-secondary mb-2 text-xs font-medium tracking-wide uppercase">
                    On surface
                  </p>
                  {wrapped}
                </div>
                <div>
                  <p className="text-secondary mb-2 text-xs font-medium tracking-wide uppercase">
                    On page
                  </p>
                  <Story />
                </div>
              </div>
            ) : context.parameters.surface !== false ? (
              wrapped
            ) : (
              <Story />
            )}
          </OverlayContainerProvider>
        </MarigoldProvider>
      </QueryClientProvider>
    );
  },
];

export default withMarigoldProviders;
