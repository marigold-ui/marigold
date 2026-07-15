import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { theme } from '@marigold/theme-rui';
import { ensureOverlayContainer, mockMatchMedia } from '../test.utils';
import { Rail } from './SidebarRail.stories';

const smallScreenQuery = `(width < ${theme.screens!.sm})`;

const user = userEvent.setup();

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true, advanceTimeDelta: 40 });
  window.matchMedia = mockMatchMedia([]);
  document.cookie = 'marigold:sidebar:state=;max-age=0';
});

afterEach(async () => {
  await vi.runAllTimersAsync();
  vi.useRealTimers();
  // eslint-disable-next-line testing-library/no-node-access
  document.getElementById('storybook-root')?.remove();
  document.body.removeAttribute('aria-hidden');
  document.body.removeAttribute('style');
  document.documentElement.removeAttribute('style');
});

describe('Sidebar.Rail — desktop', () => {
  test('renders the rail landmark and the active section panel', () => {
    render(<Rail.Component />);

    expect(
      screen.getByRole('navigation', { name: 'Hauptnavigation' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('navigation', { name: 'Tickets' })
    ).toBeInTheDocument();
    // A section rail item is the ancestor of the current page → aria-current="true".
    expect(screen.getByRole('link', { name: 'Tickets' })).toHaveAttribute(
      'aria-current',
      'true'
    );
  });

  test('a direct-link rail item shows no panel but the toggle stays live', async () => {
    render(<Rail.Component />);

    const toggle = screen.getByRole('button', {
      name: 'Navigation umschalten',
    });
    expect(toggle).toBeEnabled();

    await user.click(screen.getByRole('link', { name: 'Berichte' }));

    // No section panel landmark remains once a direct link is selected...
    expect(
      screen.queryByRole('navigation', { name: 'Tickets' })
    ).not.toBeInTheDocument();

    // ...but the toggle stays live: collapse now narrows the rail to an
    // icon-only strip, so it has an effect even with no panel to hide.
    expect(toggle).toBeEnabled();
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    // Cmd+B is equally live.
    await user.keyboard('{Meta>}b{/Meta}');
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });
});

describe('Sidebar.Rail — mobile', () => {
  const openDrawer = async () => {
    const toggle = screen.getByRole('button', {
      name: 'Navigation umschalten',
    });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    return toggle;
  };

  beforeEach(() => {
    window.matchMedia = mockMatchMedia([smallScreenQuery]);
    ensureOverlayContainer();
  });

  test('the drawer shows the rail and the active section panel side by side', async () => {
    render(<Rail.Component />);
    await openDrawer();

    // Both levels at once — the miniature of the desktop layout, not the old
    // flattened drill-in (which announced itself with a Back-to-root action).
    expect(
      await screen.findByRole('navigation', { name: 'Hauptnavigation' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('navigation', { name: 'Tickets' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Tickets' })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Zurück/i })
    ).not.toBeInTheDocument();
  });

  test('a section tap swaps the panel in place and keeps the drawer open', async () => {
    render(<Rail.Component />);
    const toggle = await openDrawer();

    await user.click(screen.getByRole('link', { name: 'Kontakte' }));

    // Panel retargeted without navigating away or closing the drawer.
    expect(
      await screen.findByRole('navigation', { name: 'Kontakte' })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('navigation', { name: 'Tickets' })
    ).not.toBeInTheDocument();
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    // Re-tapping the active section is a no-op — the panel is always visible
    // in the drawer, so there is nothing to toggle.
    await user.click(screen.getByRole('link', { name: 'Kontakte' }));
    expect(
      screen.getByRole('navigation', { name: 'Kontakte' })
    ).toBeInTheDocument();
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });

  test('a panel leaf navigates and closes the drawer', async () => {
    render(<Rail.Component />);
    const toggle = await openDrawer();

    await user.click(
      await screen.findByRole('link', { name: 'Nicht zugewiesen' })
    );

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('a direct-link rail item navigates and closes the drawer', async () => {
    render(<Rail.Component />);
    const toggle = await openDrawer();

    await user.click(screen.getByRole('link', { name: 'Berichte' }));

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });
});
