import { useState } from 'react';
import { expect, waitFor } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { Inset } from '../Inset/Inset';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { Tray } from './Tray';

const meta = preview.meta({
  title: 'Components/Tray',
  component: Tray,
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
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open Tray' }));
    await waitFor(() =>
      expect(canvas.getByText('Tray Title')).toBeInTheDocument()
    );

    await userEvent.click(canvas.getByRole('button', { name: 'Close' }));
  },
});

export const Controlled = meta.story({
  render: args => {
    const [open, setOpen] = useState(false);
    const onOpenChange = (open: boolean) => {
      console.log('open', open);
      setOpen(open);
    };
    return (
      <Stack space={8} alignX="left">
        <Tray.Trigger open={open} onOpenChange={onOpenChange}>
          <Button>Open Tray</Button>
          <Tray {...args}>
            <Tray.Title>Controlled Tray</Tray.Title>
            <Tray.Content>
              <Text>This tray's open state is controlled externally.</Text>
            </Tray.Content>
            <Tray.Actions>
              <Button slot="close">Close</Button>
              <Button slot="close" variant="primary">
                Apply
              </Button>
            </Tray.Actions>
          </Tray>
        </Tray.Trigger>
        <pre>Tray is {open ? 'open' : 'closed'}</pre>
      </Stack>
    );
  },
});
