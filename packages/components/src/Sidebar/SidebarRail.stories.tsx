import { useState } from 'react';
import { expect, waitFor, within } from 'storybook/test';
import preview from '.storybook/preview';
import { I18nProvider } from '@react-aria/i18n';
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  Inbox,
  LayoutDashboard,
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
  // Same title as Sidebar.stories on purpose: the rail is a mode of the one
  // Sidebar component, so its story lists as a sibling of Basic — not as a
  // nested "Rail" folder.
  title: 'Components/Sidebar',
  component: Sidebar.Rail,
  parameters: {
    layout: 'fullscreen',
    surface: false,
  },
  decorators: [
    Story => {
      // Same reset as Sidebar.stories: the collapse state persists to a
      // cookie, so drop it to keep state from leaking between stories.
      if (typeof document !== 'undefined') {
        document.cookie = 'marigold:sidebar:state=;path=/;max-age=0';
      }
      return <Story />;
    },
  ],
});

// German-first content — the labels go in verbatim, long compounds and all
// (Veranstaltungen, Automatisierungen, Wissensdatenbank). The rail is icon-only;
// these labels surface as tooltips to the right of the icons and as the
// accessible names, so length no longer constrains the rail.
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
};

const RailShell = ({
  initialPath = '/tickets/meine',
}: {
  initialPath?: string;
}) => {
  const [path, setPath] = useState(initialPath);
  const label = pages[path] ?? 'Seite';

  return (
    // id="storybook-root": portal target for overlays (tooltips) — the vitest
    // browser runner has no outer preview root, so the story provides its own
    // (repo convention, see e.g. Tooltip.stories).
    <div lang="de" id="storybook-root">
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
                    <Sidebar.Item href="/tickets/meine">
                      Meine Tickets
                    </Sidebar.Item>
                    <Sidebar.Item href="/tickets/nicht-zugewiesen">
                      Nicht zugewiesen
                    </Sidebar.Item>
                    <Sidebar.Item href="/tickets/alle">
                      Alle Tickets
                    </Sidebar.Item>
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
                    <Sidebar.Item href="/einstellungen/allgemein">
                      Allgemein
                    </Sidebar.Item>
                    <Sidebar.Item href="/einstellungen/team">Team</Sidebar.Item>
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

                <Sidebar.Footer>
                  <Button variant="ghost" size="small">
                    <User size={18} />
                  </Button>
                </Sidebar.Footer>
              </Sidebar.Rail>
            </Sidebar>

            <TopNavigation>
              <TopNavigation.Start>
                {/* The rail-variant toggle brings its own rail-width slot whose
                    right border continues the rail's divider up through the
                    top bar. The bar spans the full width (header-first shell),
                    so the wordmark after it never moves when the panel
                    collapses. On mobile the same toggle opens the drawer. */}
                <Sidebar.Toggle variant="rail" />
                <Text weight="bold" fontSize="lg">
                  reservix
                </Text>
              </TopNavigation.Start>
              <TopNavigation.Middle>
                <Breadcrumbs>
                  <Breadcrumbs.Item href="/uebersicht">Start</Breadcrumbs.Item>
                  <Breadcrumbs.Item href={path}>{label}</Breadcrumbs.Item>
                </Breadcrumbs>
              </TopNavigation.Middle>
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
    // Rail landmark + the active section's panel landmark are both present.
    expect(
      canvas.getByRole('navigation', { name: 'Hauptnavigation' })
    ).toBeInTheDocument();
    const ticketsNav = canvas.getByRole('navigation', { name: 'Tickets' });
    expect(ticketsNav).toBeInTheDocument();

    // The active section (from `current`) is marked on its rail item, and its
    // sub-nav is what fills the panel.
    expect(canvas.getByRole('link', { name: 'Tickets' })).toHaveAttribute(
      'aria-current',
      'true'
    );
    expect(
      within(ticketsNav).getByRole('link', { name: 'Meine Tickets' })
    ).toBeInTheDocument();

    await step(
      'an icon-only rail item shows its label as a tooltip',
      async () => {
        // Keyboard focus (focus-visible) opens the tooltip immediately — the
        // path that matters most for icon-only items. Synthetic hovers are
        // ignored by react-aria's modality guard in the headless runner, so the
        // hover path is not assertable here. The aside precedes the top bar in
        // the DOM, so the first tab lands on the first rail item ('Übersicht').
        await userEvent.tab();
        const tooltip = await waitFor(() => canvas.getByRole('tooltip'));
        expect(tooltip).toHaveTextContent('Übersicht');
        await userEvent.keyboard('{Escape}');
      }
    );

    await step('nested item drills the panel in and back out', async () => {
      // Scope to the panel landmark: after navigating, the breadcrumb exposes
      // the current page as a second role="link" with the same name.
      const panelNav = canvas.getByRole('navigation', { name: 'Tickets' });

      // Activating 'Archiv' drills into its children and navigates to its
      // first leaf (Gelöst).
      await userEvent.click(
        within(panelNav).getByRole('link', { name: 'Archiv' })
      );
      await waitFor(() =>
        expect(
          within(panelNav).getByRole('link', { name: 'Gelöst' })
        ).toHaveAttribute('aria-current', 'page')
      );

      // The back row leads to the section root again.
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
      await userEvent.click(canvas.getByRole('link', { name: 'Kontakte' }));
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
      'toggle goes inert on a direct-link page (no panel)',
      async () => {
        await userEvent.click(canvas.getByRole('link', { name: 'Berichte' }));
        const toggle = canvas.getByRole('button', {
          name: 'Navigation umschalten',
        });
        expect(toggle).toBeDisabled();

        // Selecting a section again restores the panel and the toggle.
        await userEvent.click(canvas.getByRole('link', { name: 'Tickets' }));
        expect(toggle).toBeEnabled();
      }
    );
  }
);
