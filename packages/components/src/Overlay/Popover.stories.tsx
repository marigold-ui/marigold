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

// A reserved scrollbar gutter cannot be produced in a headless browser (they
// use overlay scrollbars, so `scrollbar-gutter: stable` reserves nothing).
// What the fix depends on splits in two, and each half is tested where it can
// be tested honestly:
//
//   1. the size of the correction — `containerPadding.test.ts`, against stubbed
//      viewport measurements;
//   2. that `containerPadding` is the lever that actually moves the overlay and
//      that `<Popover>` forwards it — here, with an exaggerated value so the
//      assertion cannot pass by accident.
const CONTAINER_PADDING = 100;
const PORTAL_ID = 'popover-at-viewport-edge';

export const AtViewportEdge = meta.story({
  // The meta hides this file from Storybook (`!dev`) because the other two
  // stories are bare test fixtures. This one shows the geometry the fix is
  // about, so it opts back in and is worth a Chromatic snapshot of its own.
  tags: ['component-test', 'dev'],
  parameters: { surface: false, chromatic: { disableSnapshot: false } },
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
  render: () => {
    const ref = useRef<HTMLButtonElement>(null);
    return (
      <div className="fixed top-4 right-0">
        <Button ref={ref} variant="secondary">
          Trigger at the window edge
        </Button>
        <Popover open triggerRef={ref} containerPadding={CONTAINER_PADDING}>
          <Inset p={4}>
            <Text>
              Wide enough to reach past its trigger, so the boundary is what
              decides where it stops.
            </Text>
          </Inset>
        </Popover>
      </div>
    );
  },
});

AtViewportEdge.test(
  'keeps containerPadding clear of the boundary',
  async () => {
    // RAC marks the popover root with `data-placement`, so no attribute has to be
    // added for the test's benefit.
    const popover = (
      await screen.findByText(/Wide enough to reach past its trigger/)
    ).closest('[data-placement]')!;

    // Against react-aria's own boundary, which is what `containerPadding` is
    // measured from — `clientWidth` disagrees with it whenever a scrollbar
    // gutter is reserved, which is the whole subject of this fix.
    const boundary = window.visualViewport?.width ?? window.innerWidth;

    await expect(popover.getBoundingClientRect().right).toBeLessThanOrEqual(
      boundary - CONTAINER_PADDING
    );
  }
);
