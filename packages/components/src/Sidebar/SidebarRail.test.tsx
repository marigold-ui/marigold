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

  test('a direct-link rail item shows no panel and disables the toggle', async () => {
    render(<Rail.Component />);

    const toggle = screen.getByRole('button', {
      name: 'Navigation umschalten',
    });
    expect(toggle).toBeEnabled();

    await user.click(screen.getByRole('link', { name: 'Berichte' }));

    // No section panel landmark remains once a direct link is selected, and
    // with nothing to collapse the rail toggle goes inert.
    expect(
      screen.queryByRole('navigation', { name: 'Tickets' })
    ).not.toBeInTheDocument();
    expect(toggle).toBeDisabled();

    // Cmd+B is equally inert — the expanded/collapsed state does not flip.
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await user.keyboard('{Meta>}b{/Meta}');
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });
});

describe('Sidebar.Rail — mobile', () => {
  test('collapses to the single-column drawer with rail items as the root', async () => {
    window.matchMedia = mockMatchMedia([smallScreenQuery]);
    ensureOverlayContainer();
    render(<Rail.Component />);

    // Drawer starts closed on mobile; the top-nav toggle opens it.
    const toggle = screen.getByRole('button', {
      name: 'Navigation umschalten',
    });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    // The rail flattened into the single-column drawer and opened drilled into
    // the active section (Tickets) — the Back-to-root action exists only in that
    // drilled drawer, so its presence proves both the flattening and the
    // rail-items-as-root structure behind it.
    expect(
      await screen.findByRole('button', { name: /Zurück/i })
    ).toBeInTheDocument();
  });
});
