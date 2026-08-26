import { useState } from 'react';
import { expect, userEvent, waitFor } from 'storybook/test';
import preview from '.storybook/preview';
import { Copy, Pencil } from '@marigold/icons';
import { Button } from '../Button/Button';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
import { Description } from '../Description/Description';
import { Inset } from '../Inset/Inset';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { Title } from '../Title/Title';
import { TRAY_CONTENT_ATTR } from './Context';
import { Tray } from './Tray';

const meta = preview.meta({
  title: 'Components/Tray',
  parameters: { surface: false },
  component: Tray,
  decorators: [
    Story => (
      <div id="storybook-root">
        <Story />
      </div>
    ),
  ],
  globals: {
    viewport: { value: 'smallScreen' },
  },
  argTypes: {
    dismissable: {
      control: {
        type: 'boolean',
      },
      description: 'Whether clicking outside closes the tray.',
    },
    keyboardDismissable: {
      control: {
        type: 'boolean',
      },
      description: 'Whether pressing the escape key closes the tray.',
    },
  },
  args: {},
});

export const Basic = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: args => (
    <Tray.Trigger>
      <Button>Open Tray</Button>
      <Tray {...args}>
        <Tray.Title>Tray Title</Tray.Title>
        <Tray.Content>
          <Text>
            This is a tray component that slides in from the bottom of the
            screen. It's useful for mobile-friendly interactions and quick
            actions.
          </Text>
          <Text>
            Trays are commonly used for filters, settings, or contextual menus
            on mobile devices.
          </Text>
        </Tray.Content>
        <Tray.Actions>
          <Button slot="close">Close</Button>
          <Button slot="close" variant="primary">
            Confirm
          </Button>
        </Tray.Actions>
      </Tray>
    </Tray.Trigger>
  ),
});

Basic.test('Opens and closes the tray', async ({ canvas, step }) => {
  await step('Opens when trigger is clicked', async () => {
    const openButton = canvas.getByRole('button', { name: 'Open Tray' });
    await userEvent.click(openButton);

    await waitFor(() =>
      expect(canvas.getByText('Tray Title')).toBeInTheDocument()
    );
  });

  await step('Closes when close button is clicked', async () => {
    const closeButton = canvas.getByRole('button', { name: 'Close' });
    await userEvent.click(closeButton);

    await waitFor(() =>
      expect(canvas.queryByRole('dialog')).not.toBeInTheDocument()
    );
  });

  await step('Can be closed with escape key', async () => {
    const openButton = canvas.getByRole('button', { name: 'Open Tray' });
    await userEvent.click(openButton);

    await waitFor(() => expect(canvas.getByRole('dialog')).toBeInTheDocument());

    await userEvent.keyboard('{Escape}');

    await waitFor(() =>
      expect(canvas.queryByRole('dialog')).not.toBeInTheDocument()
    );
  });
});

Basic.test(
  'Opens the tray',
  // Keep the snapshot so Chromatic captures the opened tray.
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas, step }) => {
    await step('Open the tray and keep it open', async () => {
      const openButton = canvas.getByRole('button', { name: 'Open Tray' });
      await userEvent.click(openButton);

      const dialog = await waitFor(() => canvas.getByRole('dialog'));

      expect(dialog).toBeVisible();
      expect(canvas.getByText('Tray Title')).toBeInTheDocument();
    });
  }
);

export const DismissControlsWithCallbacks = meta.story({
  parameters: { chromatic: { disableSnapshot: true } },
  render: args => {
    const [open, setOpen] = useState(false);
    const [log, setLog] = useState<string[]>([]);

    const onOpenChange = (isOpen: boolean) => {
      setOpen(isOpen);
      setLog(prev => [...prev, isOpen ? 'Tray opened' : 'Tray closed']);
    };

    return (
      <Stack space={4} alignX="left">
        <Tray.Trigger open={open} onOpenChange={onOpenChange}>
          <Button>Open Tray</Button>
          <Tray {...args} dismissable keyboardDismissable>
            <Title>Dismiss Controls</Title>
            <Tray.Content>
              <Text>
                This tray demonstrates all dismiss methods with callback hooks.
                Try closing it via the close button, pressing Escape, or
                clicking the backdrop.
              </Text>
            </Tray.Content>
            <Tray.Actions>
              <Button slot="close">Cancel</Button>
              <Button slot="close" variant="primary">
                Save
              </Button>
            </Tray.Actions>
          </Tray>
        </Tray.Trigger>
        <pre>Tray is {open ? 'open' : 'closed'}</pre>
        <pre style={{ fontSize: 12, maxHeight: 120, overflow: 'auto' }}>
          {log.length ? log.join('\n') : 'No events yet'}
        </pre>
      </Stack>
    );
  },
});

DismissControlsWithCallbacks.test(
  'Dismiss controls and callback hooks',
  async ({ canvas, step }) => {
    await step('Shows closed state initially', async () => {
      expect(canvas.getByText('Tray is closed')).toBeInTheDocument();
    });

    await step('Opens tray and verifies callback fires', async () => {
      const openButton = canvas.getByRole('button', { name: 'Open Tray' });

      await userEvent.click(openButton);

      await waitFor(() =>
        expect(canvas.getByText('Dismiss Controls')).toBeInTheDocument()
      );
      expect(canvas.getByText('Tray is open')).toBeInTheDocument();
      expect(canvas.getByText(/Tray opened/)).toBeInTheDocument();
    });

    await step('Closes via close button and logs event', async () => {
      const cancelButton = canvas.getByRole('button', { name: 'Cancel' });

      await userEvent.click(cancelButton);

      await waitFor(() =>
        expect(canvas.queryByRole('dialog')).not.toBeInTheDocument()
      );
      expect(canvas.getByText('Tray is closed')).toBeInTheDocument();
      expect(canvas.getByText(/Tray closed/)).toBeInTheDocument();
    });

    await step('Closes via escape key and logs event', async () => {
      const openButton = canvas.getByRole('button', { name: 'Open Tray' });

      await userEvent.click(openButton);

      await waitFor(() =>
        expect(canvas.getByRole('dialog')).toBeInTheDocument()
      );

      await userEvent.keyboard('{Escape}');

      await waitFor(() =>
        expect(canvas.queryByRole('dialog')).not.toBeInTheDocument()
      );
    });
  }
);

/**
 * The slot-aware primitives `<Title>` / `<Description>` and the action
 * primitives can be used directly. `<Tray.Header>` groups the title and
 * description; a `<ButtonGroup>` inside `<Tray.Actions>` picks up its
 * defaults from the tray root.
 */
export const SlotPrimitives = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: args => (
    <Tray.Trigger>
      <Button>Open Tray</Button>
      <Tray {...args}>
        <Tray.Header>
          <Title>Manage event</Title>
          <Description>Update or duplicate this event.</Description>
        </Tray.Header>
        <Tray.Content>
          <Inset p={4}>
            <Text>Choose an action below.</Text>
          </Inset>
        </Tray.Content>
        <Tray.Actions>
          <ButtonGroup aria-label="Event actions">
            <Button>
              <Pencil />
              Edit
            </Button>
            <Button>
              <Copy />
              Duplicate
            </Button>
          </ButtonGroup>
        </Tray.Actions>
      </Tray>
    </Tray.Trigger>
  ),
});

SlotPrimitives.test(
  'Renders slot primitives with grouped actions',
  {
    parameters: { chromatic: { disableSnapshot: false } },
  },
  async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open Tray' }));
    await waitFor(() =>
      expect(canvas.getByText('Manage event')).toBeInTheDocument()
    );

    expect(
      canvas.getByRole('heading', { name: 'Manage event' })
    ).toBeInTheDocument();
    expect(canvas.getByText('Update or duplicate this event.').tagName).toBe(
      'P'
    );
    expect(
      canvas.getByRole('toolbar', { name: 'Event actions' })
    ).toBeInTheDocument();
  }
);

export const ScrollableContent = meta.story({
  tags: ['component-test'],
  // Closed, this is just the trigger button — the state worth snapshotting is
  // the opened tray, captured by the test below.
  parameters: { chromatic: { disableSnapshot: true } },
  render: args => (
    <Tray.Trigger>
      <Button>Open Tray</Button>
      <Tray {...args}>
        <Tray.Title>Pick a city</Tray.Title>
        <Tray.Content>
          <Stack space={2}>
            {Array.from({ length: 40 }, (_, i) => (
              <Text key={i}>City {i + 1}</Text>
            ))}
          </Stack>
        </Tray.Content>
        <Tray.Actions>
          <Button slot="close">Close</Button>
        </Tray.Actions>
      </Tray>
    </Tray.Trigger>
  ),
});

/** Vertical offset the tray has been dragged to, in px. */
const translateY = (element: HTMLElement) => {
  const { transform } = getComputedStyle(element);
  return transform === 'none' ? 0 : new DOMMatrixReadOnly(transform).m42;
};

/**
 * Drives a vertical drag with a primary touch pointer. Motion reads
 * `pageX`/`pageY` (`extractEventInfo`) and throttles its own updates through
 * `requestAnimationFrame`, so the coords have to carry page values and each
 * move has to be given a frame to land — otherwise `PanSession` never passes
 * its 3px threshold and no gesture ever happens.
 */
const dragVertically = async (
  // Takes the story context's `userEvent.pointer` rather than the whole
  // instance: the context type and the module-scope import are separate copies
  // of user-event's API.
  pointer: (input: Parameters<typeof userEvent.pointer>[0]) => Promise<unknown>,
  target: Element,
  { from, to, steps = 6 }: { from: number; to: number; steps?: number }
) => {
  const { left, width } = target.getBoundingClientRect();
  const x = Math.round(left + width / 2);
  const at = (y: number) => ({
    x,
    y,
    clientX: x,
    clientY: y,
    pageX: x + window.scrollX,
    pageY: y + window.scrollY,
  });
  const frame = () =>
    new Promise(resolve => requestAnimationFrame(() => resolve(null)));

  await pointer({ keys: '[TouchA>]', target, coords: at(from) });
  await frame();

  for (let i = 1; i <= steps; i++) {
    await pointer({
      pointerName: 'TouchA',
      target,
      coords: at(from + ((to - from) * i) / steps),
    });
    await frame();
  }

  await pointer({ keys: '[/TouchA]', target, coords: at(to) });
  await frame();
};

ScrollableContent.test(
  'Opens a tray whose content overflows',
  // The only story where the content area actually scrolls, and the fix
  // changes how that area behaves — so keep the snapshot.
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open Tray' }));

    const dialog = await waitFor(() => canvas.getByRole('dialog'));

    expect(dialog).toBeVisible();
    expect(canvas.getByText('City 1')).toBeInTheDocument();
  }
);

ScrollableContent.test(
  'drags only from the chrome, so a gesture in the content scrolls it',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent, step }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open Tray' }));
    const dialog = await waitFor(() => canvas.getByRole('dialog'));
    // The element `drag`/`dragListener` live on: RAC's `Modal` renders the
    // dialog's parent, and `TrayModal` makes that the motion element.
    const modal = dialog.parentElement as HTMLElement;
    const content = dialog.querySelector(
      `[${TRAY_CONTENT_ATTR}]`
    ) as HTMLElement;
    const handle = dialog.querySelector(
      '[class*="grid-area:drag"]'
    ) as HTMLElement;

    // Let the open animation settle so `translateY` starts from 0 and any
    // later movement can only come from a drag.
    await waitFor(() => expect(translateY(modal)).toBe(0));

    await step('the content can pan and select on touch', async () => {
      // While motion's own drag listener is armed it writes
      // `touch-action: pan-x` and `user-select: none` onto the dragged
      // element — `pan-x` is what stopped the content scrolling. Both fail if
      // `dragListener={false}` is dropped.
      expect(getComputedStyle(modal).touchAction).not.toBe('pan-x');
      expect(getComputedStyle(content).userSelect).not.toBe('none');
      // The chrome is the part whose vertical gesture we own.
      expect(getComputedStyle(handle).touchAction).toBe('none');
    });

    await step('the content is a scroll container', async () => {
      expect(content.scrollHeight).toBeGreaterThan(content.clientHeight);

      content.scrollTop = 120;
      expect(content.scrollTop).toBeGreaterThan(0);
      content.scrollTop = 0;
    });

    await step('a downward drag inside the content is ignored', async () => {
      const { top } = content.getBoundingClientRect();

      await dragVertically(userEvent.pointer, content, {
        from: top + 20,
        to: top + 20 + window.innerHeight,
      });

      // Nothing was dragged, so the tray never moved. Without the
      // `startsInTrayContent` guard this same gesture translates the modal by
      // most of the viewport and dismisses it.
      expect(translateY(modal)).toBe(0);
      expect(canvas.getByRole('dialog')).toBeInTheDocument();
    });

    await step('the same drag from the chrome dismisses the tray', async () => {
      const { top } = handle.getBoundingClientRect();

      await dragVertically(userEvent.pointer, handle, {
        from: top,
        to: top + window.innerHeight,
      });

      expect(translateY(modal)).toBeGreaterThan(0);
      await waitFor(() =>
        expect(canvas.queryByRole('dialog')).not.toBeInTheDocument()
      );
    });
  }
);

/**
 * A bare `<Title slot="title">` (no `<Tray.Header>`, no description) labels the
 * tray dialog automatically via `aria-labelledby`.
 */
export const TitleOnlyWithoutHeader = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: args => (
    <Tray.Trigger>
      <Button>Open Tray</Button>
      <Tray {...args}>
        <Title>Quick settings</Title>
        <Tray.Content>
          <Inset p={4}>
            <Text>Adjust your preferences below.</Text>
          </Inset>
        </Tray.Content>
      </Tray>
    </Tray.Trigger>
  ),
});

TitleOnlyWithoutHeader.test(
  'Labels the tray with a bare Title',
  async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open Tray' }));

    const tray = await waitFor(() =>
      canvas.getByRole('dialog', { name: 'Quick settings' })
    );
    const title = canvas.getByRole('heading', { name: 'Quick settings' });

    expect(title.tagName).toBe('H2');
    expect(tray).toHaveAttribute('aria-labelledby', title.id);
  }
);
