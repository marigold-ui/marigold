import { useEffect, useRef } from 'react';
import { expect } from 'storybook/test';
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

// Stands in for a reserved scrollbar gutter; see the decorator below.
const SIMULATED_GUTTER = 15;

export const AtViewportEdge = meta.story({
  tags: ['component-test'],
  parameters: { surface: false },
  decorators: [
    Story => {
      document.body.style.marginRight = `${SIMULATED_GUTTER}px`;
      useEffect(
        () => () => {
          document.body.style.marginRight = '';
        },
        []
      );
      return (
        <div id="storybook-root">
          <Story />
        </div>
      );
    },
  ],
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    return (
      <div className="fixed top-0 right-0">
        <div ref={ref}>Trigger</div>
        <Popover data-testid="popover" open triggerRef={ref}>
          <Text>a popover wide enough to reach past the trigger</Text>
        </Popover>
      </div>
    );
  },
});

AtViewportEdge.test(
  'stays inside the clip box of the body',
  async ({ canvas }) => {
    const popover = await canvas.findByTestId('popover');

    // The body is what clips (`overflow-x: clip`), so its right edge — not the
    // viewport's — is the line the overlay has to stay behind.
    await expect(popover.getBoundingClientRect().right).toBeLessThanOrEqual(
      document.body.getBoundingClientRect().right
    );
  }
);
