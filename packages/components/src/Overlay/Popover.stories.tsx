import { useRef } from 'react';
import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { ActionMenu } from '../Menu/ActionMenu';
import { Menu } from '../Menu/Menu';
import { OverlayContainerProvider } from '../Provider/OverlayContainerProvider';
import { Text } from '../Text/Text';
import { Popover } from './Popover';

const PORTAL_ID = 'popover-at-viewport-edge';

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

export const AtViewportEdge = meta.story({
  tags: ['dev', 'component-test'],
  parameters: {
    layout: 'fullscreen',
    surface: false,
    chromatic: { disableSnapshot: false },
  },
  decorators: [
    Story => (
      <OverlayContainerProvider container={PORTAL_ID}>
        <div id={PORTAL_ID} />
        <Story />
      </OverlayContainerProvider>
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

const EXAGGERATED_PADDING = 100;

const SUBPIXEL = 1;

AtViewportEdge.test(
  'Holds the menu containerPadding away from react-aria’s boundary',
  {
    tags: ['!dev'],
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
      boundary - EXAGGERATED_PADDING + SUBPIXEL
    );
  }
);
