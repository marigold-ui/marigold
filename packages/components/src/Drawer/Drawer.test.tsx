import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { useState } from 'react';
import type { MockInstance } from 'vitest';
import { vi } from 'vitest';
import { theme } from '@marigold/theme-rui';
import { Button } from '../Button/Button';
import { MarigoldProvider } from '../Provider/MarigoldProvider';
import {
  mockMatchMedia,
  renderWithOverlay,
  smallScreenQuery,
} from '../test.utils';
import { Drawer } from './Drawer';
import {
  Basic,
  BleedAccordion,
  ControlledWithoutTrigger,
  DefaultOpen,
  OneAtATime,
} from './Drawer.stories';
import { registerActiveDrawer } from './drawerRegistry';

const user = userEvent.setup();

const renderThemed = (ui: ReactNode) =>
  renderWithOverlay(<MarigoldProvider theme={theme}>{ui}</MarigoldProvider>);

// Tests that need a small screen set it themselves, every other test runs on
// the desktop path.
beforeEach(() => {
  window.matchMedia = mockMatchMedia([]);
});

// Scoped to the describe blocks that assert on warnings, so the rest of the
// file still surfaces unrelated dev warnings.
let warn: MockInstance<typeof console.warn>;
const spyOnWarn = () => {
  beforeEach(() => {
    warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });
  afterEach(() => {
    warn.mockRestore();
  });
};

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

test('disable closing via esc key on small screens', async () => {
  window.matchMedia = mockMatchMedia([smallScreenQuery]);
  renderWithOverlay(<Basic.Component keyboardDismissable={false} />);

  await user.click(screen.getByRole('button', { name: 'Open Drawer' }));

  const drawer = screen.getByText('Drawer Title');
  expect(screen.getByRole('dialog')).toBeInTheDocument();

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

  renderThemed(<TwoControlled />);

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
  expect(content.className).not.toContain('ui-surface-content');
  expect(content.className).toContain('[--bleed-px:var(--ui-surface-px)]');
});

test('non-bled content keeps the padded ui-surface-content', async () => {
  renderWithOverlay(<Basic.Component />);

  await user.click(screen.getByRole('button', { name: 'Open Drawer' }));
  const paragraph = await screen.findByText(/Once upon a time/);

  // eslint-disable-next-line testing-library/no-node-access
  const content = paragraph.closest('[class*="ui-surface-content"]');
  expect(content).not.toBeNull();
});

describe('without Drawer.Trigger', () => {
  spyOnWarn();

  test('controlled drawer opens and closes on small screens', async () => {
    window.matchMedia = mockMatchMedia([smallScreenQuery]);
    const onOpenChange = vi.fn();
    renderWithOverlay(
      <ControlledWithoutTrigger.Component onOpenChange={onOpenChange} />
    );

    await user.click(screen.getByRole('button', { name: 'Edit selection' }));
    expect(await screen.findByText('Edit events')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Dismiss drawer' }));
    await waitFor(() =>
      expect(screen.queryByText('Edit events')).not.toBeInTheDocument()
    );
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    expect(warn).not.toHaveBeenCalledWith(
      expect.stringContaining('PressResponder')
    );
  });

  test('uncontrolled drawer with defaultOpen renders on small screens', async () => {
    window.matchMedia = mockMatchMedia([smallScreenQuery]);
    renderWithOverlay(<DefaultOpen.Component />);

    expect(await screen.findByText('Opened by default')).toBeInTheDocument();
  });

  test('receives onOpenChange(false) when another drawer opens', async () => {
    const onOpenChange = vi.fn();

    renderThemed(
      <>
        <ControlledWithoutTrigger.Component onOpenChange={onOpenChange} />
        <Drawer.Trigger>
          <Button>Open B</Button>
          <Drawer>
            <Drawer.Title>Title B</Drawer.Title>
          </Drawer>
        </Drawer.Trigger>
      </>
    );

    await user.click(screen.getByRole('button', { name: 'Edit selection' }));
    expect(await screen.findByText('Edit events')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Open B' }));
    expect(await screen.findByText('Title B')).toBeInTheDocument();

    await waitFor(() => expect(onOpenChange).toHaveBeenLastCalledWith(false));
    await waitFor(() =>
      expect(screen.queryByText('Edit events')).not.toBeInTheDocument()
    );
  });
});

describe('inside Drawer.Trigger', () => {
  spyOnWarn();

  test("the drawer's own open state wins over the trigger's", async () => {
    renderThemed(
      <Drawer.Trigger>
        <Button>Open</Button>
        <Drawer open={false}>
          <Drawer.Title>Title</Drawer.Title>
        </Drawer>
      </Drawer.Trigger>
    );

    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.queryByText('Title')).not.toBeInTheDocument();
  });

  test('warns when onOpenChange is set on the Drawer instead of the trigger', () => {
    renderThemed(
      <Drawer.Trigger>
        <Button>Open</Button>
        <Drawer onOpenChange={() => {}}>
          <Drawer.Title>Title</Drawer.Title>
        </Drawer>
      </Drawer.Trigger>
    );

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('place `onOpenChange` on the trigger instead')
    );
  });

  // Same precedence as RAC's `ModalOverlay`: the Drawer's own `open` wins over
  // the trigger, so closing goes through the Drawer's (handler-less) state and
  // never reaches the trigger. RAC stays silent here too.
  test('closes through its own state, not the trigger, when open is set on both', async () => {
    const onOpenChange = vi.fn();
    renderThemed(
      <Drawer.Trigger open onOpenChange={onOpenChange}>
        <Button>Open</Button>
        <Drawer open closeButton>
          <Drawer.Title>Title</Drawer.Title>
        </Drawer>
      </Drawer.Trigger>
    );

    await user.click(screen.getByLabelText('Dismiss drawer'));

    expect(onOpenChange).not.toHaveBeenCalled();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(warn).not.toHaveBeenCalledWith(expect.stringContaining('[Drawer]'));
  });
});
