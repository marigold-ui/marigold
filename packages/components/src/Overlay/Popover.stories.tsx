import { useRef } from 'react';
import { expect, screen } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
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

export const AtViewportEdge = meta.story({
  tags: ['component-test'],
  parameters: { surface: false },
  decorators: [
    // The preview portals overlays into `#storybook-root`, which the test
    // runner's canvas does not carry.
    Story => (
      <div id="storybook-root">
        <Story />
      </div>
    ),
  ],
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    return (
      <div className="fixed top-0 right-0">
        <div ref={ref}>Trigger</div>
        <Popover open triggerRef={ref} containerPadding={CONTAINER_PADDING}>
          <Text>a popover wide enough to reach past the trigger</Text>
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
      await screen.findByText('a popover wide enough to reach past the trigger')
    ).closest('[data-placement]')!;

    await expect(popover.getBoundingClientRect().right).toBeLessThanOrEqual(
      document.documentElement.clientWidth - CONTAINER_PADDING
    );
  }
);
