import { useState } from 'react';
import { expect, userEvent, waitFor } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { Inset } from '../Inset/Inset';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { Tray } from './Tray';

const meta = preview.meta({
  title: 'Components/Tray',
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
  render: args => (
    <Tray.Trigger>
      <Button>Open Tray</Button>
      <Tray {...args}>
        <Tray.Title>Tray Title</Tray.Title>
        <Tray.Content>
          <Inset space={4}>
            <Text>
              This is a tray component that slides in from the bottom of the
              screen. It's useful for mobile-friendly interactions and quick
              actions.
            </Text>
            <Text>
              Trays are commonly used for filters, settings, or contextual menus
              on mobile devices.
            </Text>
          </Inset>
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

export const DismissControlsWithCallbacks = meta.story({
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
            <Tray.Title>Dismiss Controls</Tray.Title>
            <Tray.Content>
              <Inset space={4}>
                <Text>
                  This tray demonstrates all dismiss methods with callback
                  hooks. Try closing it via the close button, pressing Escape,
                  or clicking the backdrop.
                </Text>
              </Inset>
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
