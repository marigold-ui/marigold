import {
  CalendarDays,
  ChartColumn,
  MapPin,
  Plus,
  Settings,
  ShoppingCart,
  Ticket,
  Users,
} from 'lucide-react';
import type { CommandPaletteProps } from '@marigold/components';
import { CommandPalette, Text } from '@marigold/components';

const pages = [
  { id: 'events', label: 'Events', icon: <CalendarDays /> },
  { id: 'orders', label: 'Orders', icon: <ShoppingCart /> },
  { id: 'reports', label: 'Reports', icon: <ChartColumn /> },
  { id: 'venues', label: 'Venues', icon: <MapPin /> },
  { id: 'customers', label: 'Customers', icon: <Users /> },
  { id: 'settings', label: 'Settings', icon: <Settings /> },
];

const actions = [
  { id: 'create-event', label: 'Create event' },
  { id: 'add-venue', label: 'Add venue' },
  { id: 'invite-customer', label: 'Invite customer' },
];

const events = [
  { id: 'event-1024', number: 1024, name: 'Summer Open Air', date: '12 Jun' },
  { id: 'event-1031', number: 1031, name: 'Jazz Night', date: '20 Jun' },
  { id: 'event-1047', number: 1047, name: 'City Marathon', date: '5 Jul' },
];

export default (props: CommandPaletteProps) => (
  <CommandPalette shortcut={false} {...props}>
    <CommandPalette.Trigger />
    <CommandPalette.Content>
      <CommandPalette.Input placeholder="Search pages, actions and events…" />
      <CommandPalette.List>
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
);
