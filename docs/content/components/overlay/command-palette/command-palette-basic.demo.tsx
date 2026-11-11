import {
  CalendarDays,
  ChartColumn,
  MapPin,
  Plus,
  ShoppingCart,
  Ticket,
} from 'lucide-react';
import type { Key } from 'react';
import { useState } from 'react';
import {
  AppShell,
  CommandPalette,
  Description,
  Page,
  Panel,
  Sidebar,
  Text,
  Title,
  TopNavigation,
} from '@marigold/components';
import { DemoViewport } from '@/ui/DemoViewport';

// A small app: the sidebar and the palette lead to the same pages, so
// picking a row in the palette moves you through the app like a link would.
const pages = [
  {
    id: 'events',
    label: 'Events',
    icon: <CalendarDays />,
    description: 'Every event you sell tickets for.',
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: <ShoppingCart />,
    description: 'Orders from all sales channels.',
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: <ChartColumn />,
    description: 'Sales and attendance over time.',
  },
  {
    id: 'venues',
    label: 'Venues',
    icon: <MapPin />,
    description: 'Places where your events take place.',
  },
];

const actions = [
  {
    id: 'create-event',
    label: 'Create event',
    title: 'New event',
    section: 'events',
    description: 'Fill in the basics, you can change everything later.',
  },
  {
    id: 'add-venue',
    label: 'Add venue',
    title: 'New venue',
    section: 'venues',
    description: 'Add a place where your events take place.',
  },
];

const events = [
  { id: 'event-1024', number: 1024, name: 'Summer Open Air', date: '12 Jun' },
  { id: 'event-1031', number: 1031, name: 'Jazz Night', date: '20 Jun' },
  { id: 'event-1047', number: 1047, name: 'City Marathon', date: '5 Jul' },
];

const screenFor = (id: Key) => {
  const page = pages.find(p => p.id === id);
  if (page)
    return {
      title: page.label,
      description: page.description,
      section: page.id,
    };

  const action = actions.find(a => a.id === id);
  if (action) return action;

  const event = events.find(e => e.id === id);
  if (event)
    return {
      title: event.name,
      description: `Event #${event.number} on ${event.date}.`,
      section: 'events',
    };

  return {
    title: 'Events',
    description: pages[0].description,
    section: 'events',
  };
};

export default () => {
  const [current, setCurrent] = useState<Key>('events');
  const screen = screenFor(current);

  return (
    <DemoViewport>
      <AppShell defaultSidebarOpen>
        <Sidebar>
          <Sidebar.Header>
            <span className="text-sm font-medium">Ticket shop</span>
          </Sidebar.Header>
          <Sidebar.Nav>
            {pages.map(page => (
              <Sidebar.Item
                key={page.id}
                active={screen.section === page.id}
                onPress={() => setCurrent(page.id)}
              >
                {page.label}
              </Sidebar.Item>
            ))}
          </Sidebar.Nav>
        </Sidebar>
        <TopNavigation>
          <TopNavigation.Start>
            <Sidebar.Toggle />
          </TopNavigation.Start>
          <TopNavigation.Middle aria-label="Search" alignX="center">
            <CommandPalette shortcut={false}>
              <CommandPalette.Trigger />
              <CommandPalette.Content>
                <CommandPalette.Input placeholder="Search pages, actions and events…" />
                <CommandPalette.List onAction={setCurrent}>
                  <CommandPalette.Group title="Pages">
                    {pages.map(page => (
                      <CommandPalette.Item key={page.id} id={page.id}>
                        {page.icon}
                        {page.label}
                      </CommandPalette.Item>
                    ))}
                  </CommandPalette.Group>
                  <CommandPalette.Group title="Actions">
                    {actions.map(action => (
                      <CommandPalette.Item key={action.id} id={action.id}>
                        <Plus />
                        {action.label}
                      </CommandPalette.Item>
                    ))}
                  </CommandPalette.Group>
                  <CommandPalette.Group title="Events">
                    {events.map(event => (
                      <CommandPalette.Item
                        key={event.id}
                        id={event.id}
                        textValue={`${event.name} ${event.number}`}
                      >
                        <Ticket />
                        <Text slot="label">{event.name}</Text>
                        <Text slot="description">
                          #{event.number}, {event.date}
                        </Text>
                      </CommandPalette.Item>
                    ))}
                  </CommandPalette.Group>
                </CommandPalette.List>
              </CommandPalette.Content>
            </CommandPalette>
          </TopNavigation.Middle>
        </TopNavigation>
        <Page>
          <Page.Header>
            <Title>{screen.title}</Title>
            <Description>{screen.description}</Description>
          </Page.Header>
          <Panel>
            <Panel.Content>
              <Text size="sm">
                Open the search above and pick a page, an action or an event.
              </Text>
            </Panel.Content>
          </Panel>
        </Page>
      </AppShell>
    </DemoViewport>
  );
};
