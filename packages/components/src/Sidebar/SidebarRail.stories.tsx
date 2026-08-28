import { useEffect, useState } from 'react';
import { I18nProvider } from 'react-aria-components/I18nProvider';
import { expect, waitFor, within } from 'storybook/test';
import preview from '.storybook/preview';
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  Inbox,
  LayoutDashboard,
  LifeBuoy,
  Settings,
  Ticket,
  User,
  Users,
  Zap,
} from '@marigold/icons';
import { AppShell } from '../AppShell/AppShell';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { Button } from '../Button/Button';
import { Description } from '../Description/Description';
import { Page } from '../Page/Page';
import { Panel } from '../Panel/Panel';
import { RouterProvider } from '../RouterProvider/RouterProvider';
import { Text } from '../Text/Text';
import { Title } from '../Title/Title';
import { TopNavigation } from '../TopNavigation/TopNavigation';
import { Sidebar } from './Sidebar';

const meta = preview.meta({
  // Same title as Sidebar.stories: the rail is a mode of Sidebar, not a subfolder.
  title: 'Components/Sidebar',
  component: Sidebar.Rail,
  parameters: {
    layout: 'fullscreen',
    surface: false,
  },
  decorators: [
    Story => {
      // Collapse state persists to a cookie, so drop it between stories.
      if (typeof document !== 'undefined') {
        document.cookie = 'marigold:sidebar:state=;path=/;max-age=0';
      }
      return <Story />;
    },
  ],
});

// German-first: the rail is sized so "Veranstaltungen" fits one line, longer
// compounds hyphenate onto a second.
const pages: Record<string, string> = {
  '/uebersicht': 'Übersicht',
  '/tickets/meine': 'Meine Tickets',
  '/tickets/nicht-zugewiesen': 'Nicht zugewiesen',
  '/tickets/alle': 'Alle Tickets',
  '/tickets/archiv/geloest': 'Gelöst',
  '/tickets/archiv/geschlossen': 'Geschlossen',
  '/tickets/archiv/spam': 'Spam',
  '/veranstaltungen/kommende': 'Kommende',
  '/veranstaltungen/vergangene': 'Vergangene',
  '/kontakte/personen': 'Personen',
  '/kontakte/firmen': 'Firmen',
  '/posteingang/konversationen': 'Konversationen',
  '/berichte': 'Berichte',
  '/automatisierungen/regeln': 'Regeln',
  '/automatisierungen/makros': 'Makros',
  '/wissensdatenbank/artikel': 'Artikel',
  '/einstellungen/allgemein': 'Allgemein',
  '/einstellungen/team': 'Team',
  '/einstellungen/benachrichtigungen/email': 'E-Mail',
  '/einstellungen/benachrichtigungen/push': 'Push',
  '/hilfe': 'Hilfe-Center',
  '/profil': 'Profil',
};

// Breadcrumb ancestors. No landing page of their own, so each crumb links to
// the section's first leaf, same as its rail item.
const sections: Record<string, { label: string; href: string }> = {
  '/tickets': { label: 'Tickets', href: '/tickets/meine' },
  '/tickets/archiv': { label: 'Archiv', href: '/tickets/archiv/geloest' },
  '/veranstaltungen': {
    label: 'Veranstaltungen',
    href: '/veranstaltungen/kommende',
  },
  '/kontakte': { label: 'Kontakte', href: '/kontakte/personen' },
  '/posteingang': { label: 'Posteingang', href: '/posteingang/konversationen' },
  '/automatisierungen': {
    label: 'Automatisierungen',
    href: '/automatisierungen/regeln',
  },
  '/wissensdatenbank': {
    label: 'Wissensdatenbank',
    href: '/wissensdatenbank/artikel',
  },
  '/einstellungen': {
    label: 'Einstellungen',
    href: '/einstellungen/allgemein',
  },
  '/einstellungen/benachrichtigungen': {
    label: 'Benachrichtigungen',
    href: '/einstellungen/benachrichtigungen/email',
  },
};

const RailShell = ({
  initialPath = '/tickets/meine',
  bounded = false,
}: {
  initialPath?: string;
  /** Bounds the shell to the docs demos' 25rem so the nine tiles overflow. */
  bounded?: boolean;
}) => {
  const [path, setPath] = useState(initialPath);
  const label = pages[path] ?? 'Seite';

  // Each path segment becomes a crumb: "Tickets › Archiv › Gelöst".
  const trail = path
    .split('/')
    .filter(Boolean)
    .map((_segment, index, segments) => {
      const key = '/' + segments.slice(0, index + 1).join('/');
      const section = sections[key];
      return section
        ? { key, href: section.href, label: section.label }
        : { key, href: key, label: pages[key] ?? 'Seite' };
    });

  // The drawer portals outside the lang="de" wrapper, killing hyphens: auto.
  // A real app sets the document language, so mirror that.
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = 'de';
    return () => {
      document.documentElement.lang = previous;
    };
  }, []);

  return (
    // Portal target for tooltips: the vitest runner has no preview root, so the
    // story provides one (see Tooltip.stories).
    <div
      lang="de"
      id="storybook-root"
      className={
        bounded ? 'flex h-100 [--ui-viewport-height:25rem]' : undefined
      }
    >
      <RouterProvider navigate={setPath}>
        <I18nProvider locale="de-DE">
          <AppShell>
            <Sidebar>
              <Sidebar.Rail current={path}>
                <Sidebar.RailItem icon={<LayoutDashboard />} href="/uebersicht">
                  Übersicht
                </Sidebar.RailItem>

                <Sidebar.RailItem icon={<Ticket />} id="tickets">
                  Tickets
                  <Sidebar.Nav aria-label="Tickets">
                    {/* Group labels work inside a section panel exactly like in
                        the single-column sidebar. */}
                    <Sidebar.GroupLabel>Ansichten</Sidebar.GroupLabel>
                    <Sidebar.Item href="/tickets/meine">
                      Meine Tickets
                    </Sidebar.Item>
                    <Sidebar.Item href="/tickets/nicht-zugewiesen">
                      Nicht zugewiesen
                    </Sidebar.Item>
                    <Sidebar.Item href="/tickets/alle">
                      Alle Tickets
                    </Sidebar.Item>
                    <Sidebar.GroupLabel>Verwaltung</Sidebar.GroupLabel>
                    {/* A third level: an item without href wrapping items
                        drills the panel in (with a back row), same as in the
                        single-column sidebar. */}
                    <Sidebar.Item id="archiv" textValue="Archiv">
                      Archiv
                      <Sidebar.Item href="/tickets/archiv/geloest">
                        Gelöst
                      </Sidebar.Item>
                      <Sidebar.Item href="/tickets/archiv/geschlossen">
                        Geschlossen
                      </Sidebar.Item>
                      <Sidebar.Item href="/tickets/archiv/spam">
                        Spam
                      </Sidebar.Item>
                    </Sidebar.Item>
                  </Sidebar.Nav>
                </Sidebar.RailItem>

                <Sidebar.RailItem icon={<CalendarDays />} id="veranstaltungen">
                  Veranstaltungen
                  <Sidebar.Nav aria-label="Veranstaltungen">
                    <Sidebar.Item href="/veranstaltungen/kommende">
                      Kommende
                    </Sidebar.Item>
                    <Sidebar.Item href="/veranstaltungen/vergangene">
                      Vergangene
                    </Sidebar.Item>
                  </Sidebar.Nav>
                </Sidebar.RailItem>

                <Sidebar.RailItem icon={<Users />} id="kontakte">
                  Kontakte
                  <Sidebar.Nav aria-label="Kontakte">
                    <Sidebar.Item href="/kontakte/personen">
                      Personen
                    </Sidebar.Item>
                    <Sidebar.Item href="/kontakte/firmen">Firmen</Sidebar.Item>
                  </Sidebar.Nav>
                </Sidebar.RailItem>

                <Sidebar.RailItem icon={<Inbox />} id="posteingang">
                  Posteingang
                  <Sidebar.Nav aria-label="Posteingang">
                    <Sidebar.Item href="/posteingang/konversationen">
                      Konversationen
                    </Sidebar.Item>
                  </Sidebar.Nav>
                </Sidebar.RailItem>

                <Sidebar.RailItem icon={<BarChart3 />} href="/berichte">
                  Berichte
                </Sidebar.RailItem>

                <Sidebar.RailItem icon={<Zap />} id="automatisierungen">
                  Automatisierungen
                  <Sidebar.Nav aria-label="Automatisierungen">
                    <Sidebar.Item href="/automatisierungen/regeln">
                      Regeln
                    </Sidebar.Item>
                    <Sidebar.Item href="/automatisierungen/makros">
                      Makros
                    </Sidebar.Item>
                  </Sidebar.Nav>
                </Sidebar.RailItem>

                <Sidebar.RailItem icon={<BookOpen />} id="wissensdatenbank">
                  Wissensdatenbank
                  <Sidebar.Nav aria-label="Wissensdatenbank">
                    <Sidebar.Item href="/wissensdatenbank/artikel">
                      Artikel
                    </Sidebar.Item>
                  </Sidebar.Nav>
                </Sidebar.RailItem>

                <Sidebar.RailItem icon={<Settings />} id="einstellungen">
                  Einstellungen
                  <Sidebar.Nav aria-label="Einstellungen">
                    <Sidebar.GroupLabel>Arbeitsbereich</Sidebar.GroupLabel>
                    <Sidebar.Item href="/einstellungen/allgemein">
                      Allgemein
                    </Sidebar.Item>
                    <Sidebar.Item href="/einstellungen/team">Team</Sidebar.Item>
                    <Sidebar.GroupLabel>Persönlich</Sidebar.GroupLabel>
                    <Sidebar.Item
                      id="benachrichtigungen"
                      textValue="Benachrichtigungen"
                    >
                      Benachrichtigungen
                      <Sidebar.Item href="/einstellungen/benachrichtigungen/email">
                        E-Mail
                      </Sidebar.Item>
                      <Sidebar.Item href="/einstellungen/benachrichtigungen/push">
                        Push
                      </Sidebar.Item>
                    </Sidebar.Item>
                  </Sidebar.Nav>
                </Sidebar.RailItem>

                {/* Rail items inside the footer render pinned at the bottom of
                    the rail — same stacked icon + label tile as the list. */}
                <Sidebar.Footer>
                  <Sidebar.RailItem icon={<LifeBuoy />} href="/hilfe">
                    Hilfe-Center
                  </Sidebar.RailItem>
                  <Sidebar.RailItem icon={<User />} href="/profil">
                    Profil
                  </Sidebar.RailItem>
                </Sidebar.Footer>
              </Sidebar.Rail>
            </Sidebar>

            <TopNavigation>
              <TopNavigation.Start>
                {/* The bar spans the full width (header-first shell) with no
                    vertical dividers: brand, toggle, and breadcrumbs are three
                    zones separated by the start slot's spacing rhythm. The
                    wordmark holds the fixed top-left spot and never moves when
                    the panel collapses. On mobile the same toggle opens the
                    drawer. */}
                <Text weight="bold" fontSize="lg">
                  reservix
                </Text>
                <Sidebar.Toggle variant="rail" />
                {/* Keep the whole trail visible (it is at most three levels)
                    so the active section still reads when the rail collapses to
                    icons, rather than auto-collapsing to an ellipsis. */}
                <Breadcrumbs maxVisibleItems={4}>
                  {trail.map(({ key, href, label: crumbLabel }) => (
                    <Breadcrumbs.Item key={key} href={href}>
                      {crumbLabel}
                    </Breadcrumbs.Item>
                  ))}
                </Breadcrumbs>
              </TopNavigation.Start>
              <TopNavigation.End>
                <Text size="sm" weight="bold">
                  Mara Ellison
                </Text>
              </TopNavigation.End>
            </TopNavigation>

            <Page>
              <Page.Header>
                <Title>{label}</Title>
                <Description>
                  Zwei-Ebenen-Navigation: die Rail bleibt sichtbar, das Panel
                  zeigt den gewählten Bereich.
                </Description>
                <Button variant="primary">Neues Ticket</Button>
              </Page.Header>
              <Panel>
                <Panel.Header>
                  <Title>Übersicht</Title>
                </Panel.Header>
                <Panel.Content>
                  <Text>
                    Sie sehen den Bereich <strong>{label}</strong>.
                  </Text>
                </Panel.Content>
              </Panel>
            </Page>
          </AppShell>
        </I18nProvider>
      </RouterProvider>
    </div>
  );
};

export const Rail = meta.story({
  tags: ['component-test'],
  render: () => <RailShell />,
});

Rail.test(
  'shows two nav landmarks and swaps the panel on rail selection',
  async ({ canvas, userEvent, step }) => {
    const rail = canvas.getByRole('navigation', { name: 'Hauptnavigation' });
    expect(rail).toBeInTheDocument();
    const ticketsNav = canvas.getByRole('navigation', { name: 'Tickets' });
    expect(ticketsNav).toBeInTheDocument();

    // Scope rail-item lookups to the rail landmark: the breadcrumb mirrors
    // section names as links too.
    expect(within(rail).getByRole('link', { name: 'Tickets' })).toHaveAttribute(
      'aria-current',
      'true'
    );
    expect(
      within(ticketsNav).getByRole('link', { name: 'Meine Tickets' })
    ).toBeInTheDocument();

    await step('rail items carry a visible label', async () => {
      // The label under the icon is the accessible name, no tooltip needed.
      const uebersicht = within(rail).getByRole('link', { name: 'Übersicht' });
      expect(uebersicht).toBeVisible();
      expect(uebersicht).toHaveTextContent('Übersicht');
    });

    await step('nested item drills the panel in and back out', async () => {
      // Scope to the panel: the breadcrumb exposes the page as a second link.
      const panelNav = canvas.getByRole('navigation', { name: 'Tickets' });

      // Activating 'Archiv' drills in and lands on its first leaf.
      await userEvent.click(
        within(panelNav).getByRole('link', { name: 'Archiv' })
      );
      await waitFor(() =>
        expect(
          within(panelNav).getByRole('link', { name: 'Gelöst' })
        ).toHaveAttribute('aria-current', 'page')
      );

      await userEvent.click(
        within(panelNav).getByRole('button', { name: /Zurück/i })
      );
      await waitFor(() =>
        expect(
          within(panelNav).getByRole('link', { name: 'Meine Tickets' })
        ).toBeInTheDocument()
      );
    });

    await step('select another section → panel swaps', async () => {
      await userEvent.click(
        within(rail).getByRole('link', { name: 'Kontakte' })
      );
      const kontakteNav = await canvas.findByRole('navigation', {
        name: 'Kontakte',
      });
      expect(
        within(kontakteNav).getByRole('link', { name: 'Personen' })
      ).toBeInTheDocument();
    });

    await step('top-bar toggle collapses and expands the panel', async () => {
      const toggle = canvas.getByRole('button', {
        name: 'Navigation umschalten',
      });
      expect(toggle).toHaveAttribute('aria-expanded', 'true');

      await userEvent.click(toggle);
      expect(toggle).toHaveAttribute('aria-expanded', 'false');

      await userEvent.click(toggle);
      expect(toggle).toHaveAttribute('aria-expanded', 'true');
    });

    await step(
      'toggle stays live on a direct-link page (narrows the rail)',
      async () => {
        await userEvent.click(
          within(rail).getByRole('link', { name: 'Berichte' })
        );
        const toggle = canvas.getByRole('button', {
          name: 'Navigation umschalten',
        });
        // No panel here, but collapse still narrows the rail to icons.
        expect(toggle).toBeEnabled();
        expect(toggle).toHaveAttribute('aria-expanded', 'true');
        await userEvent.click(toggle);
        expect(toggle).toHaveAttribute('aria-expanded', 'false');

        await userEvent.click(
          within(rail).getByRole('link', { name: 'Tickets' })
        );
        expect(toggle).toHaveAttribute('aria-expanded', 'true');
      }
    );
  }
);

// Walks the tree instead of matching a theme class, so assertions stay behavioural.
const closestScrollable = (element: HTMLElement) => {
  let node = element.parentElement;
  while (node) {
    const { overflowY } = getComputedStyle(node);
    if (
      (overflowY === 'auto' || overflowY === 'scroll') &&
      node.scrollHeight > node.clientHeight + 1
    ) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
};

// Overflow: nine tiles in a 25rem viewport. Both cues are scroll-state aware,
// so a rail that fits shows no extra chrome.
export const RailOverflow = meta.story({
  tags: ['component-test'],
  render: () => <RailShell bounded />,
});

RailOverflow.test(
  'the item list scrolls while the footer stays pinned outside it',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, step }) => {
    const rail = canvas.getByRole('navigation', { name: 'Hauptnavigation' });
    const firstItem = within(rail).getByRole('link', { name: 'Übersicht' });
    const pinnedItem = within(rail).getByRole('link', { name: 'Hilfe-Center' });

    const scroller = closestScrollable(firstItem);

    // The footer sits outside the scroller, which is what keeps it pinned.
    expect(scroller).not.toBeNull();
    expect(scroller).toContainElement(firstItem);
    expect(scroller).not.toContainElement(pinnedItem);
    expect(scroller!.parentElement).toContainElement(pinnedItem);

    // Firefox takes the fallback branch, so the hairline is unconditional here.
    // Whether the seam tracks scroll position is not testable in this suite.
    expect(getComputedStyle(pinnedItem.parentElement!).boxShadow).not.toBe(
      'none'
    );

    await step(
      'focus lands a below-the-fold tile clear of the faded edge',
      () => {
        // Any below-fold tile but the last: the last has no scroll range below it.
        const belowFold = within(rail).getByRole('link', {
          name: 'Automatisierungen',
        });

        belowFold.focus();

        // Without this the gap could be a tile that was already in view.
        expect(scroller!.scrollTop).toBeGreaterThan(0);

        // scroll-py keeps the tile off the fade. Exact gap is the theme's.
        const gap =
          scroller!.getBoundingClientRect().bottom -
          belowFold.getBoundingClientRect().bottom;
        expect(gap).toBeGreaterThan(8);
      }
    );
  }
);

// The resting story sits at scrollTop 0, where the top fade is still 0. This
// one scrolls to the middle, the only position with both fades at full width.
RailOverflow.test(
  'scrolls clear of both ends, the frame where both fades are at full width',
  { parameters: { chromatic: { disableSnapshot: false } } },
  async ({ canvas }) => {
    const rail = canvas.getByRole('navigation', { name: 'Hauptnavigation' });
    const scroller = closestScrollable(
      within(rail).getByRole('link', { name: 'Übersicht' })
    );

    scroller!.scrollTop = Math.round(
      (scroller!.scrollHeight - scroller!.clientHeight) / 2
    );

    await waitFor(() => {
      expect(scroller!.scrollTop).toBeGreaterThan(0);
      expect(scroller!.scrollTop).toBeLessThan(
        scroller!.scrollHeight - scroller!.clientHeight
      );
    });
  }
);

RailOverflow.test(
  'collapsed the icon-only list still overflows and keeps its footer',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole('button', {
      name: 'Navigation umschalten',
    });

    await userEvent.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    // Icon-only tiles are shorter, but nine of them still outgrow 25rem.
    const rail = canvas.getByRole('navigation', { name: 'Hauptnavigation' });
    const scroller = closestScrollable(
      within(rail).getByRole('link', { name: 'Übersicht' })
    );

    expect(scroller).not.toBeNull();

    // The folded label stays the accessible name (opacity-0, not unmounted).
    const pinnedItem = within(rail).getByRole('link', { name: 'Hilfe-Center' });

    expect(scroller).not.toContainElement(pinnedItem);
    expect(scroller!.parentElement).toContainElement(pinnedItem);
  }
);

// An outer Sidebar.Provider owns the collapse state. Covered by unit tests,
// so no snapshot or component test.
const RailControlledExample = () => {
  const [open, setOpen] = useState(true);
  return (
    <Sidebar.Provider open={open} onOpenChange={setOpen}>
      <RailShell />
    </Sidebar.Provider>
  );
};

export const RailControlled = meta.story({
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => <RailControlledExample />,
});

// Mobile: the same full-width drawer as the single column. Sections become
// drill-in branches, direct links plain rows.
export const RailMobile = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  globals: {
    viewport: { value: 'extraSmallScreen' },
  },
  render: () => <RailShell />,
});

RailMobile.test(
  'drawer is a single-column drill-down, matching the plain sidebar',
  async ({ canvas, userEvent, step }) => {
    const toggle = canvas.getByRole('button', {
      name: 'Navigation umschalten',
    });
    // Panels stay mounted (inert when inactive), so assert the showing level via
    // data-position. Scope to the drawer, the breadcrumb mirrors leaf names.
    const activePanelOf = (element: HTMLElement) =>
      element.closest('[data-position]');

    await step(
      'toggle opens the drawer pre-drilled into the active section',
      async () => {
        expect(toggle).toHaveAttribute('aria-expanded', 'false');
        await userEvent.click(toggle);

        const drawer = await canvas.findByRole('complementary', {
          name: 'Seitenleiste',
        });
        expect(
          within(drawer).getByRole('button', { name: 'Zurück zu Tickets' })
        ).toBeInTheDocument();
        expect(
          activePanelOf(
            within(drawer).getByRole('link', { name: 'Meine Tickets' })
          )
        ).toHaveAttribute('data-position', 'active');
        // No side-by-side rail: sections are drilled-in regions, not a landmark.
        expect(
          within(drawer).queryByRole('navigation', { name: 'Tickets' })
        ).not.toBeInTheDocument();
      }
    );

    await step('back returns to the rail-level list', async () => {
      const drawer = canvas.getByRole('complementary', {
        name: 'Seitenleiste',
      });
      await userEvent.click(
        within(drawer).getByRole('button', { name: 'Zurück zu Tickets' })
      );

      await waitFor(() =>
        expect(
          activePanelOf(within(drawer).getByRole('link', { name: 'Übersicht' }))
        ).toHaveAttribute('data-position', 'active')
      );
      expect(toggle).toHaveAttribute('aria-expanded', 'true');
    });

    await step(
      'a section row drills in and keeps the drawer open',
      async () => {
        const drawer = canvas.getByRole('complementary', {
          name: 'Seitenleiste',
        });
        await userEvent.click(
          within(drawer).getByRole('link', { name: 'Kontakte' })
        );

        await waitFor(() =>
          expect(
            activePanelOf(
              within(drawer).getByRole('link', { name: 'Personen' })
            )
          ).toHaveAttribute('data-position', 'active')
        );
        expect(toggle).toHaveAttribute('aria-expanded', 'true');
      }
    );

    await step('leaf tap navigates and closes the drawer', async () => {
      const drawer = canvas.getByRole('complementary', {
        name: 'Seitenleiste',
      });
      await userEvent.click(
        within(drawer).getByRole('link', { name: 'Personen' })
      );
      await waitFor(() =>
        expect(toggle).toHaveAttribute('aria-expanded', 'false')
      );
    });

    await step('a direct-link row closes the drawer too', async () => {
      await userEvent.click(toggle);
      const drawer = await canvas.findByRole('complementary', {
        name: 'Seitenleiste',
      });
      // Now on /kontakte/personen, so the drawer re-opens inside Kontakte.
      await userEvent.click(
        within(drawer).getByRole('button', { name: 'Zurück zu Kontakte' })
      );
      await userEvent.click(
        await within(drawer).findByRole('link', { name: 'Berichte' })
      );
      await waitFor(() =>
        expect(toggle).toHaveAttribute('aria-expanded', 'false')
      );
    });
  }
);
