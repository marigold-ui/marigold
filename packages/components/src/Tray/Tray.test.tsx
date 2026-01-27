import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import type { Theme } from '@marigold/system';
import { cva } from '@marigold/system';
import { Button } from '../Button/Button';
import { setup } from '../test.utils';
import type { TrayProps } from './Tray';
import { Tray } from './Tray';

const theme: Theme = {
  name: 'test',
  components: {
    Button: cva(),
    CloseButton: cva('size-5'),
    Tray: {
      overlay: cva(),
      modal: cva(),
      container: cva('p-5'),
      closeButton: cva('p-1'),
      header: cva(),
      title: cva(),
      content: cva(),
      actions: cva(),
    },
  },
};

const ControlledTray = (props: TrayProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onPress={() => setOpen(true)}>Open Tray</Button>
      <Tray {...props} open={open} onOpenChange={setOpen}>
        <Tray.Title>Tray Title</Tray.Title>
        <Tray.Content>Tray Content</Tray.Content>
        <Tray.Actions>
          <Button onPress={() => setOpen(false)}>Close</Button>
          <Button variant="primary">Save</Button>
        </Tray.Actions>
      </Tray>
    </>
  );
};

const user = userEvent.setup();
const { render } = setup({ theme });

test('renders nothing if open is not set', () => {
  render(
    <Tray>
      <Tray.Content>Tray Content</Tray.Content>
    </Tray>
  );
  expect(screen.queryByText('Tray Content')).toBeNull();
});

test('renders children when open', () => {
  render(
    <Tray open>
      <Tray.Content>Tray Content</Tray.Content>
    </Tray>
  );
  expect(screen.getByText('Tray Content')).toBeInTheDocument();
});

test('renders all subcomponents', () => {
  render(
    <Tray open>
      <Tray.Title>Tray Title</Tray.Title>
      <Tray.Content>Tray Content</Tray.Content>
      <Tray.Actions>Tray Actions</Tray.Actions>
    </Tray>
  );

  expect(screen.getByText('Tray Title')).toBeInTheDocument();
  expect(screen.getByText('Tray Content')).toBeInTheDocument();
  expect(screen.getByText('Tray Actions')).toBeInTheDocument();
});

test('opens/closes via controlled state', async () => {
  render(<ControlledTray />);

  const openButton = screen.getByRole('button', { name: 'Open Tray' });
  expect(screen.queryByText('Tray Content')).not.toBeInTheDocument();

  await user.click(openButton);

  const tray = screen.getByText('Tray Content');
  expect(tray).toBeInTheDocument();

  const closeButton = screen.getByRole('button', { name: 'Close' });
  await user.click(closeButton);

  expect(tray).not.toBeInTheDocument();
});

test('can be closed with escape key', async () => {
  render(<ControlledTray />);

  const openButton = screen.getByRole('button', { name: 'Open Tray' });
  await user.click(openButton);

  const tray = screen.getByText('Tray Content');
  expect(tray).toBeInTheDocument();

  await user.keyboard('{Escape}');
  expect(tray).not.toBeInTheDocument();
});

test('disable closing via escape key', async () => {
  render(<ControlledTray keyboardDismissable={false} />);

  const openButton = screen.getByRole('button', { name: 'Open Tray' });
  await user.click(openButton);

  const tray = screen.getByText('Tray Content');
  expect(tray).toBeInTheDocument();

  await user.keyboard('{Escape}');
  expect(tray).toBeInTheDocument();
});

test('has dialog role', () => {
  render(
    <Tray open>
      <Tray.Content>Tray Content</Tray.Content>
    </Tray>
  );

  expect(screen.getByRole('dialog')).toBeInTheDocument();
});

test('able to show a close button', () => {
  render(
    <Tray open closeButton>
      <Tray.Content>Tray Content</Tray.Content>
    </Tray>
  );

  expect(screen.getByLabelText('dismiss tray')).toBeInTheDocument();
});

test('able to close via close button', async () => {
  render(<ControlledTray closeButton />);

  const openButton = screen.getByRole('button', { name: 'Open Tray' });
  await user.click(openButton);

  const tray = screen.getByText('Tray Content');
  expect(tray).toBeInTheDocument();

  const closeBtn = screen.getByLabelText('dismiss tray');
  await user.click(closeBtn);

  expect(tray).not.toBeInTheDocument();
});

test('calls onOpenChange when state changes', async () => {
  const onOpenChange = vi.fn();

  render(
    <Tray open onOpenChange={onOpenChange}>
      <Tray.Content>Tray Content</Tray.Content>
    </Tray>
  );

  await user.keyboard('{Escape}');
  expect(onOpenChange).toHaveBeenCalledWith(false);
});
