import { useRef } from 'react';
import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { ActionMenu } from '../Menu/ActionMenu';
import { Menu } from '../Menu/Menu';
import { OverlayContainerProvider } from '../Provider/OverlayContainerProvider';
import { Text } from '../Text/Text';
import { Popover } from './Popover';
import { getClipBoundary } from './clipBoundary';

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

const BOUNDARY_INSET = 300;

const SUBPIXEL = 1;

AtViewportEdge.test(
  'Clamps the menu to the clip boundary rather than the viewport',
  {
    tags: ['!dev'],
    parameters: { chromatic: { disableSnapshot: true } },
    beforeEach: () => {
      const boundary = getClipBoundary()!;
      boundary.style.right = `${BOUNDARY_INSET}px`;

      return () => {
        boundary.style.right = '0px';
      };
    },
  },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'User menu' }));

    const popover = (await canvas.findByRole('menu')).closest(
      '[data-placement]'
    )!;

    expect(popover.getBoundingClientRect().right).toBeLessThanOrEqual(
      getClipBoundary()!.getBoundingClientRect().right + SUBPIXEL
    );
  }
);

// Space above the bar, so the trigger can sit near the bottom of a scrolled page.
const SCROLLED_TRIGGER_OFFSET = 90;

AtViewportEdge.test(
  'Keeps the menu inside the viewport once the page is scrolled',
  {
    tags: ['!dev'],
    parameters: { chromatic: { disableSnapshot: true } },
    decorators: [
      Story => (
        <div className="pt-[150vh]">
          <Story />
        </div>
      ),
    ],
  },
  async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: 'User menu' });
    window.scrollTo(
      0,
      trigger.getBoundingClientRect().top +
        window.scrollY -
        window.innerHeight +
        SCROLLED_TRIGGER_OFFSET
    );

    await userEvent.click(trigger);

    const popover = (await canvas.findByRole('menu')).closest(
      '[data-placement]'
    )!;

    // A boundary read in the wrong coordinate space is off by the scroll offset:
    // react-aria then sees room below the trigger that is not there, leaves the
    // menu unflipped and squashes it against the bottom edge with `max-height`.
    expect(popover).toHaveAttribute('data-placement', 'top');
    expect(popover.getBoundingClientRect().bottom).toBeLessThanOrEqual(
      window.innerHeight + SUBPIXEL
    );
  }
);
