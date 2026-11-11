import { useState } from 'react';
import { expect, waitFor } from 'storybook/test';
import preview from '.storybook/preview';
import { Copy, Pencil } from '@marigold/icons';
import { Button } from '../Button/Button';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
import { Description } from '../Description/Description';
import { Inset } from '../Inset/Inset';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { Title } from '../Title/Title';
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
      description:
        'Whether swiping down, pressing Escape and clicking outside close the tray.',
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

Basic.test('Opens and closes the tray', async ({ canvas, userEvent, step }) => {
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

    // Escape needs focus inside, RAC moves it in after the slide-in.
    await waitFor(() =>
      expect(canvas.getByRole('dialog')).toContainElement(
        document.activeElement as HTMLElement
      )
    );

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
  async ({ canvas, userEvent, step }) => {
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
          <Tray {...args} dismissable>
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
  async ({ canvas, userEvent, step }) => {
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

      // Escape needs focus inside, RAC moves it in after the slide-in.
      await waitFor(() =>
        expect(canvas.getByRole('dialog')).toContainElement(
          document.activeElement as HTMLElement
        )
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
  async ({ canvas, userEvent }) => {
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
  // Snapshot the opened tray in the test below instead.
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

interface TrayTestContext {
  canvas: {
    getByRole: (role: string, options?: { name: string }) => HTMLElement;
  };
  userEvent: { click: (element: Element) => Promise<void> };
}

const openTray = async ({ canvas, userEvent: user }: TrayTestContext) => {
  await user.click(canvas.getByRole('button', { name: 'Open Tray' }));

  const dialog = await waitFor(() => canvas.getByRole('dialog'));
  const content = dialog.querySelector('[data-slot="content"]') as HTMLElement;

  // Entered: fully in view, focus inside.
  await waitFor(() => {
    expect(dialog.getBoundingClientRect().bottom).toBeLessThanOrEqual(
      window.innerHeight + 1
    );
    expect(dialog).toContainElement(document.activeElement as HTMLElement);
  });

  return { dialog, content };
};

/** Swiping scrolls RAC's snap container, down is toward 0. */
const swipeDown = (dialog: HTMLElement) => {
  let scroller = dialog.parentElement;
  while (scroller && getComputedStyle(scroller).scrollSnapType === 'none') {
    scroller = scroller.parentElement;
  }
  scroller!.scrollTo({ top: 0 });
};

/** The stacked element that doesn't contain the dialog. */
const backdrop = () =>
  document.querySelector(
    '[data-stack-index]:not(:has([role="dialog"]))'
  ) as HTMLElement;

/** Gives an unwanted close time to happen. */
const settle = () => new Promise(resolve => setTimeout(resolve, 500));

Basic.test(
  'Returns focus to the trigger however it closes',
  async ({ canvas, userEvent, step }) => {
    const trigger = canvas.getByRole('button', { name: 'Open Tray' });

    await step('swipe down', async () => {
      const { dialog } = await openTray({ canvas, userEvent });

      swipeDown(dialog);

      await waitFor(() =>
        expect(canvas.queryByRole('dialog')).not.toBeInTheDocument()
      );
      // RAC restores focus a frame after the sheet unmounts.
      await waitFor(() => expect(trigger).toHaveFocus());
    });

    await step('backdrop press', async () => {
      await openTray({ canvas, userEvent });

      await userEvent.click(backdrop());

      await waitFor(() =>
        expect(canvas.queryByRole('dialog')).not.toBeInTheDocument()
      );
      await waitFor(() => expect(trigger).toHaveFocus());
    });

    await step('Escape', async () => {
      await openTray({ canvas, userEvent });

      await userEvent.keyboard('{Escape}');

      await waitFor(() =>
        expect(canvas.queryByRole('dialog')).not.toBeInTheDocument()
      );
      await waitFor(() => expect(trigger).toHaveFocus());
    });
  }
);

Basic.test(
  'Ignores swipe, backdrop and Escape when not dismissable',
  { args: { dismissable: false } },
  async ({ canvas, userEvent, step }) => {
    const { dialog } = await openTray({ canvas, userEvent });

    await step('swipe, backdrop press and Escape keep it open', async () => {
      swipeDown(dialog);
      await userEvent.click(backdrop());
      await userEvent.keyboard('{Escape}');
      await settle();

      expect(canvas.getByRole('dialog')).toBeVisible();
    });

    await step('the close button still closes it', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Close' }));

      await waitFor(() =>
        expect(canvas.queryByRole('dialog')).not.toBeInTheDocument()
      );
    });
  }
);

const closeButtonBottom = (canvas: TrayTestContext['canvas']) =>
  canvas.getByRole('button', { name: 'Close' }).getBoundingClientRect().bottom;

ScrollableContent.test(
  'Opens a tray whose content overflows',
  // Keep snapshot: the only story where content actually scrolls.
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open Tray' }));

    const dialog = await waitFor(() => canvas.getByRole('dialog'));

    expect(dialog).toBeVisible();
    expect(canvas.getByText('City 1')).toBeInTheDocument();
  }
);

ScrollableContent.test(
  'scrolls its content without dismissing',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    const { content } = await openTray({ canvas, userEvent });

    content.scrollTop = 200;
    await settle();

    expect(content.scrollTop).toBeGreaterThan(0);
    expect(canvas.getByRole('dialog')).toBeVisible();
  }
);

ScrollableContent.test(
  'keeps the actions inside the tray when the viewport shrinks',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent, step }) => {
    // Imported here, not at module scope: `vitest/browser` throws on import
    // outside Browser Mode, and Storybook itself loads this file too.
    const { page } = await import('vitest/browser');

    await page.viewport(400, 844);

    try {
      await step('opens with the actions on screen', async () => {
        await openTray({ canvas, userEvent });

        expect(closeButtonBottom(canvas)).toBeLessThanOrEqual(
          window.innerHeight
        );
      });

      await step('keeps them on screen after a shrink', async () => {
        await page.viewport(400, 500);

        await waitFor(() =>
          expect(closeButtonBottom(canvas)).toBeLessThanOrEqual(
            window.innerHeight
          )
        );
      });
    } finally {
      await page.viewport(1280, 720);
    }
  }
);

export const ShrinkingContent = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: args => {
    const [count, setCount] = useState(40);

    return (
      <Tray.Trigger>
        <Button>Open Tray</Button>
        <Tray {...args}>
          <Tray.Title>Pick a city</Tray.Title>
          <Tray.Content>
            <Stack space={2}>
              <Button onPress={() => setCount(2)}>Filter</Button>
              {Array.from({ length: count }, (_, i) => (
                <Text key={i}>City {i + 1}</Text>
              ))}
            </Stack>
          </Tray.Content>
          <Tray.Actions>
            <Button slot="close">Close</Button>
          </Tray.Actions>
        </Tray>
      </Tray.Trigger>
    );
  },
});

ShrinkingContent.test(
  'keeps the height it opened with when the content shrinks',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent, step }) => {
    const { page } = await import('vitest/browser');

    await page.viewport(400, 844);

    try {
      const { dialog } = await openTray({ canvas, userEvent });
      const opened = dialog.getBoundingClientRect().height;

      await step('filtering the list down keeps the height', async () => {
        await userEvent.click(canvas.getByRole('button', { name: 'Filter' }));

        await waitFor(() =>
          expect(canvas.queryByText('City 3')).not.toBeInTheDocument()
        );
        expect(dialog.getBoundingClientRect().height).toBeCloseTo(opened, 0);
      });

      await step('and a viewport change afterwards restores it', async () => {
        await page.viewport(400, 500);
        await waitFor(() =>
          expect(dialog.getBoundingClientRect().height).toBeLessThan(opened)
        );

        await page.viewport(400, 844);
        await waitFor(() =>
          expect(dialog.getBoundingClientRect().height).toBeCloseTo(opened, 0)
        );
      });
    } finally {
      await page.viewport(1280, 720);
    }
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
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open Tray' }));

    const tray = await waitFor(() =>
      canvas.getByRole('dialog', { name: 'Quick settings' })
    );
    const title = canvas.getByRole('heading', { name: 'Quick settings' });

    expect(title.tagName).toBe('H2');
    expect(tray).toHaveAttribute('aria-labelledby', title.id);
  }
);

/** Controlled without `Tray.Trigger`: every close has to reach `onOpenChange`. */
export const Controlled = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: args => {
    const [open, setOpen] = useState(false);

    return (
      <Stack space={4} alignX="left">
        <Button onPress={() => setOpen(true)}>Open Tray</Button>
        <Tray {...args} open={open} onOpenChange={setOpen}>
          <Tray.Title>Controlled</Tray.Title>
          <Tray.Content>
            <Text>Opened without a Tray.Trigger.</Text>
          </Tray.Content>
          <Tray.Actions>
            <Button slot="close">Close</Button>
          </Tray.Actions>
        </Tray>
        <pre>Tray is {open ? 'open' : 'closed'}</pre>
      </Stack>
    );
  },
});

Controlled.test(
  'Reports every close through onOpenChange',
  async ({ canvas, userEvent, step }) => {
    await step('close button', async () => {
      await openTray({ canvas, userEvent });

      await userEvent.click(canvas.getByRole('button', { name: 'Close' }));

      await waitFor(() => {
        expect(canvas.getByText('Tray is closed')).toBeInTheDocument();
        expect(canvas.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    await step('swipe down', async () => {
      const { dialog } = await openTray({ canvas, userEvent });

      swipeDown(dialog);

      await waitFor(() => {
        expect(canvas.getByText('Tray is closed')).toBeInTheDocument();
        expect(canvas.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });
  }
);
