import { useState } from 'react';
import {
  AppShell,
  Description,
  Page,
  Panel,
  RouterProvider,
  Sidebar,
  Text,
  Title,
  TopNavigation,
} from '@marigold/components';
import {
  BarChart3,
  CalendarDays,
  LifeBuoy,
  Ticket,
  Users,
} from '@marigold/icons';
import { DemoViewport } from '@/ui/DemoViewport';

const pages: Record<string, string> = {
  '/tickets/open': 'Open tickets',
  '/tickets/unassigned': 'Unassigned',
  '/tickets/archive': 'Archive',
  '/events/upcoming': 'Upcoming events',
  '/events/past': 'Past events',
  '/contacts/people': 'People',
  '/contacts/companies': 'Companies',
  '/reports': 'Reports',
  '/help': 'Help center',
};

export default () => {
  const [path, setPath] = useState('/tickets/open');
  const label = pages[path] ?? 'Page';

  return (
    <DemoViewport>
      <RouterProvider navigate={setPath}>
        <AppShell>
          <Sidebar>
            <Sidebar.Rail current={path}>
              <Sidebar.RailItem icon={<Ticket />} id="tickets">
                Tickets
                <Sidebar.Nav aria-label="Tickets">
                  <Sidebar.Item href="/tickets/open">Open</Sidebar.Item>
                  <Sidebar.Item href="/tickets/unassigned">
                    Unassigned
                  </Sidebar.Item>
                  <Sidebar.Item href="/tickets/archive">Archive</Sidebar.Item>
                </Sidebar.Nav>
              </Sidebar.RailItem>

              <Sidebar.RailItem icon={<CalendarDays />} id="events">
                Events
                <Sidebar.Nav aria-label="Events">
                  <Sidebar.Item href="/events/upcoming">Upcoming</Sidebar.Item>
                  <Sidebar.Item href="/events/past">Past</Sidebar.Item>
                </Sidebar.Nav>
              </Sidebar.RailItem>

              <Sidebar.RailItem icon={<Users />} id="contacts">
                Contacts
                <Sidebar.Nav aria-label="Contacts">
                  <Sidebar.Item href="/contacts/people">People</Sidebar.Item>
                  <Sidebar.Item href="/contacts/companies">
                    Companies
                  </Sidebar.Item>
                </Sidebar.Nav>
              </Sidebar.RailItem>

              {/* An item without a nested nav is a direct link — no panel. */}
              <Sidebar.RailItem icon={<BarChart3 />} href="/reports">
                Reports
              </Sidebar.RailItem>

              {/* Rail items inside the footer render pinned at the bottom. */}
              <Sidebar.Footer>
                <Sidebar.RailItem icon={<LifeBuoy />} href="/help">
                  Help
                </Sidebar.RailItem>
              </Sidebar.Footer>
            </Sidebar.Rail>
          </Sidebar>

          <TopNavigation>
            <TopNavigation.Start>
              <Text weight="bold">Logo</Text>
              <Sidebar.Toggle variant="rail" />
            </TopNavigation.Start>
            <TopNavigation.End>
              <Text size="sm">User Menu</Text>
            </TopNavigation.End>
          </TopNavigation>

          <Page>
            <Page.Header>
              <Title>{label}</Title>
              <Description>
                The rail stays put; the panel shows the active section.
              </Description>
            </Page.Header>
            <Panel>
              <Panel.Header>
                <Title>Overview</Title>
              </Panel.Header>
              <Panel.Content>
                <Text size="sm">
                  You are viewing <strong>{label}</strong>. Select another rail
                  section to swap the panel, or collapse it with the toggle.
                </Text>
              </Panel.Content>
            </Panel>
          </Page>
        </AppShell>
      </RouterProvider>
    </DemoViewport>
  );
};
