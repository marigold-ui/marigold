import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { theme } from '@marigold/theme-rui';
import { ensureOverlayContainer, mockMatchMedia } from '../test.utils';
import { Rail, RailControlled } from './SidebarRail.stories';

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

  test('a direct-link rail item announces `page` once it is current', async () => {
    render(<Rail.Component />);

    const berichte = screen.getByRole('link', { name: 'Berichte' });
    // Not the current page yet — the Tickets section is (as `true`, since a
    // section is only the ancestor of the actual page).
    expect(berichte).not.toHaveAttribute('aria-current');

    await user.click(berichte);

    // The direct link IS the page, so it announces `page`, and the former
    // section ancestor drops its marker.
    await waitFor(() =>
      expect(berichte).toHaveAttribute('aria-current', 'page')
    );
    expect(screen.getByRole('link', { name: 'Tickets' })).not.toHaveAttribute(
      'aria-current'
    );
  });

  test('rail links are plain tabbable — no roving tabindex', () => {
    render(<Rail.Component />);

    // The rail is deliberately a flat list of always-tabbable links (unlike
    // the panel's roving tree): every tile is reachable with Tab alone.
    const rail = screen.getByRole('navigation', { name: 'Hauptnavigation' });
    const links = within(rail).getAllByRole('link');
    expect(links.length).toBeGreaterThan(5);
    for (const link of links) {
      expect(link).not.toHaveAttribute('tabindex', '-1');
    }
  });

  test('footer rail items render pinned in the rail landmark', () => {
    render(<Rail.Component />);

    const rail = screen.getByRole('navigation', { name: 'Hauptnavigation' });
    for (const name of ['Hilfe-Center', 'Profil']) {
      const link = within(rail).getByRole('link', { name });
      expect(link).toBeVisible();
      expect(link).not.toHaveAttribute('tabindex', '-1');
    }
  });

  test('collapsing persists to the sidebar cookie', async () => {
    render(<Rail.Component />);

    await user.click(
      screen.getByRole('button', { name: 'Navigation umschalten' })
    );

    expect(document.cookie).toContain('marigold:sidebar:state=collapsed');
  });
});

describe('Sidebar.Rail — Ctrl+B keyboard shortcut (non-meta, ctrlKey)', () => {
  test('Ctrl+B toggles the rail collapse', async () => {
    render(<Rail.Component />);
    const toggle = screen.getByRole('button', {
      name: 'Navigation umschalten',
    });
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    await user.keyboard('{Control>}b{/Control}');

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('Sidebar.Rail — panel focus management', () => {
  test('switching sections moves focus to the panel heading', async () => {
    render(<Rail.Component />);

    await user.click(screen.getByRole('link', { name: 'Kontakte' }));

    const heading = await screen.findByRole('heading', { name: 'Kontakte' });
    await waitFor(() => expect(heading).toHaveFocus());
  });

  test('re-clicking the active section on a collapsed panel expands and focuses it', async () => {
    render(<Rail.Component />);
    const toggle = screen.getByRole('button', {
      name: 'Navigation umschalten',
    });

    await user.click(toggle); // collapse the panel
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await user.click(screen.getByRole('link', { name: 'Tickets' }));

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    const heading = screen.getByRole('heading', { name: 'Tickets' });
    await waitFor(() => expect(heading).toHaveFocus());
  });
});

describe('Sidebar.Rail — tooltips on the collapsed rail', () => {
  test('a collapsed rail tile shows its label as a tooltip on hover', async () => {
    render(<Rail.Component />);
    const toggle = screen.getByRole('button', {
      name: 'Navigation umschalten',
    });

    await user.click(toggle); // collapse → icon-only rail

    // Hovering an icon-only tile surfaces the label as a tooltip after the
    // trigger's warmup delay (1s).
    await user.hover(screen.getByRole('link', { name: 'Profil' }));
    await vi.advanceTimersByTimeAsync(1500);

    expect(
      await screen.findByRole('tooltip', { name: 'Profil' })
    ).toBeVisible();
  });

  test('an expanded rail tile shows no tooltip — the visible label is the hint', async () => {
    render(<Rail.Component />);

    // First Tab lands on the first rail tile (the aside precedes the top bar).
    await user.tab();
    expect(screen.getByRole('link', { name: 'Übersicht' })).toHaveFocus();

    await vi.advanceTimersByTimeAsync(2000);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});

describe('Sidebar.Rail — controlled state', () => {
  test('an outer provider controls the collapse without touching the cookie', async () => {
    render(<RailControlled.Component />);
    const toggle = screen.getByRole('button', {
      name: 'Navigation umschalten',
    });
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    // Toggle → onOpenChange → external state flips → rail collapses.
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    // Controlled mode leaves persistence to the owner — no cookie write.
    expect(document.cookie).not.toContain('marigold:sidebar:state=collapsed');

    await user.click(toggle);
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

  test('a pinned footer rail item navigates and closes the drawer', async () => {
    render(<Rail.Component />);
    const toggle = await openDrawer();

    await user.click(await screen.findByRole('link', { name: 'Hilfe-Center' }));

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('opening the drawer moves focus to the panel heading', async () => {
    render(<Rail.Component />);
    await openDrawer();

    // The Dialog-less drawer autofocuses nothing on its own — the rail moves
    // focus so Escape and screen readers land inside the modal right away.
    const heading = await screen.findByRole('heading', { name: 'Tickets' });
    await waitFor(() => expect(heading).toHaveFocus());
  });

  test('on a page without a panel, focus falls to the first rail link', async () => {
    render(<Rail.Component />);
    const toggle = await openDrawer();

    // Navigate to the direct-link page (closes the drawer), then reopen: no
    // section is selected, so there is no panel heading to focus.
    await user.click(screen.getByRole('link', { name: 'Berichte' }));
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await user.click(toggle);

    const first = await screen.findByRole('link', { name: 'Übersicht' });
    await waitFor(() => expect(first).toHaveFocus());
  });
});
