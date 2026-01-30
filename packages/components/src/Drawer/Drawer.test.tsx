import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import type { Theme } from '@marigold/system';
import { cva } from '@marigold/system';
import { Button } from '../Button/Button';
import { setup } from '../test.utils';
import type { DrawerProps } from './Drawer';
import { Drawer } from './Drawer';

// Note: Drawer is an overlay component that renders into a portal.
// It requires ThemeProvider directly due to portal rendering behavior.

let isSmallScreen = false;
const mockMatchMedia = () =>
  vi.fn().mockImplementation(() => {
    return {
      matches: isSmallScreen,
    };
  });
window.matchMedia = mockMatchMedia();

const theme: Theme = {
  name: 'test',
  components: {
    Button: cva(),
    CloseButton: cva('size-5'),
    Drawer: {
      overlay: cva(),
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
      header: cva(),
      title: cva(),
      content: cva(),
      actions: cva(),
    },
    Underlay: cva(),
    Modal: cva(),
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
  expect(screen.queryByText('Drawer Content')).toBeNull();
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

test('slides from the left', async () => {
  render(<Component placement="left" />);

  const button = screen.getByRole('button', { name: 'Toggle' });
  await user.click(button);

  const drawerModal = screen.getByTestId('drawer-modal');
  expect(drawerModal).toBeInTheDocument();
  expect(drawerModal?.className).toMatchSnapshot(
    `"entering:animate-slide-in-left exiting:animate-slide-out-left top-0 left-0"`
  );
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

  expect(screen.getByRole('complementary')).toBeInTheDocument();
});

test('allows to set other landmark roles', async () => {
  render(<Component role="navigation" />);

  const button = screen.getByRole('button', { name: 'Toggle' });
  await user.click(button);

  expect(screen.getByRole('navigation')).toBeInTheDocument();
});

test('able to show a close button', async () => {
  render(<Component closeButton />);

  const button = screen.getByRole('button', { name: 'Toggle' });
  await user.click(button);

  expect(screen.getByLabelText('dismiss drawer')).toBeInTheDocument();
});

test('able to close via close button', async () => {
  render(<Component closeButton />);

  const button = screen.getByRole('button', { name: 'Toggle' });
  await user.click(button);

  const drawer = screen.getByText('Drawer Content');
  expect(drawer).toBeInTheDocument();

  const close = screen.getByLabelText('dismiss drawer');
  await user.click(close);

  expect(drawer).not.toBeInTheDocument();
});

test('uses modal on small screens', async () => {
  isSmallScreen = true;
  render(<Component closeButton />);

  const button = screen.getByRole('button', { name: 'Toggle' });
  await user.click(button);

  const drawer = screen.getByText('Drawer Content');
  expect(drawer).toBeInTheDocument();

  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(screen.queryByRole('complementary')).not.toBeInTheDocument();
});
