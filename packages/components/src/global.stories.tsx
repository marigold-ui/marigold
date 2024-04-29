import type { Meta, StoryObj } from '@storybook/react';

import { cn } from '@marigold/system';

import { Stack } from './Stack';

const meta = {
  title: 'Global',
} satisfies Meta;

export default meta;

/**
 * Testing elevation tokens so see if they are
 * distinguishable enough. Default is surrounding
 * everything.
 */
const SURFACE_BASE = 'grid place-items-center size-32 rounded-lg';

export const Elevation: StoryObj = {
  render: () => (
    <div className={cn(SURFACE_BASE, 'bg-bg-surface shadow-surface')}>
      <Stack space={6}>
        <div
          className={cn(
            SURFACE_BASE,
            'bg-bg-surface-sunken shadow-surface-sunken'
          )}
        >
          SUNKEN
        </div>
        <div
          className={cn(
            SURFACE_BASE,
            'bg-bg-surface-raised shadow-surface-raised ring-1 ring-gray-600/5'
          )}
        >
          RAISED
        </div>
        <div
          className={cn(
            SURFACE_BASE,
            'bg-bg-surface-overlay shadow-surface-overlay ring-1 ring-gray-600/5'
          )}
        >
          OVERLAY
        </div>
      </Stack>
    </div>
  ),
};
