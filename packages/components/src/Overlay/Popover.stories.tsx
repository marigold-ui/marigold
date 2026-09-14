import { useRef } from 'react';
import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { ActionMenu } from '../Menu/ActionMenu';
import { Menu } from '../Menu/Menu';
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

/**
 * The App Shell top bar from `/examples/general`, reduced to the part that
 * breaks: an overflow menu pinned to the right edge of a page that scrolls.
 *
 * `theme-rui`'s preflight reserves a scrollbar gutter on `<html>` and clips the
 * `<body>`, so the box that cuts is a gutter's width narrower than the visual
 * viewport react-aria positions against. The menu lands in the gutter and loses
 * its right border and corners — see DST-1754.
 */
export const AtViewportEdge = meta.story({
  tags: ['dev', 'component-test'],
  parameters: { layout: 'fullscreen', surface: false },
  decorators: [
    Story => (
      <div id="storybook-root">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="min-h-[150vh]">
      <div className="flex items-center justify-end gap-2 border-b p-3">
        <Text>Jane Doe</Text>
        <ActionMenu aria-label="User menu" variant="ghost">
          <Menu.Section title="Account">
            <Menu.Item id="profile">Profile</Menu.Item>
            <Menu.Item id="settings">Settings</Menu.Item>
            <Menu.Item id="sign-out">Sign out</Menu.Item>
          </Menu.Section>
        </ActionMenu>
      </div>
    </div>
  ),
});

/**
 * A reserved scrollbar gutter cannot be produced in a headless browser — the
 * platform draws overlay scrollbars, so `scrollbar-gutter: stable` reserves
 * nothing and there is no gap to catch. What this pins instead is the lever the
 * fix pulls: that `containerPadding` reaches react-aria and holds the overlay
 * that far off the boundary. The gutter measurement itself is verified by hand
 * in a headed browser; see the changeset.
 */
const EXAGGERATED_PADDING = 100;

AtViewportEdge.test(
  'Holds the menu containerPadding away from react-aria’s boundary',
  {
    parameters: { chromatic: { disableSnapshot: true } },
    args: { containerPadding: EXAGGERATED_PADDING },
    render: args => {
      const ref = useRef<HTMLDivElement>(null);

      return (
        <div className="flex justify-end">
          <div ref={ref}>Jane Doe</div>
          <Popover {...args} open triggerRef={ref}>
            <Text>Account</Text>
          </Popover>
        </div>
      );
    },
  },
  async ({ canvas }) => {
    const popover = (await canvas.findByText('Account')).closest(
      '[data-placement]'
    )!;
    const boundary = window.visualViewport?.width ?? window.innerWidth;

    expect(popover.getBoundingClientRect().right).toBeLessThanOrEqual(
      boundary - EXAGGERATED_PADDING
    );
  }
);
