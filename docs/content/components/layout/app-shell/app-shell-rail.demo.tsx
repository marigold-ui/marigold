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
import { BarChart3, CalendarDays, Ticket } from '@marigold/icons';
import { DemoViewport } from '@/ui/DemoViewport';

const pages: Record<string, string> = {
  '/tickets/open': 'Open tickets',
  '/tickets/archive': 'Archive',
  '/events/upcoming': 'Upcoming events',
  '/events/past': 'Past events',
  '/reports': 'Reports',
};

export default () => {
  const [path, setPath] = useState('/tickets/open');

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
              <Sidebar.RailItem icon={<BarChart3 />} href="/reports">
                Reports
              </Sidebar.RailItem>
            </Sidebar.Rail>
          </Sidebar>
          <TopNavigation>
            <TopNavigation.Start>
              {/* The bar spans the full width. The logo holds the fixed
                  top-left spot and never moves when the panel collapses. */}
              <span className="text-sm font-medium">Logo</span>
              <Sidebar.Toggle variant="rail" />
              <span className="text-sm">Breadcrumbs</span>
            </TopNavigation.Start>
            <TopNavigation.End>
              <span className="text-sm">User Menu</span>
            </TopNavigation.End>
          </TopNavigation>
          <Page>
            <Page.Header>
              <Title>{pages[path] ?? 'Page'}</Title>
              <Description>An overview of your workspace.</Description>
            </Page.Header>
            <Panel>
              <Panel.Header>
                <Title>Section</Title>
              </Panel.Header>
              <Panel.Content>
                <Text size="sm">Panel content</Text>
              </Panel.Content>
            </Panel>
          </Page>
        </AppShell>
      </RouterProvider>
    </DemoViewport>
  );
};
