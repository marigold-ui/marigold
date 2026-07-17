import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { vi } from 'vitest';
import { theme } from '@marigold/theme-rui';
import { Button } from '../Button/Button';
import { MarigoldProvider } from '../Provider/MarigoldProvider';
import { mockMatchMedia, renderWithOverlay } from '../test.utils';
import { Drawer } from './Drawer';
import { Basic, BleedAccordion, OneAtATime } from './Drawer.stories';
import { registerActiveDrawer } from './drawerRegistry';

const smallScreenQuery = `(width < ${theme.screens!.sm})`;

window.matchMedia = mockMatchMedia([]);

const user = userEvent.setup();

test('renders nothing if isOpen is not set', () => {
  renderWithOverlay(<Basic.Component />);
  expect(screen.queryByText('Drawer Title')).toBeNull();
});

test('opens/closes via trigger', async () => {
  renderWithOverlay(<Basic.Component />);

  const button = screen.getByRole('button', { name: 'Open Drawer' });
  expect(screen.queryByText('Drawer Title')).not.toBeInTheDocument();

  await user.click(button);

  const drawer = screen.getByText('Drawer Title');
  expect(drawer).toBeInTheDocument();

  await user.click(button);

  await waitFor(() => expect(drawer).not.toBeInTheDocument());
});

test('can be closed with esc key', async () => {
  renderWithOverlay(<Basic.Component />);

  const button = screen.getByRole('button', { name: 'Open Drawer' });
  await user.click(button);

  const drawer = screen.getByText('Drawer Title');
  expect(drawer).toBeInTheDocument();

  await user.keyboard('{Escape}');
  await waitFor(() => expect(drawer).not.toBeInTheDocument());
});

test('disable closing via esc key', async () => {
  renderWithOverlay(<Basic.Component keyboardDismissable={false} />);

  const button = screen.getByRole('button', { name: 'Open Drawer' });
  await user.click(button);

  const drawer = screen.getByText('Drawer Title');
  expect(drawer).toBeInTheDocument();

  await user.keyboard('{Escape}');
  expect(drawer).toBeInTheDocument();
});

test('has "complementary" role by default', async () => {
  renderWithOverlay(<Basic.Component />);

  const button = screen.getByRole('button', { name: 'Open Drawer' });
  await user.click(button);

  expect(screen.getByRole('complementary')).toBeInTheDocument();
});

test('allows to set other landmark roles', async () => {
  renderWithOverlay(<Basic.Component role="navigation" />);

  const button = screen.getByRole('button', { name: 'Open Drawer' });
  await user.click(button);

  expect(screen.getByRole('navigation')).toBeInTheDocument();
});

test('able to show a close button', async () => {
  renderWithOverlay(<Basic.Component closeButton />);

  const button = screen.getByRole('button', { name: 'Open Drawer' });
  await user.click(button);

  expect(screen.getByLabelText('Dismiss drawer')).toBeInTheDocument();
});

test('able to close via close button', async () => {
  renderWithOverlay(<Basic.Component closeButton />);

  const button = screen.getByRole('button', { name: 'Open Drawer' });
  await user.click(button);

  const drawer = screen.getByText('Drawer Title');
  expect(drawer).toBeInTheDocument();

  const close = screen.getByLabelText('Dismiss drawer');
  await user.click(close);

  await waitFor(() => expect(drawer).not.toBeInTheDocument());
});

test('uses modal on small screens', async () => {
  window.matchMedia = mockMatchMedia([smallScreenQuery]);
  renderWithOverlay(<Basic.Component closeButton />);

  const button = screen.getByRole('button', { name: 'Open Drawer' });
  await user.click(button);

  const drawer = screen.getByText('Drawer Title');
  expect(drawer).toBeInTheDocument();

  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(screen.queryByRole('complementary')).not.toBeInTheDocument();
});

test('controlled drawers receive onOpenChange(false) when preempted', async () => {
  const onOpenChangeA = vi.fn();
  const onOpenChangeB = vi.fn();

  const TwoControlled = () => {
    const [openA, setOpenA] = useState(false);
    const [openB, setOpenB] = useState(false);
    return (
      <>
        <Drawer.Trigger
          open={openA}
          onOpenChange={next => {
            onOpenChangeA(next);
            setOpenA(next);
          }}
        >
          <Button>Open A</Button>
          <Drawer>
            <Drawer.Title>Title A</Drawer.Title>
            <Drawer.Content>Content A</Drawer.Content>
          </Drawer>
        </Drawer.Trigger>
        <Drawer.Trigger
          open={openB}
          onOpenChange={next => {
            onOpenChangeB(next);
            setOpenB(next);
          }}
        >
          <Button>Open B</Button>
          <Drawer>
            <Drawer.Title>Title B</Drawer.Title>
            <Drawer.Content>Content B</Drawer.Content>
          </Drawer>
        </Drawer.Trigger>
      </>
    );
  };

  renderWithOverlay(
    <MarigoldProvider theme={theme}>
      <TwoControlled />
    </MarigoldProvider>
  );

  await user.click(screen.getByRole('button', { name: 'Open A' }));
  expect(await screen.findByText('Title A')).toBeInTheDocument();
  expect(onOpenChangeA).toHaveBeenLastCalledWith(true);

  await user.click(screen.getByRole('button', { name: 'Open B' }));
  expect(await screen.findByText('Title B')).toBeInTheDocument();

  await waitFor(() => expect(onOpenChangeA).toHaveBeenCalledWith(false));
  expect(onOpenChangeB).toHaveBeenCalledWith(true);
});

test('coordination also applies on small screens (mobile path)', async () => {
  window.matchMedia = mockMatchMedia([smallScreenQuery]);
  renderWithOverlay(<OneAtATime.Component />);

  await user.click(screen.getByRole('button', { name: 'Open A' }));
  expect(await screen.findByText('Title A')).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Open B' }));
  expect(await screen.findByText('Title B')).toBeInTheDocument();

  await waitFor(() =>
    expect(screen.queryByText('Title A')).not.toBeInTheDocument()
  );
});

test('registry no-ops on same-handler re-registration', () => {
  const close = vi.fn();
  const unregister = registerActiveDrawer(close);
  registerActiveDrawer(close);
  unregister();

  expect(close).not.toHaveBeenCalled();
});

test('`bleed` content drops the padding and publishes --bleed-px', async () => {
  renderWithOverlay(<BleedAccordion.Component />);

  await user.click(screen.getByRole('button', { name: 'Open Drawer' }));
  const header = await screen.findByRole('button', { name: 'General' });

  // Match where the var is *set* (`[--bleed-px:`), not where a child reads it.
  // eslint-disable-next-line testing-library/no-node-access
  const content = header.closest('[class*="[--bleed-px:"]')!;
  expect(content).not.toBeNull();
  expect(content.className).not.toContain('ui-panel-content');
  expect(content.className).toContain('[--bleed-px:var(--ui-panel-px)]');
});

test('non-bled content keeps the padded ui-panel-content', async () => {
  renderWithOverlay(<Basic.Component />);

  await user.click(screen.getByRole('button', { name: 'Open Drawer' }));
  const paragraph = await screen.findByText(/Once upon a time/);

  // eslint-disable-next-line testing-library/no-node-access
  const content = paragraph.closest('[class*="ui-panel-content"]');
  expect(content).not.toBeNull();
});
