import { useRef } from 'react';
import { expect, screen } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { Inset } from '../Inset/Inset';
import { OverlayContainerProvider } from '../Provider/OverlayContainerProvider';
import { Text } from '../Text/Text';
import { Popover } from './Popover';

const meta = preview.meta({
  title: 'Components/Popover',
  component: Popover,
  // stories don't show up in storybook and chromatic creates no snapshots for this
  tags: ['!autodocs', '!dev'],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {},
});

export const Basic = meta.story({
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    return (
      <>
        <div ref={ref}>Trigger</div>
        <Popover data-testid="popover" triggerRef={ref}>
          <Button>open dialog</Button>
          <Text>this is popover content </Text>
        </Popover>
      </>
    );
  },
});

export const OpenPopover = meta.story({
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    return (
      <>
        <div ref={ref}>Trigger</div>
        <Popover data-testid="popover" open triggerRef={ref}>
          <Button>open dialog</Button>
          <Text>this is popover content </Text>
        </Popover>
      </>
    );
  },
});

const EXAGGERATED_PADDING = 100;
const PORTAL_ID = 'popover-at-viewport-edge';

export const AtViewportEdge = meta.story({
  tags: ['component-test', 'dev'],
  parameters: { surface: false, chromatic: { disableSnapshot: false } },

  args: { children: null },
  decorators: [
    // The preview portals overlays into `#storybook-root`, which the test
    // runner's canvas does not have. Own the container here instead of
    // rendering a second element carrying Storybook's id.
    Story => (
      <OverlayContainerProvider container={PORTAL_ID}>
        <div id={PORTAL_ID}>
          <Story />
        </div>
      </OverlayContainerProvider>
    ),
  ],
  render: ({ containerPadding }) => {
    const ref = useRef<HTMLButtonElement>(null);
    return (
      <div className="fixed top-4 right-2">
        <Button ref={ref} variant="secondary">
          Trigger at the window edge
        </Button>
        <Popover open triggerRef={ref} containerPadding={containerPadding}>
          <Inset p={4}>
            <Text>Wider than its trigger, so the boundary decides.</Text>
          </Inset>
        </Popover>
      </div>
    );
  },
});

AtViewportEdge.test(
  'keeps containerPadding clear of the boundary',
  { args: { containerPadding: EXAGGERATED_PADDING } },
  async () => {
    // RAC marks the popover root with `data-placement`, so no attribute has to be
    // added for the test's benefit.
    const popover = (await screen.findByText(/Wider than its trigger/)).closest(
      '[data-placement]'
    )!;

    const boundary = window.visualViewport?.width ?? window.innerWidth;

    await expect(popover.getBoundingClientRect().right).toBeLessThanOrEqual(
      boundary - EXAGGERATED_PADDING
    );
  }
);
