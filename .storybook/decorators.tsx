import { Decorator } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MotionConfig } from 'motion/react';
import {
  MarigoldProvider,
  OverlayContainerProvider,
} from '../packages/components/src/index.js';
import { theme } from '../themes/theme-rui/src/index.js';

const queryClient = new QueryClient();

// Chromatic includes "Chromatic" in the user agent of its capture browsers.
// We force framer-motion into reduced-motion so JS-driven animations
// (e.g. Tray slide-in) settle instantly and snapshots are deterministic.
const isChromatic =
  typeof navigator !== 'undefined' && /Chromatic/i.test(navigator.userAgent);

// Storybook decorator that provides Marigold theme and overlay container
const withMarigoldProviders: Decorator[] = [
  Story => (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion={isChromatic ? 'always' : 'user'}>
        <MarigoldProvider theme={theme} className="min-h-screen">
          <OverlayContainerProvider container="storybook-root">
            <Story />
          </OverlayContainerProvider>
        </MarigoldProvider>
      </MotionConfig>
    </QueryClientProvider>
  ),
];

export default withMarigoldProviders;
