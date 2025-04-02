import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { cva } from '@marigold/system';
import type { Theme } from '@marigold/system';
import { Button } from '../Button';
import { setup } from '../test.utils';
import { Drawer } from './Drawer';
import type { DrawerProps } from './Drawer';

const mockMatchMedia = (matches: string[]) =>
  jest.fn().mockImplementation(query => {
    return {
      matches: matches.includes(query),
    };
  });
window.matchMedia = mockMatchMedia(['(max-width: 1024px)']);

const theme: Theme = {
  name: 'test',
  components: {
    Button: cva(''),
    Drawer: {
      overlay: cva(''),
      container: cva('p-5', {
        variants: {
          variant: {
            custom: 'bg-green-400',
          },
          size: {
            large: 'w-[400px]',
          },
        },
      }),
      closeButton: cva('p-1', {
        variants: {
          variant: {
            custom: 'bg-black',
          },
        },
      }),
      header: cva(''),
      title: cva(''),
      content: cva(''),
      actions: cva(''),
    },
  },
};

const Component = (props: DrawerProps) => (
  <Drawer.Trigger>
    <Button>Toggle</Button>
    <Drawer {...props}>
      <Drawer.Title>Drawer Title</Drawer.Title>
      <Drawer.Content>Drawer Content</Drawer.Content>
      <Drawer.Actions>
        <Button slot="close">Close</Button>
        <Button variant="primary">Save</Button>
      </Drawer.Actions>
    </Drawer>
  </Drawer.Trigger>
);

const user = userEvent.setup();
const { render } = setup({ theme });

test('renders nothing if isOpen is not set', () => {
  render(<Component />);
  expect(screen.queryByRole('dialog')).toBeNull();
});

test('opens/closes via trigger', async () => {
  render(<Component />);

  const button = screen.getByRole('button', { name: 'Toggle' });
  expect(screen.queryByText('Drawer Content')).not.toBeInTheDocument();

  await user.click(button);

  const drawer = screen.getByText('Drawer Content');
  expect(drawer).toBeInTheDocument();

  await user.click(button);

  expect(drawer).not.toBeInTheDocument();
});

test('can be closed with esc key', async () => {
  render(<Component />);

  const button = screen.getByRole('button', { name: 'Toggle' });
  await user.click(button);

  const drawer = screen.getByText('Drawer Content');
  expect(drawer).toBeInTheDocument();

  await user.keyboard('{Escape}');
  expect(drawer).not.toBeInTheDocument();
});

test('disable closing via esc key', async () => {
  render(<Component keyboardDismissable={false} />);

  const button = screen.getByRole('button', { name: 'Toggle' });
  await user.click(button);

  const drawer = screen.getByText('Drawer Content');
  expect(drawer).toBeInTheDocument();

  await user.keyboard('{Escape}');
  expect(drawer).toBeInTheDocument();
});

test('can be closed via button with [slot="close"]', async () => {
  render(<Component />);

  const button = screen.getByRole('button', { name: 'Toggle' });
  await user.click(button);

  const drawer = screen.getByText('Drawer Content');
  expect(drawer).toBeInTheDocument();

  const close = screen.getByRole('button', { name: 'Close' });
  await user.click(close);

  expect(drawer).not.toBeInTheDocument();
});

test('has "complementary" role by default', async () => {
  render(<Component />);

  const button = screen.getByRole('button', { name: 'Toggle' });
  await user.click(button);

  expect(screen.queryByRole('complementary')).toBeInTheDocument();
});

test('allows to set other landmark roles', async () => {
  render(<Component role="navigation" />);

  const button = screen.getByRole('button', { name: 'Toggle' });
  await user.click(button);

  expect(screen.queryByRole('navigation')).toBeInTheDocument();
});

test('able to show a close button', async () => {
  render(<Component closeButton />);

  const button = screen.getByRole('button', { name: 'Toggle' });
  await user.click(button);

  const dialog = screen.getByRole('complementary');
  const close = within(dialog).getAllByRole('button');
  console.log(close.length);
});
